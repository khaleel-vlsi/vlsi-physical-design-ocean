import { TCL_SCRIPTS } from '../src/data/tclScriptsData.js';

let issuesCount = 0;

function logIssue(scriptId, index, title, msg) {
  console.log(`[ISSUE] Script ${scriptId} (Index ${index}): "${title}" -> ${msg}`);
  issuesCount++;
}

TCL_SCRIPTS.forEach((s) => {
  const label = `${s.part === 1 ? 'FC' : 'Innovus'}-${s.index}`;
  
  if (!s.title || s.title.trim() === '') {
    logIssue(s.id, s.index, s.title, "Title is empty");
  }
  if (!s.objective || s.objective.trim() === '') {
    logIssue(s.id, s.index, s.title, "Objective is empty");
  }
  if (!s.code || s.code.trim() === '') {
    logIssue(s.id, s.index, s.title, "Script code is empty");
  }
  
  // Check explanations
  if (!s.explanations || s.explanations.length === 0) {
    logIssue(s.id, s.index, s.title, "Explanations list is empty");
  } else {
    s.explanations.forEach((exp, idx) => {
      const stepLabel = `${label} Explanation step [${exp.step}]`;
      if ((!exp.code || exp.code.trim() === '') && (!exp.explanation || exp.explanation.trim() === '')) {
        logIssue(s.id, s.index, s.title, `${stepLabel} has both code and explanation empty`);
      }
      
      // Check for raw markdown blocks or dividers remaining in text
      if (exp.code && exp.code.includes('```')) {
        logIssue(s.id, s.index, s.title, `${stepLabel} code contains markdown backticks`);
      }
      if (exp.explanation && exp.explanation.includes('```')) {
        logIssue(s.id, s.index, s.title, `${stepLabel} explanation contains markdown backticks`);
      }
      if (exp.explanation && (exp.explanation.includes('---') || exp.explanation.includes('___'))) {
        logIssue(s.id, s.index, s.title, `${stepLabel} explanation contains raw divider characters`);
      }
    });
  }

  // Check questions
  if (s.questions) {
    s.questions.forEach((qna, idx) => {
      const qnaLabel = `${label} Q&A [${idx + 1}]`;
      if (!qna.question || qna.question.trim() === '') {
        logIssue(s.id, s.index, s.title, `${qnaLabel} question is empty`);
      }
      if (!qna.answer || qna.answer.trim() === '') {
        logIssue(s.id, s.index, s.title, `${qnaLabel} answer is empty`);
      }
    });
  }
});

console.log(`\nQuality Check Scan Complete.`);
console.log(`Total issues found: ${issuesCount}`);
