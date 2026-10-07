import Link from 'next/link';
import { Media } from './Media';
import { Icon } from '@/components/ui/Icon';
import { contentRepository } from '@/repositories/contentRepository';
import type { Guide, Project, Service } from '@/types/content';
import styles from './content.module.css';
export function ServiceCard({
  service,
  index,
  imageId = service.imageId,
}: {
  service: Service;
  index: number;
  imageId?: string;
}) {
  return (
    <Link href={`/solucoes/${service.slug}`} className={styles.serviceCard}>
      <Media id={imageId} sizes="(max-width:720px) 100vw, (max-width:1000px) 50vw, 33vw" />
      <div className={styles.cardBody}>
        <div className={styles.cardNumber}>
          /{String(index + 1).padStart(2, '0')}
          <Icon name="diagonal" size={20} />
        </div>
        <h3>{service.shortTitle}</h3>
        <p>{service.description}</p>
      </div>
    </Link>
  );
}
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const cardClassName = featured
    ? `${styles.projectCard} ${styles.projectCardFeature}`
    : styles.projectCard;
  const projectLabel =
    project.recordType === 'photo-record'
      ? `Registro visual · ${contentRepository.service(project.serviceSlug)?.shortTitle ?? 'espaço esportivo'}`
      : 'Obra documentada';
  const content = (
    <>
      <Media
        id={project.imageIds[0]}
        caption={false}
        className={styles.projectMedia}
        sizes={featured ? '(max-width:720px) 100vw, 50vw' : '(max-width:720px) 100vw, 33vw'}
      />
      <div className={styles.projectCaption}>
        <div>
          <span>{projectLabel}</span>
          <h3>{project.title}</h3>
        </div>
        {project.sourceUrl || project.recordType === 'case-study' ? (
          <Icon name="diagonal" size={21} />
        ) : null}
      </div>
    </>
  );
  if (project.recordType === 'case-study')
    return (
      <Link href={`/obras/${project.slug}`} className={cardClassName}>
        {content}
      </Link>
    );
  if (project.sourceUrl)
    return (
      <a
        href={project.sourceUrl}
        className={cardClassName}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver publicação original no Instagram: ${project.title}`}
      >
        {content}
      </a>
    );
  return <article className={cardClassName}>{content}</article>;
}
export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guias/${guide.slug}`} className={styles.guideCard}>
      <Media id={guide.imageId} sizes="(max-width:720px) 100vw, 33vw" />
      <div className={styles.cardBody}>
        <span className={styles.guideMeta}>
          PLANEJAMENTO · {guide.readingMinutes} MIN DE LEITURA
        </span>
        <h3>{guide.title}</h3>
        <p>{guide.description}</p>
        <span className={styles.textLink}>
          Ler guia <Icon name="arrow" size={17} />
        </span>
      </div>
    </Link>
  );
}
