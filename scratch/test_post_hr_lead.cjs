process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

const now = new Date();
const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

const leadsToSync = [
  {
    Registration_Date_Time: formattedDate,
    Student_Name: "Kavya Nair",
    Email: "kavya.nair@gmail.com",
    Country_Code: "+91",
    Phone_Number: "9876543210",
    Full_Contact_Phone: "+91-9876543210",
    Country: "India",
    Subscription_Status: "Unsubscribed (Free User)",
    HR_Outreach_Status: "Pending Contact",
    HR_Notes: "Registered student non-subscriber - Requires HR call"
  },
  {
    Registration_Date_Time: formattedDate,
    Student_Name: "Rahul Verma",
    Email: "rahul.verma@gmail.com",
    Country_Code: "+91",
    Phone_Number: "9123456789",
    Full_Contact_Phone: "+91-9123456789",
    Country: "India",
    Subscription_Status: "Unsubscribed (Free User)",
    HR_Outreach_Status: "Pending Contact",
    HR_Notes: "Registered student non-subscriber - Interested in STA & CTS"
  }
];

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

async function runTestSync() {
  console.log("🚀 Syncing unsubscribed student leads to HR Google Sheet...");
  for (const lead of leadsToSync) {
    try {
      await postToWebhook(lead);
      console.log(`✅ Synced lead: ${lead.Student_Name} (${lead.Email})`);
    } catch (err) {
      console.error(`❌ Failed to sync lead: ${lead.Student_Name}`, err);
    }
  }
  console.log("🎉 All unsubscribed student leads posted!");
}

runTestSync();
