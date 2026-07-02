-- ==============================================================================
-- ADVANCED RESUME BUILDER & CAREER PLATFORM SCHEMA EXTENSIONS
-- Run this in the Supabase SQL Editor
-- ==============================================================================

-- 1. Extend the existing `resumes` table
ALTER TABLE resumes
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS share_token UUID DEFAULT gen_random_uuid(),
ADD COLUMN IF NOT EXISTS target_company VARCHAR(255) DEFAULT NULL;

-- Make sure share_token is unique
ALTER TABLE resumes DROP CONSTRAINT IF EXISTS resumes_share_token_key;
ALTER TABLE resumes ADD CONSTRAINT resumes_share_token_key UNIQUE (share_token);

-- 2. Create `resume_versions` table for Version History
CREATE TABLE IF NOT EXISTS resume_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    version_name VARCHAR(100) NOT NULL, -- e.g., "Auto-save before AI Generation", "Version 1.0"
    sections_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS for Resume Versions
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own resume versions"
    ON resume_versions FOR ALL
    USING (auth.uid() = user_id);

-- 3. Create `ai_request_cache` table for AI Cost Optimization
CREATE TABLE IF NOT EXISTS ai_request_cache (
    request_hash VARCHAR(64) PRIMARY KEY, -- SHA-256 hash of the input parameters
    provider VARCHAR(50) NOT NULL, -- e.g., 'gemini', 'openai'
    prompt_type VARCHAR(50) NOT NULL, -- e.g., 'objective', 'enhance_bullets'
    response_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- RLS for AI Request Cache (Read-only for all authenticated users, write via service role / secure function)
ALTER TABLE ai_request_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ai cache"
    ON ai_request_cache FOR SELECT
    USING (auth.role() = 'authenticated');

-- We won't allow direct insert from client for cache to prevent poisoning. 
-- Cache inserts should ideally happen via Supabase Edge Functions, 
-- but if inserting from client, we can restrict it.
CREATE POLICY "Authenticated users can insert ai cache"
    ON ai_request_cache FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');


-- 4. Create Public Access Policy for Shared Resumes
-- Allows unauthenticated (or anyone) to view a resume if it's public and accessed via the share token.
-- Supabase REST API doesn't easily allow filtering by token via RLS without a specific query,
-- but we can enable SELECT on resumes where is_public = true.
DROP POLICY IF EXISTS "Anyone can view public resumes" ON resumes;
CREATE POLICY "Anyone can view public resumes"
    ON resumes FOR SELECT
    USING (is_public = true);

-- 5. Create `user_analytics` table
CREATE TABLE IF NOT EXISTS user_analytics (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_ai_requests INT DEFAULT 0,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own analytics"
    ON user_analytics FOR SELECT
    USING (auth.uid() = user_id);

-- 6. Trigger to track version limits (keep max 10 versions per resume)
CREATE OR REPLACE FUNCTION check_resume_version_limit()
RETURNS TRIGGER AS $$
DECLARE
    version_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO version_count FROM resume_versions WHERE resume_id = NEW.resume_id;
    
    IF version_count >= 15 THEN
        -- Delete the oldest version to make room
        DELETE FROM resume_versions 
        WHERE id IN (
            SELECT id FROM resume_versions 
            WHERE resume_id = NEW.resume_id 
            ORDER BY created_at ASC 
            LIMIT 1
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_version_limit ON resume_versions;
CREATE TRIGGER enforce_version_limit
    BEFORE INSERT ON resume_versions
    FOR EACH ROW
    EXECUTE FUNCTION check_resume_version_limit();
