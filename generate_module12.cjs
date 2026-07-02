const fs = require('fs');

const content = JSON.parse(fs.readFileSync('extracted_content_module12.json', 'utf8'));

let jsxContent = `import React, { useState, useEffect } from 'react';
import styles from './Module12Content.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Module12Content = () => {
    const [activeHeading, setActiveHeading] = useState('');
    const { profile } = useAuth() || {};
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const headings = Array.from(document.querySelectorAll('h1[id], h2[id]'));
            const scrollPosition = window.scrollY + 100;

            for (let i = headings.length - 1; i >= 0; i--) {
                if (headings[i].offsetTop <= scrollPosition) {
                    setActiveHeading(headings[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveHeading(id);
        }
    };
    
    // Disable right click and copy for protection
    const preventCopy = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <div className={styles.moduleLayout} onCopy={preventCopy} onContextMenu={preventCopy}>
            {/* Sidebar Navigation */}
            <nav className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>Topics</h3>
                <ul className={styles.topicList}>
`;

const headings = content.filter(item => item.type === 'section' && (item.level === 1 || item.level === 2));

headings.forEach(heading => {
    jsxContent += `                    <li 
                        className={\`\${styles.topicItem} \${activeHeading === '${heading.id}' ? styles.active : ''}\`}
                        onClick={() => scrollToSection('${heading.id}')}
                    >
                        ${heading.title}
                    </li>\n`;
});

jsxContent += `                </ul>
            </nav>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                <div className={styles.contentCard}>
`;

content.forEach(item => {
    if (item.type === 'section') {
        const HeadingTag = `h${item.level}`;
        jsxContent += `                    <${HeadingTag} id="${item.id}" className={styles.sectionHeadingLevel${item.level}}>\n                        ${item.title}\n                    </${HeadingTag}>\n`;
        
        if (item.body) {
            jsxContent += `                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: \`${item.body}\` }} />\n`;
        }
    } else if (item.type === 'image') {
        jsxContent += `                    <div className={styles.imageContainer}>
                        <img src="${item.src}" alt="${item.alt}" className={styles.nativeImg} loading="lazy" />
                    </div>\n`;
    }
});

jsxContent += `                </div>
            </main>
        </div>
    );
};

export default Module12Content;
`;

fs.writeFileSync('src/pages/modules/Module12Content.jsx', jsxContent);
console.log('Successfully generated src/pages/modules/Module12Content.jsx');
