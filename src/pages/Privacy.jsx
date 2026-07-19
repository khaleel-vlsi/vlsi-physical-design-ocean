import React from 'react';
import styles from './Privacy.module.css';
import SEO from '../components/SEO';

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Policies & Terms of Service" 
        description="Review the terms of service, privacy policy, refund policy, and payment disclaimers for VLSI Physical Design Ocean."
        url="/privacy"
      />
      <div className={styles.policyContainer}>
        {/* 1. Header Section */}
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Policies &amp; Terms of Service</h1>
          <p className={styles.subtitle}>
            Please review our full Terms &amp; Conditions and Privacy Policies carefully.
          </p>
          <div className={styles.divider}></div>
        </section>

        {/* 2. Main Layout with Table of Contents and Details */}
        <div className={styles.policyLayout}>
          
          {/* Left Column: Sticky Table of Contents */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3>Navigation</h3>
              <nav className={styles.navMenu}>
                <a href="#section-1">1️⃣ Course Access</a>
                <a href="#section-2">2️⃣ Language</a>
                <a href="#section-3">3️⃣ Tool Access</a>
                <a href="#section-4">4️⃣ Course Content</a>
                <a href="#section-5">5️⃣ Future Updates</a>
                <a href="#section-6">6️⃣ Payments</a>
                <a href="#section-7">7️⃣ Refund Policy</a>
                <a href="#section-8">8️⃣ Account Sharing</a>
                <a href="#section-9">9️⃣ Copyright</a>
                <a href="#section-10">🔟 Placement</a>
                <a href="#section-11">1️⃣1️⃣ Student Responsibility</a>
                <a href="#section-12">1️⃣2️⃣ Support</a>
                <a href="#section-13">1️⃣3️⃣ Acceptance</a>
                <div className={styles.sidebarHr}></div>
                <a href="#privacy-policy">🔒 Privacy Policy</a>
                <a href="#refund-policy">💳 Refund Details</a>
              </nav>
            </div>
          </aside>

          {/* Right Column: Detailed Sections */}
          <main className={styles.contentArea}>
            
            <div id="section-1" className={styles.docCard}>
              <h3>1️⃣ Course Access</h3>
              <ul>
                <li>This is a subscription-based platform.</li>
                <li>Access is available only for the duration of the selected plan.</li>
                <li>Lifetime access is <strong>NOT</strong> provided.</li>
              </ul>
            </div>

            <div id="section-2" className={styles.docCard}>
              <h3>2️⃣ Language &amp; Materials</h3>
              <ul>
                <li>All recorded video classes are provided in English.</li>
                <li>Videos include practical Synopsys ICC2 tool execution wherever applicable.</li>
              </ul>
            </div>

            <div id="section-3" className={styles.docCard}>
              <h3>3️⃣ Tool Access Disclaimer</h3>
              <ul>
                <li>We <strong>DO NOT</strong> provide any EDA tool licenses.</li>
                <li>Students must arrange their own licensed tools if required for practice.</li>
              </ul>
            </div>

            <div id="section-4" className={styles.docCard}>
              <h3>4️⃣ Course Content &amp; Exclusions</h3>
              <p>Your subscription currently includes the features and modules available on the platform at the time of purchase.</p>
              <p>The following features are planned for future release and are <strong>NOT</strong> included in the current subscription unless officially launched:</p>
              <ul>
                <li>Quiz Tests</li>
                <li>Certification</li>
                <li>Resume Builder</li>
                <li>Additional future modules</li>
              </ul>
              <p>These features will be added gradually.</p>
            </div>

            <div id="section-5" className={styles.docCard}>
              <h3>5️⃣ Future Updates</h3>
              <ul>
                <li>New videos, notes, and study materials may be added periodically.</li>
                <li>The update schedule depends on development progress.</li>
              </ul>
            </div>

            <div id="section-6" className={styles.docCard}>
              <h3>6️⃣ Official Payments</h3>
              <ul>
                <li>All payments are processed only through the official website gateway.</li>
                <li>Never make payments to personal accounts unless officially announced.</li>
              </ul>
            </div>

            <div id="section-7" className={styles.docCard}>
              <h3>7️⃣ Refund Policy</h3>
              <ul>
                <li>All payments are non-refundable.</li>
                <li>Refunds will not be provided after subscription activation under any circumstances.</li>
              </ul>
            </div>

            <div id="section-8" className={styles.docCard}>
              <h3>8️⃣ Anti-Account Sharing &amp; Abuse</h3>
              <p>Sharing any of the following is strictly prohibited:</p>
              <ul>
                <li>Login credentials</li>
                <li>Recorded videos</li>
                <li>Study materials &amp; PDFs</li>
                <li>TCL Scripts</li>
                <li>Website content / downloaded resources</li>
              </ul>
              <div className={styles.redWarningBox}>
                <strong>Violation will result in:</strong>
                <ul>
                  <li>❌ Immediate account termination</li>
                  <li>❌ Permanent subscription cancellation</li>
                  <li>❌ Access blocked without refund</li>
                </ul>
              </div>
            </div>

            <div id="section-9" className={styles.docCard}>
              <h3>9️⃣ Intellectual Property &amp; Copyright</h3>
              <ul>
                <li>All videos, notes, scripts, PDFs, website content, and learning materials are the intellectual property of VLSI Physical Design Ocean.</li>
                <li>Unauthorized copying, screen recording, redistribution, or commercial use is strictly prohibited.</li>
              </ul>
            </div>

            <div id="section-10" className={styles.docCard}>
              <h3>🔟 Placement Disclaimer</h3>
              <ul>
                <li>We <strong>DO NOT</strong> guarantee placement, job offers, referrals, or interviews.</li>
                <li>Our responsibility is strictly to provide quality industrial-level learning.</li>
              </ul>
            </div>

            <div id="section-11" className={styles.docCard}>
              <h3>1️⃣1️⃣ Student Responsibility</h3>
              <ul>
                <li>Success depends on your practice, dedication, assignments, and continuous learning.</li>
              </ul>
            </div>

            <div id="section-12" className={styles.docCard}>
              <h3>1️⃣2️⃣ Technical Support</h3>
              <ul>
                <li>Technical and course support will be provided according to our support policy.</li>
              </ul>
            </div>

            <div id="section-13" className={styles.docCard}>
              <h3>1️⃣3️⃣ Verification &amp; Acceptance</h3>
              <p>By subscribing and clicking "I Agree &amp; Continue" before checkout, you confirm that you have read every point, understand the refund/license terms, and agree to our single-user and copyright policies.</p>
            </div>

            <div id="privacy-policy" className={`${styles.docCard} ${styles.blueBorderCard}`}>
              <h3>🔒 Privacy Policy</h3>
              <p>
                Any personal data provided during registration for our free or premium modules will be kept securely and never shared with third parties. We utilize industry-standard encryption to ensure your learning progress remains strictly confidential.
                <br/><br/>
                <strong>Cookies &amp; Ads:</strong> We use Google AdSense to serve ads on our free modules. Google uses cookies to serve ads based on user visits. You can opt out via Google Ads Settings.
              </p>
            </div>

            <div id="refund-policy" className={`${styles.docCard} ${styles.orangeBorderCard}`}>
              <h3>💳 Refund Details</h3>
              <p>
                Due to the digital nature of our physical design modules, all sales are final. Refunds are strictly not issued once access to laboratory resources or course materials has been provisioned.
              </p>
            </div>

          </main>
        </div>

      </div>
    </>
  );
};

export default Privacy;
