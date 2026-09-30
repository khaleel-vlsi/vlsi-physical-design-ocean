import { supabase } from './supabase.js';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1CDqC3mfqraxK28wAO_zF8wC-V3bBLUKwivNvV0wcSO4/gviz/tq?tqx=out:csv';

/**
 * Parses CSV text taking quotes into account
 */
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

/**
 * Fetch and parse all questions from live Google Sheet CSV
/**
 * Fetch and parse all questions from live Google Sheet CSV.
 * Optionally takes a sheetName if questions are organized in separate tabs/sheets in the Excel workbook.
 */
export async function fetchGoogleSheetQuestions(sheetName = null) {
  try {
    let url = GOOGLE_SHEET_CSV_URL;
    if (sheetName) {
      url += `&sheet=${encodeURIComponent(sheetName)}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch Google Sheet CSV: ${res.statusText}`);
    }
    const csvText = await res.text();
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);

    if (lines.length <= 1) return [];

    const questions = [];

    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVRow(lines[i]).map(cell => cell.replace(/^"|"$/g, '').trim());
      if (!row[0] || row[0].length === 0) continue;

      const q = {
        questionId: row[0] || `Q_${i}`,
        moduleId: row[1] || 'PD-M01',
        difficulty: (row[2] || 'Easy').trim(),
        type: row[3] || 'SCQ',
        topic: row[4] || 'General',
        subTopic: row[5] || '',
        question: row[6] || '',
        optionA: row[7] || '',
        optionB: row[8] || '',
        optionC: row[9] || '',
        optionD: row[10] || '',
        correctAnswer: (row[11] || 'A').toUpperCase().trim(),
        explanation: row[12] || 'No detailed explanation provided.',
        marks: parseFloat(row[13]) || 1,
        negative: parseFloat(row[14]) || (row[2]?.toLowerCase() === 'easy' ? 0 : -0.25)
      };

      if (q.question) {
        questions.push(q);
      }
    }

    return questions;
  } catch (error) {
    console.error("Error fetching Google Sheet questions:", error);
    return [];
  }
}

/**
 * Detect which module IDs are ACTUALLY present with questions in the Google Sheet.
 * Strictly verifies that returned rows match the target module ID (e.g. PD-M01, PD-M02...)
 * to prevent Google Sheets GViz default fallback to tab 1 from false-triggering unlocking.
 */
export async function fetchAvailableQuizModuleIds() {
  const activeIds = new Set();
  
  try {
    // 1. Check primary default sheet
    const mainQuestions = await fetchGoogleSheetQuestions();
    mainQuestions.forEach(q => {
      if (q.moduleId) {
        const cleanMod = String(q.moduleId).trim().toUpperCase();
        const match = cleanMod.match(/\d+/);
        if (match) {
          const modNum = parseInt(match[0], 10);
          activeIds.add(modNum);
        }
      }
    });

    // 2. Concurrently check individual module tabs (PD-M01 through PD-M19)
    const tabChecks = Array.from({ length: 19 }, async (_, i) => {
      const modId = i + 1;
      const padNum = String(modId).padStart(2, '0');
      const targetCode = `PD-M${padNum}`;
      const tabCandidates = MODULE_SHEET_TAB_NAMES[modId] || [`PD-M${padNum}`, `PD-M${modId}`, `Module ${modId}`, `Module${modId}`];
      
      for (const candidate of tabCandidates) {
        try {
          const res = await fetch(`${GOOGLE_SHEET_CSV_URL}&sheet=${encodeURIComponent(candidate)}`);
          if (res.ok) {
            const csvText = await res.text();
            const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
            
            if (lines.length > 1) {
              let hasMatchingRow = false;
              for (let r = 1; r < lines.length; r++) {
                const row = parseCSVRow(lines[r]);
                const rowModId = (row[1] || '').trim().toUpperCase();
                
                // STRICT CHECK: Only count if row's Module_ID matches the requested module
                if (rowModId === targetCode || rowModId === `PD-M${modId}` || rowModId.endsWith(`M${modId}`) || rowModId.endsWith(`${modId}`)) {
                  hasMatchingRow = true;
                  break;
                }
              }

              if (hasMatchingRow) {
                activeIds.add(modId);
                break;
              }
            }
          }
        } catch {
          // Ignore fetch error
        }
      }
    });

    await Promise.allSettled(tabChecks);
  } catch (err) {
    console.warn("Error verifying available modules:", err);
  }

  return activeIds.size > 0 ? activeIds : new Set([1]);
}

