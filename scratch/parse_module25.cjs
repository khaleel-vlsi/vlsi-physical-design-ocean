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
    
    // Detect headers like:
    // ############################
    // # (0) BASIC SETUP (EDIT ONCE)
    // ############################
    if (line.startsWith('############################') && 
        i + 2 < lines.length && 
        lines[i+1].startsWith('# (') && 
        lines[i+2].startsWith('############################')) {
        
        // Save previous chapter
        if (currentChapter) {
            currentChapter.code = codeBuffer.join('\n');
            chapters.push(currentChapter);
        }
        
        // Start new chapter
        const title = lines[i+1].replace('#', '').trim();
        currentChapter = { id: 'ch_' + chapters.length, title: title };
        codeBuffer = [];
        i += 2; // skip the next two lines
        continue;
    }
    
    if (currentChapter) {
        if (line || codeBuffer.length > 0) { // don't add leading empty lines
             codeBuffer.push(line);
        }
    } else if (line) {
        // Before first chapter, put in an "Intro"
        if (!currentChapter) {
            currentChapter = { id: 'ch_intro', title: 'Introduction' };
        }
        codeBuffer.push(line);
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

