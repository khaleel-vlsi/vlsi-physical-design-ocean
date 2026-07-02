import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

const cleanHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/style="[^"]*"/gi, '')
    .replace(/color:\s*[^;"]+;?/gi, '')
    .replace(/background-color:\s*[^;"]+;?/gi, '')
    .replace(/font-family:[^;"]+;?/gi, '')
    .replace(/class="[^"]*"/gi, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/<img[^>]*>/gi, '')
    .replace(/(<br\s*\/?>\s*)+$/gi, '')
    .trim();
};

const cleanCode = (code) => {
  if (!code) return '';
  return code
    .replace(/^```tcl\r?\n/i, '')
    .replace(/^```gui\r?\n/i, '')
    .replace(/^```\r?\n/i, '')
    .replace(/\r?\n```$/g, '')
    .trim();
};

const scripts = [];

rawData.forEach((s, idx) => {
  const part = idx < 25 ? 1 : 2;
  const scriptNum = idx < 25 ? (idx + 1) : (idx - 24);
  const id = `${part === 1 ? 'fc' : 'innovus'}_script_${scriptNum}`;
  const toolName = part === 1 ? 'FC Tool' : 'INNOVUS Tool';
  
  let cleanTitle = s.title.replace(/^Script\s+\d+:\s*/i, '').trim();
  
  const scriptObj = {
    id,
    part,
    toolName,
    index: scriptNum,
    title: cleanTitle,
    objective: '',
    code: '',
    explanations: [],
    flow: [],
    why: [],
    applications: [],
    questions: [],
    recommendation: '',
    extraContext: []
  };

  s.sections.forEach(sec => {
    const title = sec.title.trim();
    
    if (/^Objective$/i.test(title)) {
      scriptObj.objective = sec.items.map(item => cleanHtml(item.html)).join('\n');
    } 
    else if (/^Generalized Script$/i.test(title)) {
      scriptObj.code = cleanCode(sec.items.map(item => item.text || '').join('\n'));
    }
    else if (/^(Line|Step)\s+/i.test(title)) {
      // FIX: Keep 'list' items even if their item.text is empty!
      const cleanItems = sec.items.filter(item => {
        if (item.type === 'list') return true;
        const text = (item.text || '').trim();
        if (!text) return false;
        if (/^[-\*_=\s\u2014]+$/.test(text)) return false;
        return true;
      });

      let codeSnippet = '';
      let expHtml = '';

      if (cleanItems.length > 0) {
        const firstText = (cleanItems[0].text || '').trim();
        
        if (firstText.startsWith('```')) {
          const closingIdx = cleanItems.findIndex((item, i) => i > 0 && item.text.trim() === '```');
          if (closingIdx !== -1) {
            codeSnippet = cleanItems.slice(1, closingIdx).map(item => item.text || '').join('\n');
            const expItems = cleanItems.slice(closingIdx + 1);
            expItems.forEach(item => {
              if (item.type === 'list') {
                expHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
              } else {
                expHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
              }
            });
          } else {
            codeSnippet = cleanCode(firstText);
            const expItems = cleanItems.slice(1);
            expItems.forEach(item => {
              if (item.type === 'list') {
                expHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
              } else {
                expHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
              }
            });
          }
        } else if (cleanItems.length === 1) {
          codeSnippet = '';
          expHtml = `<p class="my-1">${cleanHtml(cleanItems[0].html)}</p>`;
        } else {
          codeSnippet = firstText;
          const expItems = cleanItems.slice(1);
          expItems.forEach(item => {
            if (item.type === 'list') {
              expHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
            } else {
              expHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
            }
          });
        }
      }

      scriptObj.explanations.push({
        step: title,
        code: codeSnippet.trim(),
        explanation: expHtml.trim()
      });
    }
    // (other sections omitted for brief testing)
  });

  scripts.push(scriptObj);
});

// Let's log explanations for script 1 to see if Line 1 has code snippet now
console.log("=== SCRIPT 1 EXPLANATIONS ===");
scripts[0].explanations.forEach(exp => {
  console.log(`- Step: "${exp.step}"`);
  console.log(`  Code: "${exp.code}"`);
  console.log(`  Explanation: "${exp.explanation}"`);
});
