---
title: "Dataikos Atlas"
tagline: "La gestion opérationnelle complète des PME, en local, sans cloud."
category: software
featured: true
order: 1
year: 2026
problem: "Les PME camerounaises gèrent stocks, factures et clients dans des fichiers dispersés, sans vision consolidée et sans dépendre d'un service cloud coûteux ou instable."
context: "Atlas est né chez Gemula du constat que beaucoup d'entreprises locales ont besoin d'outils sérieux mais refusent la dépendance au cloud pour des raisons de coût, de connectivité et de confidentialité des données."
solution: "Une application desktop autonome, avec base SQLite embarquée, qui centralise stocks, facturation, CRM, analytique prédictive et rapports PDF. Aucune connexion internet requise pour fonctionner."
stack: ["Python", "SQLite", "ARIMA / SARIMAX", "IA générative", "Génération PDF"]
features:
  - "Gestion des stocks : mouvements, alertes, FIFO"
  - "Facturation et suivi des paiements"
  - "CRM : portefeuille clients"
  - "Analytique prédictive ARIMA / SARIMAX"
  - "Narration automatique des indicateurs métier par IA"
  - "Génération de rapports PDF"
role: "Conception, développement, design, tests et documentation par les membres de Gemula."
results: "Déployé auprès de PME pilotes à Douala. Réduit le temps de consolidation des indicateurs et fournit des prévisions de stock exploitables."
status: realise
links:
  demo: ""
  github: ""
cover: "/images/atlas/dashboard.png"
gallery:
  - "/images/atlas/stocks.png"
  - "/images/atlas/facturation.png"
  - "/images/atlas/crm.png"
---

## Pourquoi Atlas

La majorité des PME camerounaises pilotent encore leur activité avec des fichiers Excel dispersés, des cahiers papier et des logiciels métier cloisonnés. Résultat : pas de vision consolidée, prévisions approximatives, et dépendance à quelques personnes clés.

Les solutions SaaS existent, mais elles supposent une connexion stable, un abonnement mensuel, et une confiance totale dans un serveur distant.

Atlas prend le problème autrement : **un outil sérieux, complet, qui tient dans un ordinateur**.

## Ce que fait Atlas

Atlas centralise six fonctions essentielles dans une seule application :

1. **Stocks** — mouvements d'entrée/sortie, alertes de seuil, valorisation FIFO.
2. **Facturation** — émission, suivi des paiements, relances, statuts.
3. **CRM** — portefeuille clients, historique d'achat, segmentation simple.
4. **Analytique prédictive** — modèles ARIMA et SARIMAX pour anticiper les ventes et les besoins de réapprovisionnement.
5. **Narration IA** — les indicateurs métier sont traduits en phrases claires, exploitables par un dirigeant non technique.
6. **Rapports PDF** — exports prêts à partager avec un comptable, une banque ou un partenaire.

## Architecture

L'application repose sur une base SQLite embarquée. Toutes les données restent sur la machine de l'utilisateur. Aucune synchronisation cloud, aucune API externe obligatoire. La génération de rapports PDF est faite localement.

## Prochaines étapes

- Extension du module analytique à d'autres modèles (Prophet, modèles bayésiens).
- Export comptable normalisé (SYSCOHADA).
- Mode multi-postes sur réseau local.
- Accompagnement à la migration pour les PME intéressées.