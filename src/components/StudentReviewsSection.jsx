import React, { useState, useEffect } from 'react';
import { fetchStudentFeedback, calculateRatingStats } from '../services/feedbackService';
import StudentFeedbackModal from './StudentFeedbackModal';
import styles from './StudentReviewsSection.module.css';

const StudentReviewsSection = ({ limit = null, title = "Student Reviews & Ratings", subtitle = "Authentic feedback & ratings from enrolled VLSI Physical Design students." }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStar, setSelectedStar] = useState('ALL');
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await fetchStudentFeedback();
      setReviews(data);
    } catch (e) {
      console.error('Failed to load reviews:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const stats = calculateRatingStats(reviews);

  // Filter reviews
  let filtered = reviews.filter((r) => {
    if (selectedStar !== 'ALL' && Math.round(r.rating) !== Number(selectedStar)) {
      return false;
    }
    if (selectedModule !== 'ALL' && !r.moduleId.toLowerCase().includes(selectedModule.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (limit) {
    filtered = filtered.slice(0, limit);
  }

  const handleHelpfulClick = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerSection}>
        <h2>⭐ {title}</h2>
        <p>{subtitle}</p>
      </div>

      {/* Hero Summary Card */}
      <div className={styles.summaryCard}>
        <div className={styles.scoreBlock}>
          <div className={styles.bigNum}>{stats.avgRating}</div>
          <div className={styles.starDisplay}>
            {'★'.repeat(Math.round(Number(stats.avgRating)))}
            {'☆'.repeat(5 - Math.round(Number(stats.avgRating)))}
          </div>
          <div className={styles.subText}>Based on {stats.totalCount}+ Verified Reviews</div>
        </div>

        <div className={styles.barsBlock}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star] || 0;
            const pct = stats.totalCount ? Math.round((count / stats.totalCount) * 100) : 0;
            return (
              <div key={star} className={styles.barRow}>
                <span className={styles.barLabel}>{star} Stars</span>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: `${pct}%` }} />
                </div>
                <span className={styles.barCount}>{count}</span>
              </div>
            );
          })}
        </div>

        <div className={styles.ctaBlock}>
          <div className={styles.recommendBadge}>
            👍 {stats.recommendPercent}% Recommended
          </div>
          <button className={styles.writeReviewBtn} onClick={() => setIsModalOpen(true)}>
            ✍️ Write a Review
          </button>
        </div>
      </div>

      {/* Toolbar Filters */}
      <div className={styles.toolbar}>
        <div className={styles.filterGroup}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Filter:</span>
          {['ALL', 5, 4, 3].map((star) => (
            <button
              key={star}
              className={`${styles.filterBtn} ${selectedStar === String(star) ? styles.activeFilter : ''}`}
              onClick={() => setSelectedStar(String(star))}
            >
              {star === 'ALL' ? 'All Ratings' : `${star} ⭐`}
            </button>
          ))}
        </div>

        <div className={styles.filterGroup}>
          <select
            className={styles.selectFilter}
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="ALL">All Course Modules</option>
            <option value="Module 1">Module 1: Intro to Electronics</option>
            <option value="Module 2">Module 2: MOSFET & CMOS</option>
            <option value="Module 6">Module 6: Logical Synthesis</option>
            <option value="Module 8">Module 8: Physical Synthesis</option>
            <option value="Module 15">Module 15: CTS - 1</option>
            <option value="Module 16">Module 16: CTS - 2</option>
            <option value="Module 17">Module 17: Routing</option>
            <option value="Module 18">Module 18: Verification & Signoff</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      {loading ? (
        <div className={styles.emptyState}>Loading student reviews...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>No student reviews matching the selected filter.</div>
      ) : (
        <div className={styles.reviewsGrid}>
          {filtered.map((r) => {
            const initial = r.studentName ? r.studentName.charAt(0).toUpperCase() : 'S';
            const extraHelpful = helpfulCounts[r.id] || 0;
            return (
              <div key={r.id} className={styles.reviewCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.avatar}>{initial}</div>
                  <div className={styles.studentInfo}>
                    <div className={styles.studentName}>
                      {r.studentName}
                      {r.verified && <span className={styles.verifiedBadge}>✓ Verified Student</span>}
                    </div>
                    <div className={styles.dateText}>{r.dateTime}</div>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.starsRow}>
                    {'★'.repeat(Math.round(r.rating))}
                    {'☆'.repeat(5 - Math.round(r.rating))}
                  </div>
                  <div className={styles.moduleTag}>{r.moduleId}</div>
                  <p className={styles.reviewText}>{r.reviewText}</p>
                </div>

                <div className={styles.cardFooter}>
                  {r.tag && <span className={styles.highlightTag}>{r.tag}</span>}
                  <button
                    className={styles.helpfulBtn}
                    onClick={() => handleHelpfulClick(r.id)}
                  >
                    👍 Helpful ({(r.helpfulCount || 0) + extraHelpful})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Popup */}
      <StudentFeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeedbackSubmitted={loadData}
      />
    </section>
  );
};

export default StudentReviewsSection;
