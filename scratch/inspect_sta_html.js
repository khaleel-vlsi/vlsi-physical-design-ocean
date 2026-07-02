import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module9/STA.html', 'utf8');
console.log('HTML Length:', html.length);

const $ = cheerio.load(html);
console.log('Total paragraphs:', $('p').length);
console.log('Total headings h1:', $('h1').length);
console.log('Total headings h2:', $('h2').length);
console.log('Total headings h3:', $('h3').length);

console.log('\n--- Heading texts ---');
$('h1, h2, h3').each((i, el) => {
  console.log(`${el.name}: "${$(el).text().trim()}"`);
});

console.log('\nFirst 500 characters of HTML:');
console.log(html.substring(0, 500));
