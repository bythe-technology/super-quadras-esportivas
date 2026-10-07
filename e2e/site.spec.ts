import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('home is accessible, responsive and has one H1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Construção e reforma');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://www.superquadrasoficial.com.br',
  );
});
test('quote validates, preserves accents, preselects and prepares official WhatsApp', async ({
  page,
}) => {
  await page.goto('/orcamento?servico=pisos-esportivos');
  await expect(page.getByLabel('Serviço *', { exact: true })).toHaveValue('pisos-esportivos');
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  await expect(page.locator('[aria-invalid="true"]').first()).toBeFocused();
  await page.getByLabel('Tipo de intervenção *').selectOption('reforma');
  await page.getByLabel('Cidade *').fill('São Paulo');
  await page.getByLabel('UF *').selectOption('SP');
  await page.getByLabel('Seu nome *').fill('João');
  await page.getByLabel('O que você tem em mente?').fill('<script>alert(1)</script> & quadra');
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  const link = page.getByRole('link', { name: 'Continuar no WhatsApp' });
  const url = new URL((await link.getAttribute('href'))!);
  expect(url.pathname).toBe('/5515997157642');
  expect(url.searchParams.get('text')).toContain('São Paulo/SP');
  expect(url.searchParams.get('text')).toContain('<script>alert(1)</script>');
  await expect(
    page.getByText('Você ainda precisa tocar em enviar', { exact: false }),
  ).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.getByLabel('Seu nome *').fill('Maria');
  await expect(link).toHaveCount(0);
});
test('navigation, menu Escape, FAQ and contacts work', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    const toggle = page.locator('button[aria-controls="main-navigation"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
  }
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Soluções', exact: true })
    .click();
  await expect(page).toHaveURL(/\/solucoes$/);
  await page.goto('/');
  await page.locator('summary').filter({ hasText: 'Como começar meu projeto?' }).click();
  await expect(page.getByText('Conte a cidade, o tipo de espaço', { exact: false })).toBeVisible();
  for (const link of await page.locator('a[href*="wa.me"]').all())
    expect(await link.getAttribute('href')).toContain('wa.me/5515997157642');
  await page.goto('/contato');
  await expect(page.getByRole('link', { name: '@superquadrasesportivas' }).first()).toHaveAttribute(
    'href',
    'https://www.instagram.com/superquadrasesportivas/',
  );
});
test('SEO, preview protection, redirects and 404', async ({ request }) => {
  const html = await request.get('/solucoes/quadras-de-beach-tennis');
  expect(html.status()).toBe(200);
  expect(await html.text()).toContain('Construção de quadras de beach tennis');
  expect(html.headers()['x-robots-tag']).toBe('noindex, nofollow');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('<loc>');
  const redirect = await request.get('/piso', { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers()['location']).toBe('/solucoes/pisos-esportivos');
  const missing = await request.get('/pagina-inexistente');
  expect(missing.status()).toBe(404);
});
test('service, guide, archive and privacy templates are accessible', async ({ page }) => {
  for (const path of [
    '/solucoes/quadras-de-beach-tennis',
    '/guias/como-escolher-piso-quadra-esportiva',
    '/obras/quadra-externa-azul',
    '/politica-de-privacidade',
  ]) {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations, path).toEqual([]);
  }
});
test('analytics stays disabled and preference is available without blocking navigation', async ({
  page,
}) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    if (/google-analytics|googletagmanager/.test(request.url()))
      analyticsRequests.push(request.url());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Preferências de cookies' }).click();
  await expect(
    page.getByText('As análises estão desativadas nesta versão.', { exact: false }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Recusar análises' }).click();
  expect(await page.evaluate(() => localStorage.getItem('sq-analytics-consent-v1'))).toBe(
    'rejected',
  );
  await page.goto('/orcamento');
  await expect(page.getByLabel('Seu nome *')).toBeVisible();
  expect(analyticsRequests).toEqual([]);
});
test('copy failure has a manual fallback and invalid query does not select a service', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async () => {
          throw new Error('Denied');
        },
      },
      configurable: true,
    }),
  );
  await page.goto('/orcamento?servico=%3Cscript%3E');
  await expect(page.getByLabel('Serviço *', { exact: true })).toHaveValue('');
  await page.getByLabel('Serviço *', { exact: true }).selectOption('pisos-esportivos');
  await page.getByLabel('Tipo de intervenção *').selectOption('construcao');
  await page.getByLabel('Cidade *').fill('Sorocaba');
  await page.getByLabel('UF *').selectOption('SP');
  await page.getByLabel('Seu nome *').fill('Teste de interface');
  await page.getByRole('button', { name: 'Preparar mensagem' }).click();
  await page.getByRole('button', { name: 'Copiar mensagem' }).click();
  await expect(page.getByRole('status')).toContainText('copie manualmente');
  await expect(page.getByRole('link', { name: 'Continuar no WhatsApp' })).toBeVisible();
});
