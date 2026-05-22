const fs = require('fs');
const cheerio = require('cheerio');

const linuxHtmlPath = 'module4_linux_unzipped/LinuxTCL.html';
const tclHtmlPath = 'module4_tcl_unzipped/TCL.html';

const extractFile = (path, prefix) => {
    const html = fs.readFileSync(path, 'utf8');
    const $ = cheerio.load(html);
    const content = [];
    const seenImages = new Set();

    // Identify classes that use Roboto Mono (usually commands)
    const monoClasses = [];
    const styleTags = $('style').text();
    const monoMatches = styleTags.match(/\.([a-z0-9]+)\{[^}]*Roboto Mono[^}]*\}/g) || [];
    monoMatches.forEach(m => {
        const match = m.match(/\.([a-z0-9]+)\{/);
        if (match) monoClasses.push(match[1]);
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
                        text: (prefix ? `[${prefix}] ` : '') + text, 
                        id: $node.attr('id') || `h-${Math.random().toString(36).substr(2, 9)}`, 
                        html: $node.html() 
                    });
                }
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
                // Check if this paragraph is entirely a command (common in Google Docs export)
                const isMono = monoClasses.some(c => className.includes(c)) || $node.find('span').toArray().some(span => {
                    const spanClass = $(span).attr('class') || '';
                    return monoClasses.some(c => spanClass.includes(c));
                });

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
                        type: isMono ? 'code' : 'p', 
                        text, 
                        html: $node.html(),
                        className: className 
                    });
                }
                return;
            }

            $node.contents().each((i, child) => processNode(child));
        }
    };

    $('body').contents().each((i, node) => processNode(node));
    return content;
};

const linuxContent = extractFile(linuxHtmlPath, 'Linux');
const tclContent = extractFile(tclHtmlPath, 'TCL');

// Combine: Linux first, then TCL
const combinedContent = [...linuxContent, ...tclContent];

fs.writeFileSync('extracted_content_module4.json', JSON.stringify(combinedContent, null, 2));
console.log(`Extracted ${combinedContent.length} items to extracted_content_module4.json.`);
