// scratch/test_arbeitnow.js
async function main() {
  console.log("🔍 Testing Arbeitnow Public Jobs API...");
  try {
    const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! Arbeitnow returned ${data.data?.length || 0} jobs.`);
      const engineeringJobs = data.data?.filter(j => 
        j.title.toLowerCase().includes("design") ||
        j.title.toLowerCase().includes("engineer") ||
        j.title.toLowerCase().includes("hardware") ||
        j.title.toLowerCase().includes("asic") ||
        j.title.toLowerCase().includes("vlsi")
      ) || [];
      console.log(`🔍 Found ${engineeringJobs.length} potential engineering jobs.`);
      engineeringJobs.slice(0, 10).forEach((j, i) => {
        console.log(`[${i+1}] Title: ${j.title} at ${j.company_name} (${j.location})`);
        console.log(`    Link: ${j.url}`);
      });
    } else {
      console.log(`❌ Failed: Arbeitnow returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}
main();
