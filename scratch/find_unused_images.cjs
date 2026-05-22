const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = 'c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html';
const imagesDir = 'c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/images';

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const usedImages = new Set();
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src) {
        usedImages.add(path.basename(src));
    }
});

const allImages = fs.readdirSync(imagesDir);
const unusedImages = allImages.filter(img => !usedImages.has(img));

console.log('Unused Images:', unusedImages);
