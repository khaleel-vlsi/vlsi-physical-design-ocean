const fs = require('fs');
const parser = require('@babel/parser');

try {
  const code = fs.readFileSync('C:/Users/priya/vlsi-physical-design-ocean/src/pages/PaidModuleDetail.jsx', 'utf8');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('No syntax errors found');
} catch (err) {
  console.error('Syntax Error:', err.message);
  if (err.loc) {
    console.error('Location:', err.loc);
  }
}
