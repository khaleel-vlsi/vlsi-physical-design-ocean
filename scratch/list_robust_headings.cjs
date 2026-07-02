const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust.json', 'utf8'));

console.log(`Found ${parsed.length} raw scripts.`);
console.log('Sample titles:');
parsed.slice(0, 30).forEach((s, idx) => {
    console.log(`${idx+1}: "${s.title}"`);
});

// Let's filter to see how many match the '# Script [Number]' pattern
const realScriptMatches = parsed.filter(s => /^Script\s+\d+/i.test(s.title) || /^#\s*Script\s+\d+/i.test(s.title));
console.log(`\nFiltered down to ${realScriptMatches.length} matching 'Script [Number]' pattern.`);
console.log('Filtered titles:');
realScriptMatches.forEach((s, idx) => {
    console.log(`${idx+1}: "${s.title}"`);
});
