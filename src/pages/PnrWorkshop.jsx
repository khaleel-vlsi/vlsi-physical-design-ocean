import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudyMaterials.module.css'; // Reusing the premium grid styling
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useAuth } from '../context/AuthContext';

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    {path}
  </svg>
);

const LockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;
const UnlockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;

// A workshop/gears icon
const WorkshopIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />;

const pnrWorkshopModules = [
  { id: 30, title: 'Syn2PNR Flow Guide', desc: 'Synthesis to PNR integration flow instructions.', icon: WorkshopIcon },
  { id: 31, title: 'ICC Student Guide', desc: 'IC Compiler reference for students.', icon: WorkshopIcon },
  { id: 37, title: 'PrimeTime Crosstalk Analysis Guide', desc: 'Advanced SI and Crosstalk analysis in PT.', icon: WorkshopIcon },
  { id: 39, title: 'PNR Notes & Best Practices', desc: 'Industry best practices for physical design.', icon: WorkshopIcon },
  { id: 40, title: 'PNR Debug & Fixes Guide', desc: 'Common issues and proven solutions.', icon: WorkshopIcon },
  { id: 41, title: 'Block Implementation Lab Guide', desc: 'Step-by-step block level implementation.', icon: WorkshopIcon },
  { id: 42, title: 'Khaleel PNR Lab Practice Guide', desc: 'Specialized lab practice procedures.', icon: WorkshopIcon },
  { id: 43, title: 'Complete Physical Design Flow Documentation', desc: 'End-to-end flow documentation.', icon: WorkshopIcon },
  { id: 52, title: 'ICC2 Flow Implementation Guide', desc: 'Implementation flow specifics for ICC2.', icon: WorkshopIcon },
  { id: 54, title: 'Block-Level Implementation Workshop Guide', desc: 'Workshop materials and reference.', icon: WorkshopIcon },
  { id: 55, title: 'Basic GVIM Commands for Faster Workflow', desc: 'VIM shortcuts and text editing.', icon: WorkshopIcon }
];

const PnrWorkshop = () => {
  const { hasPremiumAccess } = useAuth() || {};

  return (
    <div className={styles.container}>
      <SEO 
        title="PNR Workshop" 
        description="Complete real project implementation workshops, lab guides, best practices, and debug manuals."
        url="/pnr-workshop"
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
                  "name": "PNR Workshop",
                  "item": "https://vlsiphysicaldesignocean.com/pnr-workshop"
                }
              ]
            }}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>REAL PROJECTS</div>
        <h1 className={styles.mainTitle}>PNR WORKSHOP</h1>
        <p className={styles.description}>Access comprehensive real project implementation workshops, lab guides, debugging manuals, and industry best practices.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />} /></span>
            11 Workshop Modules
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {pnrWorkshopModules.map((mod) => {
          const targetUrl = hasPremiumAccess ? `/paid-modules/module/${mod.id}` : `/modules/${mod.id}`;
          return (
            <Link key={mod.id} to={targetUrl} className={styles.cardLink}>
              <div className={styles.cardWrapper}>
                <div className={styles.cardInner}>
                  <div className={styles.badgeRow}>
                    <div className={styles.moduleBadge}>MODULE {mod.id}</div>
                    <div className={`${styles.accessIcon} ${hasPremiumAccess ? styles.unlocked : styles.locked}`}>
                      {hasPremiumAccess ? <UnlockedIcon /> : <LockedIcon />}
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

export default PnrWorkshop;
