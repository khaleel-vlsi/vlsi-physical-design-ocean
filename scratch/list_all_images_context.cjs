
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const regex = /<img[^>]+src="([^">]+)"/g;
let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
    const textAround = content.substring(match.index - 300, match.index + 300).replace(/<[^>]+>/g, ' ');
    console.log(count, match[1], 'CONTEXT:', textAround.trim().substring(0, 500));
    count++;
}
