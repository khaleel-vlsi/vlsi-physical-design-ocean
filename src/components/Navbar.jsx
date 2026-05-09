import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.topNav}>
      <div className={styles.navLeft}>
        <Link to="/">Home</Link>
        <Link to="/modules">Modules</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className={styles.navRight}>
        Created by: Shaik Mahammad Khaleel
      </div>
    </nav>
  );
};

export default Navbar;
