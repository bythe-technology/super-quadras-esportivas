import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/content/PageIntro';
import { Media } from '@/components/content/Media';
import { Faq } from '@/components/content/Faq';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Process } from '@/components/content/Process';
import { CallToAction } from '@/components/content/CallToAction';
import { Action } from '@/components/ui/Action';
import { ProjectCard } from '@/components/content/Cards';
import { JsonLd } from '@/components/content/StructuredData';
import { company } from '@/modules/company/profile';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const dynamicParams = false;
export function generateStaticParams() {
  return contentRepository.services().map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const service = contentRepository.service((await params).slug);
  return service
    ? pageMetadata(
        service.title,
        service.description,
        `/solucoes/${service.slug}`,
        `/brand/social-${service.slug}.png`,
      )
    : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = contentRepository.service((await params).slug);
  if (!service) notFound();
  const related = contentRepository.projects().filter((p) => p.serviceSlug === service.slug);
  return (
    <>
      <PageIntro
        eyebrow="SOLUÇÃO ESPORTIVA"
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: 'Soluções', href: '/solucoes' },
          { label: service.shortTitle, href: `/solucoes/${service.slug}` },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          url: `${company.domain}/solucoes/${service.slug}`,
          provider: { '@id': `${company.domain}/#organization` },
          areaServed: [
            { '@type': 'Country', name: 'Brasil' },
            { '@type': 'State', name: 'São Paulo' },
          ],
        }}
      />
      <section className="section">
        <div className="container">
          <div className={styles.detailGrid}>
            <div>
              <Media id={service.imageId} className={styles.largeMedia} />
              <h2>O espaço começa com boas escolhas.</h2>
              <p>{service.materials}</p>
              <h3>O que considerar no planejamento</h3>
              <ul>
                {service.considerations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Conservação faz parte do projeto</h3>
              <p>{service.maintenance}</p>
            </div>
            <aside className={styles.sidePanel}>
              <h2>Vamos definir o seu escopo.</h2>
              <p>
                As etapas e os materiais são definidos conforme avaliação e proposta. Possibilidades
                a considerar:
              </p>
              <ul>
                {service.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Onde pode se aplicar</h3>
              <div>
                {service.applications.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <Action href={`/orcamento?servico=${service.slug}`}>
                Conversar sobre este serviço
              </Action>
            </aside>
          </div>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="DO PRIMEIRO CONTATO À ENTREGA"
            title="Um caminho para o seu projeto."
          />
          <Process />
        </div>
      </section>
      {related.length ? (
        <section className="section">
          <div className="container">
            <SectionHeading eyebrow="REGISTROS RELACIONADOS" title="Veja o espaço em imagens." />
            <div className="grid-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="DÚVIDAS FREQUENTES" title="Antes de começar." />
          <Faq items={service.faq} />
        </div>
      </section>
      <CallToAction service={service.slug} />
    </>
  );
}
