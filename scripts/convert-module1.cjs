const fs = require('fs-extra');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Specialized Module 1 Converter (v7) - CLEANER JSX & PREMIUM STYLES
 * - Fixes p > div nesting.
 * - Uses figure for images.
 * - Maps images sequentially.
 */

const INPUT_HTML = path.join(__dirname, '../src/pages/modules/module1_raw.html');
const OUTPUT_FILE = path.join(__dirname, '../src/pages/modules/Module1Content.jsx');
const MODULE_NAME = 'Module1';
const ASSET_PATH_PREFIX = '/assets/modules/module1';

async function convert() {
  try {
    console.log('--- Starting Module 1 High-Fidelity Conversion (v7) ---');

    if (!fs.existsSync(INPUT_HTML)) {
      console.error(`Error: ${INPUT_HTML} not found.`);
      return;
    }

    const htmlContent = fs.readFileSync(INPUT_HTML, 'utf8');
    const $ = cheerio.load(htmlContent);

    // 1. Process Images Sequentially & Cleanup Nesting
    let imgCounter = 0;
    $('img').each((i, el) => {
      let src = $(el).attr('src');
      if (src && src.trim() !== '') {
        imgCounter++;
        const newSrc = `${ASSET_PATH_PREFIX}/image_${imgCounter}.png`;
        
        // Create a figure element
        const $figure = $('<figure class="imageWrapper"></figure>');
        const $newImg = $(`<img src="${newSrc}" alt="Module 1 Image ${imgCounter}" class="nativeImg" />`);
        $figure.append($newImg);
        
        // Find the parent P and replace it if it only contains this image
        const $parentP = $(el).closest('p');
        if ($parentP.length && $parentP.text().trim() === '') {
           $parentP.replaceWith($figure);
        } else {
           $(el).replaceWith($figure);
        }
      } else {
        $(el).remove();
      }
    });

    // 2. Clean Styles & Structure
    $('*').removeAttr('style');
    $('style').remove();
    $('meta').remove();
    $('link').remove();
    $('title').remove();

    // 3. Extract Topics & Assign IDs
    const topics = [];
    $('h1, h2').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 3) {
        const id = `topic-${i}`;
        $(el).attr('id', id);
        topics.push({ id, label: text });
      }
    });

    // 4. Add CSS Classes
    $('h1').addClass('nativeTitle');
    $('h2').addClass('nativeTitle');
    $('p').addClass('textBlock');
    $('table').addClass('technicalTable');
    $('ul, ol').addClass('topicsList');
    
    // Wrap tables
    $('table').each((i, el) => {
       $(el).wrap('<div class="technicalTableWrapper"></div>');
    });

    // 5. Generate JSX Content
    let bodyContent = $('body').html() || '';

    // Sanitize for JSX
    bodyContent = bodyContent.replace(/[{}]/g, (match) => {
      return match === '{' ? '{"{"}' : '{"}"}';
    });

    // Handle class to className
    bodyContent = bodyContent
      .replace(/class="([^"]*)"/g, (match, p1) => {
        const classes = p1.split(/\s+/).filter(c => c.length > 0);
        if (classes.length === 0) return '';
        
        const mapped = classes.map(c => `styles['${c}']`).join(', ');
        return `className={cn(${mapped})}`;
      })
      .replace(/id="([^"]*)"/g, 'id="$1"') 
      .replace(/<img([^>]*)>/g, (match, p1) => {
         if (!p1.endsWith('/')) return `<img${p1} />`;
         return match;
      })
      .replace(/<hr>/g, '<hr className={styles.sectionDivider} />')
      .replace(/<br>/g, '<br />')
      .replace(/&nbsp;/g, ' ')
      .replace(/<span[^>]*>/g, '') 
      .replace(/<\/span>/g, '');

    const splitBody = bodyContent.split('><').join('>\n<');

    const jsxTemplate = `
import React from 'react';
import styles from '../ModuleDetail.module.css';

// Helper for multiple classes
const cn = (...args) => args.filter(Boolean).join(' ');

const ${MODULE_NAME}Content = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const topics = ${JSON.stringify(topics, null, 2)};

  return (
    <div className={styles.nativeContent}>
      {/* Topics Quick Access Navigation */}
      <div className={styles.topicsNav}>
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
${splitBody}
      </div>
    </div>
  );
};

export default ${MODULE_NAME}Content;
`;

    fs.writeFileSync(OUTPUT_FILE, jsxTemplate);
    console.log(`Success! Module 1 component regenerated with premium styles at: ${OUTPUT_FILE}`);

  } catch (err) {
    console.error('Conversion Failed:', err);
  }
}

convert();
