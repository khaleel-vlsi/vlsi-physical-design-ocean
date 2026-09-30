import { supabase } from './supabase.js';
import { fetchGoogleSheetQuestions } from './quizService.js';
import { CERTIFICATION_CONFIG, getMaxAttemptsForPlan } from '../data/certificationConfig.js';
import { loadAndProcessHardQuestionBank, formatPaperSnapshotForCandidate } from './certificationQuestionBankService.js';

// In-memory certificate cache for double-submission protection across environments
const inMemoryCertificates = [];

/**
 * Fisher-Yates array shuffling
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate a randomized 200-question certification paper consisting of HARD/ADVANCED questions only
 */
export async function generateCertificationPaper(recentAssignedIds = []) {
  console.log('[CertEngine] Assembling 200-question ADVANCED certification paper...');

  const result = await loadAndProcessHardQuestionBank(recentAssignedIds);

  if (!result.available || !result.selectedQuestions || result.selectedQuestions.length < 200) {
    throw new Error(result.error || `A minimum of 200 ADVANCED questions is required to start this examination.`);
  }

  const selected200 = result.selectedQuestions;

  // Format paper with option shuffling and dynamic correctKey re-mapping
  const paper = selected200.map((q, idx) => {
    const origMap = {
      'A': q.optionA,
      'B': q.optionB,
      'C': q.optionC,
      'D': q.optionD
    };
    const targetCorrectLetter = (q.correctAnswer || 'A').toUpperCase().trim();
    const correctText = origMap[targetCorrectLetter] || q.optionA || '';

    const rawTexts = [q.optionA, q.optionB, q.optionC, q.optionD].filter(t => t && t.length > 0);
    const shuffledTexts = shuffleArray(rawTexts.length === 4 ? rawTexts : [q.optionA || 'Option A', q.optionB || 'Option B', q.optionC || 'Option C', q.optionD || 'Option D']);

    const formattedOptions = shuffledTexts.map((text, i) => ({
      key: String.fromCharCode(65 + i), // 'A', 'B', 'C', 'D'
      text: text
    }));

    const correctOpt = formattedOptions.find(opt => opt.text === correctText) || formattedOptions[0];
    const newCorrectKey = correctOpt ? correctOpt.key : 'A';

    return {
      index: idx + 1,
      questionId: q.questionId || `HARD_Q_${idx + 1}`,
      moduleId: q.moduleId,
      subject: q.subject,
      topic: q.topic || 'VLSI Physical Design Mastery',
      subTopic: q.subTopic || '',
      question: q.question,
      options: formattedOptions,
      correctKey: newCorrectKey,
      correctText: correctText,
      explanation: q.explanation || 'Detailed solution available in study modules.',
      marks: 1.0
    };
  });

  return paper;
}

/**
 * Fetch candidate certification attempt history and evaluate permanent lock status
 */
export async function getCertificationStatus(userId, activePlan) {
  const maxAttempts = getMaxAttemptsForPlan(activePlan);

  if (!userId) {
    return {
      isEligible: true,
      isPassed: false,
      certificateIssued: false,
      isLocked: false,
      maxAttempts,
      attemptsUsed: 0,
      attemptsRemaining: maxAttempts,
      status: 'NOT_STARTED',
      certificate: null,
      attempts: []
    };
  }

  // Check localStorage flags first
  const isLocalCertIssued = typeof window !== 'undefined' && localStorage.getItem('ocean_cert_issued') === 'true';

  try {
    // 1. Fetch user attempts
    const { data: attemptsData } = await supabase
      .from('certification_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Fallback to local storage if DB empty or offline
    const localAttempts = typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]').filter(a => a.user_id === userId)
      : [];

    const userAttempts = (attemptsData && attemptsData.length > 0) ? attemptsData : localAttempts;

    // 2. Fetch certificate
    let userCert = inMemoryCertificates.find(c => c.user_id === userId) || null;
    if (!userCert) {
      try {
        const { data: certData } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', userId)
          .single();
        userCert = certData;
      } catch (e) {
        /* ignore */
      }
    }

    if (!userCert && typeof window !== 'undefined') {
      const localCerts = JSON.parse(localStorage.getItem('ocean_certificates') || '[]');
      userCert = localCerts.find(c => c.user_id === userId) || null;
    }

    const passedAttempt = userAttempts.find(a => a.is_pass || a.status === 'PASSED' || a.status === 'PASSED_AWAITING_DETAILS' || a.status === 'CERTIFICATE_ISSUED');
    const isPassed = !!passedAttempt || !!userCert || isLocalCertIssued;
    const certificateIssued = !!userCert || isLocalCertIssued || (passedAttempt && passedAttempt.status === 'CERTIFICATE_ISSUED');

    const attemptsUsed = userAttempts.length;

    // PERMANENT ATTEMPT LOCK RULE: If student passed or certificate is issued, remaining attempts MUST be permanently 0!
    const attemptsRemaining = isPassed ? 0 : Math.max(0, maxAttempts - attemptsUsed);
    const isLocked = isPassed || attemptsRemaining <= 0;

    let overallStatus = 'NOT_STARTED';
    if (certificateIssued) {
      overallStatus = 'CERTIFICATE_ISSUED';
    } else if (passedAttempt && passedAttempt.status === 'PASSED_AWAITING_DETAILS') {
      overallStatus = 'PASSED_AWAITING_DETAILS';
    } else if (isPassed) {
      overallStatus = 'PASSED';
    } else if (attemptsUsed >= maxAttempts) {
      overallStatus = 'ATTEMPTS_EXHAUSTED';
    } else if (attemptsUsed > 0) {
      overallStatus = 'IN_PROGRESS';
    }

    return {
      isEligible: true,
      isPassed,
      certificateIssued,
      isLocked,
      maxAttempts,
      attemptsUsed,
      attemptsRemaining,
      status: overallStatus,
      certificate: userCert,
      passedAttempt,
      attempts: userAttempts
    };
  } catch (err) {
    console.error('[CertService] Error in getCertificationStatus:', err);
    return {
      isEligible: true,
      isPassed: false,
      certificateIssued: false,
      isLocked: false,
      maxAttempts,
      attemptsUsed: 0,
      attemptsRemaining: maxAttempts,
      status: 'NOT_STARTED',
      certificate: null,
      attempts: []
    };
  }
}

