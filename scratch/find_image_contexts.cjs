const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'src/pages/modules/module1_raw.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const mappings = [];
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && src.startsWith('images/')) {
        const parentText = $(el).closest('p, div, h1, h2, h3').text().trim();
        const prevText = $(el).closest('p, div').prev().text().trim();
        const nextText = $(el).closest('p, div').next().text().trim();
        mappings.push({
            src,
            context: `${parentText} | PREV: ${prevText} | NEXT: ${nextText}`.substring(0, 200)
        });
    }
});

mappings.forEach(m => console.log(`${m.src}: ${m.context}`));
