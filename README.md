# Gemula : Là où le talent devient un impact

[![Gemula](https://img.shields.io/badge/Gemula-Collectif%20%C3%A9tudiant-orange?style=flat-square)](https://gemula.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Gemula** est un collectif étudiant basé à Douala (Cameroun) qui réunit des talents passionnés par la **Data**, l'**Intelligence Artificielle**, le **développement web**, le **design** et l'**innovation**. Notre mission : créer un espace où les idées se transforment en projets concrets et porteurs de sens.

---

## Projets phares

| Projet | Description | Technologies |
|--------|-------------|--------------|
| **Dames game rl** | Jeu de Dames avec IA utilisant un Deep Q-Network (PyQt5 + Pygame) | Python, PyQt5, Pygame, TensorFlow |
| **Gemula_Mailer** | Plateforme d'envoi personnalisé de messages en masse | Python, Fast_API, SMTP |
| **Gemula_learn** | Outil d'analyse stratégique pour transformer une idée en dossier bancable | HTML, CSS, JavaScript |
| **Gemula_Atlas** | ERP complet avec analytique prédictive (ARIMA/SARIMAX) et narration IA | Python, scikit-learn, Numpy, SQLite, Pandas, Matplotlib |
| **SOCOOCA_PK** | Traçabilité et performance durable pour les producteurs de cacao et d'huile de palme | Python, scikit-learn, Numpy, SQLite, Pandas, Matplotlib,PyQT6, Web3 |
| **Projet_eneo** | Aide à la décision pour le réseau électrique camerounais | Python, Data Science, Optimisation |

---

## Équipe

| Membre | Rôle |
|--------|------|
| **KWARISSA Lada Lydia** | Data Analyst & Excel Avancé |
| **Garga Ali Faysal** | Data Analyst |
| **Kpoumie Amza** | Développeur Web & Power BI |
| **EBA Ngolong Jeanne Chantal** | Développeur Mobile & Data Scientist |
| **Mbonjo Etia Patrick Thomas** | AI Solutions & Data Engineer |
| **Aat Ndongo David Meilleur** | Lead Founder |
| **MANGUELLE MAKON Cathia Lucie** | Électrotechnicienne |
| **BAGNEKI OKALA Fortuna Valery** | Électrotechnicienne |

---

## Design & identité

- **Palette de couleurs** : Orange impact (#F5791C), noir profond (#1B1B1B), blanc pur, gris élégants.
- **Style visuel** : Épuré, moderne, sans flou inutile. Cartes avec ombres douces et transitions fluides.
- **Typographie** : Poppins pour les titres, Inter pour le corps de texte.
- **Effets** : Animations au scroll, particules dynamiques (tsParticles), drapeau clignotant (checkerboard).

---

## Stack technique

### Front-end
- HTML5 sémantique
- CSS3 (variables, grid, flexbox, animations)
- JavaScript vanilla (ES6)
- [tsParticles](https://github.com/matteobruni/tsparticles) pour les particules d'arrière-plan
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/) (optionnel, désactivé pour des raisons de fluidité)

### SEO & performance
- Balises méta complètes (Open Graph, Twitter Cards)
- Données structurées JSON-LD (Organisation, WebSite, ItemList pour projets et membres)
- Balise canonical
- Fichiers `robots.txt` et `sitemap.xml` prêts

### Déploiement
- Hébergement statique (Netlify, Vercel, GitHub Pages, ou serveur traditionnel)
- Aucune dépendance back-end requise

---

## Structure du projet

```
/
├── index.html            # Page principale (toutes les sections)
├── css/
│   └── style.css         # Styles complets
├── js/
│   └── main.js           # JavaScript (loader, nav, scroll, filtres, etc.)
├── assets/
│   ├── favicon.svg
│   ├── og-image.jpg      # (à personnaliser)
│   └── apple-touch-icon.png
├── robots.txt            # Instructions pour les moteurs de recherche
├── sitemap.xml           # Plan du site
└── README.md             # Ce fichier
```

---

## Installation & développement

1. **Cloner le dépôt**

```bash
git clone https://github.com/votre-username/gemula.git
cd gemula
```

2. **Ouvrir le projet**

Il suffit d'ouvrir `index.html` dans votre navigateur préféré. Aucun serveur ni build n'est nécessaire (site 100% statique).

```bash
# Avec Python (optionnel, pour un serveur local)
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

3. **Personnalisation**

- Modifiez le contenu des sections dans `index.html`.
- Ajustez les couleurs, polices et espacements dans `style.css`.
- Mettez à jour les liens LinkedIn et Portfolio des membres dans la section `#talent`.
- Remplacez l'image OG (`assets/og-image.jpg`) par une image de votre choix.

4. **Déploiement**

Déployez simplement le dossier racine sur n'importe quel hébergeur statique :

```bash
# Exemple avec Netlify CLI
netlify deploy --prod --dir=.
```

---

## Contribution

Les contributions sont les bienvenues ! Voici comment nous pouvons collaborer :

1. **Fork** le projet.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`).
3. **Commit** vos changements (`git commit -m 'Ajout de ma fonctionnalité'`).
4. **Push** vers la branche (`git push origin feature/ma-fonctionnalite`).
5. Ouvrez une **Pull Request**.

Respectez le style de code existant et assurez-vous que le site reste fonctionnel sur tous les navigateurs modernes.

---

## Licence

Ce projet est sous licence **MIT** — voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## Contact

- **Email** : [meilleurd2001@gmail.com](mailto:meilleurd2001@gmail.com)
- **LinkedIn** : [David Meilleur Aat Ndongo](https://www.linkedin.com/in/david-meilleur-aat-ndongo)
- **Site** : [https://gemula.com](https://gemula.org)

---

## 🙏Remerciements

Un grand merci à tous les membres de Gemula pour leur énergie, leur créativité et leur engagement au quotidien.  
« Là où le talent devient un impact. »
