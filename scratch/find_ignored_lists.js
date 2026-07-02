import fs from 'fs';
import * as cheerio from 'cheerio';
import { INTERVIEW_QUESTIONS } from '../src/data/interviewQuestionsData.js';

const html = fs.readFileSync('tmp/module19/CoreInterviewQuestions_ElectronicsCMOSDigital.html', 'utf8');
const $ = cheerio.load(html);

// Find all H3 questions that have a list following them
const questionsWithLists = [];
$('h3').each((i, el) => {
  const questionText = $(el).text().trim();
  let hasList = false;
  let next = $(el).next();
  let listHtml = '';
  
  while (next.length && !['h1', 'h2', 'h3'].includes(next[0].tagName.toLowerCase())) {
    if (['ul', 'ol'].includes(next[0].tagName.toLowerCase())) {
      hasList = true;
      listHtml += $.html(next);
    }
    next = next.next();
  }
  
  if (hasList) {
    questionsWithLists.push({ questionText, listHtml });
  }
});

console.log(`Total questions in HTML with list elements: ${questionsWithLists.length}`);

// Compare with JS array
let mismatchCount = 0;
questionsWithLists.forEach((qHtml, idx) => {
  // Try to find the matching question in JS data
  const normHtmlQ = qHtml.questionText.replace(/^\d+[\.\)]\s*/, '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
  const jsMatch = INTERVIEW_QUESTIONS.find(jq => {
    const normJsq = jq.question.replace(/^\d+[\.\)]\s*/, '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
    return normJsq === normHtmlQ;
  });
  
  if (jsMatch) {
    // Check if the list HTML or items are in the JS answer
    const hasUl = jsMatch.answer.includes('<ul') || jsMatch.answer.includes('<ol') || jsMatch.answer.includes('<li');
    if (!hasUl) {
      mismatchCount++;
      console.log(`\nMismatch ${mismatchCount}: "${jsMatch.question}"`);
      console.log('--- HTML List Content ---');
      console.log(qHtml.listHtml);
      console.log('--- JS Answer Content ---');
      console.log(jsMatch.answer);
    }
  } else {
    console.log(`Could not find JS match for: "${qHtml.questionText}"`);
  }
});

console.log(`\nTotal mismatches found: ${mismatchCount}`);
