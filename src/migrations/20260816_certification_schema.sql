-- ====================================================================
-- VLSI Physical Design Ocean — Strict Certification Exam System Schema
-- Migration: 20260816_certification_schema.sql
-- ====================================================================

-- 1. Certification Attempts & Sessions Table
CREATE TABLE IF NOT EXISTS public.certification_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_number INT NOT NULL DEFAULT 1,
  max_allowed_attempts INT NOT NULL DEFAULT 1,
  active_plan TEXT NOT NULL DEFAULT '1 Month',
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS', 'PASSED', 'FAILED', 'TERMINATED'
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  total_marks NUMERIC NOT NULL DEFAULT 200,
  obtained_marks NUMERIC DEFAULT 0,
  percentage NUMERIC DEFAULT 0,
  is_pass BOOLEAN DEFAULT FALSE,
  violation_count INT DEFAULT 0,
  termination_reason TEXT, -- 'FULLSCREEN_VIOLATION', 'TAB_SWITCH_VIOLATION', 'CAMERA_LOST', 'EXPIRED'
  paper_snapshot JSONB NOT NULL,
  user_answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL, -- e.g. CERT-VLSI-2026-X8F92
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attempt_id UUID NOT NULL REFERENCES public.certification_attempts(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  course_name TEXT NOT NULL DEFAULT 'VLSI Physical Design Mastery',
  score_obtained NUMERIC NOT NULL,
  total_score NUMERIC NOT NULL DEFAULT 200,
  percentage NUMERIC NOT NULL,
  issue_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ISSUED', -- 'ISSUED', 'REVOKED'
  email_status TEXT NOT NULL DEFAULT 'SENT', -- 'PENDING', 'SENT', 'FAILED'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Certification Violations Audit Log
CREATE TABLE IF NOT EXISTS public.certification_violations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id UUID NOT NULL REFERENCES public.certification_attempts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  violation_type TEXT NOT NULL, -- 'FULLSCREEN_EXIT', 'TAB_SWITCH', 'CAMERA_DISCONNECTED', 'MULTIPLE_TAB'
  details TEXT,
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cert_attempts_user ON public.certification_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_cert_attempts_status ON public.certification_attempts(status);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_id ON public.certificates(certificate_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);

-- RLS Policies
ALTER TABLE public.certification_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certification_violations ENABLE ROW LEVEL SECURITY;

-- Allow users to view and interact with their own certification attempts
CREATE POLICY "Users can read own certification attempts" ON public.certification_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certification attempts" ON public.certification_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own certification attempts" ON public.certification_attempts
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to read their own certificates
CREATE POLICY "Users can read own certificates" ON public.certificates
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certificates" ON public.certificates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow public verification of certificates by certificate_id
CREATE POLICY "Public can verify certificates by ID" ON public.certificates
  FOR SELECT USING (true);

-- Allow users to insert violations
CREATE POLICY "Users can insert certification violations" ON public.certification_violations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
