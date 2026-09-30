process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const SUPABASE_URL = "https://ygcvcyoynmyrplwrpisd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";
const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

function fetchAllProfiles() {
  return new Promise((resolve, reject) => {
    const url = `${SUPABASE_URL}/rest/v1/profiles?select=*`;
    const parsedUrl = new URL(url);

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', err => reject(err));
    req.end();
  });
}

function postToWebhook(payload) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams(payload).toString();
    const parsedUrl = new URL(HR_WEBHOOK_URL);

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', err => reject(err));
    req.write(postData);
    req.end();
  });
}

async function runLiveSync() {
  console.log("🔍 Fetching ALL registered student profiles from Supabase database...");
  try {
    const allProfiles = await fetchAllProfiles();

    if (!Array.isArray(allProfiles)) {
      console.error("❌ Database Error or Invalid Response:", allProfiles);
      process.exit(1);
    }

    console.log(`📊 Total profiles found in database: ${allProfiles.length}`);

    // Filter unsubscribed (course_active !== true)
    const unsubscribed = allProfiles.filter(p => p.course_active !== true);

    console.log(`🎯 Unsubscribed registered students found: ${unsubscribed.length}`);

    if (unsubscribed.length === 0) {
      console.log("ℹ️ All registered students currently have active paid subscriptions, or database has 0 unsubscribed accounts.");
      return;
    }

    let count = 0;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    for (const lead of unsubscribed) {
      if (!lead.email) continue;
      const cleanPhone = (lead.phone_number || '').replace(/\s+/g, '');
      const code = (lead.country_code || '+91').replace(/\+/g, '');
      const fullContact = `+${code}-${cleanPhone}`;

      const payload = {
        Registration_Date_Time: lead.created_at ? lead.created_at.slice(0, 16).replace('T', ' ') : formattedDate,
        Student_Name: lead.full_name || lead.email.split('@')[0],
        Email: lead.email,
        Country_Code: `+${code}`,
        Phone_Number: cleanPhone,
        Full_Contact_Phone: fullContact,
        Country: lead.country || 'India',
        Subscription_Status: 'Unsubscribed (Free User)',
        HR_Outreach_Status: 'Pending Contact',
        HR_Notes: 'Live Supabase Audit - Unsubscribed Student Lead'
      };

      await postToWebhook(payload);
      count++;
      console.log(`✅ [${count}/${unsubscribed.length}] Synced to HR Sheet: ${lead.email} (${lead.full_name || 'Student'})`);
    }

    console.log(`\n🎉 LIVE SYNC COMPLETE! Successfully updated ${count} unsubscribed student accounts to HR Google Sheet.`);
  } catch (err) {
    console.error("❌ Error running live sync:", err);
  }
}

runLiveSync();
