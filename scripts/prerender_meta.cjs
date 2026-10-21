/**
 * Build-time Pre-rendering of Static Entry Points
 * Generates route-specific HTML files in dist/ so that static hosting
 * immediately serves the correct Open Graph and SEO tags without client JS.
 */
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://siteupdate-opal.vercel.app';

const ROUTES_META = [
  {
    path: '/services',
    title: 'Services — Data Analytics, AI Assistants & Automation | Kozker',
    description: "Explore Kozker's engineering services: unified financial & operational BI, custom private AI copilots, and end-to-end webhook workflow automation.",
    ogImage: '/assets/4a80c6.webp',
  },
  {
    path: '/work',
    title: 'Work & Case Studies — Proven ROI & Automation | Kozker',
    description: 'Explore documented client case studies showing how Kozker built custom BI dashboards, AI copilots, and workflow automations that delivered up to 75% faster reporting and 3.2x ROI.',
    ogImage: '/assets/e467dd.webp',
  },
  {
    path: '/products',
    title: 'Products & Systems — AI Tools & Platforms | Kozker',
    description: 'Discover specialized software products engineered by Kozker, including AI recruitment platforms, automated workflow agents, and business analytics suites.',
    ogImage: '/assets/3132a8.webp',
  },
  {
    path: '/about',
    title: 'About Kozker — Systems, Speed & Pragmatic AI',
    description: 'Learn how Kozker partners with ambitious companies to design, build, and deploy reliable data intelligence pipelines, AI copilots, and workflow automations.',
    ogImage: '/assets/642e0f.png',
  },
  {
    path: '/partners',
    title: 'Partnerships & Advisory — Kozker Tech Network',
    description: 'Partner with Kozker to scale your tech operations, implement enterprise-grade AI copilots, and build resilient data pipelines.',
    ogImage: '/assets/d5b56b.webp',
  },
  {
    path: '/contact',
    title: 'Contact Kozker — Start Your Project',
    description: 'Get in touch with Kozker engineers to discuss custom BI dashboards, private AI assistants, and end-to-end automation systems.',
    ogImage: '/assets/og-preview.jpg',
  },
];

function prerender() {
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.log('[Prerender] dist/index.html not found. Skipping static entry point generation.');
    return;
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of ROUTES_META) {
    const routeDir = path.join(DIST_DIR, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    const canonical = `${BASE_URL}${route.path}`;
    const ogImg = `${BASE_URL}${route.ogImage}`;

    let html = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${route.title}" />`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
      .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonical}" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`)
      .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonical}" />`)
      .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${ogImg}" />`)
      .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${route.title}" />`)
      .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${route.description}" />`)
      .replace(/<meta name="twitter:image" content=".*?" \/>/, `<meta name="twitter:image" content="${ogImg}" />`)
      .replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonical}" />`);

    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
  }

  console.log(`[Prerender] Successfully generated static entry points for ${ROUTES_META.length} routes.`);
}

prerender();
