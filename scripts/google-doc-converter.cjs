const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');
const cheerio = require('cheerio');
const prettier = require('prettier');

/**
 * Google Docs to React Component Converter (Refined)
 * Produces high-fidelity, professional React components for VLSI Ocean.
 */

const OUTPUT_DIR = path.join(__dirname, '../src/pages/modules');
const ASSETS_DIR = path.join(__dirname, '../public/assets/modules');

async function convertFile(inputPath, moduleName) {
  try {
    console.log(`--- Processing: ${moduleName} ---`);
    
    let htmlContent;
    let tempDir = null;

    if (inputPath.endsWith('.zip')) {
      tempDir = path.join(__dirname, `../temp_${moduleName}`);
      if (fs.existsSync(tempDir)) fs.removeSync(tempDir);
      fs.ensureDirSync(tempDir);
      
      const zip = new AdmZip(inputPath);
      zip.extractAllTo(tempDir, true);
      
      const files = fs.readdirSync(tempDir);
      const htmlFileName = files.find(f => f.endsWith('.html'));
      if (!htmlFileName) throw new Error('No HTML found in ZIP');
      
      htmlContent = fs.readFileSync(path.join(tempDir, htmlFileName), 'utf8');
    } else {
      htmlContent = fs.readFileSync(inputPath, 'utf8');
    }

    const $ = cheerio.load(htmlContent);
    const moduleAssetsDir = path.join(ASSETS_DIR, moduleName.toLowerCase());
    fs.ensureDirSync(moduleAssetsDir);

    // 1. Process Images
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const sourcePath = tempDir ? path.join(tempDir, src) : path.join(path.dirname(inputPath), src);
        if (fs.existsSync(sourcePath)) {
          const imgName = path.basename(sourcePath);
          const targetPath = path.join(moduleAssetsDir, imgName);
          fs.copySync(sourcePath, targetPath);
          $(el).attr('src', `/assets/modules/${moduleName.toLowerCase()}/${imgName}`);
        }
      }
      $(el).addClass('nativeImg');
      $(el).removeAttr('style');
    });

    // 2. Clean structure but preserve semantics
    $('style').remove();
    $('*').removeAttr('style');
    
    // 3. Extract Topics
    const topics = [];
    $('h1, h2').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 3) {
        const id = `topic-${i}`;
        $(el).attr('id', id);
        $(el).addClass('nativeTitle');
        topics.push({ id, label: text });
      }
    });

    $('p').addClass('textBlock');
    $('table').addClass('technicalTable');
    $('ul, ol').addClass('topicsList');

    // 4. Handle Formulas (Google Docs often exports them as spans with specific text)
    $('span').each((i, el) => {
      const text = $(el).text().trim();
      if (text.includes('=') && (text.includes('V') || text.includes('I') || text.includes('R'))) {
        $(el).parent().addClass('formulaBox');
      }
    });

    // 5. Generate JSX
    const bodyHtml = $('body').html()
      .replace(/{/g, '&lcub;')
      .replace(/}/g, '&rcub;')
      .replace(/class="([^"]*)"/g, 'className={styles.$1}')
      .replace(/<img([^>]*)>/g, '<img$1 />')
      .replace(/<hr>/g, '<hr className={styles.sectionDivider} />')
      .replace(/<br>/g, '<br />')
      .replace(/&nbsp;/g, ' ')
      .replace(/colspan=/g, 'colSpan=')
      .replace(/rowspan=/g, 'rowSpan=');

    const jsxTemplate = `
import React from 'react';
import styles from '../ModuleDetail.module.css';

const ${moduleName}Content = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const topics = ${JSON.stringify(topics, null, 2)};

  return (
    <div className={styles.nativeContent}>
      <div className={styles.topicsNav}>
        <h2 className={styles.navTitle}>Topics Covered</h2>
        {topics.map((topic) => (
          <button 
            key={topic.id} 
            onClick={() => scrollToSection(topic.id)}
            className={styles.topicNavBtn}
          >
            {topic.label}
          </button>
        ))}
      </div>

      <div className={styles.contentSection}>
        ${bodyHtml}
      </div>
    </div>
  );
};

export default ${moduleName}Content;
`;

    // 6. Format with Prettier
    const formattedJsx = await prettier.format(jsxTemplate, { parser: 'babel' });

    const outputFilePath = path.join(OUTPUT_DIR, `${moduleName}Content.jsx`);
    fs.writeFileSync(outputFilePath, formattedJsx);

    console.log(`Success! ${moduleName} generated.`);
    if (tempDir) fs.removeSync(tempDir);

  } catch (err) {
    console.error(`Failed to convert ${moduleName}:`, err);
  }
}

async function main() {
  // Process Module 1
  await convertFile(
    path.join(__dirname, '../src/pages/modules/module1_raw.html'),
    'Module1'
  );

  // Process Module 2
  if (fs.existsSync('module.zip')) {
    await convertFile('module.zip', 'MOSFETCMOS');
  }
}

main();
