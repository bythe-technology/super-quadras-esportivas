import type { Service, Project, Guide, MediaAsset } from '@/types/content';
import { serviceCatalog } from '@/modules/content/serviceCatalog';
export function validateContent({
  services,
  projects,
  guides,
  media,
  approved,
}: {
  services: Service[];
  projects: Project[];
  guides: Guide[];
  media: MediaAsset[];
  approved: boolean;
}) {
  const errors: string[] = [];
  const mediaById = new Map(media.map((m) => [m.id, m]));
  for (const service of services) {
    if (!serviceCatalog.some((item) => item.slug === service.slug && item.title === service.title))
      errors.push(`Service catalog mismatch: ${service.slug}`);
    const illustration = mediaById.get(service.illustrationId);
    if (!illustration)
      errors.push(`Missing service illustration: ${service.slug}/${service.illustrationId}`);
    else if (illustration.kind !== 'conceptual-illustration')
      errors.push(
        `Service illustration must be conceptual: ${service.slug}/${service.illustrationId}`,
      );
  }
  for (const [name, items] of Object.entries({ services, projects, guides })) {
    const seen = new Set<string>();
    for (const item of items) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug))
        errors.push(`Invalid slug: ${name}/${item.slug}`);
      if (seen.has(item.slug)) errors.push(`Duplicate slug: ${name}/${item.slug}`);
      seen.add(item.slug);
      if (!item.title.trim() || !item.description.trim())
        errors.push(`Missing metadata: ${item.slug}`);
      const ids = 'imageIds' in item ? item.imageIds : [item.imageId];
      for (const id of ids) {
        const asset = mediaById.get(id);
        if (!asset) errors.push(`Missing media reference: ${id}`);
        if (item.status === 'published' && asset?.rights === 'pending-owner')
          errors.push(`Unapproved media in published content: ${item.slug}/${id}`);
        if (name === 'projects' && asset?.kind !== 'archive-photo')
          errors.push(`Project cannot use conceptual image: ${item.slug}`);
      }
      if ('serviceSlug' in item && !services.some((s) => s.slug === item.serviceSlug))
        errors.push(`Missing service: ${item.serviceSlug}`);
      if (
        approved &&
        item.status === 'published' &&
        'serviceSlug' in item &&
        !services.some((s) => s.slug === item.serviceSlug && s.status === 'published')
      )
        errors.push(`Published content links to unpublished service: ${item.slug}`);
    }
  }
  if (new Set(media.map((m) => m.id)).size !== media.length) errors.push('Duplicate media ID');
  if (approved) {
    if (!services.some((s) => s.status === 'published'))
      errors.push('Approve at least one verified service before publication.');
    if (mediaById.get('quadra-azul-exterior')?.rights === 'pending-owner')
      errors.push('Home hero rights need owner approval.');
    for (const project of projects.filter((item) => item.status === 'published')) {
      if (project.recordType === 'case-study' && project.imageIds.length < 3)
        errors.push(`Published case study needs at least three verified photos: ${project.slug}`);
      if (project.recordType === 'photo-record') {
        if (project.imageIds.length !== 1)
          errors.push(`Published photo record must have exactly one photo: ${project.slug}`);
        try {
          if (new URL(project.sourceUrl ?? '').origin !== 'https://www.instagram.com')
            errors.push(
              `Published photo record must link to its Instagram source: ${project.slug}`,
            );
        } catch {
          errors.push(`Published photo record must link to its Instagram source: ${project.slug}`);
        }
      }
    }
    if (guides.some((g) => g.status === 'published' && !g.reviewedAt))
      errors.push('Published guide needs actual review date.');
  }
  return errors;
}
