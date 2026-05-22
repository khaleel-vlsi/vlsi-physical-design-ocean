import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <SEO 
        title="404 - Page Not Found" 
        description="The requested page could not be found on VLSI Physical Design Ocean."
        url="/404"
        noindex={true}
      />
      
      <div className={styles.chipBackground}>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
        <div className={styles.gridLine}></div>
      </div>

      <div className={styles.card}>
        <div className={styles.iconContainer}>
          <div className={styles.microchip}>
            <span className={styles.led}></span>
            <span className={styles.led}></span>
            <span className={styles.led}></span>
            <span className={styles.led}></span>
            <div className={styles.inverterSymbol}>&iexcl;</div>
          </div>
        </div>

        <h1 className={styles.title}>404: Signal Propagation Error</h1>
        <p className={styles.subtitle}>
          The path you requested has high impedance (floating gate) or is open-circuited.
        </p>
        <p className={styles.description}>
          This URL could not be mapped to any logical block. Let's steer your input signal back to a known stable state.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            🔌 Reset System (Go Home)
          </Link>
        </div>

        <div className={styles.quickLinks}>
          <span className={styles.quickLinksTitle}>Quick recovery paths:</span>
          <div className={styles.linksRow}>
            <Link to="/modules" className={styles.quickLink}>📚 Learning Modules</Link>
            <span className={styles.divider}>|</span>
            <Link to="/about" className={styles.quickLink}>🏢 About US</Link>
            <span className={styles.divider}>|</span>
            <Link to="/contact" className={styles.quickLink}>📧 Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
