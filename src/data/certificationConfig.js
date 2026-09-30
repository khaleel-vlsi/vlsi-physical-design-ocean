/**
 * VLSI Physical Design Ocean — Certification System Configuration
 */

export const CERTIFICATION_CONFIG = {
  TOTAL_MARKS: 200,
  PASS_MARKS: 160, // 80% passing threshold
  PASS_PERCENTAGE: 80,
  CORRECT_MARKS: 1.0, // +1 mark per correct answer
  NEGATIVE_MARKS: 0.5, // -0.5 negative mark per wrong answer
  EXAM_DURATION_MINUTES: 90,
  EXAM_DURATION_SECONDS: 90 * 60, // 5400 seconds
  MAX_VIOLATIONS: 5, // Global threshold: 5 warnings allowed, 6th violation auto-terminates exam

  // Exact 200-Question Blueprint Distribution
  BLUEPRINT: [
    // A) STA — 20% (40 Marks / 40 Questions)
    {
      sectionKey: 'STA',
      sectionTitle: 'Static Timing Analysis (STA)',
      weightageMarks: 40,
      subtopics: [
        { name: 'STA Fundamentals, Path Analysis & Advanced STA', moduleIds: [9, 10, 11], questionCount: 40 }
      ]
    },

    // B) PnR — 50% (100 Marks / 100 Questions)
    {
      sectionKey: 'PNR',
      sectionTitle: 'Place & Route (PnR)',
      weightageMarks: 100,
      subtopics: [
        { name: 'PnR Inputs & Sanity Checks', moduleIds: [12], questionCount: 20 },
        { name: 'Floorplanning & Placement', moduleIds: [13, 14], questionCount: 20 },
        { name: 'Clock Tree Synthesis (CTS 1 & 2)', moduleIds: [15, 16], questionCount: 20 },
        { name: 'Routing & Post-Route Optimization', moduleIds: [17, 18], questionCount: 20 },
        { name: 'Physical Verification & Signoff', moduleIds: [19], questionCount: 20 }
      ]
    },

    // C) SYNTHESIS & PHYSICAL SYNTHESIS — 15% (30 Marks / 30 Questions)
    {
      sectionKey: 'SYNTHESIS',
      sectionTitle: 'Logical & Physical Synthesis',
      weightageMarks: 30,
      subtopics: [
        { name: 'Logical & Physical Synthesis', moduleIds: [6, 8], questionCount: 30 }
      ]
    },

    // D) FOUNDATION & SUPPORTING SUBJECTS — 15% (30 Marks / 30 Questions)
    {
      sectionKey: 'FOUNDATION',
      sectionTitle: 'Foundation & Supporting Subjects',
      weightageMarks: 30,
      subtopics: [
        { name: 'Basic Electronics & CMOS/MOSFET Theory', moduleIds: [1, 2], questionCount: 10 },
        { name: 'Digital Electronics & RTL Verilog Coding', moduleIds: [3, 5], questionCount: 10 },
        { name: 'Linux, Tcl/Perl Scripting & DFT', moduleIds: [4, 7], questionCount: 10 }
      ]
    }
  ]
};

/**
 * Centralized Vision Proctoring Configuration
 */
export const PROCTORING_CONFIG = {
  analysisIntervalMs: 300, // Run vision loop every 300ms for zero lag
  faceMissingGraceMs: 3500, // 3.5s grace period before missing face warning
  multipleFaceDurationMs: 1500, // 1.5s threshold for multiple person warning
  cameraBlockedGraceMs: 2000, // 2.0s threshold for camera block / dark cover warning
  phoneDetectionDurationMs: 1500, // 1.5s threshold for mobile phone detection
  confidenceThreshold: 0.65, // Minimum confidence score (65%)
  maxWarnings: 5, // Global limit: 5 warnings allowed, 6th violation auto-terminates exam

  VIOLATION_TYPES: {
    FACE_NOT_DETECTED: 'FACE_NOT_DETECTED',
    MULTIPLE_FACE_DETECTED: 'MULTIPLE_FACE_DETECTED',
    PHONE_DETECTED: 'PHONE_DETECTED',
    CAMERA_OBSTRUCTED: 'CAMERA_OBSTRUCTED',
    CAMERA_DISCONNECTED: 'CAMERA_DISCONNECTED',
    FULLSCREEN_EXIT: 'FULLSCREEN_EXIT',
    TAB_SWITCH: 'TAB_SWITCH',
    MULTIPLE_TAB: 'MULTIPLE_TAB'
  }
};

/**
 * Determines maximum certification attempt allowance based on subscription plan
 */
export function getMaxAttemptsForPlan(activePlan) {
  if (!activePlan) return 1;
  const plan = String(activePlan).toLowerCase();

  if (plan.includes('12m') || plan.includes('365') || plan.includes('12 month') || plan.includes('diamond') || plan.includes('1999')) {
    return 7;
  }
  if (plan.includes('6m') || plan.includes('180') || plan.includes('6 month') || plan.includes('gold') || plan.includes('launch offer')) {
    return 5;
  }
  if (plan.includes('3m') || plan.includes('90') || plan.includes('3 month') || plan.includes('silver')) {
    return 3;
  }
  if (plan.includes('2m') || plan.includes('60') || plan.includes('2 month') || plan.includes('copper')) {
    return 2;
  }
  if (plan.includes('1m') || plan.includes('30') || plan.includes('1 month') || plan.includes('iron') || plan.includes('499')) {
    return 1;
  }

  return 1; // Default 1 attempt
}
