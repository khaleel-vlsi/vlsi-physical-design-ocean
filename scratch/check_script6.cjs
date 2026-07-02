const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync('scratch/tcl_parsed.json', 'utf8'));

const script6 = parsed[5];
const industryNote = script6.sections.find(s => s.title === 'Industry Note');

if (industryNote) {
    console.log(`Industry Note has ${industryNote.items.length} items.`);
    // Print the first 5 items
    console.log('First 5 items:');
    console.log(JSON.stringify(industryNote.items.slice(0, 5), null, 2));
    
    // Print the last 5 items
    console.log('Last 5 items:');
    console.log(JSON.stringify(industryNote.items.slice(-5), null, 2));
    
    // Check type distribution
    const types = {};
    industryNote.items.forEach(item => {
        types[item.type] = (types[item.type] || 0) + 1;
    });
    console.log('Type distribution:', types);
} else {
    console.log('Industry Note section not found!');
}
