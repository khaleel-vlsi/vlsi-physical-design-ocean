const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('module8_proper_unzipped/PhysicalSynthesis.html', 'utf8');
const $ = cheerio.load(html);

const images = [];
$('img').each((i, el) => {
    images.push({
        src: $(el).attr('src'),
        alt: $(el).attr('alt')
    });
});

console.log(JSON.stringify(images, null, 2));
