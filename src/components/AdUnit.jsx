import React, { useEffect, useRef } from 'react';

const AdUnit = ({ slotId }) => {
  const adRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only push once per component mount to prevent AdSense errors in React
    if (adRef.current && !initialized.current) {
      initialized.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, []);

  return (
    <div style={{ margin: '32px 0', textAlign: 'center', overflow: 'hidden' }}>
      <p style={{ fontSize: '10px', color: '#5f6368', textTransform: 'uppercase', marginBottom: '4px' }}>Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8693316833430105"
        data-ad-slot={slotId || "4018464181"}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      ></ins>
    </div>
  );
};

export default AdUnit;
