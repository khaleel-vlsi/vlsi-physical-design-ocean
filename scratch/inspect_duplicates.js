import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module9/STA.html', 'utf8');
const $ = cheerio.load(html);

const h1s = [];
$('h1').each((i, el) => {
  h1s.push({ text: $(el).text().trim(), index: i });
});

console.log('Total H1s:', h1s.length);
h1s.forEach(h => {
  console.log(`H1 [${h.index}]: "${h.text}"`);
});

// Let's print out what follows the first few "23. Hold Time" H1 headings
const holdTimeHeaders = [];
$('h1').each((i, el) => {
  const text = $(el).text().trim();
  if (text.includes('23. Hold Time')) {
    holdTimeHeaders.push(el);
  }
});

console.log('\nFound "23. Hold Time" headers:', holdTimeHeaders.length);
holdTimeHeaders.forEach((el, idx) => {
  console.log(`\n--- Instance ${idx + 1} ---`);
  let textSample = '';
  let next = $(el).next();
  for (let k = 0; k < 5 && next.length > 0; k++) {
    textSample += next.text().trim() + '\n';
    next = next.next();
  }
  console.log('Next 5 sibling text lines:');
  console.log(textSample.substring(0, 300));
});
