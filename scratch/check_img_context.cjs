const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('src/pages/modules/module1_raw.html', 'utf8');
const $ = cheerio.load(html);

$('img').each((i, el) => {
    const $img = $(el);
    const src = $img.attr('src');
    const parentText = $img.closest('p, h1, h2, h3, h4, h5, h6, table').text().trim().substring(0, 50);
    const prevText = $img.parent().prev().text().trim().substring(0, 50);
    console.log(`Image: ${src} | Parent Text: ${parentText} | Prev Text: ${prevText}`);
});