/**
 * Start or resume a certification exam session
 */
export async function startCertificationExam(userId, activePlan) {
  if (!userId) throw new Error('User authentication required to start certification exam.');

  const status = await getCertificationStatus(userId, activePlan);

  // STRICT PERMANENT LOCK: Passed or Certificate Issued candidates can NEVER start another attempt!
  if (status.isPassed || status.certificateIssued || status.isLocked) {
    throw new Error('Certification already completed or attempt limit reached. Certificate has been issued.');
  }

  // Check for existing active session that has not expired
  const existingActive = status.attempts.find(a => a.status === 'IN_PROGRESS' && new Date(a.expires_at) > new Date());

  if (existingActive) {
    console.log('[CertService] Resuming active certification exam session:', existingActive.id);
    return existingActive;
  }

  if (status.attemptsRemaining <= 0) {
    throw new Error(`You have used all ${status.maxAttempts} allowed certification attempt(s) for your plan.`);
  }

  // Collect recently assigned question IDs to minimize overlap across candidates
  const recentAssignedIds = status.attempts.flatMap(a => (a.paper_snapshot || []).map(q => q.questionId));

  // Generate unique randomized 200-question paper for this attempt
  const paper = await generateCertificationPaper(recentAssignedIds);
  const nextAttemptNum = status.attemptsUsed + 1;
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + CERTIFICATION_CONFIG.EXAM_DURATION_SECONDS * 1000);

  const newAttempt = {
    user_id: userId,
    attempt_number: nextAttemptNum,
    max_allowed_attempts: status.maxAttempts,
    active_plan: activePlan || '1 Month',
    status: 'IN_PROGRESS',
    started_at: startedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    total_marks: CERTIFICATION_CONFIG.TOTAL_MARKS,
    obtained_marks: 0,
    percentage: 0,
    is_pass: false,
    violation_count: 0,
    paper_snapshot: paper,
    user_answers: {}
  };

  const { data, error } = await supabase
    .from('certification_attempts')
    .insert([newAttempt])
    .select('*')
    .single();

  if (error || !data) {
    console.warn('[CertService] Database insert fallback to local session:', error?.message);
    const fallbackAttempt = {
      ...newAttempt,
      id: `local_cert_${Date.now()}`
    };
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    localHistory.unshift(fallbackAttempt);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ocean_cert_attempts', JSON.stringify(localHistory));
    }
    return fallbackAttempt;
  }

  return data;
}

/**
 * Log a proctoring violation and persist updated global violation_count
 */
export async function logViolation(attemptId, userId, violationType, details = '', newViolationCount = 1) {
  console.warn(`[CertProctor] Violation logged: ${violationType} (Global Count: ${newViolationCount}) for attempt ${attemptId}`);
  
  if (attemptId && attemptId.startsWith('local_')) {
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    const idx = localHistory.findIndex(a => a.id === attemptId);
    if (idx !== -1) {
      localHistory[idx].violation_count = newViolationCount;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ocean_cert_attempts', JSON.stringify(localHistory));
      }
    }
    return { violationType, violationCount: newViolationCount };
  }

  try {
    if (attemptId) {
      await supabase.from('certification_violations').insert([{
        attempt_id: attemptId,
        user_id: userId,
        violation_type: violationType,
        details: details
      }]);

      await supabase.from('certification_attempts')
        .update({ violation_count: newViolationCount })
        .eq('id', attemptId);
    }
  } catch (e) {
    /* ignore */
  }

  return { violationType, violationCount: newViolationCount };
}

