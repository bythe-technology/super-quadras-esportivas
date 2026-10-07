import { safeJsonLd } from '@/utils/seo';
export function JsonLd({ value }: { value: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(value) }} />
  );
}
