import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module9/STA.html', 'utf8');
const $ = cheerio.load(html);

// Remove stylesheet and metadata
$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();

const sections = [];
let currentSection = {
  id: 'sec_intro_0',
  title: 'Introduction & Overview',
  tag: 'h2',
  elements: []
};

$('body').children().each((i, el) => {
  const tagName = el.name ? el.name.toLowerCase() : '';
  if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
    const text = $(el).text().trim();
    // Skip empty headings
    if (!text) return;
    
    // Save previous section if it has content
    if (currentSection && (currentSection.elements.length > 0 || currentSection.id !== 'sec_intro_0')) {
      sections.push(currentSection);
    }
    
    const secId = `sec_${tagName}_${i}_${text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 30)}`;
    currentSection = {
      id: secId,
      title: text,
      tag: tagName,
      elements: []
    };
  } else {
    if (currentSection) {
      currentSection.elements.push(el);
    }
  }
});
if (currentSection) {
  sections.push(currentSection);
}

console.log('Total raw sections parsed:', sections.length);

// Print sections outline with sizes
const processedSections = [];
const seenTitles = new Set();
const seenContents = new Set();

sections.forEach((sec, idx) => {
  // Convert elements to clean HTML
  const rawHtmlParts = [];
  sec.elements.forEach(el => {
    // Clean style tags inside elements
    $(el).removeAttr('style');
    $(el).find('*').removeAttr('style');
    
    // Clean img tags
    $(el).find('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('images/')) {
        $(img).attr('src', src.replace('images/', '/assets/modules/module9/'));
      }
    });
    if ($(el).is('img')) {
      const src = $(el).attr('src');
      if (src && src.startsWith('images/')) {
        $(el).attr('src', src.replace('images/', '/assets/modules/module9/'));
      }
    }
    
    rawHtmlParts.push($.html(el));
  });
  
  let secHtml = rawHtmlParts.join('\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '<br />');

  // Let's create a signature of the section to identify exact content duplicates
  const contentSignature = sec.title + '\n' + secHtml.replace(/\s+/g, ' ').trim().substring(0, 100);
  
  const isDuplicate = seenContents.has(contentSignature);
  if (!isDuplicate) {
    seenContents.add(contentSignature);
    processedSections.push({
      id: sec.id,
      title: sec.title,
      tag: sec.tag,
      html: secHtml,
      length: secHtml.length
    });
  } else {
    console.log(`Skipped duplicate section: "${sec.title}" at index ${idx}`);
  }
});

console.log('Total deduplicated sections:', processedSections.length);
processedSections.slice(0, 30).forEach((sec, idx) => {
  console.log(`${idx + 1}. [${sec.tag}] "${sec.title}" - length: ${sec.length} chars`);
});
