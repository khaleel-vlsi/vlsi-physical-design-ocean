const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/videoModulesData.js');
let content = fs.readFileSync(filePath, 'utf8');

for (let i = 1; i <= 18; i++) {
  // Replace `id: i,` with `id: i, thumbnail: '/images/modules/mod${i}.jpg',`
  // We'll use a regex to ensure we only replace the id inside the object definition, not inside the sessions.
  const regex = new RegExp(`id: ${i},`);
  content = content.replace(regex, `id: ${i},\n    thumbnail: '/images/modules/mod${i}.jpg',`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Thumbnails added to videoModulesData.js');
