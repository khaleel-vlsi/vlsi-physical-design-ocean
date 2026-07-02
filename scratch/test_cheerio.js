import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('Total paragraphs count:', $('p').length);

const samplePs = [];
$('p').each((i, el) => {
  const text = $(el).text().trim();
  if (text.match(/^\d+\s*\./) || text.match(/^\d+\s*[A-Za-z]/)) {
    samplePs.push({ index: i, text: text.substring(0, 80) });
  }
});

console.log('Found potential question paragraphs count:', samplePs.length);
console.log('First 20 question paragraphs:');
console.log(JSON.stringify(samplePs.slice(0, 20), null, 2));

console.log('\nLast 20 question paragraphs:');
console.log(JSON.stringify(samplePs.slice(-20), null, 2));
