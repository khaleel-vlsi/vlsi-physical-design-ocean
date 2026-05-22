const fs = require('fs');
const content = fs.readFileSync('src/pages/modules/Module1Content.jsx', 'utf8');
const offset = 3219;
console.log('Context around offset 3219:');
console.log(content.substring(offset - 50, offset + 50));
