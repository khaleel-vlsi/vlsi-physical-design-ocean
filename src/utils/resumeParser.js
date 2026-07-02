import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Main parser entry point.
 * @param {File} file 
 * @returns {Promise<Object>} { parsedSections, missingParts, formatIssues }
 */
export async function parseResumeFile(file) {
  let textContent = '';
  
  if (file.type === 'application/pdf') {
    textContent = await extractTextFromPDF(file);
  } else if (file.name.endsWith('.docx')) {
    textContent = await extractTextFromDOCX(file);
  } else {
    throw new Error('Unsupported file format. Please upload PDF or DOCX.');
  }
  
  // Clean text
  const cleanText = textContent.replace(/\s+/g, ' ').trim();
  
  // Very basic heuristic parsing (In a real scenario, this would be passed to AI)
  return parseTextToSections(cleanText);
}

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
}

async function extractTextFromDOCX(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

function parseTextToSections(text) {
  const lowerText = text.toLowerCase();
  
  const sections = {
    personal: {},
    objective: {},
    experience: { items: [] },
    education: { items: [] },
    skills: { items: [] }
  };
  
  const missingParts = [];
  const formatIssues = [];
  
  // Check for common sections to find missing parts
  if (!lowerText.includes('education') && !lowerText.includes('academic')) {
    missingParts.push('Education Section');
  }
  if (!lowerText.includes('experience') && !lowerText.includes('employment')) {
    missingParts.push('Experience Section');
  }
  if (!lowerText.includes('skill') && !lowerText.includes('technical')) {
    missingParts.push('Skills Section');
  }
  
  // Look for emails
  const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
  if (emailMatch) {
    sections.personal.email = emailMatch[0];
  } else {
    missingParts.push('Email Address');
  }
  
  // Look for phone
  const phoneMatch = text.match(/(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phoneMatch) {
    sections.personal.phone = phoneMatch[0];
  } else {
    missingParts.push('Phone Number');
  }
  
  return { parsedSections: sections, missingParts, formatIssues, rawText: text };
}
