# Lançamento na Vercel

## Pré-condições

Fotos recuperadas e serviços autorizados pelo responsável nesta conversa em 2026-10-07. Os guias passaram por revisão editorial nesta implementação; não substituem orientação técnica profissional. Não há comprovação adicional das obras do acervo, que permanecem fora da produção aprovada. Aviso público de prévia removido.

- Proprietário confirma serviços atuais, textos, telefone e perfil Instagram.
- Direitos e autoria das fotos confirmados; hero aprovado em `media.ts`.
- Revisão da marca vetorizada e das ilustrações.
- Serviços aprovados recebem `published`; demais ficam fora da publicação.
- Obras somente com documentação e três ou mais fotos verificadas.
- Guias com revisão profissional adequada e data real de revisão.
- Revisão da política de privacidade pelo responsável; não é parecer jurídico.
- Domínio e conta de hospedagem sob controle do proprietário/responsável.

## Vercel

1. Criar projeto independente, framework Next.js; root directory desta pasta `site` conforme o repositório usado.
2. Build: `npm run build`; install: `npm ci`; não configurar output directory manual.
3. Ativar Deployment Protection nas previews. `noindex` e robots não são autenticação nem proteção de acesso. Não compartilhar previews sem proteção antes da autorização das imagens.
4. Em Preview manter `SITE_APPROVED=false`. Em Production a aprovação registrada é o padrão; usar `SITE_APPROVED=true` explicitamente também é suportado. `SITE_APPROVED=false` desativa indexação como medida de emergência. Variáveis afetam prerender e exigem rebuild.
5. Configurar `superquadrasoficial.com.br` e `www`; usar os registros DNS informados pela Vercel, sem adivinhar IPs. A Vercel gerencia HTTPS. `www` redireciona para o domínio principal.
6. Confirmar HTTPS, redirecionamento HTTP, domínio principal e normalização sem barra final. Validar dados estruturados e navegação no deploy, não apenas localmente.
7. Opcional: configurar `GOOGLE_SITE_VERIFICATION` e verificar propriedade na Search Console. Enviar sitemap e inspecionar URLs representativas.
8. Opcional: GA4 em `NEXT_PUBLIC_GA_ID`, formato G-…, apenas em produção aprovada. Desativar medição aprimorada automática; testar aceitar, recusar e revogar em perfil limpo.

## Proteções e limites

Aplicação sem banco, uploads, autenticação, senhas ou tokens privados. SQL injection, controle de acesso de contas e rate limiting de leads não se aplicam a endpoints inexistentes; revisar novamente se o escopo mudar. Formulário valida campos, revalida no caso de uso e codifica a mensagem no link externo. XSS protegido pela renderização de texto e Markdown sem HTML.

CSP restringe origens e impede frames/objetos/base externa. `unsafe-inline` permanece para hidratação estática do Next; não há `unsafe-eval` em produção. Uma política com nonces exige arquitetura por requisição e deve ser avaliada se houver funcionalidades sensíveis. Vercel/DNS/contas externas ainda exigem proteção própria.

## Escala e desempenho

Conteúdo pré-renderizado pode ser servido pela CDN. Não há estado de sessão nem servidor de leads para crescer com o número de visitantes. Para 100 mil usuários, analisar tráfego simultâneo, banda, cache, custo de otimização de imagens e limites do plano Vercel — volume total não garante capacidade ou custo.

Gargalos principais: fotografias e JavaScript do framework. Next Image aplica sizes, formatos e lazy loading; hero priorizado. Não há mapas, feed, vídeos ou animações pesadas. Novas integrações devem ser medidas antes de publicar.

## Pós-lançamento e rollback

Primeira semana: contato real controlado pelo responsável, 404, erros, indexação e comportamento mobile. Primeiro mês: consultas, entradas e microconversões. Mensal: publicação revisada e desempenho. Reverter pelo deploy anterior da Vercel se necessário; nunca apagar o acervo para corrigir um deploy.

Atualização de Instagram, Perfil da Empresa e diretórios deve ser feita por titular autorizado. Não há acesso ao domínio antigo e não se deve alegar migração de autoridade. Não publicar endereço residencial como local de atendimento sem validação.
