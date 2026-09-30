import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModuleQuickNav from '../components/ModuleQuickNav';
import SubscriptionModal from '../components/SubscriptionModal';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';
import styles from './TestQuizPlaylist.module.css';

const MODULE_TITLES = {
  1: 'Introduction to Electronics',
  2: 'MOSFET & CMOS Theory',
  3: 'Digital Electronics',
  4: 'Linux & Basic Tcl Scripting',
  5: 'RTL Coding using Verilog',
  6: 'Logical Synthesis',
  7: 'Design For Testability (DFT)',
  8: 'Physical Synthesis',
  9: 'Static Timing Analysis - 1',
  10: 'Static Timing Analysis - 2',
  11: 'Static Timing Analysis - 3',
  12: 'PNR Inputs & Sanity Checks',
  13: 'FloorPlan & PowerPlan',
  14: 'Placement',
  15: 'Clock Tree Synthesis - 1',
  16: 'Clock Tree Synthesis - 2',
  17: 'Routing',
  18: 'Physical Verification & Signoff'
};

const TestQuizPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, hasPremiumAccess } = useAuth() || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('quiz test');

  const modId = parseInt(id, 10) || 1;
  const title = MODULE_TITLES[modId] || `Module ${modId}`;
  const isFreePreviewModule = modId <= 7;

  const handleStartQuiz = (difficulty) => {
    const isEasyFree = isFreePreviewModule && difficulty.toLowerCase() === 'easy';
    const canAttempt = hasPremiumAccess || isEasyFree;

    if (!canAttempt) {
      setModalTarget(`Module ${modId} ${difficulty} Level Quiz`);
      setModalOpen(true);
      return;
    }

    navigate(`/quiz/${modId}/${difficulty}`);
  };

  return (
    <div className={styles.container}>
      <SEO 
        title={`Module ${modId}: ${title} Practice Quizzes`}
        description={`Take Easy, Medium, and Hard practice tests for Module ${modId}: ${title} in VLSI Physical Design.`}
        url={`/test-quiz-playlist/${modId}`}
      />

      <ModuleQuickNav moduleId={modId} activeTab="quiz" />

      <header className={styles.header}>
        <h1 className={styles.moduleTitle}>Module {modId}: {title}</h1>
        <p className={styles.moduleSubtitle}>
          Select a quiz level below to launch your 30-question randomized practice test.
        </p>

        {/* 🔄 Unlimited Retakes & Randomized Papers Info Card */}
        <div style={{
          margin: '20px auto 0 auto',
          maxWidth: '720px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '16px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>🔄</span>
          <div>
            <div style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: '800', marginBottom: '2px' }}>
              Unlimited Retakes &amp; Dynamic Question Shuffling
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.45' }}>
              You can retake this level as many times as you want! Each new attempt generates a fresh set of randomized questions and shuffled options from our master question pool.
            </p>
          </div>
        </div>

        {!hasPremiumAccess && isFreePreviewModule && (
          <div style={{
            margin: '16px auto 0 auto',
            maxWidth: '600px',
            padding: '10px 18px',
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '12px',
            color: '#00f2fe',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            💡 Free Access Active: You can write the Easy Level Practice Test for free!
          </div>
        )}
      </header>

      {/* 3 Quiz Levels Grid */}
      <div className={styles.levelsGrid}>
        {/* 🟢 Easy Level Card */}
        <div className={`${styles.levelCard} ${styles.cardEasy}`}>
          <div>
            <div className={styles.levelHeader}>
              <span className={styles.levelIcon}>🟢</span>
              <span className={`${styles.levelBadge} ${styles.badgeEasy}`}>
                {isFreePreviewModule && !hasPremiumAccess ? 'FREE SAMPLE TEST' : 'BEGINNER LEVEL'}
              </span>
            </div>

            <h2 className={styles.levelTitle}>Easy Practice Quiz</h2>
            <p className={styles.levelDesc}>
              Perfect for foundational revision and basic concept testing with zero negative marking.
            </p>

            <div className={styles.rulesList}>
              <div className={styles.ruleItem}>
                <span>Questions Count:</span>
                <span className={styles.ruleVal}>30 MCQs</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Time Limit:</span>
                <span className={styles.ruleVal}>30 Minutes</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Passing Threshold:</span>
                <span className={styles.ruleVal} style={{ color: '#34d399' }}>70% Marks</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Scoring Rules:</span>
                <span className={styles.ruleVal}>+1.0 Correct / 0.0 Wrong</span>
              </div>
            </div>
          </div>

          <button className={`${styles.startBtn} ${styles.btnEasy}`} onClick={() => handleStartQuiz('Easy')}>
            {isFreePreviewModule && !hasPremiumAccess ? '🚀 Launch Free Sample Easy Test' : '🚀 Launch Easy Practice Test'}
          </button>
        </div>

        {/* 🟡 Medium Level Card */}
        <div className={`${styles.levelCard} ${styles.cardMedium}`}>
          <div>
            <div className={styles.levelHeader}>
              <span className={styles.levelIcon}>🟡</span>
              <span className={`${styles.levelBadge} ${styles.badgeMedium}`}>
                {!hasPremiumAccess ? '🔒 PREMIUM LOCKED' : 'INTERMEDIATE LEVEL'}
              </span>
            </div>

            <h2 className={styles.levelTitle}>Medium Practice Quiz</h2>
            <p className={styles.levelDesc}>
              Designed to test analytical reasoning and application of VLSI concepts with negative marking.
            </p>

            <div className={styles.rulesList}>
              <div className={styles.ruleItem}>
                <span>Questions Count:</span>
                <span className={styles.ruleVal}>30 MCQs</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Time Limit:</span>
                <span className={styles.ruleVal}>30 Minutes</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Passing Threshold:</span>
                <span className={styles.ruleVal} style={{ color: '#fbbf24' }}>70% Marks</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Scoring Rules:</span>
                <span className={styles.ruleVal}>+1.0 Correct / -0.25 Wrong</span>
              </div>
            </div>
          </div>

          <button className={`${styles.startBtn} ${styles.btnMedium}`} onClick={() => handleStartQuiz('Medium')}>
            {!hasPremiumAccess ? '🔒 Subscribe to Unlock Medium Test' : '⚡ Launch Medium Practice Test'}
          </button>
        </div>

        {/* 🔴 Hard Level Card */}
        <div className={`${styles.levelCard} ${styles.cardHard}`}>
          <div>
            <div className={styles.levelHeader}>
              <span className={styles.levelIcon}>🔴</span>
              <span className={`${styles.levelBadge} ${styles.badgeHard}`}>
                {!hasPremiumAccess ? '🔒 PREMIUM LOCKED' : 'ADVANCED LEVEL'}
              </span>
            </div>

            <h2 className={styles.levelTitle}>Hard Practice Quiz</h2>
            <p className={styles.levelDesc}>
              Industry-grade signoff questions to test deep physical design expertise under strict scoring.
            </p>

            <div className={styles.rulesList}>
              <div className={styles.ruleItem}>
                <span>Questions Count:</span>
                <span className={styles.ruleVal}>30 MCQs</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Time Limit:</span>
                <span className={styles.ruleVal}>30 Minutes</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Passing Threshold:</span>
                <span className={styles.ruleVal} style={{ color: '#f87171' }}>80% Marks</span>
              </div>
              <div className={styles.ruleItem}>
                <span>Scoring Rules:</span>
                <span className={styles.ruleVal}>+1.0 Correct / -0.25 Wrong</span>
              </div>
            </div>
          </div>

          <button className={`${styles.startBtn} ${styles.btnHard}`} onClick={() => handleStartQuiz('Advanced')}>
            {!hasPremiumAccess ? '🔒 Subscribe to Unlock Hard Test' : '🔥 Launch Hard Practice Test'}
          </button>
        </div>
      </div>

      <AdUnit slotId="slot_test_quizplaylist_outside" />

      <SubscriptionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscribe to Unlock Quiz Levels"
        featureName={modalTarget}
      />
    </div>
  );
};

export default TestQuizPlaylist;
