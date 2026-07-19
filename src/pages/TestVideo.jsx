import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SecureVideoPlayer from '../components/SecureVideoPlayer';

const TestVideo = () => {
  const navigate = useNavigate();
  const { hasPremiumAccess } = useAuth() || {};

  useEffect(() => {
    if (!hasPremiumAccess) {
      navigate('/dashboard');
    }
  }, [hasPremiumAccess, navigate]);

  if (!hasPremiumAccess) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top left, #0f172a, #020617)',
      padding: '4rem 2rem',
      color: '#fff',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          color: '#4ade80',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>Secure Video Player Test</h1>
        
        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }}>
          This is a custom YouTube player. Try to right-click it, double-click it, 
          or find the YouTube logo/share button. You'll notice they are completely blocked by the invisible shield!
        </p>

        {/* Using a sample standard YouTube video ID (Rick Roll or similar safe test video) */}
        {/* We'll use a standard YouTube demo video: "dQw4w9WgXcQ" */}
        <SecureVideoPlayer videoId="dQw4w9WgXcQ" />
        
      </div>
    </div>
  );
};

export default TestVideo;
