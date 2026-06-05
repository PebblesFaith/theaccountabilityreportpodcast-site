const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');

const sourceImage = path.join(
  rootDir,
  'public',
  'images',
  'branding',
  'tarp-microphone-favicon-master.png'
);

const outputFiles = [
  {
    size: 16,
    output: path.join(rootDir, 'public', 'favicon-16x16.png')
  },
  {
    size: 32,
    output: path.join(rootDir, 'public', 'favicon-32x32.png')
  },
  {
    size: 180,
    output: path.join(rootDir, 'public', 'apple-touch-icon.png')
  },
  {
    size: 192,
    output: path.join(rootDir, 'public', 'icon-192x192.png')
  },
  {
    size: 512,
    output: path.join(rootDir, 'public', 'icon-512x512.png')
  }
];

async function generateFavicons() {
  if (!fs.existsSync(sourceImage)) {
    throw new Error(`Missing source image: ${sourceImage}`);
  }

  for (const file of outputFiles) {
    await sharp(sourceImage)
      .resize(file.size, file.size, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(file.output);

    console.log(`Created ${path.relative(rootDir, file.output)}`);
  }

  await sharp(sourceImage)
    .resize(32, 32, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(path.join(rootDir, 'public', 'favicon.ico'));

  console.log('Created public/favicon.ico');

  const manifest = {
    name: 'The Accountability Report Podcast',
    short_name: 'Accountability Report',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    theme_color: '#0e2036',
    background_color: '#0e2036',
    display: 'standalone'
  };

  fs.writeFileSync(
    path.join(rootDir, 'public', 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log('Created public/site.webmanifest');
}

generateFavicons().catch((error) => {
  console.error(error);
  process.exit(1);
});