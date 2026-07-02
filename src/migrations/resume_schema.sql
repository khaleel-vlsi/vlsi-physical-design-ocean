-- Core resume table (supports 10 per user)
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Untitled Resume',
  template_id TEXT DEFAULT 'professional',
  sections JSONB DEFAULT '{}',        -- all resume section data
  ats_score INTEGER,
  is_draft BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'scratch',       -- 'scratch' | 'upload'
  original_file_url TEXT,              -- if uploaded
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Cover letters
CREATE TABLE IF NOT EXISTS cover_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  company TEXT,
  role TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AI generation history (for audit + rate limiting)
CREATE TABLE IF NOT EXISTS ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
  feature TEXT,       -- 'content', 'ats', 'jd_match', 'review', 'interview', 'cover_letter'
  prompt TEXT,
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cover_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

-- Policies for resumes
DROP POLICY IF EXISTS "Users manage own resumes" ON resumes;
CREATE POLICY "Users manage own resumes" ON resumes
  FOR ALL USING (auth.uid() = user_id);

-- Policies for cover_letters
DROP POLICY IF EXISTS "Users manage own cover_letters" ON cover_letters;
CREATE POLICY "Users manage own cover_letters" ON cover_letters
  FOR ALL USING (auth.uid() = user_id);

-- Policies for ai_generations
DROP POLICY IF EXISTS "Users manage own ai_generations" ON ai_generations;
CREATE POLICY "Users manage own ai_generations" ON ai_generations
  FOR ALL USING (auth.uid() = user_id);

-- Trigger: enforce 10-resume limit
CREATE OR REPLACE FUNCTION check_resume_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM resumes WHERE user_id = NEW.user_id) >= 10 THEN
    RAISE EXCEPTION 'Maximum 10 resumes allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_resume_limit ON resumes;
CREATE TRIGGER enforce_resume_limit
  BEFORE INSERT ON resumes
  FOR EACH ROW EXECUTE FUNCTION check_resume_limit();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION moddatetime()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_updated_at ON resumes;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW EXECUTE FUNCTION moddatetime();

-- Create bucket for profile photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resume-profile-photos', 'resume-profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for profile photos storage
DROP POLICY IF EXISTS "Users can upload their own photos" ON storage.objects;
CREATE POLICY "Users can upload their own photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resume-profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can update their own photos" ON storage.objects;
CREATE POLICY "Users can update their own photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'resume-profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete their own photos" ON storage.objects;
CREATE POLICY "Users can delete their own photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'resume-profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Anyone can view profile photos" ON storage.objects;
CREATE POLICY "Anyone can view profile photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'resume-profile-photos');
