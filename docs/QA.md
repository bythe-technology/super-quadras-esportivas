# QA da implementação

Relatórios locais são reproduzíveis, não substituem validação no domínio final.

## Resultado local — 07/10/2026

Após refinamento visual: TypeScript e build passaram; 29 testes unitários e 18 testes E2E desktop/mobile. O script visual verificou 27 páginas locais e cinco larguras sem overflow horizontal ou erros de JavaScript. Axe não encontrou violações A/AA nos templates testados. Verificação de produção: 24 URLs públicas, robots permite indexação, sem cabeçalho noindex e sem registros de obras ainda incompletos.

Lighthouse mobile após refinamento: home local 94 em desempenho, 100 em acessibilidade e boas práticas, CLS 0 e TBT 60 ms. LCP de laboratório 3,0 s ainda fica acima da meta de 2,5 s; verificar após deploy/CDN. SEO 69 na prévia decorre de noindex intencional; produção foi verificada separadamente. O formulário vem no HTML inicial. Resultados antigos de orçamento: 96 em desempenho e 100 em acessibilidade; não remediram essa página nesta rodada.

Os resultados são de laboratório local. Antes de publicar, repetir a medição e revisar os dados de campo quando disponíveis. INP no percentil 75 não foi medido sem tráfego real.

Build de produção simulado na porta 3101: Lighthouse mobile 90 em desempenho, 100 em acessibilidade, boas práticas e SEO; LCP 3,4 s e CLS 0. Diferenças entre rodadas são sensíveis à máquina e ao cache. A meta de LCP ainda exige acompanhamento após deploy, embora ambas as rodadas atendam à nota mínima de desempenho.

## Verificações

- TypeScript estrito e build estático de todas as rotas.
- Unitários: validação, campos obrigatórios, limites, Unicode, caracteres de controle, escape de JSON-LD, URLs de WhatsApp, referências, slugs, restrições de mídia e bloqueio de publicação prematura.
- E2E desktop/mobile: formulário e prévia, atualização invalida mensagem antiga, contato oficial, menu Escape, FAQ, canonical, redirects, 404 e noindex.
- Refinamento: header fixo após scroll, abrangência nacional, ausência de banner, cinco usos das novas imagens na home, conteúdo sem JavaScript e respeito à redução de movimento.
- Axe WCAG A/AA nas páginas home e orçamento; demais templates também devem ser inspecionados antes de publicação.
- Script de QA verifica páginas, metadados e reflow em 360/390/768/1280/1440 px. Registra screenshots e erros JS.
- Lighthouse mobile da home e páginas representativas; SEO inclui bloqueio intencional de indexação em preview.

## Evidências

Resultados de navegador: `qa/browser-qa.json` e `qa/screenshots`. Lighthouse: `qa/lighthouse-*.report.html` e JSON quando executado. Relatório E2E: `playwright-report/index.html` após execução.

Antes de publicação testar novamente GA4 habilitado, consentimento e revogação, HTTPS/DNS, Search Console, perfil comercial e envio real pelo proprietário. Nenhuma mensagem real foi enviada nos testes automatizados.

Não há dados de campo suficientes para afirmar cumprimento de Core Web Vitals no percentil 75. Métricas de laboratório são somente uma referência, sensíveis à máquina, cache e condições do teste.
