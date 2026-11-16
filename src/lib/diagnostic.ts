// Moteur du diagnostic de compétences : sélection des questions, score et recommandations.
// Aucune dépendance au navigateur : ce module est testable seul (voir scripts/test-diagnostic.ts).

export type Palier = 'essentiel' | 'collaboratif' | 'performance';
export type Outils = 'microsoft' | 'google' | 'les-deux' | 'inconnu';
export type Objectif = 'temps' | 'fiabilite' | 'collaboration' | 'ia' | 'aucun';

export interface Question {
  id: string;
  niveau: number;
  question: string;
  choix: string[];
  reponse: number;
  explication?: string;
}

export interface Domaine {
  domaine: string;
  titre: string;
  palier: Palier;
  outils: 'tous' | 'microsoft' | 'google';
  modules: string[];
  questions: Question[];
}

export interface Module {
  code: string;
  titre: string;
  duree: string;
  objectif?: string;
  palier: Palier;
}

export interface Parcours {
  id: string;
  titre: string;
  modules: string[];
  duree: string;
}

export interface Profil {
  metier: string; // identifiant de parcours ou « autre »
  outils: Outils;
  objectif: Objectif;
  equipe: string;
}

export interface Historique {
  /** Questions du dernier test : jamais reprises au test suivant. */
  dernier: string[];
  /** Nombre d'apparitions de chaque question, pour faire tourner toute la banque. */
  vues: Record<string, number>;
  tests: number;
}

export interface QuestionTiree extends Question {
  domaine: string;
  domaineTitre: string;
  palier: Palier;
  /** Ordre d'affichage des choix (indices dans question.choix). */
  ordre: number[];
}

export const NB_QUESTIONS = 15;
const MAX_PAR_DOMAINE = 3;

const OBJECTIF_DOMAINES: Record<Objectif, string[]> = {
  temps: ['automatisation', 'excel-avance', 'ia-usage', 'outlook'],
  fiabilite: ['excel-base', 'excel-gestion', 'powerbi', 'excel-avance'],
  collaboration: ['m365', 'google', 'organisation', 'formulaires'],
  ia: ['ia-usage', 'ia-securite'],
  aucun: []
};

