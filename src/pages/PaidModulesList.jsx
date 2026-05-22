import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paidModulesData } from '../data/paidModulesData';
import styles from './PaidModulesList.module.css';
import { supabase } from '../services/supabase';

const PaidModulesList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const checkFreshAccess = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error || !data) {
          navigate('/dashboard');
          return;
        }
        
        const isFuture = (ts) => ts && new Date(ts).getTime() > Date.now();
        const courseValid = data.course_active && isFuture(data.course_expiry);
        
        if (!courseValid) {
          navigate('/dashboard');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        navigate('/dashboard');
      }
    };

    checkFreshAccess();
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className={styles.modulesPage} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className={styles.loadingText}>Authenticating premium access... ⏳</div>
      </div>
    );
  }

  return (
    <div className={styles.modulesPage}>
        <header className={styles.moduleHeader}>
          <h1>💎 Premium Paid Modules</h1>
          <p>Your exclusive access to advanced physical design execution, interview preparation, and complete sign-off materials.</p>
          <Link to="/dashboard" className={styles.dashboardLink}>Go to Dashboard</Link>
        </header>

      <div className={styles.modulesGrid}>
        {(paidModulesData || []).map((mod) => (
          <Link key={mod.id} to={`/paid-modules/module/${mod.id}`} className={styles.moduleLink}>
            <div className={styles.moduleCard}>
              <div className={styles.badgesRow}>
                <span className={styles.moduleBadge}>Module {mod.id}</span>
                <span className={styles.premiumBadge}>Premium 🔒</span>
              </div>
              <h3>{mod.title}</h3>
              <p className={styles.moduleDesc}>{mod.description}</p>
              
              <div className={styles.cardAccent}></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PaidModulesList;