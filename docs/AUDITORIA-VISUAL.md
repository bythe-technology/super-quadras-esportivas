# Auditoria e refinamento visual

## Diagnóstico

Navegação sem presença visual, imagens conceituais planas, legendas longas competindo com títulos, cartões com ações desalinhadas e pouca diferenciação de profundidade. O posicionamento local não refletia a abrangência solicitada.

## Estratégia

ui-ux-pro-max orientou espaçamento da navegação flutuante, contraste, foco, transições de 150–300 ms e imagens responsivas. Recomendações genéricas de trocar fontes e cores não foram aplicadas: preservamos Manrope e a identidade verde/azul.

Header fixo verde com margens, logo reversa, CTA claro e menu mobile acessível. Espaço reservado no documento e offset de âncoras evitam conteúdo encoberto. Cartões com raio consistente, imagem em 4:3, ação alinhada e identificação conceitual compacta. Hero com fundo suave e profundidade sem modificar a fotografia real.

Motion-design orientou movimentos curtos, sem bounce: entrada de títulos por IntersectionObserver, feedback nos links, menu e cartões. Não há bibliotecas novas ou animação que esconda conteúdo antes da hidratação. Movimento reduzido desativa os efeitos. Um observador por rota é desconectado na desmontagem.

## Arquitetura e riscos

Conteúdo e mídia continuam no servidor; MotionEnhancements é uma camada cliente isolada. Serviços, guias, mídia e política de publicação permanecem tipados e separados. O maior custo continua sendo download/otimização das fotos e framework, não animação.

Autorização das fotos e serviços registrada em 2026-10-07. Produção libera apenas conteúdo publicado; previews não indexam. Registros incompletos não se transformam em estudos de caso. A autorização não comprova informações comerciais ausentes.

## Verificação

Testes de contato, validação, navegação, Escape, posição fixa após scroll, ausência de banner e referência a Sorocaba, imagens geradas, acessibilidade, ausência de JavaScript e redução de movimento. Reflow em cinco larguras e equivalente a zoom de 200%. Conferir relatório QA e checklist de lançamento.
