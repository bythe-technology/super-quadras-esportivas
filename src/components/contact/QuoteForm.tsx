'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { quoteSchema } from '@/validators/quote';
import { prepareQuote } from '@/useCases/prepareQuote';
import { track } from '@/services/analytics';
import { Icon } from '@/components/ui/Icon';
import styles from './contact.module.css';
const states = [
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
];
const empty = {
  service: '',
  intervention: '',
  city: '',
  state: '',
  name: '',
  space: '',
  dimensions: '',
  company: '',
  description: '',
};
type Field = keyof typeof empty;
export function QuoteForm({ services }: { services: { slug: string; title: string }[] }) {
  const [values, setValues] = useState({ ...empty });
  // Keep the entire form in prerendered HTML. Read only the allowed service ID after hydration,
  // instead of useSearchParams forcing a CSR fallback and a large layout shift.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('servico');
    if (requested && services.some((service) => service.slug === requested))
      setValues((current) => ({ ...current, service: requested }));
  }, [services]);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [prepared, setPrepared] = useState<ReturnType<typeof prepareQuote> | null>(null);
  const [copyStatus, setCopyStatus] = useState('');
  const started = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  function update(field: Field, value: string) {
    if (!started.current) {
      track('quote_form_start', { position: 'quote' });
      started.current = true;
    }
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setPrepared(null);
    setCopyStatus('');
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = quoteSchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as Field;
        next[field] ??= issue.message;
      }
      setErrors(next);
      setPrepared(null);
      track('quote_validation_error', { position: 'quote' });
      const first = Object.keys(next)[0];
      const element = form.current?.elements.namedItem(first);
      if (element instanceof HTMLElement) element.focus();
      return;
    }
    setErrors({});
    setPrepared(prepareQuote(result.data));
    requestAnimationFrame(() => preview.current?.focus());
  }
  async function copy() {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.message);
      setCopyStatus('Mensagem copiada. Cole na conversa do WhatsApp.');
      track('quote_message_copy', { position: 'quote', serviceId: values.service });
    } catch {
      setCopyStatus(
        'Não foi possível copiar automaticamente. Selecione o texto da prévia e copie manualmente.',
      );
    }
  }
  const props = (field: Field) => ({
    id: field,
    name: field,
    value: values[field],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => update(field, event.target.value),
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  });
  const error = (field: Field) =>
    errors[field] ? (
      <span className={styles.error} id={`${field}-error`}>
        {errors[field]}
      </span>
    ) : null;
  return (
    <div>
      <form ref={form} onSubmit={submit} noValidate className={styles.form}>
        <fieldset>
          <legend>
            <span>01</span> Sobre o seu projeto
          </legend>
          <div className={styles.formGrid}>
            <div className={styles.full}>
              <label htmlFor="service">Serviço *</label>
              <select {...props('service')} required>
                <option value="">Selecione o serviço</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
              {error('service')}
            </div>
            <div className={styles.full}>
              <label htmlFor="intervention">Tipo de intervenção *</label>
              <select {...props('intervention')} required>
                <option value="">Selecione uma opção</option>
                <option value="construcao">Construção</option>
                <option value="reforma">Reforma</option>
                <option value="manutencao">Manutenção</option>
              </select>
              {error('intervention')}
            </div>
            <div>
              <label htmlFor="city">Cidade *</label>
              <input
                {...props('city')}
                required
                maxLength={120}
                autoComplete="address-level2"
                placeholder="Ex.: São Paulo"
              />
              {error('city')}
            </div>
            <div>
              <label htmlFor="state">UF *</label>
              <select {...props('state')} required autoComplete="address-level1">
                <option value="">Selecione</option>
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
              {error('state')}
            </div>
            <div>
              <label htmlFor="space">Tipo de espaço</label>
              <input {...props('space')} maxLength={120} placeholder="Condomínio, escola, clube…" />
              {error('space')}
            </div>
            <div>
              <label htmlFor="dimensions">Dimensões aproximadas</label>
              <input
                {...props('dimensions')}
                maxLength={120}
                placeholder="Se souber, informe a área"
              />
              {error('dimensions')}
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <span>02</span> Para começar a conversa
          </legend>
          <div className={styles.formGrid}>
            <div>
              <label htmlFor="name">Seu nome *</label>
              <input {...props('name')} required maxLength={100} autoComplete="name" />
              {error('name')}
            </div>
            <div>
              <label htmlFor="company">Empresa ou condomínio</label>
              <input {...props('company')} maxLength={120} autoComplete="organization" />
              {error('company')}
            </div>
            <div className={styles.full}>
              <label htmlFor="description">O que você tem em mente?</label>
              <textarea
                {...props('description')}
                maxLength={1000}
                rows={5}
                placeholder="Conte sobre o espaço e o que gostaria de construir ou renovar."
              />
              {error('description')}
              <span className={styles.counter}>{values.description.length}/1.000 caracteres</span>
            </div>
          </div>
        </fieldset>
        <p className={styles.formNote}>
          * Campos obrigatórios. Este formulário prepara uma mensagem no seu navegador. Nada é
          enviado ou salvo automaticamente.
        </p>
        <button className={styles.primaryButton} type="submit">
          Preparar mensagem <Icon name="arrow" size={18} />
        </button>
      </form>
      {prepared ? (
        <div ref={preview} tabIndex={-1} className={styles.preview} aria-label="Prévia da mensagem">
          <p className="eyebrow">CONFIRA ANTES DE ENVIAR</p>
          <h2>Sua mensagem está pronta.</h2>
          <pre>{prepared.message}</pre>
          <p>
            Ao continuar, o WhatsApp será aberto. Você ainda precisa tocar em enviar para concluir o
            contato.
          </p>
          <div className={styles.previewActions}>
            <a
              className={styles.primaryButton}
              href={prepared.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track('quote_whatsapp_open', { position: 'quote', serviceId: values.service })
              }
            >
              Continuar no WhatsApp <Icon name="diagonal" size={18} />
            </a>
            <button className={styles.copyButton} onClick={copy}>
              Copiar mensagem
            </button>
          </div>
          <p role="status" aria-live="polite">
            {copyStatus}
          </p>
        </div>
      ) : null}
    </div>
  );
}
