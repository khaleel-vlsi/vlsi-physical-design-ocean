process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

async function run() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const schema = await res.json();
    if (schema.definitions && schema.definitions.profiles) {
      console.log("Profiles columns:");
      console.log(JSON.stringify(Object.keys(schema.definitions.profiles.properties), null, 2));
    } else {
      console.log("Could not find definitions.profiles in schema. Definitions keys:", Object.keys(schema.definitions || {}));
    }
  } catch (err) {
    console.error("Fetch schema error:", err);
  }
}

run();
