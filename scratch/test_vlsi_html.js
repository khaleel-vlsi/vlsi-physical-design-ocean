// scratch/test_vlsi_html.js
import * as cheerio from 'cheerio';

async function testVLSIWorlds() {
  console.log("🔍 Fetching from VLSIWorlds...");
  try {
    const res = await fetch('https://vlsiworlds.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      console.log("✅ Successfully fetched VLSIWorlds HTML!");
      
      // Let's print some links or text to see the structure
      const jobs = [];
      $('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (text && href && (href.includes('/job/') || href.includes('/jobs/') || text.toLowerCase().includes('design') || text.toLowerCase().includes('engineer'))) {
          jobs.push({ text, href });
        }
      });
      console.log(`🔍 Found ${jobs.length} potential job links.`);
      jobs.slice(0, 10).forEach((j, i) => console.log(`[${i+1}] ${j.text} -> ${j.href}`));
    } else {
      console.log(`❌ Failed: VLSIWorlds returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}

async function testSiliconVLSI() {
  console.log("\n🔍 Fetching from SiliconVLSI...");
  try {
    const res = await fetch('https://siliconvlsi.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      console.log("✅ Successfully fetched SiliconVLSI HTML!");
      
      const jobs = [];
      $('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (text && href && (text.toLowerCase().includes('design') || text.toLowerCase().includes('engineer') || href.includes('job'))) {
          jobs.push({ text, href });
        }
      });
      console.log(`🔍 Found ${jobs.length} potential links.`);
      jobs.slice(0, 10).forEach((j, i) => console.log(`[${i+1}] ${j.text} -> ${j.href}`));
    } else {
      console.log(`❌ Failed: SiliconVLSI returned HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}

async function main() {
  await testVLSIWorlds();
  await testSiliconVLSI();
}
main();
