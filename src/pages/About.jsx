import React from 'react';
import styles from './Home.module.css';

const About = () => {
  return (
    <div className={styles.contentSection}>
      <h2>About This Website</h2>

      <p>
        This platform is created to share structured and practical learning
        materials related to ASIC and VLSI design. The goal is to help learners
        understand concepts clearly and apply them in real-world scenarios.
      </p>

      <p>
        The content is suitable for both freshers and experienced professionals
        who want to strengthen their understanding of the VLSI design flow.
      </p>
    </div>
  );
};

export default About;
