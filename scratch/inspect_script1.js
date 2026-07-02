import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

const s1 = data[0];
console.log("=== SCRIPT 1 SECTIONS ===");
s1.sections.forEach(sec => {
  console.log(`- Title: "${sec.title}"`);
  sec.items.forEach((item, idx) => {
    console.log(`  [${idx}]: Type: ${item.type}, Text: "${item.text ? item.text.replace(/\n/g, '\\n') : ''}"`);
  });
});
