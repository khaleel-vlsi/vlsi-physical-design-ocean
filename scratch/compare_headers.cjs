const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
const $source = cheerio.load(html);
const sourceH2s = $source('h2').map((i, el) => $source(el).text().trim()).get();

const jsx = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/src/pages/modules/MOSFETCMOSContent.jsx', 'utf8');
const $jsx = cheerio.load(jsx);
// Cheerio might not handle JSX perfectly, but for simple tags it should work.
const jsxH2s = [];
// Use regex to find h2 content in JSX since it might be in strings
const h2Matches = jsx.match(/<h2[^>]*>(.*?)<\/h2>/g) || [];
h2Matches.forEach(m => {
    const text = m.replace(/<[^>]*>/g, '').trim();
    if (text) jsxH2s.push(text);
});

console.log('Source H2s:', sourceH2s.length);
console.log('JSX H2s:', jsxH2s.length);

const missing = sourceH2s.filter(h => !jsxH2s.includes(h));
console.log('Missing H2s:', missing);
