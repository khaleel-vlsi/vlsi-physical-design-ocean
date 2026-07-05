const fs = require('fs');
const cheerio = require('cheerio');

// Load source HTML
const html = fs.readFileSync('scratch/module14/Placement.html', 'utf8');
const $ = cheerio.load(html);

// Count source content
let sourceTotalText = 0;
let sourceImgs = 0;
let sourceParas = 0;
let sourceLists = 0;
let sourceTables = 0;

$('body').find('p').each((i, el) => {
    const t = $(el).text().trim();
    if (t.length > 0) { sourceParas++; sourceTotalText += t.length; }
});
$('body').find('img').each(() => sourceImgs++);
$('body').find('ul, ol').each(() => sourceLists++);
$('body').find('table').each(() => sourceTables++);

console.log('=== SOURCE HTML ===');
console.log(`Paragraphs with text: ${sourceParas}`);
console.log(`Images:               ${sourceImgs}`);
console.log(`Lists (ul/ol):        ${sourceLists}`);
console.log(`Tables:               ${sourceTables}`);
console.log(`Total text chars:     ${sourceTotalText}`);

// Load generated data
const data = JSON.parse(
  fs.readFileSync('src/data/module14Data.js', 'utf8')
    .replace('export const MODULE14_CHAPTERS = ', '')
    .replace(/;\s*$/, '')
);

const allHtml = data.map(c => c.html).join('\n');
const $gen = cheerio.load(allHtml);

let genTotalText = 0;
let genImgs = 0;
let genParas = 0;
let genLists = 0;
let genTables = 0;

$gen('p').each((i, el) => {
    const t = $gen(el).text().trim();
    if (t.length > 0) { genParas++; genTotalText += t.length; }
});
$gen('img').each(() => genImgs++);
$gen('ul, ol').each(() => genLists++);
$gen('table').each(() => genTables++);

console.log('\n=== GENERATED DATA ===');
console.log(`Paragraphs with text: ${genParas}`);
console.log(`Images:               ${genImgs}`);
console.log(`Lists (ul/ol):        ${genLists}`);
console.log(`Tables:               ${genTables}`);
console.log(`Total text chars:     ${genTotalText}`);

console.log('\n=== COMPARISON ===');
console.log(`Paragraphs: ${sourceParas === genParas ? 'MATCH ✅' : `MISMATCH ❌ (source:${sourceParas} gen:${genParas})`}`);
console.log(`Images:     ${sourceImgs === genImgs ? 'MATCH ✅' : `MISMATCH ❌ (source:${sourceImgs} gen:${genImgs})`}`);
console.log(`Lists:      ${sourceLists === genLists ? 'MATCH ✅' : `MISMATCH ❌ (source:${sourceLists} gen:${genLists})`}`);
console.log(`Tables:     ${sourceTables === genTables ? 'MATCH ✅' : `MISMATCH ❌ (source:${sourceTables} gen:${genTables})`}`);

const textDiff = Math.abs(sourceTotalText - genTotalText);
const textPct = ((textDiff / sourceTotalText) * 100).toFixed(1);
console.log(`Text chars: source=${sourceTotalText} gen=${genTotalText} diff=${textDiff} (${textPct}%)`);
if (textDiff === 0) console.log('Text: EXACT MATCH ✅');
else if (textPct < 2) console.log('Text: NEAR MATCH ✅ (minor whitespace/nbsp differences)');
else console.log(`Text: MISMATCH ❌ - ${textPct}% content missing!`);

console.log('\n=== CHAPTERS ===');
console.log(`Total chapters: ${data.length}`);
data.forEach((ch, i) => {
    const words = ch.html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().split(' ').length;
    console.log(`  [${i+1}] "${ch.title.substring(0,50)}" — ${words} words`);
});
