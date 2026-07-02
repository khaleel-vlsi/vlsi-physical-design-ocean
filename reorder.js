const fs = require('fs');

const path = 'C:/Users/priya/vlsi-physical-design-ocean/src/utils/pdfGenerator.js';
let content = fs.readFileSync(path, 'utf8');

// The section markers
const projectStart = '  // --- Section: Projects ---';
const eduStart = '  // --- Section: Education ---';
const declStart = '  // --- Section: Declaration ---';

// Find indices
const pIdx = content.indexOf(projectStart);
const eIdx = content.indexOf(eduStart);
const dIdx = content.indexOf(declStart);

if (pIdx > -1 && eIdx > -1 && dIdx > -1) {
  // Extract Projects block
  const projectBlock = content.substring(pIdx, eIdx);
  
  // Remove Projects block from original location
  const beforeProjects = content.substring(0, pIdx);
  const afterProjectsToDecl = content.substring(eIdx, dIdx);
  const fromDeclOnwards = content.substring(dIdx);
  
  // Reconstruct: beforeProjects + afterProjectsToDecl + projectBlock + fromDeclOnwards
  const newContent = beforeProjects + afterProjectsToDecl + projectBlock + fromDeclOnwards;
  
  fs.writeFileSync(path, newContent, 'utf8');
  console.log("SUCCESS: Reordered sections");
} else {
  console.log("ERROR: Could not find sections");
}
