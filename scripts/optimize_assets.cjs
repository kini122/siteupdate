const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = path.join(__dirname, '../public/assets');

async function optimize() {
  console.log('Starting asset optimization...');

  // 1. Tool icons (displayed at 47x47 -> resize to 96x96)
  const toolIcons = ['0c5d97.png', '53cb26.png', '57de97.png', 'e8263c.png'];
  for (const name of toolIcons) {
    const fullPath = path.join(assetsDir, name);
    if (!fs.existsSync(fullPath)) continue;
    const input = fs.readFileSync(fullPath);

    // Optimized PNG
    const pngBuf = await sharp(input)
      .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();
    fs.writeFileSync(fullPath, pngBuf);

    // WebP version
    const webpName = name.replace(/\.png$/, '.webp');
    const webpBuf = await sharp(input)
      .resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();
    fs.writeFileSync(path.join(assetsDir, webpName), webpBuf);

    console.log(`Optimized ${name} (PNG: ${pngBuf.length}B, WebP: ${webpBuf.length}B)`);
  }

  // 2. Flow diagram 9fa5e8.png (displayed at max 595x256 -> resize to 720 width)
  {
    const dPath = path.join(assetsDir, '9fa5e8.png');
    if (fs.existsSync(dPath)) {
      const input = fs.readFileSync(dPath);
      const pngBuf = await sharp(input)
        .resize({ width: 720, fit: 'inside', withoutEnlargement: true })
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toBuffer();
      fs.writeFileSync(dPath, pngBuf);

      const webpBuf = await sharp(input)
        .resize({ width: 720, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(path.join(assetsDir, '9fa5e8.webp'), webpBuf);
      console.log(`Optimized 9fa5e8.png (PNG: ${pngBuf.length}B, WebP: ${webpBuf.length}B)`);
    }
  }

  // 3. JPEGs and other showcase images
  const otherImages = [
    '4a80c6.jpg',
    'e467dd.jpg',
    '3132a8.jpg',
    '671883.jpg',
    'd5b56b.jpg',
    '0c83b9.jpg',
    '33108f.jpg',
    '60ed30.jpg',
    'fd345e.jpg',
    '642e0f.png',
    '887522.png',
    'ai-tools-platform.jpg',
    'recruiter-ai.jpg'
  ];

  for (const name of otherImages) {
    const fullPath = path.join(assetsDir, name);
    if (!fs.existsSync(fullPath)) continue;
    const input = fs.readFileSync(fullPath);

    // Optimize original format
    if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
      const jpgBuf = await sharp(input)
        .resize({ width: 900, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer();
      fs.writeFileSync(fullPath, jpgBuf);
      const webpName = name.replace(/\.jpe?g$/, '.webp');
      const webpBuf = await sharp(input)
        .resize({ width: 900, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(path.join(assetsDir, webpName), webpBuf);
      console.log(`Optimized ${name} (JPEG: ${jpgBuf.length}B, WebP: ${webpBuf.length}B)`);
    } else if (name.endsWith('.png')) {
      const pngBuf = await sharp(input)
        .resize({ width: 900, fit: 'inside', withoutEnlargement: true })
        .png({ compressionLevel: 9, palette: true })
        .toBuffer();
      fs.writeFileSync(fullPath, pngBuf);
      const webpName = name.replace(/\.png$/, '.webp');
      const webpBuf = await sharp(input)
        .resize({ width: 900, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      fs.writeFileSync(path.join(assetsDir, webpName), webpBuf);
      console.log(`Optimized ${name} (PNG: ${pngBuf.length}B, WebP: ${webpBuf.length}B)`);
    }
  }

  console.log('Asset optimization complete!');
}

optimize();
