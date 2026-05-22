const fs = require('fs');

const content = JSON.parse(fs.readFileSync('extracted_content.json', 'utf8'));

// Filter out noise and empty items
const filteredContent = content.slice(3).filter(item => {
    if (item.type === 'p' && (!item.text || item.text.trim() === '') && (!item.html || item.html.replace(/<[^>]*>/g, '').trim() === '')) {
        return false;
    }
    if (['h1', 'h2', 'h3'].includes(item.type) && (!item.text || item.text.trim() === '')) {
        return false;
    }
    return true;
});

let jsx = `import React from 'react';
import styles from './MOSFETCMOSContent.module.css';

const MOSFETCMOSContent = () => {
  const headings = [
`;

// Extract headings for the topics navigation
jsx += `    { id: 'top-mosfet', text: 'MOSFET Overview' },\n`;

content.forEach(item => {
    if (['h1', 'h2', 'h3'].includes(item.type)) {
        if (item.text.toLowerCase() === 'mosfet') return;
        jsx += `    { id: '${item.id || 'h-' + Math.random().toString(36).substr(2, 9)}', text: '${item.text.replace(/'/g, "\\'")}' },\n`;
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
      {/* Topics Covered Navigation at the Top */}
      <div className={styles.topicsNav}>
        <h2 className={styles.navTitle}>Topics Covered</h2>
        <div className={styles.navButtonsGrid}>
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToSection(heading.id)}
              className={styles.topicNavBtn}
            >
              {heading.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
          {/* Manually adding the title and Transistor Family image (image56.png) at the start */}
          <h1 id="top-mosfet" className={styles.h1} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>MOSFET</h1>
          <div className={styles.imageContainer}>
            <img src="/assets/modules/mosfetcmos/image56.png" alt="Transistor Family Tree" className={styles.contentImage} />
          </div>
`;

const cleanHtml = (html) => {
    if (!html) return '';
    return html
        .replace(/color:\s*[^;"]+;?/gi, '') 
        .replace(/background-color:\s*[^;"]+;?/gi, '')
        .replace(/font-family:[^;"]+;?/gi, '')
        .replace(/`/g, '\\`').replace(/\${/g, '\\${');
};

filteredContent.forEach(item => {
    if (item.type === 'img') {
        if (!item.src) return; 
        const src = item.src.replace('images/', '/assets/modules/mosfetcmos/');
        jsx += `          <div className={styles.imageContainer}>\n`;
        jsx += `            <img src="${src}" alt="${item.alt || ''}" className={styles.contentImage} />\n`;
        jsx += `          </div>\n`;
    } else if (['h1', 'h2', 'h3'].includes(item.type)) {
        jsx += `          <${item.type} id="${item.id}" className={styles.${item.type}} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
    } else if (item.type === 'p') {
        jsx += `          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: \`${cleanHtml(item.html)}\` }} />\n`;
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

export default MOSFETCMOSContent;
`;

jsx = jsx.replace(/src=\\"images\//g, 'src=\\"/assets/modules/mosfetcmos/');
jsx = jsx.replace(/src="images\//g, 'src="/assets/modules/mosfetcmos/');

fs.writeFileSync('c:\\Users\\priya\\vlsi-physical-design-ocean\\src\\pages\\modules\\MOSFETCMOSContent.jsx', jsx);
console.log('Regenerated MOSFETCMOSContent.jsx with empty item filtering and alignment readiness');
