process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const https = require('https');

const HR_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycby5fwgBW8WkovIB1DYia8MJrptdl1PZiiII7_XDzC5oKrNiLCdo0DOa6ZWnNyRnV2ew/exec";

const uniqueStudentNames = [
  "Aditya Kumar", "Bhavna Mishra", "Chaitanya Varma", "Dhanush K", "Esha Reddy",
  "Farhan Akhtar", "Gaurav Mehta", "Harish Vardhan", "Ishita Sharma", "Jitendra Prasad",
  "Kavya Nair", "Lokesh Kanagaraj", "Madhavi Latha", "Naga Chaitanya", "Omkar Deshmukh",
  "Pawan Kalyan", "Qamar Ali", "Rahul Verma", "Sai Pallavi", "Trisha Krishnan",
  "Uma Maheshwari", "Vikram Kennedy", "Wasim Akram", "Xavier Dsouza", "Yamini Reddy",
  "Zoya Siddiqui", "Aishwarya Pillai", "Bala Murugan", "Chitra Nambiar", "Dinesh Kumar",
  "Ekta Kapoor", "Girish Kamath", "Harish Saxena", "Indira Priyadarshini", "Jayanthi Natarajan",
  "Kartik Subramanian", "Lakshmi Priya", "Meera Joshi", "Nikhil Chawla", "Padma Priya",
  "Ritu Choudhury", "Sneha Reddy", "Tanvi Hegde", "Umesh Yadav", "Varun Nambiar",
  "Yashwanth Gowda", "Zainab Fatima", "Ananya Deshmukh", "Bhargavi Reddy", "Chetan Bhagat",
  "Deepak Saini", "Gautam Singhal", "Harini Rao", "Jagdish Chandra", "Kalyan Chakravarthi",
  "Lata Mangeshkar", "Manoj Kumar", "Naveen Choudhary", "Pranav Patil", "Rajesh Kannan",
  "Shruti Banerjee", "Tarun Sethi", "Vasudha Sharma", "Vidya Subramanian", "Yogesh Varma",
  "Alok Gupta", "Bindu Madhavi", "Deepika Menon", "Geetha Krishnan", "Kavita Rangan",
  "Meenakshi Sundaram", "Nivedita Gowda", "Pooja Kulkarni", "Rashmi Nair", "Siddharth Rao",
  "Swati Bhatt", "Venkatesh Iyer", "Vivek Oberoi", "Abhishek Pandey", "Anish Malviya",
  "Anupama Bhat", "Archana Rao", "Ashok Chakravarthy", "Divya Sharma", "Divyansh Mahajan",
  "Keerthy Suresh", "Kiran Varman", "Mahesh Babu", "Nandini Sastry", "Nani Ghanta",
  "Pallavi Shenoy", "Pavithra Murthy", "Pooja Mahadevan", "Preeti Shenoy", "Priya Sundaram",
  "Radhika Merchant", "Rahul Dev", "Rakesh Sharma", "Ram Charan", "Ramesh Babu", "Rashmika Mandanna",
  "Samantha Ruth", "Sangeetha Raj", "Shalini Hegde", "Sharath Chandra", "Sharwanand Reddy",
  "Shilpa Deshmukh", "Shweta Kadam", "Sirisha Rao", "Soumya Mukhopadhyay", "Srikanth Verma",
  "Subhash Chandra", "Sumanth Reddy", "Suresh Gowda", "Suriya Sivakumar", "Tamannaah Bhatia",
  "Vandana Shiva", "Vijay Bhaskar", "Vijay Devarakonda", "Vikram Simha", "Vinay Deshpande"
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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runUniquePopulation() {
  console.log(`🚀 Starting population of ${uniqueStudentNames.length} UNIQUE Registered Unsubscribed Student Leads...`);

  let successCount = 0;
  let skippedCount = 0;
  const now = Date.now();

  for (let i = 0; i < uniqueStudentNames.length; i++) {
    const name = uniqueStudentNames[i];
    const email = `${name.toLowerCase().replace(/[^a-z0-9]/g, '.')}2026@gmail.com`;
    const phoneNum = `98${Math.floor(10000000 + Math.random() * 89999999)}`;
    
    // Spread registrations over the past 30 days
    const regTime = new Date(now - (i * 5 * 3600 * 1000 + Math.floor(Math.random() * 1800000)));
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

    let attempts = 0;
    let done = false;

    while (attempts < 3 && !done) {
      try {
        attempts++;
        const res = await postToWebhook(payload);
        if (res.includes('Skipped')) {
          skippedCount++;
        } else {
          successCount++;
        }
        done = true;
      } catch (err) {
        if (attempts >= 3) {
          console.warn(`⚠️ Warning: Skip lead ${name} after 3 retries: ${err.message}`);
        } else {
          await sleep(600);
        }
      }
    }

    if ((i + 1) % 10 === 0 || i === uniqueStudentNames.length - 1) {
      console.log(`📊 Progress [${i + 1}/${uniqueStudentNames.length}] | Success: ${successCount} | Skipped: ${skippedCount}`);
    }

    await sleep(250); // Pause 250ms between posts to respect rate limits
  }

  console.log(`\n🎉 POPULATION COMPLETE! ${successCount} UNIQUE Registered Unsubscribed Student Leads populated in HR Google Sheet.`);
}

runUniquePopulation();
