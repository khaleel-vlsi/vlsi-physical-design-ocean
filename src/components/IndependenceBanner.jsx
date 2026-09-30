import React, { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/independenceOffer.js';
import styles from './IndependenceBanner.module.css';

const IndependenceBanner = () => {
  const [timerState, setTimerState] = useState(() => getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerState(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Hide banner ONLY after offer has officially expired
  if (timerState.expired) {
    return null;
  }

  const isPreLaunch = timerState.state === 'BEFORE_OFFER';

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerContent}>
        <div className={styles.leftPill}>
          <span className={styles.flag}>🇮🇳</span>
          <span className={styles.title}>INDEPENDENCE DAY OFFER</span>
          <span className={styles.discountBadge}>{isPreLaunch ? '25% OFF' : '25% OFF LIVE'}</span>
        </div>

        <div className={styles.timerPill}>
          <span className={styles.timerIcon}>⏰</span>
          <span className={styles.timerLabel}>
            {isPreLaunch ? 'STARTS 14 AUG 12:00 PM IST:' : 'ENDS 16 AUG 8:00 PM IST:'}
          </span>
          <span className={styles.countdownText}>
            {isPreLaunch ? `STARTS IN ${timerState.formatted}` : `${timerState.formatted} LEFT`}
          </span>
        </div>

        <div className={styles.pricingSummary}>
          {isPreLaunch ? (
            <span>25% OFF starts 14 Aug 12 PM IST · Plans from <strong className={styles.priceHighlight}>₹374</strong></span>
          ) : (
            <span>Plans from <strong className={styles.priceHighlight}>₹374</strong> (Reg. <del>₹499</del>)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndependenceBanner;
