const fs = require('fs');
const html = fs.readFileSync('C:/Users/priya/.gemini/antigravity/brain/f131b49f-d8f0-4fdb-ba1e-4650c43079cc/.system_generated/steps/99/content.md', 'utf8');

// Print any occurrences of sheet names or title keywords
const matches = [...html.matchAll(/"title":"([^"]+)"/g)].map(m => m[1]);
console.log('Unique titles found:', [...new Set(matches)]);
