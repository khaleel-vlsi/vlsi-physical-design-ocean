const fs = require('fs');
const path = require('path');

const modules = [
  'Module1Content',
  'MOSFETCMOSContent',
  'DigitalElectronicsContent', // Wait, module 3 is missing? Let's check files.
  'Module4Content',
  'Module5Content',
  'Module6Content',
  'Module7Content',
  'Module8Content'
];

const modulesDir = path.join(__dirname, '..', 'src', 'pages', 'modules');

fs.readdirSync(modulesDir).forEach(file => {
  if (file.endsWith('Content.jsx') && !file.includes('58') && !file.includes('59')) {
    let content = fs.readFileSync(path.join(modulesDir, file), 'utf8');
    
    // Check if AdUnit is imported
    if (!content.includes('import AdUnit')) {
      content = content.replace("import styles from", "import AdUnit from '../../components/AdUnit';\nimport styles from");
    }

    // Split content by <h2> tags (styles.h2)
    const parts = content.split(/<h2 /);
    if (parts.length > 3) {
      // We want to insert an ad at 1/3rd and 2/3rd of the h2 tags
      const third = Math.floor(parts.length / 3);
      const twoThird = Math.floor((parts.length * 2) / 3);
      
      const basename = file.replace('.jsx', '').toLowerCase();

      // Only insert if it doesn't already have mid1
      if (!content.includes('mid1')) {
        parts[third] = `<AdUnit slotId="slot_${basename}_mid1" />\n          <h2 ` + parts[third];
        parts[twoThird] = `<AdUnit slotId="slot_${basename}_mid2" />\n          <h2 ` + parts[twoThird];
        
        content = parts.join('');
        fs.writeFileSync(path.join(modulesDir, file), content);
        console.log(`Updated ${file}`);
      }
    }
  }
});
