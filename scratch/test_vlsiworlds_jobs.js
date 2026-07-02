// scratch/test_vlsiworlds_jobs.js
import * as cheerio from 'cheerio';

async function main() {
  console.log("🔍 Querying VLSIWorlds Jobs Portal...");
  try {
    const res = await fetch('https://jobs.vlsiworlds.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (res.ok) {
      const html = await res.text();
      const $ = cheerio.load(html);
      console.log("✅ Successfully fetched HTML!");
      
      const links = [];
      $('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (text && href) {
          links.push({ text, href });
        }
      });
      console.log(`🔍 Found ${links.length} total links.`);
      links.slice(0, 20).forEach((l, i) => {
        console.log(`[${i+1}] ${l.text} -> ${l.href}`);
      });
    } else {
      console.log(`❌ Failed: HTTP ${res.status}`);
    }
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  }
}
main();
