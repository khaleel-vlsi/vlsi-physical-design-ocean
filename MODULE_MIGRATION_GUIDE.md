# Module Migration Guide

This document is the **standard operating procedure** for migrating any Google Docs-based module into a native React component on the VLSI Physical Design Ocean platform. Follow every step in order. Do not skip steps.

---

## Prerequisites

- You have the Google Docs export zip (e.g. `inputs.zip`) from the user
- The zip contains:
  - `inputs.html` — the exported HTML of the document
  - `images/` folder — all images referenced in the HTML

---

## Step 1 — Identify the Module Number

Check `src/data/paidModulesData.js` to find the module's `id`.

```bash
# Example: Module 12 has id = 12
```

---

## Step 2 — Extract the Zip

Extract the zip into the `scratch/` folder. Keep the original filenames exactly as they are.

```powershell
mkdir scratch\moduleXX
tar -xf "C:\Users\priya\Downloads\inputs.zip" -C scratch\moduleXX
```

You should now have:
```
scratch/moduleXX/inputs.html
scratch/moduleXX/images/image1.png
scratch/moduleXX/images/image2.png
...
```

---

## Step 3 — Copy Images to Public Assets

Copy images using **exact original filenames** from the zip. Do NOT rename them. The HTML references them by their original names.

```powershell
mkdir public\assets\modules\moduleXX
Copy-Item scratch\moduleXX\images\*.png public\assets\modules\moduleXX\
```

Verify they all copied:

```powershell
Get-ChildItem public\assets\modules\moduleXX\
```

---

## Step 4 — Create the Parser Script

Copy `scratch/parse_module9_to_js.js` (the Module 9 reference parser) and adapt it for the new module. Save as `scratch/parse_moduleXX_to_js.js`.

**Key rules in the parser:**

### 4a. Image remapping — use `path.basename(src)` ALWAYS

```js
// CORRECT — preserves exact filename from HTML
$(el).find('img').each((j, img) => {
  const src = $(img).attr('src');
  if (src && src.startsWith('images/')) {
    const filename = path.basename(src);   // keeps original name
    $(img).attr('src', `/assets/modules/moduleXX/${filename}`);
  }
  $(img).removeAttr('style');
  $(img).addClass('native-img');
});

// WRONG — sequential numbering breaks the image-to-content mapping
$(img).attr('src', `/assets/modules/moduleXX/image${counter}.png`);
```

> Google Docs exports images with filenames that match their position in the HTML. `image8.png` may be the first image visually even though it is named 8. Sequential numbering destroys this mapping.

### 4b. Chapter splitting — scan the HTML structure first

Before writing the parser, **inspect the HTML** to understand what tags are used as chapter headings:

```js
// Run this to dump the first 30 elements of the HTML
$('body').children().each((i, el) => {
  if (i > 30) return;
  console.log(`[${i}] <${el.name}>: ${$(el).text().substring(0, 60)}`);
});
```

Common heading patterns:

| Tag | Use |
|-----|-----|
| `h1` | Top-level chapter break |
| `h2` | Sub-chapter break |
| `p` (bold) | Pseudo-header (e.g. "Sanity checks:") |

Configure the chapter splitter to match the document:

```js
// For h1 + h2 breaks:
if (tagName === 'h1' || tagName === 'h2') { ... }

// For pseudo-header paragraphs (check exact text from HTML):
const isPseudoHeader = tagName === 'p' && (
  text === 'Sanity checks:' ||
  text === 'Design checks:'
);
```

### 4c. Full parser template

