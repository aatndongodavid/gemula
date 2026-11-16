// Vérifie les liens internes (pages, ancres, fichiers) du site compilé dans dist/.
// Usage : npm run build && node scripts/check-links.mjs [--external]
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const pages = new Map(); // chemin -> { ids, html }

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}

const toRoute = (file) => '/' + file.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/\.html$/, '');

for await (const f of walk(DIST)) {
  if (!f.endsWith('.html')) continue;
  const html = await readFile(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(toRoute(f).replace(/\/$/, '') || '/', { ids, html });
}

const exists = async (p) => access(join(DIST, p)).then(() => true, () => false);
const problems = [];
const external = new Map();

for (const [route, { html }] of pages) {
  const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1].replace(/&amp;|&#38;/g, '&'));
  for (const ref of refs) {
    if (/^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      if (!ref.includes('gemula.org')) { if (!external.has(ref)) external.set(ref, route); continue; }
    }
    const url = new URL(ref, 'https://gemula.org' + (route === '/' ? '/' : route + '/'));
    if (url.hostname !== 'gemula.org') continue;
    const path = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
    const target = pages.get(path);
    if (!target) {
      if (!(await exists(path))) problems.push(`${route} -> ${ref} (introuvable)`);
      continue;
    }
    if (url.hash && url.hash.length > 1 && !target.ids.has(url.hash.slice(1))) {
      problems.push(`${route} -> ${ref} (ancre absente)`);
    }
  }
}

console.log(`${pages.size} pages analysées`);
if (problems.length) { console.log(`\n${problems.length} lien(s) interne(s) cassé(s) :`); [...new Set(problems)].forEach((p) => console.log('  ' + p)); }
else console.log('Aucun lien interne cassé.');

if (process.argv.includes('--external')) {
  console.log(`\nVérification de ${external.size} liens externes…`);
  for (const [url, from] of external) {
    try {
      let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(10000) });
      if (r.status >= 400) r = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(10000) });
      if (r.status >= 400) console.log(`  ${r.status}  ${url}  (depuis ${from})`);
    } catch (e) { console.log(`  ERREUR  ${url}  (depuis ${from}) ${e.cause?.code ?? e.message}`); }
  }
}
process.exitCode = problems.length ? 1 : 0;
