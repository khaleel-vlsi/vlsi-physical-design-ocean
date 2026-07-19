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

// An interview/chat icon
const InterviewIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />;

const interviewModules = [
  { id: 19, title: 'Core Interview Questions', desc: 'Fundamental physical design and VLSI questions.', icon: InterviewIcon },
  { id: 20, title: 'Interview Questions (RTL, Synth, DFT, STA)', desc: 'Front-end and timing analysis interview preparation.', icon: InterviewIcon },
  { id: 21, title: 'Physical Design (PNR) Interview Questions', desc: 'Core PNR concepts, setup/hold fixes, and implementation.', icon: InterviewIcon },
  { id: 22, title: 'Physical Verification & Signoff Interview Questions', desc: 'DRC, LVS, and tapeout stage questions.', icon: InterviewIcon },
  { id: 34, title: 'All VLSI Questions and Answers', desc: 'Comprehensive master list of all VLSI topics.', icon: InterviewIcon },
  { id: 35, title: 'Viva Questions on Synthesis', desc: 'Quick-fire viva questions on logic synthesis.', icon: InterviewIcon },
  { id: 49, title: 'Digital Logic & Design Interview Preparation', desc: 'Digital electronics and logic design fundamentals.', icon: InterviewIcon }
];

const Interview = () => {
  const { hasPremiumAccess } = useAuth() || {};
  const courseValid = hasPremiumAccess;

  return (
    <div className={styles.container}>
      <SEO 
        title="Physical Design Interview Preparation" 
        description="Comprehensive list of VLSI Physical Design interview questions and answers, covering STA, CTS, synthesis, and physical verification."
        url="/interview"
        keywords={["vlsi interview questions", "physical design interview", "sta interview questions", "asic interview preparation"]}
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
                  "name": "Interview Preparation",
                  "item": "https://vlsiphysicaldesignocean.com/interview"
                }
              ]
            }}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>CAREER PREPARATION</div>
        <h1 className={styles.mainTitle}>INTERVIEW QUESTIONS</h1>
        <p className={styles.description}>Prepare for top semiconductor industry interviews with 500+ real, company-specific questions covering the entire RTL-to-GDSII flow.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />} /></span>
            7 Interview Modules
          </div>
          <div className={styles.statPill} style={{ marginLeft: '15px' }}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />} /></span>
            Placement Support
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {interviewModules.map((mod) => {
          const targetUrl = `/paid-modules/module/${mod.id}`;
          return (
            <Link key={mod.id} to={targetUrl} className={styles.cardLink}>
              <div className={styles.cardWrapper}>
                <div className={styles.cardInner}>
                  <div className={styles.badgeRow}>
                    <div className={styles.moduleBadge}>MODULE {mod.id}</div>
                    <div className={`${styles.accessIcon} ${courseValid ? styles.unlocked : styles.locked}`}>
                      {courseValid ? <UnlockedIcon /> : <LockedIcon />}
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

export default Interview;
