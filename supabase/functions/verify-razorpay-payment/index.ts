import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { grantPlanOnce, isKnownPlan } from "../_shared/grantPlan.ts";

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

    if (!isKnownPlan(plan)) {
      return new Response(JSON.stringify({ error: `Unknown plan on order: ${plan}` }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 5. Credit the order EXACTLY ONCE (the webhook may also process this same order).
    //    If it was already credited, the current profile is returned unchanged.
    const result = await grantPlanOnce({
      supabaseUrl: SUPABASE_URL,
      serviceRole: SERVICE_ROLE,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || null,
      userId: user.id,
      plan,
      amountPaid: order.amount_paid ? order.amount_paid / 100 : null,
      source: "verify",
    });

    return new Response(JSON.stringify({ ok: true, credited: result.credited, profile: result.profile, expiry: result.profile.course_expiry }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
