const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module27/PhysicalSynthesisandPNRFLOWINFC.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== First 40 body elements ===');
$('body').children().each((i, el) => {
    if (i > 40) return;
    const text = $(el).text().trim().substring(0, 70);
    console.log(`[${i}] <${el.name}>: ${text.replace(/\n/g, ' ')}`);
});

console.log('\n=== All headings (h1/h2/h3) ===');
$('h1, h2, h3').each((i, el) => {
    console.log(`<${el.name}>: ${$(el).text().trim()}`);
});
