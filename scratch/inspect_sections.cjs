const fs = require('fs');
const parsed = JSON.parse(fs.readFileSync('scratch/tcl_parsed.json', 'utf8'));

parsed.forEach((script, idx) => {
    console.log(`\nScript ${idx+1}: ${script.title}`);
    script.sections.forEach(sec => {
        console.log(`  - Section: "${sec.title}" (${sec.headingType}) with ${sec.items.length} items`);
    });
});
