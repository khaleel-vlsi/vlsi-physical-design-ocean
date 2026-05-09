import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.heroHeader}>
        <h1>VLSI Physical Design Ocean – Professional Guide</h1>
        <p>Complete learning roadmap from basics to physical design</p>
      </header>

      <section className={styles.contentSection}>
        <h2>About This Website</h2>
        <p>
          This website is created to provide free and structured learning
          materials for students and professionals interested in ASIC and VLSI
          design. The content is designed to help both freshers and experienced
          engineers understand concepts from basics to advanced levels.
        </p>
      </section>

      <section className={styles.contentSection}>
        <h2>Who This Platform Is For</h2>
        <ul>
          <li>Freshers entering the ASIC & VLSI domain</li>
          <li>Engineering students preparing for core jobs</li>
          <li>Working professionals revising fundamentals</li>
          <li>Engineers looking for industry-oriented guidance</li>
        </ul>
      </section>

      <section className={styles.contentSection}>
        <h2>What You Will Learn</h2>
        <ul>
          <li>Electronics, MOSFET, and CMOS fundamentals</li>
          <li>RTL design concepts and Verilog basics</li>
          <li>Logic synthesis and timing fundamentals</li>
          <li>ASIC physical design overview</li>
          <li>Real-world understanding of design flow</li>
        </ul>
      </section>

      <section className={styles.contentSection}>
        <h2>Course Structure</h2>
        <p>
          The learning content is divided into well-structured modules.
          Each module focuses on a specific stage of the ASIC design flow
          with clear explanations and read-only study materials.
        </p>
      </section>

      <section className={styles.freeSection}>
        <h2>Free VLSI Physical Design Ocean Foundation Modules</h2>
        <p className={styles.freeSub}>
          A structured set of free learning modules designed to build strong
          fundamentals in ASIC & VLSI design. These modules are ideal for
          freshers, students, and professionals transitioning into the VLSI domain.
        </p>
        <ul className={styles.freePoints}>
          <li>✔ Introduction to Electronics fundamentals</li>
          <li>✔ MOSFET & CMOS device theory</li>
          <li>✔ Digital electronics concepts</li>
          <li>✔ Linux & basic TCL scripting</li>
          <li>✔ RTL coding using Verilog</li>
          <li>✔ Logic synthesis fundamentals</li>
          <li>✔ Design for Testability (DFT) basics</li>
          <li>✔ Introduction to physical synthesis</li>
        </ul>
        <p className={styles.freeNote}>
          📌 Modules 1–8 are completely free and can be accessed without registration.
        </p>
        <Link to="/modules" className={styles.primaryBtn}>
          View Free Modules (1–8)
        </Link>
      </section>

      <section className={styles.paidSection}>
        <h2>Advanced VLSI Physical Design Ocean Course Available From Feb 28th</h2>
        <p className={styles.paidSub}>
          Modules 9–24 · Industry Level · 6 Months Access
        </p>

        <div className={styles.priceBox}>
          <div>
            🇮🇳 <strong>₹449</strong>
            <span>India</span>
          </div>
          <div>
            🌍 <strong>$20</strong>
            <span>International</span>
          </div>
        </div>

        <div className={styles.paidFeatures}>
          <ul>
            <li>✔ Advanced STA, CTS, PnR</li>
            <li>✔ Industry Scripts & Flows</li>
            <li>✔ icc2,innovus,pt,tempus,fc all user guides are available</li>
            <li>✔ Interview Questions and Answers</li>
            <li>✔ Certification</li>
            <li>✔ 6 Months Access</li>
          </ul>
          <p>
            <strong>For more details join Whatsapp group: </strong>
            <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J?mode=gi_t" target="_blank" rel="noreferrer">
               Join WhatsApp Group
            </a>
          </p>
        </div>

        <a href="https://forms.gle/2SFaTeVEibtfAgKJ8" target="_blank" rel="noreferrer" className={styles.btnRegister}>
         Register & Get Paid Access
        </a>
      </section>

      <section className={styles.placementSection}>
        <div className={styles.placementCard}>
          <h2>🚀 Placement Support Program Available From March 5th</h2>
          <p className={styles.subtitle}>Mentorship Until You Get Placed</p>

          <ul className={styles.placementFeatures}>
            <li>✔ 3 Personalized Mock Interviews</li>
            <li>✔ 1-on-1 Career & Technical Guidance</li>
            <li>✔ Recorded Sessions for Self-Improvement</li>
            <li>✔ Daily Technical Hour (5 Days / Week)</li>
            <li>✔ Real Interview Questions & Solutions</li>
            <li>✔ Support Continues Until You Get Placed</li>
          </ul>

          <div className={styles.pricingBox}>
            <div className={styles.priceCard}>
              <span className={styles.label}>First 500 Members</span>
              <h3>₹1,499</h3>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.label}>After 500 Members</span>
              <h3>₹2,999</h3>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.label}>International</span>
              <h3>$80</h3>
            </div>
          </div>

          <p className={styles.eligibility}>
            ⭐ Eligibility: Only for students who purchased ₹499 Website Package
          </p>

          <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J" target="_blank" rel="noreferrer" className={styles.placementBtn}>
             Join Placement Support Program
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
