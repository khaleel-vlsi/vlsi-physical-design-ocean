# Oceanic Module Migration Guide

This guide outlines the standardized process for migrating educational content from Google Doc-exported HTML into the React-based Oceanic design system. Use this process for Modules 3 through 26.

## 1. Prerequisites
- **Source HTML**: Export the Google Doc as HTML.
- **Image Assets**: Extract all images from the HTML export.
- **Extraction Script**: Ensure you have a script (e.g., `extract_content.cjs`) that converts HTML into a structured `extracted_content.json`.

## 2. Asset Preparation
1. Create a dedicated folder for the module assets: `public/assets/modules/module[ID]/`.
2. Rename and place all images inside this folder.
3. **Important**: Verify the filename for the "Header Image" or "Classification Diagram" (e.g., `image56.png` for MOSFET).

## 3. The Generator Script (`generate_component.cjs`)
The migration is driven by a Node.js script to ensure 100% data fidelity. The script should perform the following core tasks:

### A. Redundancy Filtering
Google Doc exports often contain noise at the top (empty images, duplicate titles).
```javascript
// Example: Skip first few noise elements
const filteredContent = content.slice(3);
```

### B. HTML Sanitization
Legacy HTML often contains `color: #000000` which is invisible on dark themes. The generator must strip these:
```javascript
const cleanHtml = (html) => {
    if (!html) return '';
    return html
        .replace(/color:\s*[^;"]+;?/gi, '')          // Strips inline text colors
        .replace(/background-color:\s*[^;"]+;?/gi, '') // Strips inline backgrounds
        .replace(/font-family:[^;"]+;?/gi, '')         // Strips specific fonts
        .replace(/`/g, '\\`').replace(/\${/g, '\\${'); // Escapes for template literals
};
```

### C. Path Normalization
Convert relative image paths to absolute public paths:
```javascript
const src = item.src.replace('images/', '/assets/modules/module[ID]/');
```

### D. Manual Injection
Manually add the main title and the primary diagram at the top of the `contentCard` to ensure a consistent entry point.

## 4. Design System (CSS)
Every module should have a corresponding `[ModuleName]Content.module.css`. Key requirements:
- **Glassmorphism**: Use `backdrop-filter: blur(16px)` and `rgba(30, 41, 59, 0.5)` for cards.
- **Color Inheritance**: Force spans to inherit color to prevent visibility issues:
  ```css
  .contentCard span { color: inherit !important; }
  ```
- **Navigation Grid**: Use a responsive grid for the "Topics Covered" buttons.
- **Image Alignment**: Ensure images are centered using a flexbox container:
  ```css
  .imageContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  ```
- **De-duplication**: Legacy HTML often embeds images inside paragraphs using `<span>`. To avoid double-rendering and layout shifts, **strip all `<img>` tags from the HTML strings** in the generator and render them only as dedicated `imageContainer` blocks.
- **Header Image**: Every module must start with a high-quality header image (e.g., the "Transistor Family" tree) manually injected at the top of the `contentCard`.

## 5. Integration Workflow
1. **Generate Component**: Run `node generate_module1.cjs` (or `generate_component.cjs`).
2. **Sanitize HTML**: Ensure `cleanHtml` removes all inline `<img>` tags.
3. **Register Component**: 
   - Add the module to `NATIVE_COMPONENTS` in `src/pages/ModuleDetail.jsx`.
4. **Update Metadata**:
   - Set `hasNativeContent: true` for the module ID in `src/data/modulesData.js`.

## 6. QA Checklist
- [ ] Does the "Topics Covered" section appear at the absolute top?
- [ ] Does clicking a topic button smooth-scroll to the correct heading?
- [ ] Are all images loading correctly from the public directory?
- [ ] Is there any "black on black" text (check for legacy inline styles)?
- [ ] Are tables responsive (wrapped in a scrollable container)?

## 7. High-Fidelity Migration Pattern (The "Module 8" Standard)
For the most accurate migrations (Module 8 and beyond), follow these enhanced rules to ensure 100% data fidelity and premium aesthetics.

### A. Enhanced Extraction Logic (`extract_content.cjs`)
To ensure "not a single letter" or image is missed, use a deep-scanning traversal:
- **Global Image Pre-Scan**: Extract all `<img>` tags first to verify total count.
- **Nested Image Support**: Explicitly check for images inside `<p>`, `<h1>-<h6>`, and `<div>` tags during traversal.
- **Recursion**: Ensure the `processNode` function recurses into all container divs, as exported HTML often nests content deep.

### B. Typography & Scale
To maintain a premium, readable look on all devices, use these refined CSS values:
- **H1 (Main Title)**: `font-size: clamp(1.1rem, 2.5vw, 1.5rem);` (Compact and professional).
- **H2 (Section Headings)**: `font-size: 1.3rem;` with `border-left: 4px solid #59dad1`.
- **Paragraphs**: `font-size: 1rem;` with `line-height: 1.6` for optimal readability.
- **Dividers**: `margin: 1.5rem 0;` (Avoids excessive vertical gaps).

