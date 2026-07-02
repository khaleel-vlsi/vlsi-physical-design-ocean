import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module9/STA.html', 'utf8');
const $ = cheerio.load(html);

// Remove styles and metadata
$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();

const chapters = [];
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
    
    if (currentChapter && (currentChapter.elements.length > 0 || currentChapter.id !== 'ch_intro')) {
      chapters.push(currentChapter);
    }
    
    const chId = `ch_${i}_${text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 30)}`;
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
  chapters.push(currentChapter);
}

console.log('Total raw chapters parsed:', chapters.length);

// Deduplicate chapters by signature
const processedChapters = [];
const seenSignatures = new Set();

chapters.forEach((ch, idx) => {
  const rawHtmlParts = [];
  ch.elements.forEach(el => {
    $(el).removeAttr('style');
    $(el).find('*').removeAttr('style');
    $(el).find('img').each((j, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('images/')) {
        const parts = src.split('/');
        const filename = parts[parts.length - 1];
        $(img).attr('src', `/assets/modules/module9/${filename}`);
      }
    });
    if ($(el).is('img')) {
      const src = $(el).attr('src');
      if (src && src.startsWith('images/')) {
        const parts = src.split('/');
        const filename = parts[parts.length - 1];
        $(el).attr('src', `/assets/modules/module9/${filename}`);
      }
    }
    rawHtmlParts.push($.html(el));
  });
  
  let chHtml = rawHtmlParts.join('\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '<br />');

  // Skip chapters that are completely empty
  if (chHtml.replace(/\s+/g, '').length < 10 && ch.title.length < 5) return;

  const signature = ch.title.trim() + '\n' + chHtml.replace(/\s+/g, ' ').trim().substring(0, 150);
  if (!seenSignatures.has(signature)) {
    seenSignatures.add(signature);
    processedChapters.push({
      id: ch.id,
      title: ch.title,
      html: chHtml,
      length: chHtml.length
    });
  } else {
    console.log(`Skipped duplicate chapter: "${ch.title}"`);
  }
});

console.log('Total unique chapters:', processedChapters.length);
processedChapters.forEach((ch, idx) => {
  console.log(`${idx + 1}. "${ch.title}" (length: ${ch.length} chars)`);
});
