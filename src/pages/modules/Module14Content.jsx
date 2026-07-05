import React, { useState } from 'react';
import { MODULE14_CHAPTERS } from '../../data/module14Data';
import styles from './Module14Content.module.css';

const VISIBLE_COUNT = 6;

const Module14Content = () => {
  const [showAllPlacement, setShowAllPlacement] = useState(false);
  const [showAllCongestion, setShowAllCongestion] = useState(false);
  const [showAllChecks, setShowAllChecks] = useState(false);

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

  // 44 chapters split into 3 logical groups
  const placementHeadings  = MODULE14_CHAPTERS.slice(0, 15);  // Placement & Bounds
  const congestionHeadings = MODULE14_CHAPTERS.slice(15, 30); // Congestion Analysis
  const checksHeadings     = MODULE14_CHAPTERS.slice(30);     // Scan Chain, Density, Checks

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
        <h1 className={styles.title}>Module 14 - Placement</h1>
        <p className={styles.subtitle}>
          Master cell placement fundamentals including pre-placement, coarse and detailed placement, legalization, magnet placement, bounds, congestion analysis &amp; reduction, scan chain reordering, and placement checks.
        </p>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(placementHeadings,  showAllPlacement,  setShowAllPlacement,  'Placement & Bounds')}
          {renderSection(congestionHeadings, showAllCongestion, setShowAllCongestion, 'Congestion Analysis')}
          {renderSection(checksHeadings,     showAllChecks,     setShowAllChecks,     'Scan Chain, Density & Checks')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE14_CHAPTERS.map((ch) => (
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

export default Module14Content;