### C. Image "Alignment to Matter"
To ensure technical diagrams stay visually connected to their descriptions:
- **Tight Margins**: Set `.imageContainer { margin: 0.5rem 0 1.5rem 0; }`.
- **Integrated Look**: Remove background boxes and borders from image containers unless they are specific "Analogy Boxes".
- **Responsive Width**: Use `max-width: min(100%, 850px);` to keep diagrams sharp and appropriately sized on large displays.

### D. Automated Navigation
- **Dynamic Headings**: Automatically generate the `headings` array from `h1` and `h2` tags.
- **"See More" Toggle**: If a module has many topics (e.g., Module 8 has 16), implement a toggle to show the first 9 topics and a "See X More" button to keep the header clean.

### E. Zero-Hardcode Rule
- **Natural Flow**: Do not hardcode "Header Images." Allow the document's natural first image to serve as the header to avoid duplication and maintain the author's intended flow.
- **Full Data Sync**: Verify that the final JSX line count and image count match the source document exactly.

## 8. Dual-Source & Technical Module Patterns (The "Module 4" Standard)
For complex modules involving multiple technologies (e.g., Linux & Tcl) or heavy technical scripting, use these advanced patterns.

### A. Multi-Source Merging
When combining multiple Google Doc exports:
- **Prefixing**: Add a technology-specific prefix (e.g., `[Linux]` or `[TCL]`) to all headings during extraction to maintain context in the search/navigation index.
- **Ordering**: Explicitly control the concatenation order in the extraction script to ensure the logical flow (e.g., Fundamentals first, then Scripting).

### B. Technical Command Safety (JSX Escaping)
Technical modules often use characters that break JSX (e.g., redirection operators `>`, `<` or curly braces `{}`).
- **Escape Function**: Implement an `escapeJsx` function in the generator:
  ```javascript
  const escapeJsx = (str) => {
      return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/{/g, '&#123;')
          .replace(/}/g, '&#125;');
  };
  ```
- **Dangerously Set InnerHTML**: Use `dangerouslySetInnerHTML` for code blocks to render the escaped entities correctly while keeping the build process stable.

### C. Code Block Batching (The "While Loop" Pattern)
Consecutive code lines in a script should appear in a **single box**, not individual ones.
- **Logic**: Use a `while` loop in the generator to look ahead for consecutive `code` items and join them with `\n` into a single `commandBox`.

### D. Side-by-Side Split Navigation
For modules with two distinct major topics:
- **Split Arrays**: Filter the extracted headings into two separate arrays (e.g., `linuxHeadings` and `tclHeadings`).
- **Independent Toggles**: Use separate React states (e.g., `showAllLinux`, `showAllTcl`) to allow users to expand each technology section individually.
- **Layout**: Use a flex container (`flex-direction: row`) to display the two navigation lists side-by-side on desktop, stacking them on mobile.

### E. Terminal Aesthetics
- **Styling**: Use a `#000` background with `#4ade80` (Emerald Green) text for `commandBox` elements.
- **Typography**: Force `font-family: 'Fira Code', monospace` and use `white-space: pre-wrap` to preserve script indentation.
