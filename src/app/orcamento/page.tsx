import { PageIntro } from '@/components/content/PageIntro';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { WhatsAppLink } from '@/components/contact/WhatsAppLink';
import { Icon } from '@/components/ui/Icon';
import { contentRepository } from '@/repositories/contentRepository';
import { company } from '@/modules/company/profile';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/contact/contact.module.css';
import contentStyles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'Solicitar orçamento para seu espaço esportivo',
  'Organize seu pedido de construção, reforma ou manutenção e confira a mensagem antes de enviá-la pelo WhatsApp.',
  '/orcamento',
);
export default function QuotePage() {
  return (
    <>
      <PageIntro
        eyebrow="VAMOS PLANEJAR O PRÓXIMO PASSO"
        title="Conte sobre o seu projeto."
        description="Preencha o que você já sabe. Vamos preparar uma mensagem para você conferir e enviar no WhatsApp."
        breadcrumbs={[{ label: 'Orçamento', href: '/orcamento' }]}
      />
      <section className="section">
        <div className={`container ${contentStyles.detailGrid}`}>
          <QuoteForm
            services={contentRepository.services().map((s) => ({ slug: s.slug, title: s.title }))}
          />
          <aside className={styles.quoteAside}>
            <p className="eyebrow">SEM COMPLICAÇÃO</p>
            <h2>Você tem o controle do envio.</h2>
            <ol>
              <li>Conte sobre o espaço.</li>
              <li>Confira a mensagem preparada.</li>
              <li>Continue no WhatsApp e confirme o envio.</li>
            </ol>
            <p>Não pedimos e-mail ou telefone aqui. O formulário não salva suas respostas.</p>
            <p>Prefere conversar diretamente?</p>
            <WhatsAppLink position="quote-aside">
              <Icon name="message" />
              {company.phoneDisplay}
            </WhatsAppLink>
          </aside>
        </div>
      </section>
    </>
  );
}
