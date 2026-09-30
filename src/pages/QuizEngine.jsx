import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateQuizPaper, saveQuizAttempt } from '../services/quizService';
import SEO from '../components/SEO';
import styles from './QuizEngine.module.css';

const QuizEngine = () => {
  const { moduleId, difficulty = 'Easy' } = useParams();
  const navigate = useNavigate();
  const { user, profile, hasPremiumAccess } = useAuth() || {};

  const modNum = parseInt(String(moduleId || 1).replace(/\D/g, ''), 10) || 1;
  const isFreeEasyQuiz = modNum <= 7 && (String(difficulty || 'Easy').toLowerCase() === 'easy');

  useEffect(() => {
    if (!hasPremiumAccess && !isFreeEasyQuiz) {
      alert("🔒 Premium Subscription Required:\nMedium/Hard quiz levels and Modules 8-59 require a paid course subscription. Please upgrade your account to unlock this test.");
      navigate(`/test-quiz-playlist/${modNum}`);
    }
  }, [hasPremiumAccess, isFreeEasyQuiz, modNum, navigate]);

  // Auto-extract student info from logged-in profile or set default for guest users
  const [studentInfo, setStudentInfo] = useState(() => {
    if (profile || user) {
      return {
        fullName: profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Logged Student',
        email: profile?.email || user?.email || '',
        phone: profile?.phone_number || '',
        country: profile?.country || 'India'
      };
    }
    try {
      const saved = JSON.parse(localStorage.getItem('ocean_student_info') || 'null');
      if (saved) return saved;
    } catch {
      // ignore
    }
    return {
      fullName: 'Guest Student',
      email: 'guest@vlsiphysicaldesignocean.com',
      phone: '',
      country: 'India'
    };
  });

  const [formInput, setFormInput] = useState({
    fullName: studentInfo?.fullName || profile?.full_name || 'Guest Student',
    email: studentInfo?.email || profile?.email || user?.email || 'guest@vlsiphysicaldesignocean.com',
    phone: studentInfo?.phone || profile?.phone_number || '',
    country: studentInfo?.country || profile?.country || 'India'
  });

  // Never block exam with login/intake modal for free preview or logged-in users
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user || profile) {
      const autoInfo = {
        fullName: profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Logged Student',
        email: profile?.email || user?.email || '',
        phone: profile?.phone_number || '',
        country: profile?.country || 'India'
      };
      setStudentInfo(autoInfo);
    }
    setShowModal(false);
  }, [user, profile]);

  const [paper, setPaper] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [index]: selectedKey }
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  // Solution Review Filter State: 'all' | 'wrong' | 'correct' | 'skipped'
  const [reviewFilter, setReviewFilter] = useState('all');

  // 1. Fetch live quiz paper
  useEffect(() => {
    let isMounted = true;
    async function loadPaper() {
      setLoading(true);
      const generatedPaper = await generateQuizPaper(moduleId || 1, difficulty);
      if (isMounted) {
        setPaper(generatedPaper);
        setLoading(false);
      }
    }
    loadPaper();
    return () => { isMounted = false; };
  }, [moduleId, difficulty]);

  // 2. Countdown timer
  useEffect(() => {
    if (showModal || loading || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showModal, loading, isSubmitted]);

  // 3. Anti-cheating listeners
  useEffect(() => {
    if (isSubmitted) return;

    const handleContextMenu = (e) => e.preventDefault();
    const handleCopy = (e) => e.preventDefault();

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
    };
  }, [isSubmitted]);

  const handleStartExam = (e) => {
    e.preventDefault();
    if (!formInput.fullName || !formInput.email) {
      alert('Please provide your Full Name and Email to start the practice test.');
      return;
    }
    localStorage.setItem('ocean_student_info', JSON.stringify(formInput));
    setStudentInfo(formInput);
    setShowModal(false);
  };

  const handleSelectOption = (qIndex, optionKey) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIndex]: optionKey
    }));
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    let totalMarks = 0;

    const isEasy = difficulty.toLowerCase() === 'easy';
    const passThreshold = difficulty.toLowerCase() === 'advanced' ? 80 : 70;

    paper.forEach((q, idx) => {
      const selected = userAnswers[idx];
      if (!selected) {
        skippedCount++;
      } else if (selected === q.correctKey) {
        correctCount++;
        totalMarks += 1; // Standard +1 mark per correct question
      } else {
        wrongCount++;
        if (!isEasy) {
          totalMarks -= 0.25; // Negative marking for Medium & Advanced
        }
      }
    });

    const maxMarks = paper.length * 1;
    const finalMarks = Math.max(0, totalMarks);
    const percentage = Math.round((finalMarks / maxMarks) * 100);
    const isPass = percentage >= passThreshold;
    const timeTaken = 1800 - timeLeft;

    const attemptSummary = {
      id: `att_${Date.now()}`,
      studentInfo,
      moduleId: moduleId || 1,
      difficulty,
      totalQuestions: paper.length,
      correctCount,
      wrongCount,
      skippedCount,
      finalMarks: parseFloat(finalMarks.toFixed(2)),
      percentage,
      isPass,
      timeTakenSeconds: timeTaken,
      paper,
      userAnswers,
      date: new Date().toLocaleDateString()
    };

    saveQuizAttempt(attemptSummary);
    setResult(attemptSummary);
    setIsSubmitted(true);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!hasPremiumAccess && !isFreeEasyQuiz) {
    return (
      <div className={styles.container} style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{
          maxWidth: '560px',
          width: '100%',
          padding: '36px 28px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          borderRadius: '24px',
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>
            Premium Quiz Access Required
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Practice Quiz Exams are strictly accessible by paid course members. Please upgrade your account or log in to unlock instant access to 16,200+ MCQ practice questions.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(user ? '/paid-modules' : '/login')}
              style={{
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              {user ? '✨ Unlock Premium Course Access' : '🔑 Log In / Register Now'}
            </button>
            <button
              onClick={() => navigate('/test-quiz-modules')}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                background: 'rgba(51, 65, 85, 0.7)',
                color: '#94a3b8',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              ← Back to Quiz Modules
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>Loading Live Question Bank...</h2>
        <p style={{ color: '#94a3b8' }}>Generating randomized 30-question test paper from Google Sheets...</p>
      </div>
    );
  }

  if (!loading && paper.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>⏳ Questions Updating</h2>
        <p style={{ color: '#94a3b8', maxWidth: '500px', margin: '16px auto 32px auto' }}>
          Questions for Module {moduleId} ({difficulty} Level) are currently being updated in the Google Sheet.
        </p>
        <button className={styles.backBtn} onClick={() => navigate('/test-quiz-modules')}>
          ⬅️ Back to Quiz Modules
        </button>
      </div>
    );
  }

  // Pre-exam Intake Modal (For Guest Users)
  if (showModal) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>Student Intake Registration</h2>
          <p className={styles.modalSubtitle}>Please enter your details to start Module {moduleId} ({difficulty} Level) Practice Test.</p>
          <form onSubmit={handleStartExam}>
            <div className={styles.inputGroup}>
              <label>Full Name *</label>
              <input 
                type="text" 
                required 
                className={styles.inputField}
                value={formInput.fullName}
                onChange={(e) => setFormInput({ ...formInput, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address *</label>
              <input 
                type="email" 
                required 
                className={styles.inputField}
                value={formInput.email}
                onChange={(e) => setFormInput({ ...formInput, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                className={styles.inputField}
                value={formInput.phone}
                onChange={(e) => setFormInput({ ...formInput, phone: e.target.value })}
                placeholder="+91 9876543210"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Country</label>
              <input 
                type="text" 
                className={styles.inputField}
                value={formInput.country}
                onChange={(e) => setFormInput({ ...formInput, country: e.target.value })}
              />
            </div>
            <button type="submit" className={styles.startExamBtn}>🚀 Start Practice Test</button>
          </form>
        </div>
      </div>
    );
  }

  const currentQ = paper[currentIndex] || paper[0];

  // Filtered Solution Review Items
  const reviewQuestions = paper.map((q, idx) => ({
    ...q,
    originalIndex: idx + 1,
    selected: userAnswers[idx],
    isCorrect: userAnswers[idx] === q.correctKey,
    isSkipped: !userAnswers[idx]
  })).filter((q) => {
    if (reviewFilter === 'wrong') return !q.isSkipped && !q.isCorrect;
    if (reviewFilter === 'correct') return q.isCorrect;
    if (reviewFilter === 'skipped') return q.isSkipped;
    return true; // 'all'
  });

  return (
    <div className={styles.container}>
      <SEO 
        title={`Module ${moduleId} ${difficulty} Quiz Practice`}
        description={`Practice Module ${moduleId} VLSI Physical Design Quiz Test.`}
        url={`/quiz/${moduleId}/${difficulty}`}
      />

      {/* Top Navigation Row */}
      <div className={styles.topNavRow}>
        <button onClick={() => navigate('/test-quiz-modules')} className={styles.backBtn}>
          ⬅️ Back to Quiz Modules
        </button>

        <button onClick={() => navigate(`/test-quiz-playlist/${moduleId}`)} className={styles.backBtn}>
          📋 Module {moduleId} Test Selection
        </button>

        {isSubmitted && (
          <button onClick={() => window.location.reload()} className={styles.retakeBtn} title="Launch another attempt with a fresh set of randomized questions!">
            🔄 Retake Test (Generate New Question Paper)
          </button>
        )}
      </div>

      {/* Header Bar */}
      <header className={styles.examHeader}>
        <div className={styles.titleArea}>
          <h1>
            Module {moduleId} Practice Quiz
            <span className={`${styles.difficultyBadge} ${difficulty.toLowerCase() === 'easy' ? styles.easyBadge : difficulty.toLowerCase() === 'medium' ? styles.mediumBadge : styles.advancedBadge}`}>
              {difficulty}
            </span>
          </h1>
        </div>

        {!isSubmitted && (
          <div className={`${styles.timerBox} ${timeLeft < 300 ? styles.timerWarning : ''}`}>
            ⏱️ {formatTime(timeLeft)}
          </div>
        )}
      </header>

      {!isSubmitted ? (
        <div className={styles.examGrid}>
          {/* Main Question Display */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.qNum}>QUESTION {currentIndex + 1} OF {paper.length}</span>
              <span className={styles.marksInfo}>
                {difficulty.toLowerCase() === 'easy' ? '+1.0 / 0.0' : '+1.0 / -0.25'} Marks
              </span>
            </div>

            <h3 className={styles.questionText}>{currentQ.question}</h3>

            <div className={styles.optionsList}>
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentIndex] === opt.key;
                return (
                  <div
                    key={opt.key}
                    className={`${styles.optionItem} ${isSelected ? styles.optionSelected : ''}`}
                    onClick={() => handleSelectOption(currentIndex, opt.key)}
                  >
                    <span className={styles.optionKey}>{opt.key}</span>
                    <span className={styles.optionLabel}>{opt.text}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.navActions}>
              <button 
                className={styles.actionBtn} 
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              >
                ⬅️ Previous
              </button>

              {currentIndex < paper.length - 1 ? (
                <button 
                  className={styles.actionBtn}
                  onClick={() => setCurrentIndex((prev) => Math.min(paper.length - 1, prev + 1))}
                >
                  Next ➡️
                </button>
              ) : (
                <button className={`${styles.actionBtn} ${styles.submitBtn}`} onClick={handleSubmitQuiz}>
                  ✅ Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className={styles.sidebarPalette}>
            <div className={styles.paletteTitle}>Question Palette</div>
            <div className={styles.paletteGrid}>
              {paper.map((q, idx) => {
                const isAnswered = !!userAnswers[idx];
                const isCurrent = idx === currentIndex;
                return (
                  <div
                    key={idx}
                    className={`${styles.paletteCell} ${isAnswered ? styles.cellAnswered : ''} ${isCurrent ? styles.cellCurrent : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {idx + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Result Scorecard & Interactive Solution Review */
        <div>
          <div className={styles.resultCard}>
            <div className={result.isPass ? styles.badgePass : styles.badgeFail}>
              {result.isPass ? '🎉 TEST PASSED' : '⚠️ NEEDS PRACTICE'}
            </div>

            <div className={styles.scoreNumber}>{result.percentage}%</div>
            <p style={{ color: '#94a3b8' }}>
              Final Marks: <strong>{result.finalMarks}</strong> / {result.totalQuestions} (Pass Mark: {difficulty.toLowerCase() === 'advanced' ? '80%' : '70%'})
            </p>

            {/* Clickable Stat Cards */}
            <div className={styles.statsGrid}>
              <div 
                className={`${styles.statBox} ${reviewFilter === 'correct' ? styles.statBoxActive : ''}`}
                onClick={() => setReviewFilter('correct')}
              >
                <div className={styles.statVal} style={{ color: '#10b981' }}>{result.correctCount}</div>
                <div className={styles.statLbl}>Correct (🟢)</div>
              </div>

              <div 
                className={`${styles.statBox} ${reviewFilter === 'wrong' ? styles.statBoxActive : ''}`}
                onClick={() => setReviewFilter('wrong')}
              >
                <div className={styles.statVal} style={{ color: '#ef4444' }}>{result.wrongCount}</div>
                <div className={styles.statLbl}>Wrong (🔴) - View Solutions</div>
              </div>

              <div 
                className={`${styles.statBox} ${reviewFilter === 'skipped' ? styles.statBoxActive : ''}`}
                onClick={() => setReviewFilter('skipped')}
              >
                <div className={styles.statVal} style={{ color: '#94a3b8' }}>{result.skippedCount}</div>
                <div className={styles.statLbl}>Skipped (⚪)</div>
              </div>

              <div className={styles.statBox} onClick={() => setReviewFilter('all')}>
                <div className={styles.statVal}>{Math.floor(result.timeTakenSeconds / 60)}m {result.timeTakenSeconds % 60}s</div>
                <div className={styles.statLbl}>Time Taken</div>
              </div>
            </div>
          </div>

          {/* Interactive Filtered Solution Review List */}
          <div className={styles.reviewSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>🔍 Detailed Solution Review</h2>

              {/* Review Filter Tabs */}
              <div className={styles.filterTabsRow}>
                <button 
                  className={`${styles.filterBtn} ${reviewFilter === 'all' ? styles.activeFilterAll : ''}`}
                  onClick={() => setReviewFilter('all')}
                >
                  📄 All Questions ({paper.length})
                </button>

                <button 
                  className={`${styles.filterBtn} ${reviewFilter === 'wrong' ? styles.activeFilterWrong : ''}`}
                  onClick={() => setReviewFilter('wrong')}
                >
                  🔴 Wrong Answers ({result.wrongCount})
                </button>

                <button 
                  className={`${styles.filterBtn} ${reviewFilter === 'correct' ? styles.activeFilterCorrect : ''}`}
                  onClick={() => setReviewFilter('correct')}
                >
                  🟢 Correct ({result.correctCount})
                </button>

                <button 
                  className={`${styles.filterBtn} ${reviewFilter === 'skipped' ? styles.activeFilterSkipped : ''}`}
                  onClick={() => setReviewFilter('skipped')}
                >
                  ⚪ Skipped ({result.skippedCount})
                </button>
              </div>
            </div>

            {reviewQuestions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', color: '#94a3b8' }}>
                {reviewFilter === 'wrong' && '🎉 Excellent! You have 0 wrong answers for this test attempt!'}
                {reviewFilter === 'skipped' && '👍 Great job! You did not skip any questions in this attempt.'}
                {reviewFilter === 'correct' && 'Keep practicing to get more correct answers!'}
              </div>
            ) : (
              reviewQuestions.map((q) => {
                const reviewClass = q.isSkipped ? styles.reviewSkipped : q.isCorrect ? styles.reviewCorrect : styles.reviewWrong;

                return (
                  <div key={q.originalIndex} className={`${styles.reviewItem} ${reviewClass}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong style={{ color: '#38bdf8' }}>Q{q.originalIndex}. {q.topic} ({q.subTopic})</strong>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: q.isCorrect ? '#10b981' : q.isSkipped ? '#94a3b8' : '#ef4444' }}>
                        {q.isCorrect ? '🟢 Correct (+1)' : q.isSkipped ? '⚪ Skipped (0)' : `🔴 Incorrect (${difficulty.toLowerCase() === 'easy' ? '0' : '-0.25'})`}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', margin: '0 0 16px 0' }}>{q.question}</h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt) => {
                        const wasSelected = q.selected === opt.key;
                        const isTargetCorrect = opt.key === q.correctKey;

                        let optBg = 'transparent';
                        let optColor = '#cbd5e1';

                        if (isTargetCorrect) {
                          optBg = 'rgba(16, 185, 129, 0.2)';
                          optColor = '#34d399';
                        } else if (wasSelected && !q.isCorrect) {
                          optBg = 'rgba(239, 68, 68, 0.2)';
                          optColor = '#f87171';
                        }

                        return (
                          <div key={opt.key} style={{ background: optBg, color: optColor, padding: '10px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem' }}>
                            <strong>{opt.key}.</strong> {opt.text}
                            {isTargetCorrect && ' ✔️ (Correct Answer)'}
                            {wasSelected && !isTargetCorrect && ' ✖ (Your Choice)'}
                          </div>
                        );
                      })}
                    </div>

                    <div className={styles.explanationBox}>
                      <strong>💡 Technical Rationale:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })
            )}

            {/* Bottom Action Bar */}
            <div className={styles.bottomActionRow}>
              <button onClick={() => navigate('/test-quiz-modules')} className={styles.backBtn}>
                ⬅️ Back to Quiz Modules
              </button>
              <button onClick={() => navigate(`/test-quiz-playlist/${moduleId}`)} className={styles.backBtn}>
                📋 Module {moduleId} Test Selection
              </button>
              <button onClick={() => window.location.reload()} className={styles.retakeBtn}>
                🔄 Retake Test (New Paper)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizEngine;
