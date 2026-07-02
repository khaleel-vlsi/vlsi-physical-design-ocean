import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Listing ALL H1 and H2 elements ---');
$('h1, h2').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  console.log(`${tagName.toUpperCase()}: ${$(el).text().trim()}`);
});

console.log('\n--- Printing first 20 H3 elements ---');
let count = 0;
$('h3').each((i, el) => {
  if (count < 20) {
    console.log(`H3 [${count+1}]: ${$(el).text().trim()}`);
    count++;
  }
});
