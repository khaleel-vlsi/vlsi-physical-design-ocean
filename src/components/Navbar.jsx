import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className={styles.topNav}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/modules" className={styles.navLink}>Modules</Link>
        <Link to="/platform-flow" className={styles.navLink}>Flow Graph</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        <Link to="/contact" className={styles.navLink}>Contact</Link>
      </div>
      <div className={styles.navRight}>
        {user ? (
          <span className={styles.welcome}>👤 {user.email}</span>
        ) : (
          <span className={styles.welcome}>Guest</span>
        )}
        <Link to="/dashboard" className={styles.dashboardLink}>Student Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
