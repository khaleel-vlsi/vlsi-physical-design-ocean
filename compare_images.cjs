const fs = require('fs');
const path = require('path');
const cheerio = require('./node_modules/cheerio');

const htmlPath = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const htmlImages = new Set();
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src) {
        htmlImages.add(path.basename(src));
    }
});

const assetDir = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\public\\assets\\modules\\mosfetcmos\\';
const assetImages = fs.readdirSync(assetDir);

console.log('Images in HTML but missing from assets:');
htmlImages.forEach(img => {
    if (!assetImages.includes(img)) {
        console.log(img);
    }
});

console.log('\nImages in assets but missing from HTML:');
assetImages.forEach(img => {
    if (!htmlImages.has(img)) {
        console.log(img);
    }
});
