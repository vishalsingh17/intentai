-- Migration: enterprise_leads
-- New table for enterprise form submissions

CREATE TABLE IF NOT EXISTS public.enterprise_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_enterprise_leads_email
  ON public.enterprise_leads (work_email);

CREATE INDEX IF NOT EXISTS idx_enterprise_leads_created_at
  ON public.enterprise_leads (created_at);

ALTER TABLE public.enterprise_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_enterprise_leads" ON public.enterprise_leads;
CREATE POLICY "public_insert_enterprise_leads"
  ON public.enterprise_leads
  FOR INSERT
  TO public
  WITH CHECK (true);
