import type { Service } from '@/types/content';
import { serviceCatalog } from './serviceCatalog';

interface ServiceInput {
  slug: string;
  shortTitle: string;
  description: string;
  imageId: string;
  applications: string[];
  scope: string[];
  materials: string;
  maintenance: string;
  considerations: string[];
  category?: Service['category'];
}
function service(input: ServiceInput): Service {
  const catalogEntry = serviceCatalog.find((item) => item.slug === input.slug);
  if (!catalogEntry) throw new Error(`Unknown service: ${input.slug}`);
  return {
    ...input,
    title: catalogEntry.title,
    category: input.category ?? 'principal',
    status: 'published',
    faq: [
      {
        question: `Como solicitar uma avaliação para ${input.shortTitle.toLowerCase()}?`,
        answer:
          'Informe cidade, tipo de espaço, situação atual e dimensões aproximadas. A conversa inicial ajuda a definir as informações e avaliações necessárias para uma proposta.',
      },
      {
        question: 'O que determina o preço e o prazo?',
        answer: `O escopo, o acesso ao local, as condições existentes e os materiais escolhidos. Neste serviço, também é importante avaliar: ${input.considerations.join('; ').toLowerCase()}. Não há preço ou prazo padrão sem entender o projeto.`,
      },
      {
        question: 'Vocês atendem em todo o Brasil?',
        answer:
          'Atendemos projetos em São Paulo e recebemos solicitações de todo o Brasil. A disponibilidade é confirmada conforme o escopo, a localização e a logística.',
      },
    ],
  };
}
export const services: Service[] = [
  service({
    slug: 'construcao-de-quadras',
    shortTitle: 'Construção de quadras',
    description:
      'Do espaço disponível à definição de uma quadra adequada ao uso: planejamento, base, superfície e estrutura precisam trabalhar juntos.',
    imageId: 'quadra-azul-exterior',
    applications: [
      'Condomínios',
      'Escolas e clubes',
      'Espaços esportivos e propriedades particulares',
    ],
    scope: [
      'Levantamento das necessidades e do local',
      'Definição do escopo e da superfície',
      'Preparação da área e da base conforme projeto',
      'Acabamento, marcações e equipamentos previstos',
    ],
    materials:
      'A superfície e o sistema construtivo dependem das modalidades, intensidade de uso, ambiente e condições da base. A proposta deve explicitar as soluções escolhidas.',
    considerations: [
      'Terreno e movimentação necessária',
      'Drenagem e condições do solo',
      'Acesso de máquinas e materiais',
      'Modalidades e equipamentos',
    ],
    maintenance:
      'Planeje limpeza, inspeções de superfície, drenagem e equipamentos desde a concepção. As orientações variam conforme o sistema instalado.',
  }),
  service({
    slug: 'reforma-de-quadras',
    shortTitle: 'Reforma de quadras',
    description:
      'Recupere a funcionalidade do espaço com uma avaliação que diferencia desgaste de acabamento de problemas na base.',
    imageId: 'quadra-ginasio',
    applications: [
      'Quadras existentes',
      'Áreas de lazer de condomínios',
      'Ginásios e espaços escolares',
    ],
    scope: [
      'Avaliação das condições existentes',
      'Definição de reparos e preparação de superfície',
      'Renovação de acabamento e marcações quando indicada',
      'Revisão dos elementos previstos no escopo',
    ],
    materials:
      'Pintura e revestimento não substituem a correção de problemas estruturais. A escolha do sistema deve considerar compatibilidade com a superfície existente.',
    considerations: [
      'Origem de fissuras e desníveis',
      'Umidade e drenagem',
      'Compatibilidade de revestimentos',
      'Necessidade de interdição',
    ],
    maintenance:
      'Mantenha uma rotina de inspeção e limpeza compatível com o novo acabamento. Registre pontos de desgaste para avaliar intervenções antes de agravamento.',
  }),
  service({
    slug: 'pisos-esportivos',
    shortTitle: 'Pisos esportivos',
    description:
      'A escolha do piso começa pelo esporte, pelo ambiente e pela rotina de uso — não apenas pela aparência.',
    imageId: 'quadra-ginasio-detalhe',
    applications: ['Quadras externas', 'Ginásios', 'Espaços multiuso'],
    scope: [
      'Análise do uso e da base',
      'Comparação das alternativas de superfície',
      'Preparação e aplicação conforme sistema definido',
      'Demarcação e orientações de conservação',
    ],
    materials:
      'Concreto, sistemas asfálticos, revestimentos e outras soluções têm requisitos próprios. Disponibilidade, indicação e compatibilidade serão tratadas na proposta.',
    considerations: [
      'Modalidade e frequência de uso',
      'Ambiente interno ou externo',
      'Regularidade e resistência da base',
      'Manutenção prevista',
    ],
    maintenance:
      'Siga as instruções do sistema escolhido. Produtos de limpeza, equipamentos e procedimentos inadequados podem comprometer o acabamento.',
  }),
  service({
    slug: 'grama-sintetica',
    shortTitle: 'Grama sintética',
    description:
      'Uma superfície sintética precisa ser especificada em conjunto com a base, o escoamento e a finalidade do espaço.',
    imageId: 'grama-sintetica-referencia',
    applications: ['Campos esportivos', 'Áreas de treino', 'Espaços de lazer'],
    scope: [
      'Entendimento da modalidade e do uso',
      'Avaliação de base e drenagem',
      'Definição do sistema e instalação prevista',
      'Orientações sobre limpeza e conservação',
    ],
    materials:
      'Altura, composição, densidade e preenchimento não devem ser escolhidos isoladamente. A configuração depende do sistema indicado para o uso pretendido.',
    considerations: [
      'Condições da base',
      'Drenagem',
      'Frequência de utilização',
      'Especificação e reposição de componentes',
    ],
    maintenance:
      'Avalie limpeza, escovação e inspeções das emendas conforme recomendação do fabricante. A necessidade de reposição de preenchimento depende do sistema.',
  }),
  service({
    slug: 'campos-de-futebol',
    shortTitle: 'Campos de futebol',
    description:
      'Organize superfície, dimensões disponíveis e infraestrutura para um campo compatível com a proposta de uso.',
    imageId: 'campo',
    applications: ['Clubes e escolinhas', 'Condomínios', 'Espaços de locação esportiva'],
    scope: [
      'Avaliação da área disponível',
      'Definição de superfície e configuração',
      'Preparação e infraestrutura previstas em projeto',
      'Equipamentos e fechamento conforme escopo',
    ],
    materials:
      'A escolha da superfície e dos equipamentos considera o uso, as condições do terreno e o plano de manutenção. Não se presume uma única solução para todo campo.',
    considerations: [
      'Área e faixas de circulação',
      'Drenagem e declividade',
      'Tipo de superfície',
      'Iluminação e fechamento',
    ],
    maintenance:
      'Defina rotina para a superfície, redes, traves e drenagem. A intensidade de uso influencia a frequência de inspeção.',
  }),
  service({
    slug: 'quadras-poliesportivas',
    shortTitle: 'Quadras poliesportivas',
    description:
      'Mais possibilidades de esporte em um mesmo espaço, com atenção à combinação de marcações e equipamentos.',
    imageId: 'quadra-azul-coberta',
    applications: ['Escolas', 'Condomínios', 'Clubes e áreas de lazer'],
    scope: [
      'Definição das modalidades',
      'Organização de marcações e áreas de uso',
      'Superfície e infraestrutura previstas',
      'Instalação de equipamentos incluídos na proposta',
    ],
    materials:
      'O piso deve ser compatível com as modalidades escolhidas. Cores e marcações precisam manter a leitura de cada esporte sem comprometer a circulação.',
    considerations: [
      'Sobreposição de marcações',
      'Área disponível',
      'Uso compartilhado',
      'Equipamentos fixos e móveis',
    ],
    maintenance:
      'Inspecione fixações, tabelas, redes e acabamento. A limpeza e a conservação devem respeitar as características do piso.',
  }),
  service({
    slug: 'quadras-de-tenis',
    shortTitle: 'Quadras de tênis',
    description:
      'Superfície, área de jogo e condições de conservação fazem parte da mesma decisão de projeto.',
    imageId: 'tenis',
    applications: ['Clubes', 'Condomínios', 'Propriedades particulares'],
    scope: [
      'Levantamento de uso e área',
      'Escolha de superfície compatível',
      'Base, drenagem e acabamento conforme projeto',
      'Rede, fechamento e itens previstos',
    ],
    materials:
      'As opções de superfície têm comportamentos e rotinas de conservação diferentes. A escolha deverá considerar preferência de uso e capacidade de manutenção.',
    considerations: [
      'Área de jogo e recuos',
      'Tipo de superfície',
      'Drenagem',
      'Manutenção e equipamentos',
    ],
    maintenance:
      'A conservação varia significativamente entre superfícies. Combine a escolha do piso com a rotina que o responsável poderá executar.',
  }),
  service({
    slug: 'quadras-de-beach-tennis',
    shortTitle: 'Quadras de beach tennis',
    description:
      'Um espaço de areia bem planejado começa pela avaliação da área, do escoamento e da operação.',
    imageId: 'beach-tennis-photo',
    applications: ['Arenas esportivas', 'Clubes e condomínios', 'Áreas particulares'],
    scope: [
      'Estudo da área e da circulação',
      'Definição de drenagem e contenção',
      'Preparação e superfície de areia previstas',
      'Rede, iluminação e fechamento conforme proposta',
    ],
    materials:
      'A areia precisa ser adequada à finalidade e avaliada junto ao sistema de drenagem e contenção. Não há especificação universal sem análise do local.',
    considerations: [
      'Drenagem',
      'Origem e características da areia',
      'Contenção e circulação',
      'Iluminação e vizinhança',
    ],
    maintenance:
      'Planeje limpeza, nivelamento e inspeção da areia, rede e drenagem. Verifique eventuais contaminantes antes de liberar o uso.',
  }),
  service({
    slug: 'pistas-de-atletismo',
    shortTitle: 'Pistas de atletismo',
    description:
      'Planejamento de superfícies para corrida, considerando finalidade, configuração da área e requisitos do projeto.',
    imageId: 'atletismo',
    applications: ['Espaços escolares', 'Clubes', 'Áreas de treino'],
    scope: [
      'Definição da finalidade de uso',
      'Avaliação da área e da base',
      'Estudo da superfície e do traçado',
      'Acabamento e marcações conforme projeto',
    ],
    materials:
      'Sistemas sintéticos e outras superfícies dependem dos requisitos de uso. Homologação para competições, se desejada, precisa integrar o escopo desde o início.',
    considerations: [
      'Finalidade recreativa ou competitiva',
      'Traçado e dimensões',
      'Base e escoamento',
      'Requisitos específicos do projeto',
    ],
    maintenance:
      'Use procedimentos compatíveis com o revestimento. Inspecione desgastes, juntas e drenagem para planejar correções.',
  }),
  service({
    slug: 'estruturas-e-acessorios',
    shortTitle: 'Estruturas e acessórios',
    description:
      'Fechamentos, redes e equipamentos completam a experiência do espaço e precisam de especificação e instalação adequadas.',
    imageId: 'quadra-tecnica',
    applications: ['Quadras e campos', 'Ginásios', 'Áreas de lazer'],
    scope: [
      'Levantamento dos equipamentos necessários',
      'Definição do fechamento e acessos',
      'Avaliação de fixação e compatibilidade',
      'Fornecimento e instalação dos itens contratados',
    ],
    materials:
      'Alambrados, redes, traves, tabelas e outros itens serão definidos conforme modalidade e escopo. Iluminação requer dimensionamento próprio.',
    considerations: [
      'Fixações e suporte existente',
      'Altura e circulação',
      'Exposição ao tempo',
      'Compatibilidade com o uso',
    ],
    maintenance:
      'Inspecione corrosão, ancoragens, redes e componentes móveis. Retire de uso equipamentos com indícios de instabilidade até avaliação.',
  }),
  service({
    slug: 'playgrounds',
    shortTitle: 'Playgrounds',
    description:
      'Integre brincadeira e circulação ao espaço de lazer com atenção à faixa etária, equipamentos e conservação.',
    imageId: 'playground',
    category: 'complementar',
    applications: ['Condomínios', 'Escolas', 'Áreas de lazer'],
    scope: [
      'Levantamento do público e do espaço',
      'Definição de equipamentos e disposição',
      'Avaliação do piso e das áreas de circulação',
      'Instalação dos itens previstos no projeto',
    ],
    materials:
      'Equipamentos, acabamentos e piso precisam ser avaliados em conjunto. Requisitos de segurança e orientações do fabricante devem integrar a especificação.',
    considerations: [
      'Faixa etária',
      'Área de circulação',
      'Piso e fixação',
      'Inspeção e conservação',
    ],
    maintenance:
      'Estabeleça inspeções periódicas e registros de manutenção. Componentes danificados devem ser isolados até reparo ou substituição.',
  }),
  service({
    slug: 'paisagismo',
    shortTitle: 'Paisagismo',
    description:
      'Vegetação, caminhos e áreas de convivência como complemento ao planejamento do espaço esportivo.',
    imageId: 'paisagismo',
    category: 'complementar',
    applications: ['Áreas de lazer', 'Condomínios', 'Entorno de espaços esportivos'],
    scope: [
      'Entendimento do uso e do ambiente',
      'Definição de vegetação e circulação',
      'Preparação e implantação previstas',
      'Orientação de conservação',
    ],
    materials:
      'As espécies e os materiais dependem de insolação, solo, disponibilidade de água e capacidade de manutenção do local.',
    considerations: [
      'Insolação e solo',
      'Irrigação',
      'Circulação e acesso',
      'Manutenção da vegetação',
    ],
    maintenance:
      'Considere irrigação, poda e conservação dos caminhos. As necessidades mudam conforme as espécies e as condições ambientais.',
  }),
];
