process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

const columns = [
  'email',
  'full_name',
  'course_active',
  'course_expiry',
  'placement_active',
  'placement_expiry',
  'mock_remaining',
  'country',
  'country_code',
  'phone_number',
  'active_plan'
];

async function run() {
  for (const col of columns) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=${col}&limit=1`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(`Column '${col}' is NOT valid. Error:`, data.message || data);
      } else {
        console.log(`Column '${col}' is VALID.`);
      }
    } catch (err) {
      console.error(`Error checking column ${col}:`, err);
    }
  }
}

run();
