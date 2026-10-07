import type { CompanyProfile } from '@/types/content';
export const company = {
  name: 'Super Quadras Esportivas',
  domain: 'https://www.superquadrasoficial.com.br',
  phoneDisplay: '+55 15 99715-7642',
  phoneInternational: '+5515997157642',
  whatsappNumber: '5515997157642',
  instagram: 'https://www.instagram.com/superquadrasesportivas/',
  instagramHandle: '@superquadrasesportivas',
  region: 'São Paulo e Brasil',
} as const satisfies CompanyProfile;
