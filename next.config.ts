import type { NextConfig } from 'next';

const production = process.env.VERCEL_ENV === 'production' && process.env.SITE_APPROVED !== 'false';
const config: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR ?? '.next',
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'], qualities: [75, 85] },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // App Router prerendered hydration uses inline scripts. Do not add unsafe-eval in production.
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''} https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; font-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'`,
          },
          ...(!production ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.superquadrasoficial.com.br' }],
        destination: 'https://superquadrasoficial.com.br/:path*',
        permanent: true,
      },
      { source: '/piso', destination: '/solucoes/pisos-esportivos', permanent: true },
      { source: '/tipos-de-pisos', destination: '/solucoes/pisos-esportivos', permanent: true },
      { source: '/grama-sintetica', destination: '/solucoes/grama-sintetica', permanent: true },
      { source: '/campos-de-futebol', destination: '/solucoes/campos-de-futebol', permanent: true },
      { source: '/quadras-de-tenis', destination: '/solucoes/quadras-de-tenis', permanent: true },
      {
        source: '/construcao-de-quadra-para-beach-tennis',
        destination: '/solucoes/quadras-de-beach-tennis',
        permanent: true,
      },
      {
        source: '/pista-de-atletismo',
        destination: '/solucoes/pistas-de-atletismo',
        permanent: true,
      },
      { source: '/servicos', destination: '/solucoes', permanent: true },
      {
        source: '/construcao-de-quadras-esportivas',
        destination: '/solucoes/construcao-de-quadras',
        permanent: true,
      },
      { source: '/paisagismo', destination: '/solucoes/paisagismo', permanent: true },
      {
        source: '/playgrounds-de-madeira-3',
        destination: '/solucoes/playgrounds',
        permanent: true,
      },
      { source: '/blog', destination: '/guias', permanent: true },
    ];
  },
};
export default config;
