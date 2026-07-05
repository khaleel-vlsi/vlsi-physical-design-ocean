const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scratch/module25/STEPBYSTEPPNREXECUTIONINICC2TOOL.html', 'utf8');
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
    
    // Detect headers that start with many # and followed by # (NUMBER) TITLE
    if (line.match(/^#{10,}$/) && 
        i + 1 < lines.length && 
        lines[i+1].match(/^#\s*\([\dA-Z]+\)\s+.+/) ) {
        
        // Save previous chapter
        if (currentChapter) {
            currentChapter.code = codeBuffer.join('\n');
            chapters.push(currentChapter);
        }
        
        // Start new chapter
        const titleMatch = lines[i+1].match(/^#\s*(\([\dA-Z]+\)\s+.+)/);
        const title = titleMatch ? titleMatch[1].trim() : lines[i+1].replace('#', '').trim();
        currentChapter = { id: 'ch_' + chapters.length, title: title };
        codeBuffer = [];
        
        // We might want to include the header itself in the code buffer or skip it.
        // Let's include the header in the code buffer so it looks like the raw file.
        codeBuffer.push(line);
        codeBuffer.push(lines[i+1]);
        
        i += 1;
        // See if the next line is also ########
        let j = i + 1;
        while(j < lines.length && (lines[j].match(/^#{10,}$/) || lines[j].startsWith('# Theory:'))) {
             codeBuffer.push(lines[j]);
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
        // Before first chapter, put in an "Intro"
        if (!currentChapter && line.match(/^#{10,}$/) === null) {
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

const outputStr = `export const MODULE25_CHAPTERS = ${JSON.stringify(finalData, null, 2)};\n`;
fs.writeFileSync('src/data/module25Data.js', outputStr);
console.log('Saved to src/data/module25Data.js');
