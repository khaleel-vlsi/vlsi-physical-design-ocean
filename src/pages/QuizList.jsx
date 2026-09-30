import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPastAttempts } from '../services/quizService';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';
import styles from './QuizList.module.css';

const MODULES_LIST = [
  { id: 1, title: 'Introduction to Electronics', desc: 'Basic electrical concepts, semiconductors, diodes, and RC delay.' },
  { id: 2, title: 'MOSFET & CMOS Theory', desc: 'Transistor physics, Vth, DIBL, CMOS VTC, and leakage mechanisms.' },
  { id: 3, title: 'Digital Electronics', desc: 'Boolean algebra, logic gates, MUX, registers, and setup/hold basics.' },
  { id: 4, title: 'Linux & Basic Tcl Script', desc: 'Shell commands, permissions, VIM editor, and TCL script automation.' },
  { id: 5, title: 'RTL Coding using Verilog', desc: 'Verilog syntax, blocking vs non-blocking, FSM design, and synthesis rules.' },
  { id: 6, title: 'Logical Synthesis', desc: 'Design Compiler / Genus flow, SDC constraints, technology mapping, and timing.' },
  { id: 7, title: 'Design For Testability', desc: 'Scan chain insertion, ATPG, fault models (SAF/TDF), BIST, and Boundary Scan.' },
  { id: 8, title: 'Physical Synthesis', desc: 'Placement-aware synthesis, SPG guidance, and congestion-driven optimization.' },
  { id: 9, title: 'Static Timing Analysis - 1', desc: 'Timing paths, setup/hold slack formulas, clock latency, skew, and uncertainty.' },
  { id: 10, title: 'Static Timing Analysis - 2', desc: 'Setup & hold fixing, useful skew, post-CTS timing, and AOCV/POCV variation.' },
  { id: 11, title: 'Static Timing Analysis - 3', desc: 'Multi-Corner Multi-Mode (MCMM), crosstalk noise/delay, and PrimeTime signoff.' },
  { id: 12, title: 'PNR Inputs & Sanity Checks', desc: 'Netlist, SDC, LEF/DEF, Liberty .lib validation, and library consistency.' },
  { id: 13, title: 'FloorPlan & PowerPlan', desc: 'Die sizing, macro placement, channel spacing, and PG grid synthesis.' },
  { id: 14, title: 'Placement', desc: 'Global & detailed placement, cell legalization, blockages, and HFNS.' },
  { id: 15, title: 'Clock Tree Synthesis - 1', desc: 'Zero-skew clock networks, H-tree topologies, and CTS buffer selection.' },
  { id: 16, title: 'Clock Tree Synthesis - 2', desc: 'Clock tree balancing, useful skew, clock power, and post-CTS optimization.' },
  { id: 17, title: 'Routing', desc: 'Global & detail routing, Non-Default Rules (NDR), antenna fix, and DRCs.' },
  { id: 18, title: 'Physical Verification & Signoff', desc: 'DRC, LVS, ERC signoff, metal fill density rules, and GDSII tapeout.' }
];

const QuizList = () => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [pastAttempts, setPastAttempts] = useState([]);

  useEffect(() => {
    setPastAttempts(getPastAttempts());
  }, []);

  const handleStartQuiz = (moduleId) => {
    navigate(`/quiz/${moduleId}/${selectedDifficulty}`);
  };

  return (
    <div className={styles.container}>
      <SEO 
        title="Interactive VLSI Quiz & Assessment Practice"
        description="Practice 16,200+ VLSI Physical Design MCQ questions across PnR, STA, Logical Synthesis, CTS, Floorplanning, and Physical Verification."
        url="/quiz-practice"
      />

      <header className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Interactive Quiz Practice System</h1>
        <p className={styles.pageSubtitle}>
          Master VLSI Physical Design through unlimited 30-question practice tests with live Google Sheets questions & full solution reviews.
        </p>
      </header>

      {/* Difficulty Tabs */}
      <div className={styles.difficultySelector}>
        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Easy' ? styles.activeEasy : ''}`}
          onClick={() => setSelectedDifficulty('Easy')}
        >
          🟢 Easy (70% Pass • No Negative Marks)
        </button>

        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Medium' ? styles.activeMedium : ''}`}
          onClick={() => setSelectedDifficulty('Medium')}
        >
          🟡 Medium (70% Pass • -0.25 Negative Marks)
        </button>

        <button 
          className={`${styles.diffTab} ${selectedDifficulty === 'Advanced' ? styles.activeAdvanced : ''}`}
          onClick={() => setSelectedDifficulty('Advanced')}
        >
          🔴 Advanced (80% Pass • -0.25 Negative Marks)
        </button>
      </div>

      {/* Modules Grid */}
      <div className={styles.grid}>
        {MODULES_LIST.map((mod) => (
          <div key={mod.id} className={styles.card}>
            <div>
              <span className={styles.cardBadge}>MODULE {mod.id}</span>
              <h2 className={styles.cardTitle}>{mod.title}</h2>
              <p className={styles.cardDesc}>{mod.desc}</p>
            </div>

            <button 
              className={styles.startBtn}
              onClick={() => handleStartQuiz(mod.id)}
            >
              🚀 Start {selectedDifficulty} Quiz (30 Qs)
            </button>
          </div>
        ))}
      </div>

      {/* Past Attempts History Dashboard */}
      {pastAttempts.length > 0 && (
        <div className={styles.historySection}>
          <h2 className={styles.historyTitle}>📜 Your Previous Quiz Attempts History</h2>
          <div className={styles.historyList}>
            {pastAttempts.slice(0, 10).map((att) => (
              <div key={att.id} className={styles.historyRow}>
                <div>
                  <strong>Module {att.moduleId} ({att.difficulty})</strong>
                  <span style={{ marginLeft: '12px', color: '#94a3b8', fontSize: '0.85rem' }}>{att.date}</span>
                </div>

                <div>
                  <span style={{ fontWeight: 'bold', color: att.isPass ? '#34d399' : '#f87171', marginRight: '16px' }}>
                    {att.isPass ? '🟢 PASSED' : '🔴 FAILED'} ({att.percentage}%)
                  </span>

                  <button className={styles.reviewLink} onClick={() => navigate(`/quiz/${att.moduleId}/${att.difficulty}`)}>
                    Review Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdUnit slotId="slot_quizlist_bottom" />
    </div>
  );
};

export default QuizList;
