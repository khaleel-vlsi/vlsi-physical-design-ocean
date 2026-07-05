import React, { useState } from 'react';
import { MODULE15_CHAPTERS } from '../../data/module15Data';
import styles from './Module15Content.module.css';

const VISIBLE_COUNT = 6;

const Module15Content = () => {
  const [showAllCts, setShowAllCts] = useState(false);
  const [showAllRouting, setShowAllRouting] = useState(false);
  const [showAllOptimization, setShowAllOptimization] = useState(false);

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

  const preventCopy = (e) => e.preventDefault();

  // 19 chapters split into 3 logical groups
  const ctsHeadings          = MODULE15_CHAPTERS.slice(0, 7);   // Goals, Clock Trees, Skew Groups
  const routingHeadings      = MODULE15_CHAPTERS.slice(7, 14);  // Useful Skew, Routing, IO Latency
  const optimizationHeadings = MODULE15_CHAPTERS.slice(14);     // Post CTS, Reports, Hold Fix

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
          <button className={styles.toggleBtn} onClick={() => setShowAll(!showAll)}>
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
        <h1 className={styles.title}>Module 15 - Clock Tree Synthesis (CTS)</h1>
        <p className={styles.subtitle}>
          Master clock tree synthesis including goals, clock tree types, skew groups, useful skew, clock routing techniques, post-CTS optimization, output reports, and hold violation fixes.
        </p>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(ctsHeadings, showAllCts, setShowAllCts, 'CTS Goals & Clock Trees')}
          {renderSection(routingHeadings, showAllRouting, setShowAllRouting, 'Skew, Routing & Latency')}
          {renderSection(optimizationHeadings, showAllOptimization, setShowAllOptimization, 'Post-CTS & Hold Fix')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE15_CHAPTERS.map((ch) => (
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

export default Module15Content;
