import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isApprovedFreeAdRoute } from '../config/adRoutesConfig';

const isLocalhost = () =>
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname);

const AdUnit = ({ slotId, style, format = "auto", responsive = "true" }) => {
  const adRef = useRef(null);
  const initialized = useRef(false);
  const location = useLocation();
  const { profile, hasPremiumAccess, loading } = useAuth() || {};

  const pathname = location?.pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  const isApproved = isApprovedFreeAdRoute(pathname);

  // 🔒 STRICT MULTI-LAYER ACCESS CONTROL GATEKEEPING:
  // 1. If Route is excluded (e.g. "/", "/dashboard", "/paid-modules/*", "/login"): DO NOT RENDER
  // 2. If Auth state is loading: DO NOT RENDER (prevents flash of ads while resolving session)
  // 3. If User is Admin (profile?.role === 'admin'): DO NOT RENDER (0 ads for admin)
  // 4. If User is Paid Subscriber (hasPremiumAccess || profile?.course_active): DO NOT RENDER
  const canShowAd =
    isApproved && !loading && !hasPremiumAccess && profile?.role !== 'admin' && !profile?.course_active;
  const showPlaceholder = canShowAd && isLocalhost();

  // ONLY FOR guests / free users on public content pages (hooks must run unconditionally)
  useEffect(() => {
    if (!canShowAd || showPlaceholder) return;

    let script = document.getElementById('adsbygoogle-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'adsbygoogle-script';
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3681618856902363";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    if (adRef.current && !initialized.current) {
      initialized.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }
  }, [canShowAd, showPlaceholder]);

  if (!canShowAd) return null;

  // Development-only placeholder (AdSense never serves real ads on localhost)
  if (showPlaceholder) {
    return (
      <div style={{ margin: '32px 0', textAlign: 'center', background: '#f0f0f0', border: '2px dashed #999', padding: '20px', color: '#333', ...style }}>
        <strong>📦 Ad placeholder (dev)</strong> – slot {slotId || 'default'}
      </div>
    );
  }

  return (
    <div style={{ margin: '32px 0', textAlign: 'center', overflow: 'hidden', minHeight: '90px', ...style }}>
      <span style={{ fontSize: '10px', color: '#5f6368', textTransform: 'uppercase', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3681618856902363"
        data-ad-slot={slotId || "4018464181"}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        ref={adRef}
      ></ins>
    </div>
  );
};

export default AdUnit;
