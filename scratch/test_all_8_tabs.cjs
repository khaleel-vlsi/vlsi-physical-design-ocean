process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

async function checkAll8Tabs() {
  const baseUrl = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';
  console.log("=== CHECKING ALL 8 MODULE TABS IN GOOGLE SHEET ===");

  for (let i = 1; i <= 8; i++) {
    const padNum = String(i).padStart(2, '0');
    const tabName = `PD-M${padNum}`;
    const url = `${baseUrl}&sheet=${encodeURIComponent(tabName)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.log(`❌ Tab ${tabName} returned HTTP ${res.status}`);
        continue;
      }
      const text = await res.text();
      const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
      
      let count = 0;
      let matchingCount = 0;

      for (let r = 1; r < lines.length; r++) {
        const row = parseCSVRow(lines[r]).map(c => c.replace(/^"|"$/g, '').trim());
        if (row[0]) count++;
        const modId = (row[1] || '').toUpperCase();
        if (modId === tabName) matchingCount++;
      }

      console.log(`✅ Tab ${tabName}: Total rows = ${count}, Matching Module_ID ('${tabName}') rows = ${matchingCount}`);
    } catch (err) {
      console.log(`❌ Error checking tab ${tabName}:`, err.message);
    }
  }
}

checkAll8Tabs();
