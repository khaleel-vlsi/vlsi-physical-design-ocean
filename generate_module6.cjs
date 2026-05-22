const fs = require('fs');
const path = require('path');

const contentData = JSON.parse(fs.readFileSync('extracted_content_module6.json', 'utf8'));

// Sanitize function to remove emoji numbers and other unwanted symbols
function sanitizeText(text) {
    if (!text) return '';
    // Remove common emoji numbers (1️⃣, 2️⃣, etc.)
    let sanitized = text.replace(/[\u0030-\u0039]\ufe0f?\u20e3/g, (match) => {
        return match[0] + '.'; // Replace with "1.", "2.", etc.
    });
    // Remove other emojis if any
    sanitized = sanitized.replace(/[\u{1F300}-\u{1F9FF}]/gu, '');
    
    // Fix mangled characters common in Google Doc exports
    sanitized = sanitized.replace(/\+`/g, '→'); // Fix arrow pattern
    
    // Clean up double spaces or leading dots
    sanitized = sanitized.replace(/^\./, '').trim();
    return sanitized;
}

// Function to escape text for JSX by wrapping it in curly braces if it contains problematic characters
function escapeJSX(text) {
    if (!text) return '""';
    // If it contains characters that break JSX ({, }, <, >, &), wrap it as a string literal
    if (/[<>&{}]/.test(text)) {
        return `{\`${text.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`}`;
    }
    return text;
}

// Separate headings by document source, filtering out empty ones
const introHeadings = contentData
    .filter(item => /^h[1-6]$/.test(item.type) && item.text.startsWith('[Intro]'))
    .map(h => ({
        id: h.id,
        text: sanitizeText(h.text.replace('[Intro] ', ''))
    }))
    .filter(h => h.text.length > 0);

const dcHeadings = contentData
    .filter(item => /^h[1-6]$/.test(item.type) && item.text.startsWith('[DC]'))
    .map(h => ({
        id: h.id,
        text: sanitizeText(h.text.replace('[DC] ', ''))
    }))
    .filter(h => h.text.length > 0);

const genusHeadings = contentData
    .filter(item => /^h[1-6]$/.test(item.type) && item.text.startsWith('[Genus]'))
    .map(h => ({
        id: h.id,
        text: sanitizeText(h.text.replace('[Genus] ', ''))
    }))
    .filter(h => h.text.length > 0);

const jsxContent = contentData.map((item, index) => {
    if (/^h[1-6]$/.test(item.type)) {
        const Tag = item.type;
        const text = sanitizeText(item.text.replace(/^\[.*?\] /, ''));
        if (!text) return null;
        return `        <${Tag} id="${item.id}" className={styles.${Tag}}>${escapeJSX(text)}</${Tag}>`;
    } else if (item.type === 'p') {
        const text = sanitizeText(item.text);
        if (!text) return null;
        return `        <p className={styles.paragraph}>${escapeJSX(text)}</p>`;
    } else if (item.type === 'code') {
        return `        <div className={styles.commandBox}>\n          <pre><code>{\`${item.text.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`}</code></pre>\n        </div>`;
    } else if (item.type === 'ul' || item.type === 'ol') {
        const Tag = item.type;
        return `        <${Tag} className={styles.list} dangerouslySetInnerHTML={{ __html: \`${item.html.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />`;
    } else if (item.type === 'table') {
        return `        <div className={styles.tableContainer}>\n          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: \`${item.html.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\` }} />\n        </div>`;
    } else if (item.type === 'img') {
        // Ensure leading slash for asset paths
        const src = item.src.startsWith('/') ? item.src : `/${item.src}`;
        return `        <div className={styles.imageContainer}>\n          <img src="${src}" alt="${item.alt}" className={styles.contentImage} />\n        </div>`;
    } else if (item.type === 'hr') {
        return `        <hr className={styles.divider} />`;
    }
    return null;
}).filter(Boolean).join('\n');

const componentTemplate = `
import React, { useState } from 'react';
import styles from './Module6Content.module.css';

const Module6Content = () => {
  const [showAllIntro, setShowAllIntro] = useState(false);
  const [showAllDC, setShowAllDC] = useState(false);
  const [showAllGenus, setShowAllGenus] = useState(false);

  const introHeadings = ${JSON.stringify(introHeadings, null, 2)};
  const dcHeadings = ${JSON.stringify(dcHeadings, null, 2)};
  const genusHeadings = ${JSON.stringify(genusHeadings, null, 2)};

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
          {/* Section 1: Synthesis Basics */}
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>Synthesis Basics - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllIntro ? introHeadings : introHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {introHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllIntro(!showAllIntro)} 
                className={styles.seeMoreBtn}
              >
                {showAllIntro ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          {/* Section 2: DC Execution */}
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>DC Execution - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllDC ? dcHeadings : dcHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {dcHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllDC(!showAllDC)} 
                className={styles.seeMoreBtn}
              >
                {showAllDC ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          {/* Section 3: Genus Execution */}
          <div className={styles.navSection}>
            <h2 className={styles.navTitle}>Genus Execution - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllGenus ? genusHeadings : genusHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {genusHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllGenus(!showAllGenus)} 
                className={styles.seeMoreBtn}
              >
                {showAllGenus ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.contentCard}>
${jsxContent}
      </div>
    </div>
  );
};

export default Module6Content;
`;

fs.writeFileSync('src/pages/modules/Module6Content.jsx', componentTemplate);
console.log('Successfully generated Module6Content.jsx with absolute asset paths.');
