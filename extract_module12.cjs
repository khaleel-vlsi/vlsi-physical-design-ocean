const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const html = fs.readFileSync('scratch/module12/inputs.html', 'utf8');
const $ = cheerio.load(html);

// Remove scripts, styles, meta, etc.
$('script, style, meta, link').remove();

const content = [];
let currentHeading = null;
let currentHeadingLevel = 0;
let currentSectionContent = [];
let imgCounter = 1;

const escapeJsx = (str) => {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
};

const cleanHtml = (htmlStr) => {
    if (!htmlStr) return '';
    return htmlStr
        .replace(/style="[^"]*"/gi, '')
        .replace(/class="[^"]*"/gi, '')
        .replace(/<span[^>]*>/gi, '')
        .replace(/<\/span>/gi, '')
        .replace(/<div[^>]*>/gi, '<div>')
        .replace(/<p><\/p>/gi, '')
        .replace(/<br\s*\/?>/gi, '<br />')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${');
};

const finalizeSection = () => {
    if (currentHeading && currentSectionContent.length > 0) {
        content.push({
            type: 'section',
            level: currentHeadingLevel,
            title: escapeJsx(currentHeading),
            body: cleanHtml(currentSectionContent.join('')),
            id: currentHeading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        });
    }
};

$('body').children().each((i, el) => {
    const $el = $(el);
    const tagName = el.name ? el.name.toLowerCase() : '';

    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3') {
        finalizeSection();
        currentHeading = $el.text().trim();
        currentHeadingLevel = parseInt(tagName.replace('h', ''), 10);
        currentSectionContent = [];
    } else {
        // Handle images
        const $imgs = $el.find('img');
        if ($el.is('img')) $imgs.push(el);

        if ($imgs.length > 0) {
            $imgs.each((j, img) => {
                const src = $(img).attr('src');
                if (src && src.startsWith('images/')) {
                    const filename = path.basename(src);
                    
                    // Don't inject inside the HTML array, put it as a dedicated image block
                    if (currentHeading) {
                        content.push({
                            type: 'image',
                            src: `/assets/modules/module12/${filename}`,
                            alt: `Module 12 Graphic ${imgCounter}`
                        });
                        imgCounter++;
                    }
                }
            });
            // Strip images from the HTML to avoid duplication since we handle them as blocks
            $el.find('img').remove();
            if ($el.is('img')) return; // Skip if the element itself was just the image
        }

        if (currentHeading) {
            let htmlContent = $.html($el).trim();
            if (htmlContent && htmlContent !== '<p></p>' && htmlContent !== '<div></div>') {
                currentSectionContent.push(htmlContent);
            }
        }
    }
});

finalizeSection();

fs.writeFileSync('extracted_content_module12.json', JSON.stringify(content, null, 2));
console.log(`Extracted ${content.length} sections and images. Saved to extracted_content_module12.json`);
