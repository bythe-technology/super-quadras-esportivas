import type { Project } from '@/types/content';

// Photo records describe only what is visible; case studies require verified project details.
export const projects: Project[] = [
  {
    slug: 'ginasio-multiesportivo',
    title: 'Ginásio · piso laranja e marcações esportivas',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['quadra-ginasio'],
    description:
      'Piso interno com área central laranja, áreas de apoio cinza e marcações para diferentes modalidades.',
    serviceSlug: 'pisos-esportivos',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
  },
  {
    slug: 'campo-gramado-com-gol',
    title: 'Campo gramado · fechamento e gol',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-campo-gramado'],
    description:
      'Campo gramado visto através de alambrado, com traves e área esportiva ao ar livre.',
    serviceSlug: 'campos-de-futebol',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DZunugdla9L/',
  },
  {
    slug: 'quadra-azul-multiesportiva',
    title: 'Quadra externa · piso azul',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-azul-multiesportiva'],
    description:
      'Registro visual de uma quadra azul ao ar livre, com marcações esportivas, gol, tabela e fechamento em tela.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Legenda baseada apenas no que aparece na foto. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DZqJ85LB8aF/',
  },
  {
    slug: 'quadra-verde-terracota',
    title: 'Quadra externa · verde e terracota',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-verde-terracota'],
    description:
      'Registro visual de uma quadra externa com áreas de piso verde e terracota e marcações esportivas variadas.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Legenda baseada apenas no que aparece na foto. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/Dad61w9BAc7/',
  },
  {
    slug: 'quadra-verde-vermelha',
    title: 'Quadra verde · áreas vermelhas e linhas brancas',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-verde-vermelha'],
    description:
      'Piso verde ao ar livre com áreas vermelhas, marcações brancas e fechamento em tela.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DZ-zeCjhi0L/',
  },
  {
    slug: 'quadra-externa-verde-com-rede',
    title: 'Quadra verde · rede e linhas brancas',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-verde-tenis'],
    description:
      'Registro visual de uma quadra externa de piso verde, com rede central, marcações brancas e fechamento em tela.',
    serviceSlug: 'quadras-de-tenis',
    documentationNote:
      'Legenda baseada apenas no que aparece na foto. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DaFqwYah0VR/',
  },
  {
    slug: 'quadra-verde-multiesportiva',
    title: 'Quadra verde · rede, tabela e linhas',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-verde-multiesportiva'],
    description:
      'Quadra verde ao ar livre com rede central, tabela de basquete e marcações esportivas.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DaDO-CUhF8I/',
  },
  {
    slug: 'quadra-em-preparacao',
    title: 'Espaço esportivo · alambrado e área de terra',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['ig-quadra-em-preparacao'],
    description:
      'Área esportiva elevada, com fechamento em alambrado e terreno de terra ao redor.',
    serviceSlug: 'construcao-de-quadras',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
    sourceUrl: 'https://www.instagram.com/superquadrasesportivas/p/DZr38X8hXVZ/',
  },
  {
    slug: 'quadra-externa-azul',
    title: 'Quadra externa · superfície azul',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['quadra-azul-exterior'],
    description:
      'Registro do acervo anterior: quadra ao ar livre com alambrado e marcações para uso esportivo.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Legenda descritiva da imagem. Cliente, local, data e escopo da execução não foram confirmados.',
  },
  {
    slug: 'quadra-azul-coberta',
    title: 'Quadra azul · cobertura de tela',
    recordType: 'photo-record',
    status: 'published',
    imageIds: ['quadra-azul-coberta'],
    description:
      'Fotografia preservada do site anterior com piso azul, fechamento em alambrado e cobertura de tela.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote: 'Não inferir execução, propriedade ou resultados a partir da fotografia.',
  },
];
