const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

const PROJECT_ROOT = 'c:/Users/priya/vlsi-physical-design-ocean';
const ASSETS_DIR = path.join(PROJECT_ROOT, 'public/assets/modules/mosfetcmos');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'src/pages/modules');

async function convertFile(htmlPath, moduleName) {
  try {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const $ = cheerio.load(html);

    // Extract CSS
    let css = '';
    $('style').each((i, el) => {
      css += $(el).text();
    });
    css = css.replace(/\.doc-content/g, '');
    const cssOutputPath = path.join(OUTPUT_DIR, `${moduleName}Content.module.css`);
    fs.writeFileSync(cssOutputPath, css);

    const $body = $('body');
    
    // 1. Handle Images
    $body.find('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const imgName = path.basename(src);
        const sourceImgPath = path.join(path.dirname(htmlPath), src);
        const destImgPath = path.join(ASSETS_DIR, imgName);
        if (fs.existsSync(sourceImgPath)) {
          fs.copySync(sourceImgPath, destImgPath);
          $(el).attr('src', `/assets/modules/mosfetcmos/${imgName}`);
        }
      }
    });

    // 2. Generate Navigation and IDs
    const headings = [];
    $body.find('h1, h2, h3').each((i, el) => {
      const text = $(el).text().trim();
      const id = $(el).attr('id') || `section-${i}`;
      $(el).attr('id', id);
      if (text) {
        headings.push({ id, text, level: el.name });
      }
    });

    // 3. Transform Attributes and Escape Text Nodes
    function traverse(node) {
        if (node.type === 'text') {
            // Escape { and } simultaneously
            // ALSO escape backslashes for the template string
            node.data = node.data
                .replace(/\\/g, '\\\\')
                .replace(/[{}]/g, m => m === '{' ? '{"{"}' : '{"}"}');
            return;
        }

        if (node.type === 'tag') {
            const $el = $(node);
            
            const className = $el.attr('class');
            if (className) {
                const classes = className.split(/\s+/).filter(c => c).map(c => `styles[__Q__${c}__Q__]`).join(' + __Q__ __Q__ + ');
                $el.attr('className', `__JSX_ATTR_START__${classes}__JSX_ATTR_END__`);
                $el.removeAttr('class');
            }

            const styleStr = $el.attr('style');
            if (styleStr) {
                const styleObj = {};
                styleStr.split(';').forEach(pair => {
                    const colonIndex = pair.indexOf(':');
                    if (colonIndex > -1) {
                        const key = pair.substring(0, colonIndex).trim();
                        const value = pair.substring(colonIndex + 1).trim();
                        if (key && value) {
                            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
                            styleObj[camelKey] = value;
                        }
                    }
                });
                const styleJson = JSON.stringify(styleObj).replace(/"/g, '__Q__');
                $el.attr('style', `__JSX_ATTR_START__${styleJson}__JSX_ATTR_END__`);
            }

            if ($el.attr('colspan')) {
                $el.attr('colSpan', $el.attr('colspan'));
                $el.removeAttr('colspan');
            }
            if ($el.attr('rowspan')) {
                $el.attr('rowSpan', $el.attr('rowspan'));
                $el.removeAttr('rowspan');
            }

            if (node.children) {
                node.children.forEach(traverse);
            }
        }
    }

    $body.children().each((i, el) => traverse(el));

    let bodyHtml = $.html($body);
    bodyHtml = bodyHtml.replace(/^<body.*?>/, '').replace(/<\/body>$/, '');

    bodyHtml = bodyHtml
        .replace(/className="__JSX_ATTR_START__(.*?)__JSX_ATTR_END__"/g, 'className={$1}')
        .replace(/style="__JSX_ATTR_START__(.*?)__JSX_ATTR_END__"/g, 'style={$1}')
        .replace(/__Q__/g, '"')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ');

    const voidElements = ['img', 'hr', 'br', 'input', 'link', 'meta'];
    voidElements.forEach(tag => {
        const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
        bodyHtml = bodyHtml.replace(regex, `<${tag}$1 />`);
    });

    const pureJsxTemplate = `
import React from 'react';
import styles from './${moduleName}Content.module.css';
import globalStyles from '../../styles/ModularContent.module.css';

const ${moduleName}Content = () => {
  const headings = ${JSON.stringify(headings)};

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={globalStyles.moduleContainer}>
      <div className={globalStyles.sidebar}>
        <div className={globalStyles.sidebarHeader}>
          <h3>Topics Covered</h3>
        </div>
        <div className={globalStyles.sidebarContent}>
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToSection(heading.id)}
              className={globalStyles.navItem}
              style={{ paddingLeft: heading.level === 'h3' ? '2rem' : '1rem' }}
            >
              {heading.text}
            </button>
          ))}
        </div>
      </div>

      <div className={globalStyles.contentSection}>
        <div className={globalStyles.glassContent}>
          ${bodyHtml}
        </div>
      </div>
    </div>
  );
};

export default ${moduleName}Content;
`;

    const outputFilePath = path.join(OUTPUT_DIR, `${moduleName}Content.jsx`);
    console.log(`Writing to: ${outputFilePath}`);
    fs.writeFileSync(outputFilePath, pureJsxTemplate);

    console.log(`Success! ${moduleName} generated.`);

  } catch (err) {
    console.error(`Failed to convert ${moduleName}:`, err);
  }
}

async function main() {
  const htmlPath = 'c:/Users/priya/vlsi-physical-design-ocean/module_unzipped/MOSFETCMOS.html';
  if (fs.existsSync(htmlPath)) {
    console.log('HTML found! Starting conversion...');
    await convertFile(htmlPath, 'MOSFETCMOS');
  } else {
    console.error('Source HTML not found at', htmlPath);
  }
}

main();
