const fs = require('fs');
let data = fs.readFileSync('extracted_content_module1.json', 'utf8');

// Replace single backslashes with double backslashes, but ignore ones that are already doubled
// Actually, it's easier to just fix the specific LaTeX ones I see
data = data.replace(/\\sum/g, '\\\\sum')
           .replace(/\\frac/g, '\\\\frac')
           .replace(/\\times/g, '\\\\times')
           .replace(/\\text/g, '\\\\text')
           .replace(/\\mu/g, '\\\\mu')
           .replace(/\\dots/g, '\\\\dots')
           .replace(/\\Delta/g, '\\\\Delta')
           .replace(/\\tau/g, '\\\\tau')
           .replace(/\\sigma/g, '\\\\sigma')
           .replace(/\\epsilon/g, '\\\\epsilon')
           .replace(/\\rho/g, '\\\\rho')
           .replace(/\\Phi/g, '\\\\Phi')
           .replace(/\\Psi/g, '\\\\Psi')
           .replace(/\\Omega/g, '\\\\Omega')
           .replace(/\\alpha/g, '\\\\alpha')
           .replace(/\\beta/g, '\\\\beta')
           .replace(/\\gamma/g, '\\\\gamma');

// One more check for any remaining single backslashes that aren't part of an escape sequence
// but wait, JSON.parse is very strict. 
// Let's just do a global replace for any \ that isn't followed by ", \, /, b, f, n, r, t, u
// data = data.replace(/\\(?![\\\"\/bfnrtu])/g, '\\\\');

fs.writeFileSync('extracted_content_module1.json', data);
console.log('Fixed backslashes in JSON.');
