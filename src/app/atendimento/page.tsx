import { PageIntro } from '@/components/content/PageIntro';
import { CallToAction } from '@/components/content/CallToAction';
import { WhatsAppLink } from '@/components/contact/WhatsAppLink';
import { Icon } from '@/components/ui/Icon';
import { company } from '@/modules/company/profile';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'De São Paulo para todo o Brasil',
  'Construção e reforma de espaços esportivos em São Paulo e outras regiões do Brasil. Consulte o atendimento conforme o escopo e a logística do projeto.',
  '/atendimento',
);
export default function AreaPage() {
  return (
    <>
      <PageIntro
        eyebrow="PERTO DO SEU PROJETO"
        title="De São Paulo para todo o Brasil."
        description="A localização é uma das primeiras informações para entender o projeto. Consulte a viabilidade de atendimento para o seu espaço."
        breadcrumbs={[{ label: 'Atendimento', href: '/atendimento' }]}
      />
      <section className="section">
        <div className={`container ${styles.detailGrid}`}>
          <div>
            <h2>O seu projeto não precisa estar perto.</h2>
            <p>
              O planejamento considera a cidade, o acesso ao local e o escopo desejado. Atendimento
              e agenda serão confirmados individualmente.
            </p>
            <h3>Seu projeto está em outra região?</h3>
            <p>
              Informe a cidade e a UF. Projetos fora de São Paulo podem ser avaliados mediante
              consulta, conforme disponibilidade, características da intervenção e logística.
            </p>
            <h3>Antes de solicitar uma visita</h3>
            <p>
              Reúna informações sobre a área, modalidades e situação atual. A conversa inicial ajuda
              a identificar o próximo passo e as avaliações necessárias.
            </p>
          </div>
          <aside className={styles.sidePanel}>
            <Icon name="pin" size={30} />
            <h2>Consulte a sua cidade.</h2>
            <p>
              Não há confirmação automática de cobertura. Converse com a equipe antes de planejar
              contratação ou deslocamento.
            </p>
            <WhatsAppLink position="coverage">{company.phoneDisplay}</WhatsAppLink>
          </aside>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
