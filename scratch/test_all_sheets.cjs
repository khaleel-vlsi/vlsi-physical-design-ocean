process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';

async function testSheets() {
  const activeModules = [];
  
  // Test primary default sheet
  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL);
    if (res.ok) {
      const text = await res.text();
      const matches = [...text.matchAll(/"(PD-M\d+)"/g)].map(m => m[1]);
      console.log('Default sheet contains module codes:', [...new Set(matches)]);
    }
  } catch (err) {
    console.error('Error fetching default sheet:', err);
  }

  // Test individual sheet tab names for modules 1 to 18
  for (let i = 1; i <= 18; i++) {
    const pad = String(i).padStart(2, '0');
    const tabCandidates = [`PD-M${pad}`, `PD-M${i}`, `Module ${i}`, `Module${i}`, `Sheet${i}`, `Module_${i}`, `Module_${pad}`];
    
    for (const tab of tabCandidates) {
      try {
        const url = `${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(tab)}`;
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          if (text.includes('Question_ID') || text.includes('ELE') || text.includes('PD-M')) {
            console.log(`FOUND ACTIVE TAB: "${tab}" for Module ${i}!`);
            activeModules.push(i);
            break;
          }
        }
      } catch (e) {}
    }
  }

  console.log('TOTAL_ACTIVE_MODULES:', [...new Set(activeModules)]);
}

testSheets();
