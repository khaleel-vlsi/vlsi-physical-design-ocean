import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

const questions = [];
$('p').each((i, el) => {
  const text = $(el).text().trim();
  const match = text.match(/^(\d+)\s*\.\s*(.*)/);
  if (match) {
    questions.push({
      pIndex: i,
      rawNum: match[1],
      qText: match[2]
    });
  }
});

console.log('Total matches found:', questions.length);
questions.forEach((q, idx) => {
  console.log(`${idx + 1}. [pIndex: ${q.pIndex}] [RawNum: ${q.rawNum}] ${q.qText.substring(0, 70)}...`);
});
