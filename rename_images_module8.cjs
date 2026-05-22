const fs = require('fs');
const path = require('path');

const dir = 'public/assets/modules/module8';
fs.readdirSync(dir).forEach(file => {
    if (file.startsWith('image') && !file.startsWith('image_')) {
        const num = file.match(/\d+/)[0];
        const newName = `image_${num}.png`;
        fs.renameSync(path.join(dir, file), path.join(dir, newName));
        console.log(`Renamed ${file} to ${newName}`);
    }
});
