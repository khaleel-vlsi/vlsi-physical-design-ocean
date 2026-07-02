import React, { useState } from 'react';
import { MODULE12_CHAPTERS } from '../../data/module12Data';
import styles from './Module12Content.module.css';

const VISIBLE_COUNT = 6;

const Module12Content = () => {
  const [showAllInputs, setShowAllInputs] = useState(false);
  const [showAllPower, setShowAllPower] = useState(false);
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

  const preventCopy = (e) => {
    e.preventDefault();
  };

  const inputsHeadings = MODULE12_CHAPTERS.slice(0, 10);
  const powerHeadings = MODULE12_CHAPTERS.slice(10, 13);
  const checksHeadings = MODULE12_CHAPTERS.slice(13);

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
        <h1 className={styles.title}>Module 12 - PNR Inputs & Sanity Checks</h1>
        <p className={styles.subtitle}>
          Master the inputs required for physical design. Deep-dive into Gate Level Netlists, SDC Constraints, Logical/Physical Libraries (LEF), Power Intent (UPF/CPF), and critical Sanity/Design Checks.
        </p>
      </div>

      {/* Interactive Topics Covered Navigation Grid */}
      <section className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {renderSection(inputsHeadings, showAllInputs, setShowAllInputs, 'Libraries & Constraints')}
          {renderSection(powerHeadings, showAllPower, setShowAllPower, 'Power Intent & Activities')}
          {renderSection(checksHeadings, showAllChecks, setShowAllChecks, 'Sanity Checks & Verification')}
        </div>
      </section>

      {/* Main Flow of Chapter Cards */}
      <main className={styles.mainContent}>
        {MODULE12_CHAPTERS.map((ch) => (
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

export default Module12Content;
