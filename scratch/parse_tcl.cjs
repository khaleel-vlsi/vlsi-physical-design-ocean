const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scratch/all_tcl_scripts/ALLTCLSCRIPTS.html', 'utf8');
const $ = cheerio.load(html);

const scripts = [];
let currentScript = null;
let currentSection = null;

// Standard container in Google Doc HTML is usually body or a div inside it
$('body').children().each((i, el) => {
    const $el = $(el);
    const tagName = el.tagName.toLowerCase();
    
    // Ignore empty paragraphs
    if (tagName === 'p' && $el.text().trim() === '') {
        return;
    }

    if (tagName === 'h1') {
        const title = $el.text().trim();
        if (title) {
            currentScript = {
                title: title,
                sections: []
            };
            scripts.push(currentScript);
            currentSection = null;
        }
        return;
    }

    if (!currentScript) return; // Haven't encountered first h1 yet

    if (tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
        const secTitle = $el.text().trim();
        currentSection = {
            headingType: tagName,
            title: secTitle,
            items: []
        };
        currentScript.sections.push(currentSection);
        return;
    }

    if (!currentSection) {
        // If there's content before any h2/h3 heading, create an implicit section
        currentSection = {
            headingType: 'div',
            title: 'Intro',
            items: []
        };
        currentScript.sections.push(currentSection);
    }

    // Process list items, tables, paragraphs, code blocks
    if (tagName === 'ul' || tagName === 'ol') {
        const listItems = [];
        $el.find('li').each((j, li) => {
            listItems.push($(li).text().trim());
        });
        currentSection.items.push({
            type: 'list',
            listType: tagName,
            items: listItems,
            html: $el.html()
        });
    } else if (tagName === 'table') {
        currentSection.items.push({
            type: 'table',
            html: $el.html()
        });
    } else {
        // Paragraph or others
        // Let's identify if it is a code block
        // In Google Doc HTML, code paragraphs often have specific inline styles (e.g. Courier New or Consolas or background, or they are within pre)
        const text = $el.text().trim();
        const style = $el.attr('style') || '';
        const hasMono = style.includes('Courier New') || style.includes('Consolas') || style.includes('monospace') || 
                        $el.find('span').toArray().some(span => {
                            const spanStyle = $(span).attr('style') || '';
                            return spanStyle.includes('Courier New') || spanStyle.includes('Consolas') || spanStyle.includes('monospace');
                        });

        currentSection.items.push({
            type: hasMono ? 'code' : 'p',
            text: text,
            html: $el.html()
        });
    }
});

fs.writeFileSync('scratch/tcl_parsed.json', JSON.stringify(scripts, null, 2));
console.log(`Parsed ${scripts.length} scripts to scratch/tcl_parsed.json`);
