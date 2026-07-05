import React, { useState } from 'react';
import { MODULE25_CHAPTERS } from '../../data/module25Data';
import styles from './Module25Content.module.css';

const VISIBLE_COUNT = 6;

const Module25Content = () => {
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

  // 19 chapters split into 3 logical groups
  const group1 = MODULE25_CHAPTERS.slice(0, 7); // Intro up to Floorplan
  const group2 = MODULE25_CHAPTERS.slice(7, 15); // IO Planning up to Routing
  const group3 = MODULE25_CHAPTERS.slice(15); // Post-Route & Outputs

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
        <h1 className={styles.h1}>Module 25 - Step-By-Step PnR Execution in ICC2</h1>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(group1, showAll1, setShowAll1, 'Setup & Floorplan')}
          {renderSection(group2, showAll2, setShowAll2, 'Place, CTS & Route')}
          {renderSection(group3, showAll3, setShowAll3, 'Post-Route & Handoff')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE25_CHAPTERS.map((ch) => (
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

export default Module25Content;
