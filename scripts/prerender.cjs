const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4173;

const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/modules',
  '/modules/1',
  '/modules/2',
  '/modules/3',
  '/modules/4',
  '/modules/5',
  '/modules/6',
  '/modules/7',
  '/test-videos',
  '/test-quiz-modules',
  '/platform-flow',
  '/study-materials',
  '/pnr-execution',
  '/pnr-workshop',
  '/user-guides',
  '/reviews',
  '/interview',
  '/test-video-playlist/1',
  '/test-video-playlist/2',
  '/test-video-playlist/3',
  '/test-video-playlist/4',
  '/test-video-playlist/5',
  '/test-video-playlist/6',
  '/test-video-playlist/7',
  '/test-quiz-playlist/1',
  '/test-quiz-playlist/2',
  '/test-quiz-playlist/3',
  '/test-quiz-playlist/4',
  '/test-quiz-playlist/5',
  '/test-quiz-playlist/6',
  '/test-quiz-playlist/7',
];

// Helper to determine MIME types for the static file server
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Simple static HTTP server serving the dist/ directory with SPA fallback to /index.html
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = path.join(DIST_DIR, urlPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }

      if (!fs.existsSync(filePath)) {
        filePath = path.join(DIST_DIR, 'index.html');
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
          res.end(content, 'utf-8');
        }
      });
    });

    server.listen(PORT, () => {
      console.log(`[Prerender] Local static preview server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runPrerender() {
  console.log('[Prerender] Starting route-level static prerendering...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('[Prerender Error] dist/ directory does not exist. Run vite build first!');
    process.exit(1);
  }

  // Import Chromium from @playwright/test or playwright
  let playwright;
  try {
    playwright = require('@playwright/test');
  } catch (e) {
    playwright = require('playwright');
  }

  const server = await startServer();
  const browser = await playwright.chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  for (const route of PUBLIC_ROUTES) {
    const targetUrl = `http://localhost:${PORT}${route}`;
    console.log(`[Prerender] Pre-rendering: ${route}`);

    try {
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // Give a small buffer for React components and Helmet metadata to settle
      await page.waitForTimeout(1000);

      const htmlContent = await page.evaluate(() => {
        return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
      });

      let outDir;
      if (route === '/') {
        outDir = DIST_DIR;
      } else {
        outDir = path.join(DIST_DIR, route);
      }

      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, htmlContent, 'utf-8');
      console.log(`  ✓ Saved: ${path.relative(DIST_DIR, outFile)} (${(htmlContent.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✕ Error pre-rendering ${route}:`, err.message);
    }
  }

  await browser.close();
  server.close();
  console.log(`[Prerender] All ${PUBLIC_ROUTES.length} public routes statically pre-rendered successfully!`);
}

runPrerender().catch((err) => {
  console.error('[Prerender Fatal Error]:', err);
  process.exit(1);
});
