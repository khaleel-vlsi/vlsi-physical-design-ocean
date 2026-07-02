import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

// Print content under the first few H3 elements
console.log('--- Content under H3 [1]: Q1. ---');
const h3_1 = $('h3').eq(0);
console.log('H3 text:', h3_1.text().trim());
console.log('Next tag name:', h3_1.next()[0] ? h3_1.next()[0].tagName : 'none');
console.log('Next tag HTML:', h3_1.next().html() ? h3_1.next().html().substring(0, 300) : 'none');

console.log('\n--- Content under H2: Q1 ---');
const h2_q1 = $('h2').filter((i, el) => $(el).text().trim() === 'Q1');
if (h2_q1.length) {
  console.log('H2 text:', h2_q1.text().trim());
  let next = h2_q1.next();
  for (let j = 0; j < 3; j++) {
    if (next.length) {
      console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next).substring(0, 300));
      next = next.next();
    }
  }
} else {
  console.log('Could not find H2 with text "Q1"');
}

console.log('\n--- What is under H1: STA – Physical Design Impact ---');
const h1_sta = $('h1').eq(0);
console.log('H1 text:', h1_sta.text().trim());
let nextNode = h1_sta.next();
for (let j = 0; j < 5; j++) {
  if (nextNode.length) {
    console.log(`Next ${j+1} (${nextNode[0].tagName}):`, $.html(nextNode).substring(0, 300));
    nextNode = nextNode.next();
  }
}
