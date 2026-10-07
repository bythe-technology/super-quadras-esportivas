import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Super Quadras Esportivas',
    short_name: 'Super Quadras',
    lang: 'pt-BR',
    start_url: '/',
    display: 'browser',
    background_color: '#F5F7F6',
    theme_color: '#006B3C',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
