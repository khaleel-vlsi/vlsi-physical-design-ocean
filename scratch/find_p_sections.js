import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Searching for sub-category headers in P tags ---');
$('p').each((i, el) => {
  const text = $(el).text().trim();
  // Check if it's bold/capitalized and doesn't start with a number
  if (text.length > 3 && text.length < 50 && !/^\d+/.test(text) && (text === text.toUpperCase() || text.includes('STAGE') || text.includes('FLOW') || text.includes('INPUTS'))) {
    console.log(`Potential Section Header: "${text}"`);
    console.log(`   HTML: ${$.html(el)}`);
  }
});
