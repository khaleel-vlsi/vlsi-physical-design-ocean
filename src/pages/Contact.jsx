import React, { useState } from 'react';
import styles from './Contact.module.css';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Contact = () => {
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'
  
  // TO CUSTOMIZE: Replace these with your EmailJS keys from emailjs.com
  const EMAILJS_SERVICE_ID = "service_vlsiocean"; 
  const EMAILJS_TEMPLATE_ID = "template_vlsiocean";
  const EMAILJS_PUBLIC_KEY = "your_public_key_here";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    try {
      // 1. Backup: Save to Supabase (if table exists)
      const { error: sbError } = await supabase
        .from('contact_messages')
        .insert([
          { 
            full_name: data.name, 
            email: data.email, 
            message: data.message,
            created_at: new Date()
          }
        ]);
        
      if (sbError) console.warn("Supabase save failed, but trying email...", sbError);

      // 2. Main: Send via EmailJS REST API (No package needed)
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            to_name: "Shaik Mahammad Khaleel"
          }
        })
      });

      if (emailResponse.ok) {
        setStatus('success');
        form.reset();
      } else {
        // Fallback for demo: if keys aren't set yet, show success if supabase worked
        if (!sbError) {
          setStatus('success');
          form.reset();
        } else {
          setStatus('error');
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <SEO 
        title="Contact Us" 
        description="Have questions or suggestions about VLSI Physical Design? Reach out to our technical experts for guidance on mastering the complexities of silicon."
        url="/contact"
        structuredData={
          <StructuredData 
            breadcrumb={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vlsiphysicaldesignocean.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Contact",
                  "item": "https://vlsiphysicaldesignocean.com/contact"
                }
              ]
            }}
          />
        }
      />
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
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input type="text" name="name" placeholder="John Doe" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" name="email" placeholder="john@example.com" className={styles.formInput} required />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea name="message" placeholder="Your query or feedback..." className={styles.formTextarea} required></textarea>
            </div>
            
            {status === 'success' && (
              <div className={styles.successMessage}>
                ✓ Message received! We will get back to you at your official mail.
              </div>
            )}
            
            {status === 'error' && (
              <div className={styles.errorMessage}>
                ✕ Something went wrong. Please check your keys or email us directly.
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'} <span>➤</span>
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

    </div>
  );
};

export default Contact;
