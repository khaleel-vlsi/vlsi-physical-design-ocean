const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

console.log("First 20 elements:");
let count = 0;
$('body').children().each((i, el) => {
    if (count > 20) return;
    console.log(`[${i}] <${el.name}>: ${$(el).text().substring(0, 50)}`);
    if (el.name === 'p' && $(el).find('img').length > 0) {
        console.log(`     -> Contains image: ${$(el).find('img').attr('src')}`);
    }
    count++;
});
