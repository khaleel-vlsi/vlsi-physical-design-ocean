import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { TEMPLATES } from './pdfTemplates.js';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? rgb(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ) : rgb(0, 0, 0);
}

export async function generateResumePDF(templateId = 'professional', data) {
  const doc = await PDFDocument.create();
  const template = TEMPLATES[templateId] || TEMPLATES.professional;
  
  const font = await doc.embedFont(template.font);
  const fontBold = await doc.embedFont(template.fontBold);
  const fontItalic = template.fontItalic ? await doc.embedFont(template.fontItalic) : font;
  
  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const MARGIN_X = 50;
  const MARGIN_Y = 50;
  const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN_X * 2);
  
  let page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN_Y;
  
  let totalPages = 1;
  const pages = [page];

  // Helper: check space and add page
  const checkSpace = (requiredSpace) => {
    if (y - requiredSpace < MARGIN_Y) {
      page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      pages.push(page);
      totalPages++;
      y = PAGE_HEIGHT - MARGIN_Y;
      return true;
    }
    return false;
  };

  // Helper: measure text block height without drawing
  const measureWrappedText = (text, maxWidth, size) => {
    if (!text) return 0;
    const words = String(text).split(' ');
    let line = '';
    let height = size * 1.5;
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth > maxWidth && i > 0) {
        line = words[i] + ' ';
        height += size * 1.5;
      } else {
        line = testLine;
      }
    }
    return height;
  };

  // Helper: Draw Text with Wrapping
  const drawWrappedText = (text, x, yPos, maxWidth, fontRef, size, color) => {
    if (!text) return yPos;
    const words = String(text).split(' ');
    let line = '';
    let currentY = yPos;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const testWidth = fontRef.widthOfTextAtSize(testLine, size);
      
      if (testWidth > maxWidth && i > 0) {
        page.drawText(line, { x, y: currentY, size, font: fontRef, color });
        line = words[i] + ' ';
        currentY -= (size * 1.5);
        if (currentY < MARGIN_Y) {
          checkSpace(999); // Force new page
          currentY = y;
        }
      } else {
        line = testLine;
      }
    }
    page.drawText(line, { x, y: currentY, size, font: fontRef, color });
    return currentY - (size * 1.5);
  };

  // Helper: Section Title
  const drawSectionTitle = (title) => {
    checkSpace(40);
    page.drawText(title, { x: MARGIN_X, y, size: 12, font: fontBold, color: hexToRgb(template.heading) });
    y -= 18;
  };

  // --- Header: Personal Info ---
  const personal = data.personal || {};
  if (personal.name) {
    page.drawText(personal.name.toUpperCase(), { x: MARGIN_X, y, size: 24, font: fontBold, color: hexToRgb(template.primary) });
    y -= 30;
  }
  
  const contactParts = [personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean);
  if (contactParts.length > 0) {
    y = drawWrappedText(contactParts.join('  |  '), MARGIN_X, y, CONTENT_WIDTH, font, 10, hexToRgb(template.secondary));
    y -= 10;
    page.drawLine({ start: { x: MARGIN_X, y }, end: { x: PAGE_WIDTH - MARGIN_X, y }, thickness: 1, color: hexToRgb(template.primary) });
    y -= 20;
  }

  // --- Section: Objective ---
  if (data.objective?.objective) {
    drawSectionTitle("CAREER OBJECTIVE");
    y = drawWrappedText(data.objective.objective, MARGIN_X, y, CONTENT_WIDTH, font, 10, hexToRgb(template.text));
    y -= 10;
  }

  // --- Section: Experience ---
  const experience = data.experience?.items || [];
  if (experience.length > 0) {
    drawSectionTitle("PROFESSIONAL EXPERIENCE");
    for (const exp of experience) {
      let blockHeight = 20; // Title
      if (exp.description) {
        exp.description.split('\n').forEach(line => {
          if (line.trim()) blockHeight += measureWrappedText(line.trim(), CONTENT_WIDTH - 10, 10);
        });
      }
      checkSpace(blockHeight);
      
      page.drawText(exp.role || 'Role', { x: MARGIN_X, y, size: 11, font: fontBold, color: hexToRgb(template.text) });
      const companyWidth = font.widthOfTextAtSize(exp.company || '', 11);
      page.drawText(exp.company || '', { x: PAGE_WIDTH - MARGIN_X - companyWidth, y, size: 11, font: fontBold, color: hexToRgb(template.primary) });
      y -= 16;
      
      if (exp.description) {
        exp.description.split('\n').forEach(line => {
          if (line.trim()) {
            const bullet = line.trim().startsWith('•') ? line.trim() : '• ' + line.trim();
            y = drawWrappedText(bullet, MARGIN_X + 10, y, CONTENT_WIDTH - 10, font, 10, hexToRgb(template.text));
          }
        });
      }
      y -= 10;
    }
  }

  // --- Section: Education (Table Engine) ---
  const education = data.education?.items || [];
  if (education.length > 0) {
    drawSectionTitle("EDUCATION");
    const col1X = MARGIN_X;
    const col2X = MARGIN_X + 160;
    const col3X = PAGE_WIDTH - MARGIN_X - 60;
    
    page.drawText("Degree/Course", { x: col1X, y, size: 10, font: fontBold, color: hexToRgb(template.text) });
    page.drawText("Institution", { x: col2X, y, size: 10, font: fontBold, color: hexToRgb(template.text) });
    page.drawText("Year", { x: col3X, y, size: 10, font: fontBold, color: hexToRgb(template.text) });
    y -= 8;
    
    page.drawLine({ start: { x: MARGIN_X, y }, end: { x: PAGE_WIDTH - MARGIN_X, y }, thickness: 1, color: hexToRgb('#cccccc') });
    y -= 15;
    
    for (const edu of education) {
      checkSpace(30);
      const degreeText = (edu.degree || '').substring(0, 30);
      const instText = (edu.institution || '').substring(0, 45);
      
      page.drawText(degreeText, { x: col1X, y, size: 10, font: font, color: hexToRgb(template.text) });
      page.drawText(instText, { x: col2X, y, size: 10, font: font, color: hexToRgb(template.text) });
      page.drawText(edu.year || '', { x: col3X, y, size: 10, font: font, color: hexToRgb(template.text) });
      y -= 8;
      
      page.drawLine({ start: { x: MARGIN_X, y }, end: { x: PAGE_WIDTH - MARGIN_X, y }, thickness: 0.5, color: hexToRgb('#eeeeee') });
      y -= 15;
    }
  }

  // --- Section: Professional Training ---
  const training = data.training?.items || [];
  if (training.length > 0) {
    drawSectionTitle("PROFESSIONAL TRAINING");
    for (const trn of training) {
      checkSpace(20);
      const text = `${trn.duration || ''} ${trn.title || ''} at ${trn.institution || ''}`.trim();
      y = drawWrappedText(text, MARGIN_X, y, CONTENT_WIDTH, font, 10, hexToRgb(template.text));
    }
    y -= 10;
  }

  // --- Section: Technical Skills ---
  if (data.skills?.text) {
    drawSectionTitle("TECHNICAL SKILLS");
    y = drawWrappedText(data.skills.text, MARGIN_X, y, CONTENT_WIDTH, font, 10, hexToRgb(template.text));
    y -= 10;
  }

  // --- Section: Projects ---
  const projects = data.projects?.items || [];
  if (projects.length > 0) {
    drawSectionTitle("REALTIME PHYSICAL DESIGN PROJECTS");
    for (const proj of projects) {
      let blockHeight = 20; // Title
      let metaText = '';
      if (proj.role) metaText += `Role: ${proj.role} `;
      if (proj.role && proj.tools) metaText += `| `;
      if (proj.tools) metaText += `Tools: ${proj.tools}`;
      if (metaText) blockHeight += 14;
      
      const specs = [proj.techNode, proj.instanceCount, proj.macroCount, proj.frequency, proj.clockCount, proj.metalLayers].filter(Boolean);
      if (specs.length > 0) blockHeight += 14;
      if (proj.challenges) blockHeight += measureWrappedText(`Challenges: ${proj.challenges}`, CONTENT_WIDTH, 9);
      if (proj.description) {
        proj.description.split('\n').forEach(line => {
          if (line.trim()) blockHeight += measureWrappedText(line.trim(), CONTENT_WIDTH - 10, 10);
        });
      }
      checkSpace(blockHeight);
      
      page.drawText(proj.title || 'Project', { x: MARGIN_X, y, size: 11, font: fontBold, color: hexToRgb(template.text) });
      y -= 16;
      
      if (metaText) {
        page.drawText(metaText, { x: MARGIN_X, y, size: 10, font: fontItalic || font, color: hexToRgb(template.secondary) });
        y -= 14;
      }
      
      if (specs.length > 0) {
        page.drawText(specs.join('  |  '), { x: MARGIN_X, y, size: 9, font: font, color: hexToRgb('#555555') });
        y -= 14;
      }
      
      if (proj.challenges) {
        y = drawWrappedText(`Challenges: ${proj.challenges}`, MARGIN_X, y, CONTENT_WIDTH, font, 9, hexToRgb('#333333'));
        y -= 6;
      }
      
      if (proj.description) {
        proj.description.split('\n').forEach(line => {
          if (line.trim()) {
            const bullet = line.trim().startsWith('•') ? line.trim() : '• ' + line.trim();
            y = drawWrappedText(bullet, MARGIN_X + 10, y, CONTENT_WIDTH - 10, font, 10, hexToRgb(template.text));
          }
        });
      }
      y -= 10;
    }
  }

  // --- Section: Declaration ---
  if (data.declaration?.text) {
    checkSpace(120);
    drawSectionTitle("DECLARATION");
    y = drawWrappedText(data.declaration.text, MARGIN_X, y, CONTENT_WIDTH, font, 10, hexToRgb(template.text));
    y -= 25;
    
    const place = data.declaration?.place || '';
    const date = data.declaration?.date || '';
    const name = data.personal?.name || '';
    
    if (place) { page.drawText(`Place: ${place}`, { x: MARGIN_X, y, size: 10, font: fontBold, color: hexToRgb(template.text) }); y -= 15; }
    if (date) { page.drawText(`Date: ${date}`, { x: MARGIN_X, y, size: 10, font: fontBold, color: hexToRgb(template.text) }); }
    
    const sigX = PAGE_WIDTH - MARGIN_X - 150;
    page.drawLine({ start: { x: sigX, y: y + 20 }, end: { x: sigX + 150, y: y + 20 }, thickness: 1, color: hexToRgb('#000000') });
    page.drawText("Signature", { x: sigX, y, size: 10, font: fontBold, color: hexToRgb(template.text) });
    y -= 15;
    page.drawText(name, { x: sigX, y, size: 10, font: font, color: hexToRgb(template.secondary) });
    y -= 20;
  }

  // Add Page Numbers (Header/Footer Engine)
  pages.forEach((p, idx) => {
    const text = `Page ${idx + 1} of ${totalPages}`;
    const textWidth = font.widthOfTextAtSize(text, 9);
    p.drawText(text, {
      x: PAGE_WIDTH - MARGIN_X - textWidth,
      y: 20, // 20 units from bottom
      size: 9,
      font: font,
      color: hexToRgb('#9ca3af')
    });
  });

  return await doc.save();
}
