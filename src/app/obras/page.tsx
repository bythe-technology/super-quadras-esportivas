import { PageIntro } from '@/components/content/PageIntro';
import { ProjectCard } from '@/components/content/Cards';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'Obras e registros',
  'Veja registros fotográficos de quadras esportivas, com legendas baseadas no que aparece em cada imagem, sem presumir cliente ou local.',
  '/obras',
);
export default function ProjectsPage() {
  const projects = contentRepository.projects();
  return (
    <>
      <PageIntro
        eyebrow="ESPAÇOS EM FOCO"
        title="O esporte ganha forma."
        description="Uma seleção de registros visuais, descritos pelo que aparece em cada imagem. Cliente, local e escopo não são presumidos."
        breadcrumbs={[{ label: 'Obras', href: '/obras' }]}
      />
      <section className="section">
        <div className="container">
          {projects.some((p) => p.recordType === 'photo-record') ? (
            <p className={styles.reviewBox}>
              Fotos autorizadas do perfil da empresa. As legendas descrevem apenas elementos
              visíveis; não identificam clientes, locais ou escopos de execução.
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
