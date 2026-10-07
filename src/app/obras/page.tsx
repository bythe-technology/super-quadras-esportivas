import { PageIntro } from '@/components/content/PageIntro';
import { ProjectCard } from '@/components/content/Cards';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'Obras e registros',
  'Explore registros fotográficos de quadras, ginásios, campos gramados e etapas de construção, com legendas descritivas e sem presumir cliente ou local.',
  '/obras',
);
export default function ProjectsPage() {
  const projects = contentRepository.projects();
  return (
    <>
      <PageIntro
        eyebrow="ESPAÇOS EM FOCO"
        title="Quadras, campos e pisos em foco."
        description={`${projects.length} registros visuais de espaços esportivos, com diferentes superfícies, cores e configurações.`}
        breadcrumbs={[{ label: 'Obras', href: '/obras' }]}
      />
      <section className="section">
        <div className="container">
          {projects.some((p) => p.recordType === 'photo-record') ? (
            <p className={styles.reviewBox}>
              Fotos autorizadas do acervo e do Instagram da empresa. As legendas descrevem apenas
              elementos visíveis; não identificam clientes, locais ou escopos de execução.
            </p>
          ) : null}
          {projects.length ? (
            <div className={styles.projectGallery} style={{ marginTop: 32 }}>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  featured={index < 2}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <h2>Portfólio em organização.</h2>
              <p>
                Estamos reunindo imagens autorizadas e informações verificadas. Converse com nossa
                equipe para saber mais sobre os projetos.
              </p>
            </div>
          )}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
