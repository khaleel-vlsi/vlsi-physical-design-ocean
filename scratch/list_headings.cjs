
const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html', 'utf8');
const regex = /<(h[1-3])[^>]*id="([^"]+)"[^>]*>(.*?)<\/\1>/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(match[1], match[2], match[3].replace(/<[^>]+>/g, '').trim());
}
