# Brazzaville Montres - Documentation Technique

Site vitrine e-commerce frontend (sans backend) developpe en HTML, CSS et JavaScript vanilla.

Le projet est localise en francais et adapte au contexte Congo-Brazzaville.

## 1) Vue d'ensemble du projet

Le site presente une collection de montres premium avec :

- une page unique fluide (sections Accueil, Selection, Produits, Nouveautes, etc.),
- un panier dynamique en JavaScript,
- une simulation de paiement (sans API bancaire),
- des animations UI modernes,
- un theme clair/sombre memorise.

Le fonctionnement repose sur un front pur : toute la logique metier est geree dans le navigateur.

## 2) Structure des fichiers et role de chacun

- `index.html`
  - Structure complete de la page.
  - Contient les sections produit, la modal panier, la modal paiement, et la confirmation de paiement.
  - Les boutons d'ajout utilisent l'attribut `data-add-to-cart` pour connecter HTML et JS.

- `assets/css/styles.css`
  - Fichier de style principal (CSS pur, sans SCSS).
  - Gere le design global, le responsive, les animations, le dark mode et les modals.
  - Inclut les media queries pour mobile, tablette et desktop.

- `assets/js/main.js`
  - Cerveau interactif du site.
  - Gere menu mobile, sliders, scroll actif, theme, panier, paiement et localStorage.

- `assets/js/swiper-bundle.min.js`
  - Bibliotheque externe pour les sliders (temoignages et nouveautes).

- `assets/css/swiper-bundle.min.css`
  - Styles necessaires au rendu des sliders Swiper.

## 3) Pourquoi JavaScript est essentiel ici

Sans JavaScript, le site resterait statique :

- pas d'ajout dynamique au panier,
- pas de calcul de total,
- pas de persistance des donnees au refresh,
- pas d'ouverture/fermeture de modals interactives,
- pas de confirmation de paiement reelle,
- pas d'interactions avancees (dark mode memorise, etc.).

JavaScript joue donc le role de moteur fonctionnel de l'experience utilisateur.

## 4) Gestion du panier : qui fait quoi et comment

La logique panier est 100% geree par `assets/js/main.js`.

### 4.1 Donnees panier

- Cle de stockage : `watches-cart`.
- Les articles sont stockes en tableau JSON dans `localStorage`.
- Chargement initial :
  - `let cartItems = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]')`

### 4.2 Ajout au panier

- Les boutons HTML ont `data-add-to-cart`.
- JS attache un event listener sur chaque bouton :
  - `document.querySelectorAll('[data-add-to-cart]')...`
- `getProductFromButton(button)` lit dans la card :
  - nom (`.featured__title`, `.products__title`, etc.),
  - prix,
  - image.
- `addToCart(product)` :
  - incremente la quantite si le produit existe,
  - sinon ajoute un nouvel item,
  - sauvegarde via `saveCart()`,
  - rerender via `renderCart()`.

### 4.3 Quantite, suppression et total

- `updateItemQuantity(id, delta)` augmente/diminue la quantite.
- `removeItem(id)` supprime la ligne produit.
- `renderCart()` :
  - reconstruit le HTML du panier,
  - recalcule nombre total d'articles,
  - recalcule le montant total en FCFA.

### 4.4 Persistance

- `saveCart()` appelle :
  - `localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))`
- Resultat : le panier est conserve meme apres rechargement de page.

## 5) Paiement simule : processus complet

Le paiement reste volontairement une simulation frontend :

1. utilisateur clique `Passer au paiement`,
2. ouverture de la modal paiement,
3. soumission du formulaire,
4. JS vide le panier et met a jour `localStorage`,
5. fermeture modal paiement,
6. affichage d'une vraie carte de confirmation (`payment-success`).

Cette approche permet de tester l'UX complete sans integration API.

## 6) Responsive : strategie

Le projet est mobile-first avec media queries progressives :

- base mobile par defaut,
- adaptations a `576px`, `767px`, `992px`, `1024px`.

Points traites :

- grilles de cartes produits,
- bloc hero,
- footer,
- modals,
- prevention du scroll horizontal parasite (`overflow-x: hidden`).

## 7) Sliders et animations

- Temoignages :
  - navigation manuelle via fleches,
  - autoplay toutes les 4 secondes.
- Produits :
  - animations subtiles (flottement/rotation),
  - hover premium.
- Hero :
  - animation verticale douce sur la montre principale.

## 8) Stack et contraintes techniques

- HTML5
- CSS3
- JavaScript ES6+
- Swiper.js (slider)

Contraintes respectees :

- pas de framework frontend,
- pas de backend,
- styles en CSS pur (SCSS retire),
- logique metier cote client.
