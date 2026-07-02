// scratch/search_transcript.js
import fs from 'fs';
import readline from 'readline';

async function main() {
  const logPath = 'C:\\Users\\priya\\.gemini\\antigravity\\brain\\a92638bd-fb43-4080-8499-ef8a300a5e35\\.system_generated\\logs\\transcript.jsonl';
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("🔍 Scanning transcript for first prompt / company list...");
  let count = 0;
  for await (const line of rl) {
    if (line.includes('"type":"USER_INPUT"') || line.includes("Company Coverage")) {
      const obj = JSON.parse(line);
      console.log(`\n--- Step ${obj.step_index} (Source: ${obj.source}) ---`);
      console.log(obj.content?.substring(0, 1000));
      count++;
    }
  }
  console.log(`\nFinished scanning. Found ${count} matching steps.`);
}
main();
