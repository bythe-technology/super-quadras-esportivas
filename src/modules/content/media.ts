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
  treatment:
    'Conversão WebP/AVIF e correção tonal leve não generativa; sem mudança de geometria ou conteúdo da obra.',
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
const generated = (
  id: string,
  alt: string,
  promptDocument = 'docs/ILUSTRACOES.md',
): MediaAsset => ({
  ...illustration(id, alt),
  src: `/illustrations/${id}-premium.webp`,
  width: 1448,
  height: 1086,
  source: `Gerador integrado OpenAI · 2026-10-07 · prompts em ${promptDocument}`,
  treatment:
    'Render editorial conceitual gerado por IA; conversão WebP/AVIF; não é obra real nem projeto executivo.',
});
const ownerPhoto = (id: string, alt: string, width: number, height: number): MediaAsset => ({
  id,
  src: `/media/${id}.webp`,
  alt,
  width,
  height,
  kind: 'archive-photo',
  source: 'Fotografia enviada pelo proprietário · assets/media-originals/beach-tennis-original.png',
  rights: 'approved-owner',
  treatment:
    'Correção tonal leve não generativa e conversão WebP/AVIF; não usada como estudo de caso identificado.',
});
const instagramPhoto = (id: string, filename: string, postId: string, alt: string): MediaAsset => ({
  id,
  src: `/media/${id}.webp`,
  alt,
  width: 1440,
  height: 1440,
  kind: 'archive-photo',
  source: `Instagram público da empresa · https://www.instagram.com/superquadrasesportivas/p/${postId}/ · Original: assets/media-originals/instagram/${filename}`,
  rights: 'approved-owner',
  treatment:
    'Correção leve de exposição e cor com Sharp; sem edição generativa ou mudanças de geometria, marcações, equipamentos ou materiais. Original preservado.',
});
const referencePhoto = (id: string, alt: string, width: number, height: number): MediaAsset => ({
  id,
  src: `/media/${id}.webp`,
  alt,
  width,
  height,
  kind: 'reference-photo',
  source:
    'Zoryana Rusin / Pexels · https://www.pexels.com/photo/close-up-of-green-soccer-field-turf-with-white-lines-33267122/',
  rights: 'licensed-stock',
  treatment:
    'Fotografia de referência licenciada no Pexels; conversão WebP/AVIF, sem alteração de conteúdo.',
  caption: 'Foto de referência · não é obra da empresa',
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
  generated(
    'guia-beach-tennis',
    'Ilustração conceitual em 3D de quadra de beach tennis em maquete isométrica, com areia clara, linhas azuis e rede central.',
    'docs/ILUSTRACOES.md',
  ),
  ownerPhoto(
    'beach-tennis-photo',
    'Quadra real de beach tennis com areia, rede, alambrado e vegetação ao redor.',
    711,
    516,
  ),
  instagramPhoto(
    'ig-quadra-azul-multiesportiva',
    'quadra-azul-multiesportiva-instagram.jpg',
    'DZqJ85LB8aF',
    'Quadra externa azul com marcações esportivas, gol, tabela de basquete e alambrado.',
  ),
  instagramPhoto(
    'ig-quadra-verde-terracota',
    'quadra-verde-terracota-instagram.jpg',
    'Dad61w9BAc7',
    'Quadra externa com áreas de piso verde e terracota e marcações esportivas variadas.',
  ),
  instagramPhoto(
    'ig-quadra-verde-tenis',
    'quadra-tenis-verde-instagram.jpg',
    'DaFqwYah0VR',
    'Quadra externa de piso verde com rede central, linhas brancas e fechamento em tela.',
  ),
  instagramPhoto(
    'ig-quadra-verde-multiesportiva',
    'quadra-verde-multiesportiva-instagram.jpg',
    'DaDO-CUhF8I',
    'Quadra verde ao ar livre com rede central, tabela de basquete e marcações esportivas.',
  ),
  instagramPhoto(
    'ig-quadra-verde-vermelha',
    'quadra-verde-vermelha-instagram.jpg',
    'DZ-zeCjhi0L',
    'Quadra externa verde com áreas vermelhas e linhas brancas de diferentes modalidades.',
  ),
  instagramPhoto(
    'ig-quadra-em-preparacao',
    'quadra-em-preparacao-instagram.jpg',
    'DZr38X8hXVZ',
    'Área esportiva elevada com fechamento em alambrado e terreno de terra ao redor.',
  ),
  instagramPhoto(
    'ig-campo-gramado',
    'campo-gramado-instagram.jpg',
    'DZunugdla9L',
    'Campo gramado visto através de alambrado, com traves e área esportiva ao ar livre.',
  ),
  referencePhoto(
    'grama-sintetica-referencia',
    'Detalhe real de grama sintética esportiva verde com linhas brancas de marcação.',
    2848,
    4272,
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
  generated(
    'solucao-construcao-de-quadras',
    'Maquete conceitual de uma nova quadra esportiva azul, com perímetro verde, marcações brancas e fechamento.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-reforma-de-quadras',
    'Maquete conceitual de reforma de quadra com superfície renovada e uma seção mostrando camadas construtivas.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-pisos-esportivos',
    'Composição conceitual de amostras de pisos esportivos azul, laranja e cinza.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-grama-sintetica',
    'Maquete conceitual de campo de futebol society com grama sintética verde e marcações brancas.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-campos-de-futebol',
    'Maquete conceitual de campo de futebol verde com linhas, gols e corte lateral da base.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-quadras-poliesportivas',
    'Maquete conceitual de quadra poliesportiva azul e verde com marcações para diferentes modalidades.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-quadras-de-tenis',
    'Maquete conceitual de quadra de tênis azul e verde com rede e marcações brancas.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-quadras-de-beach-tennis',
    'Maquete conceitual de quadra de beach tennis com areia clara, linhas azuis e rede central.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-pistas-de-atletismo',
    'Maquete conceitual de pista oval de atletismo terracota com quatro raias e campo central verde.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-estruturas-e-acessorios',
    'Composição conceitual de alambrado com portão, tabela de basquete, gol e postes com rede.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-playgrounds',
    'Maquete conceitual de playground compacto com estrutura de madeira, escorregador e balanços.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
  generated(
    'solucao-paisagismo',
    'Maquete conceitual de paisagismo com caminho de pedra, vegetação, árvores e banco junto a uma quadra.',
    'docs/ILUSTRACOES-SOLUCOES.md',
  ),
];
