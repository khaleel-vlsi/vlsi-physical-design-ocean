const fs = require('fs');
const path = require('path');

const assetDir = 'public/assets/modules/module1';
const backupDir = 'public/assets/modules/module1_backup';

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// First, copy all files to backup
const files = fs.readdirSync(assetDir);
files.forEach(file => {
    if (file.endsWith('.png')) {
        fs.copyFileSync(path.join(assetDir, file), path.join(backupDir, file));
    }
});

const mapping = {
  "image_1.png": "image_32.png",
  "image_2.png": "image_8.png",
  "image_3.png": "image_4.png",
  "image_4.png": "image_9.png",
  "image_5.png": "image_17.png",
  "image_6.png": "image_27.png",
  "image_7.png": "image_12.png",
  "image_8.png": "image_3.png",
  "image_9.png": "image_1.png",
  "image_10.png": "image_20.png",
  "image_11.png": "image_19.png",
  "image_12.png": "image_22.png",
  "image_13.png": "image_18.png",
  "image_14.png": "image_11.png",
  "image_15.png": "image_31.png",
  "image_16.png": "image_10.png",
  "image_17.png": "image_30.png",
  "image_18.png": "image_28.png",
  "image_19.png": "image_26.png",
  "image_20.png": "image_16.png",
  "image_21.png": "image_23.png",
  "image_22.png": "image_6.png",
  "image_23.png": "image_2.png",
  "image_24.png": "image_21.png",
  "image_25.png": "image_14.png",
  "image_26.png": "image_24.png",
  "image_27.png": "image_13.png",
  "image_28.png": "image_15.png",
  "image_29.png": "image_29.png",
  "image_30.png": "image_25.png",
  "image_31.png": "image_5.png",
  "image_32.png": "image_7.png"
};

// Clear the directory (except backup)
files.forEach(file => {
    if (file.endsWith('.png')) {
        fs.unlinkSync(path.join(assetDir, file));
    }
});

// Copy back with new names
for (const [oldName, newName] of Object.entries(mapping)) {
    const srcPath = path.join(backupDir, oldName);
    const dstPath = path.join(assetDir, newName);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, dstPath);
        console.log(`Renamed ${oldName} to ${newName}`);
    } else {
        console.warn(`Source file ${oldName} not found in backup!`);
    }
}

console.log('Renaming complete.');
