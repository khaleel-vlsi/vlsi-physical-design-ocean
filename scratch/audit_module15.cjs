const fs = require('fs');
const cheerio = require('cheerio');

// Image verification
const data = JSON.parse(
  fs.readFileSync('src/data/module15Data.js', 'utf8')
    .replace('export const MODULE15_CHAPTERS = ', '')
    .replace(/;\s*$/, '')
);

let allOk = true;
console.log('=== IMAGE VERIFICATION ===');
data.forEach(ch => {
  const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  if (imgs.length > 0) {
    console.log(`Chapter: "${ch.title.substring(0, 55)}"`);
    imgs.forEach(imgPath => {
      const localPath = imgPath.replace('/assets/', 'public/assets/');
      const exists = fs.existsSync(localPath);
      if (!exists) { console.log(`  MISSING: ${localPath}`); allOk = false; }
      else { console.log(`  OK: ${localPath}`); }
    });
  }
});
if (allOk) console.log('\nAll images verified - perfect match!');
else console.log('\nSome images MISSING!');

// Content audit
const html = fs.readFileSync('scratch/module15/CTS.html', 'utf8');
const $ = cheerio.load(html);
let srcP = 0, srcImgs = 0, srcLists = 0, srcText = 0;
$('body p').each((i,el) => { const t=$(el).text().trim(); if(t) { srcP++; srcText+=t.length; }});
$('body img').each(() => srcImgs++);
$('body ul, body ol').each(() => srcLists++);

const allHtml = data.map(c => c.html).join('\n');
const $g = cheerio.load(allHtml);
let genP = 0, genImgs = 0, genLists = 0, genText = 0;
$g('p').each((i,el) => { const t=$g(el).text().trim(); if(t) { genP++; genText+=t.length; }});
$g('img').each(() => genImgs++);
$g('ul, ol').each(() => genLists++);

console.log('\n=== CONTENT AUDIT ===');
console.log(`Paragraphs: ${srcP} → ${genP} ${srcP===genP?'✅':'❌'}`);
console.log(`Images:     ${srcImgs} → ${genImgs} ${srcImgs===genImgs?'✅':'❌'}`);
console.log(`Lists:      ${srcLists} → ${genLists} ${srcLists===genLists?'✅':'❌'}`);
console.log(`Text chars: ${srcText} → ${genText} diff=${Math.abs(srcText-genText)} ${Math.abs(srcText-genText)===0?'✅ EXACT MATCH':'⚠️'}`);

console.log('\n=== CHAPTERS ('+data.length+' total) ===');
data.forEach((ch,i) => {
  const words = ch.html.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').length;
  console.log(`  [${i+1}] "${ch.title.substring(0,50)}" — ${words} words`);
});
