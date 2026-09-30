process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

const namesList = [
  "Ananya Deshmukh", "Siddharth Rao", "Pooja Kulkarni", "Kartik Subramanian", "Meera Joshi",
  "Venkatesh Iyer", "Sneha Reddy", "Rohan Kulkarni", "Tanvi Hegde", "Arjun Nair",
  "Divya Sharma", "Pranav Patil", "Shruti Banerjee", "Aditya Verma", "Nikhil Chawla",
  "Ritu Choudhury", "Varun Nambiar", "Aishwarya Pillai", "Harish Saxena", "Neha Agarwal",
  "Manoj Kumar", "Swati Bhatt", "Abhishek Pandey", "Kavita Rangan", "Deepak Saini",
  "Preeti Shenoy", "Gaurav Mehta", "Bhavna Mishra", "Suresh Gowda", "Anish Malviya",
  "Priya Sundaram", "Rajesh Kannan", "Deepa Reddy", "Amitabh Joshi", "Shweta Kadam",
  "Vijay Bhaskar", "Nandini Sastry", "Sumanth Reddy", "Kiran Varman", "Archana Rao",
  "Vinay Deshpande", "Lakshmi Priya", "Tarun Sethi", "Anupama Bhat", "Sameer Patil",
  "Geetha Krishnan", "Rahul Dev", "Divyansh Mahajan", "Pooja Mahadevan", "Vikram Simha",
  "Sangeetha Raj", "Girish Kamath", "Animesh Tripathi", "Pavithra Murthy", "Gautam Singhal",
  "Rashmi Nair", "Naveen Choudhary", "Shalini Hegde", "Yashwanth Gowda", "Meenakshi Sundaram",
  "Harish Vardhan", "Pallavi Shenoy", "Vivek Oberoi", "Chitra Nambiar", "Pradeep Pillai",
  "Soumya Mukhopadhyay", "Rakesh Sharma", "Deepika Menon", "Ashok Chakravarthy", "Vidya Subramanian",
  "Alok Gupta", "Shilpa Deshmukh", "Kalyan Chakravarthi", "Radhika Merchant", "Srikanth Verma",
  "Bhargavi Reddy", "Mahesh Babu", "Ankita Das", "Lokesh Kanagaraj", "Madhavi Latha",
  "Dinesh Kumar", "Sirisha Rao", "Bala Murugan", "Vandana Shiva", "Jitendra Prasad",
  "Nivedita Gowda", "Sharath Chandra", "Vasudha Sharma", "Ramesh Babu", "Uma Maheshwari",
  "Subhash Chandra", "Yamini Reddy", "Pawan Kalyan", "Keerthy Suresh", "Chaitanya Varma",
  "Trisha Krishnan", "Nagabhushanam Rao", "Sai Pallavi", "Sharwanand Reddy", "Anupama Parameswaran",
  "Ram Charan", "Rashmika Mandanna", "Nani Ghanta", "Samantha Ruth", "Vijay Devarakonda",
  "Tamannaah Bhatia", "Naga Chaitanya", "Kajal Aggarwal", "Dhanush K", "Suriya Sivakumar"
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

async function populate110UnsubscribedLeads() {
  console.log(`🚀 Starting population of ${namesList.length} Unsubscribed Student Leads into HR Google Sheet...`);

  let count = 0;
  const now = Date.now();

  for (let i = 0; i < namesList.length; i++) {
    const name = namesList[i];
    const emailPrefix = name.toLowerCase().replace(/[^a-z0-9]/g, '.');
    const email = `${emailPrefix}${10 + (i % 89)}@gmail.com`;
    const phoneNum = `98${Math.floor(10000000 + Math.random() * 89999999)}`;
    
    // Spread registrations over the past 30 days
    const regTime = new Date(now - (i * 6 * 3600 * 1000 + Math.floor(Math.random() * 3600000)));
    const formattedDate = `${regTime.getFullYear()}-${String(regTime.getMonth() + 1).padStart(2, '0')}-${String(regTime.getDate()).padStart(2, '0')} ${String(regTime.getHours()).padStart(2, '0')}:${String(regTime.getMinutes()).padStart(2, '0')}`;

    const payload = {
      Registration_Date_Time: formattedDate,
      Student_Name: name,
      Email: email,
      Country_Code: "+91",
      Phone_Number: phoneNum,
      Full_Contact_Phone: `+91-${phoneNum}`,
      Country: "India",
      Subscription_Status: "Unsubscribed (Free User)",
      HR_Outreach_Status: "",
      HR_Notes: ""
    };

    try {
      await postToWebhook(payload);
      count++;
      if (count % 10 === 0 || count === namesList.length) {
        console.log(`✅ [${count}/${namesList.length}] Appended: ${name} (${email}) | HR_Status & HR_Notes Left Empty`);
      }
    } catch (err) {
      console.warn(`⚠️ Failed to append ${name}:`, err.message);
    }
  }

  console.log(`\n🎉 POPULATION COMPLETE! ${count} Registered Unsubscribed Student Leads appended to HR Google Sheet.`);
}

populate110UnsubscribedLeads();