/** Générateur pseudo-aléatoire reproductible (utile pour les tests). */
export function rngFromSeed(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function melanger<T>(liste: T[], rng: () => number): T[] {
  const a = [...liste];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function domainesPertinents(domaines: Domaine[], outils: Outils): Domaine[] {
  return domaines.filter((d) => {
    if (d.outils === 'tous') return true;
    if (outils === 'les-deux' || outils === 'inconnu') return true;
    return d.outils === outils;
  });
}

/** Domaines à approfondir selon le métier (modules du parcours) et l'objectif déclaré. */
export function domainesPrioritaires(domaines: Domaine[], profil: Profil, parcours: Parcours[]): string[] {
  const p = parcours.find((x) => x.id === profil.metier);
  const parModule = p ? domaines.filter((d) => d.modules.some((m) => p.modules.includes(m))).map((d) => d.domaine) : [];
  return [...new Set([...OBJECTIF_DOMAINES[profil.objectif], ...parModule])].filter((id) => domaines.some((d) => d.domaine === id));
}

/** Répartit le nombre de questions entre les domaines : une chacun, le reste aux domaines prioritaires. */
export function repartir(domaines: Domaine[], prioritaires: string[], total: number, rng: () => number): Map<string, number> {
  const quotas = new Map<string, number>();
  const ordre = [...prioritaires.filter((p) => domaines.some((d) => d.domaine === p)), ...melanger(domaines.map((d) => d.domaine).filter((d) => !prioritaires.includes(d)), rng)];
  const capacite = (id: string) => Math.min(MAX_PAR_DOMAINE, domaines.find((d) => d.domaine === id)!.questions.length);

  // Une question par domaine (dans la limite du total)
  for (const id of ordre.slice(0, total)) quotas.set(id, 1);
  let reste = total - quotas.size;

  // Le reste en tourniquet : prioritaires d'abord, puis les autres
  const tours = [ordre.filter((id) => prioritaires.includes(id)), ordre];
  for (const groupe of tours) {
    let progres = true;
    while (reste > 0 && progres) {
      progres = false;
      for (const id of groupe) {
        if (reste === 0) break;
        const q = quotas.get(id) ?? 0;
        if (q < capacite(id)) { quotas.set(id, q + 1); reste--; progres = true; }
      }
    }
  }
  return quotas;
}

/**
 * Tire les questions d'un test.
 * - jamais une question du test précédent (tant que la banque le permet) ;
 * - priorité aux questions les moins vues, pour parcourir toute la banque au fil des tests ;
 * - niveaux variés dans un même domaine ;
 * - questions classées du plus facile au plus difficile, choix mélangés.
 */
export function tirerQuestions(
  domaines: Domaine[],
  profil: Profil,
  parcours: Parcours[],
  historique: Historique,
  rng: () => number = Math.random,
  total = NB_QUESTIONS
): QuestionTiree[] {
  const pertinents = domainesPertinents(domaines, profil.outils);
  const quotas = repartir(pertinents, domainesPrioritaires(pertinents, profil, parcours), total, rng);
  const dernier = new Set(historique.dernier);
  const tirees: QuestionTiree[] = [];

  for (const d of pertinents) {
    const n = quotas.get(d.domaine) ?? 0;
    if (!n) continue;
    const candidates = melanger(d.questions, rng).sort((a, b) =>
      Number(dernier.has(a.id)) - Number(dernier.has(b.id)) || (historique.vues[a.id] ?? 0) - (historique.vues[b.id] ?? 0)
    );
    const choisies: Question[] = [];
    const niveaux = new Set<number>();
    // Premier passage : niveaux différents ; second passage : compléter si besoin
    for (const q of candidates) if (choisies.length < n && !niveaux.has(q.niveau) && !dernier.has(q.id)) { choisies.push(q); niveaux.add(q.niveau); }
    for (const q of candidates) if (choisies.length < n && !choisies.includes(q)) choisies.push(q);

    for (const q of choisies) {
      tirees.push({ ...q, domaine: d.domaine, domaineTitre: d.titre, palier: d.palier, ordre: melanger(q.choix.map((_, i) => i), rng) });
    }
  }
  return melanger(tirees, rng).sort((a, b) => a.niveau - b.niveau);
}

export function majHistorique(h: Historique, questions: QuestionTiree[]): Historique {
  const vues = { ...h.vues };
  for (const q of questions) vues[q.id] = (vues[q.id] ?? 0) + 1;
  return { dernier: questions.map((q) => q.id), vues, tests: h.tests + 1 };
}

export const historiqueVide = (): Historique => ({ dernier: [], vues: {}, tests: 0 });

// ---------------------------------------------------------------------------
// Score
// ---------------------------------------------------------------------------

/** Réponse donnée : indice du choix dans question.choix, ou null pour « Je ne sais pas ». */
export type Reponse = number | null;

export interface ScoreDomaine {
  domaine: string;
  titre: string;
  palier: Palier;
  modules: string[];
  bonnes: number;
  total: number;
  /** Score pondéré par la difficulté, entre 0 et 1. */
  taux: number;
}

export interface Resultat {
  global: number; // 0 à 100
  niveau: 'Débutant' | 'Intermédiaire' | 'Confirmé' | 'Avancé';
  paliers: Record<Palier, { taux: number; total: number }>;
  domaines: ScoreDomaine[];
}

export function niveauGlobal(score: number): Resultat['niveau'] {
  if (score < 40) return 'Débutant';
  if (score < 65) return 'Intermédiaire';
  if (score < 85) return 'Confirmé';
  return 'Avancé';
}

export function calculerScore(questions: QuestionTiree[], reponses: Reponse[], domaines: Domaine[]): Resultat {
  const parDomaine = new Map<string, { pts: number; max: number; bonnes: number; total: number }>();
  const parPalier: Record<Palier, { pts: number; max: number; total: number }> = {
    essentiel: { pts: 0, max: 0, total: 0 },
    collaboratif: { pts: 0, max: 0, total: 0 },
    performance: { pts: 0, max: 0, total: 0 }
  };
  let pts = 0;
  let max = 0;

  questions.forEach((q, i) => {
    const ok = reponses[i] === q.reponse;
    const poids = q.niveau;
    const d = parDomaine.get(q.domaine) ?? { pts: 0, max: 0, bonnes: 0, total: 0 };
    d.max += poids; d.total += 1;
    if (ok) { d.pts += poids; d.bonnes += 1; }
    parDomaine.set(q.domaine, d);
    parPalier[q.palier].max += poids; parPalier[q.palier].total += 1;
    if (ok) parPalier[q.palier].pts += poids;
    max += poids;
    if (ok) pts += poids;
  });

  const global = max ? Math.round((pts / max) * 100) : 0;
  const domainesScores: ScoreDomaine[] = [...parDomaine.entries()].map(([id, s]) => {
    const d = domaines.find((x) => x.domaine === id)!;
    return { domaine: id, titre: d.titre, palier: d.palier, modules: d.modules, bonnes: s.bonnes, total: s.total, taux: s.max ? s.pts / s.max : 0 };
  });
  const ordrePalier: Palier[] = ['essentiel', 'collaboratif', 'performance'];
  domainesScores.sort((a, b) => ordrePalier.indexOf(a.palier) - ordrePalier.indexOf(b.palier) || a.taux - b.taux);

  return {
    global,
    niveau: niveauGlobal(global),
    paliers: Object.fromEntries(ordrePalier.map((p) => [p, { taux: parPalier[p].max ? parPalier[p].pts / parPalier[p].max : 0, total: parPalier[p].total }])) as Resultat['paliers'],
    domaines: domainesScores
  };
}

// ---------------------------------------------------------------------------
// Recommandations
// ---------------------------------------------------------------------------

export interface Recommandation extends Module {
  raison: string;
  priorite: 'prioritaire' | 'utile' | 'approfondir';
}

export interface Programme {
  modules: Recommandation[];
  jours: number;
  parcours?: Parcours;
}

export function dureeEnJours(duree: string): number {
  const m = duree.replace(',', '.').match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : 0;
}

/**
 * Équivalent d'un module selon les outils de l'entreprise (catalogue : E6 reprend E1, E3 et E4
 * pour Google ; C3 reprend C1 et C2). Renvoie null si le module n'a pas de sens pour ces outils.
 */
export function adapterModule(code: string, outils: Outils): string | null {
  if (outils === 'google') {
    const google: Record<string, string | null> = { E1: 'E6', E3: 'E6', E4: 'E6', E5: 'C3', C1: 'C3', C2: 'C3', P4: null, P6: null };
    return code in google ? google[code] : code;
  }
  if (outils === 'microsoft') {
    const microsoft: Record<string, string | null> = { E6: null, C3: null };
    return code in microsoft ? microsoft[code] : code;
  }
  return code;
}

export const SEUIL_LACUNE = 0.6;
export const SEUIL_MAITRISE = 0.85;

export function recommander(resultat: Resultat, profil: Profil, modules: Module[], parcours: Parcours[], max = 6): Programme {
  const choisis = new Map<string, Recommandation>();
  const metier = parcours.find((p) => p.id === profil.metier);
  const dansParcours = (code: string) => metier?.modules.includes(code) ?? false;
  const ajouter = (codeCatalogue: string, raison: string, priorite: Recommandation['priorite']) => {
    const code = adapterModule(codeCatalogue, profil.outils);
    if (!code) return;
    const m = modules.find((x) => x.code === code);
    if (m && !choisis.has(code)) choisis.set(code, { ...m, raison, priorite });
  };

  // 1. Lacunes : les domaines les plus faibles d'abord, ceux du métier en tête
  const faibles = resultat.domaines
    .filter((d) => d.taux < SEUIL_LACUNE)
    .sort((a, b) => Number(b.modules.some(dansParcours)) - Number(a.modules.some(dansParcours)) || a.taux - b.taux);
  for (const d of faibles) {
    for (const code of d.modules) {
      ajouter(code, `${d.bonnes} bonne${d.bonnes > 1 ? 's' : ''} réponse${d.bonnes > 1 ? 's' : ''} sur ${d.total} en « ${d.titre} »`, dansParcours(code) ? 'prioritaire' : 'utile');
    }
  }

  // 2. Modules du parcours métier pas encore maîtrisés
  if (metier) {
    for (const code of metier.modules) {
      const d = resultat.domaines.find((x) => x.modules.includes(code));
      if (!d || d.taux < SEUIL_MAITRISE) ajouter(code, `Au programme du parcours « ${metier.titre} »`, 'approfondir');
    }
  }

  // 3. Bon niveau partout : proposer l'étape suivante, la data et l'automatisation
  if (choisis.size === 0) {
    for (const code of ['P2', 'P5', 'P6', 'P4']) {
      ajouter(code, 'Vous maîtrisez les bases : de quoi passer au niveau supérieur', 'approfondir');
    }
  }

  const ordrePriorite = { prioritaire: 0, utile: 1, approfondir: 2 };
  const ordrePalier = { essentiel: 0, collaboratif: 1, performance: 2 };
  const liste = [...choisis.values()]
    .sort((a, b) => ordrePriorite[a.priorite] - ordrePriorite[b.priorite] || ordrePalier[a.palier] - ordrePalier[b.palier])
    .slice(0, max)
    .sort((a, b) => ordrePalier[a.palier] - ordrePalier[b.palier] || a.code.localeCompare(b.code));

  // Parcours le plus proche : celui du métier, sinon celui qui couvre le plus de modules recommandés
  const codes = liste.map((m) => m.code);
  const proche = metier ?? [...parcours].sort((a, b) => b.modules.filter((m) => codes.includes(m)).length - a.modules.filter((m) => codes.includes(m)).length)[0];

  return {
    modules: liste,
    jours: liste.reduce((n, m) => n + dureeEnJours(m.duree), 0),
    parcours: proche && proche.modules.some((m) => codes.includes(m)) ? proche : undefined
  };
}
