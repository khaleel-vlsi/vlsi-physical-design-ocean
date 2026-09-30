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

async function fetchSheetRows(sheetName = null) {
  let targetUrl = GOOGLE_SHEET_CSV_URL;
  if (sheetName) {
    targetUrl += `&sheet=${encodeURIComponent(sheetName)}`;
  }

  const csvText = await fetchUrl(targetUrl);
  if (!csvText || csvText.length === 0) return [];

  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseCSVRow(lines[i]).map(c => c.replace(/^"|"$/g, '').trim());
    if (!cells[0] || cells[0].length === 0) continue;

    rows.push({
      questionId: cells[0] || `Q_${i}`,
      moduleId: cells[1] || 'PD-M01',
      difficulty: cells[2] || '',
      type: cells[3] || 'SCQ',
      topic: cells[4] || 'General',
      subTopic: cells[5] || '',
      question: cells[6] || '',
      optionA: cells[7] || '',
      optionB: cells[8] || '',
      optionC: cells[9] || '',
      optionD: cells[10] || '',
      correctAnswer: (cells[11] || '').toUpperCase().trim(),
      explanation: cells[12] || ''
    });
  }

  return rows;
}

async function run() {
  console.log('Ingesting Excel / Google Sheet question bank tabs...');
  const allRows = [];

  // Fetch 19 module sheets
  for (let m = 1; m <= 19; m++) {
    const tabName = `PD-M${String(m).padStart(2, '0')}`;
    const rows = await fetchSheetRows(tabName);
    allRows.push(...rows);
  }

  // Fetch default sheet
  const defaultRows = await fetchSheetRows();
  allRows.push(...defaultRows);

  console.log(`Total raw records ingested across all tabs: ${allRows.length}`);

  // Deduplicate and Validate
  const seenIds = new Set();
  const seenTexts = new Set();
  const validRows = [];

  for (const r of allRows) {
    const qId = String(r.questionId || '').trim();
    const qText = String(r.question || '').trim();
    const optA = String(r.optionA || '').trim();
    const optB = String(r.optionB || '').trim();
    const optC = String(r.optionC || '').trim();
    const optD = String(r.optionD || '').trim();
    const correctAns = String(r.correctAnswer || '').toUpperCase().trim();

    if (!qText || !optA || !optB || !optC || !optD || !['A', 'B', 'C', 'D'].includes(correctAns)) {
      continue;
    }

    const normText = qText.toLowerCase().replace(/\s+/g, ' ');
    if ((qId && seenIds.has(qId)) || seenTexts.has(normText)) {
      continue;
    }

    if (qId) seenIds.add(qId);
    seenTexts.add(normText);
    validRows.push(r);
  }

  console.log(`Total unique valid question records: ${validRows.length}`);

  // Categorize by subject for ADVANCED questions
  const subjectsMap = {
    'CMOS / MOSFET': 0,
    'Digital': 0,
    'Linux': 0,
    'TCL': 0,
    'DFT': 0,
    'Logical Synthesis': 0,
    'STA': 0,
    'Floorplan': 0,
    'Placement': 0,
    'CTS': 0,
    'Route': 0,
    'OptRoute': 0,
    'Signoff': 0,
    'OptCTS': 0,
    'Other / General': 0
  };

  let totalAdvanced = 0;
  let totalHard = 0;
  let totalEasyMedium = 0;

  for (const q of validRows) {
    const diff = String(q.difficulty || '').toUpperCase().trim();
    const isAdvanced = diff.includes('ADVANCED');
    const isHard = diff.includes('HARD') && !diff.includes('ADVANCED');

    if (isAdvanced) {
      totalAdvanced++;
      const subject = classifySubject(q);
      subjectsMap[subject] = (subjectsMap[subject] || 0) + 1;
    } else if (isHard) {
      totalHard++;
    } else {
      totalEasyMedium++;
    }
  }

  console.log('\n=============================================================');
  console.log('      EXACT SUBJECT-WISE COUNT OF ADVANCED QUESTIONS');
  console.log('=============================================================');
  console.table(subjectsMap);

  console.log('\n-------------------------------------------------------------');
  console.log(`1. Total ADVANCED questions across all subjects : ${totalAdvanced}`);
  console.log(`2. Total HARD questions separately              : ${totalHard}`);
  console.log(`3. Total HARD + ADVANCED questions              : ${totalAdvanced + totalHard}`);
  console.log(`4. Total EASY / MEDIUM questions (excluded)     : ${totalEasyMedium}`);
  console.log(`5. Total Unique Valid Questions in Bank         : ${validRows.length}`);
  console.log('-------------------------------------------------------------\n');
}

function classifySubject(q) {
  const mod = String(q.moduleId || '').toUpperCase();
  const top = String(q.topic || '').toUpperCase();
  const sub = String(q.subTopic || '').toUpperCase();
  const txt = String(q.question || '').toUpperCase();

  if (mod.includes('M01') || top.includes('CMOS') || top.includes('MOSFET') || txt.includes('MOSFET') || txt.includes('CMOS')) return 'CMOS / MOSFET';
  if (mod.includes('M02') || mod.includes('M03') || top.includes('DIGITAL') || txt.includes('FLIP-FLOP') || txt.includes('LATCH')) return 'Digital';
  if (mod.includes('M04') || top.includes('LINUX') || txt.includes('BASH') || txt.includes('GREP')) return 'Linux';
  if (mod.includes('M07') || top.includes('TCL') || txt.includes('TCL') || txt.includes('PROC')) return 'TCL';
  if (top.includes('DFT') || txt.includes('DFT') || txt.includes('SCAN CHAIN')) return 'DFT';
  if (mod.includes('M06') || mod.includes('M08') || top.includes('SYNTHESIS')) return 'Logical Synthesis';
  if (mod.includes('M09') || mod.includes('M10') || mod.includes('M11') || top.includes('STA') || top.includes('TIMING')) return 'STA';
  if (mod.includes('M13') || top.includes('FLOORPLAN')) return 'Floorplan';
  if (mod.includes('M14') || top.includes('PLACEMENT')) return 'Placement';
  if (mod.includes('M16') || top.includes('OPTCTS')) return 'OptCTS';
  if (mod.includes('M15') || top.includes('CTS')) return 'CTS';
  if (mod.includes('M18') || top.includes('OPTROUTE')) return 'OptRoute';
  if (mod.includes('M17') || top.includes('ROUTE')) return 'Route';
  if (mod.includes('M19') || top.includes('SIGNOFF') || top.includes('DRC') || top.includes('LVS')) return 'Signoff';

  return 'Other / General';
}

run();
