const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'modules', 'module6');
const jsonPath = path.join(__dirname, '..', 'extracted_content_module6.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let missing = [];

data.forEach(item => {
  if (item.type === 'img' && item.src) {
    // Ensure src is relative to assets folder, remove leading slash
    const relPath = item.src.replace(/^\//, '');
    const fullPath = path.join(__dirname, '..', relPath);
    if (!fs.existsSync(fullPath)) {
      missing.push(item.src);
    }
  }
});

if (missing.length === 0) {
  console.log('All image assets are present.');
} else {
  console.log('Missing image assets:', missing.length);
  missing.forEach(img => console.log(' -', img));
}
