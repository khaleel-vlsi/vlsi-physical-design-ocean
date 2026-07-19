const https = require('https');
// Set this to bypass SSL errors in some environments
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const videoIds = [
  'S5DSd7TVolQ'
];

async function fetchMeta(id) {
  return new Promise((resolve, reject) => {
    https.get(`https://www.youtube.com/watch?v=${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<meta property="og:title" content="([^"]+)">/);
        const descMatch = data.match(/<meta property="og:description" content="([^"]+)">/);
        
        // Sometimes YouTube escapes HTML entities in these tags. We'll do a simple decode for common ones if needed.
        let title = titleMatch ? titleMatch[1] : 'Unknown Title';
        let desc = descMatch ? descMatch[1] : 'No description available.';
        
        // Clean up title (remove " - YouTube" if present)
        title = title.replace(/ - YouTube$/, '');
        
        resolve({ id, title, description: desc });
      });
    }).on('error', err => reject(err));
  });
}

async function main() {
  const results = [];
  for (const id of videoIds) {
    try {
      const meta = await fetchMeta(id);
      results.push(meta);
      console.log(`Fetched metadata for ${id}`);
    } catch (e) {
      console.error(`Failed to fetch ${id}:`, e.message);
    }
  }
  
  const fs = require('fs');
  fs.writeFileSync('scratch/yt_meta.json', JSON.stringify(results, null, 2));
  console.log('Saved to scratch/yt_meta.json');
}

main();
