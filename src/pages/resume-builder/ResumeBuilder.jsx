import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { listResumes, createResume, deleteResume, duplicateResume } from '../../api/resume';
import '../../styles/resume-builder.css';

export default function ResumeBuilder() {
  const { user, hasPremiumAccess } = useAuth();
  const navigate = useNavigate();
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await listResumes(user.id);
      setResumes(data);
    } catch (err) {
      setError('Failed to load resumes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && hasPremiumAccess) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user, hasPremiumAccess]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    
    try {
      setIsCreating(true);
      const newResume = await createResume(user.id, { title: newTitle });
      setShowCreateModal(false);
      setNewTitle('');
      navigate(`/resume/edit/${newResume.id}`);
    } catch (err) {
      if (err.message === 'LimitReached') {
        setError('You have reached the maximum limit of 10 resumes. Please delete an old resume to create a new one.');
      } else {
        setError('Failed to create resume.');
      }
      setShowCreateModal(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume? This cannot be undone.')) return;
    
    try {
      await deleteResume(id, user.id);
      setResumes(resumes.filter(r => r.id !== id));
    } catch (err) {
      alert('Failed to delete resume.');
      console.error(err);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const duplicated = await duplicateResume(user.id, id);
      setResumes([duplicated, ...resumes]);
    } catch (err) {
      if (err.message === 'LimitReached') {
        alert('You have reached the maximum limit of 10 resumes.');
      } else {
        alert('Failed to duplicate resume.');
      }
      console.error(err);
    }
  };

  if (!hasPremiumAccess) {
    return (
      <div className="rb-access-denied" style={{ paddingTop: '100px', minHeight: '100vh', background: '#0a0f1e' }}>
        <span className="rb-lock-icon" style={{ fontSize: '48px', display: 'block', textAlign: 'center' }}>🔒</span>
        <h2 style={{ textAlign: 'center', color: '#fff' }}>Premium Feature</h2>
        <p style={{ textAlign: 'center', color: '#9ca3af' }}>Upgrade to premium to access the AI Resume Builder.</p>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn-cta" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rb2-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="rb2-loader"></div>
      </div>
    );
  }

  const limitPercentage = (resumes.length / 10) * 100;

  return (
    <div className="rb2-container">
      <div className="rb2-wrapper">
        <div className="rb2-dashboard-header">
          <div>
            <h1>My Resumes</h1>
            <div className="rb2-limit-bar-container">
              {resumes.length} of 10 resumes used
              <div className="rb2-limit-bar">
                <div 
                  className="rb2-limit-fill" 
                  style={{ width: `${limitPercentage}%`, background: limitPercentage >= 100 ? '#ef4444' : 'var(--secondary)' }}
                ></div>
              </div>
            </div>
          </div>
          
          <button 
            className="rb2-create-btn" 
            onClick={() => setShowCreateModal(true)}
            disabled={resumes.length >= 10}
            style={{ opacity: resumes.length >= 10 ? 0.5 : 1, cursor: resumes.length >= 10 ? 'not-allowed' : 'pointer' }}
          >
            <span>+</span> Create New Resume
          </button>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#fca5a5', marginBottom: '2rem' }}>
            {error}
            <button onClick={() => setError(null)} style={{ float: 'right', background: 'transparent', border: 'none', color: '#fca5a5', cursor: 'pointer' }}>✕</button>
          </div>
        )}

        {resumes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface-card)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📄</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No resumes yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Create your first professional AI-powered resume.</p>
            <button className="rb2-create-btn" style={{ margin: '0 auto' }} onClick={() => setShowCreateModal(true)}>
              Create Resume
            </button>
          </div>
        ) : (
          <div className="rb2-grid">
            {resumes.map(resume => (
              <div key={resume.id} className="rb2-resume-card">
                <h3 className="rb2-card-title">{resume.title}</h3>
                <div className="rb2-card-meta">
                  Last edited: {new Date(resume.updated_at).toLocaleDateString()}
                </div>
                
                <div className="rb2-card-ats">
                  <span>ATS Score:</span>
                  <span className="rb2-ats-score">{resume.ats_score || 'N/A'}</span>
                </div>
                
                <div className="rb2-card-actions">
                  <button className="rb2-btn primary" onClick={() => navigate(`/resume/edit/${resume.id}`)}>Edit</button>
                  <button className="rb2-btn" onClick={() => handleDuplicate(resume.id)}>Duplicate</button>
                  <button className="rb2-btn danger" onClick={() => handleDelete(resume.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="rb2-modal-overlay">
          <div className="rb2-modal">
            <h2>Create New Resume</h2>
            <form onSubmit={handleCreate}>
              <div className="rb2-form-group">
                <label>Resume Title (e.g., "Physical Design - Google")</label>
                <input 
                  type="text" 
                  className="rb2-input" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter resume title"
                  autoFocus
                  required
                />
              </div>
              <div className="rb2-modal-actions">
                <button type="button" className="rb2-btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                <button type="submit" className="rb2-btn primary" disabled={isCreating || !newTitle.trim()}>
                  {isCreating ? <span className="rb2-loader" style={{ width: '15px', height: '15px', borderWidth: '2px' }}></span> : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
