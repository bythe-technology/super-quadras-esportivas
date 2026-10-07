import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { services } from '../src/modules/content/services';
import { guides } from '../src/modules/content/guides';
import { media } from '../src/modules/content/media';
const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function lines(title: string) {
  const result: string[] = [];
  let line = '';
  for (const word of title.split(' ')) {
    if ((line + ' ' + word).length > 28 && line) {
      result.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) result.push(line);
  return result;
}
const logo = (await fs.readFile(path.resolve('public/brand/logo-white.svg'), 'utf8'))
  .replace(/<svg[^>]*>/, '')
  .replace('</svg>', '');
for (const item of [...services, ...guides]) {
  const title = lines(item.title);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#102D25"/><path d="M1000 0H1200V630H600Z" fill="#006B3C"/><g transform="translate(70 45) scale(1.15)">${logo}</g>${title.map((line, i) => `<text x="70" y="${285 + i * 75}" fill="white" font-family="Arial" font-size="58" font-weight="bold">${escapeXml(line)}</text>`).join('')}<text x="70" y="580" fill="#C4D7CD" font-family="Arial" font-size="25">Super Quadras Esportivas · São Paulo e Brasil</text></svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.resolve(`public/brand/social-${item.slug}.png`));
}
console.log('Prepared 15 service/editorial social cards.');
await fs.writeFile('public/media/catalog.json', JSON.stringify(media, null, 2));
