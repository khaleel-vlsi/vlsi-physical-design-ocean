const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('scratch/module19_data.json', 'utf8'));

// Clean up questions and answers
const cleanedQuestions = questions.map(q => {
  let cleanAnswer = q.answer;
  // Remove empty paragraphs
  cleanAnswer = cleanAnswer.replace(/<p[^>]*>\s*<span[^>]*>\s*(?:&nbsp;|\u00a0)?\s*<\/span>\s*<\/p>/g, '');
  // Remove trailing empty paragraphs
  cleanAnswer = cleanAnswer.trim();
  
  // Clean question numbers if they have leading numbers, e.g. "1. Why..." -> "Why..."
  let cleanQ = q.question.replace(/^\d+\.\s*/, '').trim();

  // Normalize category names
  let cat = q.category;
  if (cat.includes('BASIC ELECTRONICS')) cat = 'Basic Electronics';
  else if (cat.includes('MOSFET & CMOS')) cat = 'MOSFET & CMOS';
  else if (cat.includes('DIGITAL ELECTRONICS')) cat = 'Digital Electronics';
  else if (cat.includes('LINUX')) cat = 'Linux Commands';
  else if (cat.includes('TCL')) cat = 'TCL Scripting';

  // Normalize subcategory names
  let sub = q.subCategory;
  if (sub.includes('General Q&A')) sub = 'General Q&A';

  return {
    category: cat,
    subCategory: sub,
    question: cleanQ,
    answer: cleanAnswer
  };
});

const fileContent = `export const INTERVIEW_QUESTIONS = ${JSON.stringify(cleanedQuestions, null, 2)};\n`;
fs.writeFileSync('src/data/interviewQuestionsData.js', fileContent);
console.log(`Successfully generated data for ${cleanedQuestions.length} interview questions.`);
