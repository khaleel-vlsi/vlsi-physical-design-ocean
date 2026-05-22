import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import SEO from '../components/SEO';
import LearningRoadmap from '../components/LearningRoadmap';
import StructuredData from '../components/StructuredData';

const freeModules = [
  'Electronics Fundamentals',
  'MOSFET & CMOS Theory',
  'Digital Electronics Concepts',
  'Linux & Basic TCL Scripting',
  'RTL Coding using Verilog',
  'Logic Synthesis Fundamentals',
  'Design for Testability (DFT)',
  'Introduction to Physical Synthesis',
];

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <SEO 
        title="Home" 
        description="Master VLSI Physical Design from scratch. Structured learning modules for ASIC design, RTL coding, synthesis, and physical verification."
        url="/"
        keywords={[
          "vlsi physical design", "asic design flow", "vlsi physical design topics for beginners",
          "physical design engineer roadmap", "linux scripting for vlsi", "tcl scripting for physical design", 
          "physical design interview questions and answers", "rtl to gdsii flow", "floorplanning in vlsi", 
          "placement and routing", "pnr", "clock tree synthesis", "cts", "static timing analysis", "sta", 
          "physical verification drc lvs", "signal integrity and crosstalk", "ir drop analysis", "electromigration",
          "synopsys icc2 tutorial", "cadence innovus tutorial", "vlsi training for freshers", 
          "physical design engineer jobs", "vlsi career path", "cmos basics", "logic synthesis", "power planning in vlsi",
          "vlsi physical design ocean"
        ]}
        structuredData={
          <StructuredData 
            organization={{
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VLSI Physical Design Ocean",
              "url": "https://vlsiphysicaldesignocean.com",
              "logo": "https://vlsiphysicaldesignocean.com/favicon.svg",
              "description": "A structured learning platform for ASIC & VLSI design from basics to advanced physical design."
            }}
            breadcrumb={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vlsiphysicaldesignocean.com"
                }
              ]
            }}
          />
        }
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className={styles.heroHeader}>
        <h1>VLSI Physical Design Ocean – Professional Guide</h1>
        <p>
          Complete learning roadmap from basics to physical design. Master the
          precision of integrated circuit layout through immersive, high-tech
          educational modules.
        </p>
      </header>

      {/* ── Info Cards Row: About + Course Structure ─────────────────── */}
      <section className={styles.infoRow}>
        {/* About This Website */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoIcon}>ℹ️</span>
            <h2>About This Website</h2>
          </div>
          <p className={styles.infoDesc}>
            The <strong>VLSI Physical Design Ocean</strong> platform is created specifically for engineering graduates and freshers who want to enter the VLSI domain, as well as professionals with up to 3+ years of experience. Our goal is to provide a complete, structural learning path covering everything from the absolute basics to advanced industrial tool execution with step-by-step guides.
            <br/><br/>
            The name "Ocean" signifies the extreme depth of knowledge provided here. You will find real-time problems and solutions, the critical role of Linux and TCL scripting, and an extensive repository of interview questions and answers. We offer everything required to succeed as a Physical Design Engineer, including industrial tool user guides and sample scripts used in real-world tapeouts. With a mix of free foundation modules and highly affordable premium content, this is your one-stop platform for all VLSI queries.
          </p>
          <div className={styles.infoColumns}>
            <div>
              <h3>Who This Platform Is For</h3>
              <ul>
                <li>Engineering graduates and freshers entering VLSI</li>
                <li>Physical Design Engineers (0 to 3+ years experience)</li>
                <li>Students seeking real-time problem & solution guides</li>
                <li>Professionals needing industrial script samples</li>
              </ul>
            </div>
            <div>
              <h3>What You Will Learn</h3>
              <ul>
                <li>Basic to advanced ASIC Physical Design flow</li>
                <li>Step-by-step industrial tool execution</li>
                <li>Linux & TCL scripting for automation</li>
                <li>Core interview questions and answers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Course Structure */}
        <div className={styles.infoCard}>
          <div className={styles.infoCardHeader}>
            <span className={styles.infoIcon}>🎓</span>
            <h2>Course Structure</h2>
          </div>
          <p className={styles.infoDesc}>
            The learning content is divided into well-structured modules. Each
            module focuses on a specific stage of the ASIC design flow with
            clear explanations and read-only study materials.
          </p>
          <div className={styles.courseImageWrap}>
            <img loading="lazy" src="/chip.png"
              alt="VLSI chip circuit board — 57 structured modules"
              className={styles.courseChipImg}
            />
            <p className={styles.courseImageSub}>57 Modules · Electronics → Physical Sign-off</p>
          </div>
        </div>
      </section>

      <LearningRoadmap />

      {/* ── Free Modules Section ──────────────────────────────────────── */}
      <section className={styles.freeSection}>
        <h2 className={styles.freeSectionTitle}>
          Free VLSI Physical Design Ocean Foundation Modules
        </h2>
        <p className={styles.freeSub}>
          A structured set of free learning modules designed to build strong
          fundamentals in ASIC &amp; VLSI design. These modules are ideal for
          freshers, students, and professionals transitioning into the VLSI domain.
        </p>

        <div className={styles.freeLayout}>
          {/* Module grid */}
          <div className={styles.moduleGrid}>
            {freeModules.map((mod, i) => (
              <Link key={i} to={`/modules/${i + 1}`} className={styles.moduleItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{mod}</span>
              </Link>
            ))}
          </div>

          {/* CTA sidebar */}
          <div className={styles.freeCta}>
            <div className={styles.freeCtaBadge}>MODULES 1–8 AVAILABLE NOW</div>
            <Link to="/modules" className={styles.primaryBtn}>
              VIEW FREE MODULES (1–8)
            </Link>
            <p className={styles.freeNote}>
              No registration required to begin access.
            </p>
          </div>
        </div>
      </section>

      {/* ── Paid & Placement Row ───────────────────────────────────────── */}
      <section className={styles.paidAndPlacementRow}>
        
        {/* Advanced Course Card */}
        <div className={styles.paidSectionCard}>
          <h2>Advanced VLSI Physical Design Ocean Course</h2>
          <p className={styles.paidSub}>
            Modules 9–57 · Industry Level · 6 Months Access
          </p>

          <div className={styles.priceBox}>
            <div>
              <span className={styles.label}>India</span>
              <strong>₹449</strong>
            </div>
            <div>
              <span className={styles.label}>International</span>
              <strong>$20</strong>
            </div>
          </div>

          <div className={styles.paidFeatures}>
            <ul>
              <li><span className={styles.check}>✔</span> Advanced STA, CTS, PnR</li>
              <li><span className={styles.check}>✔</span> Industry Scripts &amp; Flows</li>
              <li><span className={styles.check}>✔</span> Tool Tutorials (icc2, innovus)</li>
              <li><span className={styles.check}>✔</span> Interview Q&amp;A</li>
              <li><span className={styles.check}>✔</span> Certification Included</li>
            </ul>
          </div>

          <p className={styles.comingSoonText}>Available Soon</p>
          <Link to="/login" className={styles.btnRegister}>
            REGISTER &amp; GET PAID ACCESS
          </Link>
        </div>

        {/* Placement Support Card */}
        <div className={styles.placementCard}>
          <div className={styles.placementIcon}>🚀</div>
          <h2>Placement Support Program</h2>
          <p className={styles.subtitle}>Mentorship Until You Get Placed</p>

          <ul className={styles.placementFeatures}>
            <li><span className={styles.check}>✔</span> 3 Personalized Mock Interviews</li>
            <li><span className={styles.check}>✔</span> 1-on-1 Career Guidance</li>
            <li><span className={styles.check}>✔</span> Recorded Sessions for Improvement</li>
            <li><span className={styles.check}>✔</span> Daily Technical Hour (5 Days/Week)</li>
            <li><span className={styles.check}>✔</span> Real Interview Q&amp;A Solutions</li>
          </ul>

          <div className={styles.pricingBox}>
            <div className={styles.priceCard}>
              <span className={styles.label}>First 500</span>
              <h3>₹1,499</h3>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.label}>Regular</span>
              <h3>₹2,999</h3>
            </div>
            <div className={styles.priceCard}>
              <span className={styles.label}>Intl.</span>
              <h3>$80</h3>
            </div>
          </div>

          <p className={styles.comingSoonText}>Available Soon</p>
          <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J" target="_blank" rel="noreferrer" className={styles.placementBtn}>
            JOIN PLACEMENT SUPPORT PROGRAM
          </a>
        </div>

      </section>

    </div>
  );
};

export default Home;
