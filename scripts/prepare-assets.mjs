import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

const root = process.cwd();
const archive = path.resolve(root, '../assets/biblioteca');
const publicRoot = path.join(root, 'public');
for (const dir of ['media', 'brand', 'illustrations', 'fonts'])
  await fs.mkdir(path.join(publicRoot, dir), { recursive: true });
const filenames = {
  'quadra-azul-exterior': 'construcao-de-quadra-poliesportiva-4.jpeg',
  'quadra-azul-coberta': 'Quadra-Esportiva-1.jpg',
  'quadra-ginasio': 'Quadra-Esportiva-12.jpg',
  'quadra-ginasio-detalhe': 'Quadra-Esportiva-10.jpg',
  'construcao-quadra': 'construcao-de-quadras-1.jpg',
  'piso-asfaltico': 'piso-asfaltico-para-quadras-poliesportivas.jpg',
  'piso-concreto': 'piso-de-concreto-para-quadras-poliesportivas.jpg',
  saibro: 'saibro-sintetico-para-quadras-poliesportivas.jpg',
};
const report = [];
for (const [id, filename] of Object.entries(filenames)) {
  const source = path.join(archive, 'imagens', filename);
  const metadata = await sharp(source).metadata();
  await sharp(source)
    .rotate()
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.015, saturation: 0.97 })
    .webp({ quality: 85 })
    .toFile(path.join(publicRoot, 'media', `${id}.webp`));
  await sharp(source)
    .rotate()
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.015, saturation: 0.97 })
    .avif({ quality: 55 })
    .toFile(path.join(publicRoot, 'media', `${id}.avif`));
  report.push({
    id,
    filename,
    width: metadata.width,
    height: metadata.height,
    rights: 'approved-owner',
    treatment: 'light-tonal-correction',
  });
}
for (const photo of [
  {
    id: 'beach-tennis-photo',
    source: 'assets/media-originals/beach-tennis-original.png',
    rights: 'approved-owner',
    treatment:
      'Owner photograph, lightly normalized without generative edits, then converted to WebP/AVIF.',
  },
  {
    id: 'grama-sintetica-referencia',
    source: 'assets/media-originals/grama-sintetica-referencia-pexels.jpg',
    rights: 'licensed-stock',
    treatment:
      'Licensed Pexels reference photograph, converted to WebP/AVIF without content edits.',
  },
  {
    id: 'ig-quadra-azul-multiesportiva',
    source: 'assets/media-originals/instagram/quadra-azul-multiesportiva-instagram.jpg',
    rights: 'approved-owner',
    treatment:
      'Owner-authorized public Instagram photo; light tonal correction only, no generative edits.',
  },
  {
    id: 'ig-quadra-verde-terracota',
    source: 'assets/media-originals/instagram/quadra-verde-terracota-instagram.jpg',
    rights: 'approved-owner',
    treatment:
      'Owner-authorized public Instagram photo; light tonal correction only, no generative edits.',
  },
  {
    id: 'ig-quadra-verde-tenis',
    source: 'assets/media-originals/instagram/quadra-tenis-verde-instagram.jpg',
    rights: 'approved-owner',
    treatment:
      'Owner-authorized public Instagram photo; light tonal correction only, no generative edits.',
  },
]) {
  const source = path.resolve(root, photo.source);
  const metadata = await sharp(source).metadata();
  for (const format of ['webp', 'avif']) {
    const pipeline = sharp(source).rotate();
    if (photo.id === 'beach-tennis-photo')
      pipeline.normalise({ lower: 1, upper: 99 }).modulate({ brightness: 1.025, saturation: 0.98 });
    if (photo.id.startsWith('ig-'))
      pipeline.normalise({ lower: 1, upper: 99 }).modulate({ brightness: 1.015, saturation: 0.97 });
    await pipeline[format](format === 'webp' ? { quality: 86 } : { quality: 55 }).toFile(
      path.join(publicRoot, 'media', `${photo.id}.${format}`),
    );
  }
  report.push({
    id: photo.id,
    filename: photo.source,
    width: metadata.width,
    height: metadata.height,
    rights: photo.rights,
    treatment: photo.treatment,
  });
}

