process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';

function parseCSVRow(rowText) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < rowText.length; i++) {
    const char = rowText[i];
    if (char === '"') {
      if (inQuotes && rowText[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function inspectModuleCounts() {
  console.log("--- INSPECTING QUESTION COUNTS PER MODULE TAB ---");
  const moduleCounts = {};

  for (let i = 1; i <= 18; i++) {
    const padNum = String(i).padStart(2, '0');
    const tabCandidates = [`PD-M${padNum}`, `PD-M${i}`, `Module ${i}`, `Module${i}`];
    let count = 0;

    for (const tab of tabCandidates) {
      try {
        const res = await fetch(`${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(tab)}`);
        if (res.ok) {
          const csvText = await res.text();
          const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
          if (lines.length > 1) {
            // Count rows that have actual questions
            for (let r = 1; r < lines.length; r++) {
              const row = parseCSVRow(lines[r]);
              // row[6] is question text or row[0] is Question_ID
              if (row[0] && row[0] !== 'Question_ID' && (row[6] || row[0])) {
                count++;
              }
            }
            if (count > 0) {
              console.log(`Module ${i} (Tab "${tab}"): ${count} Questions`);
              break;
            }
          }
        }
      } catch (err) {}
    }
    moduleCounts[i] = count;
  }

  console.log("SUMMARY OF MODULE QUESTION COUNTS:", moduleCounts);
}

inspectModuleCounts();
