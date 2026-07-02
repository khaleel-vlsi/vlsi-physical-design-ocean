import React, { useState } from 'react';
import styles from './HelpChat.module.css';

const HelpChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('menu'); 

  const faqs = [
    { q: "How many modules are there?", a: "There are 59 modules in total. Modules 1-8 are free, and 9-59 cover advanced Physical Design (Paid)." },
    { q: "Is this for beginners?", a: "Yes! We start from Basic Electronics and CMOS fundamentals (Module 1) so anyone can start." },
    { q: "What is the Premium Course?", a: "The Premium Course (Modules 9-59) covers industry-standard tools, Floorplanning, CTS, and Routing with 1-on-1 mentorship." },
    { q: "How to enroll in Paid Course?", a: "Click the 'Join Now' button on the homepage or message us on WhatsApp for the latest batch details." },
    { q: "Will I get a job?", a: "This course is designed to make you industry-ready. We provide placement support and interview prep for all premium students." }
  ];

  return (
    <div className={styles.chatWrapper}>
      {isOpen && (
        <div className={styles.chatBox} style={{ display: 'flex', opacity: 1 }}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.onlineStatus}></div>
              <h3>Ocean Support</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
          </div>

          <div className={styles.chatBody}>
            {step === 'menu' ? (
              <div className={styles.menuView}>
                <p className={styles.welcomeMsg}>Hi there! 👋 How can we help?</p>
                <div className={styles.optionGrid}>
                  <button onClick={() => setStep('faq')} className={styles.optionBtn}>📚 FAQs</button>
                  <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J" target="_blank" rel="noreferrer" className={styles.optionBtn}>
                    <span>💬</span> Join WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <div className={styles.faqView}>
                <button onClick={() => setStep('menu')} className={styles.backBtn}>← Back</button>
                {faqs.map((f, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <p style={{ color: '#59dad1', margin: 0, fontSize: '13px' }}>{f.q}</p>
                    <p style={{ color: '#9aa0a6', margin: '4px 0 0', fontSize: '12px' }}>{f.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button className={styles.chatToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '↓' : '?'}
      </button>
    </div>
  );
};

export default HelpChat;
