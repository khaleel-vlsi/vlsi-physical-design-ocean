import React, { Suspense } from 'react';

const LazyWrapper = ({ children }) => {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0B0E14',
        color: '#34d399',
        fontSize: '1.2rem',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(52, 211, 153, 0.2)',
          borderTopColor: '#34d399',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        Loading...
      </div>
    }>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
