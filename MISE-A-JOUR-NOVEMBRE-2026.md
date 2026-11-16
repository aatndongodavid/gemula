# Refonte v3 du site Gemula (16 novembre 2026)

## Nouveau design

- Thème sombre inspiré des sites produit (fond quasi noir, lignes fines, titres en dégradé, halo orange).
- Nouvelle couleur de marque reprise du logo : orange `#FF5000`. Toutes les couleurs sont dans `tailwind.config.mjs`, nommées par rôle (`bg`, `surface`, `line`, `fg`, `muted`, `accent`).
- Logo : le drapeau à damier qui ondule est dessiné en SVG (`src/lib/flag.ts`), ce qui permet de l'animer.
- Intro animée au premier chargement de l'accueil (une fois par session, désactivée si le visiteur limite les animations, clic pour passer).
- Page d'accueil réécrite : équipe en photo, chiffres clés, trois portes d'entrée (formations, solutions, communauté), sections Formations et Gemula Community mises en avant, appel à l'action double (entreprises / étudiants).
- Page Communauté réécrite d'après le document de cadrage : quatre espaces, formations gratuites (accès libre ou sur inscription), programmes en préparation, rôles, charte, deux parcours distincts.
- Icônes Google remplacées par des icônes SVG intégrées : plus aucune requête vers un service externe au chargement.

## Conformité et référencement

- Nouvelles pages : `/confidentialite`, `/conditions`, `/mentions-legales` (liens dans le pied de page).
- Bandeau de consentement aux cookies. La mesure d'audience (Google Analytics 4) ne se charge qu'après accord. Lien « Gérer les cookies » dans le pied de page.
- Titres et descriptions meta revus sur toutes les pages, image d'aperçu 1200 x 630 (`public/images/og/gemula-og.jpg`) avec texte alternatif.
- Favicon (SVG, ICO, icônes 180, 192 et 512 px) et manifeste.
- Sitemap automatique sans la page 404, `robots.txt` simplifié.
- Page 404 personnalisée, servie par `public/.htaccess` (`ErrorDocument 404`).
- `.htaccess` : redirection HTTPS, compression, cache navigateur, en-têtes de sécurité, redirection des anciennes images PNG/JPG vers WebP.

## Qualité

- Images converties en WebP (de 6 Mo à moins de 1 Mo au total). Pour de nouvelles images : `npm run images`.
- Textes alternatifs sur toutes les images, y compris les captures de la galerie Atlas.
- Contrastes vérifiés avec axe-core (WCAG AA) : aucun problème sur les pages principales.
- Liens internes et ancres vérifiés : `npm run build && npm run check:links`.
- Adapté au mobile : aucun défilement horizontal à 390 px, zones tactiles de 44 px minimum.
- Formulaires : validation champ par champ avec messages clairs, case de consentement, anti-spam (champ piège invisible, délai minimal de 3 s, un envoi par minute, filtre de liens).

## À faire de votre côté

1. **Mesure d'audience** : créer une propriété Google Analytics 4, puis coller l'identifiant (`G-XXXXXXXXXX`) dans `src/data/site.json`, champ `analytics.ga4Id`. Tant qu'il est vide, aucun script de mesure n'est chargé.
2. **Google Form** : la liste « type de demande » doit contenir les valeurs **Formation des équipes** et **Gemula Community**, sinon ces envois sont ignorés.
3. **Pages légales** : relire les textes (durées de conservation, adresse de l'hébergeur LWS) et les faire valider si possible par un juriste.
4. **Liens externes** : les sites des événements et profils n'ont pas pu être testés depuis l'environnement de travail ; les vérifier une fois le site en ligne.

---

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
