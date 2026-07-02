import fs from 'fs';
import * as cheerio from 'cheerio';
import { INTERVIEW_QUESTIONS } from '../src/data/interviewQuestionsData.js';

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

// Helper to normalize and strip leading numbers/spaces
function normalizeQuestion(q) {
  return q
    .replace(/^\d+[\.\)]\s*/, '') // strip "1. " or "1) "
    .replace(/^🔹\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // remove all non-alphanumeric chars
    .trim();
}

const htmlQuestions = [];
let currentCategory = 'Unknown';
let currentSubCategory = 'Unknown';

$('h1, h2, h3').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const text = $(el).text().trim();
  
  if (tagName === 'h1') {
    currentCategory = text;
    currentSubCategory = 'General Q&A';
  } else if (tagName === 'h2') {
    currentSubCategory = text;
  } else if (tagName === 'h3') {
    // This is a question
    let questionText = text;
    // Get subsequent paragraph elements until we hit another h1, h2, or h3
    let answerHtml = '';
    let next = $(el).next();
    while (next.length && !['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
      answerHtml += $.html(next);
      next = next.next();
    }
    
    htmlQuestions.push({
      category: currentCategory,
      subCategory: currentSubCategory,
      question: questionText,
      answer: answerHtml
    });
  }
});

console.log(`HTML questions parsed: ${htmlQuestions.length}`);
console.log(`JS questions in file: ${INTERVIEW_QUESTIONS.length}`);

// Match check
const jsNormalizedSet = new Set(INTERVIEW_QUESTIONS.map(q => normalizeQuestion(q.question)));
const missing = [];

htmlQuestions.forEach(q => {
  const normQ = normalizeQuestion(q.question);
  if (!jsNormalizedSet.has(normQ)) {
    missing.push(q);
  }
});

console.log(`Actual missing questions count: ${missing.length}`);
if (missing.length > 0) {
  console.log('\n--- Missing Questions ---');
  missing.forEach((mq, idx) => {
    console.log(`${idx + 1}. [${mq.category} -> ${mq.subCategory}] ${mq.question}`);
  });
} else {
  console.log('\nAll questions in the HTML source are successfully accounted for in the JS file!');
}
