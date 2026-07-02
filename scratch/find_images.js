import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Scanning for Image tags ---');
let imgCount = 0;
$('img').each((i, el) => {
  imgCount++;
  const src = $(el).attr('src');
  const parent = $(el).parent();
  
  // Find the nearest preceding question (paragraph starting with number and dot)
  let prevNode = parent;
  let nearestQuestion = 'Not found';
  while (prevNode.length) {
    const text = prevNode.text().trim();
    if (/^\d+\s*\./.test(text)) {
      nearestQuestion = text;
      break;
    }
    // Try previous element or go up and check siblings
    let prevSib = prevNode.prev();
    if (prevSib.length) {
      prevNode = prevSib;
    } else {
      prevNode = prevNode.parent();
    }
  }

  console.log(`Image ${imgCount}:`);
  console.log(`   Source: "${src}"`);
  console.log(`   Nearest preceding question: "${nearestQuestion}"`);
  console.log(`   Parent tag: "${parent[0] ? parent[0].tagName : 'none'}"`);
});

console.log(`\nTotal images found in HTML: ${imgCount}`);
