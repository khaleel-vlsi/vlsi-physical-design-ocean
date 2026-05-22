const fs = require('fs');
const html = fs.readFileSync('c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html', 'utf8');
fs.writeFileSync('c:/Users/priya/vlsi-physical-design-ocean/scratch/start.html', html.substring(0, 10000));
