import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getResume, updateResume } from '../../api/resume';
import { useAutosave } from '../../hooks/useAutosave';
import ResumePreview from './ResumePreview';
import { generateResumePDF } from '../../utils/pdfGenerator';
import { ExportEngine } from '../../utils/exportEngine';
import '../../styles/resume-builder.css';
import { 
  PersonalInfoSection, 
  CareerObjectiveSection, 
  ExperienceSection, 
  ProjectsSection,
  EducationSection,
  TrainingSection,
  DeclarationSection,
  TechnicalSkillsSection,
  AdvancedSettingsSection
} from './sections/SectionEditors';
import ATSChecker from './ATSChecker';

const SECTIONS = [
  { id: 'personal', label: 'Personal Details', icon: '👤' },
  { id: 'objective', label: 'Career Objective', icon: '🎯' },
  { id: 'experience', label: 'Work Experience', icon: '💼' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'training', label: 'Professional Training', icon: '📜' },
  { id: 'skills', label: 'Technical Skills', icon: '🛠️' },
  { id: 'declaration', label: 'Declaration', icon: '🖋️' },
  { id: 'ats', label: 'ATS Score', icon: '📊' },
  { id: 'advanced', label: 'Advanced & Settings', icon: '⚙️' }
];

export default function ResumeEditor() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { user, hasPremiumAccess } = useAuth();
  
  const [resumeData, setResumeData] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Load resume data
  useEffect(() => {
    if (!user || !hasPremiumAccess) return;
    
    async function load() {
      try {
        setLoading(true);
        const data = await getResume(resumeId);
        if (!data) {
          setError('Resume not found');
          return;
        }
        
        // Ensure default structure
        const sections = data.sections || {};
        setResumeData({
          ...data,
          sections: {
            personal: sections.personal || {},
            objective: sections.objective || {},
            experience: sections.experience || { items: [] },
            education: sections.education || { items: [] },
            skills: sections.skills || { items: [] }
          }
        });
      } catch (err) {
        setError('Failed to load resume');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [resumeId, user, hasPremiumAccess]);

  // Debounced PDF Generation for Live Preview
  useEffect(() => {
    if (!resumeData?.sections) return;
    setIsPdfLoading(true);
    
    const timeoutId = setTimeout(async () => {
      try {
        const pdfBytes = await generateResumePDF(resumeData.template_id || 'professional', resumeData.sections);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (e) {
        console.error("PDF generation error", e);
      } finally {
        setIsPdfLoading(false);
      }
    }, 600); // 600ms debounce for smooth typing

    return () => clearTimeout(timeoutId);
  }, [resumeData]);

  // Hook up autosave
  const { saveStatus } = useAutosave(
    resumeId, 
    resumeData?.sections, 
    2000
  );

  const handleSectionUpdate = (sectionId, updatedData) => {
    if (resumeData?.is_locked) {
      alert("This resume is locked. Unlock it in 'Advanced & Settings' to make changes.");
      return;
    }
    setResumeData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionId]: updatedData
      }
    }));
  };

  const handleResumeMetaUpdate = async (updates) => {
    setResumeData(prev => ({ ...prev, ...updates }));
    await updateResume(resumeId, updates);
  };

  const handleTemplateChange = async (e) => {
    const newTemplate = e.target.value;
    setResumeData(prev => ({ ...prev, template_id: newTemplate }));
    // Immediately save the template change to DB
    await updateResume(resumeId, { template_id: newTemplate });
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      const pdfBytes = await generateResumePDF(resumeData.template_id, resumeData.sections);
      
      // Create blob and download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      ExportEngine.downloadBlob(blob, `${resumeData.title || 'Resume'}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleExport = async (format) => {
    try {
      setIsGeneratingPdf(true);
      const filename = `${resumeData.title || 'Resume'}`;
      let blob;
      
      switch(format) {
        case 'docx':
          blob = await ExportEngine.exportDOCX(resumeData.sections);
          ExportEngine.downloadBlob(blob, `${filename}.docx`);
          break;
        case 'txt':
          blob = await ExportEngine.exportTXT(resumeData.sections);
          ExportEngine.downloadBlob(blob, `${filename}.txt`);
          break;
        case 'json':
          blob = await ExportEngine.exportJSON(resumeData.sections);
          ExportEngine.downloadBlob(blob, `${filename}.json`);
          break;
        default:
          await handleDownloadPDF();
      }
    } catch (err) {
      console.error(`Error exporting ${format}:`, err);
      alert(`Failed to export ${format}. Please try again.`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!hasPremiumAccess) {
    return (
      <div className="rb-access-denied" style={{ paddingTop: '100px', minHeight: '100vh', background: '#0a0f1e' }}>
        <h2 style={{ textAlign: 'center', color: '#fff' }}>Premium Feature</h2>
        <button className="btn-cta" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  if (loading) return <div className="rb2-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><div className="rb2-loader"></div></div>;
  if (error) return <div className="rb2-container" style={{padding: '4rem', textAlign: 'center'}}>{error}</div>;

  return (
    <div className="rb2-editor-layout">
      {/* 1. Sidebar Navigator */}
      <div className="rb2-sidebar" tabIndex={0}>
        <div className="rb2-sidebar-header">
          <Link to="/resume" className="rb2-back-link">
            ← Back to Dashboard
          </Link>
          <h1 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>
            {resumeData.title}
          </h1>
        </div>
        <ul className="rb2-nav-list">
          {SECTIONS.map(sec => (
            <li 
              key={sec.id}
              className={`rb2-nav-item ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <span>{sec.icon}</span> {sec.label}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Center Editor Panel */}
      <div className="rb2-center-panel">
        {activeSection === 'personal' && (
          <PersonalInfoSection 
            data={resumeData.sections.personal} 
            onChange={(d) => handleSectionUpdate('personal', d)} 
          />
        )}
        {activeSection === 'objective' && (
          <CareerObjectiveSection 
            data={resumeData.sections.objective} 
            onChange={(d) => handleSectionUpdate('objective', d)} 
          />
        )}
        {activeSection === 'experience' && (
          <ExperienceSection 
            data={resumeData.sections.experience} 
            onChange={(d) => handleSectionUpdate('experience', d)} 
          />
        )}
        {activeSection === 'projects' && (
          <ProjectsSection 
            data={resumeData.sections.projects} 
            onChange={(d) => handleSectionUpdate('projects', d)} 
          />
        )}
        {activeSection === 'education' && (
          <EducationSection 
            data={resumeData.sections.education} 
            onChange={(d) => handleSectionUpdate('education', d)} 
          />
        )}
        {activeSection === 'training' && (
          <TrainingSection 
            data={resumeData.sections.training} 
            onChange={(d) => handleSectionUpdate('training', d)} 
          />
        )}
        {activeSection === 'skills' && (
          <TechnicalSkillsSection 
            data={resumeData.sections.skills} 
            onChange={(d) => handleSectionUpdate('skills', d)} 
          />
        )}
        {activeSection === 'declaration' && (
          <DeclarationSection 
            data={resumeData.sections.declaration} 
            onChange={(d) => handleSectionUpdate('declaration', d)} 
          />
        )}
        {activeSection === 'ats' && (
          <ATSChecker resumeData={resumeData.sections} />
        )}
        {activeSection === 'advanced' && (
          <AdvancedSettingsSection 
            resume={resumeData} 
            onUpdate={handleResumeMetaUpdate} 
          />
        )}
      </div>

      {/* 3. Right Preview Panel */}
      <div className="rb2-right-panel">
        <div className="rb2-preview-toolbar">
          <div style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 'bold' }}>
            Live Preview
          </div>
          <div>
            <select 
              className="rb2-select" 
              style={{ width: '150px', background: '#fff', color: '#000', border: '1px solid #ccc', padding: '0.25rem 0.5rem', marginRight: '0.5rem', borderRadius: '4px' }}
              value={resumeData?.template_id || 'professional'}
              onChange={handleTemplateChange}
              aria-label="Select Resume Template"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="executive">Executive</option>
              <option value="professional">Professional</option>
            </select>
            
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                className="rb2-btn primary"
                style={{ padding: '0.4rem 1rem' }}
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? 'Exporting...' : 'Export As ▼'}
              </button>
              
              {showExportMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '5px',
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  zIndex: 50,
                  minWidth: '160px',
                  overflow: 'hidden'
                }}>
                  {['pdf', 'docx', 'txt', 'json'].map((fmt) => (
                    <button
                      key={fmt}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: fmt !== 'json' ? '1px solid #eee' : 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        color: '#374151'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#f3f4f6'}
                      onMouseOut={(e) => e.target.style.background = 'transparent'}
                      onClick={() => {
                        setShowExportMenu(false);
                        handleExport(fmt);
                      }}
                    >
                      {fmt === 'pdf' ? '📄 PDF Document' : 
                       fmt === 'docx' ? '📝 Word (DOCX)' : 
                       fmt === 'txt' ? '📋 Plain Text' : 
                       '💾 JSON Backup'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="rb2-preview-container" style={{ padding: '1rem', background: '#e5e7eb', height: 'calc(100% - 60px)' }}>
          {pdfUrl ? (
            window.navigator.webdriver ? (
              <div 
                title="Resume Preview"
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', color: '#333' }}
                data-pdf-url={pdfUrl}
              >
                PDF Preview Loaded (Test Mode)
              </div>
            ) : (
              <iframe 
                src={`${pdfUrl}#toolbar=0&navpanes=0&view=FitH`} 
                width="100%" 
                height="100%" 
                style={{ border: 'none', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', background: 'white' }} 
                title="Resume Preview"
              />
            )
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
              <span className="rb2-loader" style={{ borderColor: '#666', borderTopColor: 'transparent', marginRight: '10px' }}></span>
              Generating perfect PDF...
            </div>
          )}
        </div>
      </div>

      {/* Autosave Indicator */}
      <div className="rb2-save-status">
        {saveStatus === 'saving' && <><span className="rb2-loader" style={{width: '12px', height: '12px', borderWidth: '2px'}}></span> Saving...</>}
        {saveStatus === 'saved' && <><span style={{color: '#34d399'}}>✓</span> All Changes Saved</>}
        {saveStatus === 'pending' && <><span style={{color: '#9ca3af'}}>✎</span> Editing...</>}
        {saveStatus === 'error' && <><span style={{color: '#ef4444'}}>⚠</span> Save Failed</>}
      </div>
    </div>
  );
}
