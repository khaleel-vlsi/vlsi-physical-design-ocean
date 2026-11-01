import React, { useState, useEffect } from 'react';
import { getDiwaliTimeRemaining } from '../utils/diwaliOffer.js';
import styles from './DiwaliBanner.module.css';

/**
 * Diwali 35% OFF campaign banner (India plans only).
 * Auto-hides once the offer expires (7 Nov 2026, 12:30 PM IST).
 */
const DiwaliBanner = ({ hidden = false }) => {
  const [timerState, setTimerState] = useState(() => getDiwaliTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => setTimerState(getDiwaliTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (hidden || timerState.expired) return null;

  const isPreLaunch = timerState.state === 'BEFORE_OFFER';
  const { hours, minutes, seconds } = timerState;
  const days = Math.floor(timerState.totalSeconds / 86400);
  const h = hours % 24;
  const pad = (n) => String(n).padStart(2, '0');

  const goToPlans = () => {
    const el = document.getElementById('plans-pricing-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = '/dashboard#plans-pricing-section';
  };

  return (
    <div className={styles.bannerWrapper} role="region" aria-label="Diwali Offer">
      <div className={styles.sparkles} aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => <span key={i} className={styles.spark} />)}
      </div>

      <div className={styles.bannerContent}>
        <div className={styles.leftGroup}>
          <span className={styles.diya} aria-hidden="true">🪔</span>
          <div className={styles.titleBlock}>
            <span className={styles.title}>Happy Diwali Offer</span>
            <span className={styles.subtitle}>New plans &amp; extensions · India plans</span>
          </div>
          <span className={styles.discountBadge}>{isPreLaunch ? '35% OFF' : '35% OFF · LIVE'}</span>
        </div>

        <div className={styles.timerGroup}>
          <span className={styles.timerLabel}>
            {isPreLaunch ? 'Starts in' : 'Ends 7 Nov, 12:30 PM IST'}
          </span>
          <div className={styles.timerBoxes}>
            {days > 0 && (<div className={styles.tBox}><b>{days}</b><small>Days</small></div>)}
            <div className={styles.tBox}><b>{pad(h)}</b><small>Hrs</small></div>
            <div className={styles.tBox}><b>{pad(minutes)}</b><small>Min</small></div>
            <div className={styles.tBox}><b>{pad(seconds)}</b><small>Sec</small></div>
          </div>
        </div>

        <div className={styles.rightGroup}>
          <span className={styles.pricing}>
            From <strong>₹324</strong> <del>₹499</del>
          </span>
          {!isPreLaunch && (
            <button type="button" id="diwali-banner-cta" className={styles.cta} onClick={goToPlans}>
              Grab Offer ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiwaliBanner;
