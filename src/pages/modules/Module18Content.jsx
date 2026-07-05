import React, { useState } from 'react';
import { MODULE18_CHAPTERS } from '../../data/module18Data';
import styles from './Module18Content.module.css';

const VISIBLE_COUNT = 6;

const Module18Content = () => {
  const [showAllEco, setShowAllEco] = useState(false);
  const [showAllScripts, setShowAllScripts] = useState(false);
  const [showAllPv, setShowAllPv] = useState(false);

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

  // 24 chapters split into 3 logical groups
  const ecoHeadings     = MODULE18_CHAPTERS.slice(0, 12);  // ECO Fundamentals & Flow
  const scriptsHeadings = MODULE18_CHAPTERS.slice(12, 15); // ECO Scripts & Commands
  const pvHeadings      = MODULE18_CHAPTERS.slice(15);     // Physical Verification

  const renderSection = (headings, showAll, setShowAll, title) => (
    <div className={styles.navSection}>
      <h2 className={styles.navTitle}>{title}</h2>
      <div className={styles.navButtonsGrid}>
        {(showAll ? headings : headings.slice(0, Math.min(VISIBLE_COUNT, headings.length))).map((ch) => (
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
        <h1 className={styles.title}>Module 18 - PV and Signoff</h1>
        <p className={styles.subtitle}>
          Engineering Change Order (ECO) workflows, script implementations for ICC2, and comprehensive Physical Verification including DRC, LVS, Antenna, and ERC checks.
        </p>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(ecoHeadings, showAllEco, setShowAllEco, 'ECO Fundamentals')}
          {renderSection(scriptsHeadings, showAllScripts, setShowAllScripts, 'ECO Scripts')}
          {renderSection(pvHeadings, showAllPv, setShowAllPv, 'Physical Verification')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE18_CHAPTERS.map((ch) => (
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

export default Module18Content;
