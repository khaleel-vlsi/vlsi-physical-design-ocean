const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

console.log(`Found ${$('img').length} images.`);
$('img').each((i, el) => {
    console.log(`Image ${i}:`, $(el).attr('src'));
});
