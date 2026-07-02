import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_fixed.json', 'utf8'));

const getCommands = (code) => {
  const rawLines = code.split('\n');
  const commands = [];
  let currentCmd = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    if (trimmed === '') continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed === '}') continue;

    currentCmd.push(line);

    if (!trimmed.endsWith('\\')) {
      commands.push(currentCmd.join('\n'));
      currentCmd = [];
    }
  }

  if (currentCmd.length > 0) {
    commands.push(currentCmd.join('\n'));
  }

  return commands;
};

// Test on script 11 and script 21
const s11 = data[10];
const s11Commands = getCommands(s11.code);
console.log("=== SCRIPT 11 ALIGNMENT ===");
console.log(`Commands found: ${s11Commands.length}, Explanations: ${s11.explanations.length}`);
s11.explanations.forEach((exp, idx) => {
  const cmd = s11Commands[idx] || 'NO COMMAND MATCH';
  console.log(`- Step: "${exp.step}" -> Explanation: "${exp.explanation.substring(0, 40)}..."`);
  console.log(`  Aligned Code:\n${cmd}\n`);
});

const s21 = data[20];
const s21Commands = getCommands(s21.code);
console.log("\n=== SCRIPT 21 ALIGNMENT ===");
console.log(`Commands found: ${s21Commands.length}, Explanations: ${s21.explanations.length}`);
s21.explanations.forEach((exp, idx) => {
  const cmd = s21Commands[idx] || 'NO COMMAND MATCH';
  console.log(`- Step: "${exp.step}" -> Explanation: "${exp.explanation.substring(0, 40)}..."`);
  console.log(`  Aligned Code:\n${cmd}\n`);
});
