import Link from 'next/link';
import { PageIntro } from '@/components/content/PageIntro';
import { company } from '@/modules/company/profile';
import { PrivacyPreferences } from '@/components/privacy/PrivacyPreferences';
import { pageMetadata } from '@/utils/seo';
export const metadata = pageMetadata(
  'Política de privacidade',
  'Entenda como funcionam o formulário local, o contato pelo WhatsApp e as análises opcionais de navegação no site da Super Quadras.',
  '/politica-de-privacidade',
);
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="TRANSPARÊNCIA"
        title="Privacidade e seus dados."
        description="Você decide quando entrar em contato e se deseja permitir análises de navegação."
        breadcrumbs={[{ label: 'Privacidade', href: '/politica-de-privacidade' }]}
      />
      <section className="section">
        <div className="container legal">
          <h2>Quem apresenta este site</h2>
          <p>
            Este site apresenta a Super Quadras Esportivas. Para informações sobre o tratamento de
            dados ou solicitações relativas à privacidade, utilize o{' '}
            <Link href="/contato">contato oficial</Link>: {company.phoneDisplay}.
          </p>
          <h2>Formulário de orçamento</h2>
          <p>
            As respostas ficam temporariamente na memória do seu navegador. Não são enviadas a um
            banco, e-mail ou servidor de leads e não são salvas em armazenamento local. Ao fechar ou
            recarregar a página, o rascunho é perdido.
          </p>
          <p>
            Após revisar a mensagem, você pode abrir o WhatsApp. Nesse momento, o texto é incluído
            no link enviado ao serviço externo. O envio da mensagem é confirmado por você no
            WhatsApp, que possui suas próprias condições e política de privacidade. Evite incluir
            informações sensíveis no formulário.
          </p>
          <h2>Análises opcionais</h2>
          <p>
            Quando configuradas, as análises de navegação são carregadas somente após sua
            autorização. Usamos informações sobre páginas visitadas e ações, como clique em contato
            ou abertura da mensagem. Nome, cidade, descrição e outras respostas do formulário não
            são enviados como eventos.
          </p>
          <p>
            A preferência de consentimento pode ser guardada no navegador. É possível recusá-la sem
            perder acesso ao site e alterar sua decisão em <PrivacyPreferences />.
          </p>
          <h2>Hospedagem e registros técnicos</h2>
          <p>
            A infraestrutura de hospedagem pode processar registros técnicos necessários ao
            funcionamento e à segurança, como endereço IP e dados da requisição. O formulário não
            registra suas respostas em logs da aplicação. O site não promete ausência de registros
            técnicos do provedor.
          </p>
          <h2>Serviços externos</h2>
          <p>
            Links para WhatsApp e Instagram levam a serviços externos. Eles podem tratar dados
            conforme suas próprias políticas. O site não incorpora o feed do Instagram e não exige
            acesso a essas plataformas para consultar o conteúdo.
          </p>
          <h2>Atualizações e solicitações</h2>
          <p>
            Esta política deve ser revisada quando houver mudanças nas funcionalidades ou
            integrações. Solicitações sobre dados compartilhados em uma conversa comercial devem ser
            encaminhadas à empresa pelo contato oficial.
          </p>
        </div>
      </section>
    </>
  );
}
