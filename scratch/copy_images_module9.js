import fs from 'fs-extra';
import path from 'path';

const srcDir = 'tmp/module9/images';
const destDir = 'public/assets/modules/module9';

try {
  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory does not exist: ${srcDir}`);
    process.exit(1);
  }
  
  fs.ensureDirSync(destDir);
  fs.copySync(srcDir, destDir);
  console.log('Successfully copied all images!');
  
  const destFiles = fs.readdirSync(destDir);
  console.log(`Dest directory contains ${destFiles.length} files:`, destFiles);
} catch (err) {
  console.error('Failed to copy images:', err);
}
