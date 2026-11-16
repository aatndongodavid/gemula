# Diagnostic : points à trancher par les formateurs

Les 93 questions ont été relues le 16 novembre 2026 : réponses vérifiées, formulations précisées, mauvaises réponses rendues plausibles (pour qu'on ne trouve plus la bonne par élimination). Il reste quelques décisions qui relèvent de votre connaissance du terrain. Comptez environ 20 minutes.

## 1. Version d'Excel de vos clients

Quatre questions portent sur des fonctions récentes (Excel 365 et 2021), signalées dans leur énoncé :
`xlg-01` (RECHERCHEX, avec RECHERCHEV accepté), `xla-04` (UNIQUE), `xla-05` (FILTRE), `xla-06` (LET).

**À trancher :** si la plupart de vos clients sont sous Excel 2016 ou 2019, remplacer `xla-04` à `xla-06` par des questions sur des fonctions disponibles partout.

## 2. Points de vigilance sur le fond

| Question | Point à confirmer |
|---|---|
| `ias-05` | Référence de la loi : n° 2024/017 du 23 décembre 2024 (reprise du règlement intérieur). |
| `ias-04` | Responsabilité d'un email écrit avec l'IA : formulation pédagogique, pas juridique. |
| `org-01` | Convention de nommage AAAA-MM-JJ : c'est celle enseignée dans le module C5 ? |
| `ia-02` | Anatomie du prompt (rôle, contexte, tâche, format) : alignée sur le module P2 ? |
| `out-03`, `out-06` | Noms des fonctions Outlook (Assistant Planification, QuickParts) : identiques dans la version utilisée par vos clients ? |

## 3. Niveaux de difficulté

Chaque question a un niveau de 1 à 3, attribué sans données réelles. Une bonne réponse de niveau 3 compte trois fois plus qu'une de niveau 1.

**À faire après une trentaine de tests réels :** repérer les questions que presque tout le monde réussit (à passer au niveau 1 ou à durcir) et celles que presque personne ne réussit (à passer au niveau 3 ou à clarifier).

## 4. Seuils du résultat (dans `src/lib/diagnostic.ts`)

- Niveau global : Débutant sous 40, Intermédiaire sous 65, Confirmé sous 85, Avancé au-delà.
- Un domaine est « À travailler » sous 60 % et « Maîtrisé » à partir de 85 % ; les modules des domaines sous 60 % sont recommandés.

**À trancher :** ces seuils vous paraissent-ils justes par rapport à ce que vous observez en formation ?

## 5. Banque de questions

Les domaines les plus petits ont 6 questions. Pour des tests encore plus variés, viser 8 à 10 questions par domaine, en priorité Excel (`excel-base`, `excel-gestion`) et l'IA (`ia-usage`), les plus demandés. Mode d'emploi : `docs/diagnostic.md`.
