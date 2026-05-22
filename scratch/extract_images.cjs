const fs = require('fs');
const path = require('path');

const moduleFiles = [
  'Module1Content.jsx',
  'MOSFETCMOSContent.jsx',
  'Module4Content.jsx',
  'Module5Content.jsx',
  'Module6Content.jsx',
  'Module7Content.jsx',
  'Module8Content.jsx'
];

const dir = 'c:/Users/priya/vlsi-physical-design-ocean/src/pages/modules';
const results = {};

moduleFiles.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const imgRegex = /src="([^"]+)"/g;
  let match;
  const images = [];
  while ((match = imgRegex.exec(content)) !== null) {
    if (match[1].startsWith('/assets/modules')) {
      images.push(match[1]);
    }
  }
  results[file] = images;
});

console.log(JSON.stringify(results, null, 2));
