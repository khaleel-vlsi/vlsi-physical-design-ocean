const fs = require('fs');

const content = JSON.parse(fs.readFileSync('extracted_content_module1.json', 'utf8'));

const filteredContent = content.filter(item => {
    if (item.type === 'p' && (!item.text || item.text.trim() === '') && (!item.html || item.html.replace(/<[^>]*>/g, '').trim() === '')) {
        return false;
    }
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.type) && (!item.text || item.text.trim() === '')) {
        return false;
    }
    return true;
});

// Pre-process content to merge split math formulas across adjacent items
const mergedContent = [];
let currentMathItem = null;

filteredContent.forEach(item => {
    const html = item.html || '';
    const text = item.text || '';
    
    // Check if this item starts a math block but doesn't end it
    const hasStart = html.includes('[') || text.includes('[');
    const hasEnd = html.includes(']') || text.includes(']');
    
    if (currentMathItem) {
        currentMathItem.html += ' ' + html;
        currentMathItem.text += ' ' + text;
        if (hasEnd) {
            mergedContent.push(currentMathItem);
            currentMathItem = null;
        }
    } else if (hasStart && !hasEnd && item.type === 'p') {
        currentMathItem = { ...item };
    } else {
        mergedContent.push(item);
    }
});

if (currentMathItem) mergedContent.push(currentMathItem);

let jsx = `import React, { useEffect, useState } from 'react';
import styles from './Module1Content.module.css';

const Module1Content = () => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    // Robust MathJax trigger
    const triggerMathJax = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };

    triggerMathJax();
    // Second pass after a short delay for late-rendering elements
    const timer = setTimeout(triggerMathJax, 1000);
    return () => clearTimeout(timer);
  }, []);

  const headings = [
`;

mergedContent.forEach(item => {
    if (['h1', 'h2'].includes(item.type)) {
        jsx += `    { id: '${item.id || 'h-' + Math.random().toString(36).substr(2, 9)}', text: '${item.text.replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}' },\n`;
    }
});

jsx += `  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.moduleLayout}>
      <div className={styles.topicsNav}>
        <h2 className={styles.navTitle}>Topics Covered</h2>
        <div className={styles.navButtonsGrid}>
          {(showAllTopics ? headings : headings.slice(0, 9)).map((heading) => (
            <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
              {heading.text}
            </button>
          ))}
        </div>
        {headings.length > 9 && (
          <button 
            onClick={() => setShowAllTopics(!showAllTopics)} 
            className={styles.seeMoreBtn}
          >
            {showAllTopics ? 'See Less' : \`See \${headings.length - 9} More Topics\`}
          </button>
        )}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
`;

