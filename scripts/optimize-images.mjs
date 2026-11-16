// Optimise les images de public/images : conversion en WebP, largeur maximale 1600 px.
// Usage : node scripts/optimize-images.mjs
// Les fichiers d'origine (png, jpg, jpeg) sont remplacés par leur version .webp.
// Pensez ensuite à mettre à jour les chemins dans le contenu (le script affiche la liste).
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = 'public/images';
const SKIP_DIRS = new Set(['og', 'brand']); // images sociales et logo : formats spécifiques
const MAX_WIDTH = 1600;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(p);
    } else yield p;
  }
}

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const { size } = await stat(file);
  if (size < 100) { await unlink(file); console.log('supprimé (vide)', file); continue; }
  const out = file.slice(0, -ext.length) + '.webp';
  await sharp(file).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
  const after = (await stat(out)).size;
  await unlink(file);
  console.log(`${file} -> ${out}  ${(size / 1024).toFixed(0)} Ko -> ${(after / 1024).toFixed(0)} Ko`);
}
