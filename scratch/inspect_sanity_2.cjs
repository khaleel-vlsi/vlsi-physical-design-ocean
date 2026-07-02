const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

let found = false;
$('*').each((i, el) => {
    if (el.name !== 'p' && el.name !== 'span' && !el.name.startsWith('h')) return;
    const text = $(el).text().trim();
    if (text === 'Sanity checks:') {
        found = true;
    }
    if (found && i % 5 === 0) {
        console.log(`<${el.name}>: ${text.substring(0, 50)}`);
    }
});
