// scratch/test_referer.js

async function testWithHeaders(name, url, referer, origin) {
  console.log(`\n🔍 Testing ${name} with Referer/Origin headers...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': referer,
        'Origin': origin
      },
      body: JSON.stringify({
        appliedFacets: {},
        limit: 10,
        offset: 0,
        searchText: "Physical Design"
      })
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
      return false;
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    return false;
  }
}

async function main() {
  // AMD
  await testWithHeaders(
    'AMD', 
    'https://amd.wd1.myworkdayjobs.com/wday/cxs/amd/AMD_External_Careers/jobs',
    'https://amd.wd1.myworkdayjobs.com/AMD_External_Careers',
    'https://amd.wd1.myworkdayjobs.com'
  );

  // TSMC
  await testWithHeaders(
    'TSMC',
    'https://tsmc.wd3.myworkdayjobs.com/wday/cxs/tsmc/TSMC_Careers/jobs',
    'https://tsmc.wd3.myworkdayjobs.com/TSMC_Careers',
    'https://tsmc.wd3.myworkdayjobs.com'
  );

  // Qualcomm
  await testWithHeaders(
    'Qualcomm',
    'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs',
    'https://qualcomm.wd5.myworkdayjobs.com/External',
    'https://qualcomm.wd5.myworkdayjobs.com'
  );
}

main();
