const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);
$('img').each((i, el) => {
    console.log(`Image ${i}: ${$(el).attr('src')}`);
});
