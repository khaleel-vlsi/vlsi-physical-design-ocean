import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

// Mark all questions
$('p').each((i, el) => {
  const text = $(el).text().trim();
  if (text.match(/^\d+\s*\./)) {
    $(el).addClass('question-p');
  }
});

let qCount = 0;
$('.question-p').each((idx, qEl) => {
  qCount++;
  const qText = $(qEl).text().trim();
  const imgs = [];
  
  let nextEl = $(qEl).next();
  while (nextEl.length > 0 && !nextEl.hasClass('question-p')) {
    nextEl.find('img').each((i, img) => {
      imgs.push($(img).attr('src'));
    });
    // Check if nextEl itself is an img
    if (nextEl.is('img')) {
      imgs.push(nextEl.attr('src'));
    }
    nextEl = nextEl.next();
  }
  
  if (imgs.length > 0) {
    console.log(`Q${qCount}: "${qText.substring(0, 60)}" has images:`, imgs);
  }
});

console.log('Total questions scanned:', qCount);
