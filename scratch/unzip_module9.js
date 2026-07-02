import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const zipPath = 'C:/Users/priya/Downloads/STA.zip';
const destPath = 'tmp/module9';

try {
  if (!fs.existsSync(zipPath)) {
    console.error(`Zip file not found at: ${zipPath}`);
    process.exit(1);
  }
  
  console.log(`Unzipping ${zipPath} to ${destPath}...`);
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(destPath, true);
  console.log('Unzip completed successfully!');
  
  // List files
  const files = fs.readdirSync(destPath);
  console.log('Files in dest directory:', files);
  
  if (fs.existsSync(path.join(destPath, 'images'))) {
    const images = fs.readdirSync(path.join(destPath, 'images'));
    console.log(`Found ${images.length} images in images directory.`);
  }
} catch (err) {
  console.error('Failed to unzip:', err);
}
