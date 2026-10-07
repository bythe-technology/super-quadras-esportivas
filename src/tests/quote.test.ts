import { describe, it, expect } from 'vitest';
import { quoteSchema, type QuoteDraft } from '@/validators/quote';
import { prepareQuote } from '@/useCases/prepareQuote';
import { createWhatsAppUrl } from '@/services/whatsapp';
const valid: QuoteDraft = {
  name: 'João da Silva',
  city: 'São Paulo',
  state: 'SP',
  service: 'pisos-esportivos',
  intervention: 'reforma',
  space: '',
  dimensions: '',
  company: '',
  description: '',
};
describe('quote validation and preparation', () => {
  it('accepts accents and optional fields', () =>
    expect(quoteSchema.safeParse(valid).success).toBe(true));
  it('trims user input', () =>
    expect(quoteSchema.parse({ ...valid, name: ' João ' }).name).toBe('João'));
  it.each(['name', 'city', 'state', 'service', 'intervention'])('rejects missing %s', (field) =>
    expect(quoteSchema.safeParse({ ...valid, [field]: '' }).success).toBe(false),
  );
  it('rejects unknown service or UF', () => {
    expect(quoteSchema.safeParse({ ...valid, service: 'fake' }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...valid, state: 'XX' }).success).toBe(false);
  });
  it('enforces text limits', () => {
    expect(quoteSchema.safeParse({ ...valid, name: 'a'.repeat(101) }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...valid, description: 'a'.repeat(1001) }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...valid, description: 'a'.repeat(1000) }).success).toBe(true);
  });
  it('rejects control characters', () =>
    expect(quoteSchema.safeParse({ ...valid, name: 'João\u0000' }).success).toBe(false));
  it('uses only the official contact and roundtrips special characters', () => {
    const result = prepareQuote({ ...valid, description: '<script>alert(1)</script> & João? #' });
    const url = new URL(result.url);
    expect(url.pathname).toBe('/5515997157642');
    expect(url.searchParams.get('text')).toBe(result.message);
    expect(result.message).toContain('São Paulo/SP');
    expect(result.message).not.toContain('Empresa/condomínio:');
  });
  it('revalidates in the use case', () =>
    expect(() => prepareQuote({ ...valid, name: '' })).toThrow());
  it('never allows a message to change host', () =>
    expect(new URL(createWhatsAppUrl('https://evil.test/?x=1&y=2')).host).toBe('wa.me'));
});
