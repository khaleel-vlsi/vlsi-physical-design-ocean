import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

let output = '--- List of all Module 21 Questions ---\n';
let count = 0;
$('p').each((i, el) => {
  const text = $(el).text().trim();
  if (/^\d+\s*\./.test(text)) {
    count++;
    output += `${count}. ${text}\n`;
  }
});

fs.writeFileSync('scratch/module21_questions.txt', output, 'utf8');
console.log(`Successfully wrote ${count} questions to scratch/module21_questions.txt`);