```js
import fs from 'fs';
import * as cheerio from 'cheerio';
import path from 'path';

const html = fs.readFileSync('scratch/moduleXX/inputs.html', 'utf8');
const $ = cheerio.load(html);

$('style').remove();
$('meta').remove();
$('link').remove();
$('title').remove();
$('script').remove();

const rawChapters = [];
let currentChapter = { id: 'ch_intro', title: 'Introduction', elements: [] };

$('body').children().each((i, el) => {
  const tagName = el.name ? el.name.toLowerCase() : '';
  const text = $(el).text().trim();

  // Adjust heading detection based on actual HTML structure
  if (tagName === 'h1' || tagName === 'h2') {
    if (!text) return;
    if (currentChapter && (currentChapter.elements.length > 0 || currentChapter.id !== 'ch_intro')) {
      rawChapters.push(currentChapter);
    }
    const chId = `ch_${i}_${text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 35)}`;
    currentChapter = { id: chId, title: text, elements: [] };
  } else {
    if (currentChapter) currentChapter.elements.push(el);
  }
});
if (currentChapter) rawChapters.push(currentChapter);

const finalChapters = [];

rawChapters.forEach((ch) => {
  const htmlParts = [];
  ch.elements.forEach(el => {
    $(el).removeAttr('style');
    $(el).find('*').removeAttr('style');

    // Remap images — KEEP EXACT FILENAME
    $(el).find('img').each((j, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('images/')) {
        const filename = path.basename(src);
        $(img).attr('src', `/assets/modules/moduleXX/${filename}`);
      }
      $(img).removeAttr('style');
      $(img).addClass('native-img');
    });

    htmlParts.push($.html(el));
  });

  let chHtml = htmlParts.join('\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<br>/g, '<br />');

  const textContent = chHtml.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (textContent.length < 5 && ch.title.length < 4 && !chHtml.includes('<img')) return;

  finalChapters.push({ id: ch.id, title: ch.title, html: chHtml });
});

const outputData = `export const MODULEXX_CHAPTERS = ${JSON.stringify(finalChapters, null, 2)};\n`;
fs.writeFileSync('src/data/moduleXXData.js', outputData, 'utf8');
console.log('Done! Chapters:', finalChapters.length);
```

---

## Step 5 — Run the Parser

```powershell
node scratch/parse_moduleXX_to_js.js
```

This generates `src/data/moduleXXData.js`.

---

## Step 6 — Verify Image Mapping (CRITICAL)

Always run this check before touching any React files:

```js
// scratch/verify_images.cjs
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('src/data/moduleXXData.js', 'utf8')
    .replace('export const MODULEXX_CHAPTERS = ', '')
    .replace(/;\s*$/, '')
);

let allOk = true;
data.forEach(ch => {
  const imgs = [...ch.html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  if (imgs.length > 0) {
    console.log(`Chapter: "${ch.title.substring(0, 50)}"`);
    imgs.forEach(imgPath => {
      const localPath = imgPath.replace('/assets/', 'public/assets/');
      const exists = fs.existsSync(localPath);
      if (!exists) { console.log(`  MISSING: ${localPath}`); allOk = false; }
      else { console.log(`  OK: ${localPath}`); }
    });
  }
});
if (allOk) console.log('\nAll images verified - perfect match!');
```

```powershell
node scratch/verify_images.cjs
```

**Do not proceed if any image shows MISSING.**

---

## Step 7 — Create the React Component

Copy `src/pages/modules/Module9Content.jsx` as your base.
Save as `src/pages/modules/ModuleXXContent.jsx`.

Change these things:

| What | From (Module 9) | To (new module) |
|------|-----------------|-----------------|
| Import name | `MODULE9_CHAPTERS` | `MODULEXX_CHAPTERS` |
| Data file path | `../../data/module9Data` | `../../data/moduleXXData` |
| CSS file | `Module9Content.module.css` | `ModuleXXContent.module.css` |
| h1 title | `Module 9 - Static Timing...` | Your module title |
| Subtitle p | Module 9 description | Your module description |
| Nav section names | PNR, STA, Synthesis | Your 3 logical groupings |
| slice() ranges | `.slice(0, 10)` etc | Match your actual chapter count |

### Nav section grouping

Count total chapters from the data file, then divide into 3 logical groups:

```js
const group1 = MODULE_CHAPTERS.slice(0, N1);   // Group 1
const group2 = MODULE_CHAPTERS.slice(N1, N2);  // Group 2
const group3 = MODULE_CHAPTERS.slice(N2);       // Group 3
```

### Special: Full-width images for specific chapters

If any chapter needs full-size images (e.g. script/code screenshots), add `data-fullimg="true"` to that article:

```jsx
<article
  key={ch.id}
  id={ch.id}
  className={styles.contentCard}
  data-fullimg={ch.id === 'ch_XXX_chapter_name' ? 'true' : undefined}
>
```

Get the chapter id by looking at the generated `moduleXXData.js` file.

---

## Step 8 — Create the CSS File

