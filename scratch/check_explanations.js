import { TCL_SCRIPTS } from '../src/data/tclScriptsData.js';

let missingCount = 0;
TCL_SCRIPTS.forEach((script) => {
  if (!script.explanations || script.explanations.length === 0) {
    console.log(`Script ${script.part}-${script.index} (${script.title}) has NO explanations.`);
    missingCount++;
  } else {
    script.explanations.forEach((exp, idx) => {
      if (!exp.step || exp.step.trim() === "") {
        console.log(`Script ${script.part}-${script.index} - Exp ${idx} has empty step name.`);
        missingCount++;
      }
    });
  }
});

console.log(`Audit complete. Missing or invalid items: ${missingCount}`);
