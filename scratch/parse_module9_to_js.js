import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

console.log('Reading STA.html...');
const html = fs.readFileSync('tmp/module9/STA.html', 'utf8');
const $ = cheerio.load(html);

// Remove headers and stylesheet metadata
$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();

const rawChapters = [];
let currentChapter = {
  id: 'ch_intro',
  title: '1. Introduction & Design Flow',
  elements: []
};

$('body').children().each((i, el) => {
  const tagName = el.name ? el.name.toLowerCase() : '';
  if (tagName === 'h1') {
    const text = $(el).text().trim();
    if (!text) return;
    
    // Save previous chapter if it has elements
    if (currentChapter && (currentChapter.elements.length > 0 || currentChapter.id !== 'ch_intro')) {
      rawChapters.push(currentChapter);
    }
    
    // Create new chapter
    const chId = `ch_${i}_${text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 35)}`;
    currentChapter = {
      id: chId,
      title: text,
      elements: []
    };
  } else {
    if (currentChapter) {
      currentChapter.elements.push(el);
    }
  }
});
if (currentChapter) {
  rawChapters.push(currentChapter);
}

console.log('Raw chapters extracted:', rawChapters.length);

// Helper to normalize titles for duplicate checking
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/^\d+[\.\:\s]*/, '') // remove leading numbers
    .replace(/[^a-z0-9]+/g, ' ')   // keep only letters and numbers
    .trim();
}

const finalChapters = [];
const seenSignatures = new Set();

rawChapters.forEach((ch, idx) => {
  // Build clean HTML for elements
  const htmlParts = [];
  ch.elements.forEach(el => {
    // Clean all inline style properties to prevent contrast issues on dark theme
    $(el).removeAttr('style');
    $(el).find('*').removeAttr('style');
    
    // Remap images
    $(el).find('img').each((j, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(img).attr('src', `/assets/modules/module9/${filename}`);
      }
      $(img).removeAttr('style');
      $(img).addClass('native-img');
    });
    
    if ($(el).is('img')) {
      const src = $(el).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(el).attr('src', `/assets/modules/module9/${filename}`);
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

  // Skip completely empty chapters
  const textContent = chHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (textContent.length < 15 && ch.title.length < 4) return;
  
  // Calculate content signature (normalized title + first 200 characters of text content)
  const normTitle = normalizeTitle(ch.title);
  const first200Text = textContent.substring(0, 200);
  const signature = `${normTitle}|${first200Text}`;
  
  if (!seenSignatures.has(signature)) {
    seenSignatures.add(signature);
    finalChapters.push({
      id: ch.id,
      title: ch.title,
      html: chHtml
    });
  } else {
    console.log(`Skipped duplicate chapter [idx ${idx}]: "${ch.title}"`);
  }
});

console.log('Deduplicated chapters count:', finalChapters.length);

console.log('Writing to src/data/module9Data.js...');
const outputData = `export const MODULE9_CHAPTERS = ${JSON.stringify(finalChapters, null, 2)};\n`;
fs.writeFileSync('src/data/module9Data.js', outputData, 'utf8');
console.log('Successfully saved to src/data/module9Data.js!');
