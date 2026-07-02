import React, { useState } from 'react';
import { TCL_SCRIPTS } from '../../data/tclScriptsData';
import styles from './Module58Content.module.css';

const Module58Content = () => {
  const [showAllFc, setShowAllFc] = useState(false);
  const [showAllInnovus, setShowAllInnovus] = useState(false);
  const [expandedQnas, setExpandedQnas] = useState({});

  const fcHeadings = TCL_SCRIPTS.filter(s => s.part === 1).map(s => ({
    id: s.id,
    text: `Script ${s.index}: ${s.title}`
  }));

  const innovusHeadings = TCL_SCRIPTS.filter(s => s.part === 2).map(s => ({
    id: s.id,
    text: `Script ${s.index}: ${s.title}`
  }));

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const preventCopy = (e) => {
    e.preventDefault();
  };

  const toggleQna = (key) => {
    setExpandedQnas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className={styles.moduleLayout} onCopy={preventCopy}>
      <div className={styles.header}>
        <h1 className={styles.title}>Module 58 - Industrial TCL Scripts</h1>
        <p className={styles.subtitle}>
          Production-grade automation suite for physical design (PnR) and timing closure (STA). Explore script objectives, explanations, execution flows, and interview questions.
        </p>
      </div>

      {/* Topics Covered Grid (Module 4 style) */}
      <div className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>FC Tool TCL Scripts (Part 1)</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllFc ? fcHeadings : fcHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {fcHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllFc(!showAllFc)} 
                className={styles.seeMoreBtn}
              >
                {showAllFc ? 'See Less' : `See More (+${fcHeadings.length - 8})`}
              </button>
            )}
          </div>

          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>INNOVUS Tool TCL Scripts (Part 2)</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllInnovus ? innovusHeadings : innovusHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {innovusHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllInnovus(!showAllInnovus)} 
                className={styles.seeMoreBtn}
              >
                {showAllInnovus ? 'See Less' : `See More (+${innovusHeadings.length - 8})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Flow */}
      <div className={styles.mainContent}>
        {TCL_SCRIPTS.map((script) => (
          <div key={script.id} id={script.id} className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <span className={styles.partBadge}>
                {script.toolName} - Script {script.index}
              </span>
              <h2 className={styles.h2}>
                {script.title}
              </h2>
            </div>
            
            <hr className={styles.divider} />

            {/* Objective Callout Box */}
            {script.objective && (
              <div className={styles.objectiveCallout}>
                <div className={styles.objectiveTitle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Objective
                </div>
                <div dangerouslySetInnerHTML={{ __html: script.objective }} />
              </div>
            )}

            {/* Code Terminal Box */}
            <div className={styles.terminal}>
              <div className={styles.terminalHeader}>
                <div className={styles.terminalDots}>
                  <span className={`${styles.terminalDot} ${styles.dotRed}`}></span>
                  <span className={`${styles.terminalDot} ${styles.dotYellow}`}></span>
                  <span className={`${styles.terminalDot} ${styles.dotGreen}`}></span>
                </div>
                <span className={styles.terminalTitle}>
                  {script.id.startsWith('fc') ? `fc_script_${script.index}.tcl` : `innovus_script_${script.index}.tcl`}
                </span>
              </div>
              <pre className={styles.codeBox}>
                <span className={styles.lineNumbers}>
                  {script.code.split('\n').map((_, index) => (
                    <span key={index} className={styles.lineNumber}>{index + 1}</span>
                  ))}
                </span>
                <div className={styles.codeScrollContainer}>
                  <code className={styles.codeContent}>{script.code}</code>
                </div>
              </pre>
            </div>

            {/* Step-by-Step Explanation */}
            {script.explanations && script.explanations.length > 0 && (
              <div className={styles.detailSection}>
                <h3 className={styles.h3}>Script Explanation</h3>
                <div className={styles.explanationList}>
                  {script.explanations.map((exp, i) => (
                    <div key={i} className={styles.expStepCard}>
                      <div className={styles.expStepTitle}>{exp.step}</div>
                      {exp.code && <div className={styles.expStepCode}>{exp.code}</div>}
                      <div className={styles.expStepText} dangerouslySetInnerHTML={{ __html: exp.explanation }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution Flow Diagram */}
            {script.flow && script.flow.length > 0 && (
              <div className={styles.detailSection}>
                <h3 className={styles.h3}>Execution Flow</h3>
                <div className={styles.flowContainer}>
                  {script.flow.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className={styles.flowNode}>{step}</div>
                      {i < script.flow.length - 1 && (
                        <div className={styles.flowArrow}>↓</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Why & Applications */}
            {((script.why && script.why.length > 0) || (script.applications && script.applications.length > 0)) && (
              <div className={styles.detailSection}>
                <div className={styles.whyAppsGrid}>
                  {script.why && script.why.length > 0 && (
                    <div>
                      <h3 className={styles.h3}>Why This Script?</h3>
                      <ul className={styles.bulletList}>
                        {script.why.map((w, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: w }} />
                        ))}
                      </ul>
                    </div>
                  )}
                  {script.applications && script.applications.length > 0 && (
                    <div>
                      <h3 className={styles.h3}>Applications</h3>
                      <ul className={styles.bulletList}>
                        {script.applications.map((app, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: app }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Interview Q&A Accordion */}
            {script.questions && script.questions.length > 0 && (
              <div className={styles.detailSection}>
                <h3 className={styles.h3}>Interview Questions</h3>
                <div className={styles.qnaList}>
                  {script.questions.map((qna, i) => {
                    const qnaKey = `${script.id}_qna_${i}`;
                    const isExpanded = !!expandedQnas[qnaKey];
                    return (
                      <div key={i} className={`${styles.qnaItem} ${isExpanded ? styles.qnaItemActive : ''}`}>
                        <button className={styles.qnaHeader} onClick={() => toggleQna(qnaKey)}>
                          <span>{qna.question}</span>
                          <span className={styles.qnaIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </span>
                        </button>
                        {isExpanded && (
                          <div className={styles.qnaBody} dangerouslySetInnerHTML={{ __html: qna.answer }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Industry Recommendation */}
            {script.recommendation && (
              <div className={styles.recommendationBox}>
                <div className={styles.recommendationTitle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Industry Recommendation
                </div>
                <div dangerouslySetInnerHTML={{ __html: script.recommendation }} />
              </div>
            )}

            {/* Extra Context Sections */}
            {script.extraContext && script.extraContext.map((extra, i) => (
              <div key={i} className={styles.extraSection}>
                <h3 className={styles.extraTitle}>{extra.title}</h3>
                <div className={styles.extraHtml} dangerouslySetInnerHTML={{ __html: extra.html }} />
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Module58Content;
