import { media } from '@/modules/content/media';
import { services } from '@/modules/content/services';
import { projects } from '@/modules/content/projects';
import { guides } from '@/modules/content/guides';
import { siteApproved } from '@/services/publication';
import type { PublicationStatus } from '@/types/content';

const visible = (item: { status: PublicationStatus }) =>
  !siteApproved || item.status === 'published';
export const contentRepository = {
  services: () => services.filter(visible),
  projects: () => projects.filter(visible),
  guides: () => guides.filter(visible),
  service: (slug: string) => services.find((s) => s.slug === slug && visible(s)),
  project: (slug: string) =>
    projects.find((p) => p.slug === slug && p.recordType === 'case-study' && visible(p)),
  guide: (slug: string) => guides.find((g) => g.slug === slug && visible(g)),
  media: (id: string) => {
    const asset = media.find((m) => m.id === id);
    if (!asset) throw new Error(`Missing media asset: ${id}`);
    return asset;
  },
};
