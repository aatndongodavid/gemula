// Sessions de formation de Gemula Community (src/data/communaute.json).
// Le statut se calcule à partir des dates : rien à mettre à jour à la main.
import data from '@data/communaute.json';

export type Statut = 'ouverte' | 'en-cours' | 'terminee' | 'preparation';

export type Session = (typeof data.sessions)[number] & {
  debut?: string;
  jours?: number;
};

const JOUR = 24 * 60 * 60 * 1000;

export function bornes(s: Session): { debut: Date; fin: Date } | null {
  if (!s.debut) return null;
  const debut = new Date(`${s.debut}T00:00:00+01:00`); // heure de Douala
  const fin = new Date(debut.getTime() + (s.jours ?? 1) * JOUR - 1);
  return { debut, fin };
}

export function statut(s: Session, now = new Date()): Statut {
  const b = bornes(s);
  if (!b) return 'preparation';
  if (now < b.debut) return 'ouverte';
  if (now <= b.fin) return 'en-cours';
  return 'terminee';
}

export const libelleStatut: Record<Statut, string> = {
  ouverte: 'Inscriptions ouvertes',
  'en-cours': 'En cours',
  terminee: 'Session terminée',
  preparation: 'En préparation'
};

export function dateLongue(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Douala' })
    .format(new Date(`${iso}T12:00:00+01:00`));
}

export function sessions(now = new Date()) {
  const toutes = data.sessions as Session[];
  const avecStatut = toutes.map((s) => ({ ...s, statut: statut(s, now) }));
  return {
    /** La prochaine session à mettre en avant (ouverte ou en cours), s'il y en a une */
    vedette: avecStatut
      .filter((s) => s.statut === 'ouverte' || s.statut === 'en-cours')
      .sort((a, b) => (a.debut ?? '').localeCompare(b.debut ?? ''))[0],
    preparation: avecStatut.filter((s) => s.statut === 'preparation'),
    terminees: avecStatut.filter((s) => s.statut === 'terminee')
  };
}
