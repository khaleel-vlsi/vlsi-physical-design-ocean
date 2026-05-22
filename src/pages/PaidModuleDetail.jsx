import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paidModulesData } from '../data/paidModulesData';
import styles from './PaidModuleDetail.module.css';
import { supabase } from '../services/supabase';

const PaidModuleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [viewWidth, setViewWidth] = useState('standard'); // 'standard' or 'full'
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      navigate('/login');
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
          navigate('/dashboard');
          return;
        }
        
        const isFuture = (ts) => ts && new Date(ts).getTime() > Date.now();
        const courseValid = data.course_active && isFuture(data.course_expiry);
        
        if (!courseValid) {
          navigate('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        navigate('/dashboard');
      }
    };

    checkFreshAccess();
  }, [user, navigate]);

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
      <Link to="/paid-modules" className={styles.backLink}>← Back to Paid Modules</Link>
      <Link to="/dashboard" className={styles.dashboardLink}>Go to Dashboard</Link>
      
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

      <div className={styles.iframeContainer}>
        {moduleInfo.isLockedTemporarily ? (
          <div className={styles.lockedState}>
            <span className={styles.lockIcon}>🔒</span>
            <h2>Content Locked</h2>
            <p className={styles.lockText}>
              {moduleInfo.lockMessage || "This content will unlock automatically 1 month after your course purchase."}
            </p>
            <div className={styles.timerBadge}>
              <span>⏳ Unlocking in: {moduleInfo.unlockDays || 30} Days (Scheduled)</span>
            </div>
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
            <h2>Documentation Preparing</h2>
            <p>The premium study materials for this module are currently being attached to the server.</p>
          </div>
        )}
      </div>

      <div className={styles.navRow}>
        {prevModule ? <Link to={`/paid-modules/module/${prevModule.id}`} className={styles.navBtn}>&laquo; Previous</Link> : <div></div>}
        <Link to="/paid-modules" className={styles.navBtn}>📘 All Modules</Link>
        {nextModule ? <Link to={`/paid-modules/module/${nextModule.id}`} className={styles.navBtn}>Next &raquo;</Link> : <div></div>}
      </div>
    </div>
  );
};

export default PaidModuleDetail;