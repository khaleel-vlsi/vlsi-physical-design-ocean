const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('scratch/tcl_parsed_robust_clean.json', 'utf8'));

const cleanHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/style="[^"]*"/gi, '')
    .replace(/color:\s*[^;"]+;?/gi, '')
    .replace(/background-color:\s*[^;"]+;?/gi, '')
    .replace(/font-family:[^;"]+;?/gi, '')
    .replace(/class="[^"]*"/gi, '') // Remove Google Doc classes to prevent overrides
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
  
  // Clean title
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
      // Explanation line
      const codeSnippet = sec.items.length > 0 ? cleanCode(sec.items[0].text || '') : '';
      const expItems = sec.items.slice(1);
      
      let expHtml = '';
      expItems.forEach(item => {
        if (item.type === 'list') {
          expHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
        } else {
          expHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
        }
      });

      scriptObj.explanations.push({
        step: title,
        code: codeSnippet,
        explanation: expHtml
      });
    }
    else if (/^Flow$/i.test(title) || /^Overall Flow$/i.test(title)) {
      // Collect steps, ignore ↓
      sec.items.forEach(item => {
        const txt = (item.text || '').trim();
        if (txt && txt !== '↓' && txt !== '↓' && !txt.includes('↓')) {
          scriptObj.flow.push(txt);
        }
      });
    }
    else if (/^Why This Script\??$/i.test(title)) {
      sec.items.forEach(item => {
        if (item.type === 'list') {
          scriptObj.why.push(...item.items.map(li => cleanHtml(li)));
        } else {
          scriptObj.why.push(cleanHtml(item.html));
        }
      });
    }
    else if (/^Applications$/i.test(title)) {
      sec.items.forEach(item => {
        if (item.type === 'list') {
          scriptObj.applications.push(...item.items.map(li => cleanHtml(li)));
        } else {
          scriptObj.applications.push(cleanHtml(item.html));
        }
      });
    }
    else if (/^Interview Questions$/i.test(title)) {
      // Parse Q&A pairs
      let currentQ = null;
      let currentA = '';

      sec.items.forEach(item => {
        let text = '';
        if (item.type === 'list') {
          text = (item.items || []).join(' ');
        } else {
          text = item.text || '';
        }
        text = text.trim();

        // Check if it's a question (starts with Q or contains ?)
        const isQ = /^[Q|q]\d+[:.]/i.test(text) || text.startsWith('Q:') || text.startsWith('Q.');
        
        if (isQ) {
          if (currentQ) {
            scriptObj.questions.push({ question: currentQ, answer: currentA });
          }
          currentQ = text;
          currentA = '';
        } else {
          if (item.type === 'list') {
            currentA += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
          } else {
            currentA += `<p class="my-1">${cleanHtml(item.html)}</p>`;
          }
        }
      });
      if (currentQ) {
        scriptObj.questions.push({ question: currentQ, answer: currentA });
      }
    }
    else if (/^Q\d+[:.]/i.test(title)) {
      // Standalone question section
      let answerHtml = '';
      sec.items.forEach(item => {
        if (item.type === 'list') {
          answerHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
        } else {
          answerHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
        }
      });
      scriptObj.questions.push({
        question: title,
        answer: answerHtml
      });
    }
    else if (/^Industry Recommendation$/i.test(title) || /^Industry Note$/i.test(title)) {
      scriptObj.recommendation = sec.items.map(item => cleanHtml(item.html)).join('\n');
    }
    else {
      // Extra context sections
      let contentHtml = '';
      sec.items.forEach(item => {
        if (item.type === 'list') {
          contentHtml += `<ul class="list-disc pl-5 my-2">${item.items.map(li => `<li>${cleanHtml(li)}</li>`).join('')}</ul>`;
        } else {
          contentHtml += `<p class="my-1">${cleanHtml(item.html)}</p>`;
        }
      });
      scriptObj.extraContext.push({
        title: title,
        html: contentHtml
      });
    }
  });

  scripts.push(scriptObj);
});

fs.writeFileSync('src/data/tclScriptsData.js', `export const TCL_SCRIPTS = ${JSON.stringify(scripts, null, 2)};\n`);
console.log('Successfully structured and written 32 scripts to src/data/tclScriptsData.js');
