import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

// We want to print any element with a class containing title or headers
// Let's search for large text or colored text that might be category boundaries.
console.log('--- Searching for category keywords ---');
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const text = $(el).text().trim();
  
  if (['p', 'span', 'h1', 'h2', 'h3'].includes(tagName)) {
    if (/RTL|SYNTHESIS|DFT|STA|STATIC TIMING|HOLD|SETUP|DESIGN FOR TEST/i.test(text) && text.length < 150) {
      // Find the element index in the chronological order of elements
      console.log(`Tag [${tagName.toUpperCase()}]: "${text}"`);
    }
  }
});
