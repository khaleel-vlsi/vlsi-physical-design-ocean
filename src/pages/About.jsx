import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData.jsx';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <SEO 
        title="About Us" 
        description="Learn about our mission to democratize VLSI Physical Design education. Meet the architect Shaik Mahammad Khaleel and explore our oceanic approach to silicon mastery."
        url="/about"
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
                  "name": "About",
                  "item": "https://vlsiphysicaldesignocean.com/about"
                }
              ]
            }}
          />
        }
      />
      {/* 1. Header Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Navigating the Depth of Silicon</h1>
        <p className={styles.subtitle}>
          Providing a complete structural path for engineering graduates, freshers, and professionals (up to 3+ years experience) to master VLSI Physical Design from basics to advanced industrial tool execution.
        </p>
        <div className={styles.divider}></div>
      </section>

      {/* 2. Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionCard}>
          <div className={styles.missionIcon}>🚀</div>
          <h2>Our Mission</h2>
          <p>
            At VLSI Physical Design Ocean, we aim to provide an end-to-end structural learning path for anyone looking to enter or grow in the VLSI domain. From fresh engineering graduates to Physical Design Engineers with 3+ years of experience, we offer deep knowledge to solve all your questions in one platform.
          </p>
          <ul className={styles.missionList}>
            <li><span className={styles.checkIcon}>✔</span> 57 comprehensive modules covering silicon mastery</li>
            <li><span className={styles.checkIcon}>✔</span> Step-by-step industrial tool execution guides</li>
            <li><span className={styles.checkIcon}>✔</span> Real-time problems and solutions</li>
            <li><span className={styles.checkIcon}>✔</span> The critical role of Linux and TCL scripting</li>
            <li><span className={styles.checkIcon}>✔</span> Secure Premium Document Viewer with Page & Full Width controls</li>
            <li><span className={styles.checkIcon}>✔</span> Progressive module unlocking for structured learning pacing</li>
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

      {/* Curriculum & Structured Access Section */}
      <section className={styles.approachSection}>
        <h2>Curriculum & Structured Access</h2>
        <p>
          We have expanded our curriculum to **57 comprehensive modules** mapping out physical design from surface transistor physics to deep-level industrial timing analysis. To support a healthy, structured learning pace and keep you aligned with industrial timelines, certain career-readiness and certification materials unlock progressively:
        </p>

        <div className={styles.approachGrid}>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>📚</div>
            <h3>57 Specialized Modules</h3>
            <p>Complete training covering timing paths, physical design engineering guides, script building, and industrial tool execution.</p>
          </div>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>💼</div>
            <h3>Resume Builder (Module 24)</h3>
            <p>Advanced fresher & professional resume templates and profile guidelines unlock automatically **1 month (30 days)** after course purchase.</p>
          </div>
          <div className={styles.approachCard}>
            <div className={styles.approachIcon}>🎓</div>
            <h3>Certification (Module 23)</h3>
            <p>Your VLSI Physical Design Ocean Course Completion Certificate unlocks automatically **3 months (90 days)** after course purchase.</p>
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
