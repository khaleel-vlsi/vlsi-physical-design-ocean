import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ModuleQuickNav.module.css';

const MODULE_LIST = [
  { id: 1, name: 'Module 1: Introduction to Electronics' },
  { id: 2, name: 'Module 2: MOSFET & CMOS Theory' },
  { id: 3, name: 'Module 3: Digital Electronics' },
  { id: 4, name: 'Module 4: Linux & Basic Tcl Scripting' },
  { id: 5, name: 'Module 5: RTL Coding using Verilog' },
  { id: 6, name: 'Module 6: Logical Synthesis' },
  { id: 7, name: 'Module 7: Design For Testability (DFT)' },
  { id: 8, name: 'Module 8: Physical Synthesis' },
  { id: 9, name: 'Module 9: Static Timing Analysis - 1' },
  { id: 10, name: 'Module 10: Static Timing Analysis - 2' },
  { id: 11, name: 'Module 11: Static Timing Analysis - 3' },
  { id: 12, name: 'Module 12: PNR Inputs & Sanity Checks' },
  { id: 13, name: 'Module 13: FloorPlan & PowerPlan' },
  { id: 14, name: 'Module 14: Placement' },
  { id: 15, name: 'Module 15: Clock Tree Synthesis - 1' },
  { id: 16, name: 'Module 16: Clock Tree Synthesis - 2 (CTS 2)' },
  { id: 17, name: 'Module 17: Routing (Route)' },
  { id: 18, name: 'Module 18: Post-Route Optimization (OptRoute)' },
  { id: 19, name: 'Module 19: Physical Verification & Signoff' }
];

/**
 * Enhanced Module Navigation Header
 * Features:
 * 1. 📂 Main Section Directory Button (All Videos / All Materials / All Quizzes)
 * 2. 🔀 3-Way Mode Switcher (Recorded Videos | Study Material | Quiz Test)
 * 3. 🎯 Module Jump Selector (Select any Module 1-19 or click Prev/Next)
 * 4. 🗺️ Platform Flow Graph Shortcut
 */
const ModuleQuickNav = ({ moduleId, activeTab }) => {
  const navigate = useNavigate();
  const modId = parseInt(moduleId, 10) || 1;

  // Navigate to target module while preserving current content mode
  const jumpToModule = (targetId) => {
    const nextId = Math.max(1, Math.min(19, parseInt(targetId, 10)));
    if (activeTab === 'video') {
      navigate(`/test-video-playlist/${nextId}`);
    } else if (activeTab === 'material') {
      navigate(`/modules/${nextId}`);
    } else if (activeTab === 'quiz') {
      navigate(`/test-quiz-playlist/${nextId}`);
    } else {
      navigate(`/modules/${nextId}`);
    }
  };

  // Main Section Page Router
  const handleMainSectionClick = () => {
    if (activeTab === 'video') navigate('/test-videos');
    else if (activeTab === 'material') navigate('/modules');
    else if (activeTab === 'quiz') navigate('/test-quiz-modules');
    else navigate('/platform-flow');
  };

  const getMainSectionLabel = () => {
    if (activeTab === 'video') return '← Recorded Videos Main Page';
    if (activeTab === 'material') return '← Study Materials Main Page';
    if (activeTab === 'quiz') return '← Quiz Practice Main Page';
    return '← Main Directory';
  };

  return (
    <nav className={styles.topNavWrapper} aria-label="Module Navigation Header">
      {/* Top Bar: Section Back Button + Flow Graph Link */}
      <div className={styles.primaryRow}>
        <button 
          className={styles.mainSectionBtn}
          onClick={handleMainSectionClick}
          title="Return to Section Main Directory"
        >
          {getMainSectionLabel()}
        </button>

        {/* Module Switcher Controls */}
        <div className={styles.moduleSelectorWrapper}>
          <button 
            className={styles.stepBtn}
            onClick={() => jumpToModule(modId - 1)}
            disabled={modId <= 1}
            title="Previous Module"
          >
            ◀ Prev
          </button>

          <select 
            className={styles.moduleSelectDropdown}
            value={modId}
            onChange={(e) => jumpToModule(e.target.value)}
            aria-label="Select Module"
          >
            {MODULE_LIST.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <button 
            className={styles.stepBtn}
            onClick={() => jumpToModule(modId + 1)}
            disabled={modId >= 18}
            title="Next Module"
          >
            Next ▶
          </button>
        </div>

        <button 
          className={styles.flowGraphBtn}
          onClick={() => navigate('/platform-flow')}
          title="View Full Platform Flow Graph"
        >
          <span>🗺️</span>
          <span>Flow Graph</span>
        </button>
      </div>

      {/* Mode Switcher Bar */}
      <div className={styles.secondaryRow}>
        <div className={styles.modeGroup}>
          <button
            className={`${styles.modeBtn} ${activeTab === 'video' ? styles.activeVideo : ''}`}
            onClick={() => navigate(`/test-video-playlist/${modId}`)}
            title={`Watch Recorded Videos for Module ${modId}`}
          >
            <span className={styles.btnIcon}>🎥</span>
            <span className={styles.btnText}>Recorded Videos</span>
          </button>

          <button
            className={`${styles.modeBtn} ${activeTab === 'material' ? styles.activeMaterial : ''}`}
            onClick={() => navigate(`/modules/${modId}`)}
            title={`Read Study Material for Module ${modId}`}
          >
            <span className={styles.btnIcon}>📖</span>
            <span className={styles.btnText}>Study Material</span>
          </button>

          <button
            className={`${styles.modeBtn} ${activeTab === 'quiz' ? styles.activeQuiz : ''}`}
            onClick={() => navigate(`/test-quiz-playlist/${modId}`)}
            title={`Take Quiz Practice for Module ${modId}`}
          >
            <span className={styles.btnIcon}>📝</span>
            <span className={styles.btnText}>Quiz Test</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ModuleQuickNav;
