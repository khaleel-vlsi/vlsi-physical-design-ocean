import React, { useState, useEffect } from 'react';
import * as aiService from '../../../api/aiService';
import { saveResumeVersion, listResumeVersions, getResumeVersion } from '../../../api/resume';

// Common panel wrapper
export const SectionPanel = ({ title, children, onAiGenerate, isGenerating }) => (
  <div className="rb2-section-panel" style={{ marginBottom: '2rem' }}>
    <div className="rb2-section-header">
      <h2>{title}</h2>
      {onAiGenerate && (
        <button type="button" className="rb2-ai-btn" onClick={onAiGenerate} disabled={isGenerating}>
          {isGenerating ? '✨ Generating...' : '✨ Generate with AI'}
        </button>
      )}
    </div>
    <div className="rb2-section-content">
      {children}
    </div>
  </div>
);

export const PersonalInfoSection = ({ data, onChange }) => {
  const updateField = (field, value) => onChange({ ...data, [field]: value });
  return (
    <SectionPanel title="Personal Details">
      <div className="rb2-form-group">
        <label htmlFor="personal-name">Full Name</label>
        <input id="personal-name" aria-label="Full Name" type="text" className="rb2-input" value={data.name || ''} onChange={(e) => updateField('name', e.target.value)} />
      </div>
      <div className="rb2-form-row">
        <div className="rb2-form-group">
          <label htmlFor="personal-email">Email</label>
          <input id="personal-email" aria-label="Email" type="email" className="rb2-input" value={data.email || ''} onChange={(e) => updateField('email', e.target.value)} />
        </div>
        <div className="rb2-form-group">
          <label htmlFor="personal-phone">Phone</label>
          <input id="personal-phone" aria-label="Phone" type="tel" className="rb2-input" value={data.phone || ''} onChange={(e) => updateField('phone', e.target.value)} />
        </div>
      </div>
      <div className="rb2-form-row">
        <div className="rb2-form-group">
          <label htmlFor="personal-location">Location</label>
          <input id="personal-location" aria-label="Location" type="text" className="rb2-input" value={data.location || ''} onChange={(e) => updateField('location', e.target.value)} />
        </div>
        <div className="rb2-form-group">
          <label htmlFor="personal-linkedin">LinkedIn URL</label>
          <input id="personal-linkedin" aria-label="LinkedIn URL" type="url" className="rb2-input" value={data.linkedin || ''} onChange={(e) => updateField('linkedin', e.target.value)} />
        </div>
      </div>
    </SectionPanel>
  );
};

export const CareerObjectiveSection = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Pass general VLSI params for now
      const generated = await aiService.generateObjective('VLSI Engineering', 'Mid-Level', ['Physical Design', 'STA']);
      onChange({ ...data, objective: generated });
    } catch (e) {
      console.error(e);
      alert('Failed to generate AI objective');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SectionPanel 
      title="Career Objective" 
      onAiGenerate={handleGenerate}
      isGenerating={isGenerating}
    >
      <div className="rb2-form-group">
        <textarea 
          className="rb2-textarea" 
          value={data.objective || ''} 
          onChange={(e) => onChange({...data, objective: e.target.value})}
          placeholder="Enter your career objective..."
        />
      </div>
    </SectionPanel>
  );
};

