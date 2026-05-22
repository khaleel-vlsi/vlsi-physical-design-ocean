const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
const $ = cheerio.load(html);
const sources = [];
$('img').each((i, el) => {
    sources.push($(el).attr('src'));
});
console.log(sources.join(', '));
