# Nicolas Sandoz — Portfolio

Site vitrine personnel de Nicolas Sandoz, développeur et créateur de produits numériques basé en Suisse.

## Stack

- HTML5 sémantique
- CSS3 avec custom properties (thème sombre/clair)
- JavaScript vanilla (aucune dépendance)
- Police : [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Fonctionnalités

- Thème sombre par défaut, basculement clair/sombre persisté via `localStorage`
- Animations au défilement (Intersection Observer)
- Navigation mobile responsive avec menu hamburger
- Mise en surbrillance du lien de navigation actif au défilement
- Grille de compétences et cartes projet avec effet glassmorphism
- Entièrement accessible (rôles ARIA, focus visible, balises sémantiques)

## Déploiement sur GitHub Pages

1. Pousser ce dépôt sur GitHub.
2. Aller dans **Settings → Pages**.
3. Sous **Source**, choisir la branche `main` (ou la branche souhaitée) et le dossier `/ (root)`.
4. Cliquer sur **Save**.
5. Après quelques secondes, le site sera disponible à l'adresse `https://<username>.github.io/<repo>/`.

## Structure

```
/
├── index.html   — Structure HTML complète (page unique)
├── style.css    — Styles, variables de thème, responsive
├── script.js    — Interactivité vanilla JS
└── README.md    — Ce fichier
```

## Personnalisation

- **Informations de contact** : mettre à jour les liens `mailto:` et les URLs sociales dans `index.html`.
- **Projets** : remplacer les cartes de projet par vos projets réels dans la section `#projets`.
- **Couleur d'accent** : changer la valeur `--accent` dans `:root` dans `style.css`.
- **Bio** : mettre à jour le texte dans la section `#about`.
