// Statut d'un événement de l'agenda, calculé à partir de ses dates.
// Le champ « status » du fichier ne sert plus qu'à signaler un événement annulé ou reporté.

export type StatutEvenement = 'a-venir' | 'en-cours' | 'passe' | 'annule' | 'reporte';

interface Dates {
  startDate: Date;
  endDate?: Date | null;
  status?: string;
}

const FIN_DE_JOURNEE = 24 * 60 * 60 * 1000 - 1;

export function statutEvenement(e: Dates, now = new Date()): StatutEvenement {
  if (e.status === 'annule' || e.status === 'reporte') return e.status;
  const debut = e.startDate.getTime();
  const fin = (e.endDate ?? e.startDate).getTime() + FIN_DE_JOURNEE;
  if (now.getTime() < debut) return 'a-venir';
  if (now.getTime() <= fin) return 'en-cours';
  return 'passe';
}

export const libelleStatutEvenement: Record<StatutEvenement, string> = {
  'a-venir': 'À venir',
  'en-cours': 'En cours',
  passe: 'Passé',
  annule: 'Annulé',
  reporte: 'Reporté'
};

export const couleurStatutEvenement: Record<StatutEvenement, string> = {
  'a-venir': 'text-accent-text',
  'en-cours': 'text-success',
  passe: 'text-muted',
  annule: 'text-danger',
  reporte: 'text-danger'
};

export const schemaStatutEvenement: Record<StatutEvenement, string> = {
  'a-venir': 'https://schema.org/EventScheduled',
  'en-cours': 'https://schema.org/EventScheduled',
  passe: 'https://schema.org/EventScheduled',
  annule: 'https://schema.org/EventCancelled',
  reporte: 'https://schema.org/EventPostponed'
};
