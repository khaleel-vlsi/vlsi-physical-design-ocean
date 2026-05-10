import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* 1. Header Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Navigating the Depth of Silicon</h1>
        <p className={styles.subtitle}>
          Physical design is the bridge between architectural logic and the physical reality of silicon. We provide the map and the vessel to master this complex terrain.
        </p>
        <div className={styles.divider}></div>
      </section>

      {/* 2. Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionCard}>
          <div className={styles.missionIcon}>🚀</div>
          <h2>Our Mission</h2>
          <p>
            At VLSI Physical Design Ocean, we aim to democratize the precision of chip design. Our mission is to empower the next generation of hardware engineers with the deep technical insights and practical methodologies required to build the world's most complex processors.
          </p>
          <ul className={styles.missionList}>
            <li><span className={styles.checkIcon}>✔</span> Accelerating career paths in semiconductors</li>
            <li><span className={styles.checkIcon}>✔</span> Bridging the gap between theory and tape-out</li>
            <li><span className={styles.checkIcon}>✔</span> Fostering a community of precision engineering</li>
          </ul>
        </div>
        <div className={styles.missionImageWrap}>
          <img src="/chip.png" alt="Silicon chip" className={styles.missionImage} />
        </div>
      </section>

      {/* 3. The Oceanic Approach Section */}
      <section className={styles.approachSection}>
        <h2>The Oceanic Approach</h2>
        <p>
          Depth isn't just a metaphor. Our methodology reflects the layered complexity of physical design.
        </p>

        <div className={styles.approachGrid}>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>🌊</div>
            <h3>Fluid Adaptation</h3>
            <p>Just as the ocean adapts to its boundaries, we teach designs that adjust to power, performance, and area constraints dynamically.</p>
          </div>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>🧭</div>
            <h3>Stratified Learning</h3>
            <p>Modules are structured like oceanic zones, from the surface concepts of floorplanning to the deep abyss physics of signal integrity.</p>
          </div>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>🎯</div>
            <h3>Micron Precision</h3>
            <p>Precision in every micron. Our approach treats every routing path and gate placement with the reverence of a vital current.</p>
          </div>
        </div>
      </section>

      {/* 4. The Mind Behind the Currents */}
      <section className={styles.teamSection}>
        <h2>The Mind Behind the Currents</h2>
        <div className={styles.teamName}>Shaik Mahammad Khaleel</div>
        <div className={styles.teamRole}>Founder & Lead Architect</div>
      </section>

      {/* 5. CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Dive Deeper?</h2>
        <p>Our platform offers structured learning paths from the physics of transistors to the automation of full-chip implementation. Begin your voyage today.</p>
        <Link to="/modules" className={styles.ctaBtn}>
          Explore Modules
        </Link>
      </section>

    </div>
  );
};

export default About;
