import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.siteFooter}>
      <p>
        Educational content for learning purposes |{' '}
        <Link to="/privacy">Privacy Policy</Link>
      </p>
    </footer>
  );
};

export default Footer;
