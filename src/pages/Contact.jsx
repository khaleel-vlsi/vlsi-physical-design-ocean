import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      {/* 1. Header Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.subtitle}>
          For questions, feedback, or suggestions related to the learning content, you can reach out using the details below. Our technical experts are ready to assist you in mastering the intricacies of physical design.
        </p>
      </section>

      {/* 2. Main Grid Layout */}
      <section className={styles.mainGrid}>
        
        {/* Left Column: Details & Links */}
        <div className={styles.leftCol}>
          
          <div className={styles.topCardsRow}>
            <a href="mailto:vlsiphysicaldesignocean@gmail.com" className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>✉</span>
                <span className={styles.cardTitle}>Email</span>
              </div>
              <div className={styles.cardValue}>vlsiphysicaldesignocean@gmail.com</div>
            </a>
            
            <a href="tel:+918309746357" className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>📞</span>
                <span className={styles.cardTitle}>Phone</span>
              </div>
              <div className={styles.cardValue}>+91-8309746357</div>
            </a>
          </div>

          <div className={styles.socialGrid}>
            <a href="https://youtube.com/@vlsiphysicaldesignocean?si=qBxsP5-G7G2ue3ri" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={styles.socialIcon}>▶</div>
              <div className={styles.socialName}>YouTube Channel</div>
            </a>
            <a href="https://www.linkedin.com/groups/17362010" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={styles.socialIcon}>👥</div>
              <div className={styles.socialName}>LinkedIn Group</div>
            </a>
            <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J?mode=gi_t" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={styles.socialIcon}>💬</div>
              <div className={styles.socialName}>WhatsApp Group</div>
            </a>
            <a href="https://t.me/+2bJerreV1A43MTc1" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={styles.socialIcon}>✈</div>
              <div className={styles.socialName}>Telegram Group</div>
            </a>
            <a href="https://www.linkedin.com/in/mahammad-khaleel-shaik-094395243" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={styles.socialIcon}>👤</div>
              <div className={styles.socialName}>LinkedIn Profile</div>
            </a>
            <div className={`${styles.socialCard} ${styles.statusCard}`}>
              <div className={styles.socialIcon}>⚛</div>
              <div className={styles.socialName}>System Status: Online</div>
            </div>
          </div>

        </div>

        {/* Right Column: Form */}
        <div className={styles.formCard}>
          <h2>Send a Message</h2>
          <p>Have suggestions or queries? Fill out the form below.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sending functionality will be integrated soon."); }}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea placeholder="Your query or feedback..." className={styles.formTextarea} required></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>
              Send Message <span>➤</span>
            </button>
          </form>
        </div>

      </section>

      {/* 3. Bottom Banner */}
      <section className={styles.bottomBanner}>
        <img src="/chip.png" alt="Circuit board" className={styles.bannerImg} />
        <div className={styles.bannerOverlay}></div>
        <div className={styles.bannerContent}>
          <h2>Technical Excellence</h2>
          <p>Precision in every micron. Our physical design experts bridge the gap between architectural logic and physical reality.</p>
        </div>
      </section>

      {/* Floating button */}
      <button className={styles.floatingHelp} onClick={() => alert("Help chat coming soon!")} title="Help">
        ?
      </button>

    </div>
  );
};

export default Contact;
