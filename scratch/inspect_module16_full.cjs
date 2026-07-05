const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module16/OPTCTS.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== ALL body elements ===');
$('body').children().each((i, el) => {
    const text = $(el).text().trim().substring(0, 100);
    const imgs = $(el).find('img');
    const directImg = $(el).is('img');
    if (imgs.length > 0) {
        imgs.each((j, img) => {
            console.log(`[${i}] <${el.name}> IMG: ${$(img).attr('src')}`);
        });
    } else if (directImg) {
        console.log(`[${i}] <img> src: ${$(el).attr('src')}`);
    } else if (text) {
        console.log(`[${i}] <${el.name}>: ${text}`);
    }
});