const cleanHtml = (html) => {
    if (!html) return '';
    let cleaned = html
        .replace(/style="[^"]*"/gi, '')
        .replace(/color:\s*[^;"]+;?/gi, '')
        .replace(/background-color:\s*[^;"]+;?/gi, '')
        .replace(/font-family:[^;"]+;?/gi, '')
        .replace(/width="[^"]*"/gi, '')
        .replace(/height="[^"]*"/gi, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/resistances:<br>d/g, 'resistances:')
        .replace(/>d<\/span>/g, '></span>')
        .replace(/(<br\s*\/?>\s*)+$/gi, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/\u200B/g, '') // Remove Zero Width Spaces
        .replace(/`/g, '\\`').replace(/\${/g, '\\${')
        .replace(/\\/g, '\\\\') // ESCAPE BACKSLASHES for template literal
        .replace(/src="images\/image(\d+)\.png"/g, 'src="/assets/modules/module1/image_$1.png"');
    
    // Fix math: convert [ math ] to $$ math $$ for MathJax
    // Strip HTML tags INSIDE the delimiters to prevent MathJax confusion
    cleaned = cleaned.replace(/\[([\s\S]*?)\]/g, (match, p1) => {
        const formula = p1.replace(/<[^>]*>/g, '').trim();
        return `$$ ${formula} $$`;
    });
    
    return cleaned;
};

mergedContent.forEach((item, index) => {
    // 1. Skip redundant text formula after Ohm's Law image (image_11)
    if (item.type === 'p' && index > 0 && mergedContent[index-1].src && mergedContent[index-1].src.includes('image11.png')) {
        if (item.text.includes('V = IR') || item.text.includes('V=IR')) return;
    }

    // 2. Replace image6.png with a native comparison table
    if (item.type === 'img' && item.src && item.src.includes('image6.png')) {
        jsx += `          <div className={styles.tableContainer}>\n`;
        jsx += `            <table className={styles.contentTable}>\n`;
        jsx += `              <thead>\n`;
        jsx += `                <tr>\n`;
        jsx += `                  <th dangerouslySetInnerHTML={{ __html: \`Feature\` }} />\n`;
        jsx += `                  <th dangerouslySetInnerHTML={{ __html: \`Drift Current\` }} />\n`;
        jsx += `                  <th dangerouslySetInnerHTML={{ __html: \`Diffusion Current\` }} />\n`;
        jsx += `                </tr>\n`;
        jsx += `              </thead>\n`;
        jsx += `              <tbody>\n`;
        jsx += `                <tr>\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`<strong>Cause</strong>\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Applied Electric Field\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Concentration Gradient\` }} />\n`;
        jsx += `                </tr>\n`;
        jsx += `                <tr>\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`<strong>Direction</strong>\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Same as E-field (holes), Opposite (electrons)\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`High to Low Concentration\` }} />\n`;
        jsx += `                </tr>\n`;
        jsx += `                <tr>\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`<strong>Governing Law</strong>\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Ohm's Law ($J = \\\\sigma E$)\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Fick's Law ($J = -qD\\\\frac{dn}{dx}$)\` }} />\n`;
        jsx += `                </tr>\n`;
        jsx += `                <tr>\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`<strong>Medium</strong>\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Requires an Electric Field\` }} />\n`;
        jsx += `                  <td dangerouslySetInnerHTML={{ __html: \`Occurs even without E-field\` }} />\n`;
        jsx += `                </tr>\n`;
        jsx += `              </tbody>\n`;
        jsx += `            </table>\n`;
        jsx += `          </div>\n`;
        return;
    }

    if (item.type === 'img') {
        if (!item.src) return;
        const src = item.src.replace('images/image', '/assets/modules/module1/image_');
        // Check for specific images that might need clipping or special handling
        const containerClass = item.src.includes('image28.png') ? 'imageContainer' : 'imageContainer';
        jsx += `          <div className={styles.${containerClass}}>\n`;
        jsx += `            <img src="${src}" alt="${item.alt || ''}" className={styles.contentImage} />\n`;
        jsx += `          </div>\n`;
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.type)) {
        jsx += `          <${item.type} id="${item.id}" className={styles.${item.type}} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
    } else if (item.type === 'p') {
        const cleaned = cleanHtml(item.html);
        // Better math detection
        const isMathContent = cleaned.includes('$$') || cleaned.includes('\\\\sum') || 
                             cleaned.includes('\\\\tau') || cleaned.includes('_{eq}') || 
                             cleaned.includes('V_{out}') || cleaned.includes('\\\\frac');
        const pClass = isMathContent ? 'mathFormula' : 'paragraph';
        jsx += `          <p className={styles.${pClass}} dangerouslySetInnerHTML={{ __html: \`${cleaned}\` }} />\n`;
    } else if (item.type === 'ul' || item.type === 'ol') {
        jsx += `          <${item.type} className={styles.list} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
    } else if (item.type === 'hr') {
        jsx += `          <hr className={styles.divider} />\n`;
    } else if (item.type === 'table') {
        jsx += `          <div className={styles.tableContainer}>\n`;
        jsx += `            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.content)}\` }} />\n`;
        jsx += `          </div>\n`;
    }
});


jsx += `        </div>
      </div>
    </div>
  );
};

export default Module1Content;
`;

jsx = jsx.replace(/src=\\"images\/image(\d+)\.png/g, 'src=\\"/assets/modules/module1/image_$1.png');

fs.writeFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\src\\pages\\modules\\Module1Content.jsx', jsx);
console.log('Regenerated Module1Content.jsx with absolute order preservation and MathJax $$ delimiters');
