import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './PrivateLayout.module.css';

const PrivateLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={styles.privateWrap}>
      <header className={styles.topBar}>
        <div className={styles.brand}>
          <span className={styles.dot}></span> VLSI Physical Design Ocean
        </div>
        <div className={styles.topActions}>
          <Link className={styles.btn} to="/">🏠 Portal Home</Link>
          <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleLogout}>🚪 Logout</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
