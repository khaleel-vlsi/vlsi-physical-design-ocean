import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Sample 1: RTL Part 1 (H3 Q1) ---');
const q1 = $('h3').filter((i, el) => $(el).text().includes('Q1.'));
if (q1.length) {
  console.log('Q1 Tag:', $.html(q1[0]));
  let next = q1.next();
  for (let j = 0; j < 3; j++) {
    if (next.length) {
      console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next[0]));
      next = next.next();
    }
  }
}

console.log('\n--- Sample 2: H2 Q1 (Synthesis/STA?) ---');
const h2_q1 = $('h2').filter((i, el) => $(el).text().trim() === 'Q1');
if (h2_q1.length) {
  console.log('H2 Tag:', $.html(h2_q1[0]));
  let next = h2_q1.next();
  for (let j = 0; j < 4; j++) {
    if (next.length) {
      console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next[0]));
      next = next.next();
    }
  }
}

console.log('\n--- Sample 3: Q176 ---');
const q176 = $('h3').filter((i, el) => $(el).text().includes('Q176'));
if (q176.length) {
  console.log('Q176 Tag:', $.html(q176[0]));
  let next = q176.next();
  for (let j = 0; j < 3; j++) {
    if (next.length) {
      console.log(`Next ${j+1} (${next[0].tagName}):`, $.html(next[0]));
      next = next.next();
    }
  }
}