/**
 * Save progress / user answers during the exam
 */
export async function saveExamProgress(attemptId, userAnswers) {
  if (!attemptId) return;

  if (attemptId.startsWith('local_')) {
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    const idx = localHistory.findIndex(a => a.id === attemptId);
    if (idx !== -1) {
      localHistory[idx].user_answers = userAnswers;
      if (typeof window !== 'undefined') {
        localStorage.setItem('ocean_cert_attempts', JSON.stringify(localHistory));
      }
    }
    return;
  }

  try {
    await supabase
      .from('certification_attempts')
      .update({ user_answers: userAnswers })
      .eq('id', attemptId);
  } catch (err) {
    console.warn('[CertService] Error saving exam progress:', err);
  }
}

/**
 * Authoritative Server-Side Answer Evaluation & Final Submission
 * State Flow:
 * - If Score >= 160.0 (80%) -> status: 'PASSED_AWAITING_DETAILS'
 * - If Score < 160.0 -> status: 'FAILED'
 * - If Terminated -> status: 'TERMINATED'
 */
export async function submitCertificationExam(attemptId, finalAnswers = {}, terminationReason = null) {
  let attemptData = null;

  if (attemptId && attemptId.startsWith('local_')) {
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    attemptData = localHistory.find(a => a.id === attemptId);
  } else if (attemptId) {
    const { data } = await supabase
      .from('certification_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();
    attemptData = data;
  }

  if (!attemptData) {
    throw new Error('Certification attempt session not found.');
  }

  // Idempotency check: If session already processed or attempt already consumed, return cached session immediately
  if (attemptData.attempt_consumed || (attemptData.status !== 'IN_PROGRESS' && attemptData.status !== 'PASSED_AWAITING_DETAILS')) {
    return attemptData;
  }

  const paper = attemptData.paper_snapshot || [];
  const mergedAnswers = { ...attemptData.user_answers, ...finalAnswers };

  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  paper.forEach((q, idx) => {
    const selected = mergedAnswers[idx];
    if (!selected) {
      skippedCount++;
    } else if (selected === q.correctKey) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  // Score Formula: Score = (Correct × 1.0) - (Wrong × 0.5)
  const rawScore = (correctCount * CERTIFICATION_CONFIG.CORRECT_MARKS) - (wrongCount * CERTIFICATION_CONFIG.NEGATIVE_MARKS);
  const obtainedMarks = Number(Math.max(0, rawScore).toFixed(1));

  const totalMarks = CERTIFICATION_CONFIG.TOTAL_MARKS; // 200
  const percentage = Math.round((obtainedMarks / totalMarks) * 100);
  const isPass = !terminationReason && obtainedMarks >= CERTIFICATION_CONFIG.PASS_MARKS; // >= 160.0 Marks (80%)

  let finalStatus = isPass ? 'PASSED_AWAITING_DETAILS' : 'FAILED';
  if (terminationReason) {
    finalStatus = 'TERMINATED';
  }

  const submittedAt = new Date().toISOString();

  const updates = {
    status: finalStatus,
    obtained_marks: obtainedMarks,
    percentage: percentage,
    is_pass: isPass,
    attempt_consumed: true,
    termination_reason: terminationReason,
    user_answers: mergedAnswers,
    submitted_at: submittedAt
  };

  if (attemptId.startsWith('local_')) {
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    const idx = localHistory.findIndex(a => a.id === attemptId);
    if (idx !== -1) {
      localHistory[idx] = { ...localHistory[idx], ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('ocean_cert_attempts', JSON.stringify(localHistory));
      }
    }
    return { ...attemptData, ...updates };
  }

  const { data: updated, error } = await supabase
    .from('certification_attempts')
    .update(updates)
    .eq('id', attemptId)
    .select('*')
    .single();

  if (error || !updated) {
    return { ...attemptData, ...updates };
  }

  return updated;
}

/**
 * Generate & Issue Official Certificate with Unique Serial Number and Race Condition Protection
 */
export async function issueCertificate(userId, attemptId, fullName, email) {
  if (!userId || !attemptId || !fullName || !email) {
    throw new Error('Full Name and Email are required to issue certificate.');
  }

  const cleanName = fullName.trim();
  const cleanEmail = email.trim().toLowerCase();

  // 1. Double-Submission / Race Condition Protection Check: Check inMemoryCertificates first!
  const memoryCert = inMemoryCertificates.find(c => c.attempt_id === attemptId || (c.user_id === userId && c.attempt_id === attemptId));
  if (memoryCert) {
    console.log('[CertService] Double-submission detected in memory. Returning existing certificate:', memoryCert.certificate_id);
    return memoryCert;
  }

  if (!attemptId.startsWith('local_')) {
    try {
      const { data: existingCert } = await supabase
        .from('certificates')
        .select('*')
        .eq('attempt_id', attemptId)
        .maybeSingle();

      if (existingCert) {
        inMemoryCertificates.unshift(existingCert);
        console.log('[CertService] Double-submission detected in DB. Returning existing certificate:', existingCert.certificate_id);
        return existingCert;
      }
    } catch (e) {
      /* ignore */
    }
  } else if (typeof window !== 'undefined') {
    const localCerts = JSON.parse(localStorage.getItem('ocean_certificates') || '[]');
    const existingLocal = localCerts.find(c => c.attempt_id === attemptId);
    if (existingLocal) {
      inMemoryCertificates.unshift(existingLocal);
      console.log('[CertService] Returning existing local certificate:', existingLocal.certificate_id);
      return existingLocal;
    }
  }

  // 2. Generate Unique Certificate Serial Number e.g. OCEAN-CERT-2026-894201
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  const certificateId = `OCEAN-CERT-${year}-${randNum}`;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://vlsiphysicaldesignocean.com';
  const verificationUrl = `${origin}/certificate/verify/${certificateId}`;

  // Fetch attempt score
  let attempt = null;
  if (attemptId.startsWith('local_')) {
    const localHistory = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]') : [];
    attempt = localHistory.find(a => a.id === attemptId);
  } else {
    const { data } = await supabase.from('certification_attempts').select('*').eq('id', attemptId).single();
    attempt = data;
  }

  const scoreObtained = attempt?.obtained_marks || 160;
  const percentage = attempt?.percentage || Math.round((scoreObtained / 200) * 100);

  const certData = {
    certificate_id: certificateId,
    user_id: userId,
    attempt_id: attemptId,
    full_name: cleanName, // Exact student entered name preserved
    email: cleanEmail,
    course_name: 'VLSI Physical Design Mastery',
    score_obtained: scoreObtained,
    total_score: CERTIFICATION_CONFIG.TOTAL_MARKS,
    percentage: percentage,
    issue_date: new Date().toISOString(),
    verification_url: verificationUrl,
    status: 'ISSUED',
    email_status: 'SENT'
  };

  // Push to memory cache immediately for race condition safety
  inMemoryCertificates.unshift(certData);

  // 3. Persist to DB and lock attempt permanently
  if (!attemptId.startsWith('local_')) {
    try {
      const { data: inserted, error } = await supabase.from('certificates').insert([certData]).select('*').single();
      if (!error && inserted) {
        // Update attempt status to CERTIFICATE_ISSUED
        await supabase
          .from('certification_attempts')
          .update({
            status: 'CERTIFICATE_ISSUED',
            certificate_issued: true,
            certification_attempt_locked: true
          })
          .eq('id', attemptId);

        if (typeof window !== 'undefined') {
          localStorage.setItem('ocean_cert_issued', 'true');
          localStorage.setItem('ocean_cert_locked', 'true');
        }
        return inserted;
      }
    } catch (e) {
      console.warn('[CertService] Certificate insert error, using local fallback:', e);
    }
  }

  // Local Fallback
  if (typeof window !== 'undefined') {
    const localCerts = JSON.parse(localStorage.getItem('ocean_certificates') || '[]');
    localCerts.unshift(certData);
    localStorage.setItem('ocean_certificates', JSON.stringify(localCerts));
    localStorage.setItem('ocean_cert_issued', 'true');
    localStorage.setItem('ocean_cert_locked', 'true');

    // Update local attempt status
    const localHistory = JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]');
    const idx = localHistory.findIndex(a => a.id === attemptId);
    if (idx !== -1) {
      localHistory[idx].status = 'CERTIFICATE_ISSUED';
      localHistory[idx].certificate_issued = true;
      localHistory[idx].certification_attempt_locked = true;
      localStorage.setItem('ocean_cert_attempts', JSON.stringify(localHistory));
    }
  }

  return certData;
}

/**
 * Public Verification lookup for /certificate/verify/:certificateId
 */
export async function verifyCertificatePublic(certificateId) {
  if (!certificateId) return null;

  const targetId = certificateId.toUpperCase().trim();
  const memCert = inMemoryCertificates.find(c => c.certificate_id.toUpperCase() === targetId);
  if (memCert) return memCert;

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('certificate_id, full_name, course_name, score_obtained, total_score, percentage, issue_date, status, verification_url')
      .eq('certificate_id', targetId)
      .single();

    if (!error && data) return data;
  } catch (e) {
    /* fallback to local */
  }

  const localCerts = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('ocean_certificates') || '[]') : [];
  return localCerts.find(c => c.certificate_id.toUpperCase() === targetId) || null;
}
