import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './PlatformFlow.module.css';

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    {path}
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{width:'16px',height:'16px'}}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const PlatformFlow = () => {
  const navigate = useNavigate();
  const { user, hasPremiumAccess } = useAuth();

  const handleStepClick = (step) => {
    if (step.link === '#') {
      alert('This module is currently under development and will be available soon!');
      return;
    }
    // Block premium steps for non-subscribers
    if (step.isPremium && !hasPremiumAccess) {
      alert('🔒 This content requires an active subscription.\n\nPlease subscribe from your Student Dashboard to unlock access.');
      navigate('/dashboard');
      return;
    }
    navigate(step.link);
  };

  const steps = [
    { id: 1, title: 'Recording Video Classes',  isPremium: true,  link: '/test-videos',       desc: 'High-quality recorded classes covering complete Physical Design from Basic to Advanced.',                                                              tag: 'WATCH',       color: '#10B981', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /> },
    { id: 2, title: 'Study Material',           isPremium: false, link: '/study-materials',   desc: 'Comprehensive PDFs, notes, flow diagrams, reference documents and downloadable learning resources.',                                                  tag: 'PREPARE',     color: '#22D3EE', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /> },
    { id: 3, title: 'PNR Execution',            isPremium: true,  link: '/pnr-execution',     desc: 'Hands-on Place & Route implementation using industry-standard EDA tools.',                                                                             tag: 'PRACTICE',    color: '#4ADE80', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /> },
    { id: 4, title: 'PNR Workshop',             isPremium: true,  link: '/pnr-workshop',      desc: 'Complete real project implementation workshops from Floorplan to Signoff.',                                                                             tag: 'WORKSHOP',    color: '#4ADE80', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
    { id: 5, title: 'TCL Scripts',              isPremium: true,  link: '/modules/58',        desc: 'Production-ready TCL automation scripts with complete explanations and practical examples.',                                                            tag: 'AUTOMATE',    color: '#FACC15', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
    { id: 6, title: 'User Guides',              isPremium: true,  link: '/user-guides',       desc: 'Step-by-step execution manuals for ICC2, Fusion Compiler, Innovus, PrimeTime and Tempus.',                                                            tag: 'REFERENCE',   color: '#FB923C', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> },
    { id: 7, title: 'Interview Questions',      isPremium: true,  link: '/interview',         desc: '500+ real interview questions with detailed explanations and company-specific preparation.',                                                            tag: 'PREPARE',     color: '#F472B6', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
    { id: 8, title: 'Quiz Test',                isPremium: false, link: '#',                  desc: 'Topic-wise quizzes with instant evaluation and progress tracking. (Future addition - will add based on our development plan)',                         tag: 'FUTURE ADDITION', color: '#A855F7', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
    { id: 9, title: 'Certification',            isPremium: true,  link: '/modules/23',        desc: 'Earn the official Anti Gravity Physical Design Certification after successfully completing assessments. (Future addition - will add based on our development plan)', tag: 'FUTURE ADDITION', color: '#A855F7', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /> },
    { id: 10, title: 'Resume Builder',          isPremium: true,  link: '/modules/24',        desc: 'Generate ATS-friendly VLSI resumes with modern professional templates. (Future addition - will add based on our development plan)',                    tag: 'FUTURE ADDITION', color: '#3B82F6', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /> },
    { id: 11, title: 'Job Finder',              isPremium: true,  link: '/modules/59',        desc: 'AI-powered VLSI Job Finder with worldwide semiconductor openings and company career integration.',                                                      tag: 'LAUNCH',      color: '#22D3EE', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>OCEAN PHYSICAL DESIGN JOURNEY</h1>
        <div className={styles.headerSub}>
          <div className={`${styles.headerSubLine} ${styles.left}`}></div>
          <span>11 STEPS. ONE GOAL. LIMITLESS OPPORTUNITIES.</span>
          <div className={`${styles.headerSubLine} ${styles.right}`}></div>
        </div>
      </div>

      {/* Flow Sequence */}
      <div className={styles.flow}>
        
        {/* Start Node */}
        <div className={styles.stepContainer}>
          <div className={`${styles.row} ${styles.staticRow}`} style={{ '--theme-color': '#3B82F6' }}>
            <div className={styles.leftCol}>
              <div className={`${styles.hexGlow} ${styles.startHex}`}>
                <div className={styles.hexWrapper}>
                  <div className={styles.hexInner}>
                    <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.connector}></div>
            <div className={styles.rightCol}>
              <div className={styles.cardWrapper}>
                <div className={`${styles.cardInner} ${styles.startCard}`}>
                  <div className={styles.textBox}>
                    <h3>B.Tech Student</h3>
                    <p>Start your journey into the semiconductor industry with structured learning, practical implementation and real project experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.verticalLineWrapper}>
            <div className={styles.verticalLine} style={{ '--top-color': '#3B82F6', '--bottom-color': steps[0].color }}></div>
          </div>
        </div>

        {/* 11 Steps */}
        {steps.map((step, idx) => (
          <div className={styles.stepContainer} key={step.id}>
            <div className={styles.row} style={{ '--theme-color': step.color }} onClick={() => handleStepClick(step)}>
              <div className={styles.leftCol}>
                <div className={styles.hexGlow}>
                  <div className={styles.hexWrapper}>
                    <div className={styles.hexInner}>{step.id}</div>
                  </div>
                </div>
              </div>
              <div className={styles.connector}></div>
              <div className={styles.rightCol}>
                <div className={styles.cardWrapper}>
                  <div className={styles.cardInner}>
                    <div className={styles.iconBox}>
                      <Icon path={step.icon} />
                    </div>
                    <div className={styles.textBox}>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                    {step.tag && (
                      <div className={styles.cardTag}>
                        <span className={styles.tagDot}></span>
                        {step.tag}
                      </div>
                    )}
                    {/* Lock badge for premium steps when not subscribed */}
                    {step.isPremium && !hasPremiumAccess && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.4)',
                        borderRadius: '6px', padding: '3px 8px', fontSize: '11px',
                        color: '#ff6b6b', fontWeight: 700, letterSpacing: '0.04em'
                      }}>
                        <LockIcon /> SUBSCRIBE TO UNLOCK
                      </div>
                    )}
                    <div className={styles.actionArrow}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Render vertical line if not the very last element including end node */}
            <div className={styles.verticalLineWrapper}>
              <div className={styles.verticalLine} style={{ 
                '--top-color': step.color, 
                '--bottom-color': idx < steps.length - 1 ? steps[idx + 1].color : '#A855F7' 
              }}></div>
            </div>
          </div>
        ))}

        {/* End Node */}
        <div className={styles.stepContainer}>
          <div className={`${styles.row} ${styles.staticRow}`} style={{ '--theme-color': '#A855F7' }}>
            <div className={styles.leftCol}>
              <div className={`${styles.hexGlow} ${styles.endHex}`}>
                <div className={styles.hexWrapper}>
                  <div className={styles.hexInner}>
                    <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.connector}></div>
            <div className={styles.rightCol}>
              <div className={styles.cardWrapper}>
                <div className={`${styles.cardInner} ${styles.endCard}`}>
                  <div className={styles.textBox}>
                    <h3>Physical Design Engineer</h3>
                    <p>Congratulations! You are now industry-ready to design next-generation semiconductor chips.</p>
                  </div>
                  <div style={{color: '#FACC15'}}>
                    <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Features */}
      <div className={styles.footer}>
        <div className={styles.feature}>
          <div className={styles.featIcon}>
            <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.45m.002 0a15.09 15.09 0 01-.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />} />
          </div>
          <div>
            <h4>Hands-on Learning</h4>
            <p>Real Industry Projects</p>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featIcon}>
            <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />} />
          </div>
          <div>
            <h4>Expert Mentorship</h4>
            <p>Learn from experienced Physical Design Engineers</p>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featIcon}>
            <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M3 131.25V18a2.25 2.25 0 00-2.25-2.25M3 13.25l6.75-6.75 3 3L21 4.5m0 0v5.25M21 4.5H15.75" />} />
          </div>
          <div>
            <h4>Career Growth</h4>
            <p>Resume, Interview Preparation and Placement Support</p>
          </div>
        </div>
        <div className={styles.feature}>
          <div className={styles.featIcon}>
            <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} />
          </div>
          <div>
            <h4>Future Ready</h4>
            <p>Continuously updated according to latest semiconductor industry trends</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFlow;
