import { INTERVIEW_QUESTIONS } from '../src/data/interviewQuestionsData.js';

console.log('Total questions in JS data:', INTERVIEW_QUESTIONS.length);

let emptyAnswersCount = 0;
let shortAnswersCount = 0;
let nullFieldsCount = 0;
const seenQuestions = new Set();
let duplicatesCount = 0;

INTERVIEW_QUESTIONS.forEach((q, idx) => {
  if (!q.question || !q.answer || !q.category || !q.subCategory) {
    nullFieldsCount++;
    console.log(`Question ${idx + 1} has null or undefined fields:`, q);
    return;
  }

  const cleanAns = q.answer.replace(/<[^>]*>/g, '').trim();
  if (cleanAns.length === 0) {
    emptyAnswersCount++;
    console.log(`Question ${idx + 1} has empty text answer: "${q.question}"`);
  } else if (cleanAns.length < 5) {
    shortAnswersCount++;
    console.log(`Question ${idx + 1} has extremely short answer: "${q.question}" -> "${cleanAns}"`);
  }

  const cleanQ = q.question.toLowerCase().trim();
  if (seenQuestions.has(cleanQ)) {
    duplicatesCount++;
    console.log(`Duplicate question found: "${q.question}"`);
  } else {
    seenQuestions.add(cleanQ);
  }
});

console.log('\n--- Quality Audit ---');
console.log('Null/undefined fields:', nullFieldsCount);
console.log('Empty answers:', emptyAnswersCount);
console.log('Extremely short answers (<5 chars):', shortAnswersCount);
console.log('Duplicate questions:', duplicatesCount);
