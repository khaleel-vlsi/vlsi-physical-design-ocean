const fs = require('fs');
const path = require('path');

const modulesDir = path.join(__dirname, '../src/pages/modules');
const files = [
  'Module1Content.jsx',
  'MOSFETCMOSContent.jsx',
  'Module3Content.jsx',
  'Module4Content.jsx',
  'Module5Content.jsx',
  'Module6Content.jsx',
  'Module7Content.jsx',
  'Module8Content.jsx'
];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const filePath = path.join(modulesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file}, does not exist.`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('AdUnit')) {
    console.log(`Skipping ${file}, already has AdUnit.`);
    continue;
  }

  // Inject import statement
  content = content.replace("import styles from './", "import AdUnit from '../../components/AdUnit';\nimport styles from './");
  
  // Inject <AdUnit /> at the end of the content area
  // Usually the end is:
  //       </div>
  //     </div>
  //   );
  // };
  // 
  // export default
  
  const slotId = `slot_${file.replace('.jsx', '').toLowerCase()}`;
  const adInjection = `\n          <AdUnit slotId="${slotId}" />\n        </div>`;
  
  // Replace the last "</div>" inside the content div before the main wrapper closes.
  // Actually, searching for:
  //         </div>
  //       </div>
  //     </div>
  //   );
  const targetPattern = /        <\/div>\n      <\/div>\n    <\/div>\n  \);\n};/g;
  
  if (targetPattern.test(content)) {
    content = content.replace(
      /        <\/div>\n      <\/div>\n    <\/div>\n  \);\n};/, 
      `          <AdUnit slotId="${slotId}" />\n        </div>\n      </div>\n    </div>\n  );\n};`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with AdUnit.`);
  } else {
    console.log(`Failed to match pattern in ${file}`);
  }
}
