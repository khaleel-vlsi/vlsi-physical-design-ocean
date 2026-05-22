
const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\public\\assets\\modules\\module2\\MOSFETCMOS.html', 'utf8');

// Simple regex to extract text and image tags
const regex = /<(h[1-6]|p|img|li)[^>]*>(.*?)<\/\1>|<img[^>]+src="([^"]+)"[^>]*>/gi;

let match;
while ((match = regex.exec(html)) !== null) {
    const tag = (match[1] || 'IMG').toUpperCase();
    const content = match[2] ? match[2].replace(/<[^>]+>/g, '').trim() : '';
    const imgSrc = match[3];

    if (imgSrc) {
        console.log(`IMAGE: ${imgSrc}`);
    } else if (content) {
        console.log(`${tag}: ${content}`);
    }
}
