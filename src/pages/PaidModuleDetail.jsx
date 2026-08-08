import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paidModulesData } from '../data/paidModulesData';
import ModuleQuickNav from '../components/ModuleQuickNav';
import styles from './PaidModuleDetail.module.css';
import { supabase } from '../services/supabase';

const ResumeBuilder = lazy(() => import('./resume-builder/ResumeBuilder'));
const Module58Content = lazy(() => import('./modules/Module58Content'));
const Module55Content = lazy(() => import('./modules/Module55Content'));
const Module19Content = lazy(() => import('./modules/Module19Content'));
const Module20Content = lazy(() => import('./modules/Module20Content'));
const Module21Content = lazy(() => import('./modules/Module21Content'));
const Module9Content = lazy(() => import('./modules/Module9Content'));
const Module10Content = lazy(() => import('./modules/Module10Content'));
const Module11Content = lazy(() => import('./modules/Module11Content'));
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

const NATIVE_PAID_COMPONENTS = {
  6: Module6Content,
  9: Module9Content,
  12: Module12Content,
  13: Module13Content,
  14: Module14Content,
  15: Module15Content,
  16: Module16Content,
  17: Module17Content,
  18: Module18Content,
  19: Module19Content,
  20: Module20Content,
  21: Module21Content,
  25: Module25Content,
  26: Module26Content,
  27: Module27Content,
  55: Module55Content,
  58: Module58Content,
  59: Module59Content,
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

  const [readingMode, setReadingMode] = useState(() => {
    return localStorage.getItem('preferred_reading_mode') || 'website';
  });

  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [useAltEngine, setUseAltEngine] = useState(false);

  useEffect(() => {
    setIsIframeLoading(true);
  }, [id, readingMode, iframeKey, useAltEngine]);

  const handleReadingModeChange = (mode) => {
    setReadingMode(mode);
    localStorage.setItem('preferred_reading_mode', mode);
  };

  const handleReloadIframe = () => {
    setIsIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const toggleEngine = () => {
    setIsIframeLoading(true);
    setUseAltEngine((prev) => !prev);
    setIframeKey((prev) => prev + 1);
  };

  const getIframeSrc = (link) => {
    if (!link) return '';
    if (link.includes('drive.google.com/file/d/')) {
      const match = link.match(/\/file\/d\/([^\/]+)/);
      if (match && match[1]) {
        const fileId = match[1];
        if (useAltEngine || iframeKey % 2 === 1) {
          return `https://docs.google.com/viewer?srcid=${fileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`;
        }
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    return link;
  };

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

    // Disable copy and cut events
    const handleCopyCut = (e) => {
      e.preventDefault();
    };

    // Disable selectstart
    const handleSelectStart = (e) => {
      e.preventDefault();
    };

    // Clear any text selections automatically
    const handleSelectionChange = () => {
      if (window.getSelection && window.getSelection().rangeCount > 0) {
        window.getSelection().removeAllRanges();
      }
    };

    // Disable drag start
    const handleDragStart = (e) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts (Ctrl/Cmd + C, A, X, P, S, U, F12)
    const handleKeyDown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (
        (isCmdOrCtrl && ['c', 'a', 'x', 'p', 's', 'u'].includes(key)) ||
        (isCmdOrCtrl && e.shiftKey && key === 'i') ||
        e.keyCode === 123
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('selectionchange', handleSelectionChange);
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
  const isPdfDoc = moduleInfo && moduleInfo.iframeLink && (moduleInfo.iframeLink.includes('drive.google.com') || moduleInfo.iframeLink.toLowerCase().includes('.pdf'));
  const isGoogleDoc = moduleInfo && moduleInfo.iframeLink && moduleInfo.iframeLink.includes('docs.google.com');
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
      <ModuleQuickNav moduleId={id} activeTab="material" />
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
            <button 
              className={styles.toolbarBtn}
              onClick={handleReloadIframe}
              title="Reload document if Google Drive preview fails"
            >
              🔄 Reload Document
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
      ) : (
        <>
          {NATIVE_PAID_COMPONENTS[moduleId] && moduleInfo.iframeLink && !moduleInfo.isLockedTemporarily && (
            <div className={styles.readingModeToggleBar}>
              <span className={styles.toggleLabel}>Select Preferred View:</span>
              <div className={styles.toggleButtonGroup}>
                <button 
                  className={`${styles.toggleBtn} ${readingMode === 'website' ? styles.toggleActive : ''}`}
                  onClick={() => handleReadingModeChange('website')}
                  title="Read as interactive website page"
                >
                  <span className={styles.toggleIcon}>🌐</span> Website Reading View
                </button>
                <button 
                  className={`${styles.toggleBtn} ${readingMode === 'document' ? styles.toggleActive : ''}`}
                  onClick={() => handleReadingModeChange('document')}
                  title="View original Google Doc / PDF document"
                >
                  <span className={styles.toggleIcon}>📄 Original Document View</span>
                </button>
              </div>
            </div>
          )}

          {NATIVE_PAID_COMPONENTS[moduleId] && (readingMode === 'website' || !moduleInfo.iframeLink) ? (
            <Suspense fallback={<div className={styles.loadingText}>Loading Content...</div>}>
              <div>
                {React.createElement(NATIVE_PAID_COMPONENTS[moduleId])}
              </div>
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
            <div 
              className={styles.popoutBlocker}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}
              title="Pop-out disabled for security"
            />
            {isIframeLoading && (
              <div className={styles.iframeSkeletonLoader}>
                <div className={styles.spinner}></div>
                <span>Loading Document Viewer...</span>
              </div>
            )}
            <iframe 
              key={`iframe-${moduleInfo.id}-${iframeKey}`}
              src={getIframeSrc(moduleInfo.iframeLink)} 
              className={styles.iframe} 
              title={`Premium Module ${moduleInfo.id} Content`}
              loading="lazy"
              onLoad={() => setIsIframeLoading(false)}
              allowFullScreen
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
      </>
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