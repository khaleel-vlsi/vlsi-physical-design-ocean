import React from 'react';

export default function ResumePreview({ data, templateId }) {
  return (
    <div className="rb2-preview-container">
      <div className="rb2-pdf-page">
        <div style={{ padding: '40px' }}>
          <h1 style={{ fontSize: '24pt', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
            {data.personal?.name || 'Your Name'}
          </h1>
          <div style={{ fontSize: '10pt', marginBottom: '20px' }}>
            {data.personal?.email} | {data.personal?.phone} | {data.personal?.location}
          </div>
          
          {data.objective?.objective && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Career Objective</h2>
              <p style={{ fontSize: '10pt' }}>{data.objective.objective}</p>
            </div>
          )}
          
          {data.experience?.items?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Experience</h2>
              {data.experience.items.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{item.role}</div>
                  <div style={{ fontStyle: 'italic', fontSize: '10pt' }}>{item.company}</div>
                  <p style={{ fontSize: '10pt', marginTop: '5px' }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {data.projects?.items?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Projects</h2>
              {data.projects.items.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{item.title}</div>
                  {(item.role || item.tools) && (
                    <div style={{ fontStyle: 'italic', fontSize: '10pt', marginBottom: '5px' }}>
                      {item.role && <span>Role: {item.role} </span>}
                      {item.role && item.tools && <span> | </span>}
                      {item.tools && <span>Tools: {item.tools}</span>}
                    </div>
                  )}
                  
                  {/* VLSI Specific Fields */}
                  {(item.techNode || item.instanceCount || item.macroCount || item.frequency || item.clockCount || item.metalLayers) && (
                    <div style={{ fontSize: '9pt', color: '#555', marginBottom: '8px', padding: '5px', background: '#f9fafb', borderLeft: '3px solid #cbd5e1' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {item.techNode && <div><strong>Node:</strong> {item.techNode}</div>}
                        {item.instanceCount && <div><strong>Instances:</strong> {item.instanceCount}</div>}
                        {item.macroCount && <div><strong>Macros:</strong> {item.macroCount}</div>}
                        {item.frequency && <div><strong>Freq:</strong> {item.frequency}</div>}
                        {item.clockCount && <div><strong>Clocks:</strong> {item.clockCount}</div>}
                        {item.metalLayers && <div><strong>Metals:</strong> {item.metalLayers}</div>}
                      </div>
                    </div>
                  )}
                  
                  {item.challenges && (
                    <div style={{ fontSize: '10pt', marginBottom: '5px' }}>
                      <strong>Challenges:</strong> {item.challenges}
                    </div>
                  )}

                  <p style={{ fontSize: '10pt', margin: '5px 0 0 0' }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {data.education?.items?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Education</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ padding: '6px 0', width: '40%' }}>Degree/Course</th>
                    <th style={{ padding: '6px 0', width: '40%' }}>Institution/Board</th>
                    <th style={{ padding: '6px 0', width: '20%' }}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {data.education.items.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 0', fontWeight: 'bold' }}>{item.degree}</td>
                      <td style={{ padding: '6px 0' }}>{item.institution}</td>
                      <td style={{ padding: '6px 0' }}>{item.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {data.training?.items?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Professional Training</h2>
              {data.training.items.map(item => (
                <div key={item.id} style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{item.title}</div>
                  <div style={{ fontSize: '10pt' }}>{item.institution} ({item.duration})</div>
                </div>
              ))}
            </div>
          )}
          
          {data.skills?.text && (
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px' }}>Technical Skills</h2>
              <p style={{ fontSize: '10pt' }}>{data.skills.text}</p>
            </div>
          )}

          {data.declaration?.text && (
            <div style={{ marginTop: '40px', paddingTop: '20px' }}>
              <h2 style={{ fontSize: '14pt', borderBottom: '1px solid #ccc', marginBottom: '10px', background: '#e2e8f0', padding: '5px' }}>DECLARATION</h2>
              <p style={{ fontSize: '10pt', marginBottom: '30px' }}>{data.declaration.text}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10pt' }}>
                <div>
                  {data.declaration.place && <div><strong>Place:</strong> {data.declaration.place}</div>}
                  {data.declaration.date && <div><strong>Date:</strong> {data.declaration.date}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ borderBottom: '1px solid #000', width: '200px', marginBottom: '5px', height: '20px' }}></div>
                  <strong>Signature</strong><br/>
                  <span style={{ color: '#555' }}>{data.personal?.name}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
