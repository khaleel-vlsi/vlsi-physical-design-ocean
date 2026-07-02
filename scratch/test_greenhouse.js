// scratch/test_greenhouse.js
async function testGreenhouse(company, boardToken) {
  console.log(`\n🔍 Fetching jobs from ${company} (Greenhouse token: ${boardToken})...`);
  try {
    const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      const rawJobs = data.jobs || [];
      const hardwareJobs = rawJobs.filter(j => 
        j.title.toLowerCase().includes("physical design") ||
        j.title.toLowerCase().includes("silicon") ||
        j.title.toLowerCase().includes("dft") ||
        j.title.toLowerCase().includes("asic") ||
        j.title.toLowerCase().includes("vlsi") ||
        j.title.toLowerCase().includes("timing") ||
        j.title.toLowerCase().includes("place")
      );
      console.log(`✅ Success! Found ${rawJobs.length} total jobs, and ${hardwareJobs.length} matching hardware roles.`);
      hardwareJobs.forEach((j, i) => {
        console.log(`[${i+1}] Title: ${j.title} (${j.location?.name})`);
        console.log(`    Id: ${j.id}`);
        console.log(`    Url: ${j.absolute_url}`);
      });
      return hardwareJobs;
    } else {
      console.log(`❌ Failed: HTTP ${res.status}`);
      return [];
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
    return [];
  }
}

async function main() {
  await testGreenhouse('SiFive', 'sifive');
  await testGreenhouse('Cerebras Systems', 'cerebras');
  await testGreenhouse('Tenstorrent', 'tenstorrent');
  await testGreenhouse('Rivos', 'rivos');
}
main();
