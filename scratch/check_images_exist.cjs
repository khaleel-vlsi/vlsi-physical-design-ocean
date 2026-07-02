const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync('src/data/module12Data.js', 'utf8').replace('export const MODULE12_CHAPTERS = ', '').replace(/;\s*$/, ''));

let allOk = true;
data.forEach(ch => {
    const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
    imgs.forEach(imgPath => {
        const localPath = imgPath.replace('/assets/', 'public/assets/');
        const exists = fs.existsSync(localPath);
        if (!exists) {
            console.log(`MISSING: ${localPath}`);
            allOk = false;
        } else {
            console.log(`OK: ${localPath}`);
        }
    });
});
if (allOk) console.log('\nAll images verified - perfect match!');
