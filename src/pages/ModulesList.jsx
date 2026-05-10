import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModulesList.module.css';

const modulesData = [
  { id: 1, title: 'Introduction to Electronics' },
  { id: 2, title: 'MOSFET & CMOS Theory' },
  { id: 3, title: 'Digital Electronics' },
  { id: 4, title: 'Linux & Basic Tcl Script' },
  { id: 5, title: 'RTL Coding using Verilog' },
  { id: 6, title: 'Logical Synthesis' },
  { id: 7, title: 'Design For Testability' },
  { id: 8, title: 'Physical Synthesis' },
  { id: 9, title: 'Static Timing Analysis - 1' },
  { id: 10, title: 'Static Timing Analysis - 2' },
  { id: 11, title: 'Static Timing Analysis - 3' },
  { id: 12, title: 'PNR Inputs & Sanity Checks' },
  { id: 13, title: 'FloorPlan & PowerPlan' },
  { id: 14, title: 'Placement' },
  { id: 15, title: 'Clock Tree Synthesis - 1' },
  { id: 16, title: 'Clock Tree Synthesis - 2' },
  { id: 17, title: 'Routing' },
  { id: 18, title: 'Physical Verification & Signoff' },
  { id: 19, title: 'Core Interview Questions' },
  { id: 20, title: 'Interview Questions (RTL, Synth, DFT, STA)' },
  { id: 21, title: 'Physical Design (PNR) Interview Questions' },
  { id: 22, title: 'Physical Verification & Signoff Interview Questions' },
  { id: 23, title: 'Certification' },
  { id: 24, title: 'Resume Templates for Freshers & Experienced' },
  { id: 25, title: 'Complete PNR Execution In ICC2, Innovus, FC' },
  { id: 26, title: 'All Synopsys and Cadence user guides and study materials' }
];

const ModulesList = () => {
  return (
    <div className={styles.modulesPage}>
      <header className={styles.moduleHeader}>
        <h1>VLSI Physical Design Ocean Modules</h1>
        <p>Master the intricacies of chip design with our comprehensive, structured learning path. From silicon fundamentals to final sign-off.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}>📚</span>
            26 Modules
          </div>
          <div className={styles.statPill}>
            <span className={styles.statIcon}>⏱️</span>
            120+ Hours
          </div>
        </div>
      </header>

      <div className={styles.modulesGrid}>
        {modulesData.map((mod) => (
          <Link key={mod.id} to={`/modules/${mod.id}`} className={styles.moduleLink}>
            <div className={styles.moduleCard}>
              <div className={styles.moduleBadge}>Module {mod.id}</div>
              <h3>{mod.title}</h3>
              <div className={styles.cardAccent}></div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.labCard}>
          <div className={styles.labCardInner}>
            <span className={styles.labTag}>ADVANCED LAB</span>
            <h2>Hands-on PNR Execution</h2>
            <p>Master industry-standard tools like Innovus and IC Compiler II in our immersive virtual lab environment.</p>
          </div>
        </div>
        
        <div className={styles.certCard}>
          <div className={styles.certIcon}>🛡️</div>
          <h2>Industry Certified</h2>
          <p>Our curriculum is designed in collaboration with leading semiconductor firms to ensure you're ready for the most demanding physical design roles.</p>
          <button className={styles.certButton}>View Certification Path</button>
        </div>
      </div>
    </div>
  );
};

export default ModulesList;
