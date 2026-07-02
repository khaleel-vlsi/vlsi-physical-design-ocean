-- SQL Migration: Create physical_design_jobs table
-- Run this in Supabase SQL Editor: https://ygcvcyoynmyrplwrpisd.supabase.co

-- Step 1: Create the jobs table
CREATE TABLE IF NOT EXISTS physical_design_jobs (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  company TEXT NOT NULL,
  domain TEXT NOT NULL DEFAULT 'Semiconductor',
  logo_color TEXT NOT NULL DEFAULT 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
  title TEXT NOT NULL,
  experience TEXT NOT NULL DEFAULT 'Experienced',
  exp_range TEXT NOT NULL DEFAULT '3-6 Years',
  location TEXT NOT NULL DEFAULT 'Global',
  type TEXT NOT NULL DEFAULT 'Onsite',
  skills TEXT[] NOT NULL DEFAULT '{}',
  tools TEXT[] NOT NULL DEFAULT '{}',
  date TEXT NOT NULL DEFAULT 'Recently Scraped',
  description TEXT NOT NULL DEFAULT '',
  apply_url TEXT NOT NULL,
  match_score INTEGER NOT NULL DEFAULT 90,
  source TEXT NOT NULL DEFAULT 'scraper',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Step 2: Create indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_jobs_company ON physical_design_jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_domain ON physical_design_jobs(domain);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON physical_design_jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON physical_design_jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON physical_design_jobs(created_at DESC);

-- Step 3: Enable Row Level Security (RLS)
ALTER TABLE physical_design_jobs ENABLE ROW LEVEL SECURITY;

-- Step 4: Allow authenticated users to read jobs (premium check happens in frontend)
CREATE POLICY "Allow public read access to active jobs"
  ON physical_design_jobs
  FOR SELECT
  USING (is_active = true);

-- Step 5: Allow service role (scraper) to insert/update/delete
CREATE POLICY "Allow service role full access"
  ON physical_design_jobs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Step 6: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON physical_design_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();

-- Step 7: Create a view for scraper stats
CREATE OR REPLACE VIEW scraper_stats AS
SELECT
  COUNT(*) FILTER (WHERE is_active = true) AS active_jobs_count,
  COUNT(DISTINCT company) FILTER (WHERE is_active = true) AS companies_count,
  COUNT(DISTINCT domain) FILTER (WHERE is_active = true) AS domains_count,
  MAX(updated_at) AS last_sync,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 minutes') AS new_jobs_last_30min
FROM physical_design_jobs;
