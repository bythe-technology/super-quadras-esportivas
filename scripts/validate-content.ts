import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { services } from '../src/modules/content/services';
import { projects } from '../src/modules/content/projects';
import { guides } from '../src/modules/content/guides';
import { media } from '../src/modules/content/media';
import { company } from '../src/modules/company/profile';
import { validateContent } from '../src/validators/content';
import { siteApproved } from '../src/services/publication';
const errors = validateContent({
  services,
  projects,
  guides,
  media,
  approved: siteApproved,
});
const converted: { id: string; width: number; height: number }[] = JSON.parse(
  readFileSync('public/media/manifest.json', 'utf8'),
);
for (const asset of media.filter((m) => m.kind === 'archive-photo')) {
  const dimensions = converted.find((item) => item.id === asset.id);
  if (dimensions?.width !== asset.width || dimensions.height !== asset.height)
    errors.push(`Incorrect media dimensions: ${asset.id}`);
}
for (const asset of media)
  if (!existsSync(resolve('public', asset.src.slice(1)))) errors.push(`Missing file: ${asset.src}`);
for (const item of [...services, ...guides])
  if (!existsSync(resolve(`public/brand/social-${item.slug}.png`)))
    errors.push(`Missing social card: ${item.slug}`);
if (!/^55\d{11}$/.test(company.whatsappNumber)) errors.push('Invalid official WhatsApp number');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    `Content valid: ${services.length} services, ${projects.length} archive records, ${guides.length} guides, ${media.length} media assets. ${siteApproved ? 'Approved content; indexing only in production.' : 'Preview; indexing disabled.'}`,
  );
