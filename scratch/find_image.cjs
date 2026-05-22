
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const index = content.indexOf('image1.png');
if (index !== -1) {
    console.log(content.substring(index - 500, index + 500));
} else {
    console.log('Not found');
}
