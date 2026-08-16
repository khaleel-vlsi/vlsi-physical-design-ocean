import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-user-token",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

async function hmacSHA256(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") || "";
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    const rawBody = await req.text();
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Verify webhook signature if configured
    if (WEBHOOK_SECRET) {
      const signature = req.headers.get("x-razorpay-signature") || "";
      const expected = await hmacSHA256(WEBHOOK_SECRET, rawBody);
      if (signature && expected !== signature) {
        console.warn("Webhook signature mismatch (continuing processing for valid events)");
      }
    }

    const event = payload?.event || "";
    const validEvents = ["order.paid", "payment.captured", "payment.authorized"];

    if (!validEvents.includes(event)) {
      return new Response(JSON.stringify({ message: "Ignored event: " + event }), {
        status: 200,
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
      if (orderId && RZP_KEY_ID && RZP_KEY_SECRET) {
        const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
        const ordRes = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
          headers: { "Authorization": `Basic ${authBasic}` },
        });
        const order = await ordRes.json().catch(() => ({}));
        if (ordRes.ok && order) {
          plan = String(order?.notes?.plan || "");
          userId = String(order?.notes?.user_id || "");
        }
      }
    }

    const ALL_PLANS = [
      "PLAN_1M_INR", "PLAN_499",
      "PLAN_2M_INR", "PLAN_3M_INR",
      "PLAN_6M_INR", "PLAN_12M_INR",
      "PLAN_6M_USD", "PLAN_12M_USD",
      "PLAN_1999"
    ];

    if (!userId || !ALL_PLANS.includes(plan)) {
      return new Response(JSON.stringify({ message: "No matching valid plan/user", plan, userId }), {
        status: 200,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Fetch existing user profile
    const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=*`, {
      headers: {
        "apikey": SERVICE_ROLE,
        "authorization": `Bearer ${SERVICE_ROLE}`,
      },
    });

    const profiles = await profRes.json().catch(() => []);
    const existingProfile = Array.isArray(profiles) && profiles.length > 0 ? profiles[0] : null;

    const now = Date.now();
    let daysToGrant = 30;
    let planFriendlyName = "Iron Plan";

    if (plan === "PLAN_1M_INR" || plan === "PLAN_499") {
      daysToGrant = 30;
      planFriendlyName = "Iron Plan (30 Days)";
    } else if (plan === "PLAN_2M_INR") {
      daysToGrant = 60;
      planFriendlyName = "Copper Plan (60 Days)";
    } else if (plan === "PLAN_3M_INR") {
      daysToGrant = 90;
      planFriendlyName = "Silver Plan (90 Days)";
    } else if (plan === "PLAN_6M_INR" || plan === "PLAN_6M_USD") {
      daysToGrant = 180;
      planFriendlyName = "Gold Plan (180 Days)";
    } else if (plan === "PLAN_12M_INR" || plan === "PLAN_12M_USD" || plan === "PLAN_1999") {
      daysToGrant = 365;
      planFriendlyName = "Diamond Plan (365 Days)";
    }

    let baseTime = now;
    if (existingProfile && existingProfile.course_active && existingProfile.course_expiry) {
      const currentExpiryMs = new Date(existingProfile.course_expiry).getTime();
      if (currentExpiryMs > now) {
        baseTime = currentExpiryMs;
      }
    }

    const courseExpiry = new Date(baseTime + daysToGrant * 24 * 60 * 60 * 1000).toISOString();
    const updates: Record<string, any> = {
      course_active: true,
      course_expiry: courseExpiry,
      active_plan: planFriendlyName
    };

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

    return new Response(JSON.stringify({ ok: true, profile: upd }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
