const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

const questions = [];
let currentCategory = null;
let currentSubCategory = null;

$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const $el = $(el);
  const text = $el.text().trim();

  if (tagName === 'h1') {
    if (text.length > 0) {
      currentCategory = text.replace(/🔴|📘/g, '').trim();
      currentSubCategory = null;
    }
  } else if (tagName === 'h2') {
    if (text.length > 0 && !text.includes('(50 High-Level') && !text.includes('100 High-Level')) {
      currentSubCategory = text.replace(/🔹/g, '').trim();
    }
  } else if (tagName === 'h3') {
    // Start a new question
    const qText = text;
    // Find the next paragraphs until another h3, h2, h1
    let answerHtml = '';
    let next = $el.next();
    
    while (next.length > 0) {
      const nextTagName = next[0].tagName.toLowerCase();
      if (nextTagName === 'h3' || nextTagName === 'h2' || nextTagName === 'h1') {
        break;
      }
      if (nextTagName === 'p') {
        // Get the html content of the paragraph
        let pHtml = next.html().trim();
        // Remove "Answer:<br>" or "Ans:" or "Answer:" prefixes
        pHtml = pHtml.replace(/^(<span[^>]*>\s*(Answer|Ans):?\s*(<br\/?>)?\s*<\/span>|Answer:|Ans:)/i, '').trim();
        // If it starts with &nbsp;, remove it
        pHtml = pHtml.replace(/^(&nbsp;\s*|\u00a0\s*)/, '').trim();
        if (pHtml.length > 0) {
          answerHtml += `<p style="margin-bottom: 12px; line-height: 1.6; color: #bdc1c6;">${pHtml}</p>`;
        }
      }
      next = next.next();
    }

    questions.push({
      category: currentCategory || 'General',
      subCategory: currentSubCategory || 'General Q&A',
      question: qText,
      answer: answerHtml
    });
  }
});

fs.writeFileSync('scratch/module19_data.json', JSON.stringify(questions, null, 2));
console.log(`Successfully parsed ${questions.length} questions.`);
