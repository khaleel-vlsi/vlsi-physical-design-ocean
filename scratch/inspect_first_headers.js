import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Chronological list of first 60 headings ---');
let headingCount = 0;
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (['h1', 'h2', 'h3'].includes(tagName)) {
    if (headingCount < 60) {
      console.log(`${headingCount + 1}. [${tagName.toUpperCase()}]: ${$(el).text().trim()}`);
      headingCount++;
    }
  }
});
