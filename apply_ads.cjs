// apply_ads.cjs
// Batch script (CommonJS) to add AdSlot imports, auth hook, and ad slots to free pages.
const fs = require('fs');
const path = require('path');

// Helper to get absolute path from project root
const projectRoot = process.cwd();

const files = [
  // Module content files (1-8) – note: actual filenames may vary; we will check existence.
  'src/pages/modules/Module1Content.jsx',
  'src/pages/modules/Module2Content.jsx',
  'src/pages/modules/Module3Content.jsx',
  'src/pages/modules/Module4Content.jsx',
  'src/pages/modules/Module5Content.jsx',
  'src/pages/modules/Module6Content.jsx',
  'src/pages/modules/Module7Content.jsx',
  'src/pages/modules/Module8Content.jsx',
  // Stand‑alone pages
  'src/pages/About.jsx',
  'src/pages/Contact.jsx',
  'src/pages/PlatformFlow.jsx',
  'src/pages/QuizEngine.jsx',
  'src/pages/StudentReviews.jsx'
];

files.forEach(relPath => {
  const absPath = path.resolve(projectRoot, relPath);
  if (!fs.existsSync(absPath)) {
    console.warn(`⚠️ File not found: ${absPath}`);
    return;
  }
  let content = fs.readFileSync(absPath, 'utf8');

  // Skip if AdSlot already present
  if (content.includes('<AdSlot')) {
    console.log(`✅ Already updated: ${relPath}`);
    return;
  }

  const isModule = relPath.includes('/modules/');
  const importPrefix = isModule ? '../../' : '../';

  // 1. Add import statements after existing imports
  const importLines = [];
  if (!content.includes(`import AdSlot from '${importPrefix}components/AdSlot'`)) {
    importLines.push(`import AdSlot from '${importPrefix}components/AdSlot';`);
  }
  if (!content.includes(`import { useAuth } from '${importPrefix}context/AuthContext'`)) {
    importLines.push(`import { useAuth } from '${importPrefix}context/AuthContext';`);
  }
  if (importLines.length) {
    const lines = content.split(/\r?\n/);
    let lastImportIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (/^import\s/.test(lines[i])) lastImportIdx = i;
    }
    lines.splice(lastImportIdx + 1, 0, ...importLines);
    content = lines.join('\n');
  }

  // 2. Insert auth hook inside component body (arrow function)
  const componentStartRegex = /(const\s+\w+\s*=\s*\(\)\s*=>\s*{)/;
  if (componentStartRegex.test(content) && !content.includes('useAuth')) {
    content = content.replace(componentStartRegex, `$1\n  const { loading, profile } = useAuth();\n  const isPaidOrLoading = Boolean(loading || profile?.course_active);`);
  }

  // 3. Insert three AdSlot components at the top of the JSX return
  const adSlotJSX = `<>\n    <AdSlot slot="top728" isPaidUser={isPaidOrLoading} />\n    <AdSlot slot="mid320" isPaidUser={isPaidOrLoading} />\n    <AdSlot slot="nativeBottom" isPaidUser={isPaidOrLoading} />`;
  const returnFragmentRegex = /return\s*\(\s*<\s*>/;
  if (returnFragmentRegex.test(content)) {
    content = content.replace(returnFragmentRegex, `return ( ${adSlotJSX}`);
  } else {
    content = content.replace(/return\s*\(/, `return ( ${adSlotJSX}`);
  }

  // 4. Ensure closing fragment exists before final closing parenthesis
  if (!content.includes('</>')) {
    content = content.replace(/\)\s*;?\s*}\s*$/, `\n</>\n);\n}`);
  }

  fs.writeFileSync(absPath, content, 'utf8');
  console.log(`🛠️ Updated ${relPath}`);
});
