import type { MediaAsset } from '@/types/content';

const archive = (
  id: string,
  filename: string,
  alt: string,
  width: number,
  height: number,
): MediaAsset => ({
  id,
  src: `/media/${id}.webp`,
  alt,
  width,
  height,
  kind: 'archive-photo',
  source: `../assets/biblioteca/imagens/${filename}`,
  rights: 'approved-owner',
  treatment: 'Conversão de formato e remoção de metadados; sem alteração da obra.',
});
const illustration = (id: string, alt: string): MediaAsset => ({
  id,
  src: `/illustrations/${id}.svg`,
  alt,
  width: 1200,
  height: 900,
  kind: 'conceptual-illustration',
  source: 'Ilustração vetorial original para o novo site',
  rights: 'original-illustration',
  treatment: 'Composição conceitual, sem medidas ou especificação executiva.',
});
const generated = (id: string, alt: string): MediaAsset => ({
  ...illustration(id, alt),
  src: `/illustrations/${id}-premium.webp`,
  width: 1448,
  height: 1086,
  source: 'Gerador integrado OpenAI · 2026-10-07 · prompts em docs/ILUSTRACOES.md',
  treatment:
    'Render editorial conceitual gerado por IA; conversão WebP/AVIF; não é obra real nem projeto executivo.',
});

export const media: MediaAsset[] = [
  archive(
    'quadra-azul-exterior',
    'construcao-de-quadra-poliesportiva-4.jpeg',
    'Quadra azul ao ar livre, com alambrado, marcações e tabelas de basquete.',
    1040,
    780,
  ),
  archive(
    'quadra-azul-coberta',
    'Quadra-Esportiva-1.jpg',
    'Quadra azul com cobertura de tela, marcações brancas e alambrado.',
    1080,
    607,
  ),
  archive(
    'quadra-ginasio',
    'Quadra-Esportiva-12.jpg',
    'Piso de ginásio com área central laranja e marcações para diferentes modalidades.',
    1080,
    1080,
  ),
  archive(
    'quadra-ginasio-detalhe',
    'Quadra-Esportiva-10.jpg',
    'Vista lateral do piso de ginásio, com marcações esportivas e área cinza.',
    1080,
    1080,
  ),
  archive(
    'construcao-quadra',
    'construcao-de-quadras-1.jpg',
    'Registro fotográfico de quadra preservado do site anterior.',
    1080,
    607,
  ),
  archive(
    'piso-asfaltico',
    'piso-asfaltico-para-quadras-poliesportivas.jpg',
    'Imagem de superfície esportiva apresentada no acervo como piso asfáltico.',
    350,
    263,
  ),
  archive(
    'piso-concreto',
    'piso-de-concreto-para-quadras-poliesportivas.jpg',
    'Imagem de superfície esportiva apresentada no acervo como piso de concreto.',
    350,
    263,
  ),
  archive(
    'saibro',
    'saibro-sintetico-para-quadras-poliesportivas.jpg',
    'Imagem de superfície apresentada no acervo como saibro sintético.',
    350,
    263,
  ),
  generated('quadra-tecnica', 'Ilustração conceitual em 3D de quadra azul com alambrado e gols.'),
  generated(
    'beach-tennis',
    'Ilustração conceitual em 3D de quadra de beach tennis com areia e rede.',
  ),
  illustration('campo', 'Ilustração conceitual de campo com superfície verde.'),
  illustration('tenis', 'Ilustração conceitual de quadra de tênis com rede.'),
  illustration('atletismo', 'Ilustração conceitual de uma pista de atletismo.'),
  illustration('playground', 'Ilustração conceitual de espaço de lazer com playground.'),
  illustration('paisagismo', 'Ilustração conceitual de vegetação e caminhos em uma área de lazer.'),
  generated(
    'base-drenagem',
    'Ilustração conceitual das camadas de uma superfície esportiva, sem especificação executiva.',
  ),
];
