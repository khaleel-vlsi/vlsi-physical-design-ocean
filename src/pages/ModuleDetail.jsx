import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { modulesData } from '../data/modulesData';
import styles from './ModuleDetail.module.css';

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = parseInt(id);
  const moduleInfo = modulesData[moduleId];

  if (!moduleInfo) {
    return (
      <div className={styles.moduleContent}>
        <h2>Module not found</h2>
        <Link to="/modules" className={styles.navBtn}>Back to Modules</Link>
      </div>
    );
  }

  return (
    <>
      <header className={styles.moduleHeader}>
        <h1>Module {moduleInfo.id}</h1>
        <p>{moduleInfo.title}</p>
      </header>

      <div className={styles.moduleContent}>
        <div className={styles.contentSection}>
          <h2>{moduleInfo.id === 26 ? "📚 Reference Materials & User Guides" : "Topics Covered"}</h2>
          <ul>
            {moduleInfo.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {moduleInfo.isLocked ? (
          <div className={styles.lockedModule}>
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
            <Link to="/dashboard" className={styles.unlockBtn}>
              Request Access
            </Link>
          </div>
        ) : (
          moduleInfo.iframes && moduleInfo.iframes.length > 0 && (
            <>
              {moduleInfo.iframes.map((item, idx) => (
                <div key={idx} className={styles.contentSection} style={{ marginTop: '20px' }}>
                  <h2>{item.heading}</h2>
                  <iframe
                    src={item.url}
                    width="100%"
                    height="950"
                    style={{ border: '1px solid #ccc', marginTop: '20px' }}
                    title={`Module ${moduleInfo.id} content ${idx + 1}`}
                  />
                </div>
              ))}
            </>
          )
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
          {moduleId < 26 && (
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
