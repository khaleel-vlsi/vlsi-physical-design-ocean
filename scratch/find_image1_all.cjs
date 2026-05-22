
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const regex = /images\/image1\.png/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log('Found at:', match.index);
}
