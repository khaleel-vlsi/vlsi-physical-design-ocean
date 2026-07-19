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

// A nice document/book icon for guides
const DocIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;

const userGuideModules = [
  { id: 28, title: 'Timing Analysis User Guide', desc: 'Comprehensive timing analysis procedures.', icon: DocIcon },
  { id: 29, title: 'Tempus User Guide', desc: 'Cadence Tempus timing signoff system manual.', icon: DocIcon },
  { id: 32, title: 'Star RC User Guide', desc: 'Parasitic extraction workflow with StarRC.', icon: DocIcon },
  { id: 33, title: 'Voltus IC Power Integrity Solution User Guide', desc: 'IR Drop and EM signoff documentation.', icon: DocIcon },
  { id: 36, title: 'PrimeTime Student Guide (2018 Version)', desc: 'Legacy PrimeTime manual for academic reference.', icon: DocIcon },
  { id: 38, title: 'PrimeTime Tool User Guide', desc: 'Main PrimeTime reference manual.', icon: DocIcon },
  { id: 44, title: 'Innovus TCR Reference Guide', desc: 'Innovus command reference and TCR.', icon: DocIcon },
  { id: 45, title: 'ICC2 Tool User Guide', desc: 'Comprehensive ICC2 reference manual.', icon: DocIcon },
  { id: 46, title: 'Genus Synthesis Tool User Guide', desc: 'Cadence Genus RTL synthesis guide.', icon: DocIcon },
  { id: 47, title: 'Fusion Compiler User Guide', desc: 'Synopsys Fusion Compiler reference.', icon: DocIcon },
  { id: 48, title: 'Formality User Guide', desc: 'Logical equivalence checking documentation.', icon: DocIcon },
  { id: 50, title: 'Design Compiler (DC) Tool User Guide', desc: 'Synopsys DC synthesis instructions.', icon: DocIcon },
  { id: 51, title: 'DB Get Useful Commands Reference', desc: 'Common dbGet commands and usage.', icon: DocIcon },
  { id: 53, title: 'Complete Synthesis Flow Documentation', desc: 'End-to-end synthesis instructions.', icon: DocIcon },
  { id: 56, title: 'Application Options & Attributes Reference', desc: 'Detailed options and attribute lists.', icon: DocIcon },
  { id: 57, title: 'Innovus User Guide (Full Version)', desc: 'Complete Cadence Innovus manual.', icon: DocIcon }
];

const UserGuides = () => {
  const { hasPremiumAccess } = useAuth() || {};

  return (
    <div className={styles.container}>
      <SEO 
        title="User Guides" 
        description="Comprehensive collection of user guides and manuals for EDA tools including Innovus, ICC2, PrimeTime, and more."
        url="/user-guides"
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
                  "name": "User Guides",
                  "item": "https://vlsiphysicaldesignocean.com/user-guides"
                }
              ]
            }}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>REFERENCE MANUALS</div>
        <h1 className={styles.mainTitle}>TOOL USER GUIDES</h1>
        <p className={styles.description}>Access the complete library of execution manuals, flow documentations, and reference guides for top industry EDA tools.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />} /></span>
            16 Extensive Guides
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {userGuideModules.map((mod) => {
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

export default UserGuides;
