-- Migration: add template_usage table
CREATE TABLE template_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  template_id int,
  used_at timestamp DEFAULT now()
);

-- Enable row-level security
ALTER TABLE template_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user to insert usage" ON template_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow user to read own usage" ON template_usage
  FOR SELECT USING (auth.uid() = user_id);
