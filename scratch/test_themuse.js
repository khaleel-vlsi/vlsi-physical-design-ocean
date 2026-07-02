// scratch/test_themuse.js
async function main() {
  console.log("🔍 Testing Themuse Public Jobs API...");
  try {
    const res = await fetch('https://www.themuse.com/api/public/jobs?category=Engineering&page=1');
    if (res.ok) {
      const data = await res.json();
      console.log(`✅ Success! Themuse returned ${data.results?.length || 0} engineering jobs.`);
      const hardWareJobs = data.results?.filter(j => 
        j.name.toLowerCase().includes("silicon") || 
        j.name.toLowerCase().includes("hardware") || 
        j.name.toLowerCase().includes("design") ||
        j.name.toLowerCase().includes("asic") ||
        j.name.toLowerCase().includes("vlsi")
      ) || [];
      console.log(`🔍 Found ${hardWareJobs.length} hardware-related jobs.`);
      hardWareJobs.forEach((j, i) => {
        console.log(`[${i+1}] Title: ${j.name} at ${j.company?.name}`);
      });
    } else {
      console.log(`❌ Failed: Themuse returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}
main();
