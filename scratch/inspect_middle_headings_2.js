import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

let index = 0;
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (['h1', 'h2', 'h3'].includes(tagName)) {
    index++;
    if (index >= 145 && index <= 170) {
      console.log(`${index}. [${tagName.toUpperCase()}]: "${$(el).text().trim()}"`);
      let next = $(el).next();
      if (next.length) {
        console.log(`   Next (${next[0].tagName}): "${next.text().trim().substring(0, 100)}"`);
      }
    }
  }
});
