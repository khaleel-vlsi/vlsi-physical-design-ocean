import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_fixed.json', 'utf8'));

const s7 = data[6];
console.log("=== FIXED SCRIPT 7 EXPLANATIONS ===");
s7.explanations.forEach(exp => {
  console.log(`- Step: "${exp.step}"`);
  console.log(`  Code: "${exp.code}"`);
  console.log(`  Explanation: "${exp.explanation}"`);
});

const s21 = data[20];
console.log("\n=== FIXED SCRIPT 21 EXPLANATIONS ===");
s21.explanations.forEach(exp => {
  console.log(`- Step: "${exp.step}"`);
  console.log(`  Code: "${exp.code}"`);
  console.log(`  Explanation: "${exp.explanation}"`);
});
