const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);
const imgs = [];
$('img').each((i, el) => {
    imgs.push($(el).attr('src'));
});
console.log(JSON.stringify(imgs, null, 2));
