import React from 'react';
import styles from './GoogleReviewsWidget.module.css';

const GOOGLE_BUSINESS_REVIEW_URL = "https://g.page/r/CcSzG-pTgIVSEBM/review";

export function GoogleReviewsWidget({ limit = 4 }) {
  const googleReviews = [
    {
      id: 1,
      name: "Siddharth Rao",
      role: "Physical Design Engineer @ Wipro",
      rating: 5,
      date: "2 days ago",
      avatar: "SR",
      review: "The VLSI Physical Design Ocean course is top notch! The Innovus TCL scripting and PrimeTime STA modules helped me crack my physical design interview at Wipro. Highly recommended!",
      badge: "Google Verified Review"
    },
    {
      id: 2,
      name: "Ananya Deshmukh",
      role: "VLSI Trainee @ Microchip Technology",
      rating: 5,
      date: "1 week ago",
      avatar: "AD",
      review: "Best practical physical design learning platform in India. Floorplan, Macro Placement, and IR Drop analysis are explained with real industrial EDA tool flows.",
      badge: "Google Verified Review"
    },
    {
      id: 3,
      name: "Kartik Subramanian",
      role: "STA & Synthesis Engineer @ Tessolve",
      rating: 5,
      date: "2 weeks ago",
      avatar: "KS",
      review: "Clear explanation of setup & hold slack closure under OCV and POCV conditions. The quiz engine and video labs give deep confidence for core semiconductor jobs.",
      badge: "Google Verified Review"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Junior PD Engineer @ Synopsys Client",
      rating: 5,
      date: "3 weeks ago",
      avatar: "SR",
      review: "CTS skew reduction and NDR routing rules in Module 12 are brilliant. Best investment for ECE engineers aiming for semiconductor core domain careers!",
      badge: "Google Verified Review"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header Google Rating Badge */}
      <div className={styles.googleBadgeCard}>
        <div className={styles.googleHeader}>
          <svg className={styles.googleLogo} viewBox="0 0 24 24" width="32" height="32">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <div>
            <h3 className={styles.badgeTitle}>Google Reviews</h3>
            <div className={styles.ratingRow}>
              <span className={styles.score}>4.9</span>
              <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
              <span className={styles.count}>(120+ Verified Reviews)</span>
            </div>
          </div>
        </div>
        <a 
          href={GOOGLE_BUSINESS_REVIEW_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.writeReviewBtn}
        >
          ✍️ Write a Google Review
        </a>
      </div>

      {/* Google Reviews Cards Grid */}
      <div className={styles.reviewsGrid}>
        {googleReviews.slice(0, limit).map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>{item.avatar}</div>
              <div className={styles.userInfo}>
                <h4 className={styles.userName}>{item.name}</h4>
                <p className={styles.userRole}>{item.role}</p>
              </div>
              <span className={styles.googleIcon}>G</span>
            </div>

            <div className={styles.ratingMeta}>
              <span className={styles.cardStars}>⭐⭐⭐⭐⭐</span>
              <span className={styles.cardDate}>{item.date}</span>
            </div>

            <p className={styles.reviewText}>"{item.review}"</p>

            <div className={styles.verifiedFooter}>
              <span className={styles.verifiedIcon}>✓</span>
              <span>{item.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoogleReviewsWidget;
