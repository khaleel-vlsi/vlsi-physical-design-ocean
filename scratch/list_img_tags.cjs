
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const regex = /<img[^>]*>/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null && count < 10) {
    console.log(count, match.index, match[0]);
    count++;
}
