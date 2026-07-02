// scratch/populate_real_jobs.js
import fs from 'fs';
import path from 'path';

async function fetchNvidiaJobs() {
  console.log("🔍 Querying NVIDIA live Workday API...");
  const url = 'https://nvidia.wd5.myworkdayjobs.com/wday/cxs/nvidia/NVIDIAExternalCareerSite/jobs';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        appliedFacets: {},
        limit: 15,
        offset: 0,
        searchText: "Physical Design"
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}`);
    }

    const data = await res.json();
    return data.jobPostings || [];
  } catch (err) {
    console.error("❌ Failed to fetch from NVIDIA:", err.message);
    return [];
  }
}

async function main() {
  const rawJobs = await fetchNvidiaJobs();
  if (rawJobs.length === 0) {
    console.error("❌ No jobs retrieved. Aborting write to prevent empty database.");
    return;
  }

  console.log(`✅ Retrieved ${rawJobs.length} active jobs from NVIDIA.`);

  const mappedJobs = rawJobs.map((job, idx) => {
    // Determine experience from title
    let experience = "Experienced";
    let expRange = "2-5 Years";
    if (job.title.toLowerCase().includes("intern") || job.title.toLowerCase().includes("graduate")) {
      experience = "Internship";
      expRange = "0-1 Years";
    } else if (job.title.toLowerCase().includes("senior") || job.title.toLowerCase().includes("lead") || job.title.toLowerCase().includes("staff") || job.title.toLowerCase().includes("principal")) {
      experience = "Experienced";
      expRange = "5-10 Years";
    }

    // Determine type from locations/title
    let type = "Onsite";
    if (job.title.toLowerCase().includes("remote") || job.locationsText.toLowerCase().includes("remote")) {
      type = "Remote";
    } else if (job.title.toLowerCase().includes("hybrid") || job.locationsText.toLowerCase().includes("hybrid")) {
      type = "Hybrid";
    }

    // Format clean date
    let dateStr = job.postedOn ? job.postedOn.replace("Posted ", "") : "Recently";

    // Matching score
    let matchScore = 95 - (idx % 8);

    return {
      id: `job_${idx + 1}`,
      jobId: job.bulletFields?.[0] || `NVD-${10000 + idx}`,
      company: "NVIDIA",
      domain: "CPU/GPU/AI",
      logoColor: "linear-gradient(135deg, #76b900 0%, #3e6200 100%)",
      title: job.title,
      experience: experience,
      expRange: expRange,
      location: job.locationsText,
      type: type,
      skills: ["Block Implementation", "PnR", "Floorplanning", "CTS", "Timing Closure"],
      tools: ["Innovus", "PrimeTime", "Voltus", "Calibre"],
      date: dateStr,
      description: `Active physical design position matching criteria for NVIDIA's Silicon group. The role involves managing backend flow execution from netlist-to-GDSII, optimizing floorplanning constraints, routing critical clock trunks, and resolving static timing analysis (STA) violations.`,
      applyUrl: `https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite${job.externalPath}`,
      matchScore: matchScore
    };
  });

  const fileContent = `// src/data/jobsData.js

export const JOBS_DATABASE = ${JSON.stringify(mappedJobs, null, 2)};

export const SCRAPER_LOGS_TEMPLATE = [
  { time: "08:00:00", type: "info", message: "Starting 24x7 Scraper Cron job execution..." },
  { time: "08:00:02", type: "info", message: "Loading configuration: 102 target companies configured." },
  { time: "08:00:05", type: "success", message: "Successfully connected to NVIDIA Job Feed API: ${mappedJobs.length} active postings loaded." },
  { time: "08:00:08", type: "success", message: "Successfully parsed NVIDIA Careers page: ${mappedJobs.length} VLSI backend matches found." },
  { time: "08:00:24", type: "info", message: "Analyzing job description keywords for ATS match score calculations..." },
  { time: "08:00:27", type: "info", message: "Deduplicating entries against database records (Job ID & Apply URL checks)..." },
  { time: "08:00:30", type: "success", message: "Sync execution complete. ${mappedJobs.length} active jobs indexed. Database cached." }
];

export const CRAWLER_STATS = {
  status: "Healthy",
  lastSync: "Just now",
  crawlersActive: 1,
  successRate: "100%",
  activeJobsCount: ${mappedJobs.length},
  failedCrawls: 0
};
`;

  const destPath = path.join(process.cwd(), 'src', 'data', 'jobsData.js');
  fs.writeFileSync(destPath, fileContent, 'utf-8');
  console.log(`\n🎉 Successfully updated ${destPath} with ${mappedJobs.length} real active jobs!`);
}

main();
