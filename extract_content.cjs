const fs = require('fs');
const path = require('path');
// Use absolute path to project's cheerio
const cheerio = require('./node_modules/cheerio');

const htmlPath = 'c:\\Users\\priya\\vlsi-physical-design-ocean\\temp_MOSFETCMOS\\MOSFETCMOS.html';
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const output = [];

$('.doc-content').children().each((i, el) => {
    const $el = $(el);
    const tagName = el.tagName.toLowerCase();

    if (tagName === 'hr') {
        output.push({ type: 'hr' });
        return;
    }

    if (tagName === 'table') {
        output.push({ type: 'table', content: $el.html() });
        return;
    }

    const imgs = $el.find('img');
    imgs.each((j, img) => {
        const $img = $(img);
        output.push({ 
            type: 'img', 
            src: $img.attr('src'), 
            alt: $img.attr('alt'), 
            title: $img.attr('title'), 
            style: $img.attr('style') 
        });
    });

    const text = $el.text().trim();
    if (text) {
        output.push({ 
            type: tagName, 
            text: text, 
            className: $el.attr('class'), 
            id: $el.attr('id'),
            html: $el.html()
        });
    }
});

const outputPath = 'extracted_content.json';
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log('Extracted ' + output.length + ' items to ' + outputPath);
