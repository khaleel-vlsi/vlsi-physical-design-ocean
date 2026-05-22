const fs = require('fs');
const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
const start = html.indexOf('<body');
fs.writeFileSync('c:/Users/priya/vlsi-physical-design-ocean/scratch/body_start.html', html.substring(start, start + 10000));
