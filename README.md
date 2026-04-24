# Portfolio — Gregory Phina

> Vitrine professionnelle · Administrateur Réseau & Infrastructure  
> Mastère Manager en Ingénierie Informatique · M2i · Alternance CNRS

**Live →** [gregoryphina.vercel.app](https://portfolio-zeta-five-42.vercel.app) &nbsp;·&nbsp; **Repo →** [github.com/FU3G/Portfolio](https://github.com/FU3G/Portfolio)

---

## Stack

| Catégorie | Technologie |
|---|---|
| Framework | React 19 + Vite |
| Navigation | Ancres HTML + IntersectionObserver (SPA one-page) |
| Routing | React Router DOM v7 — route `/projects` dédiée |
| Globe 3D | cobe v2 (WebGL) |
| QR Code | qrcode.react |
| Formulaire | Formspree (serverless) |
| Données projets | GitHub API v3 + `src/data/projects.json` |
| Styles | CSS custom (variables, grid, animations) |
| Déploiement | Vercel — CI/CD automatique sur push `main` |

---

## Pages & Routing

| Route | Contenu |
|---|---|
| `/` | One-page portfolio (Hero → Expérience → Projets → Certifications → Contact) |
| `/projects` | Galerie complète (GitHub API + recherche + tri + filtres) |

---

## Sections one-page

| Section | Contenu |
|---|---|
| **Hero** | Présentation, globe 3D, métriques animées (CountUp) |
| **Expérience** | Timeline professionnelle + grille de compétences |
| **Projets** | 3 projets mis en avant (JSON local) + CTA vers `/projects` |
| **Certifications** | Certifs obtenues, en cours (barres animées), profil TryHackMe |
| **Contact** | Formulaire Formspree, QR Code vCard, liens directs, téléchargement CV |

---

## Fonctionnalités

- **Globe WebGL** — rotation automatique, marqueurs Marseille / Montréal, thème adaptatif
- **Galerie projets hybride** — fetch `api.github.com/users/FU3G/repos`, fusion avec `projects.json`, anti-doublon (JSON prioritaire), date de mise à jour GitHub
- **Recherche temps réel** — filtre sur titre, description et technologies
- **Tri** — par date de mise à jour ou alphabétique
- **Retry** — bouton "Réessayer" si l'API GitHub est inaccessible
- **Formulaire Formspree** — envoi réel, états `idle / sending / success / error`, bouton désactivé pendant l'envoi
- **QR Code vCard** — dans Contact (100 px) et dans le footer (44 px) — encodé sur `/contact.vcf`
- **Navbar adaptive** — liens d'ancrage sur `/`, bouton "← Portfolio" sur `/projects`
- **Constellation footer** — canvas 20 nœuds, interaction souris orange
- **Animations scroll-reveal** — IntersectionObserver, CountUp, barres de progression certifications
- **Tilt 3D** — cartes métriques au survol (JS + CSS perspective)
- **Bouton retour haut** — apparaît après 400 px, 3 flèches éventail au hover
- **Thème clair / sombre** — `localStorage`, `data-theme` sur `<html>`
- **Texture fond** — dot grid CSS + grain animé overlay
- **Page 404 standalone** — animation terminal `traceroute` (HTML/CSS/JS dans `public/`)
- **Page maintenance standalone** — même style, redirigeable via `vercel.json`

---

## Architecture

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation sticky, dot slider, retour /projects
│   ├── Footer.jsx          # Constellation + terminal typewriter + QR Code
│   ├── FooterMatrix.jsx    # Canvas constellation animée (interaction souris)
│   ├── Globe.jsx           # Globe WebGL via cobe (rotation + thème)
│   ├── CountUp.jsx         # Compteur animé déclenché au scroll
│   ├── ThemeToggle.jsx     # Bascule clair/sombre avec localStorage
│   ├── ProjectCard.jsx     # Carte projet réutilisable (manuel ou GitHub)
│   ├── SearchBar.jsx       # Recherche temps réel avec bouton effacer
│   ├── SortBar.jsx         # Tri par date ou alphabétique
│   └── QRCodeWidget.jsx    # QR Code SVG pointant vers /contact.vcf
├── pages/
│   ├── Hero.jsx            # Section d'accueil : texte + globe + métriques
│   ├── Experience.jsx      # Timeline + grille de compétences
│   ├── Projects.jsx        # Projets mis en avant (one-page) + CTA /projects
│   ├── ProjectsPage.jsx    # Page complète /projects (search + sort + GitHub)
│   ├── Certifications.jsx  # Certifs obtenues, en cours, TryHackMe
│   └── Contact.jsx         # Formulaire + QR Code + liens + CV
├── data/
│   └── projects.json       # Projets manuels (homelab / pro) — source de vérité
├── styles/
│   └── global.css          # Tout le CSS (variables, layout, animations)
├── App.jsx                 # Routes React Router + composant OnePage
└── main.jsx                # Point d'entrée React + BrowserRouter
public/
├── 404.html                # Page 404 standalone (terminal traceroute)
├── maintenance.html        # Page maintenance standalone (terminal + progress)
├── contact.vcf             # vCard téléchargeable / encodée dans le QR
└── cv.pdf                  # CV PDF téléchargeable
```

---

## Installation locale

```bash
git clone https://github.com/FU3G/Portfolio.git
cd Portfolio
npm install
```

Copier `.env.example` en `.env` et remplir :

```env
VITE_FORMSPREE_URL=https://formspree.io/f/VOTRE_ID
```

```bash
npm run dev
```

---

## Déploiement Vercel

1. Connecter le repo sur [vercel.com](https://vercel.com)
2. Vite est détecté automatiquement
3. Ajouter `VITE_FORMSPREE_URL` dans **Project Settings → Environment Variables**
4. Chaque push sur `main` déclenche un redéploiement automatique

### Mode maintenance

```json
// Maintenance activée
{ "rewrites": [{ "source": "/(.*)", "destination": "/maintenance.html" }] }
```
```json
// Site en ligne
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

---

## Variables d'environnement

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_URL` | Endpoint Formspree — récupéré sur formspree.io après création d'un formulaire |

---

## Branches

| Branche | Description |
|---|---|
| `main` | Production — déployée automatiquement sur Vercel |
| `design/alt` | Variante UI |

---

## Développé avec l'aide de l'IA

Conçu et développé en collaboration avec [Claude](https://claude.ai) (Anthropic) — utilisé comme assistant de développement pour l'architecture des composants, le CSS, les animations et la documentation.

---

## Contact

[gregory.phina@pm.me](mailto:gregory.phina@pm.me) &nbsp;·&nbsp; [linkedin.com/in/gregoryphina](https://linkedin.com/in/gregoryphina) &nbsp;·&nbsp; [github.com/FU3G](https://github.com/FU3G)
