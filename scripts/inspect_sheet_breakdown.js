import https from 'https';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve);
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', (err) => {
      console.error('Fetch error:', err.message);
      resolve('');
    });
  });
}

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

export function classifySubjectFineGrained(q) {
  const mod = String(q.moduleId || '').toUpperCase().trim();
  const top = String(q.topic || '').toUpperCase().trim();
  const sub = String(q.subTopic || '').toUpperCase().trim();
  const txt = String(q.question || '').toUpperCase().trim();

  // 1. DFT
  if (mod.includes('DFT') || top.includes('DFT') || sub.includes('DFT') || txt.includes('SCAN CHAIN') || txt.includes('BOUND SCAN') || txt.includes('ATPG') || txt.includes('BIST')) {
    return 'DFT';
  }

  // 2. Physical Synthesis vs Synthesis
  if (top.includes('PHYSICAL SYNTHESIS') || sub.includes('PHYSICAL SYNTHESIS') || txt.includes('PHYSICAL SYNTHESIS') || txt.includes('SPATIAL SYNTHESIS')) {
    return 'Physical Synthesis';
  }
  if (mod.includes('M06') || mod.includes('M08') || top.includes('SYNTHESIS') || txt.includes('LOGICAL SYNTHESIS') || txt.includes('GATE-LEVEL NETLIST')) {
    return 'Synthesis';
  }

  // 3. STA (Static Timing Analysis)
  if (mod.includes('M09') || mod.includes('M10') || mod.includes('M11') || top.includes('STA') || top.includes('TIMING') || txt.includes('SETUP SLACK') || txt.includes('HOLD SLACK')) {
    return 'STA';
  }

  // 4. PNR Inputs
  if (mod.includes('M12') || top.includes('PNR INPUT') || top.includes('LEF') || top.includes('DEF') || top.includes('LIB') || top.includes('SDC') || txt.includes('TECH LEF') || txt.includes('MACRO LEF')) {
    return 'PNR Inputs';
  }

  // 5. Floorplan
  if (mod.includes('M13') || top.includes('FLOORPLAN') || sub.includes('FLOORPLAN') || txt.includes('HALO') || txt.includes('ASPECT RATIO') || txt.includes('MACRO PLACEMENT')) {
    return 'Floorplan';
  }

  // 6. Placement
  if (mod.includes('M14') || top.includes('PLACEMENT') || sub.includes('PLACEMENT') || txt.includes('GLOBAL PLACEMENT') || txt.includes('LEGALIZATION')) {
    return 'Placement';
  }

  // 7. CTS
  if (mod.includes('M15') || mod.includes('M16') || top.includes('CTS') || top.includes('CLOCK TREE') || txt.includes('CLOCK SKEW') || txt.includes('CLOCK LATENCY')) {
    return 'CTS';
  }

  // 8. Routing & OptRoute
  if (mod.includes('M17') || mod.includes('M18') || top.includes('ROUTE') || top.includes('ROUTING') || txt.includes('GLOBAL ROUTING') || txt.includes('DETAILED ROUTING')) {
    return 'Routing';
  }

  // 9. Signoff
  if (mod.includes('M19') || top.includes('SIGNOFF') || top.includes('DRC') || top.includes('LVS') || txt.includes('PHYSICAL VERIFICATION') || txt.includes('ANTENNA EFFECT')) {
    return 'Signoff';
  }

  // 10. Basic Electronics, CMOS & MOSFET
  if (top.includes('BASIC ELECTRONIC') || txt.includes('RESISTOR') || txt.includes('CAPACITOR') || txt.includes('DIODE')) {
    return 'Basic Electronics';
  }
  if (mod.includes('M01') || top.includes('CMOS') || top.includes('MOSFET') || txt.includes('NMOS') || txt.includes('PMOS') || txt.includes('THRESHOLD VOLTAGE')) {
    return 'CMOS & MOSFET';
  }

  // 11. Digital
  if (mod.includes('M02') || mod.includes('M03') || top.includes('DIGITAL') || txt.includes('LOGIC GATE') || txt.includes('MUX') || txt.includes('FLIP-FLOP')) {
    return 'Digital';
  }

  // 12. Linux
  if (mod.includes('M04') || top.includes('LINUX') || txt.includes('SHELL') || txt.includes('BASH') || txt.includes('AWK') || txt.includes('SED') || txt.includes('GREP')) {
    return 'Linux';
  }

  // 13. TCL
  if (mod.includes('M07') || top.includes('TCL') || txt.includes('PROC') || txt.includes('EXPR') || txt.includes('UPVAR')) {
    return 'TCL';
  }

  // 14. RTL
  if (mod.includes('M05') || top.includes('RTL') || top.includes('VERILOG') || txt.includes('ALWAYS @') || txt.includes('ASSIGN')) {
    return 'RTL';
  }

  return 'CMOS & MOSFET';
}

