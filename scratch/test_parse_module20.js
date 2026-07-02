import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('tmp/module20/InterviewQuestions_RTLSynthesisDFTSTA_.html', 'utf8');
const $ = cheerio.load(html);

const questions = [];
let currentCategory = 'Unknown';
let currentSubCategory = 'Unknown';

// Helper to determine category based on section heading text
function updateCategory(text) {
  if (text.includes('RTL – PART 1')) {
    currentCategory = 'RTL Design';
    currentSubCategory = 'General Q&A';
  } else if (text.includes('STA – Physical Design Impact')) {
    currentCategory = 'STA';
    currentSubCategory = 'Physical Design Impact';
  } else if (text.includes('HOLD REALITY')) {
    currentCategory = 'STA';
    currentSubCategory = 'Hold Fixing & Late-Stage ECOs';
  } else if (text.includes('PART 8')) {
    currentCategory = 'STA';
    currentSubCategory = 'Hold Fixing & Late-Stage ECOs';
  }
}

// Track when we enter Synthesis, DFT, and STA
// Let's identify the transitions chronologically
let headingIndex = 0;

$('*').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  if (!['h1', 'h2', 'h3'].includes(tagName)) return;
  
  headingIndex++;
  const text = $(el).text().trim();
  
  // Update category based on section headings
  if (tagName === 'h1' || (tagName === 'h2' && text.length > 10)) {
    updateCategory(text);
    return;
  }
  
  // Check if it's a question header
  if (/^Q\d+/i.test(text)) {
    // If it's a question header, let's see which section it belongs to based on headingIndex
    // Let's dynamically assign categories based on index if no section header is explicit:
    // 1. First block of Q1-Q50: RTL Design
    // 2. Second block of Q1-Q105: Synthesis
    // 3. Third block of Q1-Q105: DFT
    // 4. Fourth block of Q1-Q175: STA (Basic/Advanced)
    // 5. Fifth block of Q176-Q200+: STA (Hold Reality)
    
    let category = 'Unknown';
    let subCategory = 'General Q&A';
    
    if (headingIndex >= 2 && headingIndex <= 52) {
      category = 'RTL Design';
      subCategory = 'RTL Design Q&A (Q1-Q50)';
    } else if (headingIndex >= 53 && headingIndex <= 156) {
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
    // Sometimes there can be empty paragraphs before the question text, let's skip them
    while (next.length && next.text().trim() === '' && !['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
      next = next.next();
    }
    
    if (!next.length || ['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
      console.log(`Warning: No question text found for heading "${text}" at index ${headingIndex}`);
      return;
    }
    
    const questionText = next.text().trim();
    
    // The answer is all content following the question text until the next heading
    let answerHtml = '';
    let ansNode = next.next();
    while (ansNode.length && !['h1', 'h2', 'h3'].includes(ansNode[0].tagName.toLowerCase())) {
      // Clean up inline styles on spans and paragraphs to look clean in dark theme
      // But keep standard elements
      answerHtml += $.html(ansNode);
      ansNode = ansNode.next();
    }
    
    questions.push({
      id: questions.length + 1,
      category,
      subCategory,
      number: text,
      question: questionText,
      answer: answerHtml
    });
  }
});

console.log(`Total questions parsed: ${questions.length}`);

// Category counts
const counts = {};
questions.forEach(q => {
  counts[q.category] = (counts[q.category] || 0) + 1;
});
console.log('\nQuestions count by category:');
console.log(JSON.stringify(counts, null, 2));

// SubCategory counts
const subCounts = {};
questions.forEach(q => {
  subCounts[`${q.category} -> ${q.subCategory}`] = (subCounts[`${q.category} -> ${q.subCategory}`] || 0) + 1;
});
console.log('\nQuestions count by subcategory:');
console.log(JSON.stringify(subCounts, null, 2));

// Print first question of each subcategory
const firstOfSub = {};
questions.forEach(q => {
  const key = `${q.category} -> ${q.subCategory}`;
  if (!firstOfSub[key]) {
    firstOfSub[key] = q;
  }
});

console.log('\nFirst question of each subcategory:');
Object.keys(firstOfSub).forEach(key => {
  console.log(`\n--- ${key} ---`);
  console.log(`Number: ${firstOfSub[key].number}`);
  console.log(`Question: ${firstOfSub[key].question}`);
  console.log(`Answer snippet: ${firstOfSub[key].answer.substring(0, 150)}...`);
});
