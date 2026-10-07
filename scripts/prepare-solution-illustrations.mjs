import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDirectory = path.join(root, 'assets/editorial-originals/solution-cards');
const outputDirectory = path.join(root, 'public/illustrations');
const slugs = [
  'construcao-de-quadras',
  'reforma-de-quadras',
  'pisos-esportivos',
  'grama-sintetica',
  'campos-de-futebol',
  'quadras-poliesportivas',
  'quadras-de-tenis',
  'quadras-de-beach-tennis',
  'pistas-de-atletismo',
  'estruturas-e-acessorios',
  'playgrounds',
  'paisagismo',
];

await fs.mkdir(outputDirectory, { recursive: true });

for (const slug of slugs) {
  const source = path.join(sourceDirectory, `${slug}.png`);
  const metadata = await sharp(source).metadata();
  if (metadata.width !== 1448 || metadata.height !== 1086)
    throw new Error(`${source} must be 1448×1086; received ${metadata.width}×${metadata.height}`);

  const outputBase = path.join(outputDirectory, `solucao-${slug}-premium`);
  await sharp(source).webp({ quality: 86, effort: 6 }).toFile(`${outputBase}.webp`);
  await sharp(source).avif({ quality: 55, effort: 6 }).toFile(`${outputBase}.avif`);
}

console.log(`Prepared ${slugs.length} solution illustrations in WebP and AVIF.`);
