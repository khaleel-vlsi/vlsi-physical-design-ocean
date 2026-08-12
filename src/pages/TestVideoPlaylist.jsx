import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VIDEO_MODULES } from '../data/videoModulesData';
import SecureVideoPlayer from '../components/SecureVideoPlayer';
import ModuleQuickNav from '../components/ModuleQuickNav';
import SubscriptionModal from '../components/SubscriptionModal';
import { useAuth } from '../context/AuthContext';
import styles from './TestVideoPlaylist.module.css';

import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';

const TestVideoPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPremiumAccess } = useAuth() || {};
  
  const modId = parseInt(id, 10) || 1;
  const moduleData = VIDEO_MODULES[id];
  
  const [activeSession, setActiveSession] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState('additional recorded lectures');

  // Modules 1 to 7 allow 1 free video preview (index 0)
  const isFreePreviewModule = modId <= 7;

  useEffect(() => {
    // If not premium access and not a free preview module, show subscription modal
    if (!hasPremiumAccess && !isFreePreviewModule) {
      setModalTarget(`Module ${id} Video Playlist`);
      setModalOpen(true);
    }
  }, [hasPremiumAccess, isFreePreviewModule, id]);

  useEffect(() => {
    // Set the first session as active initially
    if (moduleData && moduleData.sessions && moduleData.sessions.length > 0) {
      setActiveSession(moduleData.sessions[0]);
    }
  }, [moduleData]);

  if (!moduleData) {
    return (
      <div className={styles.playlistContainer} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <SEO title="Video Module Not Found" url={`/test-video-modules/${id}`} />
        <h2>Video Module Not Found</h2>
        <button onClick={() => navigate('/test-videos')} className={styles.backButton}>
          Return to Video Library
        </button>
      </div>
    );
  }

  return (
    <div className={styles.playlistContainer}>
      <SEO 
        title={`Module ${id}: ${moduleData.title} Video Lectures`}
        description={`Watch ${moduleData.sessions ? moduleData.sessions.length : 0} comprehensive video lectures on ${moduleData.title} in our VLSI Physical Design Master Series.`}
        url={`/test-video-modules/${id}`}
        image={moduleData.thumbnail}
        keywords={[moduleData.title, "vlsi video lectures", "pnr video modules", "sta video course"]}
        structuredData={
          <StructuredData 
            course={{
              "@context": "https://schema.org",
              "@type": "Course",
              "name": `Module ${id}: ${moduleData.title}`,
              "description": moduleData.description,
              "provider": {
                "@type": "Organization",
                "name": "VLSI Physical Design Ocean",
                "sameAs": "https://vlsiphysicaldesignocean.com"
              }
            }}
          />
        }
      />
      <ModuleQuickNav moduleId={id} activeTab="video" />

      <header className={styles.header}>
        <h1 className={styles.moduleTitle}>Module {id}: {moduleData.title}</h1>
        {!hasPremiumAccess && isFreePreviewModule && (
          <div style={{
            marginTop: '12px',
            padding: '8px 16px',
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            borderRadius: '12px',
            color: '#00f2fe',
            fontSize: '0.88rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>💡 Free Preview Mode: Video #1 is unlocked. Subscribe to unlock all videos in this module.</span>
          </div>
        )}
      </header>

      <div className={styles.mainLayout}>
        {/* Left Side: Video Player */}
        <div className={styles.playerSection}>
          {activeSession ? (
            <>
              <SecureVideoPlayer key={activeSession.id} videoId={activeSession.youtubeId} title={activeSession.title} />
              
              <div className={styles.currentVideoInfo}>
                <h2 className={styles.currentVideoTitle}>{activeSession.title}</h2>
                <span className={styles.currentVideoDuration}>Duration: {activeSession.duration}</span>
                {activeSession.description && (
                  <p className={styles.currentVideoDescription}>{activeSession.description}</p>
                )}
              </div>
            </>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              Select a session to start watching.
            </div>
          )}
        </div>

        {/* Right Side: Playlist */}
        <div className={styles.playlistSection}>
          <div className={styles.playlistHeader}>
            <h3>Course Sessions ({moduleData.sessions.length})</h3>
          </div>
          
          <div className={styles.sessionsList}>
            {moduleData.sessions.map((session, index) => {
              const isActive = activeSession && activeSession.id === session.id;
              // Session index 0 is free for modules 1-8. Index > 0 or modules 9+ require premium
              const isLockedForUser = !hasPremiumAccess && (!isFreePreviewModule || index > 0);
              
              return (
                <div 
                  key={session.id} 
                  className={`${styles.sessionItem} ${isActive ? styles.active : ''} ${isLockedForUser ? styles.locked : ''}`}
                  onClick={() => {
                    if (isLockedForUser) {
                      setModalTarget(`Video ${index + 1}: ${session.title}`);
                      setModalOpen(true);
                    } else {
                      setActiveSession(session);
                    }
                  }}
                  style={isLockedForUser ? { cursor: 'pointer', opacity: 0.85 } : { cursor: 'pointer' }}
                >
                  <div className={styles.playIconWrapper}>
                    {isLockedForUser ? (
                      <span title="Locked - Subscribe to unlock">🔒</span>
                    ) : isActive ? (
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className={styles.sessionDetails}>
                    <h4 className={styles.sessionTitle}>
                      {session.title} {isLockedForUser && <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: 'bold', marginLeft: '6px' }}>[LOCKED]</span>}
                    </h4>
                    <span className={styles.sessionDuration}>{session.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AdUnit slotId="slot_test_videoplaylist_outside" />

      <SubscriptionModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Subscribe to Unlock Full Playlist"
        featureName={modalTarget}
      />
    </div>
  );
};

export default TestVideoPlaylist;
