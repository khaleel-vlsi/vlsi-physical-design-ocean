// scratch/test_more_workdays.js

async function testEndpoint(name, url, body) {
  console.log(`\n🔍 Testing ${name}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! ${name} returned ${data.jobPostings?.length || 0} jobs.`);
      if (data.jobPostings?.length > 0) {
        console.log(`   Sample: "${data.jobPostings[0].title}" at "${data.jobPostings[0].locationsText}"`);
      }
      return true;
    } else {
      console.log(`❌ Failed: ${name} returned HTTP ${res.status}`);
      return false;
    }
  } catch (err) {
    console.log(`❌ Error testing ${name}: ${err.message}`);
    return false;
  }
}

async function main() {
  const body1 = { appliedFacets: {}, limit: 10, offset: 0, searchText: "Physical Design" };
  const body2 = { appliedFacets: {}, limit: 10, offset: 0, searchText: "" };

  // TSMC
  await testEndpoint('TSMC', 'https://tsmc.wd3.myworkdayjobs.com/wday/cxs/tsmc/TSMC_Careers/jobs', body1);

  // AMD
  await testEndpoint('AMD', 'https://amd.wd1.myworkdayjobs.com/wday/cxs/amd/AMD_External_Careers/jobs', body1);

  // Broadcom
  await testEndpoint('Broadcom', 'https://broadcom.myworkdayjobs.com/wday/cxs/broadcom/External_Career_Site/jobs', body1);

  // Marvell
  await testEndpoint('Marvell', 'https://marvell.myworkdayjobs.com/wday/cxs/marvell/MarvellCareers/jobs', body1);

  // Qualcomm with empty search text
  await testEndpoint('Qualcomm (empty search)', 'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs', body2);
  // Qualcomm with searchText
  await testEndpoint('Qualcomm (with search)', 'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs', body1);
}

main();
