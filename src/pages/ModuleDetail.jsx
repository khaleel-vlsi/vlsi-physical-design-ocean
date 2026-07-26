import React, { lazy, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { modulesData } from '../data/modulesData';
import styles from './ModuleDetail.module.css';

const Module1Content = lazy(() => import('./modules/Module1Content'));
const MOSFETCMOSContent = lazy(() => import('./modules/MOSFETCMOSContent'));
const Module5Content = lazy(() => import('./modules/Module5Content'));
const Module7Content = lazy(() => import('./modules/Module7Content'));
const Module8Content = lazy(() => import('./modules/Module8Content'));
const Module4Content = lazy(() => import('./modules/Module4Content'));
const Module6Content = lazy(() => import('./modules/Module6Content'));
const Module58Content = lazy(() => import('./modules/Module58Content'));
const Module59Content = lazy(() => import('./modules/Module59Content'));

import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useAuth } from '../context/AuthContext';

const NATIVE_COMPONENTS = {
  1: Module1Content,
  2: MOSFETCMOSContent,
  5: Module5Content,
  7: Module7Content,
  8: Module8Content,
  4: Module4Content,
  6: Module6Content,
  58: Module58Content,
  59: Module59Content,
  // Add more modules here as they are migrated
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', margin: '20px 0', border: '5px solid red', backgroundColor: '#fee', color: '#c00', borderRadius: '8px' }}>
          <h2>Something went wrong in the module content.</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontWeight: 'bold' }}>{this.state.error && this.state.error.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{this.state.error && this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

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

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPremiumAccess } = useAuth() || {};
  const moduleId = parseInt(id);
  const stepInfo = getFlowStepInfo(moduleId);
  const moduleInfo = modulesData[String(moduleId)];

  const [readingMode, setReadingMode] = React.useState(() => {
    return localStorage.getItem('preferred_reading_mode') || 'website';
  });

  const handleReadingModeChange = (mode) => {
    setReadingMode(mode);
    localStorage.setItem('preferred_reading_mode', mode);
  };

  React.useEffect(() => {
    if (hasPremiumAccess && moduleId >= 9 && moduleId <= 59) {
      navigate(`/paid-modules/module/${moduleId}`, { replace: true });
    }
  }, [hasPremiumAccess, moduleId, navigate]);
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  React.useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleCopyCut = (e) => e.preventDefault();
    const handleSelectStart = (e) => e.preventDefault();
    const handleSelectionChange = () => {
      if (window.getSelection && window.getSelection().rangeCount > 0) {
        window.getSelection().removeAllRanges();
      }
    };
    const handleDragStart = (e) => e.preventDefault();
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

  if (!moduleInfo) {
    return (
      <div className={styles.moduleContent}>
        <h2>Module not found</h2>
        <Link to="/modules" className={styles.navBtn}>Back to Modules</Link>
      </div>
    );
  }

  const hasNative = moduleInfo.hasNativeContent && NATIVE_COMPONENTS[moduleId];
  const hasIframes = moduleInfo.iframes && moduleInfo.iframes.length > 0;
  const showToggle = hasNative && hasIframes;

  return (
    <>
      <SEO 
        title={`Module ${moduleInfo.id}: ${moduleInfo.title}`}
        description={`Master ${moduleInfo.title} in our comprehensive VLSI Physical Design module. Topics include: ${moduleInfo.topics.slice(0, 3).join(', ')}...`}
        url={`/modules/${moduleInfo.id}`}
        isArticle={true}
        keywords={moduleInfo.keywords || []}
        noindex={moduleInfo.isLocked}
        structuredData={
          <StructuredData 
            course={{
              "@context": "https://schema.org",
              "@type": "Course",
              "name": `Module ${moduleInfo.id}: ${moduleInfo.title}`,
              "description": `Master ${moduleInfo.title} in our comprehensive VLSI Physical Design module.`,
              "provider": {
                "@type": "Organization",
                "name": "VLSI Physical Design Ocean",
                "sameAs": "https://vlsiphysicaldesignocean.com"
              }
            }}
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
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": `Module ${moduleInfo.id}`,
                  "item": `https://vlsiphysicaldesignocean.com/modules/${moduleInfo.id}`
                }
              ]
            }}
          />
        }
      />
      <header className={styles.moduleHeader}>
        <div className={styles.topNavLinks}>
          <div className={styles.leftLinks}>
            <Link to="/modules" className={styles.backLink}>← Back to Modules</Link>
            <Link to="/platform-flow" className={styles.flowLink}>📊 Flow Graph</Link>
          </div>
        </div>
        <h1>Module {moduleInfo.id}</h1>
        <p>{moduleInfo.title}</p>
      </header>

      <div className={styles.moduleContent}>
        {showToggle && !moduleInfo.isLocked && (
          <div className={styles.readingModeToggleBar}>
            <span className={styles.toggleLabel}>Select Reading View:</span>
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

        {(!(hasNative && readingMode === 'website') || moduleInfo.isLocked) && (
          <div className={styles.contentSection}>
            <h2>{(moduleInfo.id >= 28 && moduleInfo.id !== 58) ? "📚 Reference Materials & User Guides" : "Topics Covered"}</h2>
            <ul className={styles.topicsList}>
              {moduleInfo.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}

        {moduleInfo.isLocked ? (
          <div className={styles.lockedModule}>
            {stepInfo && (
              <Link to="/platform-flow" className={styles.flowStepBadge} title="View this step in the Ocean Physical Design Journey">
                📍 Part of Flow Graph Step {stepInfo.id}: {stepInfo.title}
              </Link>
            )}
            <h2>🔒 Content Locked</h2>
            <p className={styles.lockMessage}>
              This document is currently locked and not available for public access.
            </p>
            <p>
              Access to this content is restricted.
              Please purchase the course or contact the administrator for access.
            </p>
            <div className={styles.lockBox}>
              <p>🚫 Read Access: Disabled</p>
              <p>🚫 Download: Disabled</p>
              <p>🚫 Copy/Print: Disabled</p>
            </div>
            <Link to="/login" className={styles.unlockBtn}>
              Login to Request Access
            </Link>
          </div>
        ) : (
          <>
            {hasNative && (readingMode === 'website' || !hasIframes) ? (
              <ErrorBoundary>
                <Suspense fallback={<div className={styles.loadingText} style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading module content...</div>}>
                  {React.createElement(NATIVE_COMPONENTS[moduleId])}
                </Suspense>
              </ErrorBoundary>
            ) : (
              moduleInfo.iframes && moduleInfo.iframes.length > 0 && (
                <div className={styles.iframeGrid}>
                  {moduleInfo.iframes.map((item, idx) => (
                    <div key={idx} className={styles.contentSection} style={{ marginTop: '30px' }}>
                      <h2>{item.heading.split('–')[0]} – Study Material (Read Only)</h2>
                      <div className={styles.iframeWrapper}>
                        <div className={styles.docControlBar}>
                          <span className={styles.docControlTitle}>🔒 Protected Document Viewer</span>
                          <div className={styles.docControlGroup}>
                            <button 
                              className={styles.docControlBtn}
                              onClick={() => {
                                const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                                if (wrapper) wrapper.scrollTop -= 600;
                              }}
                              title="Scroll Up"
                            >
                              ⬆ Scroll Up
                            </button>
                            <button 
                              className={styles.docControlBtn}
                              onClick={() => {
                                const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                                if (wrapper) wrapper.scrollTop += 600;
                              }}
                              title="Scroll Down"
                            >
                              ⬇ Scroll Down
                            </button>
                            <button 
                              className={styles.docControlBtn}
                              onClick={() => {
                                const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                                if (wrapper) wrapper.scrollTop = 0;
                              }}
                              title="Top of Document"
                            >
                              ⏫ Top
                            </button>
                            <button 
                              className={styles.docControlBtn}
                              onClick={() => {
                                const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                                if (wrapper) wrapper.scrollTop = wrapper.scrollHeight;
                              }}
                              title="Bottom of Document"
                            >
                              ⏬ Bottom
                            </button>
                          </div>
                        </div>
                        <div id={`iframe-wrapper-free-${moduleId}-${idx}`} className={styles.iframeInnerWrapper}>
                          <div 
                            className={styles.iframeShield}
                            onContextMenu={(e) => e.preventDefault()}
                            onSelectStart={(e) => e.preventDefault()}
                            onMouseDown={(e) => e.preventDefault()}
                            onWheel={(e) => {
                              const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                              if (wrapper) wrapper.scrollTop += e.deltaY;
                            }}
                            onTouchMove={(e) => {
                              const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                              if (wrapper && e.touches && e.touches[0]) {
                                if (wrapper.lastTouchY !== undefined) {
                                  const deltaY = wrapper.lastTouchY - e.touches[0].clientY;
                                  wrapper.scrollTop += deltaY;
                                }
                                wrapper.lastTouchY = e.touches[0].clientY;
                              }
                            }}
                            onTouchEnd={() => {
                              const wrapper = document.getElementById(`iframe-wrapper-free-${moduleId}-${idx}`);
                              if (wrapper) wrapper.lastTouchY = undefined;
                            }}
                          />
                          <iframe
                            src={item.url}
                            width="100%"
                            className={styles.moduleIframe}
                            title={`Module ${moduleInfo.id} content ${idx + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </>
        )}

        <div className={styles.moduleNavigation}>
          {moduleId > 1 && (
            <Link to={`/modules/${moduleId - 1}`} className={styles.navBtn}>
              &laquo; Previous
            </Link>
          )}
          <Link to="/modules" className={styles.navBtn}>
            📘 All Modules
          </Link>
          {moduleId < Object.keys(modulesData).length && (
            <Link to={`/modules/${moduleId + 1}`} className={styles.navBtn}>
              Next &raquo;
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ModuleDetail;
