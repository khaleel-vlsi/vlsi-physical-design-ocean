
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const index = 152815;
const start = Math.max(0, index - 500);
const end = Math.min(content.length, index + 500);
console.log(content.substring(start, end));
