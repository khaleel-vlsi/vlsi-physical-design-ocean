import { MODULE20_QUESTIONS } from '../src/data/module20Data.js';

console.log('Total questions in Module 20:', MODULE20_QUESTIONS.length);

let emptyAnswersCount = 0;
let shortAnswersCount = 0;
let nullFieldsCount = 0;
const seenQuestions = new Set();
let duplicatesCount = 0;

MODULE20_QUESTIONS.forEach((q, idx) => {
  if (!q.question || !q.answer || !q.category || !q.subCategory || !q.questionNumber) {
    nullFieldsCount++;
    console.log(`Question ${idx + 1} has null, empty or undefined fields:`, q);
    return;
  }

  const cleanAns = q.answer.replace(/<[^>]*>/g, '').trim();
  if (cleanAns.length === 0) {
    emptyAnswersCount++;
    console.log(`Question ${idx + 1} has empty text answer: "${q.questionNumber}: ${q.question}"`);
  } else if (cleanAns.length < 5) {
    shortAnswersCount++;
    console.log(`Question ${idx + 1} has extremely short answer: "${q.questionNumber}: ${q.question}" -> "${cleanAns}"`);
  }

  const cleanQ = q.question.toLowerCase().trim();
  if (seenQuestions.has(cleanQ)) {
    duplicatesCount++;
    // Let's print duplicates to verify if they are actually duplicated in the source HTML
    console.log(`Duplicate question text found: "${q.questionNumber}: ${q.question}"`);
  } else {
    seenQuestions.add(cleanQ);
  }
});

console.log('\n--- Quality Audit ---');
console.log('Null/empty/undefined fields:', nullFieldsCount);
console.log('Empty answers:', emptyAnswersCount);
console.log('Extremely short answers (<5 chars):', shortAnswersCount);
console.log('Duplicate question texts:', duplicatesCount);
