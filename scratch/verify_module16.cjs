const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('src/data/module16Data.js', 'utf8')
    .replace('export const MODULE16_CHAPTERS = ', '')
    .replace(/;\s*$/, '')
);

let allOk = true;
let totalImgs = 0;
data.forEach(ch => {
  const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  console.log(`\n${ch.title} (${imgs.length} images):`);
  imgs.forEach(imgPath => {
    totalImgs++;
    const localPath = imgPath.replace('/assets/', 'public/assets/');
    const exists = fs.existsSync(localPath);
    if (!exists) { console.log(`  MISSING: ${localPath}`); allOk = false; }
    else { console.log(`  OK: ${localPath}`); }
  });
});
console.log(`\nTotal images: ${totalImgs}`);
if (allOk) console.log('All images verified - perfect match! ✅');
else console.log('Some images MISSING ❌');
