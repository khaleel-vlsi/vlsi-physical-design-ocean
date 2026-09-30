process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function findExactTabNames() {
  const url = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/edit?usp=sharing';
  try {
    const res = await fetch(url);
    const html = await res.text();

    // Look for sheet tab objects in bootstrap data or JSON script blocks
    console.log("Searching for sheet tab names and gids...");
    
    // Pattern 1: { "sheetId": ..., "title": "..." } or [sheetId, "title", ...]
    const titleMatches = [...html.matchAll(/"name":"([^"]+)"/g)].map(m => m[1]);
    const sheetTitleMatches = [...html.matchAll(/"title":"([^"]+)"/g)].map(m => m[1]);
    
    console.log("Name matches:", [...new Set(titleMatches)]);
    console.log("Title matches:", [...new Set(sheetTitleMatches)]);

    // Check specific strings in html
    const keywords = ['Electronics', 'MOSFET', 'CMOS', 'Digital', 'Linux', 'Tcl', 'RTL', 'Verilog', 'Synthesis', 'DFT', 'Testability', 'Physical', 'PD-M'];
    for (const kw of keywords) {
      if (html.includes(kw)) {
        console.log(`Found keyword "${kw}" in spreadsheet HTML!`);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

findExactTabNames();
