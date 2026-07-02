import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

console.log('Reading inputs.html...');
const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

// Remove headers and stylesheet metadata
$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();
$('script').remove();

const rawChapters = [];
let currentChapter = {
  id: 'ch_intro',
  title: 'Introduction',
  elements: []
};

$('body').children().each((i, el) => {
  const tagName = el.name ? el.name.toLowerCase() : '';
  const text = $(el).text().trim();
  
  // We break chapters on h1 and h2.
  // We also break chapters on specific paragraphs that look like bold headers at the end
  const isPseudoHeader = tagName === 'p' && (
      text === 'Sanity checks:' || 
      text === 'Design checks:' || 
      text === 'SDC Checks:' || 
      text === 'Library checks:' || 
      text === 'INPUTS LOADING SCRIPT'
  );

  if (tagName === 'h1' || tagName === 'h2' || isPseudoHeader) {
    if (!text) return;
    
    // Save previous chapter if it has elements
    if (currentChapter && (currentChapter.elements.length > 0 || currentChapter.id !== 'ch_intro')) {
      rawChapters.push(currentChapter);
    }
    
    // Create new chapter
    const cleanTitle = text.replace(':', '');
    const chId = `ch_${i}_${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 35)}`;
    currentChapter = {
      id: chId,
      title: cleanTitle,
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

const finalChapters = [];

rawChapters.forEach((ch, idx) => {
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
        $(img).attr('src', `/assets/modules/module12/${filename}`);
      }
      $(img).removeAttr('style');
      $(img).addClass('native-img');
    });
    
    if ($(el).is('img')) {
      const src = $(el).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(el).attr('src', `/assets/modules/module12/${filename}`);
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
  if (textContent.length < 5 && ch.title.length < 4 && !chHtml.includes('<img')) return;
  
  finalChapters.push({
    id: ch.id,
    title: ch.title,
    html: chHtml
  });
});

console.log('Writing to src/data/module12Data.js...');
const outputData = `export const MODULE12_CHAPTERS = ${JSON.stringify(finalChapters, null, 2)};\n`;
fs.writeFileSync('src/data/module12Data.js', outputData, 'utf8');
console.log('Successfully saved to src/data/module12Data.js!');
