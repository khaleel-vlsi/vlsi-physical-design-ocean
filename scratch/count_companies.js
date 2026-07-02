// scratch/count_companies.js
import { JOBS_DATABASE } from '../src/data/jobsData.js';

const companies = [...new Set(JOBS_DATABASE.map(j => j.company))];
console.log("Total jobs:", JOBS_DATABASE.length);
console.log("Total unique companies:", companies.length);
companies.forEach(c => {
  const count = JOBS_DATABASE.filter(j => j.company === c).length;
  console.log("  " + c + ": " + count + " jobs");
});
