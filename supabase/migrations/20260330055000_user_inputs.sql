-- Migration: user_inputs
-- Tables: early_access_signups, demo_inputs

-- 1. Early Access Signups Table
CREATE TABLE IF NOT EXISTS public.early_access_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT DEFAULT 'hero',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_signups_email
  ON public.early_access_signups (email);

CREATE INDEX IF NOT EXISTS idx_early_access_signups_created_at
  ON public.early_access_signups (created_at);

-- 2. Demo Inputs Table
CREATE TABLE IF NOT EXISTS public.demo_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_demo_inputs_created_at
  ON public.demo_inputs (created_at);

-- 3. Enable RLS
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_inputs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies: allow anyone to insert (public sign-up form), no reads for anon
DROP POLICY IF EXISTS "public_insert_early_access" ON public.early_access_signups;
CREATE POLICY "public_insert_early_access"
  ON public.early_access_signups
  FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_insert_demo_inputs" ON public.demo_inputs;
CREATE POLICY "public_insert_demo_inputs"
  ON public.demo_inputs
  FOR INSERT
  TO public
  WITH CHECK (true);
