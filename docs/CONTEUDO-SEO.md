# Conteúdo, manutenção e SEO

## Fontes de verdade

Empresa/telefone/Instagram: `src/modules/company/profile.ts`. Serviços, guias, registros e mídias: `src/modules/content`. O repositório filtra conteúdos em revisão quando a publicação é aprovada.

Antes de alterar `status` para `published`, confirmar escopo, revisão dos textos, direitos das imagens e links relacionados. Uma obra precisa de no mínimo três fotografias verificadas; não publicar registros isolados como prova de execução. Inserir a data real de revisão em `reviewedAt` para guias, formato ISO. Não inventar datas de publicação.

Markdown dos guias é renderizado no servidor, sem HTML arbitrário. Use H2/H3; H1 já pertence ao template. Links devem ter destino legítimo e ser revisados. Ao adicionar serviço ou guia, executar `npm run assets`, atualizar testes se necessário e executar `npm run check`.

## Mapa de intenções

| Página      | Intenção prioritária                                                                |
| ----------- | ----------------------------------------------------------------------------------- |
| Home        | Marca, construção e reforma de quadras                                              |
| Construção  | Construção de quadras esportivas                                                    |
| Reforma     | Reforma e recuperação de quadras                                                    |
| Pisos       | Comparação e contratação de pisos esportivos                                        |
| Modalidades | Necessidade específica de tênis, beach tennis, futebol, poliesportivas ou atletismo |
| Atendimento | São Paulo e solicitações de todo o Brasil, conforme escopo e logística              |
| Guias       | Dúvidas anteriores à contratação                                                    |

Essas intenções são hipóteses editoriais, não estimativas de volume. Para pesquisa posterior, registrar consulta, intenção, página, região, evidência e prioridade. Não criar páginas em massa para cidades sem informação própria.

## Pauta inicial e recorrência

Lançamento: escolha do piso; construir versus reformar; planejamento de beach tennis. Depois alternar mensalmente um guia e uma obra documentada. Pautas futuras: drenagem, manutenção, iluminação e preparação de pedido de orçamento. Revisão técnica antes de orientações específicas; não publicar preços ou normas sem fonte e validação.

## SEO implementado

Metadados únicos, canonical limpo, breadcrumbs, OG/Twitter, conteúdo inicial no HTML, sitemap de conteúdo publicado e imagens com descrição factual. Organization/WebSite globais, Service e Article nos templates. Sem endereço residencial, avaliações falsas, FAQ rich result prometido ou LocalBusiness com dados incompletos.

URLs antigas com equivalência têm redirects no **novo** domínio. `/obras` continua como portfólio; não redirecionar essa rota para poliesportivas. `/antes-depois` não tem substituto comprovado e retorna 404. Não há transferência de autoridade sem controle do domínio antigo.

## Mensuração

Eventos permitidos: `whatsapp_click`, `quote_form_start`, `quote_validation_error`, `quote_whatsapp_open`, `quote_message_copy`, `project_view`. Apenas posição, ID de serviço/projeto e página, nunca respostas. Abrir WhatsApp é microconversão, não envio nem lead confirmado.

No GA4, desativar medição aprimorada automática de formulários, histórico e cliques antes de ativar a integração; usar apenas as ações explicitamente implementadas. Não adicionar parâmetros pessoais aos links. Na Search Console acompanhar indexação, consultas e páginas de entrada. A equipe acompanha conversas qualificadas fora do site.

Primeiro mês forma a linha de base. Não prometer posição, tráfego ou quantidade de contatos.
