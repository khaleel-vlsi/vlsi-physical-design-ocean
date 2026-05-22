const fs = require('fs');

const content = JSON.parse(fs.readFileSync('extracted_content_module8.json', 'utf8'));

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
import styles from './Module8Content.module.css';

const Module8Content = () => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    // Robust MathJax trigger
    const triggerMathJax = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };

    triggerMathJax();
    const timer = setTimeout(triggerMathJax, 1000);
    return () => clearTimeout(timer);
  }, []);

  const headings = [
`;

filteredContent.forEach(item => {
    if (['h1', 'h2'].includes(item.type)) {
        jsx += `    { id: '${item.id}', text: '${item.text.replace(/'/g, "\\'").replace(/\r?\n/g, ' ')}' },\n`;
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
        .replace(/&nbsp;/g, ' ')
        .replace(/<img[^>]*>/gi, '') // STRIP ALL IMGS FROM HTML STRINGS
        .replace(/(<br\s*\/?>\s*)+$/gi, '')
        .replace(/^\s+|\s+$/g, '')
        .replace(/\\/g, '\\\\') // ESCAPE BACKSLASHES
        .replace(/`/g, '\\`').replace(/\${/g, '\\${');
    
    return cleaned;
};

filteredContent.forEach((item, index) => {
    if (item.type === 'img') {
        const src = item.src.replace('images/image', '/assets/modules/module8/image');
        jsx += `          <div className={styles.imageContainer}>\n`;
        jsx += `            <img src="${src}" alt="${item.alt || ''}" className={styles.contentImage} />\n`;
        jsx += `          </div>\n`;
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(item.type)) {
        jsx += `          <${item.type} id="${item.id}" className={styles.${item.type}} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
    } else if (item.type === 'p') {
        const cleaned = cleanHtml(item.html);
        if (!cleaned) return;

        let pClass = 'paragraph';
        let Tag = 'p';
        if (item.className) {
            Tag = 'div';
            if (item.className.includes('analogy')) pClass = 'analogyBox';
            else if (item.className.includes('highlight')) pClass = 'highlightBox';
            else if (item.className.includes('golden-rule')) pClass = 'goldenRuleBox';
            else if (item.className.includes('step-box')) pClass = 'stepBox';
            else if (item.className.includes('image-caption')) { pClass = 'imageCaption'; Tag = 'p'; }
        }
        
        jsx += `          <${Tag} className={styles.${pClass}} dangerouslySetInnerHTML={{ __html: \`${cleaned}\` }} />\n`;
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

export default Module8Content;
`;

fs.writeFileSync('src/pages/modules/Module8Content.jsx', jsx);
console.log('Regenerated Module8Content.jsx using high-fidelity automated script.');
