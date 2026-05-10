import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Privacy.module.css';

const Privacy = () => {
  return (
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
            This website is for educational purposes. Your data provided during registration will be kept securely and not shared with third parties. We utilize industry-standard encryption to ensure that your learning progress and personal identifiers remain strictly confidential within the Ocean ecosystem.
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
            Please review our refund policy carefully. Refunds are only applicable under specific conditions outlined during the checkout process. Due to the digital nature of our physical design modules, access is typically considered a final commitment once laboratory resources have been provisioned.
          </p>
          <div className={styles.quoteBox}>
            <p className={styles.quoteText}>
              "Precision in every transaction, clarity in every agreement."
            </p>
          </div>
          <Link to="/contact" className={styles.readMore}>
            Read Full Terms <span>→</span>
          </Link>
        </div>

      </section>

      {/* 3. Bottom Banner Image */}
      <section className={styles.bottomBanner}>
        <img src="/chip.png" alt="Hardware background" className={styles.bannerImg} />
      </section>

    </div>
  );
};

export default Privacy;
