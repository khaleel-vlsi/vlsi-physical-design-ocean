import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import { plansConfig, getRegionKey } from '../data/plansConfig';
import IndependenceBanner from '../components/IndependenceBanner';
import styles from './Dashboard.module.css';

const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (typeof window.Razorpay === 'function') {
      resolve(true);
      return;
    }
    const existing = document.getElementById('razorpay-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener('error', () => resolve(false), { once: true });
      setTimeout(() => resolve(typeof window.Razorpay === 'function'), 1500);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
    if (!planId) return;
    setPendingPlanId(planId);
    setHasAcceptedTerms(false);
    setShowTermsModal(true);
  };

  const handleConfirmPayment = () => {
    if (!hasAcceptedTerms || !pendingPlanId) return;
    setShowTermsModal(false);
    startCheckout(pendingPlanId);
  };

  useEffect(() => {
    loadRazorpaySDK();
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
      // 1. Ensure Razorpay SDK is loaded
      const isSdkReady = await loadRazorpaySDK();
      if (!isSdkReady || typeof window.Razorpay !== 'function') {
        alert("Payment gateway SDK failed to load. Please check your internet connection and try again.");
        setIsCheckingOut(false);
        return;
      }

      // 2. Refresh session token
      try {
        await supabase.auth.refreshSession();
      } catch (refreshErr) {
        console.log("refreshSession error (non-fatal):", refreshErr);
      }

      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error("Session error: " + error.message);

      const session = data?.session;
      if (!session?.access_token) throw new Error("Session expired. Please log in again.");

      const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnY3ZjeW95bm15cnBsd3JwaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDg4NzUsImV4cCI6MjA4NzAyNDg3NX0.pfeo4p42y53fCaA49oe1yXXFU22BvTEotzlZAFhYzqU";
      const fnUrl = "https://ygcvcyoynmyrplwrpisd.supabase.co/functions/v1/create-razorpay-order";
      const verifyFnUrl = "https://ygcvcyoynmyrplwrpisd.supabase.co/functions/v1/verify-razorpay-payment";
      
      const backendPlanId = plan === 'PLAN_1M_INR' ? 'PLAN_499' : plan;

      const res = await fetch(fnUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + ANON_KEY,
          "apikey": ANON_KEY,
          "x-user-token": session.access_token,
        },
        body: JSON.stringify({ plan: backendPlanId })
      });

      const dataJson = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("Order create failed:", dataJson);
        alert("Order create failed: " + (dataJson?.error || dataJson?.message || res.status));
        setIsCheckingOut(false);
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
        handler: async function (response) {
          alert("Payment successful ✅\nVerifying your payment & extending validity...");
          setIsPolling(true);
          
          try {
            const verifyRes = await fetch(verifyFnUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + ANON_KEY,
                "apikey": ANON_KEY,
                "x-user-token": session.access_token,
              },
              body: JSON.stringify({
                razorpay_payment_id: response?.razorpay_payment_id,
                razorpay_order_id: response?.razorpay_order_id || dataJson.order_id,
                razorpay_signature: response?.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json().catch(() => ({}));
            if (verifyRes.ok && verifyData.profile) {
              setCurrentProfile(verifyData.profile);
              setIsPolling(false);
              alert("🎉 Subscription activated / extended successfully!\nYour premium access is active until " + new Date(verifyData.profile.course_expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
              return;
            }
          } catch (vErr) {
            console.error("Verification Edge Function call error:", vErr);
          }

          // Fallback Polling if Verification Edge Function is delayed
          let attempts = 0;
          const maxAttempts = 10;
          const delay = (ms) => new Promise(r => setTimeout(r, ms));

          while (attempts < maxAttempts) {
            await delay(2000);
            attempts++;
            const { data: updatedProf } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            if (updatedProf && updatedProf.course_active) {
              setCurrentProfile(updatedProf);
              setIsPolling(false);
              alert("🎉 Subscription activated / extended successfully!\nYour premium access is active until " + new Date(updatedProf.course_expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
              return;
            }
          }
          setIsPolling(false);
          window.location.reload();
        },
        modal: {
          ondismiss: function () {
            setIsCheckingOut(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to start payment checkout: " + (err.message || err));
      setIsCheckingOut(false);
    }
  };

  if (!profile) return <div className={styles.loading}>Loading Profile...</div>;

  const displayProfile = currentProfile || profile;
  const courseValid = !!displayProfile.course_active;
  const fmtDate = (ts) => ts ? new Date(ts).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Lifetime Access';

  // Helper to calculate expected new expiry date for active subscribers
  const getExpectedNewExpiry = (planId) => {
    const daysMap = {
      'PLAN_1M_INR': 30,
      'PLAN_2M_INR': 60,
      'PLAN_3M_INR': 90,
      'PLAN_6M_INR': 180,
      'PLAN_12M_INR': 365
    };
    const daysToAdd = daysMap[planId] || 30;
    
    let baseTime = Date.now();
    if (courseValid && displayProfile.course_expiry) {
      const currentExpiryMs = new Date(displayProfile.course_expiry).getTime();
      if (currentExpiryMs > Date.now()) {
        baseTime = currentExpiryMs;
      }
    }
    const newExpiryMs = baseTime + daysToAdd * 24 * 60 * 60 * 1000;
    return {
      daysAdded: daysToAdd,
      formattedNewDate: new Date(newExpiryMs).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      formattedCurrentDate: courseValid && displayProfile.course_expiry ? fmtDate(displayProfile.course_expiry) : 'Today'
    };
  };

  return (
    <>
      <IndependenceBanner />
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

            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginTop: '12px',
              fontSize: '11.5px',
              color: '#fca5a5',
              lineHeight: '1.4',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px'
            }}>
              <span>⚠️</span>
              <div>
                If you have completed your payment successfully but modules do not open even after refreshing 3 to 4 times, please contact support at <b>+91 8309746357</b>. <b>(Do not call; only send a WhatsApp message with a screenshot of your Student Dashboard, your registered Name & Email, and a clear explanation of the problem. It will be resolved within 24 hours.)</b>
              </div>
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
                  {courseValid ? (displayProfile.active_plan || 'Premium') : 'None'}
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

        {/* ── Subscription / Plan Extension Section ── */}
        <div className={styles.plansSection}>
          <div className={styles.plansSectionHeader}>
            {courseValid ? (
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.2) 0%, rgba(19, 136, 8, 0.2) 100%)',
                border: '1px solid rgba(255, 215, 0, 0.4)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.4rem' }}>🇮🇳</span>
                  <h2 style={{ color: '#ffd700', margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>
                    INDEPENDENCE DAY UPGRADE / EXTENSION OFFER (25% OFF)
                  </h2>
                  <span style={{ background: '#ffd700', color: '#0f172a', fontWeight: '900', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>
                    25% OFF LIVE
                  </span>
                </div>
                <p style={{ color: '#ffffff', margin: '8px 0 0', fontSize: '0.88rem', lineHeight: '1.5' }}>
                  🎉 <strong>Active Subscriber Special:</strong> Extend or upgrade your subscription now! Your remaining subscription days will <strong>NOT</strong> be lost — the selected plan duration will be added to your current valid expiry date (<strong>{fmtDate(displayProfile.course_expiry)}</strong>).
                </p>
              </div>
            ) : (
              <>
                <h2>🚀 Choose Your Plan (25% OFF INDEPENDENCE DAY OFFER)</h2>
                <p className={styles.muted}>Select a subscription to unlock all paid modules instantly after payment.</p>
              </>
            )}
          </div>

          <div className={styles.dbPlansContainer}>
            {activeConfig.plans.map((p) => {
              const preview = getExpectedNewExpiry(p.id);
              return (
                <div
                  key={p.id}
                  className={styles.dbPlanCard}
                  style={{
                    flex: '1 1 220px',
                    minWidth: '220px',
                    maxWidth: '320px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: courseValid ? '1px solid rgba(250, 204, 21, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)'
                  }}
                >
                  {p.badge && (
                    <div className={styles.dbPlanBadge}>{p.badge}</div>
                  )}
                  <h3 className={styles.dbPlanDuration}>{p.duration}</h3>
                  <div className={styles.dbPlanPriceRow}>
                    {p.originalPrice && (
                      <span className={styles.dbOriginalPrice}>
                        {activeConfig.currencySymbol}{p.originalPrice}
                      </span>
                    )}
                    <strong className={styles.dbPlanPrice}>
                      {activeConfig.currencySymbol}{p.price}
                    </strong>
                  </div>
                  {p.savings && <div className={styles.dbSavingsPill}>{p.savings}</div>}
                  
                  {courseValid && (
                    <div style={{
                      background: 'rgba(250, 204, 21, 0.12)',
                      border: '1px solid rgba(250, 204, 21, 0.35)',
                      borderRadius: '6px',
                      padding: '8px 6px',
                      margin: '10px 0',
                      fontSize: '0.78rem',
                      color: '#fef08a',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        🗓️ <strong>NEW EXPIRY PREVIEW:</strong>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                        {preview.formattedNewDate}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#ffd700', marginTop: '2px' }}>
                        (+{preview.daysAdded} Days Added)
                      </div>
                    </div>
                  )}

                  <div className={styles.dbPlanFeaturesList}>
                    <ul>
                      {p.features.map((f, i) => (
                        <li key={i}>
                          <span className={styles.dbCheckIcon}>✔</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.dbPlanFooter}>
                    <div className={styles.dbValidityLabel}>
                      <span>📅 {p.validityText}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubscribeClick(p.id);
                      }}
                      className={styles.dbSubscribeBtn}
                      style={{
                        background: courseValid ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' : '#10b981',
                        color: '#0f172a',
                        fontWeight: '900',
                        fontSize: '0.82rem',
                        padding: '12px',
                        cursor: 'pointer'
                      }}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? '⏳ processing...' : (courseValid ? '⚡ EXTEND / UPGRADE PLAN' : '🛒 SUBSCRIBE NOW')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Platform Rules — full width ── */}
        <div className={`${styles.card} ${styles.rulesCard}`}>
          <div className={styles.rulesGrid}>
            <div>
              <h2>📜 Platform Rules &amp; Exclusions</h2>
              <ul className={styles.rulesList}>
                <li>Access is provided for learning purposes only.</li>
                <li>Content sharing or recording is strictly prohibited.</li>
                <li>Multiple simultaneous logins may trigger security locks.</li>
              </ul>
            </div>
            <div>
              <h2>🤝 Support Policy</h2>
              <ul className={styles.rulesList}>
                <li>Module-wise doubt support is available via email.</li>
                <li>Response time: within 24–48 working hours.</li>
                <li>Live doubt sessions are scheduled periodically.</li>
              </ul>
            </div>
            <div>
              <h2>⚡ Terms &amp; Refund Policy</h2>
              <ul className={styles.rulesList}>
                <li>All subscriptions are non-refundable once activated.</li>
                <li>No partial refunds for unused subscription periods.</li>
                <li>Plan details and features are subject to update.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
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
              Please read all the points carefully before purchasing or extending your subscription.
            </p>

            {courseValid && pendingPlanId && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                color: '#a7f3d0',
                fontSize: '0.85rem'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#ffffff' }}>
                  ✨ PLAN EXTENSION CONFIRMATION
                </div>
                <div style={{ marginTop: '4px' }}>
                  Current Expiry: <strong>{fmtDate(displayProfile.course_expiry)}</strong>
                </div>
                <div>
                  New Expiry After Purchase: <strong style={{ color: '#ffd700', fontSize: '1rem' }}>{getExpectedNewExpiry(pendingPlanId).formattedNewDate}</strong> (+{getExpectedNewExpiry(pendingPlanId).daysAdded} Days)
                </div>
                <div style={{ fontSize: '0.78rem', color: '#e2e8f0', marginTop: '4px' }}>
                  Your remaining subscription days are preserved and added to the new plan duration.
                </div>
              </div>
            )}

            <div className={styles.termsScrollBody}>
              <div className={styles.termsPoint}>
                <h4>1️⃣ COURSE ACCESS & EXTENSION</h4>
                <ul>
                  <li>This is a subscription-based platform.</li>
                  <li>Access is available for the duration of the selected plan.</li>
                  <li>For active subscribers, new plan duration is added to your current valid expiry date.</li>
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
                <h4>4️⃣ REFUND POLICY</h4>
                <ul>
                  <li>All payments are non-refundable.</li>
                  <li>Refunds will not be provided after subscription activation or extension.</li>
                </ul>
              </div>

              <div className={styles.termsPoint}>
                <h4>5️⃣ ACCOUNT SHARING & COPYRIGHT</h4>
                <p>Sharing credentials or materials is strictly prohibited.</p>
                <div className={styles.redWarningBox}>
                  <strong>Violation will result in:</strong>
                  <ul>
                    <li>❌ Immediate account termination</li>
                    <li>❌ Permanent subscription cancellation</li>
                  </ul>
                </div>
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
