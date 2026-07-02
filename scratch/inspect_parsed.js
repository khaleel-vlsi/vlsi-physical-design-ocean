import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

const s7 = data[6];
console.log("=== SCRIPT 7 SECTIONS ===");
s7.sections.forEach(sec => {
  console.log(`- Title: "${sec.title}"`);
  sec.items.forEach((item, idx) => {
    console.log(`  [${idx}]: Type: ${item.type}, Text: "${item.text ? item.text.replace(/\n/g, '\\n') : ''}"`);
  });
});

const s21 = data[20];
console.log("\n=== SCRIPT 21 SECTIONS ===");
s21.sections.forEach(sec => {
  console.log(`- Title: "${sec.title}"`);
  sec.items.forEach((item, idx) => {
    console.log(`  [${idx}]: Type: ${item.type}, Text: "${item.text ? item.text.replace(/\n/g, '\\n') : ''}"`);
  });
});
