import { test, expect } from '@playwright/test';

test('floating navigation remains usable after scrolling', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Prévia para aprovação', { exact: false })).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('Sorocaba');
  await expect(page.getByText('De São Paulo para todo o Brasil').first()).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
  const header = page.locator('header');
  await expect(header).toBeVisible();
  expect(await header.evaluate((element) => getComputedStyle(element).position)).toBe('fixed');
  expect((await header.boundingBox())!.y).toBeGreaterThan(0);
  await expect(page.locator('img[src*="premium.webp"]')).toHaveCount(5);
});

test('reduced motion and no-JavaScript retain readable content', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3100/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Antes da obra, boas perguntas.' })).toBeVisible();
  const duration = await page
    .locator('header')
    .evaluate((element) => getComputedStyle(element).animationDuration);
  expect(parseFloat(duration)).toBeLessThan(0.01);
  await context.close();
});
