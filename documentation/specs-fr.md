# 📘 Dishly - Specifications - FR 🇫🇷

## 🥘 Qu'est-ce que Dishly ?
Dishly est une application web qui permet aux utilisateurs de créer, consulter et suivre pas à pas leurs recettes de cuisine.  
Chaque recette est structurée autour de deux vues principales : les **ingrédients** et les **étapes**, pensées pour une expérience utilisateur fluide et intuitive, notamment sur mobile et tablette.

## 🎯 Objectif
Développer un **prototype fonctionnel** de Dishly, responsive et ergonomique, utilisable sur mobile/tablette via PWA, en suivant une architecture scalable et moderne.


## ⚙️ Stack Technique

### 💻 Backend
- **Langage** : TypeScript
- **API** : GraphQL (Apollo Server)
- **ORM** : Prisma
- **Base de données** : PostgreSQL (hébergée sur Supabase)
- **Authentification** : Google OAuth (via Supabase)
- **Architecture** : Microservices (Docker + NGINX)
- **Cache** : (optionnel, ex. Apollo Server cache ou Redis plus tard)
- **Tests** : Jest (unitaires), Supertest (API)

### 🧑‍🎨 Frontend
- **Langage** : TypeScript
- **Framework** : Next.js (React 18)
- **UI Kit** : Tailwind CSS + shadcn/ui
- **PWA** : Oui (installable sur mobile/tablette)
- **Tests** : Cypress (e2e), Jest/React Testing Library (unitaires)

### 🐳 Conteneurisation
- **Docker** : Multi-services (frontend, backend, base de données, reverse proxy)
- **Reverse Proxy** : NGINX


## 📐 Architecture

- Architecture **microservices** (container par service)
- Facilite la scalabilité, les tests isolés, les déploiements indépendants et les évolutions technologiques


## 🔒 Authentification & Autorisation

### Auth
- **Google OAuth** via Supabase
- Middleware d’authentification pour sécuriser l’API GraphQL

### Rôles
- `user` : rôle par défaut
- `admin` : accès à toutes les données (y compris privées et utilisateurs tiers)


## 📊 Modèle de données

### Entités principales

- **User** : `id`, `firstname`, `lastname`, `email`, `role`
- **Role** : `name` (`user`, `admin`)
- **Recipe** : `title`, `image`, `servings`, `tags[]`, `categories[]`, `steps[]`, `ingredients[]`, `ownerId`, `isPublic`
- **Ingredient** : `name`
- **RecipeIngredient** : `ingredientId`, `quantity`, `unitId`
- **Unit** : `name`
- **Step** : `description`, `image`
- **Tag** : `name`
- **Category** : `name`


## 👤 Règles métiers / Permissions

| Action                         | User       | Admin      |
|-------------------------------|------------|------------|
| Voir recettes publiques       | ✅          | ✅          |
| Voir ses recettes             | ✅          | ✅          |
| Créer/modifier ses recettes   | ✅          | ✅          |
| Supprimer ses recettes        | ✅          | ✅          |
| Voir toutes les recettes      | ❌          | ✅          |
| Supprimer un utilisateur      | ❌          | ✅          |
| Modifier infos utilisateur    | ✅          | ✅          |


## 🧪 Tests

### Authentification / Connexion

| Cas de test                    | Résultat attendu                                 |
|-------------------------------|--------------------------------------------------|
| Connexion avec données valides| Redirection vers l’accueil                        |
| Email déjà existant           | Message d’erreur                                 |
| Email invalide                | Message d’erreur                                 |
| Mot de passe invalide         | Message d’erreur                                 |

### Création de compte

| Cas de test                         | Résultat attendu                               |
|------------------------------------|------------------------------------------------|
| Email déjà utilisé                 | Message d’erreur (email déjà utilisé)         |
| Email/mot de passe invalide        | Message d’erreur                              |
| Email/mot de passe valides         | Création du compte + redirection              |


## 📱 Design

### Logo, couleurs, typographie
- À définir prochainement
- Palette et typographies en cohérence avec un univers moderne, doux et pratique (inspiré apps cuisine / bien-être)

### Maquettes & UI
- En cours sur Figma
- Focus mobile-first (avec responsive complet)


## 🧭 Roadmap - Phases

### Phase 1 – Backend (MVP)
- Base de données + API GraphQL
- Auth sans rôles (user/admin hardcodés)
- Connexion front/back simple
- Modèle de recette complet

### Phase 2 – Frontend Web (PWA)
- UI de création et affichage recette
- Connexion Google
- Navigation mobile optimisée

### Phase 3 – Auth complète + rôles
- Middleware d’auth avec scopes
- Gestion des utilisateurs / rôles

### Phase 4 – Tests + CI/CD
- Mise en place de Cypress / Jest
- Pipeline GitHub Actions ou similaire


## 🔮 Évolutions envisagées

- Envoi d’étapes sur montre connectée
- Partage de recettes entre amis
- Fork de recettes (versioning)
- Import de recettes externes
- Ajout de commentaires ou notes
