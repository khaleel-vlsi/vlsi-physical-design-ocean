const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/all_tcl_scripts/ALLTCLSCRIPTS.html', 'utf8');
const $ = cheerio.load(html);

const scripts = [];
let currentScript = null;
let currentSection = null;

const createScript = (title) => {
    currentScript = {
        title: title,
        sections: []
    };
    scripts.push(currentScript);
    currentSection = null;
};

const createSection = (title, headingType) => {
    currentSection = {
        headingType: headingType,
        title: title,
        items: []
    };
    currentScript.sections.push(currentSection);
};

const addListItem = (listText, listType, listHtml) => {
    if (!currentSection) createSection('Intro', 'div');
    
    // Merge consecutive list items of same type
    const lastItem = currentSection.items[currentSection.items.length - 1];
    if (lastItem && lastItem.type === 'list' && lastItem.listType === listType) {
        lastItem.items.push(listText);
        lastItem.html += listHtml;
    } else {
        currentSection.items.push({
            type: 'list',
            listType: listType,
            items: [listText],
            html: listHtml
        });
    }
};

const addParagraphOrCode = (text, html, style = '', className = '') => {
    if (!currentSection) createSection('Intro', 'div');

    const hasMono = style.includes('Courier New') || style.includes('Consolas') || style.includes('monospace') || style.includes('Roboto Mono') ||
                    html.includes('Courier New') || html.includes('Consolas') || html.includes('monospace') || html.includes('Roboto Mono');

    currentSection.items.push({
        type: hasMono ? 'code' : 'p',
        text: text,
        html: html
    });
};

// Traversal of all children in body
$('body').children().each((i, el) => {
    const $el = $(el);
    const tagName = el.tagName.toLowerCase();
    const text = $el.text().trim();
    const style = $el.attr('style') || '';
    const className = $el.attr('class') || '';
    const htmlContent = $el.html() || '';

    // Ignore empty paragraphs
    if (tagName === 'p' && text === '') {
        return;
    }

    // Check Script Headings
    const isScriptHeading = (tagName === 'h1' && /Script\s+\d+/i.test(text)) || 
                            (tagName === 'p' && /^#\s*Script\s+\d+/i.test(text));
    
    if (isScriptHeading) {
        let cleanTitle = text;
        if (cleanTitle.startsWith('#')) {
            cleanTitle = cleanTitle.replace(/^#\s*/, '');
        }
        createScript(cleanTitle);
        return;
    }

    // Check Section Headings
    const isH2 = (tagName === 'h2') || (tagName === 'p' && /^##\s+/i.test(text));
    const isH3 = (tagName === 'h3') || (tagName === 'p' && /^###\s+/i.test(text));
    const isH4 = (tagName === 'h4') || (tagName === 'p' && /^####\s+/i.test(text));

    if (isH2 || isH3 || isH4) {
        if (currentScript) {
            let cleanSecTitle = text;
            if (cleanSecTitle.startsWith('##')) {
                cleanSecTitle = cleanSecTitle.replace(/^##+\s*/, '');
            }
            createSection(cleanSecTitle, isH2 ? 'h2' : (isH3 ? 'h3' : 'h4'));
        }
        return;
    }

    // Process lists and tables
    if (tagName === 'ul' || tagName === 'ol') {
        if (currentScript) {
            $el.find('li').each((j, li) => {
                addListItem($(li).text().trim(), tagName, $(li).html());
            });
        }
        return;
    }

    if (tagName === 'table') {
        if (currentScript) {
            if (!currentSection) createSection('Intro', 'div');
            currentSection.items.push({
                type: 'table',
                html: htmlContent
            });
        }
        return;
    }

    // Standard paragraph or code
    if (currentScript) {
        addParagraphOrCode(text, htmlContent, style, className);
    }
});

// Filter out empty scripts
const cleanedScripts = scripts.filter(s => s.title && s.title.length > 0);

fs.writeFileSync('scratch/tcl_parsed_robust_clean.json', JSON.stringify(cleanedScripts, null, 2));
console.log(`Parsed ${cleanedScripts.length} scripts to scratch/tcl_parsed_robust_clean.json`);
