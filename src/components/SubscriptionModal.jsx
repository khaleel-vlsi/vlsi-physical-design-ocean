import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './SubscriptionModal.module.css';

const SubscriptionModal = ({ isOpen, onClose, title = "Premium Access Required", featureName = "full course content" }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className={styles.iconWrapper}>
          🔒
        </div>

        <h2 className={styles.modalTitle}>{title}</h2>
        
        <p className={styles.modalSubtitle}>
          You are trying to access {featureName}. Free users can preview <strong>1 sample video</strong> and <strong>1 Easy quiz test</strong> for Modules 1–8.
        </p>

        <div className={styles.benefitsBox}>
          <h4>Unlock Full Platform Access:</h4>
          <ul>
            <li>✨ All 59 Video Modules &amp; PnR Playlists</li>
            <li>📝 16,200+ Practice Quiz Exam Questions (Easy, Medium &amp; Hard)</li>
            <li>💻 Industrial TCL Scripts &amp; Tool Execution Guides</li>
            <li>📜 Course Completion Certificate &amp; Placement Referrals</li>
          </ul>
        </div>

        <div className={styles.actionRow}>
          <button 
            className={styles.subscribeBtn}
            onClick={() => {
              onClose();
              navigate(user ? '/paid-modules' : '/login');
            }}
          >
            {user ? '✨ Upgrade to Paid Access' : '🔑 Log In / Register Now'}
          </button>
          
          <button className={styles.secondaryBtn} onClick={onClose}>
            Continue Free Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
