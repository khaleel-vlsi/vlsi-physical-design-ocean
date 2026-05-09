import React from 'react';
import styles from './Home.module.css';

const Contact = () => {
  return (
    <div className={styles.contentSection}>
      <h2>Contact</h2>

      <p>
        For questions, feedback, or suggestions related to the learning content,
        you can reach out using the details below.
      </p>

      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:vlsiphysicaldesignocean@gmail.com">
          vlsiphysicaldesignocean@gmail.com
        </a>
      </p>

      <p>
        <strong>Phone:</strong>{' '}
        <a href="tel:+918309746357">
          +91-8309746357
        </a>
      </p>

      <p>
        <strong>LinkedIn profile:</strong>{' '}
        <a href="https://www.linkedin.com/in/mahammad-khaleel-shaik-094395243?utm_source=share_via&utm_content=profile&utm_medium=member_android"
           target="_blank" rel="noopener noreferrer">
           Open Profile
        </a>
      </p>

      <p>
        <strong>LinkedIn group:</strong>{' '}
        <a href="https://www.linkedin.com/groups/17362010"
           target="_blank" rel="noopener noreferrer">
           Join LinkedIn Group
        </a>
      </p>

      <p>
        <strong>WhatsApp group :</strong>{' '}
        <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J?mode=gi_t"
           target="_blank" rel="noopener noreferrer">
           Join WhatsApp Group
        </a>
      </p>

      <p>
        <strong>Telegram group:</strong>{' '}
        <a href="https://t.me/+2bJerreV1A43MTc1"
           target="_blank" rel="noopener noreferrer">
           Join Telegram Group
        </a>
      </p>

      <p>
        <strong>YouTube Channel:</strong>{' '}
        <a href="https://youtube.com/@vlsiphysicaldesignocean?si=qBxsP5-G7G2ue3ri"
           target="_blank" rel="noopener noreferrer">
           Visit Channel
        </a>
      </p>

    </div>
  );
};

export default Contact;
