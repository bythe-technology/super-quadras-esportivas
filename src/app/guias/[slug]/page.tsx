import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { PageIntro } from '@/components/content/PageIntro';
import { Media } from '@/components/content/Media';
import { CallToAction } from '@/components/content/CallToAction';
import { JsonLd } from '@/components/content/StructuredData';
import { contentRepository } from '@/repositories/contentRepository';
import { company } from '@/modules/company/profile';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const dynamicParams = false;
export function generateStaticParams() {
  return contentRepository.guides().map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = contentRepository.guide((await params).slug);
  return guide
    ? pageMetadata(
        guide.title,
        guide.description,
        `/guias/${guide.slug}`,
        `/brand/social-${guide.slug}.png`,
      )
    : {};
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = contentRepository.guide((await params).slug);
  if (!guide) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`GUIA DE PLANEJAMENTO · ${guide.readingMinutes} MIN DE LEITURA`}
        title={guide.title}
        description={guide.description}
        breadcrumbs={[
          { label: 'Guias', href: '/guias' },
          { label: guide.title, href: `/guias/${guide.slug}` },
        ]}
      />
      <JsonLd
        value={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.description,
          mainEntityOfPage: `${company.domain}/guias/${guide.slug}`,
          image: `${company.domain}/brand/social-${guide.slug}.png`,
          author: { '@type': 'Organization', name: company.name },
          publisher: { '@id': `${company.domain}/#organization` },
          ...(guide.reviewedAt ? { dateModified: guide.reviewedAt } : {}),
        }}
      />
      <section className="section">
        <article className={`container ${styles.article}`}>
          <Media
            id={guide.imageId}
            className={styles.largeMedia}
            sizes="(max-width:720px) 100vw, 760px"
          />
          {guide.status === 'review' ? (
            <p className={styles.reviewBox}>
              Conteúdo editorial em revisão para publicação. Especificações devem ser avaliadas por
              profissional habilitado.
            </p>
          ) : null}
          <Markdown skipHtml>{guide.markdown}</Markdown>
        </article>
      </section>
      <CallToAction service={guide.serviceSlug} />
    </>
  );
}
