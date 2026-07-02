import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

/**
 * Main export engine for alternative formats
 */
export const ExportEngine = {
  
  /**
   * Export resume as TXT
   */
  async exportTXT(resumeData) {
    const lines = [];
    
    // Personal Info
    if (resumeData.personal) {
      if (resumeData.personal.name) lines.push(resumeData.personal.name.toUpperCase());
      const contact = [];
      if (resumeData.personal.email) contact.push(resumeData.personal.email);
      if (resumeData.personal.phone) contact.push(resumeData.personal.phone);
      if (resumeData.personal.location) contact.push(resumeData.personal.location);
      if (contact.length) lines.push(contact.join(' | '));
      if (resumeData.personal.linkedin) lines.push(resumeData.personal.linkedin);
      lines.push('\n');
    }

    // Objective
    if (resumeData.objective?.objective) {
      lines.push('CAREER OBJECTIVE');
      lines.push('----------------');
      lines.push(resumeData.objective.objective);
      lines.push('\n');
    }

    // Experience
    if (resumeData.experience?.items?.length) {
      lines.push('PROFESSIONAL EXPERIENCE');
      lines.push('-----------------------');
      resumeData.experience.items.forEach(exp => {
        lines.push(`${exp.role} at ${exp.company}`);
        if (exp.description) {
          exp.description.split('\n').forEach(line => {
            if (line.trim()) lines.push(`- ${line.trim().replace(/^•\s*/, '')}`);
          });
        }
        lines.push('');
      });
    }

    // Education
    if (resumeData.education?.items?.length) {
      lines.push('EDUCATION');
      lines.push('---------');
      resumeData.education.items.forEach(edu => {
        lines.push(`${edu.degree} - ${edu.institution} (${edu.year})`);
      });
      lines.push('\n');
    }

    // Training
    if (resumeData.training?.items?.length) {
      lines.push('PROFESSIONAL TRAINING');
      lines.push('---------------------');
      resumeData.training.items.forEach(trn => {
        lines.push(`${trn.duration} ${trn.title} at ${trn.institution}`);
      });
      lines.push('\n');
    }

    // Skills
    if (resumeData.skills?.text) {
      lines.push('TECHNICAL SKILLS');
      lines.push('----------------');
      lines.push(resumeData.skills.text);
      lines.push('\n');
    }

    // Projects
    if (resumeData.projects?.items?.length) {
      lines.push('REALTIME PHYSICAL DESIGN PROJECTS');
      lines.push('---------------------------------');
      resumeData.projects.items.forEach(proj => {
        lines.push(`${proj.title}`);
        if (proj.role) lines.push(`Role: ${proj.role}`);
        if (proj.tools) lines.push(`Tools: ${proj.tools}`);
        
        const specs = [proj.techNode, proj.instanceCount, proj.macroCount, proj.frequency, proj.clockCount, proj.metalLayers].filter(Boolean);
        if (specs.length) lines.push(specs.join(' | '));
        
        if (proj.challenges) lines.push(`Challenges: ${proj.challenges}`);
        
        if (proj.description) {
          proj.description.split('\n').forEach(line => {
            if (line.trim()) lines.push(`- ${line.trim().replace(/^•\s*/, '')}`);
          });
        }
        lines.push('');
      });
    }

    // Declaration
    if (resumeData.declaration?.text) {
      lines.push('DECLARATION');
      lines.push('-----------');
      lines.push(resumeData.declaration.text);
      lines.push('');
      if (resumeData.declaration.place) lines.push(`Place: ${resumeData.declaration.place}`);
      if (resumeData.declaration.date) lines.push(`Date: ${resumeData.declaration.date}`);
    }

    const textContent = lines.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    return blob;
  },

  /**
   * Export resume as JSON (Backup)
   */
  async exportJSON(resumeData) {
    const jsonContent = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    return blob;
  },

  /**
   * Export resume as DOCX
   * Note: Requires `docx` package.
   */
  async exportDOCX(resumeData) {
    const children = [];

    // Personal Info
    if (resumeData.personal) {
      if (resumeData.personal.name) {
        children.push(new Paragraph({
          text: resumeData.personal.name.toUpperCase(),
          heading: HeadingLevel.HEADING_1,
          alignment: 'center'
        }));
      }
      const contact = [];
      if (resumeData.personal.email) contact.push(resumeData.personal.email);
      if (resumeData.personal.phone) contact.push(resumeData.personal.phone);
      if (resumeData.personal.location) contact.push(resumeData.personal.location);
      
      if (contact.length) {
        children.push(new Paragraph({
          children: [new TextRun(contact.join('  |  '))],
          alignment: 'center'
        }));
      }
      children.push(new Paragraph({ text: '' })); // Spacing
    }

    // Objective
    if (resumeData.objective?.objective) {
      children.push(new Paragraph({
        text: 'CAREER OBJECTIVE',
        heading: HeadingLevel.HEADING_2
      }));
      children.push(new Paragraph({
        text: resumeData.objective.objective
      }));
      children.push(new Paragraph({ text: '' }));
    }

    // Experience
    if (resumeData.experience?.items?.length) {
      children.push(new Paragraph({
        text: 'PROFESSIONAL EXPERIENCE',
        heading: HeadingLevel.HEADING_2
      }));
      
      resumeData.experience.items.forEach(exp => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: exp.role || 'Role', bold: true }),
            new TextRun({ text: ` | ${exp.company || 'Company'}`, italics: true })
          ]
        }));
        
        if (exp.description) {
          exp.description.split('\n').forEach(line => {
            if (line.trim()) {
              children.push(new Paragraph({
                text: line.trim().replace(/^•\s*/, ''),
                bullet: { level: 0 }
              }));
            }
          });
        }
        children.push(new Paragraph({ text: '' }));
      });
    }

    // Education
    if (resumeData.education?.items?.length) {
      children.push(new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_2
      }));
      
      resumeData.education.items.forEach(edu => {
        children.push(new Paragraph({
          children: [
            new TextRun({ text: edu.degree || 'Degree', bold: true }),
            new TextRun({ text: ` - ${edu.institution || ''} (${edu.year || ''})` })
          ]
        }));
      });
      children.push(new Paragraph({ text: '' }));
    }

    // Training
    if (resumeData.training?.items?.length) {
      children.push(new Paragraph({
        text: 'PROFESSIONAL TRAINING',
        heading: HeadingLevel.HEADING_2
      }));
      resumeData.training.items.forEach(trn => {
        children.push(new Paragraph({
          children: [new TextRun(`${trn.duration || ''} ${trn.title || ''} at ${trn.institution || ''}`.trim())]
        }));
      });
      children.push(new Paragraph({ text: '' }));
    }

    // Skills
    if (resumeData.skills?.text) {
      children.push(new Paragraph({
        text: 'TECHNICAL SKILLS',
        heading: HeadingLevel.HEADING_2
      }));
      children.push(new Paragraph({
        text: resumeData.skills.text
      }));
      children.push(new Paragraph({ text: '' }));
    }

    // Projects
    if (resumeData.projects?.items?.length) {
      children.push(new Paragraph({
        text: 'REALTIME PHYSICAL DESIGN PROJECTS',
        heading: HeadingLevel.HEADING_2
      }));
      
      resumeData.projects.items.forEach(proj => {
        children.push(new Paragraph({
          children: [new TextRun({ text: proj.title || 'Project', bold: true })]
        }));
        
        const metaText = [];
        if (proj.role) metaText.push(`Role: ${proj.role}`);
        if (proj.tools) metaText.push(`Tools: ${proj.tools}`);
        if (metaText.length) {
          children.push(new Paragraph({
            children: [new TextRun({ text: metaText.join(' | '), italics: true })]
          }));
        }

        const specs = [proj.techNode, proj.instanceCount, proj.macroCount, proj.frequency, proj.clockCount, proj.metalLayers].filter(Boolean);
        if (specs.length) {
          children.push(new Paragraph({
            children: [new TextRun({ text: specs.join('  |  '), color: "555555" })]
          }));
        }

        if (proj.challenges) {
          children.push(new Paragraph({
            children: [new TextRun(`Challenges: ${proj.challenges}`)]
          }));
        }

        if (proj.description) {
          proj.description.split('\n').forEach(line => {
            if (line.trim()) {
              children.push(new Paragraph({
                text: line.trim().replace(/^•\s*/, ''),
                bullet: { level: 0 }
              }));
            }
          });
        }
        children.push(new Paragraph({ text: '' }));
      });
    }

    // Declaration
    if (resumeData.declaration?.text) {
      children.push(new Paragraph({
        text: 'DECLARATION',
        heading: HeadingLevel.HEADING_2
      }));
      children.push(new Paragraph({
        text: resumeData.declaration.text
      }));
      children.push(new Paragraph({ text: '' }));
      if (resumeData.declaration.place) {
        children.push(new Paragraph({ text: `Place: ${resumeData.declaration.place}` }));
      }
      if (resumeData.declaration.date) {
        children.push(new Paragraph({ text: `Date: ${resumeData.declaration.date}` }));
      }
    }

    const doc = new Document({
      sections: [{ properties: {}, children }]
    });

    const blob = await Packer.toBlob(doc);
    return blob;
  },

  /**
   * Helper to trigger file download in browser
   */
  downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
  }
};
