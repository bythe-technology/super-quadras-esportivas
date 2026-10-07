import { PageIntro } from '@/components/content/PageIntro';
import { ProjectCard } from '@/components/content/Cards';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'Obras e registros',
  'Conheça os registros fotográficos de espaços esportivos e acompanhe a organização do portfólio da Super Quadras.',
  '/obras',
);
export default function ProjectsPage() {
  const projects = contentRepository.projects();
  return (
    <>
      <PageIntro
        eyebrow="ESPAÇOS EM FOCO"
        title="O esporte ganha forma."
        description="Imagens que ajudam a observar superfícies, marcações e a configuração dos espaços. Cada projeto publicado deve ter sua história confirmada."
        breadcrumbs={[{ label: 'Obras', href: '/obras' }]}
      />
      <section className="section">
        <div className="container">
          {projects.some((p) => p.status === 'review') ? (
            <p className={styles.reviewBox}>
              Fotografias autorizadas do acervo. Os registros abaixo não são estudos de caso:
              cliente, local, data e escopo de cada execução ainda precisam ser documentados.
            </p>
          ) : null}
          {projects.length ? (
            <div className="grid-3" style={{ marginTop: 32 }}>
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
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
