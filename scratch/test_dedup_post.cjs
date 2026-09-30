process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

const testLead = {
  Registration_Date_Time: "2026-08-09 17:55",
  Student_Name: "Kavya Nair",
  Email: "kavya.nair@gmail.com",
  Country_Code: "+91",
  Phone_Number: "9876543210",
  Full_Contact_Phone: "+91-9876543210",
  Country: "India",
  Subscription_Status: "Unsubscribed (Free User)",
  HR_Outreach_Status: "",
  HR_Notes: ""
};

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

async function verifyDeduplication() {
  console.log("🧪 Testing Duplicate Email Guard on HR Webhook...");
  try {
    const res = await postToWebhook(testLead);
    console.log("📩 Webhook Response for Duplicate Email (kavya.nair@gmail.com):", res);
  } catch (err) {
    console.error("❌ Error testing deduplication:", err);
  }
}

verifyDeduplication();
