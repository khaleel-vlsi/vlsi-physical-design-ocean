
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html';
const html = fs.readFileSync(filePath, 'utf8');

// Use a simple regex-based parser for this specific HTML
const content = [];

// Helper to clean text
function cleanText(text) {
    return text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Split by tags but keep the tags
const tags = html.match(/<(h[1-4]|p|ul|ol|hr|img)[^>]*>|[^<]+/g);

let inList = false;
let currentList = null;

if (tags) {
    tags.forEach(tag => {
        if (tag.startsWith('<h1')) {
            content.push({ type: 'h1', text: cleanText(tag + html.substring(html.indexOf(tag) + tag.length, html.indexOf('</h1>', html.indexOf(tag)))) });
        } else if (tag.startsWith('<h2')) {
            content.push({ type: 'h2', text: cleanText(tag + html.substring(html.indexOf(tag) + tag.length, html.indexOf('</h2>', html.indexOf(tag)))) });
        } else if (tag.startsWith('<h3')) {
            content.push({ type: 'h3', text: cleanText(tag + html.substring(html.indexOf(tag) + tag.length, html.indexOf('</h3>', html.indexOf(tag)))) });
        } else if (tag.startsWith('<p')) {
            // Find the end of this p tag
            const pContent = html.substring(html.indexOf(tag), html.indexOf('</p>', html.indexOf(tag)) + 4);
            
            // Check for images inside p
            const imgMatch = pContent.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
                content.push({ type: 'img', src: imgMatch[1].replace('images/', '/assets/modules/mosfetcmos/') });
            }
            
            const text = cleanText(pContent);
            if (text) {
                content.push({ type: 'p', text });
            }
        } else if (tag.startsWith('<li')) {
            const liContent = html.substring(html.indexOf(tag), html.indexOf('</li>', html.indexOf(tag)) + 5);
            content.push({ type: 'li', text: cleanText(liContent) });
        } else if (tag.startsWith('<hr')) {
            content.push({ type: 'hr' });
        }
    });
}

// deduplicate and refine
const refinedContent = [];
let lastText = '';
content.forEach(item => {
    if (item.text === lastText && item.type !== 'img' && item.type !== 'hr') return;
    refinedContent.push(item);
    if (item.text) lastText = item.text;
});

fs.writeFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\scratch\\mosfet_refined.json', JSON.stringify(refinedContent, null, 2));
console.log(`Extracted ${refinedContent.length} items`);
