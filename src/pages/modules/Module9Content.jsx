import React, { useState } from 'react';
import { MODULE9_CHAPTERS } from '../../data/module9Data';
import styles from './Module9Content.module.css';

const VISIBLE_COUNT = 6;

const Module9Content = () => {
  const [showAllPnr, setShowAllPnr] = useState(false);
  const [showAllTiming, setShowAllTiming] = useState(false);
  const [showAllSynthesis, setShowAllSynthesis] = useState(false);

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

  const pnrHeadings = MODULE9_CHAPTERS.slice(0, 10);
  const timingHeadings = MODULE9_CHAPTERS.slice(10, 23);
  const synthesisHeadings = MODULE9_CHAPTERS.slice(23);

  const renderSection = (headings, showAll, setShowAll, title) => (
    <div className={styles.navSection}>
      <h2 className={styles.navTitle}>{title}</h2>
      <div className={styles.navButtonsGrid}>
        {(showAll ? headings : headings.slice(0, VISIBLE_COUNT)).map((ch) => (
          <button
            key={ch.id}
            onClick={() => scrollToSection(ch.id)}
            className={styles.topicNavBtn}
            title={ch.title}
          >
            {ch.title}
          </button>
        ))}
      </div>
      {headings.length > VISIBLE_COUNT && (
        <div className={styles.toggleWrapper}>
          <button
            className={styles.toggleBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <><span className={styles.toggleIcon}>▲</span> See Less</>
            ) : (
              <><span className={styles.toggleIcon}>▼</span> See More <span className={styles.toggleCount}>+{headings.length - VISIBLE_COUNT}</span></>
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={styles.moduleLayout}
      onCopy={preventCopy}
      onContextMenu={preventCopy}
      onSelectStart={preventCopy}
      onDragStart={preventCopy}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Module 9 - Static Timing Analysis (STA) - 1</h1>
        <p className={styles.subtitle}>
          Master static timing analysis fundamentals. Deep-dive into physical design flows, logic synthesis, sequential circuit setups, setup and hold checks, clock variation uncertainties, and clock distribution.
        </p>
      </div>

      {/* Interactive Topics Covered Navigation Grid */}
      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(pnrHeadings, showAllPnr, setShowAllPnr, 'PNR & VLSI Design Flow')}
          {renderSection(timingHeadings, showAllTiming, setShowAllTiming, 'STA Concepts & Path Analysis')}
          {renderSection(synthesisHeadings, showAllSynthesis, setShowAllSynthesis, 'Synthesis & Clock Dynamics')}
        </div>
      </section>

      {/* Main Flow of Chapter Cards */}
      <main className={styles.mainContent}>
        {MODULE9_CHAPTERS.map((ch) => (
          <article key={ch.id} id={ch.id} className={styles.contentCard}>
            <h2 className={styles.chapterTitle}>{ch.title}</h2>
            <div
              className={styles.chapterBody}
              dangerouslySetInnerHTML={{ __html: ch.html }}
            />
          </article>
        ))}
      </main>
    </div>
  );
};

export default Module9Content;
