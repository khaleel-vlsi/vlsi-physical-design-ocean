const fs = require('fs');
const content = fs.readFileSync('C:/Users/priya/.gemini/antigravity/brain/f131b49f-d8f0-4fdb-ba1e-4650c43079cc/.system_generated/steps/42/content.md', 'utf8');
const matches = [...content.matchAll(/"(PD-M\d+)"/g)].map(m => m[1]);
console.log('FOUND_MODULES:', [...new Set(matches)]);
