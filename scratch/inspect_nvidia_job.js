// scratch/inspect_nvidia_job.js
async function main() {
  const url = 'https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs';
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
        limit: 5,
        offset: 0,
        searchText: "Physical Design"
      })
    });

    const data = await res.json();
    console.log(JSON.stringify(data.jobPostings?.[0], null, 2));
  } catch (err) {
    console.error(err);
  }
}
main();
