const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'module5_unzipped/RTL.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const content = [];
const seenImages = new Set();

const processNode = (node) => {
    const $node = $(node);
    const type = node.type; // 'tag', 'text', etc.
    const name = node.name; // 'p', 'div', etc.

    if (type === 'text') {
        const text = $node.text().trim();
        if (text) {
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
                content.push({ type: name, text, id: $node.attr('id') || `h-${Math.random().toString(36).substr(2, 9)}`, html: $node.html() });
            }
            // Check for images inside headings (common for formula images)
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
            // For lists, we usually want to keep them as blocks unless they contain images
            const hasImages = $node.find('img').length > 0;
            if (hasImages) {
                // If it has images, we might need to break it down or just handle them
                // For now, let's just pull images out and then push the list
                $node.find('img').each((i, img) => {
                    const src = $(img).attr('src');
                    if (src && !seenImages.has(src)) {
                        content.push({ type: 'img', src, alt: $(img).attr('alt') });
                        seenImages.add(src);
                    }
                });
                const $clone = $node.clone();
                $clone.find('img').remove();
                content.push({ type: name, html: $clone.html() });
            } else {
                content.push({ type: name, html: $node.html() });
            }
            return;
        }

        // For p, div, span, we check if they contain images or other block elements
        if (['p', 'div', 'span'].includes(name)) {
            const hasTags = $node.children().length > 0;
            const hasImages = $node.find('img').length > 0;
            const text = $node.text().trim();

            if (hasImages) {
                // RECURSE into children to maintain order
                $node.contents().each((i, child) => processNode(child));
            } else if (text) {
                // Check if it's a pseudo-heading
                const isBold = $node.find('b, strong, span[style*="font-weight: 700"], span[style*="font-weight:700"]').length > 0;
                if (isBold && text.length < 60 && !text.includes('.') && text.length > 5) {
                    content.push({ type: 'h4', text, html: $node.html() });
                } else {
                    content.push({ type: 'p', text, html: $node.html() });
                }
            }
            return;
        }

        // Default: recurse into children
        $node.contents().each((i, child) => processNode(child));
    }
};

// Start from body contents
$('body').contents().each((i, node) => processNode(node));

// Final pass: filter out duplicates and empty items
const finalContent = content.filter((item, index) => {
    if (item.type === 'p' && (!item.text || item.text.trim() === '')) return false;
    return true;
});

fs.writeFileSync('extracted_content_module5.json', JSON.stringify(finalContent, null, 2));
console.log(`Extracted ${finalContent.length} items to extracted_content_module5.json using Deep Walker.`);
