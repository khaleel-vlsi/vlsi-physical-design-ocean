// portal_private_2026/supabaseClient.js

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";

// ✅ Use ANON key (JWT)
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
