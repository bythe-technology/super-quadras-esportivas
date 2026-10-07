import fs from 'node:fs/promises';
import { chromium } from 'playwright';
const base = process.env.QA_URL ?? 'http://localhost:3100';
await fs.mkdir('qa/screenshots', { recursive: true });
const browser = await chromium.launch();
const errors = [];
const rows = [];
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  const routes = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(links.map((link) => link.getAttribute('href').split('?')[0])),
    ]);
  const detailRoutes = new Set(routes);
  for (const path of ['/solucoes', '/obras', '/guias']) {
    await page.goto(`${base}${path}`);
    for (const href of await page
      .locator('main a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href').split('?')[0])))
      detailRoutes.add(href);
  }
  for (const path of detailRoutes) {
    const response = await page.goto(`${base}${path}`);
    const h1 = await page.locator('h1').count();
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    rows.push({ path, status: response.status(), h1, title, description, canonical });
    if (response.status() !== 200 || h1 !== 1 || !description || !canonical)
      errors.push(`Invalid page: ${path}`);
  }
  for (const width of [360, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    for (const route of [
      '/',
      '/solucoes/quadras-de-beach-tennis',
      '/obras/quadra-externa-azul',
      '/guias/como-escolher-piso-quadra-esportiva',
      '/orcamento',
    ]) {
      await page.goto(`${base}${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollTo(0, 0));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      if (overflow) errors.push(`Horizontal overflow: ${route} @ ${width}`);
      const slug = route === '/' ? 'home' : route.split('/').filter(Boolean).join('-');
      await page.screenshot({ path: `qa/screenshots/${slug}-${width}.png`, fullPage: true });
      if (route === '/' && width === 1440)
        await page.screenshot({ path: 'qa/screenshots/home-desktop.png', fullPage: false });
    }
  }
  // Reflow equivalent to a 1280px viewport at 200% zoom: 640 CSS pixels.
  await page.setViewportSize({ width: 640, height: 480 });
  await page.goto(base);
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    errors.push('200% reflow failed');
  await fs.writeFile(
    'qa/browser-qa.json',
    JSON.stringify(
      {
        date: new Date().toISOString(),
        pages: rows,
        responsiveWidths: [360, 390, 768, 1280, 1440],
        reflow200Percent: true,
        errors,
      },
      null,
      2,
    ),
  );
  console.log(
    `Verified ${rows.length} pages and 25 responsive screenshots. Errors: ${errors.length}`,
  );
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
