// portal_private_2026/supabaseClient.js
// Supabase client (browser) using CDN build

const SUPABASE_URL = "https://ygcvcoynmyrplwrpisd.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZMuHJtseBcfEUwnoybQQ0A_uau7W_6j";

// Create client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
