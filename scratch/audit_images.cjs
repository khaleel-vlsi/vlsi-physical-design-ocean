const fs = require('fs');
const content = fs.readFileSync('src/pages/modules/Module6Content.jsx', 'utf8');
const matches = content.match(/src="assets\/modules\/module6\/(.*?)"/g);
if (matches) {
    const srcs = matches.map(m => m.match(/assets\/modules\/module6\/(.*?)"/)[1]);
    const uniqueSrcs = [...new Set(srcs)];
    console.log('Total matches:', matches.length);
    console.log('Unique srcs:', uniqueSrcs.length);
    uniqueSrcs.sort().forEach(s => console.log(s));
} else {
    console.log('No images found in JSX');
}
