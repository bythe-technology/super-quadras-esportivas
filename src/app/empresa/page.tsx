import { PageIntro } from '@/components/content/PageIntro';
import { SectionHeading } from '@/components/content/SectionHeading';
import { Media } from '@/components/content/Media';
import { Process } from '@/components/content/Process';
import { CallToAction } from '@/components/content/CallToAction';
import { pageMetadata } from '@/utils/seo';
import styles from '@/components/content/content.module.css';
export const metadata = pageMetadata(
  'Conheça a Super Quadras Esportivas',
  'Uma abordagem que considera uso, base, superfície e conservação na mesma conversa. Conheça a proposta da Super Quadras para espaços esportivos.',
  '/empresa',
);
export default function CompanyPage() {
  return (
    <>
      <PageIntro
        eyebrow="SUPER QUADRAS ESPORTIVAS"
        title="Espaços para jogar. Projetos para durar."
        description="Construir ou renovar uma área esportiva envolve mais do que escolher um acabamento. Começa por entender como o espaço será utilizado."
        breadcrumbs={[{ label: 'Empresa', href: '/empresa' }]}
      />
      <section className="section">
        <div className={`container ${styles.detailGrid}`}>
          <div>
            <p className="eyebrow">NOSSA PROPOSTA</p>
            <h2>O uso do espaço orienta as escolhas.</h2>
            <p>
              A proposta da Super Quadras é conversar sobre as necessidades de cada projeto:
              modalidades, área disponível, condições existentes e rotina de conservação.
            </p>
            <p>
              O foco está em quadras, campos, pisos e estruturas esportivas. Soluções de playground
              e paisagismo podem complementar o planejamento das áreas de lazer, conforme escopo e
              disponibilidade.
            </p>
            <h3>Uma conversa com clareza</h3>
            <p>
              Materiais, etapas e exclusões precisam estar descritos na proposta. O objetivo é que o
              responsável pelo espaço compreenda o que está sendo considerado antes de tomar uma
              decisão.
            </p>
            <h3>Atendimento e possibilidades</h3>
            <p>
              De São Paulo para todo o Brasil: recebemos projetos de diferentes regiões e
              organizamos o atendimento conforme o escopo, a disponibilidade e a logística.
            </p>
          </div>
          <Media id="quadra-tecnica" />
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="COMO O PROJETO AVANÇA"
            title="Etapas que organizam as decisões."
          />
          <Process />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
