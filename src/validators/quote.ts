import { z } from 'zod';
import { serviceCatalog } from '@/modules/content/serviceCatalog';

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Use no máximo ${max} caracteres.`)
    .refine(
      (value) => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value),
      'Remova caracteres de controle.',
    );
export const quoteSchema = z.object({
  service: text(80).refine(
    (value) => serviceCatalog.some((s) => s.slug === value),
    'Selecione um serviço.',
  ),
  intervention: z.enum(['construcao', 'reforma', 'manutencao'], {
    error: 'Selecione o tipo de intervenção.',
  }),
  city: text(120).min(2, 'Informe a cidade.'),
  state: z.enum(
    [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ],
    { error: 'Selecione a UF.' },
  ),
  name: text(100).min(2, 'Informe seu nome.'),
  space: text(120),
  dimensions: text(120),
  company: text(120),
  description: text(1000),
});
export type QuoteDraft = z.infer<typeof quoteSchema>;
