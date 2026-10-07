import type { MetadataRoute } from 'next';
import { company } from '@/modules/company/profile';
import { services } from '@/modules/content/services';
import { projects } from '@/modules/content/projects';
import { guides } from '@/modules/content/guides';
import { indexable } from '@/services/publication';
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  const staticPaths = [
    '',
    '/empresa',
    '/solucoes',
    '/obras',
    '/guias',
    '/atendimento',
    '/orcamento',
    '/contato',
    '/politica-de-privacidade',
  ];
  return [
    ...staticPaths.map((path) => ({ url: `${company.domain}${path}` })),
    ...services
      .filter((s) => s.status === 'published')
      .map((s) => ({ url: `${company.domain}/solucoes/${s.slug}` })),
    ...projects
      .filter((p) => p.status === 'published' && p.recordType === 'case-study')
      .map((p) => ({ url: `${company.domain}/obras/${p.slug}` })),
    ...guides
      .filter((g) => g.status === 'published')
      .map((g) => ({
        url: `${company.domain}/guias/${g.slug}`,
        ...(g.reviewedAt ? { lastModified: g.reviewedAt } : {}),
      })),
  ];
}
