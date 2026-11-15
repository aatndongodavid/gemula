# Refonte du site Gemula (novembre 2026)

## Ce qui change

- Nouvelle page `/formations` : catalogue de 17 modules en trois paliers, sept parcours par métier, formats, références, formateurs, questions fréquentes et contact.
- Ancres utilisables dans les messages LinkedIn : `/formations#parcours-finance`, `#parcours-rh`, `#parcours-commercial`, `#parcours-assistanat`, `#parcours-direction`, `#parcours-pme`, `#parcours-ong`, et un module précis avec `#e2`, `#p1`, etc.
- Le bouton « Demander ce parcours » ouvre `/collaborer` avec le formulaire prérempli.
- Catalogue PDF téléchargeable : `public/documents/catalogue-formations-gemula.pdf`.
- Nouveau design : fond blanc, orange réservé aux actions et au drapeau, coins sobres, plus d'animations décoratives. Pas d'emojis ni de tirets longs dans les textes.
- Polices Poppins et Inter hébergées sur le site (`public/fonts`). Les anciens fichiers de police vides ont été remplacés.
- Navigation : Formations, Expertise, Réalisations, Équipe, Journal, Communauté, bouton « Nous contacter ». L'agenda scientifique reste accessible depuis le pied de page.
- Téléphone et WhatsApp (+237 6 82 37 55 73) affichés dans le pied de page, la page Contact et la page Formations.
- Photos des membres affichées quand elles existent (David, Lydia, Faysal, Patrick).
- Corrections : extensions d'images en majuscules (`.PNG`) renommées en `.png`, images vides retirées, lien d'image cassé du journal corrigé, `apple-touch-icon.png` ajouté.

## Action à faire avant la mise en ligne

Dans le Google Form relié au formulaire « Collaborer », ajouter l'option **Formation des équipes** à la liste déroulante du type de demande. Sans cette option, Google ignore les demandes de formation envoyées depuis le site.

## Points à compléter plus tard

- Photos de Jeanne Chantal et de Kpoumie (`public/images/talents/`, puis champ `photo` dans leur fiche).
- Visuel de la formation Excel et Pareto de mai 2026 : le déposer dans `public/images/formations/` et renseigner le champ `image` de la première référence dans `src/data/formations.json`.
- Photos des articles du journal sans image (stage de Faysal, stage de Jeanne, certifications de Hamza).
- Lien de la page LinkedIn de Gemula dans `src/data/site.json` (le lien actuel est le profil de David).

## Modifier le contenu des formations

Tout le contenu (modules, parcours, formats, références, formateurs, FAQ) est dans `src/data/formations.json`. Le site se met à jour à la compilation.
