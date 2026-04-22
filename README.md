# Site Rolex - Documentation Projet

Site vitrine e-commerce premium en HTML, CSS et JavaScript (sans backend), avec panier local, simulation de paiement, theme sombre par defaut et interface multilingue FR/EN.

## Apercu

Le projet propose une experience moderne de presentation de montres:

- page unique performante et responsive
- sections produits et nouveautes animees
- panier dynamique avec persistance locale (`localStorage`)
- modal de paiement simulee (sans integration bancaire)
- traduction FR/EN sur toute l'interface
- design premium optimise mobile, tablette et desktop

## Structure du projet

```text
Site Rolex/
|- index.html
|- README.md
|- netlify.toml
|- assets/
   |- css/
   |  |- styles.css
   |  |- swiper-bundle.min.css
   |- js/
   |  |- main.js
   |  |- swiper-bundle.min.js
   |- img/
```

## Fonctionnalites principales

### 1) Navigation et experience utilisateur

- menu responsive avec etat actif au scroll
- bouton de changement de theme (sombre/clair)
- bouton de changement de langue FR/EN (memorise)
- scroll-up contextuel

### 2) Catalogue et interactions

- cartes produits avec animations et effets hover
- slider temoignages
- slider nouveautes
- boutons d'ajout panier (`data-add-to-cart`)

### 3) Panier dynamique

Le panier est entierement gere en JavaScript via `assets/js/main.js`.

- ajout/incrementation d'articles
- modification des quantites (+/-)
- suppression d'article
- calcul automatique du total
- rendu dynamique du contenu
- panier scrollable pour gros volumes d'articles

Donnees stockees:

- cle de stockage: `watches-cart`
- format: tableau JSON dans `localStorage`

### 4) Paiement simule

Le flux de paiement est UX-only:

1. ouverture modal au clic sur commander
2. validation formulaire local
3. vidage du panier
4. affichage confirmation de paiement

## Internationalisation (FR/EN)

Le systeme i18n repose sur:

- attributs `data-i18n`, `data-i18n-placeholder`, `data-i18n-html`
- dictionnaire de traduction dans `assets/js/main.js`
- persistance du choix langue via `selected-language`
- mise a jour dynamique du titre de page et des textes UI

## Responsive design

Le CSS est structure en breakpoints:

- base mobile
- `max-width: 575px` (optimisations extra-mobile)
- `min-width: 576px`
- `min-width: 767px`
- `min-width: 768px and max-width: 1023px` (tablette)
- `min-width: 992px`
- `min-width: 1024px`

Points optimises:

- hero section
- grilles produits
- panier et elements de controle
- footer et boutons CTA
- lisibilite generale des blocs

## Stack technique

- HTML5
- CSS3 (vanilla)
- JavaScript ES6 (vanilla)
- [Swiper.js](https://swiperjs.com/) pour les sliders

## Lancer le projet en local

Depuis le dossier racine:

```bash
py -m http.server 5500
```

Puis ouvrir:

- `http://localhost:5500`

Alternative:

```bash
python -m http.server 5500
```

## Deploiement Netlify

Le projet est prepare pour Netlify via `netlify.toml`.

### Option 1 - Interface Netlify

1. Connecter le repo GitHub
2. Build command: *(laisser vide)*
3. Publish directory: `.`
4. Deploy

### Option 2 - Netlify CLI

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Branche et depot

Le projet doit vivre sur une seule branche de production:

- branche principale: `main`

Repository GitHub cible:

- [JBixx/Site-Rolex](https://github.com/JBixx/Site-Rolex.git)

## Auteur

- HIRWA Jean Baptiste
