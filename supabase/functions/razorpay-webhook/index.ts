// supabase/functions/razorpay-webhook/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

async function hmacSHA256(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(sigBuf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET")!;

    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    console.log("entered payment rawbody",rawBody);
    const expected = await hmacSHA256(WEBHOOK_SECRET, rawBody);
    if (expected !== signature) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }
    
    const payload = JSON.parse(rawBody);

    console.log("entered payment response",payload);
    const event = payload?.event || "";
    if (!["payment.captured", "payment.authorized", "order.paid"].includes(event)) {
      return new Response(JSON.stringify({ ok: true, ignored: event }), {
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    let orderId = "";
    let plan = "";
    let userId = "";

    if (event === "order.paid") {
      const orderEntity = payload?.payload?.order?.entity;
      orderId = orderEntity?.id || "";
      plan = String(orderEntity?.notes?.plan || "");
      userId = String(orderEntity?.notes?.user_id || "");
    } else {
      const payment = payload?.payload?.payment?.entity;
      orderId = payment?.order_id || "";
      if (!orderId) {
        return new Response(JSON.stringify({ error: "No order_id in payment" }), {
          status: 400,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        });
      }

      // Fetch the order to get notes.plan + notes.user_id
      const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
      const ordRes = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
        headers: { "Authorization": `Basic ${authBasic}` },
      });
      const order = await ordRes.json();
      if (!ordRes.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch order", details: order }), {
          status: 500,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        });
      }
      console.log("entered payment order", order);
      plan = String(order?.notes?.plan || "");
      userId = String(order?.notes?.user_id || "");
    }

    // All valid plan IDs - PLAN_1M_INR is the ₹499 promo plan
    const ALL_PLANS = [
      "PLAN_1M_INR", "PLAN_499",
      "PLAN_2M_INR", "PLAN_3M_INR",
      "PLAN_6M_INR", "PLAN_12M_INR",
      "PLAN_6M_USD", "PLAN_12M_USD",
      "PLAN_1999"
    ];

    if (!userId || !ALL_PLANS.includes(plan)) {
      return new Response(JSON.stringify({ error: "Missing user_id/plan in order notes", plan, userId }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const now = Date.now();
    const promoEndTime = new Date("2026-07-20T23:59:59+05:30").getTime();
    const isPromoActive = now < promoEndTime;

    // Map plan IDs to days of access
    let daysToGrant = 180; // default 180 days for promo
    let planFriendlyName = "Special Launch Offer";

    if (plan === "PLAN_1M_INR" || plan === "PLAN_499") {
      // ₹499 plan: 6 months during promo (until July 20 11:59 PM), 30 days after
      daysToGrant = isPromoActive ? 180 : 30;
      planFriendlyName = isPromoActive ? "Special Launch Offer (6 Months)" : "Iron Plan (30 Days)";
    } else if (plan === "PLAN_2M_INR") {
      daysToGrant = 60;
      planFriendlyName = "Copper Plan";
    } else if (plan === "PLAN_3M_INR") {
      daysToGrant = 90;
      planFriendlyName = "Silver Plan";
    } else if (plan === "PLAN_6M_INR" || plan === "PLAN_6M_USD") {
      daysToGrant = 180;
      planFriendlyName = "Gold Plan";
    } else if (plan === "PLAN_12M_INR" || plan === "PLAN_12M_USD" || plan === "PLAN_1999") {
      daysToGrant = 365;
      planFriendlyName = "Diamond Plan";
    }

    const courseExpiry = new Date(now + daysToGrant * 24 * 60 * 60 * 1000).toISOString();
    const placementExpiry = new Date(now + 365 * 24 * 60 * 60 * 1000).toISOString(); // 1 year

    const updates: Record<string, any> = {
      course_active: true,
      course_expiry: courseExpiry,
      active_plan: planFriendlyName
    };

    if (plan === "PLAN_1999" || plan === "PLAN_12M_INR" || plan === "PLAN_12M_USD") {
      updates.placement_active = true;
      updates.placement_expiry = placementExpiry;
      updates.mock_remaining = 3;
    }
    // Update profiles by user id using service role
    const updRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
      method: "PATCH",
      headers: {
        "apikey": SERVICE_ROLE,
        "authorization": `Bearer ${SERVICE_ROLE}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify(updates),
    });

    const upd = await updRes.json();
    if (!updRes.ok) {
      return new Response(JSON.stringify({ error: "Supabase update failed", details: upd }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, plan, userId, updates }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
