import React from 'react';
import styles from './Module11Content.module.css';

const Module11Content = () => {
  const preventCopy = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.moduleLayout}
      onCopy={preventCopy}
      onContextMenu={preventCopy}
      onSelectStart={preventCopy}
      onDragStart={preventCopy}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>Module 11 — Static Timing Analysis (STA) - 3</h1>
        <p className={styles.subtitle}>
          Advanced STA Concepts: On-Chip Variation (OCV / AOCV / POCV), CRPR, MCMM Timing Signoff, Crosstalk Noise & Glitch Analysis.
        </p>
      </div>

      <main className={styles.mainContent}>
        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>1. On-Chip Variation (OCV / AOCV / POCV)</h2>
          <div className={styles.chapterBody}>
            <p>
              Process, Voltage, and Temperature (PVT) variations occur across different physical regions on the same silicon die:
            </p>
            <ul>
              <li><strong>Flat OCV:</strong> Applies a global fixed derate factor (e.g., ±10%) across all standard cells. Highly pessimistic.</li>
              <li><strong>Advanced OCV (AOCV):</strong> Derate factor scales dynamically based on path depth (number of gates in logic chain) and spatial distance.</li>
              <li><strong>Parametric OCV (POCV / Statistical OCV):</strong> Models cell delay as a statistical normal distribution with mean (&mu;) and standard deviation (&sigma;).</li>
            </ul>
            <div className={styles.codeBlock}>
{`POCV Cell Delay Formula:
  Delay = Mean_Delay (μ) + C * StdDev (σ)
  where C = 3.0 for 3-sigma statistical timing signoff.`}
            </div>
          </div>
        </article>

        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>2. CRPR (Clock Reconvergence Pessimism Removal)</h2>
          <div className={styles.chapterBody}>
            <p>
              When evaluating setup and hold paths, the launch clock path and capture clock path share common buffer trees up to the common clock node (CPN).
            </p>
            <p>
              Because the same physical buffer cannot simultaneously experience early and late PVT variations, static timing tools apply <strong>CRPR (Clock Reconvergence Pessimism Removal)</strong> to credit back the artificial pessimistic delay difference along the shared clock path segment.
            </p>
          </div>
        </article>

        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>3. Multi-Corner Multi-Mode (MCMM) Analysis</h2>
          <div className={styles.chapterBody}>
            <p>
              Modern deep sub-micron chips operate across multiple operating modes (e.g. High Performance, Low Power Sleep, Test Mode) and process corners (SS, FF, TT):
            </p>
            <ul>
              <li><strong>Setup Signoff Corner:</strong> Slow-Slow (SS) process, Low Voltage (0.9V), High Temp (+125°C). Max path delay constraint.</li>
              <li><strong>Hold Signoff Corner:</strong> Fast-Fast (FF) process, High Voltage (1.1V), Low Temp (-40°C). Min path delay constraint.</li>
              <li><strong>Crosstalk Noise & Delay:</strong> Aggressor nets coupling capacitance to victim nets causing delta-delay or functional glitches.</li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Module11Content;
