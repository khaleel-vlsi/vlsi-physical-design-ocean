import { TCL_SCRIPTS } from '../src/data/tclScriptsData.js';

TCL_SCRIPTS.forEach((s) => {
  const label = `${s.part === 1 ? 'FC' : 'Innovus'}-${s.index}`;
  const missing = [];
  const textInCode = [];
  
  if (s.explanations) {
    s.explanations.forEach((exp) => {
      if (!exp.code || exp.code.trim() === '') {
        missing.push(exp.step);
      } else if (exp.code.split(' ').length > 4 && !exp.code.includes('$') && !exp.code.includes('[') && !exp.code.includes('{') && !exp.code.includes('set ') && !exp.code.includes('puts')) {
        // Simple heuristic to check if exp.code is actually a description (English text) rather than code
        textInCode.push(exp.step);
      }
    });
  }
  
  if (missing.length > 0 || textInCode.length > 0) {
    console.log(`Script ${label} (${s.title}):`);
    if (missing.length > 0) {
      console.log(`  - Missing code in steps: ${missing.join(', ')}`);
    }
    if (textInCode.length > 0) {
      console.log(`  - Text in code box in steps: ${textInCode.join(', ')}`);
    }
  }
});
