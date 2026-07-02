import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModulesList.module.css';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useAuth } from '../context/AuthContext';

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
  { id: 25, title: 'Complete PNR Execution In ICC2' },
  { id: 26, title: 'Complete PNR Execution In Innovus' },
  { id: 27, title: 'Complete PNR Execution In FC' },
  { id: 28, title: 'Timing Analysis User Guide' },
  { id: 29, title: 'Tempus User Guide' },
  { id: 30, title: 'Syn2PNR Flow Guide' },
  { id: 31, title: 'ICC Student Guide' },
  { id: 32, title: 'Star RC User Guide' },
  { id: 33, title: 'Voltus IC Power Integrity Solution User Guide' },
  { id: 34, title: 'All VLSI Questions and Answers' },
  { id: 35, title: 'Viva Questions on Synthesis' },
  { id: 36, title: 'PrimeTime Student Guide (2018 Version)' },
  { id: 37, title: 'PrimeTime Crosstalk Analysis Guide' },
  { id: 38, title: 'PrimeTime Tool User Guide' },
  { id: 39, title: 'PNR Notes & Best Practices' },
  { id: 40, title: 'PNR Debug & Fixes Guide' },
  { id: 41, title: 'Block Implementation Lab Guide' },
  { id: 42, title: 'Khaleel PNR Lab Practice Guide' },
  { id: 43, title: 'Complete Physical Design Flow Documentation' },
  { id: 44, title: 'Innovus TCR Reference Guide' },
  { id: 45, title: 'ICC2 Tool User Guide' },
  { id: 46, title: 'Genus Synthesis Tool User Guide' },
  { id: 47, title: 'Fusion Compiler User Guide' },
  { id: 48, title: 'Formality User Guide' },
  { id: 49, title: 'Digital Logic & Design Interview Preparation' },
  { id: 50, title: 'Design Compiler (DC) Tool User Guide' },
  { id: 51, title: 'DB Get Useful Commands Reference' },
  { id: 52, title: 'ICC2 Flow Implementation Guide' },
  { id: 53, title: 'Complete Synthesis Flow Documentation' },
  { id: 54, title: 'Block-Level Implementation Workshop Guide' },
  { id: 55, title: 'Basic GVIM Commands for Faster Workflow' },
  { id: 56, title: 'Application Options & Attributes Reference' },
  { id: 57, title: 'Innovus User Guide (Full Version)' },
  { id: 58, title: 'Industrial TCL Scripts' },
  { id: 59, title: 'Direct ATS Global Jobs (Automation)' }
];

const ModulesList = () => {
  const { profile } = useAuth() || {};
  const isFuture = (ts) => ts && new Date(ts).getTime() > Date.now();
  const courseValid = profile && profile.course_active && isFuture(profile.course_expiry);

  return (
    <div className={styles.modulesPage}>
      <SEO 
        title="Learning Modules" 
        description="Explore 59 comprehensive modules covering the entire VLSI Physical Design flow, from Electronics Fundamentals to Physical Verification & Signoff."
        url="/modules"
        structuredData = {
          <StructuredData 
            breadcrumb={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vlsiphysicaldesignocean.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Modules",
                  "item": "https://vlsiphysicaldesignocean.com/modules"
                }
              ]
            }}
          />
        }
      />
      <header className={styles.moduleHeader}>
        <h1>VLSI Physical Design Ocean Modules</h1>
        <p>Master the intricacies of chip design with our comprehensive, structured learning path. From silicon fundamentals to final sign-off.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}>📚</span>
            59 Modules
          </div>
          <div className={styles.statPill}>
            <span className={styles.statIcon}>⏱️</span>
            120+ Hours
          </div>
        </div>
      </header>

      <div className={styles.modulesGrid}>
        {modulesData.map((mod) => {
          const isPaidModule = mod.id >= 9;
          const targetUrl = (courseValid && isPaidModule) ? `/paid-modules/module/${mod.id}` : `/modules/${mod.id}`;
          return (
            <Link key={mod.id} to={targetUrl} className={styles.moduleLink}>
              <div className={styles.moduleCard}>
                <div className={styles.moduleBadge}>
                  Module {mod.id} {isPaidModule ? (courseValid ? '🔓' : '🔒') : ''}
                </div>
                <h3>{mod.title}</h3>
                <div className={styles.cardAccent}></div>
              </div>
            </Link>
          );
        })}
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
