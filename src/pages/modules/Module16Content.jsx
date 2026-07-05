import React, { useState } from 'react';
import { MODULE16_CHAPTERS } from '../../data/module16Data';
import styles from './Module16Content.module.css';

const Module16Content = () => {
  const [activeGroup, setActiveGroup] = useState(0);

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

  return (
    <div
      className={styles.moduleLayout}
      onCopy={preventCopy}
      onContextMenu={preventCopy}
      onSelectStart={preventCopy}
      onDragStart={preventCopy}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Module 16 - OPT CTS</h1>
        <p className={styles.subtitle}>
          Visual lecture slides covering Post-CTS optimisation techniques, clock tree quality checks, timing closure strategies, and advanced OPT CTS flows used in physical design.
        </p>
      </div>

      {/* Navigation tabs */}
      <section className={styles.topicsNav}>
        <div className={styles.tabsRow}>
          {MODULE16_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              className={`${styles.tabBtn} ${activeGroup === idx ? styles.tabBtnActive : ''}`}
              onClick={() => { setActiveGroup(idx); scrollToSection(ch.id); }}
            >
              {ch.title}
            </button>
          ))}
        </div>
      </section>

      {/* Slide gallery */}
      <main className={styles.mainContent}>
        {MODULE16_CHAPTERS.map((ch, idx) => (
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

export default Module16Content;
