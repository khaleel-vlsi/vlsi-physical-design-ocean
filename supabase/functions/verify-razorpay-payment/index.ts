import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

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
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") || "";
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!RZP_KEY_ID || !RZP_KEY_SECRET || !SUPABASE_URL || !SERVICE_ROLE) {
      return new Response(JSON.stringify({ error: "Missing env vars" }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 1. Get authenticated user from token
    const userToken = req.headers.get("x-user-token") || req.headers.get("authorization")?.split(" ")[1];
    if (!userToken) {
      return new Response(JSON.stringify({ error: "Missing authorization token" }), {
        status: 401,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: `Bearer ${userToken}` } },
    });

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized user", details: userError }), {
        status: 401,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 2. Parse request payload
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json().catch(() => ({}));
    if (!razorpay_order_id) {
      return new Response(JSON.stringify({ error: "Missing razorpay_order_id" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 3. Verify Razorpay signature if provided
    if (razorpay_signature && razorpay_payment_id) {
      const generatedSig = await hmacSHA256(RZP_KEY_SECRET, `${razorpay_order_id}|${razorpay_payment_id}`);
      if (generatedSig !== razorpay_signature) {
        return new Response(JSON.stringify({ error: "Invalid Razorpay payment signature" }), {
          status: 400,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        });
      }
    }

    // 4. Fetch Order details from Razorpay API to confirm payment capture & notes
    const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
    const ordRes = await fetch(`https://api.razorpay.com/v1/orders/${razorpay_order_id}`, {
      headers: { "Authorization": `Basic ${authBasic}` },
    });
    const order = await ordRes.json();
    if (!ordRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch order from Razorpay", details: order }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const orderUserId = order?.notes?.user_id || "";
    const plan = order?.notes?.plan || "";

    // Verify order belongs to this authenticated user
    if (orderUserId && orderUserId !== user.id) {
      return new Response(JSON.stringify({ error: "Order user mismatch" }), {
        status: 403,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Verify order is actually paid
    if (order.status !== "paid" && (order.amount_paid || 0) <= 0) {
      return new Response(JSON.stringify({ error: "Order is not paid yet", status: order.status }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 5. Fetch user profile from Supabase DB to calculate extension
    const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}&select=*`, {
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

    // BASE DATE SELECTION:
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
    const updRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`, {
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
      return new Response(JSON.stringify({ error: "Supabase profile update failed", details: upd }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const updatedProfile = Array.isArray(upd) && upd.length > 0 ? upd[0] : updates;

    return new Response(JSON.stringify({ ok: true, profile: updatedProfile }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
