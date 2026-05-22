
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const regex = /<img[^>]+src="([^">]+)"/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null && count < 30) {
    const textBefore = content.substring(match.index - 100, match.index);
    console.log(count, match[1], 'TEXT BEFORE:', textBefore.replace(/<[^>]+>/g, '').trim());
    count++;
}
