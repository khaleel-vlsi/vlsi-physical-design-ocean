const fs = require('fs');

const content = fs.readFileSync('src/pages/modules/Module8Content.jsx', 'utf8');

// Match all occurrences of { id: '...', text: '...' }
const regex = /id:\s*'([^']+)'/g;
const ids = [];
let match;
while ((match = regex.exec(content)) !== null) {
  ids.push(match[1]);
}

console.log("Total IDs found:", ids.length);

const seen = new Set();
const duplicates = [];
for (const id of ids) {
  if (seen.has(id)) {
    duplicates.push(id);
  } else {
    seen.add(id);
  }
}

if (duplicates.length > 0) {
  console.log("Duplicate IDs found:", duplicates);
} else {
  console.log("No duplicate IDs found.");
}
