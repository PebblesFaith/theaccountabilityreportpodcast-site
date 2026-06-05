const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const rootDir = path.resolve(__dirname, '..');
const viewsDir = path.join(rootDir, 'views');
const publicDir = path.join(rootDir, 'public');
const docsDir = path.join(rootDir, 'docs');

const siteName = 'The Accountability Report Podcast';



const pages = [
  {
    route: '/',
    output: 'index.html',
    template: 'index',
    title: 'Home',
    activeNav: 'home',
    pageCss: 'main.css'
  },
  {
    route: '/about/',
    output: 'about/index.html',
    template: 'about',
    title: 'About',
    activeNav: 'about',
    pageCss: 'about.css'
  },
  {
    route: '/episodes/',
    output: 'episodes/index.html',
    template: 'episodes',
    title: 'Episodes',
    activeNav: 'episodes',
    pageCss: 'episodes.css'
  },
  {
    route: '/reports/',
    output: 'reports/index.html',
    template: 'reports',
    title: 'Reports',
    activeNav: 'reports',
    pageCss: 'reports.css'
  },
  {
    route: '/submit-tip/',
    output: 'submit-tip/index.html',
    template: 'submitatip',
    title: 'Submit a Tip',
    activeNav: 'submitatip',
    pageCss: 'submitatip.css'
  },
  {
    route: '/contact/',
    output: 'contact/index.html',
    template: 'contact',
    title: 'Contact',
    activeNav: 'contact',
    pageCss: 'contact.css'
  },
  {
    route: '/disclaimer/',
    output: 'disclaimer/index.html',
    template: 'disclaimer',
    title: 'Disclaimer',
    activeNav: 'disclaimer',
    pageCss: 'disclaimer.css'
  },
  {
    route: '/privacy-policy/',
    output: 'privacy-policy/index.html',
    template: 'privacypolicy',
    title: 'Privacy Policy',
    activeNav: 'privacypolicy',
    pageCss: 'privacypolicy.css'
  },
  {
    route: '/editorial-policy/',
    output: 'editorial-policy/index.html',
    template: 'editorialpolicy',
    title: 'Editorial Policy',
    activeNav: 'editorialpolicy',
    pageCss: 'editorialpolicy.css'
  },
  {
    route: '/corrections-policy/',
    output: 'corrections-policy/index.html',
    template: 'correctionspolicy',
    title: 'Corrections Policy',
    activeNav: 'correctionspolicy',
    pageCss: 'correctionspolicy.css'
  }
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyDirectoryContents(source, target) {
  if (!fs.existsSync(source)) {
    console.warn(`Skipping missing directory: ${source}`);
    return;
  }

  ensureDir(target);

  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    fs.cpSync(sourcePath, targetPath, {
      recursive: true,
      force: true
    });
  }
}

function findTemplate(templateName) {
  const candidates = [
    path.join(viewsDir, `${templateName}.ejs`),
    path.join(viewsDir, 'pages', `${templateName}.ejs`),
    path.join(viewsDir, templateName, 'index.ejs')
  ];

  const found = candidates.find((candidate) => fs.existsSync(candidate));

  if (!found) {
    throw new Error(
      `Could not find EJS template for "${templateName}". Checked:\n${candidates.join('\n')}`
    );
  }

  return found;
}

async function renderPage(page) {
  const templatePath = findTemplate(page.template);
  const outputPath = path.join(docsDir, page.output);

  const locals = {
    siteName,
    title: page.title,
    pageTitle: page.title,
    fullTitle: `${page.title} | ${siteName}`,
    activeNav: page.activeNav,
    activePage: page.activeNav,
    currentPath: page.route,
    pageCss: page.pageCss,
    isStaticBuild: true,

    // Keep forms inactive for the GitHub Pages static version.
    submitTipActive: false,
    contactFormActive: false,

    // Shared footer/header value.
    currentYear: new Date().getFullYear()
  };

  const html = await ejs.renderFile(templatePath, locals, {
    root: viewsDir,
    views: [viewsDir]
  });

  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log(`Exported ${page.route} -> docs/${page.output}`);
}

async function exportStaticSite() {
  console.log('Starting static export...');

  fs.rmSync(docsDir, { recursive: true, force: true });
  ensureDir(docsDir);

  copyDirectoryContents(publicDir, docsDir);

  for (const page of pages) {
    await renderPage(page);
  }

  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '', 'utf8');

  console.log('Static export complete.');
}

exportStaticSite().catch((error) => {
  console.error(error);
  process.exit(1);
});