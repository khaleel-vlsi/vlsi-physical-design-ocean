const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docs = [
    { name: 'Intro', path: 'module6_doc1_unzipped/LogicalSynthesis1.html', assetPrefix: 'doc1_' },
    { name: 'DC', path: 'module6_doc2_unzipped/DCsythesisexicution.html', assetPrefix: 'doc2_' },
    { name: 'Genus', path: 'module6_doc3_unzipped/genussynthesisstepbystepexicution.html', assetPrefix: 'doc3_' }
];

function extractFile(doc) {
    const html = fs.readFileSync(doc.path, 'utf8');
    const $ = cheerio.load(html);
    const content = [];

    $('body').children().each((index, element) => {
        const tagName = element.tagName.toLowerCase();
        const $el = $(element);

        // Extract Images if they are present anywhere in this element
        const images = $el.find('img');
        if (images.length > 0 && tagName !== 'table') {
            images.each((i, img) => {
                let src = $(img).attr('src');
                if (src) {
                    content.push({
                        type: 'img',
                        src: `assets/modules/module6/${doc.assetPrefix}${path.basename(src)}`,
                        alt: $(img).attr('alt') || ''
                    });
                }
            });
            // If the element only contained an image (common for center-aligned images in Google Docs)
            if ($el.text().trim() === '' && $el.find('img').length === $el.children().length) {
                return; 
            }
        }

        // Extract Headings
        if (/^h[1-6]$/.test(tagName)) {
            content.push({
                type: tagName,
                text: `[${doc.name}] ${$el.text().trim()}`,
                id: $el.attr('id') || `h-${doc.name}-${index}`,
                html: $el.html()
            });
        }
        // Extract Paragraphs
        else if (tagName === 'p') {
            const text = $el.text().trim();
            if (text) {
                // Check if it's a code block (green text in legacy)
                const isCode = $el.find('span').toArray().some(span => {
                    const style = $(span).attr('style') || '';
                    return style.includes('color: #00ff00') || style.includes('color: #00b050');
                });

                content.push({
                    type: isCode ? 'code' : 'p',
                    text: text,
                    html: $el.html(),
                    className: $el.attr('class')
                });
            }
        }
        // Extract Lists
        else if (tagName === 'ul' || tagName === 'ol') {
            content.push({
                type: tagName,
                html: $el.html()
            });
        }
        // Extract Tables
        else if (tagName === 'table') {
            content.push({
                type: 'table',
                html: $el.html()
            });
        }
        else if (tagName === 'hr') {
            content.push({ type: 'hr' });
        }
    });

    return content;
}

let allContent = [];
docs.forEach(doc => {
    allContent = allContent.concat(extractFile(doc));
});

fs.writeFileSync('extracted_content_module6.json', JSON.stringify(allContent, null, 2));
console.log('Extracted content from 3 documents into extracted_content_module6.json');
