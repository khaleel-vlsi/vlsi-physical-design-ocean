// scratch/test_simple_workday.js

async function testSimple(name, url, body) {
  console.log(`\n🔍 Testing ${name}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! ${name} returned ${data.jobPostings?.length || 0} jobs.`);
      return true;
    } else {
      console.log(`❌ Failed: ${name} returned HTTP ${res.status}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  // Test body types
  const bodies = [
    { limit: 20, offset: 0, searchText: "" },
    { limit: 20, offset: 0 },
    { searchText: "Design" }
  ];

  for (let i = 0; i < bodies.length; i++) {
    console.log(`--- Testing Body Schema ${i + 1} ---`);
    await testSimple('AMD', 'https://amd.wd1.myworkdayjobs.com/wday/cxs/amd/AMD_External_Careers/jobs', bodies[i]);
    await testSimple('TSMC', 'https://tsmc.wd3.myworkdayjobs.com/wday/cxs/tsmc/TSMC/jobs', bodies[i]);
    await testSimple('Qualcomm', 'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs', bodies[i]);
  }
}

main();
