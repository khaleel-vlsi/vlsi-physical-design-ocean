// scratch/test_correct_tenants.js

async function testEndpoint(name, url, body) {
  console.log(`\n🔍 Testing ${name} at: ${url}`);
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
      if (data.jobPostings?.length > 0) {
        console.log(`   Sample: "${data.jobPostings[0].title}"`);
      }
      return true;
    } else {
      console.log(`❌ Failed: ${name} returned HTTP ${res.status}`);
      try {
        const text = await res.text();
        console.log(`   Response: ${text.substring(0, 150)}`);
      } catch (e) {}
      return false;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  const body1 = { appliedFacets: {}, limit: 10, offset: 0, searchText: "Physical Design" };

  // TSMC (Corrected tenant: TSMC)
  await testEndpoint('TSMC', 'https://tsmc.wd3.myworkdayjobs.com/wday/cxs/tsmc/TSMC/jobs', body1);

  // AMD (Corrected tenant: AMD_External_Careers)
  await testEndpoint('AMD', 'https://amd.wd1.myworkdayjobs.com/wday/cxs/amd/AMD_External_Careers/jobs', body1);

  // Qualcomm
  await testEndpoint('Qualcomm', 'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs', body1);

  // Broadcom
  await testEndpoint('Broadcom', 'https://broadcom.myworkdayjobs.com/wday/cxs/broadcom/External_Career_Site/jobs', body1);
}

main();
