// Vérifie le moteur du diagnostic : npx tsx scripts/test-diagnostic.ts
import { readdirSync, readFileSync } from 'node:fs';
import * as D from '../src/lib/diagnostic';
import formations from '../src/data/formations.json' with { type: 'json' };

const domaines: D.Domaine[] = readdirSync('src/content/diagnostic').filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`src/content/diagnostic/${f}`, 'utf8')));
const modules: D.Module[] = formations.paliers.flatMap((p) => p.modules.map((m) => ({ ...m, palier: p.id as D.Palier })));
const parcours = formations.parcours as D.Parcours[];
let erreurs = 0;
const verifier = (ok: boolean, msg: string) => { if (!ok) { erreurs++; console.log('ÉCHEC :', msg); } };

const total = domaines.reduce((n, d) => n + d.questions.length, 0);
console.log(`${domaines.length} domaines, ${total} questions`);

// Tous les modules cités existent dans le catalogue
for (const d of domaines) for (const m of d.modules) verifier(modules.some((x) => x.code === m), `module ${m} inconnu (${d.domaine})`);

const rng = D.rngFromSeed(42);
for (const outils of ['microsoft', 'google', 'les-deux', 'inconnu'] as D.Outils[]) {
  for (const metier of [...parcours.map((p) => p.id), 'autre']) {
    let h = D.historiqueVide();
    let precedent: string[] = [];
    const vues = new Set<string>();
    for (let t = 0; t < 20; t++) {
      const profil: D.Profil = { metier, outils, objectif: (['temps', 'fiabilite', 'collaboration', 'ia', 'aucun'] as D.Objectif[])[t % 5], equipe: '6-12' };
      const qs = D.tirerQuestions(domaines, profil, parcours, h, rng);
      const ids = qs.map((q) => q.id);
      verifier(qs.length === D.NB_QUESTIONS, `${outils}/${metier} : ${qs.length} questions`);
      verifier(new Set(ids).size === ids.length, `${outils}/${metier} : doublon dans un test`);
      verifier(!ids.some((id) => precedent.includes(id)), `${outils}/${metier} test ${t} : question reprise du test précédent`);
      if (outils === 'google') verifier(!qs.some((q) => ['word', 'powerpoint', 'outlook', 'm365', 'excel-avance', 'automatisation'].includes(q.domaine)), 'question Microsoft pour un profil Google');
      if (outils === 'microsoft') verifier(!qs.some((q) => q.domaine === 'google'), 'question Google pour un profil Microsoft');
      for (const q of qs) verifier([...q.ordre].sort().join() === q.choix.map((_, i) => i).join(), 'ordre des choix invalide');
      for (let i = 1; i < qs.length; i++) verifier(qs[i - 1].niveau <= qs[i].niveau, 'questions non classées par difficulté');
      ids.forEach((id) => vues.add(id));
      precedent = ids;
      h = D.majHistorique(h, qs);

      // Score et recommandations sur des réponses aléatoires
      const rep = qs.map((q) => (rng() < 0.5 ? q.reponse : rng() < 0.5 ? null : (q.reponse + 1) % q.choix.length));
      const r = D.calculerScore(qs, rep, domaines);
      verifier(r.global >= 0 && r.global <= 100, 'score hors bornes');
      const prog = D.recommander(r, profil, modules, parcours);
      verifier(prog.modules.length > 0, `${outils}/${metier} : aucune recommandation`);
      if (outils === 'google') verifier(!prog.modules.some((m) => ['C1', 'C2'].includes(m.code)), 'module Microsoft 365 recommandé à un profil Google');
    }
    const pertinentes = D.domainesPertinents(domaines, outils).reduce((n, d) => n + d.questions.length, 0);
    if (metier === 'autre') console.log(`  ${outils.padEnd(9)} : ${vues.size}/${pertinentes} questions vues en 20 tests`);
  }
}

// Cas limites
const parfait = (qs: D.QuestionTiree[]) => qs.map((q) => q.reponse);
const p: D.Profil = { metier: 'finance', outils: 'microsoft', objectif: 'aucun', equipe: '1' };
const qs = D.tirerQuestions(domaines, p, parcours, D.historiqueVide(), rng);
const top = D.calculerScore(qs, parfait(qs), domaines);
verifier(top.global === 100 && top.niveau === 'Avancé', 'un sans-faute doit donner 100 et Avancé');
verifier(D.recommander(top, p, modules, parcours).modules.length > 0, 'sans-faute : il faut quand même proposer un approfondissement');
const zero = D.calculerScore(qs, qs.map(() => null), domaines);
verifier(zero.global === 0 && zero.niveau === 'Débutant', 'aucune réponse doit donner 0');
const progZero = D.recommander(zero, p, modules, parcours);
console.log('  Exemple, profil finance sans aucune réponse :', progZero.modules.map((m) => `${m.code} (${m.priorite})`).join(', '), `· ${progZero.jours} jours · parcours ${progZero.parcours?.titre}`);

console.log(erreurs ? `\n${erreurs} échec(s)` : '\nTous les contrôles sont passés.');
process.exitCode = erreurs ? 1 : 0;
