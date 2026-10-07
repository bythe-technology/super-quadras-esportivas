import Link from 'next/link';
import { Action } from '@/components/ui/Action';
import { Icon } from '@/components/ui/Icon';
import { Media } from '@/components/content/Media';
import { SectionHeading } from '@/components/content/SectionHeading';
import { ServiceCard, ProjectCard, GuideCard } from '@/components/content/Cards';
import { Process } from '@/components/content/Process';
import { Faq } from '@/components/content/Faq';
import { CallToAction } from '@/components/content/CallToAction';
import { contentRepository } from '@/repositories/contentRepository';
import { pageMetadata } from '@/utils/seo';
import styles from './home.module.css';
export const metadata = pageMetadata(
  'Construção e reforma de quadras esportivas',
  'Soluções para quadras, pisos esportivos e espaços de lazer. De São Paulo para todo o Brasil. Converse com a Super Quadras sobre seu projeto.',
  '/',
);
const faqs = [
  {
    question: 'Como começar meu projeto?',
    answer:
      'Conte a cidade, o tipo de espaço, as modalidades e o que deseja construir ou reformar. Dimensões aproximadas e fotos atuais ajudam na primeira conversa.',
  },
  {
    question: 'Qual é o melhor piso para a minha quadra?',
    answer:
      'Depende das modalidades, do ambiente, da base e da rotina de manutenção. A escolha precisa considerar essas condições em conjunto, não apenas cor ou preço.',
  },
  {
    question: 'Vocês atendem condomínios, escolas e clubes?',
    answer:
      'Esses espaços fazem parte do foco do site. A disponibilidade e o escopo de cada atendimento serão confirmados na conversa sobre o projeto.',
  },
  {
    question: 'É possível solicitar um orçamento fora de São Paulo?',
    answer:
      'Sim, você pode consultar. Projetos em outras regiões são analisados conforme escopo e logística, sem garantia prévia de cobertura.',
  },
];
export default function HomePage() {
  const services = contentRepository.services();
  const projects = contentRepository.projects().slice(0, 4);
  const guides = contentRepository.guides().slice(0, 3);
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="eyebrow">SUPER QUADRAS ESPORTIVAS</p>
            <h1>
              Construção e reforma de <span>quadras esportivas.</span>
            </h1>
            <p className={styles.heroDescription}>
              O seu próximo jogo começa com um espaço bem planejado. Soluções para esporte, lazer e
              convivência.
            </p>
            <div className={styles.heroActions}>
              <Action href="/orcamento">Solicitar orçamento</Action>
              <Link href="/solucoes" className={styles.heroLink}>
                Conhecer soluções <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div className={styles.heroLocation}>
              <Icon name="pin" size={16} />
              <span>
                De São Paulo para todo o Brasil
                <br />
                <small>Atendimento conforme o seu projeto</small>
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroLabel}>
              <span>DO PLANEJAMENTO AO ESPAÇO DE JOGO</span>
              <Icon name="diagonal" size={18} />
            </div>
            <Media
              id="quadra-azul-exterior"
              priority
              sizes="(max-width:720px) 100vw, 55vw"
              caption={false}
            />
            <div className={styles.photoCaption}>
              <span>Registro fotográfico do acervo</span>
              <span>Quadra ao ar livre</span>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.offerStrip}>
        <div className={`container ${styles.offerInner}`}>
          <span>
            <Icon name="grid" />
            Quadras e campos
          </span>
          <span>
            <Icon name="layers" />
            Pisos e superfícies
          </span>
          <span>
            <Icon name="tool" />
            Reforma e conservação
          </span>
          <span>
            <Icon name="flag" />
            Espaços de lazer
          </span>
        </div>
      </div>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="SOLUÇÕES PARA O SEU ESPAÇO"
            title="Cada esporte pede uma solução."
            description="Da construção à renovação: conheça as possibilidades e descubra o que faz sentido para o seu projeto."
            href="/solucoes"
            linkText="Todas as soluções"
          />
          {services.length ? (
            <div className="grid-3">
              {services
                .filter((s) =>
                  [
                    'construcao-de-quadras',
                    'reforma-de-quadras',
                    'pisos-esportivos',
                    'grama-sintetica',
                    'quadras-poliesportivas',
                    'quadras-de-beach-tennis',
                  ].includes(s.slug),
                )
                .map((s, i) => (
                  <ServiceCard key={s.slug} service={s} index={i} />
                ))}
            </div>
          ) : (
            <p>Consulte nossa equipe para conhecer as soluções disponíveis.</p>
          )}
        </div>
      </section>
      {projects.length > 0 ? (
        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="ESPAÇOS EM FOCO"
              title="O esporte ganha forma."
              description={
                projects.some((p) => p.status === 'review')
                  ? 'Uma seleção de fotografias do acervo. Os detalhes de cada projeto estão sendo organizados para o novo portfólio.'
                  : 'Conheça os projetos documentados e as soluções aplicadas.'
              }
              href="/obras"
              linkText="Explorar registros"
            />
            {projects.length ? (
              <div className="grid-3">
                {projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            ) : (
              <p>Estamos organizando o portfólio com registros e informações verificadas.</p>
            )}
          </div>
        </section>
      ) : null}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <SectionHeading
            eyebrow="UM CAMINHO CLARO"
            title="Seu projeto, etapa por etapa."
            description="Uma conversa sobre o uso do espaço é o ponto de partida. As condições do local orientam as próximas decisões."
          />
          <Process />
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.approachGrid}`}>
          <div className={styles.approachVisual}>
            <Media id="base-drenagem" />
            <span className={styles.verticalLabel}>PENSADO COMO UM CONJUNTO</span>
          </div>
          <div className={styles.approachCopy}>
            <p className="eyebrow">ALÉM DA SUPERFÍCIE</p>
            <h2>
              Um bom espaço
              <br />
              começa na base.
            </h2>
            <p>
              O acabamento é o que aparece. Mas a escolha da superfície, a drenagem, os equipamentos
              e a rotina de uso precisam fazer parte da mesma conversa.
            </p>
            <ul>
              <li>
                <Icon name="check" />
                Escolha orientada pelas modalidades
              </li>
              <li>
                <Icon name="check" />
                Escopo definido para o seu espaço
              </li>
              <li>
                <Icon name="check" />
                Manutenção considerada desde o início
              </li>
            </ul>
            <Action href="/empresa" secondary>
              Conheça nossa abordagem
            </Action>
          </div>
        </div>
      </section>
      <section className={styles.region}>
        <div className={`container ${styles.regionInner}`}>
          <div>
            <p className="eyebrow">PERTO DO SEU PROJETO</p>
            <h2>
              De São Paulo,
              <br />
              para todo o Brasil.
            </h2>
          </div>
          <div>
            <p>
              Seu espaço pode estar em qualquer região do Brasil. Conte onde está o projeto e vamos
              avaliar o escopo, as possibilidades de atendimento e a logística.
            </p>
            <Link href="/atendimento">
              Consultar área de atendimento <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section surface">
        <div className="container">
          <SectionHeading
            eyebrow="DECISÕES BEM INFORMADAS"
            title="Antes da obra, boas perguntas."
            description="Guias para organizar ideias, entender possibilidades e preparar seu pedido de orçamento."
            href="/guias"
            linkText="Todos os guias"
          />
          <div className="grid-3">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className={`container ${styles.faqGrid}`}>
          <SectionHeading
            eyebrow="VAMOS ESCLARECER"
            title="Seu projeto começa aqui."
            description="Algumas respostas para quem está planejando construir ou renovar um espaço esportivo."
          />
          <Faq items={faqs} />
        </div>
      </section>
      <CallToAction />
    </>
  );
}
