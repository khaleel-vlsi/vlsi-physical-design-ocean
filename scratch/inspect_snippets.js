import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_snippets_fixed.json', 'utf8'));

const s11 = data[10];
console.log("=== FIXED SCRIPT 11 EXPLANATIONS ===");
s11.explanations.forEach(exp => {
  console.log(`- Step: "${exp.step}"`);
  console.log(`  Code: "${exp.code.replace(/\n/g, '\\n')}"`);
  console.log(`  Explanation: "${exp.explanation}"`);
});

const s21 = data[20];
console.log("\n=== FIXED SCRIPT 21 EXPLANATIONS ===");
s21.explanations.forEach(exp => {
  console.log(`- Step: "${exp.step}"`);
  console.log(`  Code: "${exp.code.replace(/\n/g, '\\n')}"`);
  console.log(`  Explanation: "${exp.explanation}"`);
});
