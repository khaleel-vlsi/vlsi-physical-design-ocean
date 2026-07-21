import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paidModulesData } from '../data/paidModulesData';
import styles from './PaidModuleDetail.module.css';
import { supabase } from '../services/supabase';

const ResumeBuilder = lazy(() => import('./resume-builder/ResumeBuilder'));
const Module58Content = lazy(() => import('./modules/Module58Content'));
const Module55Content = lazy(() => import('./modules/Module55Content'));
const Module19Content = lazy(() => import('./modules/Module19Content'));
const Module20Content = lazy(() => import('./modules/Module20Content'));
const Module21Content = lazy(() => import('./modules/Module21Content'));
const Module9Content = lazy(() => import('./modules/Module9Content'));
const Module59Content = lazy(() => import('./modules/Module59Content'));
const Module6Content = lazy(() => import('./modules/Module6Content'));
const Module12Content = lazy(() => import('./modules/Module12Content'));
const Module13Content = lazy(() => import('./modules/Module13Content'));
const Module14Content = lazy(() => import('./modules/Module14Content'));
const Module15Content = lazy(() => import('./modules/Module15Content'));
const Module16Content = lazy(() => import('./modules/Module16Content'));
const Module17Content = lazy(() => import('./modules/Module17Content'));
const Module18Content = lazy(() => import('./modules/Module18Content'));
const Module25Content = lazy(() => import('./modules/Module25Content'));
const Module26Content = lazy(() => import('./modules/Module26Content'));
const Module27Content = lazy(() => import('./modules/Module27Content'));

const getFlowStepInfo = (moduleId) => {
  if (moduleId >= 9 && moduleId <= 18) {
    return { id: 2, title: "Study Material" };
  }
  if (moduleId >= 19 && moduleId <= 22) {
    return { id: 7, title: "Interview Questions" };
  }
  if (moduleId === 23) {
    return { id: 9, title: "Certification" };
  }
  if (moduleId === 24) {
    return { id: 10, title: "Resume Builder" };
  }
  if (moduleId >= 25 && moduleId <= 27) {
    return { id: 3, title: "PNR Execution" };
  }
  if (moduleId >= 28 && moduleId <= 57) {
    return { id: 6, title: "User Guides" };
  }
  if (moduleId === 58) {
    return { id: 5, title: "TCL Scripts" };
  }
  if (moduleId === 59) {
    return { id: 11, title: "Job Finder" };
  }
  return null;
};

const PaidModuleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [viewWidth, setViewWidth] = useState('standard'); // 'standard' or 'full'
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (user === undefined) return;



    if (!user) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }

    const checkFreshAccess = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error || !data) {
          setHasAccess(false);
          setIsLoading(false);
          return;
        }

        const courseValid = !!data.course_active;
        
        setHasAccess(courseValid);
        setIsLoading(false);
      } catch (err) {
        setHasAccess(false);
        setIsLoading(false);
      }
    };

    checkFreshAccess();
  }, [user, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsTopicsExpanded(false);
    setShowAllTopics(false);
  }, [id]);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Disable copy event
    const handleCopy = (e) => {
      e.preventDefault();
      alert("Copying is disabled for premium study materials.");
    };

    // Disable drag start
    const handleDragStart = (e) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts (Ctrl/Cmd + C, P, S)
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (isCmdOrCtrl && (key === 'c' || key === 'p' || key === 's')) {
        e.preventDefault();
        alert("Copying, printing, and saving are disabled for premium study materials.");
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoading) {
    return <div className={styles.detailPage}><div className={styles.loadingText}>Securing connection... ⏳</div></div>;
  }

  const moduleId = parseInt(id);
  const stepInfo = getFlowStepInfo(moduleId);
  const currentIndex = (paidModulesData || []).findIndex(m => m.id === moduleId);
  const moduleInfo = currentIndex !== -1 ? paidModulesData[currentIndex] : null;
  
  const prevModule = currentIndex > 0 ? paidModulesData[currentIndex - 1] : null;
  const nextModule = currentIndex < (paidModulesData || []).length - 1 ? paidModulesData[currentIndex + 1] : null;

  const isGoogleDrive = moduleInfo && moduleInfo.iframeLink && moduleInfo.iframeLink.includes('drive.google.com');
  const isGoogleLink = moduleInfo && moduleInfo.iframeLink && (moduleInfo.iframeLink.includes('drive.google.com') || moduleInfo.iframeLink.includes('docs.google.com'));

  if (!moduleInfo) {
    return (
      <div className={styles.detailPage}>
        <div className={styles.emptyState}>
          <h2>Module not found</h2>
          <Link to="/paid-modules" className={styles.navBtn}>Back to Premium Modules</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.topLinksRow}>
        <div className={styles.leftLinks}>
          <Link to="/paid-modules" className={styles.backLink}>← Back to Paid Modules</Link>
          <Link to="/platform-flow" className={styles.flowLink}>📊 Flow Graph</Link>
        </div>
        <Link to="/dashboard" className={styles.dashboardLink}>Go to Dashboard →</Link>
      </div>
      
      <header className={styles.header}>
        <div className={styles.badgeWrapper}>
          <span className={styles.premiumBadge}>✨ PREMIUM ACCESS</span>
          <span className={styles.moduleIdBadge}>Module {moduleInfo.id}</span>
        </div>
        <h1>{moduleInfo.title}</h1>
        <p>{moduleInfo.description}</p>
      </header>

      {moduleInfo.topics && moduleInfo.topics.length > 0 && (
        <section className={styles.topicsSection}>
          <h2 
            onClick={() => setIsTopicsExpanded(!isTopicsExpanded)} 
            className={`${styles.topicsHeader} ${isTopicsExpanded ? styles.expanded : ''}`}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title="Click to toggle topics list"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span role="img" aria-label="topics">📚</span> Topics Covered
            </span>
            <span className={styles.chevronIcon}>{isTopicsExpanded ? '▲' : '▼'}</span>
          </h2>
          {isTopicsExpanded && (
            <>
              <div className={styles.topicsGrid}>
                {(showAllTopics ? moduleInfo.topics : moduleInfo.topics.slice(0, 4)).map((topic, index) => (
                  <div key={index} className={styles.topicItem}>
                    <span className={styles.topicBullet}>•</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
              {moduleInfo.topics.length > 4 && (
                <button 
                  className={styles.toggleTopicsBtn} 
                  onClick={() => setShowAllTopics(!showAllTopics)}
                  title={showAllTopics ? "Collapse list" : "Expand list"}
                >
                  {showAllTopics ? '▲ Show Less' : `▼ Show More (+${moduleInfo.topics.length - 4})`}
                </button>
              )}
            </>
          )}
        </section>
      )}

      {moduleInfo.iframeLink && !moduleInfo.isLockedTemporarily && (
        <div className={styles.viewerToolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.secureStatus}>
              <span className={styles.pulseDot}></span>
              SECURE PREMIUM VIEWER
            </span>
          </div>
          <div className={styles.toolbarCenter}>
            <button 
              className={`${styles.toolbarBtn} ${viewWidth === 'standard' ? styles.activeBtn : ''}`}
              onClick={() => setViewWidth('standard')}
              title="Fit to standard document page width"
            >
              📄 Page Width
            </button>
            <button 
              className={`${styles.toolbarBtn} ${viewWidth === 'full' ? styles.activeBtn : ''}`}
              onClick={() => setViewWidth('full')}
              title="Stretch to full container width"
            >
              ↔️ Full Width
            </button>
          </div>
          <div className={styles.toolbarRight}>
            <span className={styles.protectionInfo}>🔒 Protected Mode</span>
          </div>
        </div>
      )}

      {!hasAccess ? (
        <div className={styles.iframeContainer}>
          <div className={styles.lockedState}>
            <span className={styles.lockIcon}>🔒</span>
            {stepInfo && (
              <Link to="/platform-flow" className={styles.flowStepBadge} title="View this step in the Ocean Physical Design Journey">
                📍 Part of Flow Graph Step {stepInfo.id}: {stepInfo.title}
              </Link>
            )}
            <h2>Premium Content Locked</h2>
            <p className={styles.lockText}>
              This is a premium module. You must be logged in and have an active course subscription to access this content.
            </p>
            <div style={{ marginTop: '25px', marginBottom: '15px' }}>
              <Link to="/login" className={styles.navBtn} style={{ padding: '14px 40px', fontSize: '1.1rem', background: 'linear-gradient(to right, #3B82F6, #22D3EE)', color: '#000', fontWeight: 'bold' }}>
                Login / Enroll Now to Unlock
              </Link>
            </div>
            {/* Topics preview to attract users */}
            {moduleInfo.topics && moduleInfo.topics.length > 0 && (
              <div className={styles.topicsSection} style={{ marginTop: '40px', textAlign: 'left', maxWidth: '800px', margin: '40px auto 0' }}>
                <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>What you'll unlock in this module:</h3>
                <div className={styles.topicsGrid}>
                  {moduleInfo.topics.slice(0, 8).map((topic, idx) => (
                    <div key={idx} className={styles.topicItem}>
                      <span className={styles.topicBullet}>•</span>{topic}
                    </div>
                  ))}
                  {moduleInfo.topics.length > 8 && (
                    <div className={styles.topicItem} style={{ color: '#3B82F6', fontWeight: 'bold' }}>
                      <span className={styles.topicBullet}>•</span>+ {moduleInfo.topics.length - 8} more advanced topics
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : moduleInfo.isResumeBuilder ? (
        <Suspense fallback={<div className={styles.loadingText}>Loading Resume Builder...</div>}>
          <ResumeBuilder />
        </Suspense>
      ) : moduleId === 55 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Script Hub...</div>}>
            <Module55Content />
          </Suspense>
        ) : moduleId === 58 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Script Hub...</div>}>
            <Module58Content />
          </Suspense>
        ) : moduleId === 19 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Interview Q&A...</div>}>
            <Module19Content />
          </Suspense>
        ) : moduleId === 20 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Interview Q&A...</div>}>
            <Module20Content />
          </Suspense>
        ) : moduleId === 21 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Interview Q&A...</div>}>
            <Module21Content />
          </Suspense>
        ) : moduleId === 9 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module9Content />
          </Suspense>
        ) : moduleId === 59 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Jobs Hub...</div>}>
            <Module59Content />
          </Suspense>
        ) : moduleId === 6 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module6Content />
          </Suspense>
        ) : moduleId === 12 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module12Content />
          </Suspense>
        ) : moduleId === 13 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module13Content />
          </Suspense>
        ) : moduleId === 14 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module14Content />
          </Suspense>
        ) : moduleId === 15 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module15Content />
          </Suspense>
        ) : moduleId === 16 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module16Content />
          </Suspense>
        ) : moduleId === 17 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module17Content />
          </Suspense>
        ) : moduleId === 18 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module18Content />
          </Suspense>
        ) : moduleId === 25 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module25Content />
          </Suspense>
        ) : moduleId === 26 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module26Content />
          </Suspense>
        ) : moduleId === 27 ? (
          <Suspense fallback={<div className={styles.loadingText}>Loading Study Material...</div>}>
            <Module27Content />
          </Suspense>
        ) : (
        <div className={styles.iframeContainer}>
          {moduleInfo.isLockedTemporarily ? (
          <div className={styles.lockedState}>
            <span className={styles.lockIcon}>🔒</span>
            {stepInfo && (
              <Link to="/platform-flow" className={styles.flowStepBadge} title="View this step in the Ocean Physical Design Journey">
                📍 Part of Flow Graph Step {stepInfo.id}: {stepInfo.title}
              </Link>
            )}
            <h2>Content Locked</h2>
            <p className={styles.lockText}>
              {moduleInfo.lockMessage || "This content will unlock automatically 1 month after your course purchase."}
            </p>
            {!moduleInfo.isFutureAddition && (
              <div className={styles.timerBadge}>
                <span>⏳ Unlocking in: {moduleInfo.unlockDays || 30} Days (Scheduled)</span>
              </div>
            )}
            {/* Topics preview to attract users */}
            {moduleInfo.topics && moduleInfo.topics.length > 0 && (
              <div className={styles.topicsSection}>
                <h3>Topics Covered</h3>
                <div className={styles.topicsGrid}>
                  {moduleInfo.topics.slice(0, 5).map((topic, idx) => (
                    <div key={idx} className={styles.topicItem}>
                      <span className={styles.topicBullet}>•</span>{topic}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : moduleInfo.iframeLink ? (
          <div className={`${styles.iframeWrapper} ${viewWidth === 'standard' ? styles.widthStandard : styles.widthFull}`}>
            <iframe 
              src={moduleInfo.iframeLink} 
              className={styles.iframe} 
              style={isGoogleDrive ? { marginTop: '-56px', height: 'calc(100% + 56px)' } : {}}
              sandbox={isGoogleLink ? "allow-scripts allow-same-origin allow-forms" : undefined}
              title={`Premium Module ${moduleInfo.id} Content`}
              allowFullScreen
              onLoad={(e) => {
                try {
                  const doc = e.target.contentDocument || e.target.contentWindow.document;
                  if (doc) {
                    const style = doc.createElement('style');
                    style.textContent = `
                      .top-nav, 
                      .announcement-bar, 
                      header, 
                      .module-navigation, 
                      .site-footer,
                      .locked-module { 
                        display: none !important; 
                      }
                      .backLink {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        padding: 10px 20px;
                        border-radius: 9999px;
                        color: #94a3b8;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.85rem;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(10px);
                        position: relative;
                        z-index: 10;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                      }
                      
                      .dashboardLink {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        background: rgba(255, 255, 255, 0.04);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        padding: 10px 20px;
                        border-radius: 9999px;
                        color: #60a5fa;
                        text-decoration: none;
                        font-weight: 600;
                        font-size: 0.85rem;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        backdrop-filter: blur(10px);
                        position: relative;
                        z-index: 10;
                        box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
                      }
                      
                      .dashboardLink:hover {
                        color: #fff;
                        background: rgba(96, 165, 250, 0.2);
                        border-color: rgba(96, 165, 250, 0.4);
                      }
                      body {
                        background-color: #0f172a !important;
                        color: #fff !important;
                        padding: 20px !important;
                      }
                    `;
                    doc.head.appendChild(style);
                  }
                } catch (err) {
                  // Ignore cross-origin error when loading external Google URLs
                }
              }}
            />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.docIcon}>📄</span>
            <h2>Preparing Documentation</h2>
            <p>The premium study materials for this module are currently being attached to the server.</p>
          </div>
        )}
      </div>
      )}

      <div className={styles.navRow}>
        {prevModule ? <Link to={`/paid-modules/module/${prevModule.id}`} className={styles.navBtn}>&laquo; Previous</Link> : <div></div>}
        <Link to="/paid-modules" className={styles.navBtn}>📘 All Modules</Link>
        {nextModule ? <Link to={`/paid-modules/module/${nextModule.id}`} className={styles.navBtn}>Next &raquo;</Link> : <div></div>}
      </div>
    </div>
  );
};

export default PaidModuleDetail;