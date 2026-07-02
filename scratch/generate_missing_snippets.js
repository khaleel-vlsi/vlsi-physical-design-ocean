import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_fixed.json', 'utf8'));

const extractLines = (scriptCode, stepTitle) => {
  const lines = scriptCode.split('\n');
  
  // Try to match ranges like "Line 19-21" or single lines like "Line 4"
  const rangeMatch = stepTitle.match(/Line\s+(\d+)(?:\s*-\s*(\d+))?/i);
  if (!rangeMatch) return '';

  const startLine = parseInt(rangeMatch[1], 10);
  const endLine = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : startLine;

  let extracted = [];
  for (let i = startLine; i <= endLine; i++) {
    const lineIdx = i - 1; // 0-indexed
    if (lineIdx >= 0 && lineIdx < lines.length) {
      extracted.push(lines[lineIdx]);
    }
  }

  // If the extracted block is just comments, pull subsequent non-comment lines
  let j = endLine; // index of next line in 1-based index (meaning index j in 0-based)
  while (extracted.length > 0 && extracted.every(l => l.trim().startsWith('#') || l.trim() === '')) {
    if (j >= 0 && j < lines.length) {
      extracted.push(lines[j]);
      j++;
    } else {
      break;
    }
  }

  // If we still have multiline continuation backslashes, let's pull them to make the code snippet complete
  let lastLine = extracted[extracted.length - 1] || '';
  let k = j;
  while (lastLine.trim().endsWith('\\') && k < lines.length) {
    extracted.push(lines[k]);
    lastLine = lines[k];
    k++;
  }

  return extracted.join('\n').trim();
};

data.forEach((s) => {
  if (s.explanations) {
    s.explanations.forEach((exp) => {
      // If the code snippet is empty, extract it programmatically!
      if (!exp.code || exp.code.trim() === '') {
        const code = extractLines(s.code, exp.step);
        if (code) {
          exp.code = code;
        }
      }
    });
  }
});

fs.writeFileSync('scratch/tcl_snippets_fixed.json', JSON.stringify(data, null, 2));
console.log('Successfully generated missing code snippets and saved to scratch/tcl_snippets_fixed.json');
