const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');

// We have to read modulesData manually because it's ES module or standard JS
// We can just regex or parse the modulesData.js file to extract module IDs.
const modulesDataPath = path.join(__dirname, 'src', 'data', 'modulesData.js');
const paidModulesDataPath = path.join(__dirname, 'src', 'data', 'paidModulesData.js');

const extractIds = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const ids = [];
    const regex = /"id":\s*(\d+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      ids.push(match[1]);
    }
    // De-duplicate just in case
    return [...new Set(ids)];
  } catch (err) {
    console.error('Error reading', filePath, err);
    return [];
  }
};

const domain = 'https://vlsiphysicaldesignocean.com';

const generateSitemap = () => {
  const moduleIds = extractIds(modulesDataPath);
  // Optional: add paid modules if they are public facing for SEO
  // const paidModuleIds = extractIds(paidModulesDataPath);

  const today = new Date().toISOString().split('T')[0];
  const staticRoutes = [
    { path: '', priority: '1.0', freq: 'daily' },
    { path: '/about', priority: '0.8', freq: 'weekly' },
    { path: '/contact', priority: '0.8', freq: 'weekly' },
    { path: '/privacy', priority: '0.5', freq: 'monthly' },
    { path: '/modules', priority: '0.9', freq: 'daily' },
    { path: '/interview', priority: '0.9', freq: 'weekly' }
  ];

  const fs = require('fs');
  const path = require('path');

  const getImagesForModule = (moduleId) => {
    // Map of module ID to filename
    const fileMap = {
      "1": "Module1Content.jsx",
      "2": "MOSFETCMOSContent.jsx",
      "4": "Module4Content.jsx",
      "5": "Module5Content.jsx",
      "6": "Module6Content.jsx",
      "7": "Module7Content.jsx",
      "8": "Module8Content.jsx"
    };

    const fileName = fileMap[moduleId];
    if (!fileName) return [];

    try {
      const filePath = path.join(__dirname, 'src/pages/modules', fileName);
      if (!fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, 'utf8');
      const imgRegex = /src="([^"]+)"/g;
      let match;
      const images = [];
      while ((match = imgRegex.exec(content)) !== null) {
        if (match[1].startsWith('/assets/modules')) {
          images.push(match[1]);
        }
      }
      return [...new Set(images)]; // Unique images
    } catch (e) {
      return [];
    }
  };

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticRoutes.map(route => `  <url>
    <loc>${domain}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.freq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
${moduleIds.map(id => {
  const images = getImagesForModule(id);
  return `  <url>
    <loc>${domain}/modules/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
${images.map(img => `    <image:image>
      <image:loc>${domain}${img}</image:loc>
    </image:image>`).join('\n')}
  </url>`;
}).join('\n')}
</urlset>
`;

  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapContent);
  console.log('Successfully generated public/sitemap.xml');
};

generateSitemap();
