import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyCertificatePublic } from '../services/certificationService';
import SEO from '../components/SEO';
import OfficialCertificateDocument from '../components/OfficialCertificateDocument';

const CertificateVerify = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function checkCert() {
      if (!certificateId) {
        setLoading(false);
        return;
      }
      try {
        const data = await verifyCertificatePublic(certificateId);
        if (isMounted) {
          setCert(data);
        }
      } catch (err) {
        console.warn('Error verifying certificate:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkCert();
    return () => { isMounted = false; };
  }, [certificateId]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
        <h2>Verifying Certificate Credentials...</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1040px', margin: '40px auto', padding: '0 20px 60px 20px' }}>
      <SEO 
        title={`Certificate Verification — ${certificateId || 'VLSI Physical Design Ocean'}`} 
        description="Public verification portal for VLSI Physical Design Ocean certificates." 
      />

      <div style={{
        padding: '36px 32px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        border: `1px solid ${cert ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
        borderRadius: '28px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(16px)'
      }}>
        
        {/* Verification Status Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>
            {cert ? '🛡️' : '❌'}
          </div>

          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: '9999px',
            background: cert ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${cert ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            color: cert ? '#10b981' : '#f87171',
            fontWeight: 800,
            fontSize: '0.85rem',
            textTransform: 'uppercase'
          }}>
            {cert ? 'OFFICIAL CERTIFICATE VALIDATED ✅' : 'INVALID CERTIFICATE ID ❌'}
          </span>

          <h1 style={{ color: '#f8fafc', fontSize: '1.6rem', fontWeight: 800, margin: '16px 0 6px 0' }}>
            VLSI Physical Design Ocean
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Public Credential Verification Portal
          </p>
        </div>

        {cert ? (
          <div>
            {/* Render Standalone Premium Certificate Canvas */}
            <div style={{ marginBottom: '24px' }}>
              <OfficialCertificateDocument certificate={cert} />
            </div>

            {/* External Controls */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(15, 23, 42, 0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button
                onClick={() => window.print()}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)' }}
              >
                ⬇️ Download / Print Official Certificate (PDF)
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                style={{ padding: '14px 28px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
              >
                Return to Dashboard
              </button>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>
              🔒 This credential has been cryptographically verified against the VLSI Physical Design Ocean registry.
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#cbd5e1', padding: '20px' }}>
            <p>The requested Certificate ID (<strong style={{ color: '#f87171' }}>{certificateId}</strong>) could not be verified in our official registry.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{ marginTop: '12px', padding: '10px 24px', borderRadius: '9999px', background: '#38bdf8', color: '#0f172a', border: 'none', fontWeight: '800', cursor: 'pointer' }}
            >
              Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CertificateVerify;
