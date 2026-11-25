// Shared, single source of truth for plan durations and one-time crediting.
// Used by verify-razorpay-payment, razorpay-webhook and recover-historical-payments.

export const PLAN_DAYS: Record<string, number> = {
  PLAN_1M_INR: 30,
  PLAN_499: 30,
  PLAN_2M_INR: 60,
  PLAN_3M_INR: 90,
  PLAN_6M_INR: 180,
  PLAN_6M_USD: 180,
  PLAN_12M_INR: 365,
  PLAN_12M_USD: 365,
  PLAN_1999: 365,
};

export const PLAN_NAMES: Record<string, string> = {
  PLAN_1M_INR: "Iron Plan (30 Days)",
  PLAN_499: "Iron Plan (30 Days)",
  PLAN_2M_INR: "Copper Plan (60 Days)",
  PLAN_3M_INR: "Silver Plan (90 Days)",
  PLAN_6M_INR: "Gold Plan (180 Days)",
  PLAN_6M_USD: "Gold Plan (180 Days)",
  PLAN_12M_INR: "Diamond Plan (365 Days)",
  PLAN_12M_USD: "Diamond Plan (365 Days)",
  PLAN_1999: "Diamond Plan (365 Days)",
};

export const isKnownPlan = (plan: string) => Object.prototype.hasOwnProperty.call(PLAN_DAYS, plan);

export interface GrantResult {
  credited: boolean; // false => order was already credited before (no extension applied)
  profile: Record<string, unknown>;
}

/**
 * Credits a paid Razorpay order to a user EXACTLY ONCE.
 * Safe to call any number of times (verify + every webhook event) for the same order.
 */
export async function grantPlanOnce(args: {
  supabaseUrl: string;
  serviceRole: string;
  orderId: string;
  paymentId?: string | null;
  userId: string;
  plan: string;
  amountPaid?: number | null; // in major units (₹ / $)
  source: "verify" | "webhook";
}): Promise<GrantResult> {
  const days = PLAN_DAYS[args.plan];
  if (!days) throw new Error(`Unknown plan: ${args.plan}`);

  const res = await fetch(`${args.supabaseUrl}/rest/v1/rpc/grant_plan_once`, {
    method: "POST",
    headers: {
      apikey: args.serviceRole,
      authorization: `Bearer ${args.serviceRole}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_order_id: args.orderId,
      p_payment_id: args.paymentId ?? null,
      p_user_id: args.userId,
      p_plan: args.plan,
      p_days: days,
      p_plan_name: PLAN_NAMES[args.plan],
      p_amount_paid: args.amountPaid ?? null,
      p_source: args.source,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    throw new Error(`grant_plan_once failed: ${JSON.stringify(data)}`);
  }
  return data as GrantResult;
}
