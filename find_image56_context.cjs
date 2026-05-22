const fs = require('fs');

const htmlPath = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const index = html.indexOf('image56.png');
if (index !== -1) {
    console.log('Found image56.png at index ' + index);
    console.log('Surrounding text: ' + html.substring(index - 500, index + 500));
} else {
    console.log('image56.png not found');
}
