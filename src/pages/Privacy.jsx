import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Privacy.module.css';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Policies & Guidelines" 
        description="Review the terms of service, privacy policy, and refund policy for VLSI Physical Design Ocean."
        url="/privacy"
      />
      <div className={styles.policyContainer}>
      {/* 1. Header Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Policies & Guidelines</h1>
        <p className={styles.subtitle}>
          Transparency is the blueprint of our educational ecosystem. Review our commitments to your data security and service clarity.
        </p>
      </section>

      {/* 2. Main Grid Layout */}
      <section className={styles.policyGrid}>
        
        {/* Left Card: Privacy Policy */}
        <div className={styles.policyCard}>
          <div className={`${styles.cardIcon} ${styles.privacyIcon}`}>🔒</div>
          <div className={styles.cardLabel}>Privacy Policy</div>
          <p className={styles.cardText}>
            The VLSI Physical Design Ocean platform is built to provide an educational structural path for engineering graduates and professionals (up to 3+ years experience). Any personal data provided during registration for our free or premium modules will be kept securely and never shared with third parties. We utilize industry-standard encryption to ensure your learning progress remains strictly confidential.
            <br/><br/>
            <strong>Advertisements & Cookies:</strong> We use third-party advertising companies, including Google AdSense, to serve ads on our free modules. Google uses cookies (including the DoubleClick cookie) to serve ads based on a user's prior visits to this website. You can opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" style={{color: '#4285f4'}}>Ads Settings</a>.
          </p>
          <div className={styles.checklist}>
            <div className={styles.checkItem}>
              <span className={styles.checkCircle}>✔</span> DATA ENCRYPTION AT REST
            </div>
            <div className={styles.checkItem}>
              <span className={styles.checkCircle}>✔</span> ZERO THIRD-PARTY DATA SALES
            </div>
            <div className={styles.checkItem}>
              <span className={styles.checkCircle}>✔</span> ANONYMIZED USAGE ANALYTICS
            </div>
          </div>
        </div>

        {/* Right Card: Refund Policy */}
        <div className={styles.policyCard}>
          <div className={`${styles.cardIcon} ${styles.refundIcon}`}>💳</div>
          <div className={styles.cardLabel}>Refund Policy</div>
          <p className={styles.cardText}>
            Due to the digital nature of our physical design modules, all sales are final. Refunds are strictly not issued once access to laboratory resources or course materials has been provisioned. 
          </p>
          <div className={styles.warningBox}>
            <p><strong>Note:</strong> Refunds are absolutely void if a user is found violating our Terms of Service.</p>
          </div>
        </div>

        {/* Third Card: Terms of Service */}
        <div className={`${styles.policyCard} ${styles.fullWidthCard}`}>
          <div className={`${styles.cardIcon} ${styles.termsIcon}`}>📝</div>
          <div className={styles.cardLabel}>Terms of Service & Usage</div>
          <div className={styles.termsGrid}>
            <div className={styles.termsItem}>
              <h4>🚫 Proprietary Content Protection</h4>
              <p>Strictly no copying, downloading, or redistributing our step-by-step industrial tool execution guides, TCL/Linux script samples, real-time problem solutions, or interview Q&As. This highly affordable premium content is protected by digital watermarking.</p>
            </div>
            <div className={styles.termsItem}>
              <h4>👤 Single Account Policy</h4>
              <p>Premium access is limited to <strong>one user per account</strong>. Any account found being accessed from multiple devices or shared with others will be <strong>terminated immediately</strong>.</p>
            </div>
            <div className={styles.termsItem}>
              <h4>⚖️ Access Termination</h4>
              <p>We reserve the right to revoke access without notice if any of our rules are violated. In such cases, <strong>no refunds</strong> will be provided under any circumstances.</p>
            </div>
            <div className={styles.termsItem}>
              <h4>⏳ Progressive Unlocking & Access Pacing</h4>
              <p>To encourage structured learning and protect curriculum integrity, certain career development files have scheduled locks. Resume & career templates (Module 24) unlock automatically 1 month (30 days) after course purchase. Course certifications (Module 23) unlock automatically 3 months (90 days) after course purchase.</p>
            </div>
            <div className={styles.termsItem}>
              <h4>🔒 Active Anti-Copy Measures</h4>
              <p>Our premium document viewer has strict anti-piracy controls. Actions such as right-clicking, text copying, dragging content, printing, or attempting to save files are electronically blocked. Violations may result in automatic account suspension.</p>
            </div>
          </div>
        </div>

      </section>

      {/* 3. Bottom Banner Image */}
      <section className={styles.bottomBanner}>
        <img loading="lazy" src="/chip.png" alt="Hardware background" className={styles.bannerImg} />
      </section>

      </div>
    </>
  );
};

export default Privacy;
