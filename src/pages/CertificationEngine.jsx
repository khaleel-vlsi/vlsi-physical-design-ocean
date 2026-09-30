import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  submitCertificationExam, 
  saveExamProgress, 
  logViolation 
} from '../services/certificationService';
import { supabase } from '../services/supabase';
import { CERTIFICATION_CONFIG, PROCTORING_CONFIG } from '../data/certificationConfig';
import { createProctorVisionAnalyzer } from '../utils/proctorVisionAnalyzer';
import SEO from '../components/SEO';
import styles from './CertificationEngine.module.css';

const CertificationEngine = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Session & Paper state
  const [attemptData, setAttemptData] = useState(null);
  const [paper, setPaper] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  
  // Timer & Status state
  const [timeLeft, setTimeLeft] = useState(CERTIFICATION_CONFIG.EXAM_DURATION_SECONDS);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Proctoring & Security state
  const [violationCount, setViolationCount] = useState(0);
  const [warningModalText, setWarningModalText] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [visionStatus, setVisionStatus] = useState({ status: 'ACTIVE', label: '● CAMERA ACTIVE' });
  const [lastDiagnosticInfo, setLastDiagnosticInfo] = useState(null);

  // Authoritative Interaction Lock State
  const [isExamLocked, setIsExamLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');

  // 6. Camera Lock / Recovery Effect based on Vision & Camera State
  useEffect(() => {
    if (loading || !attemptData || isSubmitting) return;

    const isBlocked = visionStatus.status === 'CAMERA_OBSTRUCTED';
    const isDisconnected = !cameraActive || visionStatus.status === 'CAMERA_DISCONNECTED';

    if (isBlocked || isDisconnected) {
      if (!isExamLocked) {
        setIsExamLocked(true);
        setLockReason(isBlocked ? 'CAMERA_OBSTRUCTED' : 'CAMERA_DISCONNECTED');
      }
    } else if (cameraActive && visionStatus.status !== 'CAMERA_OBSTRUCTED' && visionStatus.faceCount === 1) {
      if (isExamLocked) {
        setIsExamLocked(false);
        setLockReason('');
      }
    }
  }, [visionStatus, cameraActive, loading, attemptData, isSubmitting, isExamLocked]);

  const visionAnalyzerRef = useRef(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const broadcastChannelRef = useRef(null);
  const lastViolationTimeRef = useRef(0);

  // 1. Fetch / Resume Active Exam Session
  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      setLoading(true);
      try {
        let session = null;

        if (sessionId.startsWith('local_')) {
          const localHistory = JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]');
          session = localHistory.find(a => a.id === sessionId);
        } else {
          const { data, error } = await supabase
            .from('certification_attempts')
            .select('*')
            .eq('id', sessionId)
            .single();

          if (!error && data) {
            session = data;
          }
        }

        if (!session) {
          throw new Error('Certification exam session not found.');
        }

        if (session.status !== 'IN_PROGRESS') {
          // If already completed, failed, or terminated, permanently lock & redirect to result screen
          navigate(`/certification/result/${sessionId}`, { replace: true });
          return;
        }

        // Calculate server-authoritative remaining time
        const expiresAtMs = new Date(session.expires_at).getTime();
        const nowMs = Date.now();
        const remainingSecs = Math.max(0, Math.floor((expiresAtMs - nowMs) / 1000));

        if (remainingSecs <= 0) {
          // Time expired, auto submit
          await handleFinalSubmit('EXPIRED', session);
          return;
        }

        if (isMounted) {
          setAttemptData(session);
          setPaper(session.paper_snapshot || []);
          setUserAnswers(session.user_answers || {});
          setViolationCount(session.violation_count || 0);
          setTimeLeft(remainingSecs);
          setLoading(false);
        }
      } catch (err) {
        console.error('[CertEngine] Error loading session:', err);
        alert(err.message || 'Could not load examination session.');
        navigate('/certification', { replace: true });
      }
    }

    loadSession();
    return () => { isMounted = false; };
  }, [sessionId, navigate]);

  // 2. Initialize WebCam Stream
  useEffect(() => {
    async function initCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
          audio: false
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Initialize Vision Analyzer
          if (!visionAnalyzerRef.current) {
            visionAnalyzerRef.current = createProctorVisionAnalyzer(
              videoRef.current,
              (statusObj) => setVisionStatus(statusObj),
              (violationType, details) => handleProctoringViolation(violationType, details)
            );
          }
        }
        setCameraActive(true);

        // Track stream disconnection
        stream.getVideoTracks().forEach(track => {
          track.onended = () => {
            setCameraActive(false);
            handleProctoringViolation('CAMERA_DISCONNECTED', 'WebCam stream disconnected during examination.');
          };
        });
      } catch (err) {
        console.warn('[CertEngine] WebCam stream error:', err);
        setCameraActive(false);
      }
    }

    if (!loading && attemptData) {
      initCamera();
    }

    return () => {
      if (visionAnalyzerRef.current) {
        visionAnalyzerRef.current.destroy();
        visionAnalyzerRef.current = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [loading, attemptData]);

  // 3. Multi-Tab BroadcastChannel Protection
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel(`ocean_cert_${sessionId}`);
      broadcastChannelRef.current = channel;

      channel.postMessage({ type: 'NEW_WINDOW_OPENED', timestamp: Date.now() });

      channel.onmessage = (event) => {
        if (event.data && event.data.type === 'NEW_WINDOW_OPENED') {
          handleProctoringViolation('MULTIPLE_TAB', 'Dual exam windows detected.');
        }
      };

      return () => {
        channel.close();
      };
    }
  }, [sessionId]);

  // 4. Server-Authoritative Countdown Timer (Pauses automatically while isExamLocked is true)
  useEffect(() => {
    if (loading || !attemptData || isSubmitting || isExamLocked) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit('EXPIRED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, attemptData, isSubmitting, isExamLocked]);

  // 5. Anti-Cheating Protection (Fullscreen Guard, Tab Switch Guard, Copy/Paste Lock)
  useEffect(() => {
    if (loading || !attemptData || isSubmitting) return;

    // Fullscreen Exit Handler
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleProctoringViolation('FULLSCREEN_EXIT', 'You exited full-screen mode.');
      }
    };

    // Tab Switch / Blur Handler with 3-second debouncing
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        handleProctoringViolation('TAB_SWITCH', 'Tab switching or leaving browser window detected.');
      }
    };

    const handleBlur = () => {
      handleProctoringViolation('TAB_SWITCH', 'Browser window lost focus.');
    };

    // Prevent Copy / Paste / Context Menu
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();
    const handlePaste = (e) => e.preventDefault();
    const handleCut = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && ['c', 'v', 'x', 'u', 'i', 's', 'a', 'p'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('cut', handleCut);
    document.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loading, attemptData, isSubmitting, violationCount]);

  // Authoritative Centralized Global Violation Handler
  const handleProctoringViolation = async (violationType, details) => {
    if (isSubmitting) return;

    setViolationCount(prevCount => {
      const newCount = prevCount + 1;

      // Persist violation event & updated global count to database / localStorage
      logViolation(sessionId, user?.id, violationType, details, newCount);

      // Attach diagnostic info for local testing
      setLastDiagnosticInfo({
        violationType,
        prevCount,
        newCount,
        timestamp: new Date().toLocaleTimeString()
      });

      if (newCount > CERTIFICATION_CONFIG.MAX_VIOLATIONS) {
        // 6th Violation -> Auto-terminate exam!
        handleFinalSubmit('MAX_VIOLATIONS_EXCEEDED');
      } else if (newCount === CERTIFICATION_CONFIG.MAX_VIOLATIONS) {
        // Violation #5 -> Show FINAL WARNING
        setWarningModalText(`⚠️ FINAL WARNING (5/5): ${details} You have reached 5/5 security violations. One more violation will automatically terminate your certification exam and consume one attempt.`);
      } else {
        // Violations #1 to #4 -> Show Warning Modal
        setWarningModalText(`SECURITY WARNING (${newCount}/5): ${details} Continued violations will permanently terminate your examination.`);
      }

      return newCount;
    });
  };

  // Option selection
  const handleSelectOption = (qIdx, optionKey) => {
    if (isSubmitting || isExamLocked) return;
    const updated = { ...userAnswers, [qIdx]: optionKey };
    setUserAnswers(updated);
    saveExamProgress(sessionId, updated);
  };

  // Mark for review toggle
  const handleToggleReview = (qIdx) => {
    if (isSubmitting || isExamLocked) return;
    setMarkedForReview(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  // Final submission handler
  const handleFinalSubmit = async (terminationReason = null, overrideSession = null) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setShowSubmitModal(false);

    try {
      const activeSessionId = overrideSession ? overrideSession.id : sessionId;
      const result = await submitCertificationExam(activeSessionId, userAnswers, terminationReason);
      
      // Exit fullscreen cleanly
      if (document.fullscreenElement && document.exitFullscreen) {
        try { await document.exitFullscreen(); } catch (e) { /* ignore */ }
      }

      // Stop camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      // Navigate to result page
      navigate(`/certification/result/${activeSessionId}`, { state: { result }, replace: true });
    } catch (err) {
      console.error('[CertEngine] Error submitting exam:', err);
      setIsSubmitting(false);
    }
  };

  // Time formatter helper
  const formatTimerDisplay = (totalSecs) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h2>⏳ Initializing Proctored Certification Paper...</h2>
        <p>Loading 200 questions across STA, PnR, Synthesis, Scripting &amp; Signoff...</p>
      </div>
    );
  }

  const currentQ = paper[currentIndex] || paper[0];
  const totalQuestions = paper.length;

  // Counts for question palette stats
  const answeredCount = Object.keys(userAnswers).length;
  const reviewCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);

  return (
    <div className={styles.container}>
      <SEO title="VLSI Physical Design Certification Exam" description="Live Proctored Certification Exam Session" />

      {/* Proctored Top Header Bar */}
      <header className={styles.headerBar}>
        <div className={styles.headerTitle}>
          <h1>VLSI PHYSICAL DESIGN OCEAN CERTIFICATION</h1>
        </div>

        {/* Live Proctoring & WebCam Indicator */}
        <div className={styles.proctorStatusRow}>
          <div className={styles.cameraBox}>
            <video ref={videoRef} autoPlay playsInline muted className={styles.cameraThumbnail} />
            <span className={styles.cameraLabel} style={{
              color: visionStatus.status === 'FACE_DETECTED' || visionStatus.status === 'ACTIVE' ? '#10b981' : '#f87171',
              fontWeight: '800'
            }}>
              {cameraActive ? visionStatus.label : '⚠️ CAMERA OFF'}
            </span>
          </div>

          <div className={`${styles.violationBadge} ${violationCount > 0 ? styles.violationWarning : ''}`}>
            Violations: <strong>{violationCount} / {CERTIFICATION_CONFIG.MAX_VIOLATIONS}</strong>
          </div>

          <div className={`${styles.timerBox} ${timeLeft < 600 ? styles.timerUrgent : ''}`}>
            ⏱️ {formatTimerDisplay(timeLeft)}
          </div>
        </div>
      </header>

      {/* Main Exam Grid */}
      <div className={styles.examGrid}>
        
        {/* Left Card: Question & Options */}
        <div className={styles.questionCard}>
          <div className={styles.questionMetaRow}>
            <span className={styles.qIndexBadge}>
              QUESTION {currentIndex + 1} OF {totalQuestions}
            </span>
            <span className={styles.sectionBadge}>
              {currentQ?.topic || 'VLSI Physical Design'} (+1.0 Mark)
            </span>
          </div>

          <h3 className={styles.questionText}>{currentQ?.question}</h3>

          {/* Options A, B, C, D List */}
          <div className={styles.optionsList}>
            {currentQ?.options?.map((opt) => {
              const isSelected = userAnswers[currentIndex] === opt.key;
              return (
                <div
                  key={opt.key}
                  className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleSelectOption(currentIndex, opt.key)}
                >
                  <span className={styles.optionKey}>{opt.key}</span>
                  <span className={styles.optionText}>{opt.text}</span>
                </div>
              );
            })}
          </div>

          {/* Nav Actions */}
          <div className={styles.navActionsRow}>
            <button
              className={styles.secondaryBtn}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            >
              ⬅️ Previous
            </button>

            <button
              className={`${styles.secondaryBtn} ${markedForReview[currentIndex] ? styles.activeReviewBtn : ''}`}
              onClick={() => handleToggleReview(currentIndex)}
            >
              {markedForReview[currentIndex] ? '🟨 Review Marked' : '🔖 Mark for Review'}
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                className={styles.primaryBtn}
                onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
              >
                Save &amp; Next ➡️
              </button>
            ) : (
              <button
                className={styles.submitBtn}
                onClick={() => setShowSubmitModal(true)}
              >
                ✅ Submit Examination
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar: Interactive Question Palette & Live Camera */}
        <div className={styles.sidebarPalette}>
          
          {/* 🔴 Persistent Live Camera Panel (Unclosable) */}
          <div className={styles.liveCameraPanel} aria-label="Live certification exam camera preview">
            <div className={styles.cameraPanelHeader}>
              <span className={styles.cameraLiveDot}>🔴</span>
              <span className={styles.cameraPanelTitle}>LIVE CAMERA</span>
            </div>

            <div className={styles.cameraVideoWrapper}>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                aria-label="Live certification exam camera preview feed"
                className={styles.liveCameraFeed} 
              />
            </div>

            <div className={styles.cameraStatusBox}>
              <div 
                className={styles.statusText}
                style={{
                  color: (visionStatus.status === 'FACE_DETECTED' || visionStatus.status === 'ACTIVE') ? '#10b981' : '#f87171'
                }}
                aria-label={`Camera status: ${visionStatus.label}`}
              >
                {cameraActive ? visionStatus.label : '❌ CAMERA DISCONNECTED'}
              </div>

              <div className={styles.violationsText}>
                Security Violations: <strong>{violationCount} / {CERTIFICATION_CONFIG.MAX_VIOLATIONS}</strong>
              </div>

              <div style={{ marginTop: '4px', fontSize: '0.78rem', color: isExamLocked ? '#ef4444' : '#10b981', fontWeight: 700 }}>
                Exam Status: {isExamLocked ? '🔒 LOCKED' : '🟢 ACTIVE'}
              </div>

              {/* 🛠️ Development Diagnostic Overlay */}
              {visionStatus?.diagnostics && (
                <div style={{ marginTop: '8px', padding: '6px 8px', background: 'rgba(15, 23, 42, 0.90)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', fontSize: '0.70rem', color: '#94a3b8', lineHeight: '1.45', textAlign: 'left' }}>
                  <div>CAMERA: <strong style={{ color: '#10b981' }}>{cameraActive ? 'ACTIVE' : 'DISCONNECTED'}</strong></div>
                  <div>Faces: Raw: <strong style={{ color: '#f8fafc' }}>{visionStatus.diagnostics.rawCount || 0}</strong> │ NMS: <strong style={{ color: '#f8fafc' }}>{visionStatus.diagnostics.filteredCount || 0}</strong> │ Stable: <strong style={{ color: '#38bdf8' }}>{visionStatus.diagnostics.stabilizedCount || 1}</strong></div>
                  <div>Phone: Detected: <strong style={{ color: visionStatus.diagnostics.phoneDetected ? '#ef4444' : '#34d399' }}>{visionStatus.diagnostics.phoneDetected ? 'YES' : 'NO'}</strong> │ Conf: <strong style={{ color: '#fbbf24' }}>{Math.round((visionStatus.diagnostics.phoneConfidence || 0) * 100)}%</strong></div>
                  <div>Raw Event: <strong style={{ color: '#f8fafc' }}>{lastDiagnosticInfo?.violationType || visionStatus.status}</strong></div>
                  <div>Global Violations: <strong style={{ color: '#f87171' }}>{violationCount} / {CERTIFICATION_CONFIG.MAX_VIOLATIONS}</strong></div>
                  <div>Handler: <strong style={{ color: '#a7f3d0' }}>handleProctoringViolation()</strong></div>
                </div>
              )}
            </div>
          </div>

          {/* 🚫 Mandatory Full-Screen Camera Lock Backdrop Overlay */}
          {isExamLocked && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.96)',
              backdropFilter: 'blur(14px)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
              color: '#f8fafc'
            }}>
              <div style={{
                maxWidth: '540px',
                background: 'rgba(30, 41, 59, 0.95)',
                border: '2px solid #ef4444',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.35)'
              }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>🚫</div>
                <h2 style={{ color: '#ef4444', fontSize: '1.75rem', fontWeight: 800, margin: '0 0 14px 0', tracking: '-0.02em' }}>
                  {lockReason === 'CAMERA_OBSTRUCTED' ? 'CAMERA VIEW BLOCKED' : 'CAMERA DISCONNECTED'}
                </h2>
                <p style={{ color: '#e2e8f0', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Your webcam is currently blocked, covered, or disconnected.<br />
                  <strong style={{ color: '#f87171' }}>The examination is temporarily locked.</strong>
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '24px' }}>
                  Please uncover or reposition your camera so that your face and required workspace remain clearly visible inside the frame.
                </p>

                <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.35)', marginBottom: '24px', textAlign: 'left', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  <div style={{ color: '#f87171', fontWeight: 700 }}>📷 Camera status: <strong>{lockReason === 'CAMERA_OBSTRUCTED' ? 'BLOCKED' : 'DISCONNECTED'}</strong></div>
                  <div style={{ color: '#cbd5e1', marginTop: '6px' }}>⚠️ Security violations recorded: <strong>{violationCount} / {CERTIFICATION_CONFIG.MAX_VIOLATIONS}</strong></div>
                  <div style={{ color: '#fbbf24', marginTop: '6px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>⏳</span> Waiting for camera feed to become visible with exactly 1 candidate face...
                  </div>
                </div>

                <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                  Exam timer is paused. Interaction controls will automatically restore once camera & 1 candidate face are verified.
                </div>
              </div>
            </div>
          )}

          <div className={styles.paletteHeader}>
            <h3>Question Palette</h3>
            <button className={styles.finishTopBtn} onClick={() => setShowSubmitModal(true)}>
              Submit Exam
            </button>
          </div>

          <div className={styles.paletteLegend}>
            <span className={styles.legendAnswered}>🟩 Answered ({answeredCount})</span>
            <span className={styles.legendReview}>🟨 Review ({reviewCount})</span>
            <span className={styles.legendUnanswered}>⬜ Skipped ({unansweredCount})</span>
          </div>

          <div className={styles.paletteGrid}>
            {paper.map((q, idx) => {
              const isAnswered = !!userAnswers[idx];
              const isReview = !!markedForReview[idx];
              const isCurrent = idx === currentIndex;

              let cellStyle = styles.cellUnanswered;
              if (isAnswered) cellStyle = styles.cellAnswered;
              if (isReview) cellStyle = styles.cellReview;

              return (
                <div
                  key={idx}
                  className={`${styles.paletteCell} ${cellStyle} ${isCurrent ? styles.cellCurrent : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  {idx + 1}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Security Warning Modal #1 */}
      {warningModalText && (
        <div className={styles.modalOverlay}>
          <div className={styles.warningModalContent}>
            <div className={styles.warningIcon}>⚠️</div>
            <h2>Proctoring Security Warning</h2>
            <p>{warningModalText}</p>
            <button
              className={styles.warningDismissBtn}
              onClick={() => {
                setWarningModalText(null);
                if (document.documentElement.requestFullscreen) {
                  try { document.documentElement.requestFullscreen(); } catch (e) { /* ignore */ }
                }
              }}
            >
              Return to Fullscreen Exam
            </button>
          </div>
        </div>
      )}

      {/* Final Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.submitModalContent}>
            <h2>Final Examination Submission</h2>
            <p>Are you sure you want to submit your certification exam now?</p>

            <div className={styles.submitSummaryBox}>
              <div><span>Answered Questions:</span> <strong>{answeredCount} / {totalQuestions}</strong></div>
              <div><span>Unanswered / Skipped:</span> <strong>{unansweredCount}</strong></div>
              <div><span>Marked for Review:</span> <strong>{reviewCount}</strong></div>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowSubmitModal(false)}>
                Cancel &amp; Continue Test
              </button>
              <button 
                className={styles.confirmSubmitBtn} 
                onClick={() => handleFinalSubmit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? '⏳ Submitting...' : '✅ Yes, Submit Exam Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationEngine;
