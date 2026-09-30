process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

const indianLeads = [
  { name: "Ananya Deshmukh", email: "ananya.deshmukh98@gmail.com", phone: "9823011245", city: "Pune", notes: "Inquired about Floorplan & IR Drop module demo" },
  { name: "Siddharth Rao", email: "siddharth.rao.vlsi@gmail.com", phone: "9940123890", city: "Bengaluru", notes: "Interested in Innovus & ICC2 TCL scripting course" },
  { name: "Pooja Kulkarni", email: "pooja.kulkarni2024@outlook.com", phone: "9765432109", city: "Pune", notes: "Fresher looking for Physical Design job placement assist" },
  { name: "Kartik Subramanian", email: "kartik.subbu.ee@gmail.com", phone: "9840987123", city: "Chennai", notes: "Requested discount code for STA PrimeTime masterclass" },
  { name: "Meera Joshi", email: "meera.joshi.vlsi@yahoo.com", phone: "9822104567", city: "Nagpur", notes: "Wants 1-on-1 career guidance call before subscribing" },
  { name: "Venkatesh Iyer", email: "venkatesh.iyer.pd@gmail.com", phone: "9884567123", city: "Chennai", notes: "Working professional wanting weekend Physical Verification class" },
  { name: "Sneha Reddy", email: "sneha.reddy.ece@gmail.com", phone: "9989012345", city: "Hyderabad", notes: "Interested in CTS latency & skew NDR rules module" },
  { name: "Rohan Kulkarni", email: "rohan.kulkarni99@gmail.com", phone: "9822456789", city: "Pune", notes: "Inquired about trial videos for Placement Congestion fixes" },
  { name: "Tanvi Hegde", email: "tanvi.hegde.vlsi@gmail.com", phone: "9845123908", city: "Bengaluru", notes: "Needs details on EMI options for 6-month subscription" },
  { name: "Arjun Nair", email: "arjun.nair.ee@outlook.com", phone: "9895123456", city: "Kochi", notes: "M.Tech student requesting student scholarship assistance" },
  { name: "Divya Sharman", email: "divya.sharma.vlsi@gmail.com", phone: "9811234567", city: "Noida", notes: "Wants HR demo call explaining PrimeTime OCV/POCV content" },
  { name: "Pranav Patil", email: "pranav.patil.pd@gmail.com", phone: "9764512389", city: "Kolhapur", notes: "Inquired about Synthesis SDC constraints module" },
  { name: "Shruti Banerjee", email: "shruti.banerjee.ece@gmail.com", phone: "9830123456", city: "Kolkata", notes: "Looking for job assistance in Cadence Innovus flow" },
  { name: "Aditya Verma", email: "aditya.verma.vlsi@gmail.com", phone: "9871234567", city: "Gurugram", notes: "Requested WhatsApp brochure for Physical Verification LVS/DRC" },
  { name: "Nikhil Chawla", email: "nikhil.chawla.ece@outlook.com", phone: "9818901234", city: "Delhi", notes: "Inquired about DFT scan insertion & ATPG labs" },
  { name: "Ritu Choudhury", email: "ritu.choudhury.vlsi@gmail.com", phone: "9848012345", city: "Hyderabad", notes: "Free user registered yesterday - High intent lead" },
  { name: "Varun Nambiar", email: "varun.nambiar.ece@gmail.com", phone: "9895678901", city: "Trivandrum", notes: "Wants HR call to clarify timing closure module details" },
  { name: "Aishwarya Pillai", email: "aishwarya.pillai.pd@gmail.com", phone: "9840123456", city: "Coimbatore", notes: "Requested demo access to Linux awk/sed scripting" },
  { name: "Harish Saxena", email: "harish.saxena.vlsi@gmail.com", phone: "9415012345", city: "Lucknow", notes: "Inquired about batch start dates and mentor contact" },
  { name: "Neha Agarwal", email: "neha.agarwal.ece@outlook.com", phone: "9837012345", city: "Jaipur", notes: "Wants WhatsApp call regarding course curriculum" },
  { name: "Manoj Kumar", email: "manoj.kumar.pd@gmail.com", phone: "9844012345", city: "Bengaluru", notes: "Physical Design intern seeking full access subscription" },
  { name: "Swati Bhatt", email: "swati.bhatt.vlsi@gmail.com", phone: "9820012345", city: "Mumbai", notes: "Requested details on Cadence vs Synopsys tool lab practicals" },
  { name: "Abhishek Pandey", email: "abhishek.pandey.ee@gmail.com", phone: "9450012345", city: "Varanasi", notes: "Inquired about payment gateway options" },
  { name: "Kavita Rangan", email: "kavita.rangan.ece@gmail.com", phone: "9841012345", city: "Chennai", notes: "Senior engineer requesting course syllabus for team training" },
  { name: "Deepak Saini", email: "deepak.saini.pd@gmail.com", phone: "9829012345", city: "Chandigarh", notes: "Wants demo on Low Power UPF / CPF design" },
  { name: "Preeti Shenoy", email: "preeti.shenoy.vlsi@gmail.com", phone: "9845012345", city: "Mangaluru", notes: "Inquired about mock interview evaluation sessions" },
  { name: "Gaurav Mehta", email: "gaurav.mehta.ee@outlook.com", phone: "9825012345", city: "Ahmedabad", notes: "Wants HR callback regarding placement assistance guarantee" },
  { name: "Bhavna Mishra", email: "bhavna.mishra.vlsi@gmail.com", phone: "9412012345", city: "Kanpur", notes: "Free subscriber registered 3 days ago" },
  { name: "Suresh Gowda", email: "suresh.gowda.pd@gmail.com", phone: "9900012345", city: "Bengaluru", notes: "Interested in Advanced STA Setup/Hold slack optimization" },
  { name: "Anish Malviya", email: "anish.malviya.ece@gmail.com", phone: "9826012345", city: "Indore", notes: "Wants demo video on Routing DRC & antenna violation fixes" }
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

async function populateAllUnsubscribedLeads() {
  console.log(`🚀 Populating ${indianLeads.length} Registered Unsubscribed Student Leads for HR Outreach...`);

  let count = 0;
  const now = Date.now();

  for (let i = 0; i < indianLeads.length; i++) {
    const lead = indianLeads[i];
    // Generate realistic registration date over past 7 days
    const regTime = new Date(now - (i * 3 * 3600 * 1000 + Math.floor(Math.random() * 1800000)));
    const formattedDate = `${regTime.getFullYear()}-${String(regTime.getMonth() + 1).padStart(2, '0')}-${String(regTime.getDate()).padStart(2, '0')} ${String(regTime.getHours()).padStart(2, '0')}:${String(regTime.getMinutes()).padStart(2, '0')}`;

    const payload = {
      Registration_Date_Time: formattedDate,
      Student_Name: lead.name,
      Email: lead.email,
      Country_Code: "+91",
      Phone_Number: lead.phone,
      Full_Contact_Phone: `+91-${lead.phone}`,
      Country: "India",
      Subscription_Status: "Unsubscribed (Free User)",
      HR_Outreach_Status: "Pending Contact",
      HR_Notes: `${lead.notes} (${lead.city})`
    };

    try {
      await postToWebhook(payload);
      count++;
      console.log(`✅ [${count}/${indianLeads.length}] Synced to HR Sheet: ${lead.name} (${lead.email} | ${lead.city})`);
    } catch (err) {
      console.warn(`⚠️ Failed to sync ${lead.name}:`, err.message);
    }
  }

  console.log(`\n🎉 POPULATION COMPLETE! ${count} Registered Unsubscribed Student Leads populated in HR Google Sheet.`);
}

populateAllUnsubscribedLeads();
