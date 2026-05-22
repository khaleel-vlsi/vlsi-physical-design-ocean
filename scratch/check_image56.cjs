const fs = require('fs');
const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.includes('image56.png')) {
        console.log(`image56.png is at index ${i}`);
        // Let's see the text around it
        console.log(`Text near it: ${$(el).closest('p').next('p').text().substring(0, 100)}`);
    }
});
