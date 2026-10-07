import { afterEach, describe, it, expect, vi } from 'vitest';
afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});
describe('publication environment gates', () => {
  it('does not index an approved preview', async () => {
    vi.stubEnv('SITE_APPROVED', 'true');
    vi.stubEnv('VERCEL_ENV', 'preview');
    vi.resetModules();
    expect((await import('@/services/publication')).indexable).toBe(false);
  });
  it('does not index an unapproved production', async () => {
    vi.stubEnv('SITE_APPROVED', 'false');
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.resetModules();
    expect((await import('@/services/publication')).indexable).toBe(false);
  });
  it('only indexes approved production and omits draft URLs', async () => {
    vi.stubEnv('SITE_APPROVED', 'true');
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.resetModules();
    expect((await import('@/services/publication')).indexable).toBe(true);
    const robots = (await import('@/app/robots')).default();
    expect(robots.rules).toEqual({ userAgent: '*', allow: '/' });
    const sitemap = (await import('@/app/sitemap')).default();
    expect(sitemap.filter((item) => item.url.includes('/solucoes/'))).toHaveLength(12);
    expect(sitemap.some((item) => item.url.includes('/obras/'))).toBe(false);
    const { contentRepository } = await import('@/repositories/contentRepository');
    expect(contentRepository.projects().map((project) => project.slug)).toEqual([
      'quadra-azul-multiesportiva',
      'quadra-verde-terracota',
      'quadra-externa-verde-com-rede',
    ]);
    expect(contentRepository.project('quadra-azul-multiesportiva')).toBeUndefined();
  });
  it('uses the confirmed approval by default only in production', async () => {
    vi.stubEnv('SITE_APPROVED', undefined);
    vi.stubEnv('VERCEL_ENV', 'production');
    vi.resetModules();
    expect((await import('@/services/publication')).indexable).toBe(true);
  });
});
