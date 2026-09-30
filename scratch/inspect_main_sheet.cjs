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

async function inspectMainSheet() {
  const url = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';
  try {
    const res = await fetch(url);
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    console.log(`Total rows in main sheet: ${lines.length}`);
    
    const moduleCounts = {};
    const diffCounts = {};

    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVRow(lines[i]).map(c => c.replace(/^"|"$/g, '').trim());
      const modId = row[1] || 'UNKNOWN';
      const diff = row[2] || 'UNKNOWN';
      
      moduleCounts[modId] = (moduleCounts[modId] || 0) + 1;
      diffCounts[diff] = (diffCounts[diff] || 0) + 1;
    }

    console.log("Module counts in default sheet:", moduleCounts);
    console.log("Difficulty counts in default sheet:", diffCounts);
  } catch (err) {
    console.error(err);
  }
}

inspectMainSheet();
