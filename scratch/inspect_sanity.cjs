const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

console.log("Looking for 'Sanity checks'...");
$('*').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Sanity checks') && el.name !== 'body' && el.name !== 'html') {
        console.log(`Found in <${el.name}>:`, $.html(el).substring(0, 150));
    }
});
