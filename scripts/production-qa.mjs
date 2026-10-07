import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.PRODUCTION_QA_URL ?? 'http://localhost:3101';
const home = await fetch(base);
assert.equal(home.status, 200);
assert.equal(home.headers.get('x-robots-tag'), null);
const html = await home.text();
assert.ok(!html.includes('noindex'));
assert.ok(!html.includes('Sorocaba'));
assert.ok(!html.includes('Prévia para aprovação'));
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes('Allow: /'));
assert.ok(!robots.includes('Disallow: /'));
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert.equal(urls.length, 24);
assert.equal(urls.filter((url) => url.includes('/solucoes/')).length, 12);
assert.equal(urls.filter((url) => url.includes('/guias/')).length, 3);
assert.ok(!urls.some((url) => url.includes('/obras/')));
for (const url of urls) {
  const response = await fetch(base + new URL(url).pathname);
  assert.equal(response.status, 200, url);
  assert.equal(response.headers.get('x-robots-tag'), null, url);
}
assert.equal((await fetch(`${base}/obras/quadra-externa-azul`)).status, 404);
await fs.writeFile(
  'qa/production-qa.json',
  JSON.stringify(
    {
      date: new Date().toISOString(),
      urls,
      indexable: true,
      unpublishedProjectsExcluded: true,
      passed: true,
    },
    null,
    2,
  ),
);
console.log('Production verified: 24 published URLs; indexing enabled; draft projects excluded.');
