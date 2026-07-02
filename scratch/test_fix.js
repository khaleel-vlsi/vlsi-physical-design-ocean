import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

// We want to see how we can fix them. Let's inspect some items.
data.forEach((s, sIdx) => {
  const part = sIdx < 25 ? 1 : 2;
  const index = sIdx < 25 ? (sIdx + 1) : (sIdx - 24);
  
  s.sections.forEach(sec => {
    const title = sec.title.trim();
    if (/^(Line|Step)\s+/i.test(title)) {
      const items = sec.items;
      if (items.length > 0) {
        const firstText = (items[0].text || '').trim();
        if (firstText.startsWith('```')) {
          console.log(`Script ${part}-${index} (${s.title}) - ${title}: Starts with markdown block`);
          // Let's print the items to see how they are structured
          items.forEach((item, i) => {
            console.log(`  [item ${i}]: text: "${item.text.replace(/\n/g, '\\n')}"`);
          });
        }
      }
    }
  });
});
