import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResumeByToken } from '../../api/resume';
import ResumePreview from './ResumePreview';
import '../../styles/resume-builder.css';

export default function PublicResume() {
  const { token } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getResumeByToken(token);
        if (!data) {
          setError("Resume not found or is no longer public.");
          return;
        }
        setResumeData(data);
      } catch (err) {
        console.error(err);
        setError("Resume not found or is no longer public.");
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [token]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0f1e' }}>
        <div className="rb2-loader"></div>
      </div>
    );
  }

  if (error || !resumeData) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#fff', background: '#0a0f1e', minHeight: '100vh' }}>
        <h2>{error || 'Error'}</h2>
        <Link to="/" style={{ color: '#3b82f6', textDecoration: 'none', marginTop: '2rem', display: 'inline-block' }}>
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#111827', margin: 0 }}>{resumeData.title || 'Resume'}</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Shared via VLSI Physical Design Ocean</p>
        </div>
        <div>
          {/* Hide download for now or could implement public PDF generation */}
        </div>
      </div>
      
      {/* Reusing the Preview component for full width viewing */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ResumePreview data={resumeData.sections} templateId={resumeData.template_id || 'professional'} />
      </div>
    </div>
  );
}
