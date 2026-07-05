import React, { useState } from 'react';
import { MODULE27_CHAPTERS } from '../../data/module27Data';
import styles from './Module27Content.module.css';

const VISIBLE_COUNT = 6;

const Module27Content = () => {
  const [showAll1, setShowAll1] = useState(false);
  const [showAll2, setShowAll2] = useState(false);
  const [showAll3, setShowAll3] = useState(false);

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

  // 11 chapters split into 3 logical groups
  const group1 = MODULE27_CHAPTERS.slice(0, 6); // Setup & Synthesis
  const group2 = MODULE27_CHAPTERS.slice(6, 9); // Floorplan, Place, CTS
  const group3 = MODULE27_CHAPTERS.slice(9);    // Route & Handoff

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
        <button className={styles.seeMoreBtn} onClick={() => setShowAll(!showAll)}>
          {showAll ? 'See Less' : `See More (+${headings.length - VISIBLE_COUNT})`}
        </button>
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
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 className={styles.h1}>Module 27 - Physical Synthesis and PnR Flow in FC</h1>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(group1, showAll1, setShowAll1, 'Setup & Synthesis')}
          {renderSection(group2, showAll2, setShowAll2, 'Floorplan, Place, CTS')}
          {renderSection(group3, showAll3, setShowAll3, 'Route & Handoff')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE27_CHAPTERS.map((ch) => (
          <article key={ch.id} id={ch.id} className={styles.contentCard}>
            <h2 className={styles.h2}>{ch.title}</h2>
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

export default Module27Content;
