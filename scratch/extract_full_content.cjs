
const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\public\\assets\\modules\\module2\\MOSFETCMOS.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

function traverse(node) {
    if (node.nodeType === 3) { // Text node
        const text = node.textContent.trim();
        if (text) console.log(`TEXT: ${text}`);
    } else if (node.nodeType === 1) { // Element node
        if (node.tagName === 'IMG') {
            console.log(`IMAGE: ${node.getAttribute('src')}`);
        } else if (node.tagName === 'H1' || node.tagName === 'H2' || node.tagName === 'H3' || node.tagName === 'H4' || node.tagName === 'H5' || node.tagName === 'H6') {
            console.log(`${node.tagName}: ${node.textContent.trim()}`);
        }
        
        for (let child of node.childNodes) {
            traverse(child);
        }
    }
}

traverse(document.body);
