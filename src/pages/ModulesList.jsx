import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModulesList.module.css';

const modulesData = [
  { id: 1, title: 'Module 1', description: 'Introduction to Electronics' },
  { id: 2, title: 'Module 2', description: 'MOSFET & CMOS Theory' },
  { id: 3, title: 'Module 3', description: 'Digital Electronics' },
  { id: 4, title: 'Module 4', description: 'Linux & Basic Tcl Script' },
  { id: 5, title: 'Module 5', description: 'RTL Coding using Verilog' },
  { id: 6, title: 'Module 6', description: 'Logical Synthesis' },
  { id: 7, title: 'Module 7', description: 'Design For Testability' },
  { id: 8, title: 'Module 8', description: 'Physical Synthesis' },
  { id: 9, title: 'Module 9', description: 'Static Timing Analysis - 1' },
  { id: 10, title: 'Module 10', description: 'Static Timing Analysis - 2' },
  { id: 11, title: 'Module 11', description: 'Static Timing Analysis - 3' },
  { id: 12, title: 'Module 12', description: 'PNR Inputs & Sanity Checks' },
  { id: 13, title: 'Module 13', description: 'FloorPlan & PowerPlan' },
  { id: 14, title: 'Module 14', description: 'Placement' },
  { id: 15, title: 'Module 15', description: 'Clock Tree Synthesis - 1' },
  { id: 16, title: 'Module 16', description: 'Clock Tree Synthesis - 2' },
  { id: 17, title: 'Module 17', description: 'Routing' },
  { id: 18, title: 'Module 18', description: 'Physical Verification & Signoff' },
  { id: 19, title: 'Module 19', description: 'Core Interview Questions' },
  { id: 20, title: 'Module 20', description: 'Interview Questions (RTL, Synth, DFT, STA)' },
  { id: 21, title: 'Module 21', description: 'Physical Design (PNR) Interview Questions' },
  { id: 22, title: 'Module 22', description: 'Physical Verification & Signoff Interview Questions' },
  { id: 23, title: 'Module 23', description: 'Certification' },
  { id: 24, title: 'Module 24', description: 'Resume Templates for Freshers & Experienced' },
  { id: 25, title: 'Module 25', description: 'Complete PNR Execution In ICC2, Innovus, FC' },
  { id: 26, title: 'Module 26', description: 'All Synopsis and Cadence user guides and study materials' }
];

const ModulesList = () => {
  return (
    <>
      <header className={styles.moduleHeader}>
        <h1>VLSI Physical Design Ocean Modules</h1>
        <p>Complete syllabus structured module-wise</p>
      </header>

      <div className={styles.modulesContainer}>
        {modulesData.map((mod) => (
          <Link key={mod.id} to={`/modules/${mod.id}`} className={styles.moduleLink}>
            <div className={styles.moduleCard}>
              <h3>{mod.title}</h3>
              <p>{mod.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ModulesList;
