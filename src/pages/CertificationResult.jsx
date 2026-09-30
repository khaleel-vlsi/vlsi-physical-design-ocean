import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { issueCertificate, getCertificationStatus } from '../services/certificationService';
import { supabase } from '../services/supabase';
import SEO from '../components/SEO';
import OfficialCertificateDocument from '../components/OfficialCertificateDocument';

const CertificationResult = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();

  const [attempt, setAttempt] = useState(location.state?.result || null);
  const [loading, setLoading] = useState(!attempt);
  
  // Certificate intake & confirmation state
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [certificate, setCertificate] = useState(null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueError, setIssueError] = useState(null);
  const [showConfirmPreview, setShowConfirmPreview] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadAttemptAndCert() {
      try {
        let data = attempt;
        if (!data && sessionId) {
          if (sessionId.startsWith('local_')) {
            const localHistory = JSON.parse(localStorage.getItem('ocean_cert_attempts') || '[]');
            data = localHistory.find(a => a.id === sessionId);
          } else {
            const { data: dbData } = await supabase.from('certification_attempts').select('*').eq('id', sessionId).single();
            data = dbData;
          }
        }

        if (isMounted && data) {
          setAttempt(data);
        }

        // Check if certificate is already generated/issued for this attempt
        if (user && (data || sessionId)) {
          let certObj = null;
          if (sessionId && !sessionId.startsWith('local_')) {
            const { data: cData } = await supabase.from('certificates').select('*').eq('attempt_id', sessionId).maybeSingle();
            certObj = cData;
          }
          if (!certObj) {
            const localCerts = JSON.parse(localStorage.getItem('ocean_certificates') || '[]');
            certObj = localCerts.find(c => c.attempt_id === sessionId || c.user_id === user.id);
          }

          if (isMounted && certObj) {
            setCertificate(certObj);
          }
        }
      } catch (err) {
        console.warn('Error loading result attempt or certificate:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAttemptAndCert();
    return () => { isMounted = false; };
  }, [sessionId, attempt, user]);

  // Handle Certificate Generation Submission
  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || isIssuing) return;
    setIsIssuing(true);
    setIssueError(null);

    try {
      const cert = await issueCertificate(user.id, sessionId, fullName, email);
      if (cert) {
        setCertificate(cert);
        setShowConfirmPreview(false);
      } else {
        throw new Error('Failed to generate certificate record.');
      }
    } catch (err) {
      console.error('Error issuing certificate:', err);
      setIssueError(err.message || 'Could not issue certificate.');
    } finally {
      setIsIssuing(false);
    }
  };

  // Printable Download Certificate Handler
  const handleDownloadCertificate = () => {
    if (!certificate) return;
    window.print();
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
        <h2>Loading Certification Scorecard & Credentials...</h2>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', color: '#f87171' }}>
          <h2>Examination Session Not Found</h2>
          <button onClick={() => navigate('/dashboard')} style={{ marginTop: '16px', padding: '10px 20px', borderRadius: '9999px', background: '#38bdf8', color: '#0f172a', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isPass = attempt.is_pass || attempt.status === 'PASSED' || attempt.status === 'PASSED_AWAITING_DETAILS' || attempt.status === 'CERTIFICATE_ISSUED';
  const obtainedMarks = attempt.obtained_marks || 0;
  const totalMarks = attempt.total_marks || 200;
  const percentage = attempt.percentage || Math.round((obtainedMarks / totalMarks) * 100);

  return (
    <div style={{ maxWidth: '1040px', margin: '40px auto', padding: '0 20px 60px 20px' }}>
      <SEO title="Certification Examination Scorecard & Credentials" description="VLSI Physical Design Official Certification Scorecard and Issued Credential." />

      {/* Result Card */}
      <div style={{
        padding: '36px 32px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        border: `1px solid ${isPass ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
        borderRadius: '28px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        textAlign: 'center',
        backdropFilter: 'blur(16px)'
      }}>
        
        <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
          {isPass ? '🎉' : '❌'}
        </div>

        <h1 style={{ color: isPass ? '#10b981' : '#f87171', fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0' }}>
          {isPass ? '🎉 CERTIFICATION QUALIFIED!' : attempt.status === 'TERMINATED' || attempt.termination_reason ? '🔴 CERTIFICATION EXAM TERMINATED' : '❌ CERTIFICATION NOT CLEARED'}
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: '0 0 28px 0' }}>
          {isPass 
            ? 'Congratulations! You have passed the strictly proctored VLSI Physical Design Ocean Certification Examination.' 
            : attempt.termination_reason || attempt.status === 'TERMINATED'
              ? `Examination terminated due to security violation: ${attempt.termination_reason || 'Proctoring Policy Exceeded'}. Exactly 1 attempt has been consumed.`
              : 'You did not reach the minimum pass score of 160 / 200 marks (80%). Exactly 1 attempt has been consumed.'}
        </p>

        {/* Scorecard Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', background: 'rgba(15, 23, 42, 0.6)', padding: '20px', borderRadius: '18px', marginBottom: '32px' }}>
          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 700 }}>OBTAINED SCORE</div>
            <div style={{ color: isPass ? '#10b981' : '#f87171', fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>
              {obtainedMarks} / {totalMarks}
            </div>
          </div>

          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 700 }}>PERCENTAGE</div>
            <div style={{ color: '#f8fafc', fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>
              {percentage}%
            </div>
          </div>

          <div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', fontWeight: 700 }}>STATUS</div>
            <div style={{ color: isPass ? '#10b981' : '#f87171', fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>
              {isPass ? 'QUALIFIED' : 'FAILED'}
            </div>
          </div>
        </div>

        {/* Failed Action */}
        {!isPass && (
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              style={{ padding: '14px 32px', borderRadius: '9999px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.4)' }}
            >
              ⬅️ Return to Student Dashboard
            </button>
          </div>
        )}

        {/* Passed: Certificate Details Form */}
        {isPass && !certificate && (
          <div style={{ textAlign: 'left', background: 'rgba(30, 41, 59, 0.6)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '1.15rem', fontWeight: 800 }}>
              🎓 Official Certificate Generation Form
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '20px' }}>
              Enter your full legal name exactly as it should appear on your official certificate.
            </p>

            <form onSubmit={handleIssueCertificate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  FULL NAME FOR CERTIFICATE (EXACT NAME)
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setShowConfirmPreview(true);
                  }}
                  placeholder="e.g. Priyanka Kompelli"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#f8fafc', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  REGISTERED EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: '#090d16', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#f8fafc', fontSize: '0.95rem' }}
                />
              </div>

              {/* Confirmation Preview Step */}
              {showConfirmPreview && fullName.trim() && (
                <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '14px 18px', borderRadius: '12px', border: '1px dashed rgba(16, 185, 129, 0.5)' }}>
                  <div style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Preview Certificate Name</div>
                  <div style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>{fullName.trim()}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>
                    Note: The certificate will use this exact name without automatic spell correction.
                  </div>
                </div>
              )}

              {issueError && (
                <div style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 700 }}>
                  ⚠️ {issueError}
                </div>
              )}

              <button
                type="submit"
                disabled={isIssuing || !fullName.trim()}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)', marginTop: '8px' }}
              >
                {isIssuing ? '⏳ Generating Serial Number & Certificate...' : '🎓 Confirm & Generate Official Certificate'}
              </button>
            </form>
          </div>
        )}

        {/* Certificate Issued Display (Premium Standalone Document) */}
        {isPass && certificate && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#10b981', fontSize: '1.25rem', fontWeight: 800 }}>
                📜 Official Certificate Issued
              </h3>
              <span style={{ padding: '6px 14px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.8rem', fontWeight: 800 }}>
                PERMANENTLY LOCKED 🔒
              </span>
            </div>

            {/* Official Premium Certificate Document */}
            <div style={{ marginBottom: '24px' }}>
              <OfficialCertificateDocument certificate={certificate} />
            </div>

            {/* External Action Bar (Outside Document) */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button
                onClick={handleDownloadCertificate}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)' }}
              >
                ⬇️ Download / Print Certificate (PDF)
              </button>
              <button
                onClick={() => navigate(`/certificate/verify/${certificate.certificate_id}`)}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: '#38bdf8', color: '#0f172a', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}
              >
                🔍 Public Verification Link
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              >
                Return to Dashboard
              </button>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: '#f87171', fontSize: '0.82rem', fontWeight: 700 }}>
              🔒 Permanent Lock Active: Certification examination passed &amp; certificate issued. Candidate is permanently blocked from writing further certification attempts. Remaining attempts: 0.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CertificationResult;
