import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudyMaterials.module.css'; // Reusing the same premium grid styling
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

const pnrExecutionModules = [
  { id: 25, title: 'Complete PNR Execution In ICC2', desc: 'Full chip implementation flow using Synopsys IC Compiler II.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" /> },
  { id: 26, title: 'Complete PNR Execution In Innovus', desc: 'Full chip implementation flow using Cadence Innovus Implementation System.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /> },
  { id: 27, title: 'Complete PNR Execution In FC', desc: 'Full chip implementation flow using Synopsys Fusion Compiler.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36 6 6 0 11-5.04-10.14" /> }
];

const PnrExecution = () => {
  const { hasPremiumAccess } = useAuth() || {};

  return (
    <div className={styles.container}>
      <SEO 
        title="PNR Execution" 
        description="Hands-on Place & Route implementation using industry-standard EDA tools like ICC2, Innovus, and Fusion Compiler."
        url="/pnr-execution"
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
                  "name": "PNR Execution",
                  "item": "https://vlsiphysicaldesignocean.com/pnr-execution"
                }
              ]
            }}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>PRACTICAL LABS</div>
        <h1 className={styles.mainTitle}>PNR EXECUTION</h1>
        <p className={styles.description}>Master hands-on Place & Route implementation using top industry-standard EDA tools from Synopsys and Cadence.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />} /></span>
            3 Implementation Tools
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {pnrExecutionModules.map((mod) => {
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

export default PnrExecution;
