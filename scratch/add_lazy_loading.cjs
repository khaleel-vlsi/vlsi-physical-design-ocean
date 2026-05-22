const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../src/pages/modules');

function addLazyLoading(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Replace <img ... /> with <img loading="lazy" ... /> if not already there
  const newContent = content.replace(/<img\s+(?!.*?loading="lazy")/g, '<img loading="lazy" ');
  
  // also handle dangerouslySetInnerHTML raw images
  // We can just look for <img and replace if no loading="lazy"
  // Wait, the regex above handles <img...
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      addLazyLoading(fullPath);
    }
  }
}

processDirectory(directory);

// Also check Home.jsx
const homePath = path.join(__dirname, '../src/pages/Home.jsx');
if (fs.existsSync(homePath)) {
  addLazyLoading(homePath);
}

const privacyPath = path.join(__dirname, '../src/pages/Privacy.jsx');
if (fs.existsSync(privacyPath)) {
  addLazyLoading(privacyPath);
}

console.log('Done adding lazy loading to images.');
