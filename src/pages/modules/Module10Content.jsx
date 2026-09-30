import React from 'react';
import styles from './Module10Content.module.css';

const Module10Content = () => {
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
        <h1 className={styles.title}>Module 10 — Static Timing Analysis (STA) - 2</h1>
        <p className={styles.subtitle}>
          Timing Path Optimization, Debug Methodology, Setup/Hold Fixing Strategies, Buffer Insertion, Gate Sizing, and Useful Skew Engineering.
        </p>
      </div>

      <main className={styles.mainContent}>
        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>1. Structure of an Industrial STA Report</h2>
          <div className={styles.chapterBody}>
            <p>
              An OpenSTA or PrimeTime timing report breaks down the total path delay into data path components and clock path components. Key sections include:
            </p>
            <ul>
              <li><strong>Startpoint:</strong> Launch register clock pin or input port.</li>
              <li><strong>Endpoint:</strong> Capture register data pin or output port.</li>
              <li><strong>Path Group:</strong> Clock domain governing the launch and capture registers.</li>
              <li><strong>Path Type:</strong> Max (setup) or Min (hold) analysis.</li>
            </ul>
            <div className={styles.codeBlock}>
{`Startpoint: u_reg_pc/CLK (rising edge-triggered DFF)
Endpoint:   u_reg_res/D (rising edge-triggered DFF)
Path Group: clk_in | Corner: Fast-Fast (FF) / 1.1V / -40C
Path Type:  max (setup)

  Data Required Time:                          1.921 ns
  Data Arrival Time:                          -0.903 ns
-------------------------------------------------------------------
  Slack (MET):                                +1.018 ns`}
            </div>
          </div>
        </article>

        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>2. Setup & Hold Violation Debug Methodology</h2>
          <div className={styles.chapterBody}>
            <p>
              <strong>Setup Violation (Max Path):</strong> Occurs when data arrives <em>too late</em> at the capture flip-flop after the setup window.
            </p>
            <p className={styles.codeBlock}>
              Data Arrival Time &gt; Data Required Time &nbsp;⇒&nbsp; Negative Slack (WNS &lt; 0)
            </p>
            <p>
              <strong>Fixing Setup Violations:</strong>
            </p>
            <ul>
              <li><strong>Gate Sizing:</strong> Upsize drive strength of cells along the critical data path (e.g. NAND2_X1 → NAND2_X4).</li>
              <li><strong>Buffer Insertion:</strong> Replace high-fanout long net nets with repeater buffers to reduce wire RC delay.</li>
              <li><strong>Useful Skew:</strong> Intentionally delay the capture clock pin (positive skew) or advance launch clock pin.</li>
              <li><strong>VT Swapping:</strong> Swap High-VT (HVT) cells to Low-VT (LVT) or Ultra-Low-VT (ULVT) for faster switching speeds.</li>
            </ul>
          </div>
        </article>

        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>3. Hold Violation Fixing Techniques</h2>
          <div className={styles.chapterBody}>
            <p>
              <strong>Hold Violation (Min Path):</strong> Occurs when data changes <em>too quickly</em> before the capture flip-flop can sample the current value.
            </p>
            <p className={styles.codeBlock}>
              Data Arrival Time &lt; Data Required Time &nbsp;⇒&nbsp; Hold Slack &lt; 0
            </p>
            <p>
              <strong>Fixing Hold Violations:</strong>
            </p>
            <ul>
              <li><strong>Insert Delay Buffers:</strong> Insert delay buffers or delay cells on the data path without affecting setup slack on parallel paths.</li>
              <li><strong>Downsizing:</strong> Downsize launch DFF drive strength to add subtle delay.</li>
              <li><strong>HVT Swapping:</strong> Replace fast LVT cells with HVT cells on min paths to add propagation delay.</li>
            </ul>
          </div>
        </article>

        <article className={styles.contentCard}>
          <h2 className={styles.chapterTitle}>4. Clock Path vs Data Path Analysis</h2>
          <div className={styles.chapterBody}>
            <p>
              The clock tree distribution network delivers clock edges across thousands of flip-flops. Clock latency imbalances between the launch DFF and capture DFF create <strong>clock skew</strong>:
            </p>
            <ul>
              <li><strong>Positive Skew (T_launch &lt; T_capture):</strong> Helps setup time, degrades hold time.</li>
              <li><strong>Negative Skew (T_launch &gt; T_capture):</strong> Degrades setup time, helps hold time.</li>
              <li><strong>Useful Skew:</strong> Modern PnR tools auto-tune clock buffer insertion to balance slack across failing timing endpoints.</li>
            </ul>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Module10Content;
