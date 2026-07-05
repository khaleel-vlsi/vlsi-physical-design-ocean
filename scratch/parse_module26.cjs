const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module26/InnovusPNR.html', 'utf8');
const $ = cheerio.load(html);

const lines = [];
$('body').find('p').each((i, el) => {
    lines.push($(el).text().replace(/\u00A0/g, ' ').trim());
});

console.log(`Total lines: ${lines.length}`);

const chapters = [];
let currentChapter = null;
let codeBuffer = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect headers that start with many # and followed by # [COLOR] NUMBER) TITLE or # NUMBER) TITLE
    if (line.match(/^#{60,}$/) && 
        i + 1 < lines.length && 
        lines[i+1].match(/^#\s*(?:\[[A-Z]+\]\s*)?(?:\([\dA-Z]+\)|\d+\))\s+.+/) ) {
        
        // Save previous chapter
        if (currentChapter) {
            currentChapter.code = codeBuffer.join('\n');
            chapters.push(currentChapter);
        }
        
        // Start new chapter
        const titleLine = lines[i+1];
        // Strip out the # and color tag to get the title
        let title = titleLine.replace(/^#\s*/, '').replace(/^\[[A-Z]+\]\s*/, '').trim();
        
        currentChapter = { id: 'ch_' + chapters.length, title: title };
        codeBuffer = [];
        
        codeBuffer.push(line);
        codeBuffer.push(lines[i+1]);
        
        i += 1;
        let j = i + 1;
        while(j < lines.length && (lines[j].match(/^#{60,}$/) || lines[j].startsWith('# Theory:') || lines[j].trim() === '')) {
             if (lines[j].trim() !== '') {
                 codeBuffer.push(lines[j]);
             }
             j++;
        }
        
        i = j - 1;
        continue;
    }
    
    if (currentChapter) {
        if (line || codeBuffer.length > 0) {
             codeBuffer.push(line);
        }
    } else if (line) {
        if (!currentChapter && line.match(/^#{60,}$/) === null) {
            currentChapter = { id: 'ch_intro', title: 'Introduction' };
            codeBuffer.push(line);
        } else if (currentChapter) {
            codeBuffer.push(line);
        }
    }
}

if (currentChapter) {
    currentChapter.code = codeBuffer.join('\n');
    chapters.push(currentChapter);
}

console.log(`Found ${chapters.length} chapters:`);
chapters.forEach(c => console.log(`  ${c.title} (${c.code.split('\n').length} lines of code)`));

// Generate the JS data
const finalData = chapters.map(c => ({
    id: c.id,
    title: c.title,
    html: `<pre class="commandBox"><code>${c.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
}));

const outputStr = `export const MODULE26_CHAPTERS = ${JSON.stringify(finalData, null, 2)};\n`;
fs.writeFileSync('src/data/module26Data.js', outputStr);
console.log('Saved to src/data/module26Data.js');
