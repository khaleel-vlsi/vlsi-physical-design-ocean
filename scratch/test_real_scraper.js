// scratch/test_real_scraper.js
import fs from 'fs';

async function fetchWorkdayJobs(company, url, searchText) {
  console.log(`\n🔍 Fetching real active jobs from ${company} Careers...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify({
        appliedFacets: {},
        limit: 15,
        offset: 0,
        searchText: searchText
      })
    });

    if (!res.ok) {
      console.error(`❌ HTTP Error ${res.status} from ${company}`);
      return [];
    }

    const data = await res.json();
    const rawJobs = data.jobPostings || [];
    console.log(`✅ Found ${rawJobs.length} raw jobs for "${searchText}" at ${company}`);
    return rawJobs;
  } catch (err) {
    console.error(`❌ Error fetching from ${company}:`, err.message);
    return [];
  }
}

async function main() {
  // Test with NVIDIA
  const nvidiaUrl = 'https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs';
  const nvidiaJobs = await fetchWorkdayJobs('NVIDIA', nvidiaUrl, 'Physical Design');

  console.log('\n=== Sample Nvidia Jobs Found ===');
  nvidiaJobs.slice(0, 3).forEach((j, i) => {
    console.log(`[${i+1}] Title: ${j.title}`);
    console.log(`    Location: ${j.locationsText}`);
    console.log(`    Id: ${j.bulletFields?.[0] || j.externalPath}`);
    console.log(`    Url: https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite${j.externalPath}`);
  });

  // Test with Qualcomm
  const qualcommUrl = 'https://qualcomm.wd5.myworkdayjobs.com/wday/cxs/qualcomm/External/jobs';
  const qualcommJobs = await fetchWorkdayJobs('Qualcomm', qualcommUrl, 'Physical Design');

  console.log('\n=== Sample Qualcomm Jobs Found ===');
  qualcommJobs.slice(0, 3).forEach((j, i) => {
    console.log(`[${i+1}] Title: ${j.title}`);
    console.log(`    Location: ${j.locationsText}`);
    console.log(`    Id: j.bulletFields?.[0] || j.externalPath`);
    console.log(`    Url: https://qualcomm.wd5.myworkdayjobs.com/External${j.externalPath}`);
  });
}

main();
