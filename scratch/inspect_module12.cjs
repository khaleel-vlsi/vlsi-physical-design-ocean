const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

console.log("=== HEADINGS ===");
$('h1, h2, h3, h4').each((i, el) => {
    console.log(`${el.name}: ${$(el).text().trim()}`);
});

console.log("\n=== IMAGES ===");
console.log(`Total images: $('img').length`);
$('img').each((i, el) => {
    if (i < 5) {
        console.log(`Image ${i}: ${$(el).attr('src')} (width: ${$(el).attr('width') || 'N/A'})`);
    }
});
