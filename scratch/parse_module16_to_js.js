import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

console.log('Reading OPTCTS.html...');
const html = fs.readFileSync('scratch/module16/OPTCTS.html', 'utf8');
const $ = cheerio.load(html);

$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();
$('script').remove();

// This module is image-only (slides) — collect ALL images in document order
const imageElements = [];

$('body').find('img').each((i, img) => {
  const src = $(img).attr('src');
  if (src && src.startsWith('images/')) {
    const filename = path.basename(src);
    const newSrc = `/assets/modules/module16/${filename}`;
    imageElements.push(`<img src="${newSrc}" alt="OPT CTS Slide ${i + 1}" class="native-img slide-img" />`);
  }
});

console.log(`Found ${imageElements.length} images`);

// Create chapters by grouping every 4 images as a "slide group"
// so the nav has meaningful sections
const groups = [
  { title: 'OPT CTS – Part 1', images: imageElements.slice(0, 7) },
  { title: 'OPT CTS – Part 2', images: imageElements.slice(7, 14) },
  { title: 'OPT CTS – Part 3', images: imageElements.slice(14, 21) },
  { title: 'OPT CTS – Part 4', images: imageElements.slice(21) },
];

const finalChapters = groups.map((g, idx) => ({
  id: `ch_optcts_part_${idx + 1}`,
  title: g.title,
  html: g.images.join('\n'),
}));

console.log('Final chapters:', finalChapters.length);
const outputData = `export const MODULE16_CHAPTERS = ${JSON.stringify(finalChapters, null, 2)};\n`;
fs.writeFileSync('src/data/module16Data.js', outputData, 'utf8');
console.log('Done! Written to src/data/module16Data.js');
