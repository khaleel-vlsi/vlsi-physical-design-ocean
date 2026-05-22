
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const bodyStart = content.indexOf('<body');
const index = content.toLowerCase().indexOf('family', bodyStart);
if (index !== -1) {
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 200);
    console.log(content.substring(start, end));
} else {
    console.log('Not found in body');
}
