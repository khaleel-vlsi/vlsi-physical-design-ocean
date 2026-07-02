import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { modulesData } from '../data/modulesData';
import styles from './ModuleDetail.module.css';
import Module1Content from './modules/Module1Content';
import MOSFETCMOSContent from './modules/MOSFETCMOSContent';
import Module5Content from './modules/Module5Content';
import Module7Content from './modules/Module7Content';
import Module8Content from './modules/Module8Content';
import Module4Content from './modules/Module4Content';
import Module6Content from './modules/Module6Content';
import Module58Content from './modules/Module58Content';
import Module59Content from './modules/Module59Content';
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

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useAuth() || {};
  const moduleId = parseInt(id);
  const moduleInfo = modulesData[String(moduleId)];

  React.useEffect(() => {
    if (profile) {
      const isFuture = (ts) => ts && new Date(ts).getTime() > Date.now();
      const courseValid = profile.course_active && isFuture(profile.course_expiry);
      if (courseValid && moduleId >= 9 && moduleId <= 59) {
        navigate(`/paid-modules/module/${moduleId}`, { replace: true });
      }
    }
  }, [profile, moduleId, navigate]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

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
        <h1>Module {moduleInfo.id}</h1>
        <p>{moduleInfo.title}</p>
      </header>

      <div className={styles.moduleContent}>
        {(!(moduleInfo.hasNativeContent && NATIVE_COMPONENTS[moduleId]) || moduleInfo.isLocked) && (
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
            {moduleInfo.hasNativeContent && NATIVE_COMPONENTS[moduleId] ? (
              <ErrorBoundary>
                {React.createElement(NATIVE_COMPONENTS[moduleId])}
              </ErrorBoundary>
            ) : (
              moduleInfo.iframes && moduleInfo.iframes.length > 0 && (
                <div className={styles.iframeGrid}>
                  {moduleInfo.iframes.map((item, idx) => (
                    <div key={idx} className={styles.contentSection} style={{ marginTop: '30px' }}>
                      <h2>{item.heading.split('–')[0]} – Study Material (Read Only)</h2>
                      <div className={styles.iframeWrapper}>
                        <iframe
                          src={item.url}
                          width="100%"
                          height="950"
                          className={styles.moduleIframe}
                          title={`Module ${moduleInfo.id} content ${idx + 1}`}
                        />
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
