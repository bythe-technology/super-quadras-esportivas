import { PageIntro } from '@/components/content/PageIntro';
import { Action } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { WhatsAppLink } from '@/components/contact/WhatsAppLink';
import { company } from '@/modules/company/profile';
import { pageMetadata } from '@/utils/seo';
import contentStyles from '@/components/content/content.module.css';
import styles from '@/components/contact/contact.module.css';
export const metadata = pageMetadata(
  'Contato e orçamento',
  'Fale com a Super Quadras pelo WhatsApp +55 15 99715-7642. Conte sobre seu espaço esportivo e consulte as possibilidades de atendimento.',
  '/contato',
);
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="O PRIMEIRO PASSO É UMA CONVERSA"
        title="Vamos falar sobre o seu espaço?"
        description="Envie uma mensagem pelo WhatsApp ou organize seu pedido com o formulário de orçamento."
        breadcrumbs={[{ label: 'Contato', href: '/contato' }]}
      />
      <section className="section">
        <div className={`container ${contentStyles.detailGrid}`}>
          <div>
            <h2>Seu projeto começa com informações simples.</h2>
            <p>
              Cidade, tipo de espaço, modalidades e dimensões aproximadas ajudam a entender o que
              você precisa. Não é necessário ter todas as respostas para começar.
            </p>
            <p>
              Para reunir essas informações em uma mensagem, use o formulário. Você confere o texto
              antes de continuar no WhatsApp.
            </p>
            <Action href="/orcamento">Preparar pedido de orçamento</Action>
          </div>
          <div>
            <div className={styles.contactCard}>
              <Icon name="message" size={25} />
              <h2>WhatsApp</h2>
              <p>Canal oficial para conversar sobre serviços e projetos.</p>
              <WhatsAppLink position="contact">
                {company.phoneDisplay}
                <Icon name="diagonal" size={17} />
              </WhatsAppLink>
            </div>
            <div className={styles.contactCard}>
              <Icon name="instagram" size={25} />
              <h2>Instagram</h2>
              <p>Acompanhe as publicações da empresa.</p>
              <a href={company.instagram} target="_blank" rel="noopener noreferrer">
                {company.instagramHandle}
                <Icon name="diagonal" size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
