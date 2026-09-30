import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCertificationStatus } from '../services/certificationService';
import { CERTIFICATION_CONFIG } from '../data/certificationConfig';

const CertificationDashboardCard = ({ onUpgradeClick }) => {
  const navigate = useNavigate();
  const { user, profile, hasPremiumAccess } = useAuth();
  const [certStatus, setCertStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadStatus() {
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
    loadStatus();
    return () => { isMounted = false; };
  }, [user, profile]);

  if (loading) {
    return (
      <div style={{
        margin: '24px 0',
        padding: '24px',
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '20px',
        color: '#cbd5e1',
        textAlign: 'center'
      }}>
        <p>Loading Certification Status...</p>
      </div>
    );
  }

  const isPassed = certStatus?.isPassed || certStatus?.certificateIssued;
  const activePlanName = profile?.active_plan || 'Standard Subscription';
  const remaining = certStatus?.attemptsRemaining ?? 1;
  const maxAttempts = certStatus?.maxAttempts ?? 1;
  const attemptsUsed = certStatus?.attemptsUsed ?? 0;

  return (
    <div style={{
      margin: '28px 0',
      padding: '28px 24px',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.4)',
      borderRadius: '24px',
      boxShadow: '0 12px 35px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      backdropFilter: 'blur(16px)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Gradient Pill */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            🏆 Official Online Examination
          </div>
          <h2 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.3px' }}>
            VLSI Physical Design Ocean Certification
          </h2>
          <p style={{ margin: '6px 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
            Proctored 200-mark assessment covering STA, PnR, Synthesis, Scripting &amp; Signoff.
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {isPassed ? (
            <span style={{ padding: '8px 16px', borderRadius: '9999px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
              🎉 CERTIFICATE ISSUED
            </span>
          ) : !hasPremiumAccess ? (
            <span style={{ padding: '8px 16px', borderRadius: '9999px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', fontWeight: 800, fontSize: '0.85rem' }}>
              🔒 PREMIUM REQUIRED
            </span>
          ) : remaining === 0 ? (
            <span style={{ padding: '8px 16px', borderRadius: '9999px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', fontWeight: 800, fontSize: '0.85rem' }}>
              ❌ ATTEMPTS EXHAUSTED
            </span>
          ) : (
            <span style={{ padding: '8px 16px', borderRadius: '9999px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem' }}>
              READY TO ATTEMPT
            </span>
          )}
        </div>
      </div>

      {/* Exam Specs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', margin: '20px 0' }}>
        <div style={{ padding: '12px 14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>TOTAL MARKS</div>
          <div style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>200 Marks</div>
        </div>

        <div style={{ padding: '12px 14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>PASS MARK</div>
          <div style={{ color: '#10b981', fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>160 / 200 (80%)</div>
        </div>

        <div style={{ padding: '12px 14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>EXAM DURATION</div>
          <div style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>90 Minutes</div>
        </div>

        <div style={{ padding: '12px 14px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700 }}>ATTEMPTS REMAINING</div>
          <div style={{ color: isPassed ? '#10b981' : remaining > 0 ? '#38bdf8' : '#f87171', fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>
            {isPassed ? '0 (Completed)' : `${remaining} of ${maxAttempts}`}
          </div>
        </div>
      </div>

      {/* Plan Details & Status Message */}
      {hasPremiumAccess && (
        <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span>Active Plan: <strong style={{ color: '#f8fafc' }}>{activePlanName}</strong></span>
          <span>Attempts Used: <strong style={{ color: '#f8fafc' }}>{attemptsUsed} / {maxAttempts}</strong></span>
          {isPassed && certStatus?.certificate && (
            <span style={{ color: '#10b981', fontWeight: 'bold' }}>
              Certificate ID: {certStatus.certificate.certificate_id}
            </span>
          )}
        </div>
      )}

      {/* Action Footer Button */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        {isPassed ? (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%' }}>
            <button
              onClick={() => {
                const certId = certStatus?.certificate?.certificate_id;
                if (certId) navigate(`/certificate/verify/${certId}`);
              }}
              style={{
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              🎓 View Issued Certificate
            </button>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', alignSelf: 'center', fontStyle: 'italic' }}>
              🔒 Certification passed. All remaining attempts permanently locked.
            </div>
          </div>
        ) : !hasPremiumAccess ? (
          <button
            onClick={() => onUpgradeClick ? onUpgradeClick() : navigate('/paid-modules')}
            style={{
              padding: '12px 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
            }}
          >
            🔒 Unlock Certification Access
          </button>
        ) : remaining <= 0 ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onUpgradeClick ? onUpgradeClick() : navigate('/dashboard')}
              style={{
                padding: '12px 28px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              ⚡ Extend Plan to Gain Attempts
            </button>
            <span style={{ color: '#f87171', fontSize: '0.85rem' }}>
              Used all {maxAttempts} attempt(s) for your current plan.
            </span>
          </div>
        ) : (
          <button
            onClick={() => navigate('/certification')}
            style={{
              padding: '14px 32px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 25px rgba(56, 189, 248, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            🚀 START CERTIFICATION EXAM
          </button>
        )}
      </div>
    </div>
  );
};

export default CertificationDashboardCard;
