import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Analyzing Headings ---');
const headingCounts = { h1: 0, h2: 0, h3: 0 };
$('h1, h2, h3').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  headingCounts[tagName]++;
  if (tagName === 'h1' || tagName === 'h2' || (tagName === 'h3' && headingCounts.h3 <= 10)) {
    console.log(`${tagName.toUpperCase()}: ${$(el).text().trim()}`);
  }
});

console.log('\nTotal Counts:');
console.log(JSON.stringify(headingCounts, null, 2));
