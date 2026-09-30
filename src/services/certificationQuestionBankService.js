import { fetchGoogleSheetQuestions } from './quizService.js';

/**
 * Cryptographically Strong Array Randomization Shuffle (Fisher-Yates)
 */
function secureShuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    let j;
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomBuf = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuf);
      j = randomBuf[0] % (i + 1);
    } else {
      j = Math.floor(Math.random() * (i + 1));
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Fine-grained subject classifier for Excel question records
 */
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

  // 8. Routing
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

/**
 * Calculates proportional integer allocations summing to exact target
 */
function allocateProportional(subjectCounts, targetTotal) {
  const keys = Object.keys(subjectCounts);
  const totalAvail = keys.reduce((sum, k) => sum + (subjectCounts[k] || 0), 0);
  if (totalAvail === 0) return keys.reduce((acc, k) => ({ ...acc, [k]: 0 }), {});

  const allocations = {};
  let allocatedSum = 0;
  const remainders = [];

  for (const key of keys) {
    const avail = subjectCounts[key] || 0;
    const exact = (avail / totalAvail) * targetTotal;
    const floorVal = Math.floor(exact);
    allocations[key] = Math.min(avail, floorVal);
    allocatedSum += allocations[key];
    remainders.push({ key, rem: exact - floorVal, avail });
  }

  remainders.sort((a, b) => b.rem - a.rem);
  let idx = 0;
  while (allocatedSum < targetTotal && idx < remainders.length) {
    const item = remainders[idx];
    if (allocations[item.key] < item.avail) {
      allocations[item.key]++;
      allocatedSum++;
    }
    idx++;
  }

  return allocations;
}

/**
 * Unique Per-Candidate Question Selection Engine
 * Features:
 * 1. Cryptographically randomized per attempt.
 * 2. Enforces exact category weightage (20% STA, 50% PNR, 15% Synthesis, 15% Basic).
 * 3. Minimizes question overlap across candidates by preferring unassigned question IDs.
 * 4. Freezes paper into paper_snapshot.
 */
export async function loadAndProcessHardQuestionBank(recentAssignedIds = []) {
  console.log('[CertQuestionBank] Generating UNIQUE randomized question paper per candidate attempt...');

  const rawRecords = [];
  const fetchPromises = Array.from({ length: 19 }, async (_, idx) => {
    const modId = idx + 1;
    const tabName = `PD-M${String(modId).padStart(2, '0')}`;
    try {
      const tabQuestions = await fetchGoogleSheetQuestions(tabName);
      if (Array.isArray(tabQuestions) && tabQuestions.length > 0) {
        rawRecords.push(...tabQuestions);
      }
    } catch (e) {
      /* ignore tab fetch error */
    }
  });

  await Promise.allSettled(fetchPromises);

  try {
    const defaultSheetQuestions = await fetchGoogleSheetQuestions();
    if (Array.isArray(defaultSheetQuestions) && defaultSheetQuestions.length > 0) {
      rawRecords.push(...defaultSheetQuestions);
    }
  } catch (e) {
    /* ignore default sheet error */
  }

  const seenIds = new Set();
  const seenTexts = new Set();
  const validAdvancedQuestions = [];

  let invalidCount = 0;
  let duplicateCount = 0;
  let excludedEasyMediumCount = 0;

  for (const q of rawRecords) {
    const qId = String(q.questionId || '').trim();
    const qText = String(q.question || '').trim();
    const optA = String(q.optionA || '').trim();
    const optB = String(q.optionB || '').trim();
    const optC = String(q.optionC || '').trim();
    const optD = String(q.optionD || '').trim();
    const correctAns = String(q.correctAnswer || '').toUpperCase().trim();
    const difficulty = String(q.difficulty || '').toUpperCase().trim();

    if (!qText || !optA || !optB || !optC || !optD || !['A', 'B', 'C', 'D'].includes(correctAns)) {
      invalidCount++;
      continue;
    }

    if (!difficulty.includes('ADVANCED')) {
      excludedEasyMediumCount++;
      continue;
    }

    const normText = qText.toLowerCase().replace(/\s+/g, ' ');
    if ((qId && seenIds.has(qId)) || seenTexts.has(normText)) {
      duplicateCount++;
      continue;
    }

    if (qId) seenIds.add(qId);
    seenTexts.add(normText);

    const subject = classifySubjectFineGrained(q);

    validAdvancedQuestions.push({
      questionId: qId || `ADV_Q_${validAdvancedQuestions.length + 1}`,
      moduleId: q.moduleId || 'PD-M01',
      difficulty: 'ADVANCED',
      subject,
      topic: q.topic || 'VLSI Physical Design',
      subTopic: q.subTopic || '',
      question: qText,
      optionA: optA,
      optionB: optB,
      optionC: optC,
      optionD: optD,
      correctAnswer: correctAns,
      explanation: q.explanation || ''
    });
  }

  const poolBySubject = {};
  for (const q of validAdvancedQuestions) {
    if (!poolBySubject[q.subject]) poolBySubject[q.subject] = [];
    poolBySubject[q.subject].push(q);
  }

  const availCounts = {};
  const allSubjectNames = [
    'STA',
    'PNR Inputs', 'Placement', 'CTS', 'Routing', 'Signoff',
    'Synthesis', 'Physical Synthesis',
    'Basic Electronics', 'CMOS & MOSFET', 'Digital', 'Linux', 'RTL', 'TCL', 'DFT'
  ];

  for (const sub of allSubjectNames) {
    availCounts[sub] = (poolBySubject[sub] || []).length;
  }

  const staAvail = availCounts['STA'];

  const pnrSubKeys = ['PNR Inputs', 'Placement', 'CTS', 'Routing', 'Signoff'];
  const pnrAvailCounts = pnrSubKeys.reduce((acc, k) => ({ ...acc, [k]: availCounts[k] }), {});
  const pnrTotalAvail = pnrSubKeys.reduce((sum, k) => sum + availCounts[k], 0);

  const synthSubKeys = ['Synthesis', 'Physical Synthesis'];
  const synthAvailCounts = synthSubKeys.reduce((acc, k) => ({ ...acc, [k]: availCounts[k] }), {});
  const synthTotalAvail = synthSubKeys.reduce((sum, k) => sum + availCounts[k], 0);

  const basicSubKeys = ['Basic Electronics', 'CMOS & MOSFET', 'Digital', 'Linux', 'RTL', 'TCL', 'DFT'];
  const basicAvailCounts = basicSubKeys.reduce((acc, k) => ({ ...acc, [k]: availCounts[k] }), {});
  const basicTotalAvail = basicSubKeys.reduce((sum, k) => sum + availCounts[k], 0);

  if (staAvail < 40 || pnrTotalAvail < 100 || synthTotalAvail < 30 || basicTotalAvail < 30) {
    const errorMsg = `Certification exam unavailable because required Advanced question distribution cannot be satisfied. Shortage: STA (${staAvail}/40), PNR (${pnrTotalAvail}/100), Synthesis (${synthTotalAvail}/30), Basic (${basicTotalAvail}/30).`;
    return { available: false, error: errorMsg };
  }

  const pnrAlloc = allocateProportional(pnrAvailCounts, 100);
  const synthAlloc = allocateProportional(synthAvailCounts, 30);
  const basicAlloc = allocateProportional(basicAvailCounts, 30);

  const finalTargetAlloc = {
    'STA': 40,
    ...pnrAlloc,
    ...synthAlloc,
    ...basicAlloc
  };

  const recentSet = new Set(recentAssignedIds || []);
  const selectedQuestions = [];
  const selectedCounts = {};

  // Pick questions per subject while minimizing overlap with recent papers!
  for (const sub of allSubjectNames) {
    const target = finalTargetAlloc[sub] || 0;
    const pool = poolBySubject[sub] || [];

    // Separate pool into unassigned-recently vs assigned-recently
    const unassignedPool = pool.filter(q => !recentSet.has(q.questionId));
    const assignedPool = pool.filter(q => recentSet.has(q.questionId));

    const shuffledUnassigned = secureShuffleArray(unassignedPool);
    const shuffledAssigned = secureShuffleArray(assignedPool);

    const picked = [];
    if (shuffledUnassigned.length >= target) {
      picked.push(...shuffledUnassigned.slice(0, target));
    } else {
      picked.push(...shuffledUnassigned);
      const needed = target - picked.length;
      picked.push(...shuffledAssigned.slice(0, needed));
    }

    selectedQuestions.push(...picked);
    selectedCounts[sub] = picked.length;
  }

  const finalPaper200 = secureShuffleArray(selectedQuestions);

  const isExact200 = finalPaper200.length === 200;
  const isAllAdv = finalPaper200.every(q => q.difficulty === 'ADVANCED');
  const staCount = finalPaper200.filter(q => q.subject === 'STA').length;
  const pnrCount = finalPaper200.filter(q => pnrSubKeys.includes(q.subject)).length;
  const synthCount = finalPaper200.filter(q => synthSubKeys.includes(q.subject)).length;
  const basicCount = finalPaper200.filter(q => basicSubKeys.includes(q.subject)).length;

  if (!isExact200 || !isAllAdv || staCount !== 40 || pnrCount !== 100 || synthCount !== 30 || basicCount !== 30) {
    throw new Error(`[CertQuestionBank] Pre-exam validation assertion failed: 200=${isExact200}, Adv=${isAllAdv}, STA=${staCount}/40, PNR=${pnrCount}/100, Synth=${synthCount}/30, Basic=${basicCount}/30`);
  }

  const diagnosticsReport = {
    totalExcelRecords: rawRecords.length,
    validAdvancedPool: validAdvancedQuestions.length,
    invalidCount,
    duplicateCount,
    excludedEasyMediumCount,
    subjects: allSubjectNames.map(sub => ({
      name: sub,
      available: availCounts[sub] || 0,
      required: finalTargetAlloc[sub] || 0,
      selected: selectedCounts[sub] || 0
    })),
    totals: {
      sta: { available: staAvail, required: 40, selected: staCount },
      pnr: { available: pnrTotalAvail, required: 100, selected: pnrCount },
      synth: { available: synthTotalAvail, required: 30, selected: synthCount },
      basic: { available: basicTotalAvail, required: 30, selected: basicCount },
      final: { available: validAdvancedQuestions.length, required: 200, selected: finalPaper200.length }
    }
  };

  return {
    available: true,
    selectedQuestions: finalPaper200,
    diagnostics: diagnosticsReport
  };
}

export function formatPaperSnapshotForCandidate(selected200Questions) {
  if (!Array.isArray(selected200Questions)) return [];

  return selected200Questions.map((q, idx) => {
    const optionsObj = {
      'A': q.optionA,
      'B': q.optionB,
      'C': q.optionC,
      'D': q.optionD
    };

    return {
      index: idx,
      questionId: q.questionId,
      moduleId: q.moduleId,
      subject: q.subject,
      question: q.question,
      options: optionsObj,
      correctKey: q.correctAnswer
    };
  });
}
