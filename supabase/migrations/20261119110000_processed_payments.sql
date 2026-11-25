-- ============================================================================
-- Idempotent payment crediting
-- ----------------------------------------------------------------------------
-- BUG FIXED: one Razorpay order was credited multiple times (browser verify +
-- webhook order.paid + payment.captured + payment.authorized). Each call added
-- the plan days on top of the already-extended expiry, so a 1-year purchase
-- became 2+ years.
--
-- FIX: every order_id is recorded exactly once in `processed_payments`
-- (PRIMARY KEY). The `grant_plan_once` function claims the order and extends
-- the profile in ONE transaction, so concurrent/duplicate calls are no-ops.
-- ============================================================================

-- 1. Ledger of credited orders (also serves as purchase history)
CREATE TABLE IF NOT EXISTS public.processed_payments (
  order_id        TEXT PRIMARY KEY,
  payment_id      TEXT,
  user_id         UUID NOT NULL,
  plan            TEXT NOT NULL,
  days_granted    INTEGER NOT NULL DEFAULT 0,
  amount_paid     NUMERIC,
  previous_expiry TIMESTAMPTZ,
  new_expiry      TIMESTAMPTZ,
  source          TEXT NOT NULL DEFAULT 'unknown',   -- verify | webhook | backfill
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_processed_payments_user ON public.processed_payments(user_id);

-- Backend-only table: RLS on, no policies => only service_role can access.
ALTER TABLE public.processed_payments ENABLE ROW LEVEL SECURITY;


-- 2. Atomic "claim order + extend profile" function
CREATE OR REPLACE FUNCTION public.grant_plan_once(
  p_order_id    TEXT,
  p_payment_id  TEXT,
  p_user_id     UUID,
  p_plan        TEXT,
  p_days        INTEGER,
  p_plan_name   TEXT,
  p_amount_paid NUMERIC,
  p_source      TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_claimed     TEXT;
  v_profile     public.profiles%ROWTYPE;
  v_prev_expiry TIMESTAMPTZ;
  v_base        TIMESTAMPTZ;
  v_new_expiry  TIMESTAMPTZ;
BEGIN
  IF p_order_id IS NULL OR p_order_id = '' OR p_user_id IS NULL OR p_days IS NULL OR p_days <= 0 THEN
    RAISE EXCEPTION 'grant_plan_once: invalid arguments';
  END IF;

  -- Claim the order. If another call already claimed it, this inserts nothing
  -- (concurrent callers block on the PK until the first commits).
  INSERT INTO public.processed_payments (order_id, payment_id, user_id, plan, days_granted, amount_paid, source)
  VALUES (p_order_id, p_payment_id, p_user_id, p_plan, p_days, p_amount_paid, p_source)
  ON CONFLICT (order_id) DO NOTHING
  RETURNING order_id INTO v_claimed;

  -- Lock the profile row so two DIFFERENT orders for the same user stack correctly.
  SELECT * INTO v_profile FROM public.profiles WHERE id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'grant_plan_once: profile % not found', p_user_id;
  END IF;

  IF v_claimed IS NULL THEN
    -- Already credited earlier: DO NOT extend again.
    RETURN jsonb_build_object('credited', false, 'profile', to_jsonb(v_profile));
  END IF;

  v_prev_expiry := v_profile.course_expiry::timestamptz;

  -- Genuine renewal: stack on top of remaining active days; otherwise start now.
  IF v_profile.course_active AND v_prev_expiry IS NOT NULL AND v_prev_expiry > NOW() THEN
    v_base := v_prev_expiry;
  ELSE
    v_base := NOW();
  END IF;

  v_new_expiry := v_base + make_interval(days => p_days);

  UPDATE public.profiles
     SET course_active   = true,
         course_expiry   = v_new_expiry,
         active_plan     = p_plan_name,
         last_payment_id = COALESCE(p_payment_id, p_order_id),
         last_payment_at = NOW()
   WHERE id = p_user_id
  RETURNING * INTO v_profile;

  UPDATE public.processed_payments
     SET previous_expiry = v_prev_expiry,
         new_expiry      = v_new_expiry
   WHERE order_id = p_order_id;

  RETURN jsonb_build_object('credited', true, 'profile', to_jsonb(v_profile));
END;
$$;

-- Only the backend (service_role) may call it — never the browser.
REVOKE ALL ON FUNCTION public.grant_plan_once(TEXT, TEXT, UUID, TEXT, INTEGER, TEXT, NUMERIC, TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.grant_plan_once(TEXT, TEXT, UUID, TEXT, INTEGER, TEXT, NUMERIC, TEXT) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.grant_plan_once(TEXT, TEXT, UUID, TEXT, INTEGER, TEXT, NUMERIC, TEXT) TO service_role;