async function main() {
  console.log('Fetching Google Sheet tabs...');
  const rawRows = [];

  for (let m = 1; m <= 19; m++) {
    const tabName = `PD-M${String(m).padStart(2, '0')}`;
    const csvText = await fetchUrl(`${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(tabName)}`);
    if (!csvText) continue;
    const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
    for (let i = 1; i < lines.length; i++) {
      const c = parseCSVRow(lines[i]).map(x => x.replace(/^"|"$/g, '').trim());
      if (c[0]) {
        rawRows.push({
          questionId: c[0],
          moduleId: c[1] || 'PD-M01',
          difficulty: c[2] || '',
          topic: c[4] || 'General',
          subTopic: c[5] || '',
          question: c[6] || '',
          optionA: c[7] || '',
          optionB: c[8] || '',
          optionC: c[9] || '',
          optionD: c[10] || '',
          correctAnswer: (c[11] || '').toUpperCase().trim()
        });
      }
    }
  }

  const defaultCsv = await fetchUrl(GOOGLE_SHEET_CSV_URL);
  if (defaultCsv) {
    const lines = defaultCsv.split(/\r?\n/).filter(l => l.trim().length > 0);
    for (let i = 1; i < lines.length; i++) {
      const c = parseCSVRow(lines[i]).map(x => x.replace(/^"|"$/g, '').trim());
      if (c[0]) {
        rawRows.push({
          questionId: c[0],
          moduleId: c[1] || 'PD-M01',
          difficulty: c[2] || '',
          topic: c[4] || 'General',
          subTopic: c[5] || '',
          question: c[6] || '',
          optionA: c[7] || '',
          optionB: c[8] || '',
          optionC: c[9] || '',
          optionD: c[10] || '',
          correctAnswer: (c[11] || '').toUpperCase().trim()
        });
      }
    }
  }

  const seenIds = new Set();
  const seenTexts = new Set();
  const validAdvancedQuestions = [];

  for (const q of rawRows) {
    const qId = q.questionId.trim();
    const qText = q.question.trim();
    const optA = q.optionA.trim();
    const optB = q.optionB.trim();
    const optC = q.optionC.trim();
    const optD = q.optionD.trim();
    const correctAns = q.correctAnswer.toUpperCase().trim();
    const diff = q.difficulty.toUpperCase().trim();

    if (!qText || !optA || !optB || !optC || !optD || !['A', 'B', 'C', 'D'].includes(correctAns)) continue;
    if (!diff.includes('ADVANCED')) continue;

    const normText = qText.toLowerCase().replace(/\s+/g, ' ');
    if (seenIds.has(qId) || seenTexts.has(normText)) continue;
    seenIds.add(qId);
    seenTexts.add(normText);

    const subject = classifySubjectFineGrained(q);
    validAdvancedQuestions.push({ ...q, subject });
  }

  const subjectCounts = {};
  for (const q of validAdvancedQuestions) {
    subjectCounts[q.subject] = (subjectCounts[q.subject] || 0) + 1;
  }

  console.log('\n============================================================');
  console.log('       CURRENT EXCEL SHEET — FINE-GRAINED ADVANCED COUNTS');
  console.log('============================================================');
  console.table(subjectCounts);

  const staAvailable = subjectCounts['STA'] || 0;

  const pnrSubjects = ['PNR Inputs', 'Placement', 'CTS', 'Routing', 'Signoff'];
  const pnrTotal = pnrSubjects.reduce((sum, s) => sum + (subjectCounts[s] || 0), 0);

  const synthSubjects = ['Synthesis', 'Physical Synthesis'];
  const synthTotal = synthSubjects.reduce((sum, s) => sum + (subjectCounts[s] || 0), 0);

  const basicSubjects = ['Basic Electronics', 'CMOS & MOSFET', 'Digital', 'Linux', 'RTL', 'DFT'];
  const basicTotal = basicSubjects.reduce((sum, s) => sum + (subjectCounts[s] || 0), 0);

  console.log('\n============================================================');
  console.log('       MAJOR CATEGORY SUMMARY (AVAILABLE vs REQUIRED)');
  console.log('============================================================');
  console.log(`1. STA                         : Available = ${staAvailable} | Required = 40`);
  console.log(`2. PNR / Physical Design       : Available = ${pnrTotal} | Required = 100`);
  console.log(`3. Synthesis                   : Available = ${synthTotal} | Required = 30`);
  console.log(`4. Basic / Foundation          : Available = ${basicTotal} | Required = 30`);
  console.log(`TOTAL ADVANCED QUESTIONS       : Available = ${validAdvancedQuestions.length} | Required = 200\n`);
}

main();
