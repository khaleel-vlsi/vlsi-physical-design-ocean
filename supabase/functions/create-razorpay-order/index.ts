// supabase/functions/create-razorpay-order/index.ts
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

const BASE_PLAN_DETAILS: Record<string, { price: number; currency: string; name: string }> = {
  'PLAN_499': { price: 499, currency: 'INR', name: 'Iron Plan (1 Month)' },
  'PLAN_2M_INR': { price: 799, currency: 'INR', name: 'Copper Plan (2 Months)' },
  'PLAN_3M_INR': { price: 999, currency: 'INR', name: 'Silver Plan (3 Months)' },
  'PLAN_6M_INR': { price: 1499, currency: 'INR', name: 'Gold Plan (6 Months)' },
  'PLAN_12M_INR': { price: 1799, currency: 'INR', name: 'Diamond Plan (12 Months)' },
  'PLAN_6M_USD': { price: 40, currency: 'USD', name: 'Gold Plan (6 Months - USD)' },
  'PLAN_12M_USD': { price: 60, currency: 'USD', name: 'Diamond Plan (12 Months - USD)' },
  'PLAN_1999': { price: 1999, currency: 'INR', name: 'Legacy Diamond Plan (12 Months)' }
};

// Authoritative 25% OFF Independence Day Offer Prices (14 Aug 12 PM - 16 Aug 8 PM IST)
const INDEPENDENCE_OFFER_PRICES: Record<string, number> = {
  'PLAN_499': 374,
  'PLAN_1M_INR': 374,
  'PLAN_2M_INR': 599,
  'PLAN_3M_INR': 749,
  'PLAN_6M_INR': 1124,
  'PLAN_12M_INR': 1349,
};

const OFFER_START_MS = new Date("2026-08-14T10:06:00+05:30").getTime();
const OFFER_END_MS = new Date("2026-08-16T20:00:00+05:30").getTime();

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

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

    // 2. Parse request plan
    const { plan } = await req.json().catch(() => ({}));
    if (!plan) {
      return new Response(JSON.stringify({ error: "No plan selected" }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // Map PLAN_1M_INR to legacy PLAN_499
    const targetPlan = plan === "PLAN_1M_INR" ? "PLAN_499" : plan;
    const planConfig = BASE_PLAN_DETAILS[targetPlan];

    if (!planConfig) {
      return new Response(JSON.stringify({ error: `Invalid plan: ${plan}` }), {
        status: 400,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 🔒 SERVER-SIDE AUTHORITATIVE TIME & PRICE CALCULATION
    const now = Date.now();
    const isOfferActive = now >= OFFER_START_MS && now < OFFER_END_MS;

    let finalPrice = planConfig.price;
    if (isOfferActive && INDEPENDENCE_OFFER_PRICES[targetPlan] !== undefined) {
      finalPrice = INDEPENDENCE_OFFER_PRICES[targetPlan];
    }

    const amountInPaise = finalPrice * 100;

    // 3. Create Razorpay order
    const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authBasic}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: planConfig.currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          plan: targetPlan,
          user_id: user.id,
          offer_applied: isOfferActive ? "INDEPENDENCE_DAY_25_OFF" : "NONE",
          charged_price: finalPrice
        }
      })
    });

    const orderData = await rzpRes.json();
    if (!rzpRes.ok) {
      return new Response(JSON.stringify({ error: "Razorpay order creation failed", details: orderData }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 4. Return order options to frontend
    return new Response(
      JSON.stringify({
        key: RZP_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        user_email: user.email,
        plan: targetPlan,
        charged_price: finalPrice
      }),
      {
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
