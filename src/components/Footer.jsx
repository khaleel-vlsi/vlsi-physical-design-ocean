import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerContainer}>
        
        {/* Brand Section */}
        <div className={styles.footerBrand}>
          <div className={styles.brandName}>VLSI Physical Design Ocean</div>
          <p className={styles.brandDesc}>
            Architecting the future of silicon education through immersive learning and technical precision.
          </p>
          <div className={styles.copyright}>
            © {currentYear} VLSI Physical Design Ocean. All rights reserved. Precision in every micron.
          </div>
        </div>

        {/* Links Sections */}
        <div className={styles.footerLinks}>
          
          <div className={styles.linkGroup}>
            <h4>Resources</h4>
            <ul className={styles.linkList}>
              <li><Link to="/modules">Course Library</Link></li>
              <li><Link to="/modules/57">Documentation</Link></li>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">Community Forum</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <ul className={styles.linkList}>
              <li>
                <Link 
                  to="/privacy" 
                  className={location.pathname === '/privacy' ? styles.activeLink : ''}
                >
                  Privacy Policy
                </Link>
              </li>
              <li><Link to="/privacy">Terms of Service</Link></li>
              <li><Link to="/privacy">Cookie Settings</Link></li>
              <li><Link to="/privacy">Student Agreement</Link></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
