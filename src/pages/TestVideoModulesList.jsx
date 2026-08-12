import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VIDEO_MODULES } from '../data/videoModulesData';
import { useAuth } from '../context/AuthContext';
import SubscriptionModal from '../components/SubscriptionModal';

import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';

import styles from './TestVideoModulesList.module.css';

const TestVideoModulesList = () => {
  const navigate = useNavigate();
  const { hasPremiumAccess } = useAuth() || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('full video modules');

  // Convert the object mapping to an array for rendering
  const videoModulesArray = Object.values(VIDEO_MODULES);

  return (
    <div className={styles.modulesContainer}>
      <SEO 
        title="Free VLSI Physical Design Video Lectures & PnR Playlists"
        description="Watch free VLSI Physical Design video lectures and session previews. Learn PnR execution, STA, synthesis, and CTS with 1 free sample video per module for Modules 1–7."
        url="/test-video-modules"
        keywords={["vlsi video courses", "pnr video modules", "sta video lectures", "logic synthesis videos", "cts video course"]}
        structuredData={
          <StructuredData 
            breadcrumb={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://vlsiphysicaldesignocean.com" },
                { "@type": "ListItem", "position": 2, "name": "Recorded Classes", "item": "https://vlsiphysicaldesignocean.com/test-video-modules" }
              ]
            }}
          />
        }
      />
      <header className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Recorded Video Playlists & Lectures</h1>
        <p className={styles.pageSubtitle}>
          Explore structured video playlists for VLSI Physical Design. Guest and free users can watch <span style={{ color: '#00f2fe', fontWeight: 'bold' }}>1 Free Sample Video for Modules 1–7</span> with zero registration popups. Full video playlists for Modules 8+ are available to active subscribers.
        </p>
      </header>

      <div className={styles.gridContainer}>
        {videoModulesArray.map((mod) => {
          const hasVideos = mod.sessions && mod.sessions.length > 0;
          // Modules 1-7 are accessible for free preview (1 sample video per module)
          const isFreePreview = mod.id <= 7;
          const canAccessModule = hasPremiumAccess || isFreePreview;
          
          return (
            <div 
              key={mod.id} 
              className={styles.moduleCardWrapper}
              onClick={() => {
                if (!hasVideos) {
                  alert('⏳ This module is currently under development. Recorded classes will be added starting 31st July 2026.');
                  return;
                }
                if (canAccessModule) {
                  navigate(`/test-video-playlist/${mod.id}`);
                } else {
                  setModalTarget(`Module ${mod.id} (${mod.title}) Video Playlist`);
                  setModalOpen(true);
                }
              }}
              style={!hasVideos ? { opacity: 0.85, cursor: 'pointer' } : {}}
            >
              <div className={styles.moduleCard}>
                <div className={styles.thumbnailContainer}>
                  {mod.thumbnail && (
                    <img src={mod.thumbnail} alt={mod.title} className={styles.thumbnailImage} style={!hasVideos ? { filter: 'grayscale(60%) brightness(50%)' } : {}} />
                  )}
                  <div className={styles.thumbnailOverlay}></div>
                  
                  <div className={styles.topBadges}>
                    <span className={styles.moduleBadge}>MODULE {mod.id}</span>
                    {!hasVideos ? (
                      <span className={styles.lockedBadge} style={{ background: '#f59e0b', borderColor: '#d97706', color: '#fff' }} title="Under Development">
                        DEVELOPMENT
                      </span>
                    ) : !hasPremiumAccess && isFreePreview ? (
                      <span className={styles.moduleBadge} style={{ background: 'rgba(0, 242, 254, 0.2)', border: '1px solid #00f2fe', color: '#00f2fe' }}>
                        FREE PREVIEW
                      </span>
                    ) : !hasPremiumAccess && !isFreePreview ? (
                      <span className={styles.lockedBadge} title="Locked">
                        <svg viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" /></svg>
                      </span>
                    ) : null}
                  </div>

                  {hasVideos ? (
                    <div className={styles.playIconWrapper}>
                      {!hasPremiumAccess && !isFreePreview ? (
                        <svg viewBox="0 0 24 24" style={{marginLeft: 0}}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      )}
                    </div>
                  ) : (
                    <div className={styles.playIconWrapper} style={{ background: 'rgba(245,158,11,0.2)', border: '2px solid #f59e0b' }}>
                      <svg viewBox="0 0 24 24" style={{ fill: '#f59e0b', width: '22px', height: '22px', marginLeft: 0 }}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h2 className={styles.moduleTitle}>{mod.title}</h2>
                  {hasVideos ? (
                    <span className={styles.videoCount}>
                      <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>
                      {mod.sessions.length} Videos {!hasPremiumAccess && isFreePreview ? '(1 Sample Free)' : ''}
                    </span>
                  ) : (
                    <span className={styles.videoCount} style={{ color: '#f59e0b', fontWeight: 'bold' }}>
                      ⏳ Under Development (Will add 31st July 2026)
                    </span>
                  )}
                  
                  <div style={{ marginTop: '14px' }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/test-quiz-playlist/${mod.id}`);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.35) 100%)',
                        border: '1px solid #10b981',
                        color: '#34d399',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      📝 Take Quiz Test for Module {mod.id}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AdUnit slotId="slot_test_videos_bottom" />

      <SubscriptionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscribe to Unlock Recorded Classes"
        featureName={modalTarget}
      />
    </div>
  );
};

export default TestVideoModulesList;