export const ExperienceSection = ({ data, onChange }) => {
  const items = data.items || [];
  const [generatingId, setGeneratingId] = useState(null);
  
  const addItem = () => {
    onChange({ ...data, items: [...items, { id: Date.now(), company: '', role: '', description: '' }] });
  };
  
  const updateItem = (id, field, value) => {
    onChange({ ...data, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };
  
  const removeItem = (id) => {
    onChange({ ...data, items: items.filter(item => item.id !== id) });
  };
  
  const handleEnhance = async (id, currentText) => {
    if (!currentText) return;
    setGeneratingId(id);
    try {
      const enhanced = await aiService.enhanceExperience(currentText, 'VLSI Engineering');
      updateItem(id, 'description', enhanced);
    } catch (e) {
      console.error(e);
      alert('Failed to enhance text');
    } finally {
      setGeneratingId(null);
    }
  };
  
  return (
    <SectionPanel title="Work Experience">
      {items.map((item, index) => (
        <div key={item.id} className="rb2-item-card">
          <div className="rb2-item-header">
            <h3>Experience #{index + 1}</h3>
            <button className="rb2-item-remove" onClick={() => removeItem(item.id)}>✕</button>
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Company</label>
              <input type="text" className="rb2-input" value={item.company || ''} onChange={(e) => updateItem(item.id, 'company', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Role</label>
              <input type="text" className="rb2-input" value={item.role || ''} onChange={(e) => updateItem(item.id, 'role', e.target.value)} />
            </div>
          </div>
          <div className="rb2-form-group">
            <label>Description</label>
            <textarea className="rb2-textarea" value={item.description || ''} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
            <div style={{ marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="rb2-ai-btn" 
                onClick={() => handleEnhance(item.id, item.description)}
                disabled={generatingId === item.id || !item.description}
              >
                {generatingId === item.id ? '✨ Enhancing...' : '✨ Enhance with AI'}
              </button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="rb2-add-btn" onClick={addItem}>+ Add Experience</button>
    </SectionPanel>
  );
};

export const EducationSection = ({ data, onChange }) => {
  const items = data.items || [];
  
  const addItem = () => {
    onChange({ ...data, items: [...items, { id: Date.now(), institution: '', degree: '', year: '' }] });
  };
  
  const updateItem = (id, field, value) => {
    onChange({ ...data, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };
  
  const removeItem = (id) => {
    onChange({ ...data, items: items.filter(item => item.id !== id) });
  };
  
  return (
    <SectionPanel title="Education">
      {items.map((item, index) => (
        <div key={item.id} className="rb2-item-card">
          <div className="rb2-item-header">
            <h3>Education #{index + 1}</h3>
            <button className="rb2-item-remove" onClick={() => removeItem(item.id)}>✕</button>
          </div>
          <div className="rb2-form-group">
            <label>Institution</label>
            <input type="text" className="rb2-input" value={item.institution || ''} onChange={(e) => updateItem(item.id, 'institution', e.target.value)} />
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Degree</label>
              <input type="text" className="rb2-input" value={item.degree || ''} onChange={(e) => updateItem(item.id, 'degree', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Graduation Year</label>
              <input type="text" className="rb2-input" value={item.year || ''} onChange={(e) => updateItem(item.id, 'year', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="rb2-add-btn" onClick={addItem}>+ Add Education</button>
    </SectionPanel>
  );
};

export const ProjectsSection = ({ data, onChange }) => {
  const items = data?.items || [];
  const [generatingId, setGeneratingId] = useState(null);
  
  const addItem = () => {
    onChange({ ...data, items: [...items, { id: Date.now(), title: '', role: '', description: '', tools: '' }] });
  };
  
  const updateItem = (id, field, value) => {
    onChange({ ...data, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };
  
  const removeItem = (id) => {
    onChange({ ...data, items: items.filter(item => item.id !== id) });
  };

  const handleEnhance = async (id, description, tools) => {
    setGeneratingId(id);
    try {
      const enhanced = await aiService.enhanceProject(description, tools ? tools.split(',') : []);
      updateItem(id, 'description', enhanced);
    } catch (e) {
      console.error(e);
      alert('Failed to enhance project with AI');
    } finally {
      setGeneratingId(null);
    }
  };
  
  return (
    <SectionPanel title="Projects">
      {items.map((item, index) => (
        <div key={item.id} className="rb2-item-card">
          <div className="rb2-item-header">
            <h3>Project #{index + 1}</h3>
            <button className="rb2-item-remove" onClick={() => removeItem(item.id)}>✕</button>
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Project Title (e.g., 7nm CPU Block Implementation)</label>
              <input type="text" className="rb2-input" value={item.title || ''} onChange={(e) => updateItem(item.id, 'title', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Your Role (Optional)</label>
              <input type="text" className="rb2-input" value={item.role || ''} onChange={(e) => updateItem(item.id, 'role', e.target.value)} />
            </div>
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Technology Node</label>
              <input type="text" className="rb2-input" placeholder="e.g., 7nm, 5nm" value={item.techNode || ''} onChange={(e) => updateItem(item.id, 'techNode', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Instance Count</label>
              <input type="text" className="rb2-input" placeholder="e.g., 2M" value={item.instanceCount || ''} onChange={(e) => updateItem(item.id, 'instanceCount', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Number of Macros</label>
              <input type="text" className="rb2-input" placeholder="e.g., 50+" value={item.macroCount || ''} onChange={(e) => updateItem(item.id, 'macroCount', e.target.value)} />
            </div>
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Operating Frequency</label>
              <input type="text" className="rb2-input" placeholder="e.g., 1.5GHz" value={item.frequency || ''} onChange={(e) => updateItem(item.id, 'frequency', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Number of Clocks</label>
              <input type="text" className="rb2-input" placeholder="e.g., 5" value={item.clockCount || ''} onChange={(e) => updateItem(item.id, 'clockCount', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Metal Layers</label>
              <input type="text" className="rb2-input" placeholder="e.g., 9M" value={item.metalLayers || ''} onChange={(e) => updateItem(item.id, 'metalLayers', e.target.value)} />
            </div>
          </div>
          <div className="rb2-form-group">
            <label>Tools Used</label>
            <input type="text" className="rb2-input" placeholder="e.g., Innovus, PrimeTime, Calibre" value={item.tools || ''} onChange={(e) => updateItem(item.id, 'tools', e.target.value)} />
          </div>
          <div className="rb2-form-group">
            <label>Challenges Faced</label>
            <textarea className="rb2-textarea" style={{ minHeight: '60px' }} placeholder="e.g., High congestion, tight setup timing..." value={item.challenges || ''} onChange={(e) => updateItem(item.id, 'challenges', e.target.value)} />
          </div>
          <div className="rb2-form-group">
            <label>Project Details / Responsibilities</label>
            <textarea className="rb2-textarea" value={item.description || ''} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
            <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
              <button 
                type="button" 
                className="rb2-ai-btn" 
                onClick={() => handleEnhance(item.id, item.description, item.tools)}
                disabled={generatingId === item.id || !item.description}
              >
                {generatingId === item.id ? '✨ Enhancing...' : '✨ Enhance with AI'}
              </button>
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="rb2-add-btn" onClick={addItem}>+ Add Project</button>
    </SectionPanel>
  );
};

export const TechnicalSkillsSection = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSkillsChange = (e) => {
    // Basic comma separated text for now, could be enhanced to tags
    const value = e.target.value;
    onChange({ ...data, text: value });
  };
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await aiService.suggestSkills('Physical Design', 'Mid-Level');
      // Append if skills already exist, otherwise replace
      const newText = data.text ? `${data.text}, ${generated}` : generated;
      onChange({ ...data, text: newText });
    } catch (e) {
      console.error(e);
      alert('Failed to generate AI skills');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SectionPanel 
      title="Technical Skills" 
      onAiGenerate={handleGenerate}
      isGenerating={isGenerating}
    >
      <div className="rb2-form-group">
        <label>List your skills (comma separated)</label>
        <textarea 
          className="rb2-textarea" 
          value={data.text || ''} 
          onChange={handleSkillsChange}
          placeholder="e.g., Physical Design, Innovus, PrimeTime, TCL, Python..."
        />
      </div>
    </SectionPanel>
  );
};

export const TrainingSection = ({ data, onChange }) => {
  const items = data?.items || [];
  
  const addItem = () => {
    onChange({ ...data, items: [...items, { id: Date.now(), title: '', institution: '', duration: '' }] });
  };
  
  const updateItem = (id, field, value) => {
    onChange({ ...data, items: items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };
  
  const removeItem = (id) => {
    onChange({ ...data, items: items.filter(item => item.id !== id) });
  };
  
  return (
    <SectionPanel title="Professional Training">
      {items.map((item, index) => (
        <div key={item.id} className="rb2-item-card">
          <div className="rb2-item-header">
            <h3>Training #{index + 1}</h3>
            <button className="rb2-item-remove" onClick={() => removeItem(item.id)}>✕</button>
          </div>
          <div className="rb2-form-group">
            <label>Training Title (e.g., 6 months VLSI Physical design)</label>
            <input type="text" className="rb2-input" value={item.title || ''} onChange={(e) => updateItem(item.id, 'title', e.target.value)} />
          </div>
          <div className="rb2-form-row">
            <div className="rb2-form-group">
              <label>Institution/Company</label>
              <input type="text" className="rb2-input" value={item.institution || ''} onChange={(e) => updateItem(item.id, 'institution', e.target.value)} />
            </div>
            <div className="rb2-form-group">
              <label>Duration</label>
              <input type="text" className="rb2-input" placeholder="e.g., 6 months" value={item.duration || ''} onChange={(e) => updateItem(item.id, 'duration', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
      <button type="button" className="rb2-add-btn" onClick={addItem}>+ Add Training</button>
    </SectionPanel>
  );
};

export const DeclarationSection = ({ data, onChange }) => {
  return (
    <SectionPanel title="Declaration">
      <div className="rb2-form-group">
        <label>Declaration Statement</label>
        <textarea 
          className="rb2-textarea" 
          value={data?.text || 'I do hereby declare that the above particulars of facts and information stated are true, correct, and complete to the best of my belief and knowledge.'} 
          onChange={(e) => onChange({ ...data, text: e.target.value })}
        />
      </div>
      <div className="rb2-form-row">
        <div className="rb2-form-group">
          <label>Place</label>
          <input type="text" className="rb2-input" placeholder="e.g., Hyderabad" value={data?.place || ''} onChange={(e) => onChange({ ...data, place: e.target.value })} />
        </div>
        <div className="rb2-form-group">
          <label>Date</label>
          <input type="text" className="rb2-input" placeholder="e.g., 12 December, 2022" value={data?.date || ''} onChange={(e) => onChange({ ...data, date: e.target.value })} />
        </div>
      </div>
    </SectionPanel>
  );
};

export const AdvancedSettingsSection = ({ resume, onUpdate }) => {
  const [versions, setVersions] = useState([]);
  const [loadingVersions, setLoadingVersions] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');

  useEffect(() => {
    if (resume?.id) {
      loadVersions();
    }
  }, [resume?.id]);

  const loadVersions = async () => {
    try {
      setLoadingVersions(true);
      const data = await listResumeVersions(resume.id);
      setVersions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingVersions(false);
    }
  };

  const handleSaveVersion = async () => {
    if (!newVersionName.trim()) {
      alert("Please enter a version name.");
      return;
    }
    try {
      await saveResumeVersion(resume.id, resume.user_id, newVersionName, resume.sections);
      setNewVersionName('');
      await loadVersions();
      alert("Version saved successfully!");
    } catch (e) {
      alert("Failed to save version.");
    }
  };

  const handleRestoreVersion = async (versionId) => {
    if (!window.confirm("Are you sure? This will overwrite your current resume with the selected version.")) return;
    
    try {
      const sections = await getResumeVersion(versionId);
      if (sections) {
        onUpdate({ sections });
        alert("Version restored successfully!");
      }
    } catch (e) {
      alert("Failed to restore version.");
    }
  };

  const handleLockToggle = () => {
    onUpdate({ is_locked: !resume.is_locked });
  };

  const handlePublicToggle = () => {
    onUpdate({ is_public: !resume.is_public });
  };

  const shareUrl = resume?.is_public && resume?.share_token 
    ? `${window.location.origin}/resume/share/${resume.share_token}` 
    : '';

  return (
    <SectionPanel title="Advanced Settings & Security">
      {/* AI Configuration */}
      <div className="rb2-item-card" style={{ marginBottom: '1rem', borderLeft: '3px solid #8b5cf6' }}>
        <h3>🤖 AI Configuration</h3>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
          Enter your Google Gemini API Key to enable powerful AI features (Rewrite, JD Match, ATS Score). This is stored securely in your browser's local storage.
        </p>
        <div className="rb2-form-group">
          <input 
            type="password" 
            className="rb2-input" 
            placeholder="AIzaSy..." 
            defaultValue={localStorage.getItem('GEMINI_API_KEY') || ''}
            onChange={(e) => {
              if (e.target.value) {
                localStorage.setItem('GEMINI_API_KEY', e.target.value);
              } else {
                localStorage.removeItem('GEMINI_API_KEY');
              }
            }}
          />
        </div>
      </div>

      {/* Resume Locking */}
      <div className="rb2-item-card" style={{ marginBottom: '1rem' }}>
        <h3>Resume Locking</h3>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
          Locking this resume prevents any further edits to its content. Useful for finalized resumes you intend to use for a specific application.
        </p>
        <button 
          className={`rb2-btn ${resume?.is_locked ? 'primary' : ''}`}
          onClick={handleLockToggle}
          style={{ background: resume?.is_locked ? '#ef4444' : '#3b82f6' }}
        >
          {resume?.is_locked ? '🔒 Unlock Resume' : '🔓 Lock Resume'}
        </button>
      </div>

      {/* Public Sharing */}
      <div className="rb2-item-card" style={{ marginBottom: '1rem' }}>
        <h3>Public Sharing</h3>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
          Generate a public link so recruiters or peers can view your resume online.
        </p>
        <button 
          className="rb2-btn primary"
          onClick={handlePublicToggle}
        >
          {resume?.is_public ? 'Disable Sharing' : 'Enable Public Link'}
        </button>

        {resume?.is_public && shareUrl && (
          <div style={{ marginTop: '1rem', background: '#f3f4f6', padding: '0.75rem', borderRadius: '4px', wordBreak: 'break-all' }}>
            <span style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 'bold' }}>Your Shareable Link:</span><br/>
            <a href={shareUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: '0.9rem' }}>{shareUrl}</a>
            <button 
              style={{ marginLeft: '10px', fontSize: '0.8rem', padding: '2px 6px', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Copied to clipboard!');
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>

      {/* Version History */}
      <div className="rb2-item-card">
        <h3>Version History</h3>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
          Save snapshots of your resume and restore them at any time.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
          <input 
            type="text" 
            className="rb2-input" 
            placeholder="e.g., Pre-Intel Application"
            value={newVersionName}
            onChange={e => setNewVersionName(e.target.value)}
          />
          <button className="rb2-btn primary" onClick={handleSaveVersion}>Save</button>
        </div>

        {loadingVersions ? (
          <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Loading versions...</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {versions.length === 0 && <li style={{ fontSize: '0.9rem', color: '#9ca3af' }}>No versions saved yet.</li>}
            {versions.map(v => (
              <li key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{v.version_name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{new Date(v.created_at).toLocaleString()}</div>
                </div>
                <button 
                  style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}
                  onClick={() => handleRestoreVersion(v.id)}
                >
                  Restore
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionPanel>
  );
};
