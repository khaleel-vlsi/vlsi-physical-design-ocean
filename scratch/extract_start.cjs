
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const bodyStart = content.indexOf('<body');
const first2000 = content.substring(bodyStart, bodyStart + 2000);
console.log(first2000.replace(/<style[^>]*>.*?<\/style>/gs, '').replace(/<[^>]+>/g, (m) => m.startsWith('<img') ? m : ' '));
