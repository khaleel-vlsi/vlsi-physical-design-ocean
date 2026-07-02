import { TCL_SCRIPTS } from '../src/data/tclScriptsData.js';

TCL_SCRIPTS.forEach((script) => {
  console.log(`Script ${script.part}-${script.index}: ${script.title}`);
  if (script.explanations) {
    script.explanations.forEach((exp, idx) => {
      console.log(`  - [${exp.step}]: ${exp.code ? exp.code.substring(0, 30) : 'no code'}`);
    });
  } else {
    console.log(`  - No explanations`);
  }
});
