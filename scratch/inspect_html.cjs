const fs = require('fs');
const cheerio = require('cheerio');

const docs = [
    'module6_doc1_unzipped/LogicalSynthesis1.html',
    'module6_doc2_unzipped/DCsythesisexicution.html',
    'module6_doc3_unzipped/genussynthesisstepbystepexicution.html'
];

docs.forEach(doc => {
    if (fs.existsSync(doc)) {
        const html = fs.readFileSync(doc, 'utf8');
        const $ = cheerio.load(html);
        console.log(`\nDocument: ${doc}`);
        $('table').each((i, tbl) => {
            const hasImg = $(tbl).find('img').length > 0;
            if (hasImg) {
                console.log(`  Table ${i} has ${$(tbl).find('img').length} images.`);
            }
        });
    }
});
