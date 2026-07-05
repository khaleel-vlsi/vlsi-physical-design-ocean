import React, { useState } from 'react';
import { MODULE17_CHAPTERS } from '../../data/module17Data';
import styles from './Module17Content.module.css';

const VISIBLE_COUNT = 6;

const Module17Content = () => {
  const [showAllRouting, setShowAllRouting] = useState(false);
  const [showAllCellsDef, setShowAllCellsDef] = useState(false);
  const [showAllNetlistSpef, setShowAllNetlistSpef] = useState(false);

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

  // 57 chapters split into 3 logical groups
  const routingHeadings      = MODULE17_CHAPTERS.slice(0, 19);  // Antenna Effect & Routing Basics
  const cellsDefHeadings     = MODULE17_CHAPTERS.slice(19, 38); // Decap, Filler, DEF, GDS
  const netlistSpefHeadings  = MODULE17_CHAPTERS.slice(38);     // Netlist, SPEF, SDF

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
        <h1 className={styles.title}>Module 17 - Routing & Signoff Formats</h1>
        <p className={styles.subtitle}>
          Master routing principles, antenna effect prevention, signal integrity optimization, DEF/GDS formats, and signoff standards including Gate-Level Netlists and SPEF.
        </p>
      </div>

      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(routingHeadings, showAllRouting, setShowAllRouting, 'Routing & Antenna Effect')}
          {renderSection(cellsDefHeadings, showAllCellsDef, setShowAllCellsDef, 'Decaps, Fillers & DEF/GDS')}
          {renderSection(netlistSpefHeadings, showAllNetlistSpef, setShowAllNetlistSpef, 'Netlist & SPEF')}
        </div>
      </section>

      <main className={styles.mainContent}>
        {MODULE17_CHAPTERS.map((ch) => (
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

export default Module17Content;
