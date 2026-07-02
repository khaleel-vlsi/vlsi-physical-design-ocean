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

// Extractor of active commands
const getCommands = (code) => {
  const rawLines = code.split('\n');
  const commands = [];
  let currentCmd = [];

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    if (trimmed === '') continue;
    if (trimmed.startsWith('#')) continue;
    if (trimmed === '}') continue;

    currentCmd.push(line);

    if (!trimmed.endsWith('\\')) {
      commands.push(currentCmd.join('\n'));
      currentCmd = [];
    }
  }

  if (currentCmd.length > 0) {
    commands.push(currentCmd.join('\n'));
  }

  return commands;
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
    else if (/^Flow$/i.test(title) || /^Overall Flow$/i.test(title)) {
      sec.items.forEach(item => {
        const txt = (item.text || '').trim();
        if (txt && txt !== '↓' && !txt.includes('↓')) {
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

  // Apply chronological command-alignment algorithm for scripts with empty explanation codes
  const hasLineExplanations = scriptObj.explanations.some(exp => exp.step.toLowerCase().includes('line'));
  const hasEmptyCodes = scriptObj.explanations.some(exp => exp.step.toLowerCase().includes('line') && (!exp.code || exp.code.trim() === ''));

  if (hasLineExplanations && hasEmptyCodes) {
    const commands = getCommands(scriptObj.code);
    scriptObj.explanations.forEach((exp, idx) => {
      if (exp.step.toLowerCase().includes('line') && (!exp.code || exp.code.trim() === '')) {
        const cmd = commands[idx];
        if (cmd) {
          exp.code = cmd;
        }
      }
    });
  }

  scripts.push(scriptObj);
});

fs.writeFileSync('src/data/tclScriptsData.js', `export const TCL_SCRIPTS = ${JSON.stringify(scripts, null, 2)};\n`);
console.log('Successfully aligned and compiled 32 scripts to src/data/tclScriptsData.js');
