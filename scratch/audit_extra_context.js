import { TCL_SCRIPTS } from '../src/data/tclScriptsData.js';

let extraCount = 0;
TCL_SCRIPTS.forEach((s) => {
  const label = `${s.part === 1 ? 'FC' : 'Innovus'}-${s.index}`;
  if (s.extraContext && s.extraContext.length > 0) {
    s.extraContext.forEach((extra) => {
      // Ignore empty HTML extra context if any
      if (extra.html && extra.html.trim() !== '') {
        console.log(`Script ${label} (${s.title}) has extraContext: "${extra.title}" -> size: ${extra.html.length} chars`);
        extraCount++;
      }
    });
  }
});

console.log(`\nTotal populated extraContext items: ${extraCount}`);
