import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

const questions = [];
let headingIndex = 0;

$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (!['h1', 'h2', 'h3'].includes(tagName)) return;
  
  headingIndex++;
  const text = $(el).text().trim();
  
  // Skip non-question headers
  if (tagName === 'h1' || (tagName === 'h2' && text.length > 10) || text.includes('Hold Fixing') || text.includes('REALITY')) {
    return;
  }
  
  // Verify it starts with Q followed by number
  if (/^Q\d+/i.test(text)) {
    let category = 'Unknown';
    let subCategory = 'General Q&A';
    
    // Categorize based on headingIndex in the chronological list
    if (headingIndex >= 2 && headingIndex <= 51) {
      category = 'RTL Design';
      subCategory = 'RTL Design Q&A (Q1-Q50)';
    } else if (headingIndex >= 52 && headingIndex <= 156) {
      category = 'Synthesis';
      subCategory = 'Synthesis Flow (Q1-Q105)';
    } else if (headingIndex >= 157 && headingIndex <= 261) {
      category = 'DFT';
      subCategory = 'DFT & Scan Chain (Q1-Q105)';
    } else if (headingIndex >= 262 && headingIndex <= 436) {
      category = 'STA';
      subCategory = 'STA Concepts & Timing (Q1-Q175)';
    } else if (headingIndex >= 437) {
      category = 'STA';
      subCategory = 'Hold Fixing & ECOs (Q176-Q200+)';
    }
    
    // The question is the next sibling paragraph element
    let next = $(el).next();
    // Skip empty tags
    while (next.length && next.text().trim() === '' && !['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
      next = next.next();
    }
    
    if (!next.length || ['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
      return;
    }
    
    const questionText = next.text().trim();
    
    // Extract answer HTML
    let answerHtml = '';
    let ansNode = next.next();
    while (ansNode.length && !['h1', 'h2', 'h3'].includes(ansNode[0].tagName.toLowerCase())) {
      // Clean up inline fonts/sizes/backgrounds that can ruin dark mode
      const clonedNode = $(ansNode).clone();
      clonedNode.removeAttr('style');
      clonedNode.find('*').each((idx, child) => {
        $(child).removeAttr('style');
      });
      
      answerHtml += $.html(clonedNode);
      ansNode = ansNode.next();
    }
    
    // Wrap answer in standard dark theme paragraph style if it's not already wrapped nicely
    if (answerHtml.trim() !== '') {
      // Add custom style wrapper to match Module 19
      answerHtml = `<div style="line-height: 1.6; color: #bdc1c6;">${answerHtml}</div>`;
    }
    
    // Clean up question number formatting (e.g. "Q1." -> "Q1")
    const cleanNumber = text.replace(/\.$/, '').trim();
    
    questions.push({
      category,
      subCategory,
      questionNumber: cleanNumber,
      question: questionText,
      answer: answerHtml
    });
  }
});

console.log(`Successfully parsed ${questions.length} questions.`);

// Write the output JS file
const fileContent = `export const MODULE20_QUESTIONS = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync('src/data/module20Data.js', fileContent, 'utf8');
console.log('Successfully wrote src/data/module20Data.js');
