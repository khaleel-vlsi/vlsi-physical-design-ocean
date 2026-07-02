import React, { useEffect, useRef } from 'react';

const AdUnit = ({ slotId }) => {
  const adRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Dynamically inject the AdSense script if it doesn't exist
    let script = document.getElementById('adsbygoogle-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'adsbygoogle-script';
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3681618856902363";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Only push once per component mount to prevent AdSense errors in React
    if (adRef.current && !initialized.current) {
      initialized.current = true;
      try {
        // Wait for the script to load before pushing
        script.addEventListener('load', () => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
        
        // If it's already loaded, just push
        if (window.adsbygoogle) {
           (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
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
        data-ad-client="ca-pub-3681618856902363"
        data-ad-slot={slotId || "4018464181"}
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      ></ins>
    </div>
  );
};

export default AdUnit;
