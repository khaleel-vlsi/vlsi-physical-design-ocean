import React from 'react';
import styles from './Home.module.css';

const Privacy = () => {
  return (
    <div className={styles.contentSection}>
      <h2>Privacy Policy</h2>
      <p>
        This website is for educational purposes. 
        Your data provided during registration will be kept securely 
        and not shared with third parties.
      </p>
      <h3>Refund Policy</h3>
      <p>
        Please review our refund policy carefully. Refunds are only applicable under specific conditions outlined during the checkout process.
      </p>
    </div>
  );
};

export default Privacy;
