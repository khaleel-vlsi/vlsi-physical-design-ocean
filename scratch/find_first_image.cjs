
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const bodyStart = content.indexOf('<body');
const firstImage = content.indexOf('<img', bodyStart);
if (firstImage !== -1) {
    console.log('First image found at:', firstImage);
    console.log(content.substring(firstImage - 200, firstImage + 200));
} else {
    console.log('No image found');
}
