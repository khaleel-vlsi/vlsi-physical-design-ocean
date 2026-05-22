const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

const targets = ['Electric Power', 'Drift Current', 'Diffusion Current', 'Ohm’s Law'];
$('*').each((i, el) => {
    const text = $(el).text().trim();
    if (targets.some(t => text === t)) {
        console.log(`Text: ${text}`);
        console.log(`Tag: ${el.name}`);
        console.log(`Class: ${$(el).attr('class')}`);
        console.log(`Parent Tag: ${$(el).parent()[0].name}`);
        console.log(`---`);
    }
});
