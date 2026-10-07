import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const assets = ['base-drenagem', 'quadra-tecnica', 'beach-tennis'];
await mkdir('assets/editorial-originals', { recursive: true });
for (const id of assets) {
  const original = `assets/editorial-originals/${id}.png`;
  await sharp(original).webp({ quality: 82 }).toFile(`public/illustrations/${id}-premium.webp`);
  await sharp(original).avif({ quality: 60 }).toFile(`public/illustrations/${id}-premium.avif`);
  console.log(id, await sharp(original).metadata());
}
