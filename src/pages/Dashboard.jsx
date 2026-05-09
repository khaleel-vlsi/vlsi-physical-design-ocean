import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, profile } = useAuth();

  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [isPolling, setIsPolling] = React.useState(false);
  const [currentProfile, setCurrentProfile] = React.useState(profile);

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
      debugger
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
        body: JSON.stringify({ plan })
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
        description: plan === "PLAN_499" ? "Paid Modules Access" : "Modules + Placement",
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
              const placementValid = data.placement_active && isFutureTs(data.placement_expiry);

              if (plan === 'PLAN_499' && courseValid) break;
              if (plan === 'PLAN_1999' && placementValid) break;
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

  const isFuture = (ts) => ts && new Date(ts).getTime() > Date.now();
  const fmtDate = (ts) => ts ? new Date(ts).toLocaleString() : '-';

  const courseValid = displayProfile.course_active && isFuture(displayProfile.course_expiry);
  const placementValid = displayProfile.placement_active && isFuture(displayProfile.placement_expiry);

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.flexBetween}>
          <div>
            <h1>📘 Student Dashboard</h1>
            <div className={styles.muted}>
              {isPolling ? "Fetching updated access status... ⏳" : "Premium access status for paid modules & placement support."}
            </div>
          </div>
          <div className={`${styles.statusBig} ${styles.ok}`}>Logged in ✅</div>
        </div>

        <div className={styles.hr}></div>

        <div className={styles.muted}>
          <b>Welcome,</b> {displayProfile.full_name || "Student"}<br />
          <span>{displayProfile.email || user?.email}</span>
        </div>

        <div className={styles.pillRow}>
          <span className={styles.pill}>Course: <b className={courseValid ? styles.okText : styles.errText}>{courseValid ? "Active" : "Inactive"}</b></span>
          <span className={styles.pill}>Course Expiry: <b>{fmtDate(displayProfile.course_expiry)}</b></span>
          <span className={styles.pill}>Placement: <b className={placementValid ? styles.okText : styles.errText}>{placementValid ? "Active" : "Inactive"}</b></span>
          <span className={styles.pill}>Placement Expiry: <b>{fmtDate(displayProfile.placement_expiry)}</b></span>
          <span className={styles.pill}>Mock Remaining: <b>{displayProfile.mock_remaining ?? 0}</b></span>
        </div>

        <div className={styles.hr}></div>

        {/* Course Section */}
        <div className={styles.subCard}>
          <div className={styles.flexBetween}>
            <h2>🌊 Paid Modules (9–32)</h2>
            <div className={`${styles.statusBig} ${courseValid ? styles.ok : styles.err}`}>
              {courseValid ? "Unlocked ✅" : "Locked 🔒"}
            </div>
          </div>
          <div className={styles.muted} style={{ marginTop: '8px' }}>
            {courseValid ? (
              <><span className={styles.okText}><b>Premium access granted.</b></span><br />Click below to access.</>
            ) : (
              <><span className={styles.errText}><b>Not active.</b></span><br />Pay ₹499 to unlock modules 9–32.</>
            )}
          </div>
          <div className={styles.actionRow}>
            {courseValid ? (
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => alert("Navigating to paid modules...")}>Open Paid Modules</button>
            ) : (
              <button className={`${styles.btn} ${styles.btnGold}`} onClick={() => startCheckout('PLAN_499')}>
                {isCheckingOut ? '⏳ Processing...' : '💳 Pay ₹499 (Unlock Modules)'}
              </button>
            )}
          </div>
        </div>

        <div className={styles.hr}></div>

        {/* Placement Section */}
        <div className={styles.subCard}>
          <div className={styles.flexBetween}>
            <h2>🚀 Placement Support + Mock Interviews</h2>
            <div className={`${styles.statusBig} ${placementValid ? styles.ok : styles.err}`}>
              {placementValid ? "Unlocked ✅" : "Locked 🔒"}
            </div>
          </div>
          <div className={styles.muted} style={{ marginTop: '8px' }}>
            {placementValid ? (
              <><span className={styles.okText}><b>Placement support active.</b></span><br />Mock remaining: <b>{displayProfile.mock_remaining ?? 0}</b></>
            ) : (
              <><span className={styles.errText}><b>Not active.</b></span><br />Pay ₹1999 to unlock modules + placement.</>
            )}
          </div>
          <div className={styles.actionRow}>
            {placementValid ? (
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => alert("Navigating to placement area...")}>Open Placement Area</button>
            ) : (
              <button className={`${styles.btn} ${styles.btnGold}`} onClick={() => startCheckout('PLAN_1999')}>
                {isCheckingOut ? '⏳ Processing...' : '🚀 Pay ₹1999 (Modules + Placement)'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h2>✅ Rules</h2>
        <ul className={styles.miniList}>
          <li><b>Paid Modules:</b> 6 months from purchase date</li>
          <li><b>Placement:</b> 1 year from purchase date</li>
          <li><b>Mock Interviews:</b> 3 per user (tracked)</li>
        </ul>
        <div className={styles.hr}></div>
        <h2>⚡ Automation (Important)</h2>
        <div className={styles.muted}>
          Payment → Razorpay order → Payment success → Razorpay webhook → Supabase updates → Dashboard unlocks automatically.<br /><br />
          After payment, your dashboard will automatically refresh its status within 15-30 seconds.
        </div>
        <div className={styles.hr}></div>
        <h2>🛠 If still locked</h2>
        <ul className={styles.miniList}>
          <li>Refresh once</li>
          <li>Logout & login again</li>
          <li>If still locked → webhook not updating database</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
