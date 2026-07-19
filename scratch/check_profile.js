const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkProfile() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', 'vlsiphysicaldesignocean@gmail.com')
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
  } else if (!data) {
    console.log('No profile found for email vlsiphysicaldesignocean@gmail.com');
  } else {
    console.log('Profile found:');
    console.log('id:', data.id);
    console.log('email:', data.email);
    console.log('course_active:', data.course_active, typeof data.course_active);
    console.log('course_expiry:', data.course_expiry, typeof data.course_expiry);
    console.log('placement_active:', data.placement_active);
    console.log('placement_expiry:', data.placement_expiry);
  }
}

checkProfile();
