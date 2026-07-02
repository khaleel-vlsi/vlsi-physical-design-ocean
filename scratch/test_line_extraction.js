import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

const cleanCode = (code) => {
  if (!code) return '';
  return code
    .replace(/^```tcl\r?\n/i, '')
    .replace(/^```gui\r?\n/i, '')
    .replace(/^```\r?\n/i, '')
    .replace(/\r?\n```$/g, '')
    .trim();
};

const extractLines = (scriptCode, stepTitle) => {
  const lines = scriptCode.split('\n');
  const match = stepTitle.match(/Line\s+(\d+)(?:\s*-\s*(\d+))?/i);
  if (!match) return '';

  const startLine = parseInt(match[1], 10);
  const endLine = match[2] ? parseInt(match[2], 10) : startLine;

  let extracted = [];
  for (let i = startLine; i <= endLine; i++) {
    // 1-based index to 0-based index
    const lineIdx = i - 1;
    if (lineIdx >= 0 && lineIdx < lines.length) {
      extracted.push(lines[lineIdx]);
    }
  }

  // If we only extracted a single comment line, pro-actively pull the next active code line
  if (extracted.length === 1 && extracted[0].trim().startsWith('#')) {
    const nextLineIdx = endLine; // which is startLine in 1-based index (meaning index endLine in 0-based)
    if (nextLineIdx < lines.length) {
      extracted.push(lines[nextLineIdx]);
    }
  }

  return extracted.join('\n');
};

// Test on script 11 and script 21
const s11 = rawData[10];
const s11Code = cleanCode(s11.sections.find(sec => sec.title.trim() === 'Generalized Script').items.map(item => item.text || '').join('\n'));
console.log("=== SCRIPT 11 LINE EXTRACTION TEST ===");
s11.sections.forEach(sec => {
  const title = sec.title.trim();
  if (/^Line\s+/i.test(title)) {
    const code = extractLines(s11Code, title);
    console.log(`- Title: "${title}"`);
    console.log(`  Extracted:\n${code}\n`);
  }
});

const s21 = rawData[20];
const s21Code = cleanCode(s21.sections.find(sec => sec.title.trim() === 'Generalized Script').items.map(item => item.text || '').join('\n'));
console.log("=== SCRIPT 21 LINE EXTRACTION TEST ===");
s21.sections.forEach(sec => {
  const title = sec.title.trim();
  if (/^Line\s+/i.test(title)) {
    const code = extractLines(s21Code, title);
    console.log(`- Title: "${title}"`);
    console.log(`  Extracted:\n${code}\n`);
  }
});
