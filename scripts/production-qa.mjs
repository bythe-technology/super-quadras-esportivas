import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.PRODUCTION_QA_URL ?? 'http://localhost:3100';
const home = await fetch(base);
assert.equal(home.status, 200);
assert.equal(home.headers.get('x-robots-tag'), null);
const html = await home.text();
assert.ok(!html.includes('noindex'));
assert.ok(!html.includes('Sorocaba'));
assert.ok(!html.includes('Prévia para aprovação'));
const works = await (await fetch(`${base}/obras`)).text();
assert.ok(works.includes('Quadra externa · piso azul'));
assert.ok(works.includes('Quadra externa · verde e terracota'));
assert.ok(works.includes('Quadra verde · rede e linhas brancas'));
assert.ok(works.includes('Ginásio · piso laranja e marcações esportivas'));
assert.ok(works.includes('Campo gramado · fechamento e gol'));
assert.ok(works.includes('Quadra verde · rede, tabela e linhas'));
assert.ok(works.includes('Quadra verde · áreas vermelhas e linhas brancas'));
assert.ok(works.includes('Espaço esportivo · alambrado e área de terra'));
assert.ok(works.includes('Registro visual · Pisos esportivos'));
assert.ok(works.includes('Registro visual · Campos de futebol'));
assert.ok(works.includes('Registro visual · Quadras poliesportivas'));
for (const id of [
  'quadra-ginasio',
  'ig-campo-gramado',
  'ig-quadra-azul-multiesportiva',
  'ig-quadra-verde-terracota',
  'ig-quadra-verde-vermelha',
  'ig-quadra-verde-tenis',
  'ig-quadra-verde-multiesportiva',
  'ig-quadra-em-preparacao',
  'quadra-azul-exterior',
  'quadra-azul-coberta',
]) {
  const image = await fetch(`${base}/media/${id}.webp`);
  assert.equal(image.status, 200, `missing project image: ${id}`);
}
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
assert.equal((await fetch(`${base}/obras/quadra-azul-multiesportiva`)).status, 404);
await fs.writeFile(
  'qa/production-qa.json',
  JSON.stringify(
    {
      date: new Date().toISOString(),
      urls,
      indexable: true,
      photoRecordsPublishedWithoutCaseStudyPages: true,
      passed: true,
    },
    null,
    2,
  ),
);
console.log(
  'Production verified: 24 indexable URLs; 10 varied photo records visible, individual records excluded.',
);
