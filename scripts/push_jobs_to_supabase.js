import { createClient } from '@supabase/supabase-js';
import { JOBS_DATABASE } from '../src/data/jobsData.js';

// We need the service role key to insert/update, but we'll use anon for now if that's all we have.
// In GitHub Actions, this will be provided via process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseUrl = process.env.SUPABASE_URL || "https://ygcvcyoynmyrplwrpisd.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";

const supabase = createClient(supabaseUrl, supabaseKey);

async function pushJobs() {
  console.log(`🚀 Starting push of ${JOBS_DATABASE.length} jobs to Supabase...`);

  // We chunk the array to avoid payload too large errors
  const chunkSize = 20;
  for (let i = 0; i < JOBS_DATABASE.length; i += chunkSize) {
    const chunk = JOBS_DATABASE.slice(i, i + chunkSize).map(job => ({
      id: job.id,
      job_id: job.jobId || job.id,
      company: job.company,
      domain: job.domain || 'Semiconductor',
      logo_color: job.logoColor,
      title: job.title,
      experience: job.experience || 'Experienced',
      exp_range: job.expRange || '3-6 Years',
      location: job.location || 'Global',
      type: job.type || 'Onsite',
      skills: job.skills || [],
      tools: job.tools || [],
      date: job.date || 'Recently Scraped',
      description: job.description || '',
      apply_url: job.applyUrl,
      match_score: job.matchScore || 90,
      source: 'automated_scraper',
      is_active: true
    }));

    const { data, error } = await supabase
      .from('physical_design_jobs')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error pushing chunk ${i / chunkSize + 1}:`, error.message);
    } else {
      console.log(`✅ Successfully pushed chunk ${i / chunkSize + 1}`);
    }
  }
  
  console.log("🎉 Job synchronization complete.");
}

pushJobs();
