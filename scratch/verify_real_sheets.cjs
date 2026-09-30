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

async function verifyRealSheets() {
  console.log("=== CHECKING REAL AVAILABLE MODULES IN GOOGLE SHEET ===");
  const activeModules = new Set();

  for (let i = 1; i <= 18; i++) {
    const padNum = String(i).padStart(2, '0');
    const targetCode = `PD-M${padNum}`;
    const tabCandidates = [`PD-M${padNum}`, `PD-M${i}`, `Module ${i}`, `Module${i}`];

    let foundForMod = false;

    for (const tab of tabCandidates) {
      try {
        const url = `${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(tab)}`;
        const res = await fetch(url);
        if (res.ok) {
          const csvText = await res.text();
          const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
          
          if (lines.length > 1) {
            let matchingRowCount = 0;
            for (let r = 1; r < lines.length; r++) {
              const row = parseCSVRow(lines[r]);
              const rowModId = (row[1] || '').trim().toUpperCase();
              
              // Verify that the returned rows ACTUALLY match Module i (e.g. PD-M01, PD-M02, etc.)
              if (rowModId === targetCode || rowModId === `PD-M${i}` || rowModId.endsWith(`M${i}`) || rowModId.endsWith(`${i}`)) {
                matchingRowCount++;
              }
            }

            if (matchingRowCount > 0) {
              console.log(`✅ Module ${i} (${targetCode}) IS AVAILABLE in Google Sheet: ${matchingRowCount} questions found!`);
              activeModules.add(i);
              foundForMod = true;
              break;
            }
          }
        }
      } catch (e) {}
    }

    if (!foundForMod) {
      console.log(`❌ Module ${i} (${targetCode}) is NOT available in Google Sheet.`);
    }
  }

  console.log("\n==============================================");
  console.log("REAL AVAILABLE MODULE NUMBERS:", [...activeModules].sort((a,b)=>a-b));
  console.log("==============================================");
}

verifyRealSheets();
