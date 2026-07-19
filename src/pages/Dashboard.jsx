import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { plansConfig, getRegionKey } from '../data/plansConfig';
import styles from './Dashboard.module.css';
import homeStyles from './Home.module.css';

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [isPolling, setIsPolling] = React.useState(false);
  const [currentProfile, setCurrentProfile] = React.useState(profile);

  const [showTermsModal, setShowTermsModal] = React.useState(false);
  const [pendingPlanId, setPendingPlanId] = React.useState(null);
  const [hasAcceptedTerms, setHasAcceptedTerms] = React.useState(false);

  const handleSubscribeClick = (planId) => {
    setPendingPlanId(planId);
    setHasAcceptedTerms(false);
    setShowTermsModal(true);
  };

  const handleConfirmPayment = () => {
    if (!hasAcceptedTerms) return;
    setShowTermsModal(false);
    startCheckout(pendingPlanId);
  };

  useEffect(() => {
    // Add Razorpay script to body if not present
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (profile) setCurrentProfile(profile);
  }, [profile]);

  const regionKey = profile?.country ? getRegionKey(profile.country) : 'India';
  const activeConfig = plansConfig[regionKey] || plansConfig['India'];

  const startCheckout = async (plan) => {
    if (isCheckingOut) return;
    setIsCheckingOut(true);
    console.log("startCheckout clicked for plan:", plan);


    try {
      // 1) Refresh session to get a fresh HS256-compatible token
      //    (fixes "Unsupported JWT algorithm ES256" on the edge function)
      //    Wrapped in try-catch so it never crashes the checkout flow
      try {
        await supabase.auth.refreshSession();
      } catch (refreshErr) {
        console.log("refreshSession error (non-fatal):", refreshErr);
        // continue — we will still try getSession below
      }

      // 2) Get the fresh session after refresh
      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error("Session error: " + error.message);

      const session = data?.session;
      if (!session?.access_token) throw new Error("Session expired. Please log in again.");

      const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";
      const fnUrl = "https://ygcvcyoynmyrplwrpisd.supabase.co/functions/v1/create-razorpay-order";
      
      // Map frontend plan ID to legacy backend plan ID for 1-month subscription
      const backendPlanId = plan === 'PLAN_1M_INR' ? 'PLAN_499' : plan;

      const res = await fetch(fnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Use anon key as Bearer — it's HS256, so the gateway accepts it ✅
          "Authorization": "Bearer " + ANON_KEY,
          "apikey": ANON_KEY,
          // Pass user's ES256 token separately — function will verify it via getUser()
          "x-user-token": session.access_token,
        },
        body: JSON.stringify({ plan: backendPlanId })
      });

      const dataJson = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Order create failed:", dataJson);
        alert("Order create failed: " + (dataJson?.error || dataJson?.message || res.status));
        return;
      }

      const options = {
        key: dataJson.key,
        amount: dataJson.amount,
        currency: dataJson.currency,
        name: "VLSI Physical Design Ocean",
        description: backendPlanId === "PLAN_499" ? "Paid Modules Access (1 Month)" : "Modules + Placement",
        order_id: dataJson.order_id,
        prefill: { email: dataJson.user_email || "" },
        handler: async function () {
          alert("Payment successful ✅\nUpdating your dashboard...");
          setIsPolling(true);
          
          let attempts = 0;
          const maxAttempts = 10;
          const delay = (ms) => new Promise(res => setTimeout(res, ms));

          while (attempts < maxAttempts) {
            await delay(3000);
            attempts++;
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user?.id)
              .single();

            if (!error && data) {
              setCurrentProfile(data);
              
              const isFutureTs = (ts) => ts && new Date(ts).getTime() > Date.now();
              const courseValid = data.course_active && isFutureTs(data.course_expiry);

              if (courseValid) break;
            }
          }
          setIsPolling(false);
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (e) {
      console.log(e);
      alert("Checkout error: " + (e?.message || e));
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!profile) return <div className={styles.loading}>Loading Profile...</div>;

  const displayProfile = currentProfile || profile;
  const courseValid = !!displayProfile.course_active;
  const placementValid = !!displayProfile.placement_active;
  const isCourseExpired = displayProfile.course_expiry && new Date(displayProfile.course_expiry).getTime() < Date.now();
  const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Lifetime Access';
  return (
    <>
      <div className={styles.dashWrapper}>
        <div className={styles.topRow}>
          <div className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.flexBetween}>
              <div>
                <h1>🎓 Student Dashboard</h1>
                <div className={styles.muted}>
                  {isPolling ? 'Fetching updated access status... ⏳' : 'Premium access status for paid modules & placement support.'}
                </div>
              </div>
              <div className={`${styles.statusBig} ${styles.ok}`}>Logged in ✅</div>
            </div>

            <div className={styles.hr} />

            <div className={styles.muted}>
              <b>Welcome back,</b><br />
              <h2 style={{ margin: '4px 0', fontSize: '20px' }}>{displayProfile.full_name || 'Student'}</h2>
              <span>{displayProfile.email || user?.email}</span>
            </div>

            <div className={styles.statBoxes}>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>Course</span>
                <span className={`${styles.statBoxValue} ${courseValid ? styles.okText : styles.errText}`}>
                  {courseValid ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>Plan</span>
                <span className={styles.statBoxValue} style={{ color: courseValid ? '#facc15' : undefined }}>
                  {displayProfile.active_plan || (courseValid ? 'Premium' : 'None')}
                </span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statBoxLabel}>Expiry</span>
                <span className={styles.statBoxValue}>
                  {courseValid ? fmtDate(displayProfile.course_expiry).split(',')[0] : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Course Access + Webinar Card */}
          <div className={`${styles.card} ${styles.courseCard}`}>
            <div className={styles.flexBetween}>
              <h2>🌊 Paid Modules (9–59)</h2>
              <div className={`${styles.statusBig} ${courseValid ? styles.ok : styles.err}`}>
                {courseValid ? 'Unlocked ✅' : 'Locked 🔒'}
              </div>
            </div>
            <div className={styles.muted} style={{ marginTop: '12px' }}>
              {courseValid
                ? 'Your premium access is granted. Continue your journey through advanced physical design concepts.'
                : 'Subscribe to a plan below to unlock all paid modules (9–59) with full premium access.'}
            </div>

            {courseValid && (
              <div className={styles.actionRow}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => navigate('/platform-flow')}
                >
                  Open Paid Modules →
                </button>
              </div>
            )}

            <div className={styles.webinarCard} style={{ marginTop: '24px' }}>
              <div className={styles.webinarContent}>
                <h3>Upcoming Webinar</h3>
                <p>Floorplanning Masterclass • Live</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Subscription Plans — full width, 3-per-row on desktop ── */}
        {!courseValid && (
          <div className={styles.plansSection}>
            <div className={styles.plansSectionHeader}>
              <h2>🚀 Choose Your Plan</h2>
              <p className={styles.muted}>Select a subscription to unlock all paid modules instantly after payment.</p>
            </div>
            <div className={styles.plansGrid}>
              {activeConfig.plans.map((p) => (
                <div
                  key={p.id}
                  className={`${homeStyles.planCard} ${homeStyles[p.theme]}`}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {p.badge && (
                    <div className={homeStyles.badgeWrapper}>
                      <span className={homeStyles.badgeText}>{p.badge}</span>
                    </div>
                  )}
                  <h3 className={homeStyles.planDuration}>{p.duration}</h3>
                  <div className={homeStyles.priceRow}>
                    {p.originalPrice && (
                      <span className={homeStyles.originalPrice}>
                        {activeConfig.currencySymbol}{p.originalPrice}
                      </span>
                    )}
                    <strong className={homeStyles.planPrice}>
                      {activeConfig.currencySymbol}{p.price}
                    </strong>
                  </div>
                  {p.savings && <div className={homeStyles.savingsPill}>{p.savings}</div>}
                  {p.subBadge && <div className={homeStyles.subBadge}>{p.subBadge}</div>}
                  <div className={homeStyles.planFeaturesList}>
                    <ul>
                      {p.features.map((f, i) => (
                        <li key={i}>
                          <span className={homeStyles.checkIcon}>✔</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={homeStyles.planFooter}>
                    <div className={homeStyles.validityLabel}>
                      <span>📅 {p.validityText}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSubscribeClick(p.id)}
                      className={`${homeStyles.subscribeBtn} ${homeStyles[p.theme + 'Btn']}`}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? '⏳...' : 'SUBSCRIBE NOW'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Row 3: Platform Rules — full width, 3-column grid ── */}
        <div className={`${styles.card} ${styles.rulesCard}`}>
          <div className={styles.rulesGrid}>
            <div>
              <h2>📜 Platform Rules &amp; Exclusions</h2>
              <ul className={styles.miniList}>
                <li><b>Video Classes:</b> All video recorded classes will be available starting from <strong>31st July 2026</strong>.</li>
                <li><b>Future Additions:</b> Quiz tests, resume builder, and certification are future additions and not part of the present subscription plans.</li>
                <li><b>Paid Modules:</b> Access validity is based on your chosen subscription plan duration.</li>
              </ul>
            </div>
            <div>
              <h2>⚡ Automation</h2>
              <div className={styles.muted}>
                Payment → Razorpay order → Payment success → Razorpay webhook → Supabase updates → Dashboard unlocks automatically.
                <p className={styles.noteText}>Wait 15-30 seconds after payment for status refresh.</p>
              </div>
            </div>
            <div>
              <h2>🔧 If Still Locked</h2>
              <ul className={styles.miniList}>
                <li>Refresh the page once</li>
                <li>Logout and login again</li>
                <li>Contact support if webhook fails</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* ── Terms & Conditions Modal ── */}
      {showTermsModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.termsModalContent}>
            <div className={styles.termsModalHeader}>
              <h2>📋 BEFORE PAYMENT - TERMS &amp; CONDITIONS</h2>
              <button
                className={styles.closeModalBtn}
                onClick={() => setShowTermsModal(false)}
              >
                ✕
              </button>
            </div>

            <p className={styles.termsSubTitle}>
              Please read all the points carefully before purchasing the subscription.
            </p>

            <div className={styles.termsScrollBody}>
              <div className={styles.termsPoint}>
                <h4>1️⃣ COURSE ACCESS</h4>
                <ul>
                  <li>This is a subscription-based platform.</li>
                  <li>Access is available only for the duration of the selected plan.</li>
                  <li>Lifetime access is <strong>NOT</strong> provided.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>2️⃣ LANGUAGE</h4>
                <ul>
                  <li>All recorded video classes are provided in English.</li>
                  <li>Videos include practical ICC2 tool execution wherever applicable.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>3️⃣ TOOL ACCESS</h4>
                <ul>
                  <li>We <strong>DO NOT</strong> provide any EDA tool licenses.</li>
                  <li>Students must arrange their own licensed tools if required.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>4️⃣ COURSE CONTENT</h4>
                <p>Your subscription currently includes the features available on the platform at the time of purchase.</p>
                <p>The following features are planned for future release and are <strong>NOT</strong> included in the current subscription unless officially launched:</p>
                <ul>
                  <li>Quiz Tests</li>
                  <li>Certification</li>
                  <li>Resume Builder</li>
                  <li>Additional future modules</li>
                </ul>
                <p>These features will be added gradually.</p>
              </div>

              <div className={styles.termsPoint}>
                <h4>5️⃣ FUTURE UPDATES</h4>
                <ul>
                  <li>New videos, notes, and study materials may be added periodically.</li>
                  <li>The update schedule depends on development progress.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>6️⃣ PAYMENTS</h4>
                <ul>
                  <li>All payments are processed only through the official website.</li>
                  <li>Never make payments to personal accounts unless officially announced.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>7️⃣ REFUND POLICY</h4>
                <ul>
                  <li>All payments are non-refundable.</li>
                  <li>Refunds will not be provided after subscription activation.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>8️⃣ ACCOUNT SHARING</h4>
                <p>Sharing any of the following is strictly prohibited:</p>
                <ul>
                  <li>Login credentials</li>
                  <li>Recorded videos</li>
                  <li>Study materials &amp; PDFs</li>
                  <li>TCL Scripts</li>
                  <li>Website content / downloaded resources</li>
                  <li>Any premium content</li>
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

              <div className={styles.termsPoint}>
                <h4>9️⃣ COPYRIGHT</h4>
                <ul>
                  <li>All videos, notes, scripts, PDFs, website content, and learning materials are the intellectual property of VLSI Physical Design Ocean.</li>
                  <li>Unauthorized copying, recording, redistribution, or commercial use is prohibited.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>🔟 PLACEMENT</h4>
                <p>We do <strong>NOT</strong> guarantee:</p>
                <ul>
                  <li>Placement</li>
                  <li>Job offers</li>
                  <li>Referrals</li>
                  <li>Interviews</li>
                </ul>
                <p>Our responsibility is to provide quality industrial-level learning.</p>
              </div>

              <div className={styles.termsPoint}>
                <h4>1️⃣1️⃣ STUDENT RESPONSIBILITY</h4>
                <p>Success depends on your:</p>
                <ul>
                  <li>Practice</li>
                  <li>Dedication</li>
                  <li>Assignments</li>
                  <li>Continuous learning</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>1️⃣2️⃣ SUPPORT</h4>
                <ul>
                  <li>Technical and course support will be provided according to our support policy.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>1️⃣3️⃣ ACCEPTANCE</h4>
                <p>By clicking "I Agree &amp; Continue", I confirm that:</p>
                <ul>
                  <li>✅ I have read every point.</li>
                  <li>✅ I understand this is NOT lifetime access.</li>
                  <li>✅ I understand tools are NOT provided.</li>
                  <li>✅ I understand all videos are in English.</li>
                  <li>✅ I understand future features are not guaranteed immediately.</li>
                  <li>✅ I understand the refund policy.</li>
                  <li>✅ I agree not to share any premium content.</li>
                  <li>✅ I understand my account may be permanently blocked without refund if I violate these terms.</li>
                </ul>
              </div>
            </div>

            <div className={styles.termsModalFooter}>
              <label className={styles.termsCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={hasAcceptedTerms}
                  onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                />
                I Agree to all Terms &amp; Conditions
              </label>

              <div className={styles.modalActionButtons}>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className={styles.termsCancelBtn}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className={styles.termsContinueBtn}
                  disabled={!hasAcceptedTerms}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Dashboard;
