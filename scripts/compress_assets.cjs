/**
 * Technical SEO Asset Pre-Compression
 * Generates pre-compressed Brotli (.br) and Gzip (.gz) text assets in dist/
 * for HTTP/2 & HTTP/3 servers with zero runtime CPU overhead.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DIST_DIR = path.resolve(__dirname, '../dist');
const TARGET_EXTENSIONS = ['.html', '.css', '.js', '.svg', '.json', '.xml', '.txt'];

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

function compressAssets() {
  if (!fs.existsSync(DIST_DIR)) {
    console.log('[SEO Compression] dist/ directory not found. Skipping pre-compression.');
    return;
  }

  let fileCount = 0;
  let originalBytes = 0;
  let brotliBytes = 0;

  walkDir(DIST_DIR, (filePath) => {
    // Skip already compressed files
    if (filePath.endsWith('.br') || filePath.endsWith('.gz')) return;

    const ext = path.extname(filePath).toLowerCase();
    if (TARGET_EXTENSIONS.includes(ext)) {
      const buffer = fs.readFileSync(filePath);
      originalBytes += buffer.length;

      // 1. Brotli (.br) quality 11 (maximum compression)
      const brBuffer = zlib.brotliCompressSync(buffer, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_MODE]: ext === '.html' ? zlib.constants.BROTLI_MODE_TEXT : zlib.constants.BROTLI_MODE_GENERIC,
        },
      });
      fs.writeFileSync(`${filePath}.br`, brBuffer);
      brotliBytes += brBuffer.length;

      // 2. Gzip (.gz) level 9 (maximum compression fallback)
      const gzBuffer = zlib.gzipSync(buffer, { level: 9 });
      fs.writeFileSync(`${filePath}.gz`, gzBuffer);

      fileCount++;
    }
  });

  const savedPercent = originalBytes > 0 ? (((originalBytes - brotliBytes) / originalBytes) * 100).toFixed(1) : 0;
  console.log(`[SEO Compression] Successfully generated Brotli (.br) and Gzip (.gz) for ${fileCount} assets.`);
  console.log(`[SEO Compression] Original: ${(originalBytes / 1024).toFixed(1)} KB | Brotli: ${(brotliBytes / 1024).toFixed(1)} KB (-${savedPercent}% bandwidth reduction)`);
}

compressAssets();
