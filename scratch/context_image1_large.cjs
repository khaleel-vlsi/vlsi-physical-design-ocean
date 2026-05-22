
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const index = content.indexOf('image1.png');
if (index !== -1) {
    const start = Math.max(0, index - 1000);
    const end = Math.min(content.length, index + 500);
    console.log(content.substring(start, end));
}
