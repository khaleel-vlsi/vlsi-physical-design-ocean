const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'module8_proper_unzipped/PhysicalSynthesis.html';
if (!fs.existsSync(htmlPath)) {
    console.error(`Error: ${htmlPath} not found.`);
    process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const content = [];
const seenImages = new Set();

// Extract images globally first to ensure we don't miss them due to recursion limits
const globalImages = [];
$('img').each((i, el) => {
    const src = $(el).attr('src');
    if (src) globalImages.push({ src, alt: $(el).attr('alt'), node: el });
});

const processNode = (node) => {
    const $node = $(node);
    const type = node.type;
    const name = node.name;

    if (type === 'text') {
        const text = $node.text().trim();
        if (text && text.length > 0) {
            const parentName = node.parent ? node.parent.name : null;
            if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th'].includes(parentName)) {
                return;
            }
            content.push({ type: 'p', text, html: text });
        }
        return;
    }

    if (type === 'tag') {
        if (name === 'img') {
            const src = $node.attr('src');
            if (src && !seenImages.has(src)) {
                content.push({ type: 'img', src, alt: $node.attr('alt') });
                seenImages.add(src);
            }
            return;
        }

        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
            const text = $node.text().trim();
            if (text) {
                content.push({ 
                    type: name, 
                    text, 
                    id: $node.attr('id') || `h-${Math.random().toString(36).substr(2, 9)}`, 
                    html: $node.html() 
                });
            }
            // Check for images inside headers
            $node.find('img').each((i, img) => {
                const src = $(img).attr('src');
                if (src && !seenImages.has(src)) {
                    content.push({ type: 'img', src, alt: $(img).attr('alt') });
                    seenImages.add(src);
                }
            });
            return;
        }

        if (name === 'hr') {
            content.push({ type: 'hr' });
            return;
        }

        if (name === 'table') {
            content.push({ type: 'table', content: $node.html() });
            return;
        }

        if (name === 'ul' || name === 'ol') {
            content.push({ type: name, html: $node.html() });
            return;
        }

        const className = $node.attr('class') || '';
        if (name === 'p') {
            // Check for images inside paragraph first
            $node.find('img').each((i, img) => {
                const src = $(img).attr('src');
                if (src && !seenImages.has(src)) {
                    content.push({ type: 'img', src, alt: $(img).attr('alt') });
                    seenImages.add(src);
                }
            });

            const text = $node.text().trim();
            if (text) {
                content.push({ 
                    type: 'p', 
                    text, 
                    html: $node.html(),
                    className: className 
                });
            }
            return;
        }

        // For other divs and containers, recurse
        $node.contents().each((i, child) => processNode(child));
    }
};

$('body').contents().each((i, node) => processNode(node));

// Final pass: filter out duplicates and empty items
const finalContent = content.filter(item => {
    if (item.type === 'p' && (!item.text || item.text.trim() === '')) return false;
    return true;
});

fs.writeFileSync('extracted_content_module8.json', JSON.stringify(finalContent, null, 2));
console.log(`Extracted ${finalContent.length} items to extracted_content_module8.json.`);
