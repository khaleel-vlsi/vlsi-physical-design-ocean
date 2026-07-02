import fs from 'fs';

const html = fs.readFileSync('tmp/module21/PNRINTERVIEWQUETIONSANSWERS.docx.html', 'utf8');
console.log('HTML Length:', html.length);
console.log('First 500 chars:', html.substring(0, 500));

// Find where images are referenced
const imageIndex = html.toLowerCase().indexOf('image');
if (imageIndex !== -1) {
  console.log('Found "image" at index:', imageIndex);
  console.log('Snippet around "image":', html.substring(imageIndex - 50, imageIndex + 150));
} else {
  console.log('"image" not found in HTML text!');
}

const imgIndex = html.toLowerCase().indexOf('<img');
if (imgIndex !== -1) {
  console.log('Found "<img" at index:', imgIndex);
  console.log('Snippet around "<img":', html.substring(imgIndex - 50, imgIndex + 150));
} else {
  console.log('"<img" not found in HTML text!');
}

const srcIndex = html.toLowerCase().indexOf('src');
if (srcIndex !== -1) {
  console.log('Found "src" at index:', srcIndex);
  console.log('Snippet around "src":', html.substring(srcIndex - 50, srcIndex + 150));
} else {
  console.log('"src" not found in HTML text!');
}

// Find some numbered paragraphs
const match = html.match(/<p[^>]*>\s*\d+\s*\.\s*/i);
if (match) {
  console.log('Found numbered paragraph:', match[0], 'at index:', match.index);
  console.log('Snippet around number:', html.substring(match.index, match.index + 200));
} else {
  console.log('No numbered paragraph found with pattern!');
}
