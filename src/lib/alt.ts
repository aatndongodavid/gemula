// Texte alternatif lisible pour une capture d'écran de galerie, déduit du nom de fichier.
const labels: Record<string, string> = {
  dashboard: 'le tableau de bord',
  crm: 'le module de gestion de la relation client (CRM)',
  facturation: 'le module de facturation',
  analytique: "le module d'analytique prédictive",
  stock: 'la gestion des stocks',
  'pineapple-fonctions': 'les fonctions de l\'application (élections, annonces, covoiturage, marché, messagerie, cours et annales)',
  'pineapple-covoiturage': 'le covoiturage étudiant pour partager la course et diviser le prix du taxi'
};

export function galleryAlt(src: string, title: string, index: number): string {
  const name = src.split('/').pop()?.replace(/\.[a-z]+$/i, '').toLowerCase() ?? '';
  const label = labels[name];
  if (!label) return `Capture d'écran ${index + 1} de ${title}`;
  return name.startsWith('pineapple') ? `Visuel de présentation de ${title} : ${label}` : `Capture d'écran de ${title} : ${label}`;
}