/**
 * Shuffle an array in-place (Fisher-Yates)
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MODULE_SHEET_TAB_NAMES = {
  1: ['PD-M01', 'Module 1', 'Introduction to Electronics', 'PD-M1', 'Module1'],
  2: ['PD-M02', 'Module 2', 'MOSFET & CMOS Theory', 'PD-M2', 'Module2'],
  3: ['PD-M03', 'Module 3', 'Digital Electronics', 'PD-M3', 'Module3'],
  4: ['PD-M04', 'Module 4', 'Linux & Basic Tcl Scripting', 'Linux & Basic Tcl Script', 'PD-M4', 'Module4'],
  5: ['PD-M05', 'Module 5', 'RTL Coding using Verilog', 'PD-M5', 'Module5'],
  6: ['PD-M06', 'Module 6', 'Logical Synthesis', 'PD-M6', 'Module6'],
  7: ['PD-M07', 'Module 7', 'Design For Testability (DFT)', 'Design For Testability', 'PD-M7', 'Module7'],
  8: ['PD-M08', 'Module 8', 'Physical Synthesis', 'PD-M8', 'Module8'],
  9: ['PD-M09', 'PD-M09-M11', 'STA', 'Static Timing Analysis', 'PD-STA', 'Module 9', 'PD-M9', 'Module9'],
  10: ['PD-M10', 'PD-M09-M11', 'STA', 'Static Timing Analysis', 'PD-STA', 'Module 10', 'Module10'],
  11: ['PD-M11', 'PD-M09-M11', 'STA', 'Static Timing Analysis', 'PD-STA', 'Module 11', 'Module11'],
  12: ['PD-M12', 'Module 12', 'PNR Inputs & Sanity Checks', 'Module12'],
  13: ['PD-M13', 'Module 13', 'FloorPlan & PowerPlan', 'Module13'],
  14: ['PD-M14', 'Module 14', 'Placement', 'Module14'],
  15: ['PD-M15', 'Module 15', 'Clock Tree Synthesis - 1', 'Module15'],
  16: ['PD-M16', 'CTS2', 'CTS 2', 'Clock Tree Synthesis - 2', 'Module 16', 'Module16'],
  17: ['PD-M17', 'Route', 'Routing', 'Module 17', 'Module17'],
  18: ['PD-M18', 'OptRoute', 'Opt Route', 'Opt_Route', 'PostRoute', 'Post Route', 'Module 18', 'Module18'],
  19: ['PD-M19', 'PV', 'Physical Verification & Signoff', 'Physical Verification', 'Signoff', 'Module 19', 'Module19']
};

/**
 * Generate a 30-question random paper for a specific module and difficulty
 */
