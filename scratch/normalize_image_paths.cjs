const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'extracted_content_module6.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let changed = false;
const updated = data.map(item => {
  if (item.type === 'img' && typeof item.src === 'string' && !item.src.startsWith('/')) {
    item.src = '/' + item.src;
    changed = true;
  }
  return item;
});

if (changed) {
  fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf8');
  console.log('Normalized image src paths in extracted_content_module6.json');
} else {
  console.log('No changes needed for image src paths.');
}
