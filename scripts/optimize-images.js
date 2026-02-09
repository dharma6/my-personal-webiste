/**
 * Image Optimization Script
 *
 * This script optimizes images in the public folder by:
 * 1. Converting to WebP format
 * 2. Compressing to reduce file size
 * 3. Maintaining quality at 85%
 *
 * Usage: node scripts/optimize-images.js
 *
 * Prerequisites: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');

const imagesToOptimize = [
  'atomic-habits.png',
  'culture-play.png',
  'dopamine-nation.jpg',
  'focus.png',
  'g2g.png',
  'think-big.jpg',
];

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  const outputPath = path.join(PUBLIC_DIR, `${name}.webp`);

  try {
    const stats = fs.statSync(inputPath);
    const sizeBefore = (stats.size / 1024 / 1024).toFixed(2);

    await sharp(inputPath)
      .webp({ quality: 85 })
      .resize(800, 800, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFile(outputPath);

    const statsAfter = fs.statSync(outputPath);
    const sizeAfter = (statsAfter.size / 1024 / 1024).toFixed(2);
    const savings = ((1 - statsAfter.size / stats.size) * 100).toFixed(1);

    console.log(`✅ ${filename}`);
    console.log(
      `   Before: ${sizeBefore}MB → After: ${sizeAfter}MB (${savings}% smaller)`
    );
    console.log(`   Saved as: ${name}.webp\n`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('✨ Image optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update assets/assets.js to use .webp extensions');
  console.log('2. Test the site to ensure images load correctly');
  console.log('3. Delete the old .png/.jpg files if everything works');
}

main();
