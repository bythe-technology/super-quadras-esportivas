# Super Quadras — novo site

Projeto independente em Next.js 16 / React 19 / TypeScript. O acervo original, fora desta pasta, permanece intacto.

## Executar

Requisitos: Node 22.14+ e npm. Dependências fixadas no lockfile.

```powershell
npm ci
npm run dev
```

Prévia: http://localhost:3100. Para testar o build: `npm run build` e `npm start`.

```powershell
npm run check
npx playwright install chromium
npm run test:e2e
node scripts/browser-qa.mjs
```

`npm run assets` recria conversões, vetorização, favicons, fontes e imagens sociais. Os arquivos de origem são lidos do acervo; não são sobrescritos. As ilustrações são SVG originais editáveis.

## Estado da entrega

As 12 soluções e os três guias estão preparados para publicação. O responsável autorizou as fotos recuperadas e os serviços em 2026-10-07. O aviso de prévia foi removido. Os três registros do acervo não são estudos de caso verificados e ficam fora da produção aprovada. Nenhuma publicação remota foi realizada.

Na Vercel, Production usa a aprovação registrada por padrão; Preview continua com robots bloqueado e noindex. `SITE_APPROVED=false` desativa a liberação explicitamente. O build valida direitos, referências e arquivos. Conteúdos com `status: 'review'` ficam fora da produção aprovada. Veja [lançamento](docs/LANCAMENTO.md).

## Arquitetura

- `src/app`: composição de páginas, metadados e rotas do Next.
- `src/modules`: empresa e conteúdo editorial tipado.
- `src/repositories`: acesso aos dados locais e filtragem de publicação.
- `src/useCases`: preparação da mensagem, com revalidação.
- `src/services`: WhatsApp, analytics e estado de publicação.
- `src/validators` e `src/types`: contratos e validação.
- `src/components`: apresentação, formulário e consentimento.
- `src/tests` e `e2e`: testes de domínio e navegador.

Não há API de leads, banco, login ou painel. O formulário usa memória do navegador, mostra a mensagem e abre o contato oficial `5515997157642`. O visitante confirma o envio no WhatsApp. Não se registra orçamento enviado ao abrir o link.

## Manutenção e materiais

- [Conteúdo e SEO](docs/CONTEUDO-SEO.md)
- [Mídia e marca](docs/MIDIA-MARCA.md)
- [Lançamento e segurança](docs/LANCAMENTO.md)
- [Resultados de QA](docs/QA.md)

O consentimento analítico é opcional. Sem ID GA4 aprovado e ambiente de produção, nenhum script do Google é carregado. Search Console e DNS requerem acesso do responsável ao domínio e aos serviços.
