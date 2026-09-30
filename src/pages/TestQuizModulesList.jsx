import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchAvailableQuizModuleIds } from '../services/quizService';
import SubscriptionModal from '../components/SubscriptionModal';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';
import styles from './TestQuizModulesList.module.css';

// Master 19 VLSI Physical Design Quiz Modules
const QUIZ_MODULES_LIST = [
  { id: 1, title: 'Introduction to Electronics', thumbnail: '/images/modules/mod1.jpg', questionsCount: 900, ready: true },
  { id: 2, title: 'MOSFET & CMOS Theory', thumbnail: '/images/modules/mod2.jpg', questionsCount: 900, ready: true },
  { id: 3, title: 'Digital Electronics', thumbnail: '/images/modules/mod3.jpg', questionsCount: 900, ready: true },
  { id: 4, title: 'Linux & Basic Tcl Scripting', thumbnail: '/images/modules/mod4.jpg', questionsCount: 900, ready: true },
  { id: 5, title: 'RTL Coding using Verilog', thumbnail: '/images/modules/mod5.jpg', questionsCount: 900, ready: true },
  { id: 6, title: 'Logical Synthesis', thumbnail: '/images/modules/mod6.jpg', questionsCount: 900, ready: true },
  { id: 7, title: 'Design For Testability (DFT)', thumbnail: '/images/modules/mod7.jpg', questionsCount: 900, ready: true },
  { id: 8, title: 'Physical Synthesis', thumbnail: '/images/modules/mod8.jpg', questionsCount: 900, ready: true },
  { id: 9, title: 'Static Timing Analysis - 1', thumbnail: '/images/modules/mod9.jpg', questionsCount: 900, ready: true },
  { id: 10, title: 'Static Timing Analysis - 2', thumbnail: '/images/modules/mod10.jpg', questionsCount: 900, ready: true },
  { id: 11, title: 'Static Timing Analysis - 3', thumbnail: '/images/modules/mod11.jpg', questionsCount: 900, ready: true },
  { id: 12, title: 'PNR Inputs & Sanity Checks', thumbnail: '/images/modules/mod12.jpg', questionsCount: 900, ready: true },
  { id: 13, title: 'FloorPlan & PowerPlan', thumbnail: '/images/modules/mod13.jpg', questionsCount: 900, ready: true },
  { id: 14, title: 'Placement', thumbnail: '/images/modules/mod14.jpg', questionsCount: 900, ready: true },
  { id: 15, title: 'Clock Tree Synthesis - 1', thumbnail: '/images/modules/mod15.jpg', questionsCount: 900, ready: true },
  { id: 16, title: 'Clock Tree Synthesis - 2 (CTS 2)', thumbnail: '/images/modules/mod16.jpg', questionsCount: 900, ready: true },
  { id: 17, title: 'Routing (Route)', thumbnail: '/images/modules/mod17.jpg', questionsCount: 900, ready: true },
  { id: 18, title: 'Post-Route Optimization (OptRoute)', thumbnail: '/images/modules/mod18.jpg', questionsCount: 900, ready: true },
  { id: 19, title: 'Physical Verification & Signoff', thumbnail: '/images/modules/mod19.jpg', questionsCount: 900, ready: true }
];

