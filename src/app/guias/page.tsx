import { PageIntro } from '@/components/content/PageIntro';
import { GuideCard } from '@/components/content/Cards';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
export const metadata = pageMetadata(
  'Guias para planejar seu espaço esportivo',
  'Informações sobre pisos, construção, reforma e beach tennis para organizar ideias e preparar seu projeto esportivo.',
  '/guias',
);
export default function GuidesPage() {
  return (
    <>
      <PageIntro
        eyebrow="BOAS PERGUNTAS. MELHORES DECISÕES."
        title="Antes da obra, informação."
        description="Orientações iniciais para comparar possibilidades e organizar seu projeto. Conteúdo informativo, sem substituir avaliação técnica."
        breadcrumbs={[{ label: 'Guias', href: '/guias' }]}
      />
      <section className="section">
        <div className="container">
          <div className="grid-3">
            {contentRepository.guides().map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
