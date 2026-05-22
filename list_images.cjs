const fs = require('fs');
const cheerio = require('./node_modules/cheerio');

const htmlPath = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const images = [];
$('img').each((i, el) => {
    images.push($(el).attr('src'));
});

console.log(JSON.stringify(images, null, 2));
