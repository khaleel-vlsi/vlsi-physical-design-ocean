import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { issueCertificate, getCertificationStatus, startCertificationExam } from '../services/certificationService';
import OfficialCertificateDocument from '../components/OfficialCertificateDocument';

const TestCertDirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [fullName, setFullName] = useState('Priyanka Kompelli');
  const [email, setEmail] = useState(user?.email || 'priyanka@example.com');
  const [certificate, setCertificate] = useState(null);
  const [isIssuing, setIsIssuing] = useState(false);
  const [issueError, setIssueError] = useState(null);
  const [lockStatus, setLockStatus] = useState(null);
  const [lockTestResult, setLockTestResult] = useState(null);

  // Simulated passed session ID
  const testSessionId = `local_test_session_${Date.now()}`;
  const mockUserId = user?.id || `test_user_${Date.now()}`;

  const handleGenerateCertificate = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || isIssuing) return;

    setIsIssuing(true);
    setIssueError(null);

    try {
      // Direct certificate issuance bypassing exam questions
      const cert = await issueCertificate(mockUserId, testSessionId, fullName.trim(), email.trim());
      if (cert) {
        setCertificate(cert);
      } else {
        throw new Error('Failed to generate certificate record.');
      }
    } catch (err) {
      console.error('Error generating direct certificate:', err);
      setIssueError(err.message || 'Could not generate certificate.');
    } finally {
      setIsIssuing(false);
    }
  };

  // Printable Download Certificate Handler
  const handleDownload = () => {
    if (!certificate) return;
    window.print();
  };

  // Test Permanent Certification Lock Logic
  const handleTestPermanentLock = async () => {
    setLockTestResult('Evaluating permanent certification lock...');
    try {
      const status = await getCertificationStatus(mockUserId, '1 Month');
      try {
        await startCertificationExam(mockUserId, '1 Month');
        setLockTestResult('❌ FAILED: Exam launch allowed after certificate issuance!');
      } catch (err) {
        setLockTestResult(`✅ PASSED: Exam launch PERMANENTLY BLOCKED. Error: "${err.message}"`);
      }
      setLockStatus(status);
    } catch (e) {
      setLockTestResult(`Status check complete: ${e.message}`);
    }
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '40px auto', padding: '0 20px 60px 20px' }}>
      <div style={{
        padding: '36px 32px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.4)',
        borderRadius: '28px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span style={{ padding: '6px 16px', borderRadius: '9999px', background: 'rgba(234, 179, 8, 0.15)', border: '1px solid rgba(234, 179, 8, 0.4)', color: '#eab308', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
            🧪 LOCAL TEST MODE — DIRECT CERTIFICATE DESIGN TEST
          </span>
          <h1 style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 800, margin: '16px 0 6px 0' }}>
            Premium Certificate Design &amp; Lock Test Page
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Test standalone A4 landscape certificate generation, unique serial number assignment, printable download, and permanent attempt lock.
          </p>
        </div>

        {/* Certificate Intake Form */}
        {!certificate && (
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#38bdf8', fontSize: '1.15rem', fontWeight: 800 }}>
              🎓 Certificate Information Form
            </h3>

            <form onSubmit={handleGenerateCertificate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px' }}>
                  FULL NAME FOR CERTIFICATE (EXACT NAME PRESERVED)
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full legal name (e.g. Priyanka Kompelli)"
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

              {/* Live Preview Box */}
              <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px 18px', borderRadius: '12px', border: '1px dashed rgba(16, 185, 129, 0.5)' }}>
                <div style={{ color: '#10b981', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>Live Certificate Centerpiece Name Preview</div>
                <div style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 800, marginTop: '2px', fontFamily: "'Georgia', serif" }}>{fullName || '(Enter name)'}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '4px' }}>
                  Exact string preserved without automatic spell-correction.
                </div>
              </div>

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
                {isIssuing ? '⏳ Generating Certificate...' : '🎓 Confirm & Generate Premium Certificate Directly'}
              </button>
            </form>
          </div>
        )}

        {/* Issued Standalone Certificate Document & External Action Bar */}
        {certificate && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#10b981', fontSize: '1.25rem', fontWeight: 800 }}>
                📜 Official Standalone Certificate Generated
              </h3>
              <span style={{ padding: '6px 14px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.8rem', fontWeight: 800 }}>
                A4 LANDSCAPE FORMAT ✅
              </span>
            </div>

            {/* Premium Certificate Canvas Component */}
            <div style={{ marginBottom: '24px' }}>
              <OfficialCertificateDocument certificate={certificate} />
            </div>

            {/* External Controls (Outside Document Container) */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button
                onClick={handleDownload}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)' }}
              >
                ⬇️ Download / Print Certificate (PDF)
              </button>
              <button
                onClick={handleTestPermanentLock}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: '#38bdf8', color: '#0f172a', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}
              >
                🔒 Test Permanent Lock
              </button>
            </div>

            {lockTestResult && (
              <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '14px', color: '#f8fafc', fontSize: '0.88rem', fontWeight: 700, textAlign: 'center' }}>
                {lockTestResult}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TestCertDirect;