// Trace the actual recovered logo color masks. Do not invent a replacement mark.
const logoPath = path.join(archive, 'logos/super-quadras-esportivas-1.png');
const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
async function traceMask(kind, symbolOnly = false) {
  const height = symbolOnly ? 79 : info.height;
  const mask = Buffer.alloc(info.width * height, 255);
  for (let y = 0; y < height; y++)
    for (let x = 0; x < info.width; x++) {
      const offset = (y * info.width + x) * 4;
      const [r, g, b, a] = data.subarray(offset, offset + 4);
      const green = g > r * 1.3 && g > b * 1.15 && g > 45;
      const blue = b > r * 1.4 && b > g * 1.15 && b > 55;
      const black = r < 200 && g < 200 && b < 200 && Math.max(r, g, b) - Math.min(r, g, b) < 35;
      if (a > 100 && (kind === 'green' ? green : kind === 'blue' ? blue : black))
        mask[y * info.width + x] = 0;
    }
  const png = await sharp(mask, { raw: { width: info.width, height, channels: 1 } })
    .png()
    .toBuffer();
  const svg = await new Promise((resolve, reject) =>
    potrace.trace(
      png,
      { threshold: 128, turdSize: 1, optTolerance: 0.15, color: 'black' },
      (error, svg) => (error ? reject(error) : resolve(svg)),
    ),
  );
  return svg.match(/<path[^>]*>/g)?.join('') ?? '';
}
const green = await traceMask('green');
const blue = await traceMask('blue');
const black = await traceMask('black');
const recolor = (paths, color) => paths.replace(/fill="[^"]*"/g, `fill="${color}"`);
const svgWrap = (paths, width = 186, height = 120) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${paths}</svg>`;
const variants = {
  'logo-positive': svgWrap(
    recolor(green, '#006B3C') + recolor(blue, '#06458A') + recolor(black, '#172127'),
  ),
  'logo-negative': svgWrap(
    recolor(green, '#75D3A1') + recolor(blue, '#90BCEB') + recolor(black, '#FFFFFF'),
  ),
  'logo-black': svgWrap(recolor(green + blue + black, '#172127')),
  'logo-white': svgWrap(recolor(green + blue + black, '#FFFFFF')),
  symbol: svgWrap(
    recolor(await traceMask('green', true), '#006B3C') +
      recolor(await traceMask('blue', true), '#06458A'),
    186,
    79,
  ),
};
// The faithful recovered composition is compact. Horizontal composition keeps the same traced lettering.
const lettering = recolor(black, '#172127');
variants['logo-horizontal'] =
  `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="80" viewBox="0 0 360 80"><g transform="translate(0 10) scale(.75)">${recolor(green, '#006B3C')}${recolor(blue, '#06458A')}</g><g transform="translate(166 -46) scale(1.04)">${lettering}</g></svg>`;
for (const [name, svg] of Object.entries(variants)) {
  await fs.writeFile(path.join(publicRoot, 'brand', `${name}.svg`), svg);
  await sharp(Buffer.from(svg))
    .resize({ width: name === 'logo-horizontal' ? 1440 : 744 })
    .png()
    .toFile(path.join(publicRoot, 'brand', `${name}.png`));
}
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="38" fill="#fff"/><g transform="translate(16 63) scale(.86)">${recolor(await traceMask('green', true), '#006B3C')}${recolor(await traceMask('blue', true), '#06458A')}</g></svg>`;
await fs.writeFile(path.join(publicRoot, 'brand/favicon.svg'), favicon);
for (const size of [180, 192, 512])
  await sharp(Buffer.from(favicon))
    .resize(size, size)
    .png()
    .toFile(path.join(publicRoot, 'brand', `icon-${size}.png`));
const icoImages = await Promise.all(
  [16, 32, 48].map((size) => sharp(Buffer.from(favicon)).resize(size, size).png().toBuffer()),
);
const icoHeader = Buffer.alloc(6 + 16 * icoImages.length);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(icoImages.length, 4);
let icoOffset = icoHeader.length;
icoImages.forEach((buffer, index) => {
  const entry = 6 + index * 16;
  icoHeader[entry] = [16, 32, 48][index];
  icoHeader[entry + 1] = [16, 32, 48][index];
  icoHeader.writeUInt16LE(1, entry + 4);
  icoHeader.writeUInt16LE(32, entry + 6);
  icoHeader.writeUInt32LE(buffer.length, entry + 8);
  icoHeader.writeUInt32LE(icoOffset, entry + 12);
  icoOffset += buffer.length;
});
await fs.writeFile(
  path.join(publicRoot, 'brand/favicon.ico'),
  Buffer.concat([icoHeader, ...icoImages]),
);
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#092C26"/><path d="M750 0H1200V630H420Z" fill="#006B3C"/><g transform="translate(70 62) scale(1.3)">${recolor(green + blue + black, '#FFFFFF')}</g><text x="70" y="340" fill="white" font-family="Arial" font-size="64" font-weight="bold">O seu próximo jogo</text><text x="70" y="420" fill="white" font-family="Arial" font-size="64" font-weight="bold">começa aqui.</text><text x="70" y="530" fill="#B8D8CB" font-family="Arial" font-size="28">Construção e reforma de quadras esportivas</text></svg>`;
await sharp(Buffer.from(social)).png().toFile(path.join(publicRoot, 'brand/social.png'));
await fs.copyFile(
  path.join(
    root,
    'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  ),
  path.join(publicRoot, 'fonts/manrope-variable.woff2'),
);
await fs.copyFile(
  path.join(root, 'node_modules/@fontsource-variable/manrope/LICENSE'),
  path.join(publicRoot, 'fonts/LICENSE.txt'),
);
await fs.writeFile(path.join(publicRoot, 'media/manifest.json'), JSON.stringify(report, null, 2));
console.log(
  `Prepared ${Object.keys(filenames).length} archive photos, supplemental photos, faithful logo traces, favicons and local fonts.`,
);
