import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

let output = '--- Chronological list of ALL headings ---\n';
let headingCount = 0;
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (['h1', 'h2', 'h3'].includes(tagName)) {
    output += `${headingCount + 1}. [${tagName.toUpperCase()}]: ${$(el).text().trim()}\n`;
    headingCount++;
  }
});

fs.writeFileSync('scratch/all_headings.txt', output, 'utf8');
console.log(`Successfully wrote ${headingCount} headings to scratch/all_headings.txt`);
