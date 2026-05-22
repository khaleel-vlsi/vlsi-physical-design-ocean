const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

$('img').each((i, el) => {
    const src = $(el).attr('src');
    const parentP = $(el).closest('p');
    const prevText = parentP.prev().text().trim() || $(el).parent().text().trim();
    console.log(`Image: ${src}`);
    console.log(`Context: ${prevText.substring(0, 100)}`);
    console.log('---');
});
