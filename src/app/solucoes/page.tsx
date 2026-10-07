import { PageIntro } from '@/components/content/PageIntro';
import { ServiceCard } from '@/components/content/Cards';
import { SectionHeading } from '@/components/content/SectionHeading';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
export const metadata = pageMetadata(
  'Soluções para espaços esportivos',
  'Construção, reforma, pisos, quadras por modalidade e soluções complementares de lazer. Conheça o escopo e converse sobre seu espaço.',
  '/solucoes',
);
export default function SolutionsPage() {
  const services = contentRepository.services();
  return (
    <>
      <PageIntro
        eyebrow="DO PROJETO AO JOGO"
        title="Soluções para o seu espaço."
        description="Cada modalidade, ambiente e rotina de uso pede uma combinação de escolhas. Explore as possibilidades para construir ou renovar."
        breadcrumbs={[{ label: 'Soluções', href: '/solucoes' }]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {services
              .filter((s) => s.category === 'principal')
              .map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} imageId={s.illustrationId} />
              ))}
          </div>
        </div>
      </section>
      {services.some((s) => s.category === 'complementar') ? (
        <section className="section surface">
          <div className="container">
            <SectionHeading
              eyebrow="ALÉM DO ESPORTE"
              title="Lazer que completa o espaço."
              description="Soluções complementares para integrar convivência, vegetação e brincadeira ao ambiente."
            />
            <div className="grid-2">
              {services
                .filter((s) => s.category === 'complementar')
                .map((s, i) => (
                  <ServiceCard key={s.slug} service={s} index={i} imageId={s.illustrationId} />
                ))}
            </div>
          </div>
        </section>
      ) : null}
      <CallToAction />
    </>
  );
}
