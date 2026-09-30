import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-user-token, x-admin-secret",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };
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
      return new Response(JSON.stringify({ error: "Missing required environment variables" }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    // 1. Fetch all profiles from Supabase DB
    const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*`, {
      headers: {
        "apikey": SERVICE_ROLE,
        "authorization": `Bearer ${SERVICE_ROLE}`,
      },
    });
    const allProfiles = await profRes.json().catch(() => []);
    if (!Array.isArray(allProfiles)) {
      return new Response(JSON.stringify({ error: "Failed to fetch profiles", details: allProfiles }), {
        status: 500,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      });
    }

    const profileById = new Map();
    const profileByEmail = new Map();
    allProfiles.forEach((p: any) => {
      if (p.id) profileById.set(p.id, p);
      if (p.email) profileByEmail.set(p.email.toLowerCase().trim(), p);
    });

    // 2. Fetch paid orders from Razorpay API
    const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders?count=100", {
      headers: { "Authorization": `Basic ${authBasic}` },
    });
    const rzpData = await rzpRes.json().catch(() => ({}));
    const rzpOrders = Array.isArray(rzpData?.items) ? rzpData.items : [];

    const paidOrders = rzpOrders.filter((o: any) => o.status === "paid" || (o.amount_paid || 0) > 0);

    const userOrdersMap = new Map<string, any[]>();
    const unmappedOrders: any[] = [];

    for (const order of paidOrders) {
      const orderUserId = order?.notes?.user_id;
      const orderEmail = (order?.notes?.email || "").toLowerCase().trim();

      let targetProfile = orderUserId ? profileById.get(orderUserId) : null;
      if (!targetProfile && orderEmail) {
        targetProfile = profileByEmail.get(orderEmail);
      }

      if (targetProfile) {
        const uId = targetProfile.id;
        if (!userOrdersMap.has(uId)) userOrdersMap.set(uId, []);
        userOrdersMap.get(uId)!.push({
          order_id: order.id,
          amount_paid: order.amount_paid ? order.amount_paid / 100 : 0,
          plan: order?.notes?.plan || "PLAN_499",
          created_at: order.created_at,
          created_at_iso: new Date(order.created_at * 1000).toISOString()
        });
      } else {
        unmappedOrders.push({
          order_id: order.id,
          amount_paid: order.amount_paid ? order.amount_paid / 100 : 0,
          notes: order.notes
        });
      }
    }

    const daysMap: Record<string, number> = {
      "PLAN_1M_INR": 30,
      "PLAN_499": 30,
      "PLAN_2M_INR": 60,
      "PLAN_3M_INR": 90,
      "PLAN_6M_INR": 180,
      "PLAN_6M_USD": 180,
      "PLAN_12M_INR": 365,
      "PLAN_12M_USD": 365,
      "PLAN_1999": 365
    };

    const planNameMap: Record<string, string> = {
      "PLAN_1M_INR": "Iron Plan (30 Days)",
      "PLAN_499": "Iron Plan (30 Days)",
      "PLAN_2M_INR": "Copper Plan (60 Days)",
      "PLAN_3M_INR": "Silver Plan (90 Days)",
      "PLAN_6M_INR": "Gold Plan (180 Days)",
      "PLAN_6M_USD": "Gold Plan (180 Days)",
      "PLAN_12M_INR": "Diamond Plan (365 Days)",
      "PLAN_12M_USD": "Diamond Plan (365 Days)",
      "PLAN_1999": "Diamond Plan (365 Days)"
    };

    const now = Date.now();
    const reconciliationReport: any[] = [];
    let repairedUsersCount = 0;
    let activeUsersPreservedCount = 0;

    for (const [userId, orders] of userOrdersMap.entries()) {
      const profile = profileById.get(userId);
      orders.sort((a, b) => a.created_at - b.created_at);

      const firstOrder = orders[0];
      let cumulativeMs = firstOrder.created_at * 1000;
      let totalDaysGranted = 0;
      let lastPlanName = planNameMap[firstOrder.plan] || "Iron Plan (30 Days)";

      for (const ord of orders) {
        const days = daysMap[ord.plan] || 30;
        totalDaysGranted += days;
        cumulativeMs += days * 24 * 60 * 60 * 1000;
        lastPlanName = planNameMap[ord.plan] || lastPlanName;
      }

      // Grace activation if cumulative expiry is in the past:
      if (cumulativeMs < now) {
        cumulativeMs = now + 30 * 24 * 60 * 60 * 1000;
      }

      const newExpiryIso = new Date(cumulativeMs).toISOString();

      // Check if DB profile needs update
      const needsUpdate = !profile.course_active || new Date(profile.course_expiry).getTime() < cumulativeMs;

      if (needsUpdate) {
        const updates = {
          course_active: true,
          course_expiry: newExpiryIso,
          active_plan: orders.length > 1 ? `Stacked (${orders.length} Plans)` : lastPlanName
        };

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

        if (updRes.ok) {
          repairedUsersCount++;
          reconciliationReport.push({
            user_id: userId,
            email: profile?.email || "N/A",
            total_orders: orders.length,
            total_days_granted: totalDaysGranted,
            previous_course_active: profile?.course_active || false,
            previous_expiry: profile?.course_expiry || "N/A",
            new_course_active: true,
            new_expiry: newExpiryIso,
            orders_reconciled: orders.map(o => o.order_id)
          });
        }
      } else {
        activeUsersPreservedCount++;
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      summary: {
        total_profiles_in_db: allProfiles.length,
        total_paid_razorpay_orders: paidOrders.length,
        unique_paid_users_count: userOrdersMap.size,
        active_users_preserved: activeUsersPreservedCount,
        users_repaired: repairedUsersCount,
        unmapped_orders_count: unmappedOrders.length
      },
      reconciliation_report: reconciliationReport,
      unmapped_orders: unmappedOrders
    }), {
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });
  }
});
