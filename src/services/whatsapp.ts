import { company } from '@/modules/company/profile';
export function createWhatsAppUrl(
  message = 'Olá, Super Quadras! Gostaria de saber mais sobre os serviços.',
) {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
