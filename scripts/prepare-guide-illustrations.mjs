import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(
  root,
  'assets/editorial-originals/guide-cards/planejar-quadra-beach-tennis.png',
);
const outputDirectory = path.join(root, 'public/illustrations');
const outputBase = path.join(outputDirectory, 'guia-beach-tennis-premium');

await fs.mkdir(outputDirectory, { recursive: true });
const metadata = await sharp(source).metadata();
if (metadata.width !== 1448 || metadata.height !== 1086)
  throw new Error(`${source} must be 1448×1086; received ${metadata.width}×${metadata.height}`);

await sharp(source).webp({ quality: 86, effort: 6 }).toFile(`${outputBase}.webp`);
await sharp(source).avif({ quality: 55, effort: 6 }).toFile(`${outputBase}.avif`);

console.log('Prepared the beach-tennis guide illustration in WebP and AVIF.');
