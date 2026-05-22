const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

$('img').each((i, el) => {
    const src = $(el).attr('src');
    const context = $(el).closest('p, h1, h2, h3, div').text().trim().substring(0, 50);
    console.log(`${i}: ${src} | Context: ${context}`);
});
