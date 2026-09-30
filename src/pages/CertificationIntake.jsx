import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCertificationStatus, startCertificationExam } from '../services/certificationService';
import { CERTIFICATION_CONFIG } from '../data/certificationConfig';
import SEO from '../components/SEO';

const CertificationIntake = () => {
  const navigate = useNavigate();
  const { user, profile, hasPremiumAccess } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [certStatus, setCertStatus] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Agreement & Starting state
  const [agreed, setAgreed] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // 1. Check device type (Desktop vs Mobile/Tablet)
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isSmallScreen = window.innerWidth < 768;

    if (mobileRegex.test(userAgent) || isSmallScreen) {
      setIsMobile(true);
    }
  }, []);

  // 2. Fetch certification eligibility
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const status = await getCertificationStatus(user.id, profile?.active_plan);
        if (isMounted) {
          setCertStatus(status);
        }
      } catch (err) {
        console.warn('Error loading certification status:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [user, profile]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // 3. Request WebCam Permission
  const handleRequestCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('WebCam access is not supported by your browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Camera permission error:', err);
      setCameraActive(false);
      setCameraError(err.message || 'Camera permission denied or camera not found.');
    }
  };

  // 4. Start Exam handler
  const handleStartExam = async () => {
    if (!agreed || !cameraActive || isStarting) return;
    setIsStarting(true);
    setErrorMsg(null);

    try {
      // Request Fullscreen before launching
      if (document.documentElement.requestFullscreen) {
        try {
          await document.documentElement.requestFullscreen();
        } catch (fsErr) {
          console.warn('Fullscreen request bypassed:', fsErr);
        }
      }

      const attempt = await startCertificationExam(user.id, profile?.active_plan);
      if (attempt && attempt.id) {
        navigate(`/certification/exam/${attempt.id}`);
      } else {
        throw new Error('Failed to create examination session.');
      }
    } catch (err) {
      console.error('Failed to start certification exam:', err);
      setErrorMsg(err.message || 'Could not start examination session. Please try again.');
      setIsStarting(false);
    }
  };

  if (!hasPremiumAccess) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '560px', padding: '36px 28px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', backdropFilter: 'blur(16px)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>
            Premium Access Required
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
            The official VLSI Physical Design Ocean Certification Exam is strictly accessible to active paid subscribers.
          </p>
          <button onClick={() => navigate('/paid-modules')} style={{ padding: '12px 28px', borderRadius: '9999px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#ffffff', border: 'none', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer' }}>
            ✨ Upgrade to Premium Subscription
          </button>
        </div>
      </div>
    );
  }

  // Mobile Device Block Overlay
  if (isMobile) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '540px', padding: '36px 28px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>💻</div>
          <h2 style={{ color: '#f87171', fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px' }}>
            Desktop / Laptop Required
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
            Certification examination must be taken on a desktop or laptop computer. Mobile and tablet devices are not supported for proctored examination sessions.
          </p>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 24px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontWeight: '800', cursor: 'pointer' }}>
            ⬅️ Return to Student Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (certStatus?.isPassed || certStatus?.certificateIssued) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ maxWidth: '560px', padding: '36px 28px', background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(16, 185, 129, 0.5)', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🎓</div>
          <h2 style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>
            Certification Already Completed
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '24px' }}>
            Congratulations! You have passed the certification examination. Further attempts are permanently locked.
          </p>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '12px 28px', borderRadius: '9999px', background: '#10b981', color: '#ffffff', border: 'none', fontWeight: '800', cursor: 'pointer' }}>
            🏆 Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '30px auto', padding: '0 20px 40px 20px' }}>
      <SEO title="Certification Exam Intake & Proctoring Setup" description="Prepare for the VLSI Physical Design Ocean Certification Examination." />

      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
          🏆 VLSI Physical Design Certification Exam
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
          Proctored Online Assessment — 200 Marks | 90 Minutes | Pass Threshold: 160 / 200 (80%)
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Rules & Requirements */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#38bdf8', fontSize: '1.15rem', fontWeight: 800 }}>
            📋 Examination Rules &amp; Security Protocol
          </h3>

          <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <li><strong>Duration &amp; Marks</strong>: 90 Minutes countdown for 200 questions.</li>
            <li><strong>Marking Scheme</strong>: Correct: <strong>+1.0 Mark</strong> \| Wrong: <strong>-0.5 Negative Mark</strong> \| Unanswered: <strong>0 Marks</strong>.</li>
            <li><strong>Pass Mark</strong>: Minimum <strong>160 / 200 Marks (80%)</strong> required to qualify.</li>
            <li><strong>WebCam Monitoring</strong>: Camera stream must remain connected throughout the exam.</li>
            <li><strong>Fullscreen Requirement</strong>: Exam runs in full-screen mode. Exiting full-screen results in warnings and eventual termination.</li>
            <li><strong>Zero Tab Switching</strong>: Changing tabs, opening new browser windows, or switching applications triggers security violations.</li>
            <li><strong>2 Violation Policy</strong>: Reaching 2 violations automatically terminates the examination attempt.</li>
            <li><strong>Copy/Paste Lock</strong>: Copying, pasting, right-clicking, and text selection are disabled during testing.</li>
            <li><strong>Pass Lock Rule</strong>: Once you pass and your certificate is issued, all remaining attempts become permanently locked.</li>
          </ul>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#f8fafc', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
              />
              <span>I have read, understood, and agree to follow all proctored certification examination rules.</span>
            </label>
          </div>
        </div>

        {/* Right Column: WebCam Check & Launch Button */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: '#38bdf8', fontSize: '1.15rem', fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📷 CAMERA POSITION CHECK</span>
              {cameraActive && (
                <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', fontWeight: 800 }}>
                  ● CAMERA ACTIVE
                </span>
              )}
            </h3>

            <div style={{ padding: '10px 14px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px', lineHeight: '1.45' }}>
              🎯 <strong>Positioning Requirement:</strong> Your face, upper body, and examination workspace must remain clearly visible inside the camera frame throughout testing.
            </div>

            {/* Video Preview Box */}
            <div style={{ width: '100%', height: '200px', background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: cameraActive ? 'block' : 'none' }}
              />

              {!cameraActive && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📷</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 16px 0' }}>
                    Camera preview will appear here once permission is granted.
                  </p>
                  <button 
                    onClick={handleRequestCamera}
                    style={{ padding: '10px 20px', borderRadius: '9999px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Grant Camera Access
                  </button>
                </div>
              )}
            </div>

            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '10px', lineHeight: '1.4' }}>
              ℹ️ <strong>Privacy Notice:</strong> Your webcam will be continuously analyzed during testing for face presence, multiple persons, camera obstruction, and prohibited devices visible within the camera frame.
            </p>

            {cameraError && (
              <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', color: '#f87171', fontSize: '0.85rem' }}>
                ⚠️ {cameraError}
              </div>
            )}
          </div>

          <div style={{ marginTop: '24px' }}>
            {errorMsg && (
              <div style={{ marginBottom: '12px', color: '#f87171', fontSize: '0.85rem', fontWeight: 700 }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <button
              onClick={handleStartExam}
              disabled={!agreed || !cameraActive || isStarting}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '9999px',
                background: (agreed && cameraActive) ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(148, 163, 184, 0.2)',
                color: (agreed && cameraActive) ? '#ffffff' : '#64748b',
                border: 'none',
                fontWeight: 800,
                fontSize: '1.05rem',
                cursor: (agreed && cameraActive) ? 'pointer' : 'not-allowed',
                boxShadow: (agreed && cameraActive) ? '0 4px 25px rgba(16, 185, 129, 0.4)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {isStarting ? '⏳ Initializing Exam Session...' : '🚀 START CERTIFICATION EXAM'}
            </button>

            {(!agreed || !cameraActive) && (
              <p style={{ margin: '8px 0 0 0', textAlign: 'center', color: '#94a3b8', fontSize: '0.78rem' }}>
                * Complete WebCam check and accept rules to enable exam start.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CertificationIntake;
