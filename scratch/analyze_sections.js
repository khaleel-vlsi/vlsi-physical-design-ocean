import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Scanning H1, H2, and other potential category titles ---');
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const text = $(el).text().trim();
  
  if (['h1', 'h2'].includes(tagName)) {
    console.log(`HEADER [${tagName.toUpperCase()}]: "${text}"`);
  } else if (tagName === 'p' && (text.includes('PART') || text.includes('SECTION')) && text.length < 100) {
    console.log(`POTENTIAL TITLE [P]: "${text}"`);
  }
});
