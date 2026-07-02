const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/module12Data.js', 'utf8').replace('export const MODULE12_CHAPTERS = ', '').replace(/;\s*$/, ''));

data.forEach(ch => {
    const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
    if (imgs.length > 0) {
        console.log(`\nChapter: "${ch.title.substring(0, 50)}"`);
        imgs.forEach(img => console.log(`  -> ${img}`));
    }
});
