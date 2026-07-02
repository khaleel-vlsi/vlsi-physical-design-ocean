import React, { useCallback, useState } from 'react';
import { parseResumeFile } from '../../utils/resumeParser';
import { useNavigate } from 'react-router-dom';
import { createResume } from '../../api/resume';
import { useAuth } from '../../context/AuthContext';

export default function ResumeUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setError(null);
    setIsUploading(true);
    
    try {
      // 1. Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }
      
      // 2. Parse file
      const { parsedSections } = await parseResumeFile(file);
      
      // 3. Create new resume with parsed data
      const newResume = await createResume(user.id, { 
        title: `Imported - ${file.name.split('.')[0]}`,
        source: 'upload'
      });
      
      // 4. Navigate to editor with the new ID
      // (In a real implementation we would save the parsedSections to the new resume here)
      navigate(`/resume/edit/${newResume.id}`);
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to process resume. Please try a different file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rb2-upload-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Upload Existing Resume</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        We'll extract your information to save you time.
      </p>
      
      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginBottom: '1rem', borderRadius: '8px' }}>
          {error}
        </div>
      )}
      
      <div 
        className={`rb2-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
          borderRadius: '12px',
          padding: '4rem 2rem',
          textAlign: 'center',
          background: isDragging ? 'rgba(185, 195, 255, 0.05)' : 'rgba(255,255,255,0.02)',
          transition: 'all 0.3s'
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
        <h3>Drag & Drop your resume here</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Supports PDF and DOCX formats up to 5MB</p>
        
        <input 
          type="file" 
          id="resume-upload" 
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        
        <label htmlFor="resume-upload" className="rb2-btn primary" style={{ display: 'inline-block', cursor: 'pointer' }}>
          {isUploading ? 'Processing...' : 'Browse Files'}
        </label>
      </div>
    </div>
  );
}
