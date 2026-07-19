import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudyMaterials.module.css';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useAuth } from '../context/AuthContext';

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    {path}
  </svg>
);

const DocIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />;
const LockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;
const UnlockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;

const studyMaterialModules = [
  { id: 1, title: 'Introduction to Electronics', desc: 'Basic electronics fundamentals and semiconductor physics.', icon: DocIcon },
  { id: 2, title: 'MOSFET & CMOS Theory', desc: 'Deep dive into transistor operation and CMOS fabrication.', icon: DocIcon },
  { id: 3, title: 'Digital Electronics', desc: 'Logic gates, boolean algebra, and sequential circuits.', icon: DocIcon },
  { id: 4, title: 'Linux & Basic Tcl Script', desc: 'Essential OS commands and scripting for VLSI.', icon: DocIcon },
  { id: 5, title: 'RTL Coding using Verilog', desc: 'Hardware description language basics and RTL design.', icon: DocIcon },
  { id: 6, title: 'Logical Synthesis', desc: 'Converting RTL into technology-mapped gate-level netlists.', icon: DocIcon },
  { id: 7, title: 'Design For Testability', desc: 'DFT concepts, scan insertion, and fault models.', icon: DocIcon },
  { id: 8, title: 'Physical Synthesis', desc: 'Placement-aware synthesis and optimization techniques.', icon: DocIcon },
  { id: 9, title: 'Static Timing Analysis - 1', desc: 'Fundamentals of STA, setup/hold checks, and constraints.', icon: DocIcon },
  { id: 10, title: 'Static Timing Analysis - 2', desc: 'Advanced STA concepts, crosstalk, and OCV.', icon: DocIcon },
  { id: 11, title: 'Static Timing Analysis - 3', desc: 'Signoff timing closure and ECO generation.', icon: DocIcon },
  { id: 12, title: 'PNR Inputs & Sanity Checks', desc: 'Library preparation, netlist sanity, and SDC validation.', icon: DocIcon },
  { id: 13, title: 'FloorPlan & PowerPlan', desc: 'Macro placement, IO rings, and robust power grid design.', icon: DocIcon },
  { id: 14, title: 'Placement', desc: 'Standard cell placement and congestion mitigation.', icon: DocIcon },
  { id: 15, title: 'Clock Tree Synthesis - 1', desc: 'Building zero-skew clock networks and balancing.', icon: DocIcon },
  { id: 16, title: 'Clock Tree Synthesis - 2', desc: 'Advanced CTS routing, NDR rules, and power optimization.', icon: DocIcon },
  { id: 17, title: 'Routing', desc: 'Global and detail routing, fixing DRCs and antennas.', icon: DocIcon },
  { id: 18, title: 'Physical Verification & Signoff', desc: 'Final DRC/LVS/ERC checks and tapeout readiness.', icon: DocIcon }
];

const StudyMaterials = () => {
  const { hasPremiumAccess } = useAuth() || {};

  return (
    <div className={styles.container}>
      <SEO 
        title="Study Materials" 
        description="Comprehensive study materials for Physical Design from STA to Physical Verification."
        url="/study-materials"
        structuredData={
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
                  "name": "Study Materials",
                  "item": "https://vlsiphysicaldesignocean.com/study-materials"
                }
              ]
            }}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>CORE THEORY</div>
        <h1 className={styles.mainTitle}>STUDY MATERIALS</h1>
        <p className={styles.description}>Access premium, well-structured notes, flow diagrams, and deep-dive reference materials covering the entire ASIC Physical Design flow.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />} /></span>
            18 Comprehensive Modules
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {studyMaterialModules.map((mod) => {
          const isFree = mod.id <= 8;
          const isUnlocked = isFree || hasPremiumAccess;
          
          let targetUrl = `/modules/${mod.id}`;
          if (!isFree && hasPremiumAccess) {
            targetUrl = `/paid-modules/module/${mod.id}`;
          }

          return (
            <Link key={mod.id} to={targetUrl} className={styles.cardLink}>
              <div className={styles.cardWrapper}>
                <div className={styles.cardInner}>
                  <div className={styles.badgeRow}>
                    <div className={styles.moduleBadge}>MODULE {mod.id}</div>
                    <div className={`${styles.accessIcon} ${isUnlocked ? styles.unlocked : styles.locked}`}>
                      {isUnlocked ? <UnlockedIcon /> : <LockedIcon />}
                    </div>
                  </div>
                  <div className={styles.iconBox}>
                    <Icon path={mod.icon} />
                  </div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                  <div className={styles.cardAccent}></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StudyMaterials;
