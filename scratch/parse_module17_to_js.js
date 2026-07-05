import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

console.log('Reading Route.html...');
const html = fs.readFileSync('scratch/module17/Route.html', 'utf8');
const $ = cheerio.load(html);

$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();
$('script').remove();

const rawChapters = [];
let currentChapter = { id: 'ch_intro', title: 'Introduction', elements: [] };

$('body').children().each((i, el) => {
  const tagName = el.name ? el.name.toLowerCase() : '';
  const text = $(el).text().trim();

  if (tagName === 'h1' || tagName === 'h2') {
    if (!text) return;
    if (currentChapter && (currentChapter.elements.length > 0 || currentChapter.id !== 'ch_intro')) {
      rawChapters.push(currentChapter);
    }
    const chId = `ch_${i}_${text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 40)}`;
    currentChapter = { id: chId, title: text, elements: [] };
  } else {
    if (currentChapter) currentChapter.elements.push(el);
  }
});
if (currentChapter) rawChapters.push(currentChapter);

console.log('Raw chapters:', rawChapters.length);

const finalChapters = [];

rawChapters.forEach((ch) => {
  const htmlParts = [];
  ch.elements.forEach(el => {
    $(el).removeAttr('style');
    $(el).find('*').removeAttr('style');

    // Remap images — KEEP EXACT FILENAME
    $(el).find('img').each((j, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(img).attr('src', `/assets/modules/module17/${filename}`);
      }
      $(img).removeAttr('style');
      $(img).addClass('native-img');
    });

    if ($(el).is('img')) {
      const src = $(el).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(el).attr('src', `/assets/modules/module17/${filename}`);
      }
      $(el).removeAttr('style');
      $(el).addClass('native-img');
    }

    htmlParts.push($.html(el));
  });

  let chHtml = htmlParts.join('\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '<br />');

  const textContent = chHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (textContent.length < 5 && ch.title.length < 4 && !chHtml.includes('<img')) return;

  finalChapters.push({ id: ch.id, title: ch.title, html: chHtml });
});

console.log('Final chapters:', finalChapters.length);
const outputData = `export const MODULE17_CHAPTERS = ${JSON.stringify(finalChapters, null, 2)};\n`;
fs.writeFileSync('src/data/module17Data.js', outputData, 'utf8');
console.log('Done! Written to src/data/module17Data.js');
