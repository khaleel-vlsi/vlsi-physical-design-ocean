const fs = require('fs');
const html = fs.readFileSync('temp_MOSFETCMOS/MOSFETCMOS.html', 'utf8');

// Regex to find images and their preceding text
const imgRegex = /([^>]{0,100})<img[^>]+src="([^"]+)"[^>]*>/g;
let match;
const results = [];
while ((match = imgRegex.exec(html)) !== null) {
    results.push({
        context: match[1],
        src: match[2]
    });
    if (results.length >= 10) break;
}

console.log(JSON.stringify(results, null, 2));
