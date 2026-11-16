# Diagnostic en ligne : ajouter ou modifier des questions

Le test se trouve sur **/diagnostic**. Les questions sont rangées par domaine, un fichier par domaine :

```
src/content/diagnostic/
  excel-base.json      E1  Excel : les fondamentaux
  excel-gestion.json   E2  Excel pour la gestion et le reporting
  word.json            E3
  powerpoint.json      E4
  outlook.json         E5
  google.json          E6, C3 (posé seulement aux entreprises sous Google)
  m365.json            C1, C2 (posé seulement aux entreprises sous Microsoft)
  formulaires.json     C4
  organisation.json    C5
  ia-usage.json        P1, P2
  ia-securite.json     P3
  excel-avance.json    P4
  powerbi.json         P5
  automatisation.json  P6
```

## Ajouter une question

Ouvrez le fichier du domaine et ajoutez un objet dans la liste `questions` :

```json
{
  "id": "xlb-09",
  "niveau": 2,
  "question": "Quelle fonction renvoie la plus grande valeur d'une plage ?",
  "choix": ["=MAX(A1:A10)", "=GRAND(A1:A10)", "=SOMME(A1:A10)", "=HAUT(A1:A10)"],
  "reponse": 0,
  "explication": "MAX renvoie la valeur la plus élevée d'une plage."
}
```

- `id` : unique sur tout le site, en minuscules, chiffres et tirets.
- `niveau` : 1 (bases), 2 (pratique) ou 3 (avancé). Une bonne réponse de niveau 3 compte trois fois plus qu'une de niveau 1.
- `choix` : 2 à 5 réponses. Elles sont mélangées à l'affichage ; « Je ne sais pas » est ajouté automatiquement.
- `reponse` : position de la bonne réponse dans `choix`, **en partant de 0** (0 = premier choix).
- `explication` : facultative, affichée dans « Revoir mes réponses ».

## Ajouter un domaine

Créez un nouveau fichier sur le même modèle, avec `domaine`, `titre`, `palier` (`essentiel`, `collaboratif` ou `performance`), `outils` (`tous`, `microsoft` ou `google`) et `modules` (codes du catalogue, présents dans `src/data/formations.json`).

## Contrôles automatiques

- La compilation (`npm run build`) refuse une question mal formée, un identifiant en double ou un module absent du catalogue : le site en ligne n'est jamais cassé par une erreur de saisie.
- `npx tsx scripts/test-diagnostic.ts` simule des centaines de tests et vérifie qu'un visiteur ne retombe jamais sur une question du test précédent.

## Comment les questions sont tirées

- 15 questions par test, au moins une par domaine utile à l'entreprise ; les questions restantes vont aux domaines liés au métier et à l'objectif choisis.
- Aucune question du test précédent n'est reprise ; les questions les moins vues passent en priorité, ce qui fait tourner toute la banque.
- Plus la banque est grande, plus les tests sont variés : viser au moins 6 questions par domaine.
