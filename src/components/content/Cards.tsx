import Link from 'next/link';
import { Media } from './Media';
import { Icon } from '@/components/ui/Icon';
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
export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <Media id={project.imageIds[0]} caption={false} sizes="(max-width:720px) 100vw, 33vw" />
      <div className={styles.projectCaption}>
        <div>
          <span>
            {project.recordType === 'photo-record' ? 'Registro fotográfico' : 'Obra documentada'}
          </span>
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
      <Link href={`/obras/${project.slug}`} className={styles.projectCard}>
        {content}
      </Link>
    );
  if (project.sourceUrl)
    return (
      <a
        href={project.sourceUrl}
        className={styles.projectCard}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ver publicação original no Instagram: ${project.title}`}
      >
        {content}
      </a>
    );
  return <article className={styles.projectCard}>{content}</article>;
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
