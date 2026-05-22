const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
const $ = cheerio.load(html);
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.includes('image1.png')) {
        console.log(`Found image1.png at index ${i}`);
    }
});
