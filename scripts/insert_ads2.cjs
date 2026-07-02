const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '..', 'src', 'pages', 'modules');
const targetFiles = [
  'Module1Content.jsx',
  'MOSFETCMOSContent.jsx',
  'Module4Content.jsx',
  'Module5Content.jsx',
  'Module6Content.jsx',
  'Module7Content.jsx',
  'Module8Content.jsx'
];

targetFiles.forEach(file => {
  let content = fs.readFileSync(path.join(modulesDir, file), 'utf8');
  
  if (!content.includes('import AdUnit')) {
    content = content.replace("import styles from", "import AdUnit from '../../components/AdUnit';\nimport styles from");
  }

  const parts = content.split('<h2 ');
  if (parts.length > 3) {
    const third = Math.floor(parts.length / 3);
    const twoThird = Math.floor((parts.length * 2) / 3);
    
    const basename = file.replace('.jsx', '').toLowerCase();

    let newContent = parts[0];
    for (let i = 1; i < parts.length; i++) {
      if (i === third && !content.includes('mid1')) {
         newContent += '<AdUnit slotId="slot_' + basename + '_mid1" />\n          <h2 ' + parts[i];
      } else if (i === twoThird && !content.includes('mid2')) {
         newContent += '<AdUnit slotId="slot_' + basename + '_mid2" />\n          <h2 ' + parts[i];
      } else {
         newContent += '<h2 ' + parts[i];
      }
    }
    
    fs.writeFileSync(path.join(modulesDir, file), newContent);
    console.log(`Updated ${file}`);
  }
});