Copy `src/pages/modules/Module9Content.module.css`.
Save as `src/pages/modules/ModuleXXContent.module.css`.

Change only the **accent colour** (find-replace all instances):

| Module | Accent colour hex |
|--------|------------------|
| Module 9 | `#38bdf8` (sky blue) |
| Module 12 | `#59dad1` (teal) |
| New module | Pick a new distinct colour |

Find-replace:
- `#38bdf8` → your new colour
- `rgba(56, 189, 248, ...)` → rgba version of your colour

### Image size rules (add to CSS)

```css
/* Medium size for most images */
.chapterBody :global(.native-img) {
  max-width: 65%;
  height: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin: 20px auto;
  display: block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

/* Full-width override for specific chapters (e.g. script screenshots) */
.contentCard[data-fullimg='true'] :global(.native-img) {
  max-width: 100%;
}

/* On mobile, always full width */
@media (max-width: 768px) {
  .chapterBody :global(.native-img) {
    max-width: 100%;
  }
}
```

### See More / See Less button style

```css
.toggleWrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.toggleBtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: transparent;
  border: 1.5px solid rgba(89, 218, 209, 0.35); /* use your accent colour */
  color: #59dad1;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggleBtn:hover {
  background: rgba(89, 218, 209, 0.08);
  border-color: rgba(89, 218, 209, 0.65);
}

.toggleCount {
  background: rgba(89, 218, 209, 0.15);
  border-radius: 4px;
  padding: 1px 7px;
  font-size: 0.72rem;
  font-weight: 700;
  color: #59dad1;
}
```

---

## Step 9 — Register in PaidModuleDetail.jsx

Open `src/pages/PaidModuleDetail.jsx`.

### 9a. Add lazy import at the top (with other imports)

```jsx
const ModuleXXContent = lazy(() => import('./modules/ModuleXXContent'));
```

### 9b. Add render condition in the JSX chain

Find the block of `moduleId === N ? ( ... ) :` conditionals and insert:

```jsx
) : moduleId === XX ? (
  <Suspense fallback={<div className={styles.loadingText}>Loading...</div>}>
    <ModuleXXContent />
  </Suspense>
) : (
```

---

## Step 10 — Test Locally

```powershell
npm run dev
```

Open: `http://localhost:5173/paid-modules/module/XX`

**Checklist before pushing:**

- [ ] All chapter names appear in the 3-column navigation grid
- [ ] Clicking a nav button smoothly scrolls to correct chapter
- [ ] Each image appears next to the correct content (matches original document)
- [ ] Images are 65% width (medium) — except full-width chapters
- [ ] No broken image icons — all images load
- [ ] Copy/right-click is blocked (copy protection working)
- [ ] Layout and styling matches Module 9 / Module 12

---

## Step 11 — Build & Push to GitHub

Only push after the user confirms the local preview looks correct.

```powershell
npm run build
git add .
git commit -m "Migrate Module XX - [Module Title]"
git push
```

---

## Files Created Per Migration

| File | Purpose |
|------|---------|
| `scratch/moduleXX/inputs.html` | Source HTML from Google Docs zip |
| `scratch/moduleXX/images/*.png` | Source images from zip |
| `scratch/parse_moduleXX_to_js.js` | Parser script (run once) |
| `scratch/verify_images.cjs` | Image verification (run after parse) |
| `public/assets/modules/moduleXX/*.png` | Public images |
| `src/data/moduleXXData.js` | Generated chapter data (auto-created) |
| `src/pages/modules/ModuleXXContent.jsx` | React component |
| `src/pages/modules/ModuleXXContent.module.css` | CSS styles |

Modified files:

| File | Change |
|------|--------|
| `src/pages/PaidModuleDetail.jsx` | Add lazy import + render condition |

---

## Critical Rules — Never Break These

1. **Never rename images** — Always use `path.basename(src)` in the parser. Never use sequential counters.
2. **Always verify images** — Run `verify_images.cjs` after every parser run. Fix all MISSING before continuing.
3. **Inspect HTML first** — Check the first 30 elements of `body` to understand the chapter heading structure before writing the parser.
4. **Base CSS on Module 9** — Module 9 is the cleanest reference. Only change the accent colour.
5. **Test locally first** — Never push to GitHub until the user has approved the local preview.
