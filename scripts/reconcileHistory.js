import fetch from 'node-fetch';
import https from 'https';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

const RZP_KEY_ID = "rzp_live_RQ3j8q0X3k4l31"; // Or current live Razorpay key
const RZP_KEY_SECRET = "";

const agent = new https.Agent({ rejectUnauthorized: false });

async function reconcileUserOrders() {
  console.log("====================================================");
  console.log("   🔬 DEEP RECONCILIATION OF HISTORICAL RECOVERIES");
  console.log("====================================================\n");

  try {
    const profRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*`, {
      agent,
      headers: {
        "apikey": SUPABASE_ANON_KEY,
        "authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const allProfiles = await profRes.json();
    if (!Array.isArray(allProfiles)) {
      console.error("Failed to fetch profiles:", allProfiles);
      return;
    }

    const targetUser1 = allProfiles.find(p => p.id === "03625b6f-4a09-4992-bec5-6aab1fd2732d");
    const targetUser2 = allProfiles.find(p => p.id === "744f57e5-a6b8-475f-b006-7221a50a5b03");

    console.log("--- REPAIRED USER 1 (03625b6f-4a09-4992-bec5-6aab1fd2732d) ---");
    console.log("Profile Data:", JSON.stringify(targetUser1, null, 2));

    console.log("\n--- REPAIRED USER 2 (744f57e5-a6b8-475f-b006-7221a50a5b03) ---");
    console.log("Profile Data:", JSON.stringify(targetUser2, null, 2));

  } catch (err) {
    console.error("Reconciliation error:", err);
  }
}

reconcileUserOrders();
