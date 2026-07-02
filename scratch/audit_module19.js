import fs from 'fs';
import * as cheerio from 'cheerio';
import { INTERVIEW_QUESTIONS } from '../src/data/interviewQuestionsData.js';

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

// 1. Extract from HTML
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

console.log(`--- Audit Report for Module 19 ---`);
console.log(`HTML questions count: ${htmlQuestions.length}`);
console.log(`JS questions count: ${INTERVIEW_QUESTIONS.length}`);

// Category breakdown in HTML
const htmlBreakdown = {};
htmlQuestions.forEach(q => {
  const key = `${q.category} -> ${q.subCategory}`;
  htmlBreakdown[key] = (htmlBreakdown[key] || 0) + 1;
});

// Category breakdown in JS
const jsBreakdown = {};
INTERVIEW_QUESTIONS.forEach(q => {
  const key = `${q.category} -> ${q.subCategory}`;
  jsBreakdown[key] = (jsBreakdown[key] || 0) + 1;
});

console.log('\nHTML breakdown:');
console.log(JSON.stringify(htmlBreakdown, null, 2));

console.log('\nJS breakdown:');
console.log(JSON.stringify(jsBreakdown, null, 2));

// Find any missing questions
const jsQuestionsSet = new Set(INTERVIEW_QUESTIONS.map(q => q.question.toLowerCase().replace(/\s+/g, ' ').trim()));
const missing = [];

htmlQuestions.forEach(q => {
  const cleanQ = q.question.toLowerCase().replace(/\s+/g, ' ').trim();
  if (!jsQuestionsSet.has(cleanQ)) {
    missing.push(q);
  }
});

console.log(`\nMissing questions count: ${missing.length}`);
if (missing.length > 0) {
  console.log('Sample missing questions:');
  missing.forEach((mq, idx) => {
    console.log(`${idx + 1}. [${mq.category}][${mq.subCategory}] ${mq.question}`);
  });
}
