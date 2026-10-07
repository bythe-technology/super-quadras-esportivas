import { describe, it, expect } from 'vitest';
import { services } from '@/modules/content/services';
import { projects } from '@/modules/content/projects';
import { guides } from '@/modules/content/guides';
import { media } from '@/modules/content/media';
import { validateContent } from '@/validators/content';
import { safeJsonLd, pageMetadata } from '@/utils/seo';
import { company } from '@/modules/company/profile';
import sitemap from '@/app/sitemap';
const data = { services, projects, guides, media, approved: false };
describe('content and SEO safety', () => {
  it('has consistent references', () => expect(validateContent(data)).toEqual([]));
  it('accepts authorized content for publication', () =>
    expect(validateContent({ ...data, approved: true })).toEqual([]));
  it('blocks unapproved photographs even after launch', () =>
    expect(
      validateContent({
        ...data,
        approved: true,
        media: media.map((asset) =>
          asset.kind === 'archive-photo' ? { ...asset, rights: 'pending-owner' as const } : asset,
        ),
      }).length,
    ).toBeGreaterThan(0));
  it('accepts authorized Instagram photo records without turning them into case studies', () => {
    expect(validateContent({ ...data, approved: true })).toEqual([]);
    expect(
      validateContent({
        ...data,
        approved: true,
        projects: projects.map((project, index) =>
          index === 0 ? { ...project, sourceUrl: 'https://example.com/photo' } : project,
        ),
      }).some((error) => error.includes('Instagram source')),
    ).toBe(true);
  });
  it('rejects duplicate slugs', () =>
    expect(validateContent({ ...data, services: [...services, services[0]] })).toContain(
      `Duplicate slug: services/${services[0].slug}`,
    ));
  it('rejects missing images', () =>
    expect(validateContent({ ...data, media: [] }).some((e) => e.includes('Missing media'))).toBe(
      true,
    ));
  it('rejects conceptual photos in projects', () =>
    expect(
      validateContent({ ...data, projects: [{ ...projects[0], imageIds: ['campo'] }] }).some((e) =>
        e.includes('conceptual'),
      ),
    ).toBe(true));
  it('escapes JSON-LD script boundaries', () =>
    expect(safeJsonLd({ text: '</script><script>' })).not.toContain('<'));
  it('does not index preview and uses canonical paths', () => {
    expect(pageMetadata('Title', 'Description', '/empresa').alternates?.canonical).toBe('/empresa');
    expect(pageMetadata('T', 'D', '/').robots).toEqual({ index: false, follow: false });
    expect(sitemap()).toEqual([]);
  });
  it('has the newly confirmed contact', () => expect(company.whatsappNumber).toBe('5515997157642'));
});
