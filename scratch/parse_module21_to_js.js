import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
const $ = cheerio.load(html);

// Mark all question paragraphs
const questionPs = [];
$('p').each((i, el) => {
  const text = $(el).text().trim();
  if (text.match(/^\d+\s*\./)) {
    $(el).addClass('question-p');
    questionPs.push(el);
  }
});

console.log('Found question paragraphs:', questionPs.length);

const CATEGORY_MAPPING = [
  { maxIdx: 19, category: 'Inputs & Setup', subCategory: 'Setup & Inputs Q&A' },
  { maxIdx: 52, category: 'Floorplan & Powerplan', subCategory: 'Floorplanning & Powerplanning Q&A' },
  { maxIdx: 68, category: 'Placement', subCategory: 'Placement Optimization Q&A' },
  { maxIdx: 97, category: 'CTS', subCategory: 'Clock Tree Synthesis Q&A' },
  { maxIdx: 105, category: 'Routing', subCategory: 'Routing & Congestion Q&A' },
  { maxIdx: 119, category: 'STA & ECO', subCategory: 'STA & Timing Closure Q&A' },
  { maxIdx: 131, category: 'Physical Verification', subCategory: 'Physical Verification Q&A' },
  { maxIdx: 150, category: 'Low Power & UPF', subCategory: 'Low Power & UPF Q&A' }
];

function getCategoryInfo(index) {
  for (const map of CATEGORY_MAPPING) {
    if (index <= map.maxIdx) {
      return { category: map.category, subCategory: map.subCategory };
    }
  }
  return { category: 'Low Power & UPF', subCategory: 'Low Power & UPF Q&A' };
}

const questionsData = [];

questionPs.forEach((el, idx) => {
  const fullText = $(el).text().trim();
  const qNum = `Q${idx + 1}`;
  
  // Extract question text without number (e.g. "1.What is X" -> "What is X")
  const match = fullText.match(/^\d+\s*\.\s*(.*)/s);
  let questionText = match ? match[1].trim() : fullText;
  
  // Get category & subcategory
  const { category, subCategory } = getCategoryInfo(idx);
  
  // Extract answer by collecting all sibling HTML until the next .question-p
  const answerParts = [];
  let nextEl = $(el).next();
  while (nextEl.length > 0 && !nextEl.hasClass('question-p')) {
    // Clone element to prevent modifying original DOM
    const $clone = nextEl.clone();
    
    // Clean style attribute but keep width/height on images
    $clone.find('*').each((i, subEl) => {
      const tag = subEl.name;
      if (tag === 'img') {
        const src = $(subEl).attr('src');
        if (src && src.startsWith('images/')) {
          const filename = path.basename(src);
          $(subEl).attr('src', `/assets/modules/module21/${filename}`);
        }
        // Retain standard dimensions on img, but clear styles that might center or position strangely
        const style = $(subEl).attr('style') || '';
        let width = $(subEl).attr('width');
        let height = $(subEl).attr('height');
        
        // Try extracting width/height from style if not explicitly set
        if (!width) {
          const wMatch = style.match(/width:\s*([\d\.]+(px)?)/);
          if (wMatch) width = wMatch[1];
        }
        if (!height) {
          const hMatch = style.match(/height:\s*([\d\.]+(px)?)/);
          if (hMatch) height = hMatch[1];
        }
        
        $(subEl).removeAttr('style');
        $(subEl).addClass('native-img');
        if (width) $(subEl).attr('width', width);
        if (height) $(subEl).attr('height', height);
      } else {
        $(subEl).removeAttr('style');
      }
    });
    
    if ($clone.is('img')) {
      const src = $clone.attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $clone.attr('src', `/assets/modules/module21/${filename}`);
      }
      $clone.removeAttr('style');
      $clone.addClass('native-img');
    } else {
      $clone.removeAttr('style');
    }
    
    // Convert class names or keep them? Cheerio preserves classes.
    // If they have class, it's fine, but let's strip span tags that don't add value or are just wrapping styles
    // Mammoth/google doc conversion often wraps single words in spans. Let's unwrap them or keep them clean.
    // Let's do a basic sanitization:
    let partHtml = $.html($clone);
    answerParts.push(partHtml);
    
    nextEl = nextEl.next();
  }
  
  // Assemble answer HTML wrapped in a styled container
  let answerHtml = `<div style="line-height: 1.6; color: #bdc1c6;">${answerParts.join('')}</div>`;
  
  // Clean up any remaining docx issues
  answerHtml = answerHtml
    .replace(/&nbsp;/g, ' ')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '<br />');

  questionsData.push({
    category,
    subCategory,
    questionNumber: qNum,
    question: questionText,
    answer: answerHtml
  });
});

console.log('Writing to src/data/module21Data.js...');
const outputContent = `export const MODULE21_QUESTIONS = ${JSON.stringify(questionsData, null, 2)};\n`;
fs.writeFileSync('src/data/module21Data.js', outputContent, 'utf8');
console.log('Module 21 questions successfully parsed and saved!');
