import type { Metadata } from 'next';
import { company } from '@/modules/company/profile';
import { indexable } from '@/services/publication';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/brand/social.png',
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: indexable, follow: indexable },
    openGraph: {
      title,
      description,
      url: `${company.domain}${path}`,
      type: 'website',
      locale: 'pt_BR',
      siteName: company.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
export function breadcrumbSchema(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${company.domain}${item.href}`,
    })),
  };
}
export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
