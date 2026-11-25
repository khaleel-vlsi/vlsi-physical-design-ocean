import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { PLAN_DAYS, PLAN_NAMES } from "../_shared/grantPlan.ts";

/**
 * ADMIN-ONLY audit & repair of subscription expiry dates.
 *
 * Header required:  x-admin-secret: <ADMIN_SECRET>
 * Body (JSON):
 *   { "mode": "dry-run" }                       -> DEFAULT. Report only, changes nothing.
 *   { "mode": "backfill-ledger" }               -> Record all historical paid orders in
 *                                                  processed_payments so they can never be
 *                                                  credited again. Does NOT touch profiles.
 *   { "mode": "apply", "user_ids": ["..."] }    -> Set ONLY the listed users' expiry to the
 *                                                  correct value computed from their orders.
 *
 * Correct expiry = orders processed oldest-first:
 *   expiry = max(previous expiry, order date) + plan days
 */

function corsHeaders(origin = "*") {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-user-token, x-admin-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const DAY_MS = 24 * 60 * 60 * 1000;
const TOLERANCE_DAYS = 2; // crediting happened seconds/minutes after order creation

serve(async (req) => {
  const origin = req.headers.get("origin") ?? "*";
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body, null, 2), {
      status,
      headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
    });

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(origin) });
  }

  try {
    const RZP_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") || "";
    const RZP_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") || "";
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const ADMIN_SECRET = Deno.env.get("ADMIN_SECRET") || "";

    if (!RZP_KEY_ID || !RZP_KEY_SECRET || !SUPABASE_URL || !SERVICE_ROLE || !ADMIN_SECRET) {
      return json({ error: "Missing required environment variables" }, 500);
    }

    // SECURITY: admin only (previously anyone could call this and rewrite all profiles).
    if (req.method !== "POST" || req.headers.get("x-admin-secret") !== ADMIN_SECRET) {
      return json({ error: "Forbidden" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const mode: string = body?.mode || "dry-run";
    const applyIds = new Set<string>(Array.isArray(body?.user_ids) ? body.user_ids : []);

    if (!["dry-run", "backfill-ledger", "apply"].includes(mode)) {
      return json({ error: `Unknown mode: ${mode}` }, 400);
    }
    if (mode === "apply" && applyIds.size === 0) {
      return json({ error: "mode=apply requires a non-empty user_ids array" }, 400);
    }

    const sbHeaders = {
      apikey: SERVICE_ROLE,
      authorization: `Bearer ${SERVICE_ROLE}`,
      "Content-Type": "application/json",
    };

    // 1. All profiles
    const profRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?select=id,email,course_active,course_expiry,active_plan`,
      { headers: sbHeaders },
    );
    const allProfiles = await profRes.json().catch(() => []);
    if (!Array.isArray(allProfiles)) {
      return json({ error: "Failed to fetch profiles", details: allProfiles }, 500);
    }
    const profileById = new Map<string, any>();
    const profileByEmail = new Map<string, any>();
    for (const p of allProfiles) {
      if (p.id) profileById.set(p.id, p);
      if (p.email) profileByEmail.set(String(p.email).toLowerCase().trim(), p);
    }

    // 2. ALL Razorpay orders (paginated — previously only the first 100 were read)
    const authBasic = btoa(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`);
    const rzpOrders: any[] = [];
    for (let skip = 0; skip < 100000; skip += 100) {
      const r = await fetch(`https://api.razorpay.com/v1/orders?count=100&skip=${skip}`, {
        headers: { Authorization: `Basic ${authBasic}` },
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) return json({ error: "Razorpay orders fetch failed", details: d }, 500);
      const items = Array.isArray(d?.items) ? d.items : [];
      rzpOrders.push(...items);
      if (items.length < 100) break;
    }

    const paidOrders = rzpOrders.filter((o) => o.status === "paid");

    // 3. Group paid orders by user
    const userOrders = new Map<string, any[]>();
    const unmappedOrders: any[] = [];
    for (const o of paidOrders) {
      const plan = String(o?.notes?.plan || "");
      const uid = String(o?.notes?.user_id || "");
      const email = String(o?.notes?.email || "").toLowerCase().trim();
      const profile = (uid && profileById.get(uid)) || (email && profileByEmail.get(email)) || null;

      const entry = {
        order_id: o.id,
        plan,
        days: PLAN_DAYS[plan] ?? 0,
        amount_paid: o.amount_paid ? o.amount_paid / 100 : 0,
        currency: o.currency,
        created_at_ms: o.created_at * 1000,
        created_at: new Date(o.created_at * 1000).toISOString(),
      };

      if (!profile || !entry.days) {
        unmappedOrders.push({ ...entry, notes: o.notes, reason: !profile ? "no matching profile" : "unknown plan" });
        continue;
      }
      if (!userOrders.has(profile.id)) userOrders.set(profile.id, []);
      userOrders.get(profile.id)!.push(entry);
    }

    // 4. Compute correct expiry per user and compare to DB
    const now = Date.now();
    const report: any[] = [];
    for (const [userId, orders] of userOrders.entries()) {
      orders.sort((a, b) => a.created_at_ms - b.created_at_ms);
      let exp = 0;
      for (const o of orders) exp = Math.max(exp, o.created_at_ms) + o.days * DAY_MS;

      const p = profileById.get(userId);
      const dbExpMs = p?.course_expiry ? new Date(p.course_expiry).getTime() : 0;
      const diffDays = Math.round((dbExpMs - exp) / DAY_MS);

      let status = "OK";
      if (diffDays > TOLERANCE_DAYS) status = "OVER_CREDITED";
      else if (diffDays < -TOLERANCE_DAYS) status = "UNDER_CREDITED";

      report.push({
        user_id: userId,
        email: p?.email || "N/A",
        status,
        extra_days_in_db: diffDays,
        db_expiry: p?.course_expiry || null,
        correct_expiry: new Date(exp).toISOString(),
        correct_active: exp > now,
        last_plan: PLAN_NAMES[orders[orders.length - 1].plan],
        total_paid_days: orders.reduce((s, o) => s + o.days, 0),
        orders: orders.map(({ created_at_ms, ...rest }) => rest),
      });
    }
    report.sort((a, b) => b.extra_days_in_db - a.extra_days_in_db);

    // Active profiles with NO paid Razorpay order (manual grants / legacy) — never auto-changed.
    const activeWithoutOrders = allProfiles
      .filter((p) => p.course_active && !userOrders.has(p.id) && p.course_expiry && new Date(p.course_expiry).getTime() > now)
      .map((p) => ({ user_id: p.id, email: p.email, course_expiry: p.course_expiry, active_plan: p.active_plan }));

    const summary = {
      mode,
      total_profiles: allProfiles.length,
      total_razorpay_orders: rzpOrders.length,
      paid_orders: paidOrders.length,
      paying_users: userOrders.size,
      over_credited_users: report.filter((r) => r.status === "OVER_CREDITED").length,
      under_credited_users: report.filter((r) => r.status === "UNDER_CREDITED").length,
      ok_users: report.filter((r) => r.status === "OK").length,
      active_without_paid_orders: activeWithoutOrders.length,
      unmapped_orders: unmappedOrders.length,
    };

    // ---- helper: backfill ledger rows (idempotent) ----
    const backfill = async (userId: string, orders: any[]) => {
      const rows = orders.map((o) => ({
        order_id: o.order_id,
        user_id: userId,
        plan: o.plan,
        days_granted: o.days,
        amount_paid: o.amount_paid,
        source: "backfill",
      }));
      if (rows.length === 0) return true;
      const r = await fetch(`${SUPABASE_URL}/rest/v1/processed_payments?on_conflict=order_id`, {
        method: "POST",
        headers: { ...sbHeaders, Prefer: "resolution=ignore-duplicates,return=minimal" },
        body: JSON.stringify(rows),
      });
      return r.ok;
    };

    if (mode === "dry-run") {
      return json({ ok: true, summary, report, active_without_paid_orders: activeWithoutOrders, unmapped_orders: unmappedOrders });
    }

    if (mode === "backfill-ledger") {
      let okCount = 0;
      const failed: string[] = [];
      for (const [userId, orders] of userOrders.entries()) {
        (await backfill(userId, orders)) ? okCount++ : failed.push(userId);
      }
      return json({ ok: failed.length === 0, summary, backfilled_users: okCount, failed_users: failed });
    }

    // mode === "apply": only explicitly approved user IDs
    const applied: any[] = [];
    const skipped: string[] = [];
    for (const r of report) {
      if (!applyIds.has(r.user_id)) continue;
      const upd = await fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${r.user_id}`, {
        method: "PATCH",
        headers: { ...sbHeaders, Prefer: "return=minimal" },
        body: JSON.stringify({
          course_active: r.correct_active,
          course_expiry: r.correct_expiry,
          active_plan: r.last_plan,
        }),
      });
      if (upd.ok) {
        await backfill(r.user_id, userOrders.get(r.user_id) || []);
        applied.push({ user_id: r.user_id, email: r.email, from: r.db_expiry, to: r.correct_expiry });
      } else {
        skipped.push(r.user_id);
      }
    }
    const notFound = [...applyIds].filter((id) => !report.some((r) => r.user_id === id));
    return json({ ok: skipped.length === 0, applied, failed: skipped, not_found_in_paid_users: notFound });
  } catch (err) {
    return json({ error: String((err as Error)?.message || err) }, 500);
  }
});
