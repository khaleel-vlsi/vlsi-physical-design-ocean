const fs = require('fs');
const cheerio = require('./node_modules/cheerio');

const html = fs.readFileSync('scratch/all_tcl_scripts/ALLTCLSCRIPTS.html', 'utf8');
const $ = cheerio.load(html);

// Find all h1 elements (which should represent the script headings)
console.log('--- ALL H1 HEADINGS ---');
$('h1').each((i, el) => {
    console.log(`${i+1}: ${$(el).text().trim()} (id: ${$(el).attr('id')})`);
});

// Let's also see what fonts are defined in style block
const styleText = $('style').text();
const fontFamilies = new Set();
const matches = styleText.match(/font-family:[^;"}]+/g) || [];
matches.forEach(m => fontFamilies.add(m.trim()));

console.log('--- FONT FAMILIES ---');
console.log(Array.from(fontFamilies));
