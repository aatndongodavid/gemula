@echo off
setlocal enabledelayedexpansion

echo Creation de la structure du projet Gemula...

:: Structure des dossiers
mkdir gemula\.github\workflows
mkdir gemula\public\images\atlas
mkdir gemula\public\images\talents
mkdir gemula\public\images\projets
mkdir gemula\public\images\journal
mkdir gemula\public\images\og
mkdir gemula\public\fonts

mkdir gemula\src\data
mkdir gemula\src\content\projets
mkdir gemula\src\content\evenements
mkdir gemula\src\content\talents
mkdir gemula\src\content\journal
mkdir gemula\src\components
mkdir gemula\src\layouts
mkdir gemula\src\pages\projets
mkdir gemula\src\pages\evenements
mkdir gemula\src\pages\talents
mkdir gemula\src\pages\journal
mkdir gemula\src\styles

:: Fichiers racine et configuration
cd gemula
type nul > .github\workflows\deploy.yml
type nul > astro.config.mjs
type nul > tailwind.config.mjs
type nul > tsconfig.json
type nul > package.json
type nul > package-lock.json
type nul > README.md

:: Fichiers public/
type nul > public\.htaccess
type nul > public\favicon.svg
type nul > public\robots.txt
type nul > public\site.webmanifest

type nul > public\images\atlas\dashboard.png
type nul > public\images\atlas\stocks.png
type nul > public\images\atlas\facturation.png
type nul > public\images\atlas\crm.png
type nul > public\images\atlas\analytique.png
type nul > public\images\atlas\rapports-pdf.png

type nul > public\images\talents\david.jpg
type nul > public\images\talents\membre-02.jpg
type nul > public\images\talents\membre-03.jpg
type nul > public\images\talents\membre-04.jpg
type nul > public\images\talents\membre-05.jpg
type nul > public\images\talents\membre-06.jpg

type nul > public\images\projets\mapebe.png
type nul > public\images\projets\gemula-learn.png
type nul > public\images\projets\gemula-mailer.png
type nul > public\images\projets\socooca-pk.png
type nul > public\images\projets\projet-eneo.png

type nul > public\images\journal\article-01.jpg
type nul > public\images\journal\article-02.jpg
type nul > public\images\journal\article-03.jpg
type nul > public\images\journal\article-04.jpg
type nul > public\images\journal\article-05.jpg

type nul > public\images\og\gemula-og.png

type nul > public\fonts\Inter-Regular.woff2
type nul > public\fonts\Inter-Medium.woff2
type nul > public\fonts\Inter-SemiBold.woff2
type nul > public\fonts\Inter-Bold.woff2
type nul > public\fonts\SpaceGrotesk-Regular.woff2
type nul > public\fonts\SpaceGrotesk-Medium.woff2
type nul > public\fonts\SpaceGrotesk-SemiBold.woff2
type nul > public\fonts\SpaceGrotesk-Bold.woff2

:: Fichiers src/data/
type nul > src\data\site.json
type nul > src\data\expertise.json

:: Fichiers src/content/
type nul > src\content\config.ts

type nul > src\content\projets\atlas.md
type nul > src\content\projets\mapebe.md
type nul > src\content\projets\gemula-learn.md
type nul > src\content\projets\gemula-mailer.md
type nul > src\content\projets\socooca-pk.md
type nul > src\content\projets\projet-eneo.md

type nul > src\content\evenements\icammlai-2026.md
type nul > src\content\evenements\icbmeda-2026.md
type nul > src\content\evenements\icslmli-2026.md
type nul > src\content\evenements\iccids-2026.md
type nul > src\content\evenements\indabax-cameroon-2026.md
type nul > src\content\evenements\sia-minresi-2026.md

type nul > src\content\talents\david.md
type nul > src\content\talents\membre-02.md
type nul > src\content\talents\membre-03.md
type nul > src\content\talents\membre-04.md
type nul > src\content\talents\membre-05.md
type nul > src\content\talents\membre-06.md

type nul > src\content\journal\premier-article.md
type nul > src\content\journal\article-02.md
type nul > src\content\journal\article-03.md
type nul > src\content\journal\article-04.md
type nul > src\content\journal\article-05.md

:: Fichiers src/components/
type nul > src\components\Nav.astro
type nul > src\components\Footer.astro
type nul > src\components\SEO.astro
type nul > src\components\Flag.astro
type nul > src\components\Hero.astro
type nul > src\components\SectionHeading.astro
type nul > src\components\ExpertiseCard.astro
type nul > src\components\ProjectCard.astro
type nul > src\components\EventCard.astro
type nul > src\components\TalentCard.astro
type nul > src\components\PostCard.astro
type nul > src\components\Filters.astro
type nul > src\components\Breadcrumb.astro
type nul > src\components\TagList.astro
type nul > src\components\CTA.astro

:: Fichiers src/layouts/
type nul > src\layouts\BaseLayout.astro
type nul > src\layouts\PageLayout.astro

:: Fichiers src/pages/
type nul > src\pages\index.astro
type nul > src\pages\expertise.astro
type nul > src\pages\agenda-scientifique.astro
type nul > src\pages\projet.astro
type nul > src\pages\talents.astro
type nul > src\pages\journal.astro
type nul > src\pages\collaborer.astro
type nul > src\pages\404.astro

type nul > src\pages\projets\[slug].astro
type nul > src\pages\evenements\[slug].astro
type nul > src\pages\talents\[slug].astro
type nul > src\pages\journal\[slug].astro

:: Fichiers src/styles/
type nul > src\styles\global.css

echo Structure Gemula creee avec succes !
pause