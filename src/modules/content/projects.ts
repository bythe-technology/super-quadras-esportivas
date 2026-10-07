import type { Project } from '@/types/content';

// Photo records describe only what is visible; case studies require verified project details.
export const projects: Project[] = [
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
    slug: 'quadra-externa-azul',
    title: 'Quadra externa · superfície azul',
    recordType: 'photo-record',
    status: 'review',
    imageIds: ['quadra-azul-exterior'],
    description:
      'Registro do acervo anterior: quadra ao ar livre com alambrado e marcações para uso esportivo.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote:
      'Autoria, local, data e escopo executado aguardam confirmação do proprietário.',
  },
  {
    slug: 'ginasio-multiesportivo',
    title: 'Ginásio · marcações multiesportivas',
    recordType: 'photo-record',
    status: 'review',
    imageIds: ['quadra-ginasio', 'quadra-ginasio-detalhe'],
    description:
      'Registros do acervo anterior mostram superfície cinza e laranja em ambiente coberto. Não há documentação suficiente para identificar o cliente ou a intervenção.',
    serviceSlug: 'pisos-esportivos',
    documentationNote:
      'A associação das duas fotografias ao mesmo projeto deve ser validada antes da publicação.',
  },
  {
    slug: 'quadra-azul-coberta',
    title: 'Quadra azul · cobertura de tela',
    recordType: 'photo-record',
    status: 'review',
    imageIds: ['quadra-azul-coberta'],
    description:
      'Fotografia preservada do site anterior com piso azul, fechamento em alambrado e cobertura de tela.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote: 'Não inferir execução, propriedade ou resultados a partir da fotografia.',
  },
];
