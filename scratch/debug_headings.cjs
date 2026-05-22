const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

$('*').each((i, el) => {
    const name = el.name;
    const text = $(el).text().trim();
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name) || (name === 'p' && text.length > 0 && text.length < 100)) {
        if (text.includes('Electric Power') || text.includes('Drift') || text.includes('Diffusion') || text.includes('Ohm') || text.includes('Kirchhoff')) {
             console.log(`${name}: ${text}`);
        }
    }
});
