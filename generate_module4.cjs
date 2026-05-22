const fs = require('fs');

const content = JSON.parse(fs.readFileSync('extracted_content_module4.json', 'utf8'));

const filteredContent = content.filter(item => {
    if (item.type === 'p' && (!item.text || item.text.trim() === '') && (!item.html || item.html.replace(/<[^>]*>/g, '').trim() === '')) {
        return false;
    }
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.type) && (!item.text || item.text.trim() === '')) {
        return false;
    }
    return true;
});

let jsx = `import React, { useEffect, useState } from 'react';
import styles from './Module4Content.module.css';

const Module4Content = () => {
  const [showAllLinux, setShowAllLinux] = useState(false);
  const [showAllTcl, setShowAllTcl] = useState(false);

  useEffect(() => {
    const triggerMathJax = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };
    triggerMathJax();
    const timer = setTimeout(triggerMathJax, 1000);
    return () => clearTimeout(timer);
  }, []);

  const linuxHeadings = [
`;

filteredContent.forEach(item => {
    if (['h1', 'h2'].includes(item.type) && item.text.startsWith('[Linux]')) {
        jsx += `    { id: '${item.id}', text: '${item.text.replace('[Linux] ', '').replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}' },\n`;
    }
});

jsx += `  ];

  const tclHeadings = [
`;

filteredContent.forEach(item => {
    if (['h1', 'h2'].includes(item.type) && item.text.startsWith('[TCL]')) {
        jsx += `    { id: '${item.id}', text: '${item.text.replace('[TCL] ', '').replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}' },\n`;
    }
});

jsx += `  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.moduleLayout}>
      <div className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>Linux - Topics Covered</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllLinux ? linuxHeadings : linuxHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {linuxHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllLinux(!showAllLinux)} 
                className={styles.seeMoreBtn}
              >
                {showAllLinux ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>TCL - Topics Covered</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllTcl ? tclHeadings : tclHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {tclHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllTcl(!showAllTcl)} 
                className={styles.seeMoreBtn}
              >
                {showAllTcl ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
`;

const cleanHtml = (html) => {
    if (!html) return '';
    return html
        .replace(/style="[^"]*"/gi, '')
        .replace(/color:\s*[^;"]+;?/gi, '')
        .replace(/background-color:\s*[^;"]+;?/gi, '')
        .replace(/font-family:[^;"]+;?/gi, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/<img[^>]*>/gi, '')
        .replace(/(<br\s*\/?>\s*)+$/gi, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`').replace(/\${/g, '\\${');
};

const escapeJsx = (str) => {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;')
        .replace(/`/g, '\\`').replace(/\${/g, '\\${');
};

let i = 0;
while (i < filteredContent.length) {
    const item = filteredContent[i];

    if (item.type === 'img') {
        const src = item.src.replace('images/', '/assets/modules/module4/');
        jsx += `          <div className={styles.imageContainer}>\n`;
        jsx += `            <img src="${src}" alt="${item.alt || ''}" className={styles.contentImage} />\n`;
        jsx += `          </div>\n`;
        i++;
    } else if (item.type === 'code') {
        // Collect consecutive code blocks
        let codeBuffer = [];
        while (i < filteredContent.length && filteredContent[i].type === 'code') {
            codeBuffer.push(filteredContent[i].text);
            i++;
        }
        const mergedCode = codeBuffer.join('\n');
        jsx += `          <div className={styles.commandBox} dangerouslySetInnerHTML={{ __html: \`${escapeJsx(mergedCode)}\` }} />\n`;
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.type)) {
        jsx += `          <${item.type} id="${item.id}" className={styles.${item.type}} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
        i++;
    } else if (item.type === 'p') {
        jsx += `          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
        i++;
    } else if (item.type === 'ul' || item.type === 'ol') {
        jsx += `          <${item.type} className={styles.list} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
        i++;
    } else if (item.type === 'hr') {
        jsx += `          <hr className={styles.divider} />\n`;
        i++;
    } else if (item.type === 'table') {
        jsx += `          <div className={styles.tableContainer}>\n`;
        jsx += `            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.content)}\` }} />\n`;
        jsx += `          </div>\n`;
        i++;
    } else {
        i++;
    }
}

jsx += `        </div>
      </div>
    </div>
  );
};

export default Module4Content;
`;

fs.writeFileSync('src/pages/modules/Module4Content.jsx', jsx);
console.log('Generated Module4Content.jsx with Linux and TCL merged.');
