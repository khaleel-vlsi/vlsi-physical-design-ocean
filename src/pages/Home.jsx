import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import SEO from '../components/SEO';
import LearningRoadmap from '../components/LearningRoadmap';
import StructuredData from '../components/StructuredData';
import { useAuth } from '../context/AuthContext';
import { plansConfig, getRegionKey } from '../data/plansConfig';

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
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Guest Region State (defaults based on local Timezone auto-detect)
  const [guestRegion, setGuestRegion] = useState(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Delhi') || tz.includes('Bombay') || tz.includes('Asia/Kolkata'))) {
        return 'India';
      }
    } catch (e) {
      console.warn(e);
    }
    return 'International';
  });

  const profileRegion = profile && profile.country ? getRegionKey(profile.country) : null;
  const initialRegion = profileRegion || guestRegion;
  const [displayRegion, setDisplayRegion] = useState(initialRegion);

  useEffect(() => {
    if (profileRegion) {
      setDisplayRegion(profileRegion);
    } else {
      setDisplayRegion(guestRegion);
    }
  }, [profileRegion, guestRegion]);

  const activeConfig = plansConfig[displayRegion] || plansConfig['India'];
  const isIndianUser = (profile && profile.country === 'India') || (!profile && guestRegion === 'India');

  // Splash Modal Logic
  const [showSplashModal, setShowSplashModal] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      // Small delay so it feels natural
      const timer = setTimeout(() => {
        setShowSplashModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeSplash = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplashModal(false);
  };

  const goToFlow = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    navigate('/platform-flow');
  };

  const isRegistered = !!user;
  const isLoggedIn = !!user;
  const isPaid = !!(profile?.course_active);

  const step1Status = isLoggedIn ? 'completed' : 'active';
  const step2Status = isLoggedIn ? 'completed' : 'active';
  const step3Status = isLoggedIn ? 'active' : 'locked';
  const step4Status = isLoggedIn ? (isPaid ? 'completed' : 'active') : 'locked';
  const step5Status = isPaid ? 'active' : 'locked';

  return (
    <>
      {showSplashModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Welcome to VLSI Physical Design Ocean! 🌊</h3>
            <p>Before you dive in, we highly recommend viewing our Interactive Flow Graph. It maps out your entire learning journey from basic electronics to advanced chip tapeout!</p>
            <div className={styles.modalActions}>
              <button onClick={goToFlow} className={styles.btnPrimary}>See the Flow Graph</button>
              <button onClick={closeSplash} className={styles.btnSecondary}>Explore Site First</button>
            </div>
          </div>
        </div>
      )}
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
        <div className={styles.heroCtaRow}>
          <button 
            onClick={() => navigate('/platform-flow')} 
            className={styles.magneticGraphBtn}
          >
            <span className={styles.pulseRing}></span>
            <span className={styles.btnIcon}>🗺️</span>
            Explore Interactive Flow Graph
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('free-modules');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className={styles.heroSecondaryBtn}
          >
            Explore Free Modules
          </button>
        </div>
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
            <br/><br/>
            <span style={{ color: '#ffd700', fontWeight: 'bold' }}>Important Note:</span> All video recorded classes will be available starting from <strong>31st July 2026</strong>. Quiz tests, resume builder, and certification are future additions and not part of the present subscription plans.
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
          <div className={styles.courseVisualWrapper}>
            <img 
              loading="lazy" 
              src="/chip.png" 
              alt="VLSI Physical Design Ocean Course Structure" 
              className={styles.courseChipImg} 
            />
            <p className={styles.courseImageSub}>59 Modules · Electronics → Physical Sign-off</p>
          </div>
        </div>
      </section>

      {/* ── Subscription Plans (Moved Higher Up) ────────────────────── */}
      <section id="pricing-section" className={styles.pricingSection}>
        <div className={styles.pricingHeader}>
          <span className={styles.pricingBadge}>YOUR DREAM IS OUR MISSION ❤</span>
          <h1>CHOOSE YOUR SUBSCRIPTION PLAN</h1>
          <p className={styles.pricingSubtext}>SAME PREMIUM CONTENT. DIFFERENT VALIDITY. MAXIMUM VALUE.</p>
        </div>

        {/* Region Switcher (Only visible to guest/logged-in Indian users for price comparison) */}
        {isIndianUser && (
          <div className={styles.regionToggleRow}>
            <span>Compare Pricing:</span>
            <button 
              type="button"
              className={`${styles.regionTab} ${displayRegion === 'India' ? styles.activeTab : ''}`}
              onClick={() => setDisplayRegion('India')}
            >
              🇮🇳 India Price
            </button>
            <button 
              type="button"
              className={`${styles.regionTab} ${displayRegion === 'International' ? styles.activeTab : ''}`}
              onClick={() => setDisplayRegion('International')}
            >
              🌐 International Price
            </button>
          </div>
        )}

        <div className={styles.regionTitleRow}>
          <h2>{activeConfig.flag} {activeConfig.title}</h2>
        </div>

        {/* Render India vertical layout */}
        {displayRegion === 'India' ? (
          <div className={styles.pricingContainer}>
            {activeConfig.plans.map((p) => (
              <div key={p.id} className={`${styles.planCard} ${styles[p.theme]}`}>
                {p.badge && <div className={styles.planBadge}>{p.badge}</div>}
                <span className={styles.planDuration}>{p.duration}</span>
                
                <div className={styles.planPriceRow}>
                  {p.originalPrice && (
                    <span className={styles.originalPrice}>
                      {activeConfig.currencySymbol}{p.originalPrice}
                    </span>
                  )}
                  <strong className={styles.planPrice}>
                    {activeConfig.currencySymbol}{p.price}
                  </strong>
                </div>

                {p.savings && <div className={styles.savingsPill}>{p.savings}</div>}
                {p.comparisonText && <div className={styles.comparisonText}>{p.comparisonText}</div>}
                {p.subBadge && <div className={styles.subBadge}>{p.subBadge}</div>}

                <div className={styles.planFeaturesList}>
                  <ul>
                    {p.features.map((f, i) => (
                      <li key={i}>
                        <span className={styles.checkIcon}>✔</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.planFooter}>
                  <div className={styles.validityLabel}>
                    <span>📅 {p.validityText}</span>
                  </div>
                  <Link 
                    to={profile ? "/dashboard" : `/login?region=${displayRegion}`}
                    className={`${styles.subscribeBtn} ${styles[p.theme + 'Btn']}`}
                  >
                    SUBSCRIBE NOW →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Render International horizontal layout */
          <div className={styles.intlPricingContainer}>
            {activeConfig.plans.map((p) => (
              <div key={p.id} className={`${styles.intlPlanCard} ${styles[p.theme]}`}>
                {p.badge && <div className={styles.intlPlanBadge}>{p.badge}</div>}
                
                <div className={styles.intlCardGrid}>
                  {/* Left column: Icon & Price */}
                  <div className={styles.intlPriceCol}>
                    <div className={styles.intlGlobeIcon}>
                      {p.theme === 'intl-popular' ? '🌐' : '🌍'}
                    </div>
                    <span className={styles.intlDuration}>{p.duration}</span>
                    <div className={styles.intlPriceRow}>
                      {p.originalPrice && (
                        <span className={styles.intlOriginalPrice}>
                          {activeConfig.currencySymbol}{p.originalPrice}
                        </span>
                      )}
                      <strong className={styles.intlPlanPrice}>
                        {activeConfig.currencySymbol}{p.price}
                      </strong>
                    </div>
                    {p.savings && <div className={styles.intlSavingsPill}>{p.savings}</div>}
                  </div>

                  {/* Middle column: Features */}
                  <div className={styles.intlFeaturesCol}>
                    <ul>
                      {p.features.map((f, i) => (
                        <li key={i}>
                          <span className={styles.intlCheckIcon}>✔</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right column: Validity & Button */}
                  <div className={styles.intlValidityCol}>
                    <div className={styles.intlValidityBox}>
                      <span className={styles.intlCalendarIcon}>📅</span>
                      <div className={styles.intlValidityText}>
                        <span className={styles.intlValLabel}>Valid for</span>
                        <strong className={styles.intlValDays}>
                          {p.validityText.replace('Valid for ', '')}
                        </strong>
                      </div>
                    </div>
                    <Link 
                      to={profile ? "/dashboard" : `/login?region=${displayRegion}`}
                      className={`${styles.intlSubscribeBtn} ${styles[p.theme + 'Btn']}`}
                    >
                      SUBSCRIBE NOW →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Interactive Onboarding Progress Tracker (Right Below Plans) ─── */}
      <section id="onboarding-tracker" className={styles.onboardingSection}>
        <h2 className={styles.onboardingTitle}>🗺️ Advanced VLSI Physical Design Ocean Course Steps</h2>
        <p className={styles.onboardingDesc}>
          Track your progress dynamically. Set up your account, enter the portal, and unlock the complete 59-module curriculum.
        </p>

        <div className={styles.onboardingGrid}>
          {/* Step 1: Create Account */}
          <div className={`${styles.onboardingCard} ${styles[step1Status]}`}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>1</span>
              <span className={styles.stepIcon}>📝</span>
            </div>
            <h3>Create Account</h3>
            <p>Register with your name and email to initialize your student profile.</p>
            <div className={styles.stepFooter}>
              {isRegistered ? (
                <span className={styles.completedBadge}>✓ Completed</span>
              ) : (
                <Link to="/register" className={styles.activeBtn}>Register Now</Link>
              )}
            </div>
          </div>

          {/* Step 2: Login */}
          <div className={`${styles.onboardingCard} ${styles[step2Status]}`}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>2</span>
              <span className={styles.stepIcon}>🔑</span>
            </div>
            <h3>Already have an account?</h3>
            <p>Login to establish your authenticated learning session.</p>
            <div className={styles.stepFooter}>
              {isLoggedIn ? (
                <span className={styles.completedBadge}>✓ Completed</span>
              ) : (
                <Link to="/login" className={styles.activeBtn}>Login</Link>
              )}
            </div>
          </div>

          {/* Step 3: Go to Dashboard */}
          <div className={`${styles.onboardingCard} ${styles[step3Status]}`}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>3</span>
              <span className={styles.stepIcon}>💻</span>
            </div>
            <h3>Student Dashboard</h3>
            <p>Access your personalized analytics, mock history, and tools.</p>
            <div className={styles.stepFooter}>
              {isLoggedIn ? (
                <Link to="/dashboard" className={styles.activeBtn}>Open Dashboard</Link>
              ) : (
                <span className={styles.lockedBadge}>🔒 Locked</span>
              )}
            </div>
          </div>

          {/* Step 4: Unlock Course */}
          <div className={`${styles.onboardingCard} ${styles[step4Status]}`}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>4</span>
              <span className={styles.stepIcon}>💳</span>
            </div>
            <h3>Unlock Course</h3>
            <p>Subscribe to unlock all premium PNR and STA modules (9–59).</p>
            <div className={styles.stepFooter}>
              {isPaid ? (
                <span className={styles.completedBadge}>✓ Paid Access Active</span>
              ) : (
                isLoggedIn ? (
                  <button 
                    onClick={() => {
                      const element = document.getElementById('pricing-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/#pricing-section';
                      }
                    }} 
                    className={styles.activeBtn}
                  >
                    Unlock Plan
                  </button>
                ) : (
                  <span className={styles.lockedBadge}>🔒 Locked</span>
                )
              )}
            </div>
          </div>

          {/* Step 5: Start Learning */}
          <div className={`${styles.onboardingCard} ${styles[step5Status]}`}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>5</span>
              <span className={styles.stepIcon}>🎓</span>
            </div>
            <h3>Start Learning</h3>
            <p>Explore the full advanced curriculum with detailed tool guides.</p>
            <div className={styles.stepFooter}>
              {isPaid ? (
                <Link to="/paid-modules" className={styles.activeBtn}>Start Learning</Link>
              ) : (
                <span className={styles.lockedBadge}>🔒 Locked</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <LearningRoadmap />

      {/* ── Free Modules Section ──────────────────────────────────────── */}
      <section id="free-modules" className={styles.freeSection}>
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

    </div>
    </>
  );
};

export default Home;
