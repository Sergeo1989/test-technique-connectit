# Projet : Test technique Angular + NestJS

## Pré-requis

- [Node.js](https://nodejs.org/) v20 ou supérieur (développé avec v25.9.0)
- npm v11 ou supérieur

## Installation et démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer l'API (terminal 1)

```bash
npm run api:serve
```

L'API sera accessible sur : `http://localhost:8080/api/v1`

### 3. Démarrer le frontend (terminal 2)

```bash
npm run frontend:serve
```

Le frontend sera accessible sur : `http://localhost:4200`

## Stack technique

Le projet est un **monorepo NX** permettant au backend et au frontend de coexister dans le même dépôt et de partager des types, fonctions, etc.

**API :**

- [NestJS](https://nestjs.com/) — framework backend
- [Prisma](https://www.prisma.io/) — ORM
- [SQLite](https://www.sqlite.org/) — base de données (fichier local, aucune installation requise)

**Frontend :**

- [Angular v18](https://angular.dev/)
- [PrimeNG](https://primeng.org/) — bibliothèque de composants UI

## Structure du projet

```
apps/
  api/         → Point d'entrée de l'application NestJS
  frontend/    → Point d'entrée de l'application Angular

libs/
  api/
    framework/          → Module, service et contrôleur pour l'entité Framework
    coding-language/    → Module, service et contrôleur pour l'entité CodingLanguage
    framework-type/     → Module, service et contrôleur pour l'entité FrameworkType
  connectit-shared/
    api/                → Modules partagés : config, logger, cache, Prisma
  database/
    src/prisma/         → Schéma Prisma et migrations
    src/db/             → Fichier de base de données SQLite (dev.db)
  frontend/             → Bibliothèques partagées côté Angular
```

## Exercice : Pagination et filtre de recherche

### Objectif

L'application affiche actuellement l'ensemble des données de la table `Framework`. L'objectif est d'implémenter une pagination et un système de filtres. Vous devrez donc mettre en place les fonctionnalités au niveau de l'API et adapter le visuel du frontend pour permettre d'utiliser ces options.

### Critères d'acceptation

**API :**

- ✔ Pagination côté API
- ✔ Filtre selon les différentes propriétés de la table `Framework`

**Frontend :**

- ✔ Les filtres sélectionnés persistent lors du rechargement de la page
- ✔ Pagination fonctionnelle dans l'interface
- ✔ Le tableau des frameworks permet de filtrer les données

## Exercice : Création et modification d'un framework

### Objectif

Maintenant que l'application permet d'afficher la liste des frameworks, de filtrer et les consulter avec de la pagination. L'objectif est d'implémenter la création d'un nouveau framework ainsi que la modification d'un framework existant, via une vue dédiée.

### Critères d'acceptation

**API :**

- ✔ Les endpoints d'API pertinents sont ajoutés ou modifiés pour supporter les actions.

**Frontend :**

- ✔ Un bouton « Nouveau framework » sur la page liste permet d'accéder à la vue de création
- ✔ Cliquer sur un framework existant (ou sur un bouton « Modifier ») permet d'accéder à la vue d'édition
- ✔ La vue de création et la vue d'édition partagent le même composant formulaire (réutilisation)
- ✔ Le formulaire contient les champs : nom, image (URL), langage de programmation, type de framework et date de sortie
- ✔ Les listes déroulantes pour le langage et le type sont alimentées par l'API
- ✔ Après soumission réussie, l'utilisateur est redirigé vers la page liste

## Utilisation de l'intelligence artificielle

Il est tout à fait acceptable d'utiliser des outils d'intelligence artificielle (GitHub Copilot, ChatGPT, Claude, Cursor, etc.) pour compléter les exercices.

Si vous avez eu recours à l'IA, nous vous demandons de créer un fichier `.readme-ai` à la racine du projet qui résume votre démarche :

- Les outils d'IA utilisés
- La façon dont vous les avez intégrés dans votre flux de travail
- Vos prompts ou votre méthodologie
- Ce que vous avez fait vous-même vs ce que l'IA a généré

Cela nous permettra de mieux évaluer votre capacité à tirer parti de ces outils et à exercer votre jugement sur le code produit.

## Soumettre le projet

Une fois terminé, envoyez un lien public vers votre dépôt (GitHub, GitLab ou Bitbucket) à : maxime@solutionsconnectit.com
