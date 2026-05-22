const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

$('img').each((i, el) => {
    const src = $(el).attr('src');
    let prev = $(el).closest('p, h1, h2, h3, table');
    let heading = "";
    let curr = prev;
    while(curr.length > 0) {
        if (['h1', 'h2', 'h3'].includes(curr[0].name)) {
            heading = curr.text().trim();
            break;
        }
        curr = curr.prev();
        if (curr.length === 0) {
            curr = curr.parent().prev();
        }
    }
    console.log(`Image: ${src}`);
    console.log(`Section: ${heading}`);
    console.log(`Text: ${prev.text().trim().substring(0, 50)}`);
    console.log('---');
});
