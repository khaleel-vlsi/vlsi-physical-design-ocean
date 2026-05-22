const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = 'src/pages/modules/module1_raw.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const usedImages = new Set();
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.startsWith('images/')) {
        usedImages.add(path.basename(src));
    }
});

console.log('Used images in module1_raw.html:');
const sortedImages = Array.from(usedImages).sort((a, b) => {
    const na = parseInt(a.match(/\d+/)[0]);
    const nb = parseInt(b.match(/\d+/)[0]);
    return na - nb;
});
sortedImages.forEach(img => console.log(img));
console.log('Total used images:', usedImages.size);
