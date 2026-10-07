import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/Header';
import { MotionEnhancements } from '@/components/ui/MotionEnhancements';
import { Footer } from '@/components/layout/Footer';
import { FloatingContact } from '@/components/contact/FloatingContact';
import { Consent } from '@/components/privacy/Consent';
import { JsonLd } from '@/components/content/StructuredData';
import { company } from '@/modules/company/profile';
import { indexable } from '@/services/publication';
import './globals.css';
const manrope = localFont({
  src: '../../public/fonts/manrope-variable.woff2',
  weight: '400 700',
  variable: '--font-manrope',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: { default: 'Super Quadras Esportivas', template: '%s | Super Quadras' },
  description:
    'Construção e reforma de quadras esportivas. De São Paulo para todo o Brasil, com atendimento conforme o escopo e a logística do projeto.',
  robots: { index: indexable, follow: indexable },
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/brand/favicon.ico' }],
    apple: '/brand/icon-180.png',
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId =
    indexable && /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID ?? '')
      ? process.env.NEXT_PUBLIC_GA_ID
      : undefined;
  return (
    <html lang="pt-BR" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <MotionEnhancements />
        <main id="conteudo" className="page-main">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <Consent gaId={gaId} />
        <JsonLd
          value={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': `${company.domain}/#organization`,
                name: company.name,
                url: company.domain,
                logo: `${company.domain}/brand/logo-positive.png`,
                telephone: company.phoneInternational,
                sameAs: [company.instagram],
              },
              {
                '@type': 'WebSite',
                '@id': `${company.domain}/#website`,
                name: company.name,
                url: company.domain,
                inLanguage: 'pt-BR',
                publisher: { '@id': `${company.domain}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
