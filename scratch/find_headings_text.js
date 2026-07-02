import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

// Print the headings in a range from the list we generated
let index = 0;
$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (['h1', 'h2', 'h3'].includes(tagName)) {
    index++;
    if (index >= 70 && index <= 95) {
      console.log(`${index}. [${tagName.toUpperCase()}]: "${$(el).text().trim()}"`);
      // Print the immediate next tag text
      let next = $(el).next();
      if (next.length) {
        console.log(`   Next (${next[0].tagName}): "${next.text().trim().substring(0, 100)}"`);
      }
    }
  }
});
