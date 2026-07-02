import React, { useState, useEffect } from 'react';
import { calculateATSScore } from '../../utils/atsScorer';

export default function ATSChecker({ resumeData }) {
  const [scoreData, setScoreData] = useState({ score: 100, issues: [], improvements: [] });

  useEffect(() => {
    if (resumeData) {
      // Default to checking Physical Design keywords
      const pdKeywords = ['Physical Design', 'Innovus', 'PrimeTime', 'Floorplanning', 'STA', 'Timing', 'TCL', 'CTS', 'Routing'];
      setScoreData(calculateATSScore(resumeData, pdKeywords));
    }
  }, [resumeData]);

  const { score, issues, improvements } = scoreData;

  const getScoreColor = () => {
    if (score >= 80) return '#34d399'; // green
    if (score >= 60) return '#fbbf24'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="rb2-section-panel">
      <h2>ATS Optimizer</h2>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '50%', 
          border: `8px solid ${getScoreColor()}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.05)'
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: getScoreColor() }}>{score}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ 100</span>
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            {score >= 80 ? 'Great job! Your resume is ATS-friendly.' : 
             score >= 60 ? 'Needs some improvement.' : 
             'Critical issues found.'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Applicant Tracking Systems (ATS) scan your resume before a human sees it. 
            Fix the issues below to increase your chances of getting an interview.
          </p>
        </div>
      </div>

      {issues.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#ef4444', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', paddingBottom: '0.5rem' }}>
            Critical Issues ({issues.length})
          </h3>
          <ul style={{ paddingLeft: '1.5rem', color: '#fca5a5' }}>
            {issues.map(issue => (
              <li key={issue.id} style={{ marginBottom: '0.5rem' }}>{issue.message}</li>
            ))}
          </ul>
        </div>
      )}

      {improvements.length > 0 && (
        <div>
          <h3 style={{ color: '#fbbf24', borderBottom: '1px solid rgba(251, 191, 36, 0.2)', paddingBottom: '0.5rem' }}>
            Suggested Improvements ({improvements.length})
          </h3>
          <ul style={{ paddingLeft: '1.5rem', color: '#fcd34d' }}>
            {improvements.map(imp => (
              <li key={imp.id} style={{ marginBottom: '0.5rem' }}>{imp.message}</li>
            ))}
          </ul>
        </div>
      )}

      {issues.length === 0 && improvements.length === 0 && (
        <div style={{ padding: '1rem', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', borderRadius: '8px', textAlign: 'center' }}>
          ✅ Your resume passes all basic ATS checks!
        </div>
      )}
    </div>
  );
}
