-- Migration: create resumes table
CREATE TABLE resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  template_id int,
  data jsonb,
  generation_count int DEFAULT 0,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Enable row-level security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user to manage own resumes"
  ON resumes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
