import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VIDEO_MODULES } from '../data/videoModulesData';
import SecureVideoPlayer from '../components/SecureVideoPlayer';
import { useAuth } from '../context/AuthContext';
import styles from './TestVideoPlaylist.module.css';

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
        <h2>Video Module Not Found</h2>
        <button onClick={() => navigate('/test-videos')} className={styles.backButton}>
          Return to Video Library
        </button>
      </div>
    );
  }

  return (
    <div className={styles.playlistContainer}>
      <header className={styles.header}>
        <button onClick={() => navigate('/test-videos')} className={styles.backButton}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Video Library
        </button>
        <h1 className={styles.moduleTitle}>Module {id}: {moduleData.title}</h1>
      </header>

      <div className={styles.mainLayout}>
        {/* Left Side: Video Player */}
        <div className={styles.playerSection}>
          {activeSession ? (
            <>
              {/* Force re-render of SecureVideoPlayer only when activeSession changes */}
              <SecureVideoPlayer key={activeSession.id} videoId={activeSession.youtubeId} />
              
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
