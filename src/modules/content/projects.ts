import type { Project } from '@/types/content';

// Archive photographs are not verified case studies. Remain excluded from public publication.
export const projects: Project[] = [
  {
    slug: 'quadra-externa-azul',
    title: 'Quadra externa · superfície azul',
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
    status: 'review',
    imageIds: ['quadra-azul-coberta'],
    description:
      'Fotografia preservada do site anterior com piso azul, fechamento em alambrado e cobertura de tela.',
    serviceSlug: 'quadras-poliesportivas',
    documentationNote: 'Não inferir execução, propriedade ou resultados a partir da fotografia.',
  },
];