export async function generateQuizPaper(moduleIdNum, difficulty = 'Easy') {
  const padNum = String(moduleIdNum).padStart(2, '0');
  const targetCode = `PD-M${padNum}`;
  
  const tabCandidates = MODULE_SHEET_TAB_NAMES[moduleIdNum] || [
    `PD-M${padNum}`, `PD-M${moduleIdNum}`, `Module ${moduleIdNum}`, `Module${moduleIdNum}`
  ];

  let validQuestionsForModule = [];

  // Try fetching each candidate tab name
  for (const candidate of tabCandidates) {
    const questions = await fetchGoogleSheetQuestions(candidate);
    
    // STRICT VALIDATION: Ensure the returned questions ACTUALLY belong to this module ID!
    // If Google Sheets default fallback returned Sheet 1 for a missing tab, filter out non-matching rows.
    const matching = questions.filter(q => {
      const cleanMod = String(q.moduleId || '').trim().toUpperCase();
      return cleanMod === targetCode.toUpperCase() || 
             cleanMod === `PD-M${moduleIdNum}` || 
             cleanMod.endsWith(`M${moduleIdNum}`) || 
             cleanMod.endsWith(`${moduleIdNum}`) ||
             cleanMod === candidate.toUpperCase();
    });

    if (matching.length > 0) {
      validQuestionsForModule = matching;
      break;
    }
  }

  // If specific tab candidate didn't return rows matching this module, check main default sheet
  if (validQuestionsForModule.length === 0) {
    const mainQuestions = await fetchGoogleSheetQuestions();
    validQuestionsForModule = mainQuestions.filter(q => {
      const cleanMod = String(q.moduleId || '').trim().toUpperCase();
      return cleanMod === targetCode.toUpperCase() || cleanMod === `PD-M${moduleIdNum}` || cleanMod.endsWith(`M${moduleIdNum}`) || cleanMod.endsWith(`${moduleIdNum}`);
    });
  }

  // Filter pool strictly by difficulty (Easy / Medium / Advanced)
  let pool = validQuestionsForModule.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());

  // Fallback 1: If difficulty sub-pool has fewer than 5 questions, sample from all valid questions within THIS SAME MODULE
  if (pool.length < 5) {
    pool = validQuestionsForModule;
  }

  // Fallback 2: If pool is empty (no questions for this module yet in Excel), return empty array
  if (pool.length === 0) {
    console.warn(`No questions found in Excel for Module ${moduleIdNum}`);
    return [];
  }

  // Shuffle pool (Fisher-Yates) and select up to 30 unique questions
  const shuffledPool = shuffleArray(pool);
  const selectedQuestions = shuffledPool.slice(0, Math.min(30, shuffledPool.length));

  // Format paper with randomized options order while keeping display keys cleanly ordered (A, B, C, D)
  const paper = selectedQuestions.map((q, idx) => {
    const origMap = {
      'A': q.optionA,
      'B': q.optionB,
      'C': q.optionC,
      'D': q.optionD
    };
    const targetCorrectLetter = (q.correctAnswer || 'A').toUpperCase().trim();
    const correctText = origMap[targetCorrectLetter] || q.optionA || '';

    const rawTexts = [q.optionA, q.optionB, q.optionC, q.optionD].filter(t => t && t.length > 0);
    const shuffledTexts = shuffleArray(rawTexts);

    const formattedOptions = shuffledTexts.map((text, i) => ({
      key: String.fromCharCode(65 + i), // 'A', 'B', 'C', 'D'
      text: text
    }));

    const correctOpt = formattedOptions.find(opt => opt.text === correctText) || formattedOptions[0];
    const newCorrectKey = correctOpt ? correctOpt.key : 'A';

    return {
      index: idx + 1,
      questionId: q.questionId,
      moduleId: q.moduleId,
      difficulty: q.difficulty,
      topic: q.topic,
      subTopic: q.subTopic,
      question: q.question,
      options: formattedOptions,
      correctKey: newCorrectKey,
      correctText: correctText,
      explanation: q.explanation,
      marks: 1,
      negative: q.difficulty.toLowerCase() === 'easy' ? 0 : -0.25
    };
  });

  return paper;
}

/**
 * Save quiz attempt permanently in LocalStorage and Supabase
 */
export async function saveQuizAttempt(attemptData) {
  const historyKey = 'ocean_quiz_history';
  const existing = JSON.parse(localStorage.getItem(historyKey) || '[]');
  existing.unshift(attemptData);
  localStorage.setItem(historyKey, JSON.stringify(existing));

  try {
    if (supabase) {
      await supabase.from('quiz_attempts').insert([{
        user_info: attemptData.studentInfo,
        module_id: attemptData.moduleId,
        difficulty: attemptData.difficulty,
        total_questions: attemptData.totalQuestions,
        correct_count: attemptData.correctCount,
        wrong_count: attemptData.wrongCount,
        skipped_count: attemptData.skippedCount,
        final_marks: attemptData.finalMarks,
        percentage: attemptData.percentage,
        is_pass: attemptData.isPass,
        time_taken_seconds: attemptData.timeTakenSeconds,
        paper_json: attemptData.paper,
        user_answers: attemptData.userAnswers,
        submitted_at: new Date().toISOString()
      }]);
    }
  } catch (err) {
    console.warn("Could not save attempt to Supabase, saved locally:", err);
  }
}

/**
 * Get all past attempts for student history dashboard
 */
export function getPastAttempts() {
  try {
    return JSON.parse(localStorage.getItem('ocean_quiz_history') || '[]');
  } catch {
    return [];
  }
}
