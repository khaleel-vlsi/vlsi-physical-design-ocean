import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

let index = 0;
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (['h1', 'h2', 'h3'].includes(tagName)) {
    index++;
    if (index >= 1 && index <= 55) {
      console.log(`${index}. [${tagName.toUpperCase()}]: "${$(el).text().trim()}"`);
    }
  }
});
