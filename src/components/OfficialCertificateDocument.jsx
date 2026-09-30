import React from 'react';

/**
 * Premium Official Industry Certification Document
 * Fits exactly on ONE A4 Landscape page when printed or exported to PDF.
 * Left Authorized Signatory: Sk.Md.Khaleel (Transparent Signature Image)
 */
const OfficialCertificateDocument = ({ certificate }) => {
  if (!certificate) return null;

  const issueDateFormatted = certificate.issue_date
    ? new Date(certificate.issue_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  const scoreText = `${certificate.score_obtained || 160} / ${certificate.total_score || 200} (${certificate.percentage || 80}%)`;
  const verifyUrl = certificate.verification_url || `https://vlsiphysicaldesignocean.com/certificate/verify/${certificate.certificate_id}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Inter:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

        @media print {
          body * {
            visibility: hidden !important;
          }
          #official-certificate-document, #official-certificate-document * {
            visibility: visible !important;
          }
          #official-certificate-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          @page {
            size: A4 landscape;
            margin: 0;
          }
        }
      `}</style>

      <div
        id="official-certificate-document"
        style={{
          width: '100%',
          maxWidth: '1020px',
          aspectRatio: '1.414 / 1', // A4 Landscape ratio (297mm x 210mm)
          margin: '0 auto',
          background: '#fffdfa', // Warm Ivory Paper Background
          color: '#0b192c',
          position: 'relative',
          padding: '44px 54px',
          boxSizing: 'border-box',
          fontFamily: "'Inter', sans-serif",
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between'
        }}
      >
        {/* Subtle Semiconductor / IC / Circuit Trace Background Pattern Around Edges */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.04,
            pointerEvents: 'none'
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern id="icPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 0 50 L 30 50 L 40 20 L 70 20 L 80 80 L 100 80" fill="none" stroke="#0b192c" strokeWidth="1.5" />
              <path d="M 50 0 L 50 30 L 20 40 L 20 70 L 80 80 L 80 100" fill="none" stroke="#b45309" strokeWidth="1.5" />
              <circle cx="40" cy="20" r="3.5" fill="#0b192c" />
              <circle cx="80" cy="80" r="3.5" fill="#b45309" />
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="#0b192c" strokeWidth="1" strokeDasharray="4,4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#icPattern)" />
        </svg>

        {/* Double Ornamental Gold & Navy Border Frame */}
        <div
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            bottom: '16px',
            border: '3px solid #0b192c',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '22px',
            left: '22px',
            right: '22px',
            bottom: '22px',
            border: '1.5px solid #d97706', // Elegant Gold Accent Border
            pointerEvents: 'none'
          }}
        />

        {/* Corner Geometric VLSI Accents */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '24px', height: '24px', borderTop: '4px solid #d97706', borderLeft: '4px solid #d97706' }} />
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', borderTop: '4px solid #d97706', borderRight: '4px solid #d97706' }} />
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '24px', height: '24px', borderBottom: '4px solid #d97706', borderLeft: '4px solid #d97706' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '24px', height: '24px', borderBottom: '4px solid #d97706', borderRight: '4px solid #d97706' }} />

        {/* Main Content Area */}
        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
          
          {/* Header Branding */}
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '4px' }}>
              VLSI PHYSICAL DESIGN OCEAN
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0b192c', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'Cinzel', 'Playfair Display', serif" }}>
              CERTIFICATE OF MASTERY
            </div>
            <div style={{ height: '3px', width: '140px', background: 'linear-gradient(90deg, transparent 0%, #d97706 50%, transparent 100%)', margin: '8px auto 12px auto' }} />
            <p style={{ color: '#475569', fontSize: '0.86rem', fontStyle: 'italic', margin: '0 auto', maxWidth: '720px', lineHeight: '1.4' }}>
              This certificate is proudly presented in recognition of successfully demonstrating advanced proficiency in VLSI Physical Design.
            </p>
          </div>

          {/* Candidate Name (Visual Centerpiece) */}
          <div style={{ margin: '10px 0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '6px' }}>
              PROUDLY PRESENTED TO
            </div>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#0b192c', margin: '0 0 6px 0', fontFamily: "'Playfair Display', serif", letterSpacing: '0.5px' }}>
              {certificate.full_name || 'Priyanka Kompelli'}
            </h2>
            <div style={{ height: '1.5px', width: '360px', background: '#cbd5e1', margin: '0 auto' }} />
          </div>

          {/* Achievement Statement */}
          <p style={{ color: '#334155', fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '820px', margin: '0 auto 10px auto' }}>
            This certificate recognizes the successful completion of the <strong>VLSI Physical Design Mastery Certification Examination</strong> and demonstrates advanced knowledge across Static Timing Analysis (STA), Place &amp; Route (PNR), Logic Synthesis, CTS, and VLSI Physical Design fundamentals.
          </p>

          {/* Elegant Horizontal Information Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '12px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '12px 16px',
            maxWidth: '860px',
            margin: '0 auto 14px auto',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>COURSE</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0b192c', marginTop: '2px' }}>{certificate.course_name || 'VLSI Physical Design Mastery'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>SCORE</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#047857', marginTop: '2px' }}>{scoreText}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>ISSUE DATE</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0b192c', marginTop: '2px' }}>{issueDateFormatted}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.66rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px' }}>CERTIFICATE ID</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284c7', fontFamily: 'monospace', marginTop: '2px' }}>{certificate.certificate_id}</div>
            </div>
          </div>

          {/* Signatures & Authenticity Section (Balanced 3-Column Layout) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '4px', padding: '0 16px' }}>
            
            {/* LEFT COLUMN: Authorized Signatory - Sk.Md.Khaleel (Transparent Signature Image) */}
            <div style={{ textAlign: 'center', width: '210px', height: '95px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ borderBottom: '1px solid #94a3b8', paddingBottom: '4px', marginBottom: '4px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/assets/signatures/khaleel_signature.svg"
                  alt="Sk.Md.Khaleel Signature"
                  style={{
                    maxWidth: '140px',
                    maxHeight: '40px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                    background: 'transparent',
                    mixBlendMode: 'multiply'
                  }}
                  onError={(e) => {
                    // Fallback to vector inline SVG if file fetch is interrupted
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0b192c', margin: '0' }}>Sk.Md.Khaleel</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284c7', margin: '1px 0' }}>Authorized Signatory</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b', margin: '0' }}>VLSI Physical Design Ocean</div>
            </div>

            {/* CENTER COLUMN: Authenticity Seal & QR Verification */}
            <div style={{ textAlign: 'center', display: 'flex', gap: '20px', alignItems: 'center' }}>
              
              {/* Authenticity Seal */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  border: '2.5px double #d97706',
                  background: '#fffbeb',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 4px auto',
                  boxShadow: '0 3px 10px rgba(217, 119, 6, 0.2)'
                }}>
                  <span style={{ fontSize: '1.1rem' }}>🏅</span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#047857', letterSpacing: '0.5px' }}>AUTHENTIC CREDENTIAL</div>
                <div style={{ fontSize: '0.58rem', color: '#64748b' }}>Verified &amp; Trusted</div>
              </div>

              {/* Dynamic QR Verification Area */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ padding: '4px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', display: 'inline-block' }}>
                  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="46" height="46" fill="white" />
                    {/* Outer corner squares */}
                    <rect x="2" y="2" width="14" height="14" fill="#0b192c" />
                    <rect x="4" y="4" width="10" height="10" fill="white" />
                    <rect x="6" y="6" width="6" height="6" fill="#0b192c" />

                    <rect x="30" y="2" width="14" height="14" fill="#0b192c" />
                    <rect x="32" y="4" width="10" height="10" fill="white" />
                    <rect x="34" y="6" width="6" height="6" fill="#0b192c" />

                    <rect x="2" y="30" width="14" height="14" fill="#0b192c" />
                    <rect x="4" y="32" width="10" height="10" fill="white" />
                    <rect x="6" y="34" width="6" height="6" fill="#0b192c" />

                    {/* Data pixels */}
                    <rect x="18" y="4" width="4" height="4" fill="#0b192c" />
                    <rect x="24" y="8" width="4" height="4" fill="#0b192c" />
                    <rect x="18" y="14" width="4" height="4" fill="#0b192c" />
                    <rect x="8" y="18" width="4" height="4" fill="#0b192c" />
                    <rect x="14" y="18" width="4" height="4" fill="#0b192c" />
                    <rect x="20" y="20" width="6" height="6" fill="#d97706" />
                    <rect x="28" y="18" width="4" height="4" fill="#0b192c" />
                    <rect x="34" y="18" width="4" height="4" fill="#0b192c" />
                    <rect x="18" y="26" width="4" height="4" fill="#0b192c" />
                    <rect x="24" y="26" width="4" height="4" fill="#0b192c" />
                    <rect x="30" y="26" width="4" height="4" fill="#0b192c" />
                    <rect x="38" y="30" width="4" height="4" fill="#0b192c" />
                    <rect x="18" y="34" width="4" height="4" fill="#0b192c" />
                    <rect x="26" y="38" width="4" height="4" fill="#0b192c" />
                    <rect x="34" y="38" width="4" height="4" fill="#0b192c" />
                  </svg>
                </div>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#0284c7', marginTop: '2px' }}>SCAN TO VERIFY</div>
              </div>

            </div>

            {/* RIGHT COLUMN: Certification Authority - Academic Board */}
            <div style={{ textAlign: 'center', width: '210px', height: '95px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ borderBottom: '1px solid #94a3b8', paddingBottom: '4px', marginBottom: '4px', height: '45px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 700, fontStyle: 'italic', color: '#0b192c' }}>
                  Academic Board
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0b192c', margin: '0' }}>Academic Board</div>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284c7', margin: '1px 0' }}>Certification Authority</div>
              <div style={{ fontSize: '0.62rem', color: '#64748b', margin: '0' }}>VLSI Physical Design Ocean</div>
            </div>

          </div>

          {/* Security Verification Text Footer */}
          <div style={{ marginTop: '10px', fontSize: '0.64rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
            Certificate authenticity can be verified using the unique Certificate ID at: <strong>{verifyUrl}</strong>
          </div>

        </div>
      </div>
    </>
  );
};

export default OfficialCertificateDocument;
