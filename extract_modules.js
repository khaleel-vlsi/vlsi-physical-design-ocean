import fs from 'fs';
import path from 'path';

const legacyDir = path.join(process.cwd(), 'legacy_code');
const outputFilePath = path.join(process.cwd(), 'src', 'data', 'modulesData.js');

const modulesData = {};

for (let i = 1; i <= 26; i++) {
  const filePath = path.join(legacyDir, `module${i}.html`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract title
  const titleMatch = content.match(/<header>\s*<h1>Module \d+<\/h1>\s*<p>(.*?)<\/p>/i);
  let title = titleMatch ? titleMatch[1].trim() : `Module ${i}`;

  // Extract topics
  let topics = [];
  const topicsMatch = content.match(/<h2>(?:Topics Covered|📚 Reference Materials & User Guides)<\/h2>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (topicsMatch) {
    const listItems = topicsMatch[1].match(/<li>(.*?)<\/li>/gi);
    if (listItems) {
      topics = listItems.map(item => item.replace(/<\/?li>/g, '').trim());
    }
  }

  // Extract all iframes with their preceding headings
  let iframes = [];
  // This regex looks for an h2, followed by optional whitespace/tags (like <hr> or <br> or empty lines), then an iframe.
  // It is reasonably safe for the current HTML structure.
  const iframeBlockRegex = /<h2>([^<]+)<\/h2>(?:(?!<h2>)[\s\S])*?<iframe[^>]*src="([^"]+)"/gi;
  let match;
  while ((match = iframeBlockRegex.exec(content)) !== null) {
    iframes.push({
      heading: match[1].trim(),
      url: match[2].trim()
    });
  }
  
  // Check if locked
  const isLocked = content.includes('locked-module');

  modulesData[i] = {
    id: i,
    title,
    topics,
    iframes,
    isLocked
  };
}

const jsContent = `export const modulesData = ${JSON.stringify(modulesData, null, 2)};\n`;

fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
fs.writeFileSync(outputFilePath, jsContent, 'utf-8');
console.log('modulesData.js generated successfully.');
