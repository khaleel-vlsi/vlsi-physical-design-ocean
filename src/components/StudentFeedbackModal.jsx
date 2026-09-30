import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { submitStudentFeedback } from '../services/feedbackService';
import styles from './StudentFeedbackModal.module.css';

const TAG_OPTIONS = [
  '🎯 Clear Explanations',
  '💼 Job-Ready Skills',
  '⚡ Great Scripting',
  '📚 Top Materials',
  '🚀 Career Growth',
  '📝 Helpful Quizzes'
];

const MODULE_OPTIONS = [
  'Overall VLSI Physical Design Course',
  'Module 1: Introduction to Electronics',
  'Module 2: MOSFET & CMOS Theory',
  'Module 3: Digital Electronics',
  'Module 4: Linux & Basic Tcl Scripting',
  'Module 5: RTL Coding using Verilog',
  'Module 6: Logical Synthesis',
  'Module 7: Design For Testability (DFT)',
  'Module 8: Physical Synthesis',
  'Module 9: Static Timing Analysis - 1',
  'Module 10: Static Timing Analysis - 2',
  'Module 11: Static Timing Analysis - 3',
  'Module 12: PNR Inputs & Sanity Checks',
  'Module 13: FloorPlan & PowerPlan',
  'Module 14: Placement',
  'Module 15: Clock Tree Synthesis - 1',
  'Module 16: Clock Tree Synthesis - 2',
  'Module 17: Routing',
  'Module 18: Physical Verification & Signoff'
];

const StudentFeedbackModal = ({ isOpen, onClose, onFeedbackSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedModule, setSelectedModule] = useState(MODULE_OPTIONS[0]);
  const [selectedTag, setSelectedTag] = useState(TAG_OPTIONS[0]);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setError('Please enter your written review thoughts.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await submitStudentFeedback({
        rating,
        moduleId: selectedModule,
        reviewText: reviewText.trim(),
        tag: selectedTag,
        user
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setReviewText('');
        if (onFeedbackSubmitted) onFeedbackSubmitted();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className={styles.header}>
          <h2>⭐ Rate & Review Course</h2>
          <p>Share your authentic learning experience with fellow VLSI physical design students.</p>
        </div>

        {!user ? (
          <div className={styles.lockCard}>
            <span className={styles.lockIcon}>🔒</span>
            <h3>Registered Account Required</h3>
            <p>
              Only enrolled and registered students can leave feedback and ratings for course modules. 
              Please log in to your student account to write a review.
            </p>
            <Link to="/login" className={styles.loginBtn} onClick={onClose}>
              🔑 Log In to Write Review
            </Link>
          </div>
        ) : success ? (
          <div className={styles.successMsg}>
            <h3>🎉 Feedback Submitted Successfully!</h3>
            <p>Thank you for contributing your review to the VLSI Physical Design Ocean community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.formGroup}>
              <label>Select Rating Score</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`${styles.starBtn} ${(hoverRating || rating) >= star ? styles.active : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Select Module / Subject</label>
              <select
                className={styles.selectInput}
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
              >
                {MODULE_OPTIONS.map((mod, idx) => (
                  <option key={idx} value={mod}>
                    {mod}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Select Feedback Highlight Tag</label>
              <div className={styles.tagsGrid}>
                {TAG_OPTIONS.map((tag, idx) => (
                  <button
                    type="button"
                    key={idx}
                    className={`${styles.tagPill} ${selectedTag === tag ? styles.selectedTag : ''}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Your Detailed Review</label>
              <textarea
                className={styles.textareaInput}
                placeholder="Write your thoughts about the concept clarity, script tutorials, module content, or quiz practice..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value.slice(0, 500))}
                required
              />
              <div className={styles.charCount}>{reviewText.length} / 500 characters</div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Submitting Review...' : '🚀 Submit Course Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentFeedbackModal;
