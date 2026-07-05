import React, { useState } from 'react';
import { MODULE13_CHAPTERS } from '../../data/module13Data';
import styles from './Module13Content.module.css';

const VISIBLE_COUNT = 6;

const Module13Content = () => {
  const [showAllFloorplan, setShowAllFloorplan] = useState(false);
  const [showAllPower, setShowAllPower] = useState(false);
  const [showAllMMMC, setShowAllMMMC] = useState(false);

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

  // 102 chapters split into 3 logical groups
  const floorplanHeadings = MODULE13_CHAPTERS.slice(0, 34);   // Floorplan concepts
  const powerHeadings = MODULE13_CHAPTERS.slice(34, 68);      // Power planning
  const mmmcHeadings = MODULE13_CHAPTERS.slice(68);           // MMMC / ICC2 / IO / Macros

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
        <h1 className={styles.title}>Module 13 - Floorplan &amp; Power Plan</h1>
        <p className={styles.subtitle}>
          Master floorplanning fundamentals, power planning strategies, MMMC analysis, IC Compiler II architecture, macro placement, blockages, I/O pads, and power grid design.
        </p>
      </div>

      {/* Interactive Topics Navigation Grid */}
      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(floorplanHeadings, showAllFloorplan, setShowAllFloorplan, 'Floorplan Concepts')}
          {renderSection(powerHeadings, showAllPower, setShowAllPower, 'Power Planning')}
          {renderSection(mmmcHeadings, showAllMMMC, setShowAllMMMC, 'MMMC, ICC2 & IO')}
        </div>
      </section>

      {/* Main Flow of Chapter Cards */}
      <main className={styles.mainContent}>
        {MODULE13_CHAPTERS.map((ch) => (
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

export default Module13Content;
