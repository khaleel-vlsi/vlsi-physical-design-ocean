import React, { useState, useEffect } from 'react';
import { getDiwaliTimeRemaining } from '../utils/diwaliOffer.js';
import styles from './IndependenceBanner.module.css';

const IndependenceBanner = () => {
  const [timerState, setTimerState] = useState(() => getDiwaliTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerState(getDiwaliTimeRemaining());
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
          <span className={styles.flag}>🪔</span>
          <span className={styles.title}>DIWALI OFFER</span>
          <span className={styles.discountBadge}>{isPreLaunch ? '35% OFF' : '35% OFF LIVE'}</span>
        </div>

        <div className={styles.timerPill}>
          <span className={styles.timerIcon}>⏰</span>
          <span className={styles.timerLabel}>
            {isPreLaunch ? 'STARTS 1 NOV 11:00 AM IST:' : 'ENDS 7 NOV 12:30 PM IST:'}
          </span>
          <span className={styles.countdownText}>
            {isPreLaunch ? `STARTS IN ${timerState.formatted}` : `${timerState.formatted} LEFT`}
          </span>
        </div>

        <div className={styles.pricingSummary}>
          {isPreLaunch ? (
            <span>35% OFF starts 1 Nov 11 AM IST · Plans from <strong className={styles.priceHighlight}>₹324</strong></span>
          ) : (
            <span>Plans from <strong className={styles.priceHighlight}>₹324</strong> (Reg. <del>₹499</del>)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndependenceBanner;
