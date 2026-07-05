const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module17/Route.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== First 40 body elements ===');
$('body').children().each((i, el) => {
    if (i > 40) return;
    const text = $(el).text().trim().substring(0, 70);
    const hasImg = $(el).find('img').length > 0 ? ` [IMG: ${$(el).find('img').attr('src')}]` : '';
    console.log(`[${i}] <${el.name}>: ${text}${hasImg}`);
});

console.log('\n=== All headings (h1/h2/h3) ===');
$('h1, h2, h3').each((i, el) => {
    console.log(`<${el.name}>: ${$(el).text().trim()}`);
});

console.log('\n=== Total images:', $('img').length);
console.log('=== Total paragraphs:', $('p').length);
