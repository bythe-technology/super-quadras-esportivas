import { quoteSchema, type QuoteDraft } from '@/validators/quote';
import { serviceCatalog } from '@/modules/content/serviceCatalog';
import { createWhatsAppUrl } from '@/services/whatsapp';

const interventionLabels = {
  construcao: 'Construção',
  reforma: 'Reforma',
  manutencao: 'Manutenção',
};
export function prepareQuote(input: QuoteDraft) {
  const draft = quoteSchema.parse(input);
  const service = serviceCatalog.find((item) => item.slug === draft.service);
  const message = [
    'Olá, Super Quadras! Gostaria de conversar sobre um orçamento.',
    '',
    `Nome: ${draft.name}`,
    `Serviço: ${service?.title}`,
    `Intervenção: ${interventionLabels[draft.intervention]}`,
    `Local: ${draft.city}/${draft.state}`,
    ...(draft.space ? [`Tipo de espaço: ${draft.space}`] : []),
    ...(draft.dimensions ? [`Dimensões aproximadas: ${draft.dimensions}`] : []),
    ...(draft.company ? [`Empresa/condomínio: ${draft.company}`] : []),
    ...(draft.description ? [`Observações: ${draft.description}`] : []),
  ].join('\n');
  return { message, url: createWhatsAppUrl(message) };
}