const TestQuizModulesList = () => {
  const navigate = useNavigate();
  const { user, hasPremiumAccess } = useAuth() || {};
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('quiz practice exams');

  // Dynamically populated available module IDs
  const [availableModuleIds, setAvailableModuleIds] = useState(new Set(Array.from({ length: 19 }, (_, i) => i + 1)));
  const [loadingModules, setLoadingModules] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function checkLiveModules() {
      try {
        const foundIds = await fetchAvailableQuizModuleIds();
        if (isMounted && foundIds && foundIds.size > 0) {
          setAvailableModuleIds(foundIds);
        }
      } catch (err) {
        console.warn("Could not fetch live modules list:", err);
      } finally {
        if (isMounted) setLoadingModules(false);
      }
    }
    checkLiveModules();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className={styles.modulesContainer}>
      <SEO 
        title="Free VLSI Physical Design Practice Quizzes & Easy Tests"
        description="Test your VLSI Physical Design knowledge with free practice quizzes and Easy level tests across PnR, STA, synthesis, floorplanning, and physical verification."
        url="/test-quiz-modules"
      />

      <header className={styles.headerSection}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <button 
            onClick={() => navigate('/platform-flow')} 
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '700',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Back to Flow Graph
          </button>
        </div>

        <h1 className={styles.pageTitle}>Interactive Quiz Practice & Assessments</h1>
        <p className={styles.pageSubtitle}>
          Select a module and difficulty level to assess your physical design proficiency. Guest and free users can launch <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>Free Easy Level Quizzes for Modules 1–7</span> instantly. Medium/Hard levels and Modules 8+ are available with subscription.
        </p>

        {/* 🔄 Unlimited Practice & Randomized Question Papers Notice Banner */}
        <div style={{
          margin: '24px 0',
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          textAlign: 'left'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
              flexShrink: 0
            }}>
              🔄
            </div>

            <div style={{ flex: 1, minWidth: '280px' }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.15rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span>Unlimited Practice &amp; Randomized Question Papers</span>
                <span style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  ✨ New Questions Every Attempt!
                </span>
              </h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.55' }}>
                Did you know? You can retake any quiz test <strong style={{ color: '#38bdf8' }}>unlimited times</strong>! Every single attempt dynamically generates a fresh set of randomized questions from our master question bank. Practice repeatedly to achieve 100% conceptual mastery!
              </p>
            </div>
          </div>
        </div>

        {!hasPremiumAccess && (
          <div style={{
            marginTop: '20px',
            padding: '16px 24px',
            background: 'rgba(0, 242, 254, 0.06)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            boxShadow: '0 8px 25px rgba(0, 242, 254, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.6rem' }}>💡</span>
              <div>
                <h4 style={{ margin: 0, color: '#00f2fe', fontSize: '1rem', fontWeight: '700' }}>
                  Free Quiz Access for Modules 1–7 (Easy Level)
                </h4>
                <p style={{ margin: '4px 0 0 0', color: '#cbd5e1', fontSize: '0.85rem' }}>
                  Free users can practice 1 Easy Quiz test for Modules 1–7. Subscribe to unlock Medium/Hard levels &amp; Modules 8–59!
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(user ? '/paid-modules' : '/login')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #4285f4 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {user ? '✨ Upgrade Account' : '🔑 Log In / Register'}
            </button>
          </div>
        )}
      </header>

      {/* Difficulty Tabs Bar */}
      <div className={styles.difficultySelectorBar}>
        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Easy' ? styles.activeEasy : ''}`}
          onClick={() => setSelectedDifficulty('Easy')}
        >
          🟢 Easy Level (Free Access for Mod 1-7 • 70% Pass)
        </button>

        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Medium' ? styles.activeMedium : ''}`}
          onClick={() => {
            if (!hasPremiumAccess) {
              setModalTarget('Medium Difficulty Quiz Tests');
              setModalOpen(true);
            } else {
              setSelectedDifficulty('Medium');
            }
          }}
        >
          🟡 Medium Level {!hasPremiumAccess ? '🔒' : ''} (70% Pass • -0.25 Negative Marks)
        </button>

        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Advanced' ? styles.activeAdvanced : ''}`}
          onClick={() => {
            if (!hasPremiumAccess) {
              setModalTarget('Hard/Advanced Difficulty Quiz Tests');
              setModalOpen(true);
            } else {
              setSelectedDifficulty('Advanced');
            }
          }}
        >
          🔴 Advanced Level {!hasPremiumAccess ? '🔒' : ''} (80% Pass • -0.25 Negative Marks)
        </button>
      </div>

      {/* Grid Container */}
      <div className={styles.gridContainer}>
        {QUIZ_MODULES_LIST.map((mod) => {
          const isFreePreview = mod.id <= 7;
          const canAccess = hasPremiumAccess || isFreePreview;

          return (
            <div 
              key={mod.id} 
              className={styles.moduleCardWrapper}
              onClick={() => {
                if (!canAccess) {
                  setModalTarget(`Module ${mod.id} (${mod.title}) Practice Quiz`);
                  setModalOpen(true);
                  return;
                }
                navigate(`/test-quiz-playlist/${mod.id}`);
              }}
              style={!canAccess ? { opacity: 0.85 } : {}}
            >
              <div className={styles.moduleCard}>
                <div className={styles.thumbnailContainer}>
                  <img 
                    src={mod.thumbnail} 
                    alt={mod.title} 
                    className={styles.thumbnailImage} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/chip.png'; }}
                    style={!canAccess ? { filter: 'grayscale(40%) brightness(60%)' } : {}}
                    loading="lazy"
                  />
                  <div className={styles.thumbnailOverlay}></div>

                  <div className={styles.topBadges}>
                    <span className={styles.moduleBadge}>MODULE {mod.id}</span>
                    {isFreePreview && !hasPremiumAccess ? (
                      <span className={`${styles.statusBadge}`} style={{ background: 'rgba(0,242,254,0.2)', border: '1px solid #00f2fe', color: '#00f2fe' }}>
                        FREE SAMPLE TEST
                      </span>
                    ) : hasPremiumAccess ? (
                      <span className={`${styles.statusBadge} ${styles.readyBadge}`}>LIVE QUIZ READY</span>
                    ) : (
                      <span className={`${styles.statusBadge}`} style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid #ef4444', color: '#f87171' }}>
                        🔒 LOCKED
                      </span>
                    )}
                  </div>

                  <div className={styles.playIconWrapper}>
                    {canAccess ? (
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                      <span title="Subscribe to Unlock">🔒</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h2 className={styles.moduleTitle}>{mod.title}</h2>
                  {canAccess ? (
                    <span className={styles.questionCount}>
                      📝 {mod.questionsCount}+ Questions {!hasPremiumAccess ? '(Easy Free)' : ''}
                    </span>
                  ) : (
                    <span className={styles.questionCount} style={{ color: '#f87171' }}>
                      🔒 Subscribe to Unlock Full Quiz
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdUnit slotId="slot_test_quizmodules_bottom" />

      <SubscriptionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscribe to Unlock Practice Quiz Exams"
        featureName={modalTarget}
      />
    </div>
  );
};

export default TestQuizModulesList;
