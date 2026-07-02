import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

const numbers = [];
$('p').each((i, el) => {
  const text = $(el).text().trim();
  const match = text.match(/^(\d+)\s*\./);
  if (match) {
    numbers.push(parseInt(match[1]));
  }
});

console.log('Total extracted numbers:', numbers.length);

// Check sequence
let isSequential = true;
const missing = [];
const duplicates = [];
const seen = new Set();

for (let i = 1; i <= numbers.length; i++) {
  if (!numbers.includes(i)) {
    missing.push(i);
  }
}

numbers.forEach(num => {
  if (seen.has(num)) {
    duplicates.push(num);
  }
  seen.add(num);
});

console.log('Missing numbers:', missing);
console.log('Duplicate numbers:', duplicates);
if (missing.length === 0 && duplicates.length === 0) {
  console.log('Perfect sequence! All numbers from 1 to', numbers.length, 'are present once.');
}
