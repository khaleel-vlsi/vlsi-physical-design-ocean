import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VIDEO_MODULES } from '../data/videoModulesData';
import SecureVideoPlayer from '../components/SecureVideoPlayer';
import ModuleQuickNav from '../components/ModuleQuickNav';
import { useAuth } from '../context/AuthContext';
import styles from './TestVideoPlaylist.module.css';

import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const TestVideoPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPremiumAccess } = useAuth() || {};
  
  const moduleData = VIDEO_MODULES[id];
  
  const [activeSession, setActiveSession] = useState(null);

  // All video modules are locked for free users
  const isActuallyLocked = !hasPremiumAccess;

  useEffect(() => {
    if (isActuallyLocked) {
      navigate(`/modules/${id}`);
    }
  }, [isActuallyLocked, navigate, id]);

  useEffect(() => {
    // When the component mounts or ID changes, set the first session as active
    if (moduleData && moduleData.sessions.length > 0) {
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
      </header>

      <div className={styles.mainLayout}>
        {/* Left Side: Video Player */}
        <div className={styles.playerSection}>
          {activeSession ? (
            <>
              <SecureVideoPlayer key={id} videoId={activeSession.youtubeId} title={activeSession.title} />
              
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
              
              return (
                <div 
                  key={session.id} 
                  className={`${styles.sessionItem} ${isActive ? styles.active : ''}`}
                  onClick={() => setActiveSession(session)}
                >
                  <div className={styles.playIconWrapper}>
                    {isActive ? (
                      // Playing animation or pause icon could go here, using a simple triangle for now
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className={styles.sessionDetails}>
                    <h4 className={styles.sessionTitle}>{session.title}</h4>
                    <span className={styles.sessionDuration}>{session.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVideoPlaylist;
