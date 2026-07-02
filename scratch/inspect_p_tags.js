import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Printing first 30 paragraphs starting with a number and a dot ---');
let count = 0;
$('p').each((i, el) => {
  const text = $(el).text().trim();
  if (/^\d+\s*\./.test(text)) {
    count++;
    if (count <= 30) {
      console.log(`P [${count}]: "${text}"`);
      // Print tag classes/structure
      console.log(`   HTML: ${$.html(el)}`);
    }
  }
});
console.log(`\nTotal paragraphs starting with a number and a dot: ${count}`);
