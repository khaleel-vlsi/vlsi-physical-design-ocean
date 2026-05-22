const fs = require('fs');
const path = require('path');

const sourceDirs = [
  path.join(__dirname, '..', 'module6_doc1_unzipped', 'images'),
  path.join(__dirname, '..', 'module6_doc2_unzipped', 'images'),
  path.join(__dirname, '..', 'module6_doc3_unzipped', 'images')
];
const targetDir = path.join(__dirname, '..', 'public', 'assets', 'modules', 'module6');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

let copied = 0;
sourceDirs.forEach(src => {
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(targetDir, file);
      // Only copy if not already present or size differs
      let shouldCopy = true;
      if (fs.existsSync(destPath)) {
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destPath);
        if (srcStat.size === destStat.size) {
          shouldCopy = false; // already identical
        }
      }
      if (shouldCopy) {
        fs.copyFileSync(srcPath, destPath);
        copied++;
        console.log(`Copied ${file}`);
      }
    });
  } else {
    console.warn(`Source directory missing: ${src}`);
  }
});

console.log(`Total images copied: ${copied}`);
