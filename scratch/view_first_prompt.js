// scratch/view_first_prompt.js
import fs from 'fs';
import readline from 'readline';

async function main() {
  const logPath = 'C:\\Users\\priya\\.gemini\\antigravity\\brain\\a92638bd-fb43-4080-8499-ef8a300a5e35\\.system_generated\\logs\\transcript.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (line.includes('"step_index":8883')) {
      const obj = JSON.parse(line);
      console.log("=== FULL PROMPT IN STEP 8883 ===");
      console.log(obj.content);
      break;
    }
  }
}
main();
