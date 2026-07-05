const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('src/data/module14Data.js', 'utf8')
    .replace('export const MODULE14_CHAPTERS = ', '')
    .replace(/;\s*$/, '')
);

let allOk = true;
data.forEach(ch => {
  const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  if (imgs.length > 0) {
    console.log(`Chapter: "${ch.title.substring(0, 55)}"`);
    imgs.forEach(imgPath => {
      const localPath = imgPath.replace('/assets/', 'public/assets/');
      const exists = fs.existsSync(localPath);
      if (!exists) { console.log(`  MISSING: ${localPath}`); allOk = false; }
      else { console.log(`  OK: ${localPath}`); }
    });
  }
});
if (allOk) console.log('\nAll images verified - perfect match!');
else console.log('\nSome images MISSING - fix before proceeding!');
