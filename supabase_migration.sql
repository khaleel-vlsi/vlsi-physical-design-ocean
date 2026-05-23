-- SQL Migration to add email drip and renewal tracking columns to profiles table
-- Paste and run this script in the Supabase SQL Editor (SQL Editor -> New Query -> Run)

-- 1. Add tracking columns to track email delivery statuses
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS drip_1hour_sent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS drip_4day_last_sent TIMESTAMP WITH TIME ZONE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS renewal_email_sent BOOLEAN DEFAULT false;

-- 2. Create trigger function to reset renewal status when user renews (extends course_expiry)
CREATE OR REPLACE FUNCTION public.handle_profile_renewal_reset()
RETURNS TRIGGER AS $$
BEGIN
  -- If course_expiry is updated to a future timestamp, reset renewal email status
  IF NEW.course_expiry IS DISTINCT FROM OLD.course_expiry AND NEW.course_expiry > NOW() THEN
    NEW.renewal_email_sent := false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create trigger
DROP TRIGGER IF EXISTS on_profile_course_expiry_update ON public.profiles;
CREATE TRIGGER on_profile_course_expiry_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_renewal_reset();
