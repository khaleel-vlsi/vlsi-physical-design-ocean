import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
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

/** Constant-time string comparison to avoid timing leaks on the signature. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET") || "";
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") || "";
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!WEBHOOK_SECRET || !RZP_KEY_ID || !RZP_KEY_SECRET || !SUPABASE_URL || !SERVICE_ROLE) {
      return json({ error: "Missing env vars" }, 500);
    }

    const rawBody = await req.text();

    // 1. SECURITY: reject anything not signed by Razorpay (previously only logged a warning).
    const signature = req.headers.get("x-razorpay-signature") || "";
    const expected = await hmacSHA256(WEBHOOK_SECRET, rawBody);
    if (!signature || !safeEqual(expected, signature)) {
      console.warn("Rejected webhook: invalid or missing x-razorpay-signature");
      return json({ error: "Invalid signature" }, 401);
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const event = payload?.event || "";
    const validEvents = ["order.paid", "payment.captured", "payment.authorized"];
    if (!validEvents.includes(event)) {
      return json({ message: "Ignored event: " + event });
    }

    const orderId: string =
      payload?.payload?.order?.entity?.id || payload?.payload?.payment?.entity?.order_id || "";
    const paymentId: string | null = payload?.payload?.payment?.entity?.id || null;

    if (!orderId) {
      return json({ message: "No order id on event" });
    }

    // 2. Always trust Razorpay's API, never the request body, for plan/user/paid status.
    const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
    const ordRes = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
      headers: { Authorization: `Basic ${authBasic}` },
    });
    const order = await ordRes.json().catch(() => ({}));
    if (!ordRes.ok) {
      // 500 => Razorpay will retry later.
      return json({ error: "Failed to fetch order from Razorpay", details: order }, 500);
    }

    const plan = String(order?.notes?.plan || "");
    const userId = String(order?.notes?.user_id || "");

    if (!userId || !isKnownPlan(plan)) {
      return json({ message: "No matching valid plan/user", plan, userId });
    }

    if (order.status !== "paid") {
      // e.g. payment.authorized before capture — order.paid / payment.captured will follow.
      return json({ message: "Order not paid yet; skipping", status: order.status });
    }

    // 3. Credit EXACTLY ONCE. Duplicate events and the browser verify call become no-ops.
    const result = await grantPlanOnce({
      supabaseUrl: SUPABASE_URL,
      serviceRole: SERVICE_ROLE,
      orderId,
      paymentId,
      userId,
      plan,
      amountPaid: order.amount_paid ? order.amount_paid / 100 : null,
      source: "webhook",
    });

    return json({ ok: true, event, credited: result.credited, expiry: result.profile.course_expiry });
  } catch (err) {
    return json({ error: String((err as Error)?.message || err) }, 500);
  }
});
