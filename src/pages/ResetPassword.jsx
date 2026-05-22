import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const ResetPassword = () => {
  const { user, updatePassword, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await updatePassword(password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Password updated successfully! Redirecting to login...');
        // Clear active session to ensure user logs in fresh
        await logout();
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2>Reset Password</h2>
          <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)' }}>
            Verifying reset session... ⏳
          </div>
        </div>
      </div>
    );
  }

  // If there's no user session, they shouldn't access this page directly.
  if (!user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2>Reset Password</h2>
          <div className={styles.error}>
            Invalid or expired password reset session. Please request a new link.
          </div>
          <div className={styles.authLinks}>
            <Link to="/forgot-password">Request Reset Link</Link>
            <span style={{ margin: '0 8px', color: 'var(--outline)' }}>•</span>
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Set New Password</h2>
        
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
