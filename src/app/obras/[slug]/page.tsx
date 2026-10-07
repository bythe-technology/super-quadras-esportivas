import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/content/PageIntro';
import { Media } from '@/components/content/Media';
import { CallToAction } from '@/components/content/CallToAction';
import { ProjectView } from '@/components/content/ProjectView';
import { Action } from '@/components/ui/Action';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const dynamicParams = false;
export function generateStaticParams() {
  return contentRepository
    .projects()
    .filter((project) => project.recordType === 'case-study')
    .map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = contentRepository.project((await params).slug);
  return project ? pageMetadata(project.title, project.description, `/obras/${project.slug}`) : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = contentRepository.project((await params).slug);
  if (!project) notFound();
  return (
    <>
      <PageIntro
        eyebrow={project.status === 'review' ? 'REGISTRO DO ACERVO' : 'OBRA DOCUMENTADA'}
        title={project.title}
        description={project.description}
        breadcrumbs={[
          { label: 'Obras', href: '/obras' },
          { label: project.title, href: `/obras/${project.slug}` },
        ]}
      />
      <ProjectView slug={project.slug} />
      <section className="section">
        <div className="container">
          {project.status === 'review' ? (
            <p className={styles.reviewBox}>
              {project.documentationNote} Este registro não confirma autoria da execução e não deve
              ser utilizado como comprovação comercial.
            </p>
          ) : null}
          <div className={styles.gallery} style={{ marginTop: 30 }}>
            {project.imageIds.map((id) => (
              <Media key={id} id={id} sizes="(max-width:720px) 100vw, 50vw" />
            ))}
          </div>
          <div style={{ marginTop: 30 }}>
            <Action secondary href={`/solucoes/${project.serviceSlug}`}>
              Conhecer a solução relacionada
            </Action>
          </div>
        </div>
      </section>
      <CallToAction service={project.serviceSlug} />
    </>
  );
}
