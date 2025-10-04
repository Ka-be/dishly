# 📘 Dishly - Specifications v2.0 - FR 🇫🇷

## 🥘 Qu'est-ce que Dishly ?
Dishly est une application mobile et web qui permet aux utilisateurs de créer, consulter et suivre pas à pas leurs recettes de cuisine.  
Chaque recette est structurée autour de deux vues principales : les **ingrédients** et les **étapes**, pensées pour une expérience utilisateur fluide et intuitive.

## 🎯 Objectif
Développer un **prototype fonctionnel** de Dishly, cross-platform (iOS, Android, Web), en suivant une architecture moderne et scalable basée sur Supabase.

---

## ⚙️ Stack Technique

### 💻 Backend
- **Platform** : Supabase
- **Base de données** : PostgreSQL (managé par Supabase)
- **API** : PostgREST (auto-générée) + GraphQL (optionnel via pg_graphql)
- **Authentification** : Supabase Auth (Google OAuth, Email/Password, Magic Links)
- **Storage** : Supabase Storage (images de recettes)
- **Edge Functions** : TypeScript/Deno (logique métier complexe)
- **Sécurité** : Row Level Security (RLS)
- **Realtime** : Supabase Realtime (optionnel, pour collaborations futures)

### 🧑‍🎨 Frontend
- **Langage** : TypeScript
- **Framework** : React Native (Expo SDK 52+)
- **Routing** : Expo Router (file-based navigation)
- **UI Kit** : Tamagui (cross-platform styling avec thèmes)
- **Client Supabase** : @supabase/supabase-js
- **Plateformes** : 
  - iOS (via Expo)
  - Android (via Expo)
  - Web (via Expo)
- **PWA** : Oui (installable sur mobile/tablette via navigateur)
- **State Management** : React Context + Zustand (si nécessaire)
- **Tests** : 
  - Jest (unitaires)
  - Detox (e2e mobile, optionnel)
  - Cypress (e2e web, optionnel)

### 🐳 Développement Local
- **Supabase CLI** : Pour stack Supabase locale (DB, Auth, Storage)
- **Docker** : Utilisé par Supabase CLI automatiquement
- **Expo CLI** : Pour le développement frontend

---

## 📐 Architecture

### Principes
- **Backend-as-a-Service** : Supabase gère toute l'infrastructure backend
- **Client direct** : Le frontend Expo communique directement avec Supabase
- **Serverless** : Edge Functions pour la logique métier complexe uniquement
- **Security-first** : Row Level Security (RLS) pour toutes les tables
- **Offline-capable** : Capacité de fonctionnement hors ligne (roadmap future)

### Flux de données
```
┌─────────────────┐
│   Expo App      │
│ (iOS/Android/   │
│     Web)        │
└────────┬────────┘
         │
         ├──────────────► [Supabase Auth] ──────► JWT tokens
         │                                          │
         │                                          ▼
         ├──────────────► [PostgREST API] ────► [PostgreSQL]
         │                                       with RLS
         │                                          │
         ├──────────────► [Supabase Storage] ──────┤
         │                (images)                  │
         │                                          │
         └──────────────► [Edge Functions] ────────┘
                          (logique métier)
```

### Séparation des responsabilités
- **Frontend (Expo)** : UI, navigation, validation client, cache local
- **Supabase Auth** : Authentification, gestion des sessions
- **PostgreSQL + RLS** : Données, permissions granulaires
- **Storage** : Fichiers images (recettes, avatars)
- **Edge Functions** : Opérations complexes (ex: suggestions IA, notifications)

---

## 🔒 Authentification & Autorisation

### Méthodes d'authentification
1. **Google OAuth** (méthode prioritaire)
   - Connexion via compte Google
   - Récupération automatique de prénom, nom, photo
2. **Email/Password** (méthode secondaire)
   - Inscription classique
   - Confirmation par email
3. **Magic Links** (optionnel, roadmap)
   - Connexion sans mot de passe

### Gestion des sessions
- **JWT tokens** générés par Supabase
- Refresh automatique des tokens
- Persistance sécurisée (SecureStore sur mobile, localStorage sur web)

### Rôles utilisateur
Stockés dans la table `roles` :
- **`user`** : Rôle par défaut
  - Gère ses propres recettes
  - Consulte les recettes publiques
  - Peut ajouter des recettes en favoris
- **`admin`** : Rôle privilégié
  - Accès à toutes les recettes (publiques et privées)
  - Gestion des utilisateurs
  - Modération du contenu
  - Dashboard admin (roadmap)

### Sécurité Row Level Security (RLS)

#### Exemples de politiques RLS :

**Table `recipes` :**
```sql
-- SELECT : Voir ses propres recettes + recettes publiques
CREATE POLICY "Users can view their own and public recipes"
ON recipes FOR SELECT
USING (
  auth.uid() = user_id 
  OR is_public = true
  OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role_id = (SELECT id FROM roles WHERE name = 'admin')
  )
);

-- INSERT : Créer uniquement ses propres recettes
CREATE POLICY "Users can create their own recipes"
ON recipes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- UPDATE : Modifier uniquement ses propres recettes
CREATE POLICY "Users can update their own recipes"
ON recipes FOR UPDATE
USING (auth.uid() = user_id);

-- DELETE : Supprimer uniquement ses propres recettes
CREATE POLICY "Users can delete their own recipes"
ON recipes FOR DELETE
USING (auth.uid() = user_id);
```

**Table `profiles` :**
```sql
-- Utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = user_id);

-- Utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 📊 Modèle de données

### Schéma complet

#### **`profiles`** (extension de auth.users)
Stocke les informations complémentaires des utilisateurs.

| Colonne       | Type      | Contraintes                    | Description                        |
|---------------|-----------|--------------------------------|------------------------------------|
| `id`          | uuid      | PK, DEFAULT uuid_generate_v4() | Identifiant unique                 |
| `user_id`     | uuid      | FK → auth.users, UNIQUE        | Lien vers auth.users de Supabase  |
| `firstname`   | varchar   | NOT NULL                       | Prénom                             |
| `lastname`    | varchar   | NOT NULL                       | Nom                                |
| `avatar_url`  | text      | NULLABLE                       | URL de l'avatar (Supabase Storage) |
| `role_id`     | uuid      | FK → roles, NOT NULL           | Rôle de l'utilisateur              |
| `created_at`  | timestamp | DEFAULT now()                  | Date de création                   |
| `updated_at`  | timestamp | DEFAULT now()                  | Date de dernière modification      |

#### **`roles`**
Définit les rôles disponibles dans l'application.

| Colonne       | Type      | Contraintes       | Description           |
|---------------|-----------|-------------------|-----------------------|
| `id`          | uuid      | PK                | Identifiant unique    |
| `name`        | varchar   | UNIQUE, NOT NULL  | Nom du rôle (user, admin) |
| `created_at`  | timestamp | DEFAULT now()     | Date de création      |

**Valeurs initiales :**
- `user`
- `admin`

#### **`recipes`**
Table principale des recettes.

| Colonne       | Type      | Contraintes                    | Description                          |
|---------------|-----------|--------------------------------|--------------------------------------|
| `id`          | uuid      | PK, DEFAULT uuid_generate_v4() | Identifiant unique                   |
| `title`       | varchar   | NOT NULL                       | Titre de la recette                  |
| `description` | text      | NULLABLE                       | Description courte de la recette     |
| `image_url`   | text      | NULLABLE                       | URL de l'image (Supabase Storage)    |
| `servings`    | integer   | NOT NULL, DEFAULT 4            | Nombre de portions                   |
| `prep_time`   | integer   | NULLABLE                       | Temps de préparation (minutes)       |
| `cook_time`   | integer   | NULLABLE                       | Temps de cuisson (minutes)           |
| `is_public`   | boolean   | NOT NULL, DEFAULT false        | Recette publique ou privée           |
| `user_id`     | uuid      | FK → profiles(user_id)         | Propriétaire de la recette           |
| `created_at`  | timestamp | DEFAULT now()                  | Date de création                     |
| `updated_at`  | timestamp | DEFAULT now()                  | Date de dernière modification        |

#### **`ingredients`**
Liste des ingrédients disponibles (référentiel).

| Colonne       | Type      | Contraintes       | Description              |
|---------------|-----------|-------------------|--------------------------|
| `id`          | uuid      | PK                | Identifiant unique       |
| `name`        | varchar   | UNIQUE, NOT NULL  | Nom de l'ingrédient      |
| `created_at`  | timestamp | DEFAULT now()     | Date de création         |

#### **`recipe_ingredients`**
Table de liaison entre recettes et ingrédients (avec quantité).

| Colonne         | Type      | Contraintes              | Description                    |
|-----------------|-----------|--------------------------|--------------------------------|
| `id`            | uuid      | PK                       | Identifiant unique             |
| `recipe_id`     | uuid      | FK → recipes             | Recette concernée              |
| `ingredient_id` | uuid      | FK → ingredients         | Ingrédient utilisé             |
| `quantity`      | decimal   | NOT NULL                 | Quantité (ex: 250.5)           |
| `unit_id`       | uuid      | FK → units               | Unité de mesure                |

**Contrainte unique :** Un même ingrédient ne peut apparaître qu'une fois par recette
```sql
UNIQUE(recipe_id, ingredient_id)
```

#### **`units`**
Unités de mesure pour les ingrédients.

| Colonne        | Type    | Contraintes       | Description                     |
|----------------|---------|-------------------|---------------------------------|
| `id`           | uuid    | PK                | Identifiant unique              |
| `name`         | varchar | NOT NULL          | Nom complet (ex: "grammes")     |
| `abbreviation` | varchar | NULLABLE          | Abréviation (ex: "g")           |

**Valeurs initiales :**
- Grammes (g)
- Kilogrammes (kg)
- Millilitres (ml)
- Litres (L)
- Cuillère à soupe (c.à.s)
- Cuillère à café (c.à.c)
- Pièce (pce)
- Pincée

#### **`steps`**
Étapes de préparation d'une recette.

| Colonne       | Type      | Contraintes           | Description                       |
|---------------|-----------|-----------------------|-----------------------------------|
| `id`          | uuid      | PK                    | Identifiant unique                |
| `recipe_id`   | uuid      | FK → recipes          | Recette concernée                 |
| `order`       | integer   | NOT NULL              | Ordre de l'étape (1, 2, 3...)     |
| `description` | text      | NOT NULL              | Description de l'étape            |
| `image_url`   | text      | NULLABLE              | Image illustrative (optionnelle)  |
| `timer`       | integer   | NULLABLE              | Timer en secondes (ex: 300 = 5min)|
| `created_at`  | timestamp | DEFAULT now()         | Date de création                  |

**Contrainte unique :** Une recette ne peut avoir deux étapes avec le même ordre
```sql
UNIQUE(recipe_id, order)
```

#### **`tags`**
Tags pour catégoriser les recettes (ex: végétarien, rapide, sans gluten).

| Colonne       | Type      | Contraintes       | Description        |
|---------------|-----------|-------------------|--------------------|
| `id`          | uuid      | PK                | Identifiant unique |
| `name`        | varchar   | UNIQUE, NOT NULL  | Nom du tag         |
| `created_at`  | timestamp | DEFAULT now()     | Date de création   |

#### **`categories`**
Catégories principales (ex: entrée, plat, dessert).

| Colonne       | Type      | Contraintes       | Description              |
|---------------|-----------|-------------------|-----------------------------|
| `id`          | uuid      | PK                | Identifiant unique          |
| `name`        | varchar   | UNIQUE, NOT NULL  | Nom de la catégorie         |
| `created_at`  | timestamp | DEFAULT now()     | Date de création            |

**Valeurs initiales :**
- Entrée
- Plat
- Dessert
- Accompagnement
- Boisson
- Sauce

#### **`recipe_tags`**
Table de liaison many-to-many entre recettes et tags.

| Colonne     | Type | Contraintes   | Description        |
|-------------|------|---------------|--------------------|
| `recipe_id` | uuid | FK → recipes  | Recette concernée  |
| `tag_id`    | uuid | FK → tags     | Tag associé        |

**Clé primaire composite :** `(recipe_id, tag_id)`

#### **`recipe_categories`**
Table de liaison many-to-many entre recettes et catégories.

| Colonne       | Type | Contraintes      | Description          |
|---------------|------|------------------|----------------------|
| `recipe_id`   | uuid | FK → recipes     | Recette concernée    |
| `category_id` | uuid | FK → categories  | Catégorie associée   |

**Clé primaire composite :** `(recipe_id, category_id)`

#### **`user_favorites`**
Recettes favorites des utilisateurs.

| Colonne       | Type      | Contraintes              | Description                |
|---------------|-----------|--------------------------|----------------------------|
| `id`          | uuid      | PK                       | Identifiant unique         |
| `user_id`     | uuid      | FK → profiles(user_id)   | Utilisateur                |
| `recipe_id`   | uuid      | FK → recipes             | Recette favorite           |
| `created_at`  | timestamp | DEFAULT now()            | Date d'ajout en favori     |

**Contrainte unique :** Un utilisateur ne peut mettre en favori qu'une fois la même recette
```sql
UNIQUE(user_id, recipe_id)
```

---

## 👤 Règles métiers / Permissions

### Matrice de permissions

| Action                              | User       | Admin      | RLS Policy                          |
|-------------------------------------|------------|------------|-------------------------------------|
| Voir recettes publiques             | ✅          | ✅          | `is_public = true`                  |
| Voir ses propres recettes           | ✅          | ✅          | `user_id = auth.uid()`              |
| Voir toutes les recettes            | ❌          | ✅          | `role = 'admin'`                    |
| Créer une recette                   | ✅          | ✅          | `user_id = auth.uid()`              |
| Modifier ses recettes               | ✅          | ✅          | `user_id = auth.uid()`              |
| Modifier recettes d'autres users    | ❌          | ✅          | `role = 'admin'`                    |
| Supprimer ses recettes              | ✅          | ✅          | `user_id = auth.uid()`              |
| Supprimer recettes d'autres users   | ❌          | ✅          | `role = 'admin'`                    |
| Ajouter une recette en favori       | ✅          | ✅          | Toujours autorisé                   |
| Voir son profil                     | ✅          | ✅          | `user_id = auth.uid()`              |
| Modifier son profil                 | ✅          | ✅          | `user_id = auth.uid()`              |
| Voir profils autres utilisateurs    | ❌          | ✅          | `role = 'admin'`                    |
| Gérer les rôles                     | ❌          | ✅          | `role = 'admin'`                    |

### Règles de validation métier

#### Recettes
- Le titre doit contenir au minimum 3 caractères
- Une recette doit avoir au moins 1 ingrédient
- Une recette doit avoir au moins 1 étape
- Le nombre de portions doit être >= 1
- Les temps (prep, cook) doivent être >= 0 ou null

#### Étapes
- L'ordre des étapes doit commencer à 1
- Les étapes doivent être continues (pas de saut dans l'ordre)
- La description d'une étape ne peut être vide

#### Ingrédients
- Un ingrédient ne peut être ajouté qu'une fois par recette
- La quantité doit être > 0

---

## 🧪 Tests

### Tests unitaires (Jest)
**Composants :**
- Rendu des composants UI (RecipeCard, IngredientsList, StepsList)
- Interactions utilisateur (boutons, formulaires)
- Navigation (redirection, paramètres de route)

**Utilitaires :**
- Fonctions de formatage (dates, quantités)
- Validation de formulaires
- Helpers Supabase

**Logique métier :**
- Calcul automatique des quantités selon portions
- Filtrage et recherche de recettes
- Gestion de l'état local

### Tests d'intégration
**Flux d'authentification :**
- Inscription avec email/password
- Connexion Google OAuth
- Déconnexion
- Gestion des sessions

**CRUD Recettes :**
- Création d'une recette complète
- Modification d'une recette existante
- Suppression d'une recette
- Ajout/retrait de favoris

**Upload d'images :**
- Upload d'image de recette
- Upload d'image d'étape
- Suppression d'images

### Tests e2e (optionnels)
**Parcours utilisateur complet :**
- Inscription → Connexion → Création recette → Consultation → Déconnexion
- Navigation entre tous les écrans
- Gestion offline/online

---

## 📱 Design & UX

### Principes UI/UX
- **Mobile-first** : Interface pensée pour le mobile en priorité
- **Cross-platform** : Cohérence iOS/Android/Web
- **Accessibilité** : Respect des normes WCAG 2.1 AA
- **Performance** : Chargement rapide, animations fluides
- **Intuitivité** : Navigation simple et claire

### Palette de couleurs (à définir)
- Couleur principale : *À définir*
- Couleur secondaire : *À définir*
- Couleurs de statut : succès, erreur, warning, info
- Mode sombre : *À implémenter*

### Typographie (à définir)
- Police principale : *À définir*
- Police secondaire : *À définir*

### Maquettes
- En cours de réalisation sur Figma
- Lien Figma : *À ajouter*

---

## 🧭 Roadmap

### Phase 1 – Setup & Infrastructure ✅ (en cours)
- ✅ Définition de l'architecture
- ✅ Mise à jour des spécifications
- 🔄 Setup Supabase (projet + base de données)
- 🔄 Configuration Expo pour le web
- 🔄 Intégration client Supabase dans Expo
- 🔄 Mise en place de l'authentification (Google OAuth)

### Phase 2 – CRUD Recettes (MVP)
- Création de recette (titre, description, image, portions)
- Ajout d'ingrédients avec quantités
- Ajout d'étapes avec descriptions et images optionnelles
- Affichage d'une recette complète
- Modification d'une recette
- Suppression d'une recette
- Liste de toutes les recettes (publiques + propres)

### Phase 3 – Fonctionnalités utilisateur
- Système de favoris
- Recherche de recettes (par titre, ingrédients, tags)
- Filtres (catégories, tags, temps de préparation)
- Profil utilisateur (édition prénom, nom, avatar)
- Visibilité publique/privée des recettes

### Phase 4 – UX avancée
- Mode pas-à-pas pour suivre une recette en cuisine
- Timer intégré dans les étapes
- Ajustement automatique des quantités selon le nombre de portions
- Mode hors-ligne (cache local)
- Partage de recettes (lien, export PDF)

### Phase 5 – Administration
- Dashboard admin
- Modération des recettes
- Gestion des utilisateurs
- Statistiques d'utilisation

### Phase 6 – Évolutions futures
- Import de recettes depuis URL
- Fork de recettes (créer une variante)
- Système de notation et commentaires
- Suggestions de recettes basées sur ingrédients disponibles
- Export/Import de recettes (JSON, PDF)
- Intégration montre connectée (Apple Watch, Wear OS)
- Mode collaboration (recettes partagées entre amis)
- Planification de repas (meal planning)
- Liste de courses générée automatiquement

---

## 🚀 Déploiement

### Environnements

#### Développement
- **Supabase** : Projet local via Supabase CLI
- **Expo** : Expo Go sur mobile, navigateur pour web
- **URL** : localhost

#### Staging (optionnel)
- **Supabase** : Projet staging sur Supabase Cloud
- **Expo** : Preview deployments
- **URL** : *À définir*

#### Production
- **Supabase** : Projet production sur Supabase Cloud
- **Expo** : EAS Build + EAS Update
- **URL** : *À définir*

### CI/CD
- **GitHub Actions** : Tests automatiques + déploiement
- **EAS Build** : Builds iOS et Android
- **EAS Update** : Over-the-air updates

---

## 📚 Documentation technique

### Pour les développeurs
- **README.md** : Instructions de setup et commandes
- **CLAUDE.md** : Guide pour Claude Code
- **ARCHITECTURE.md** : Détails de l'architecture
- **API.md** : Documentation des endpoints Supabase

### Conventions de code
- **TypeScript** : Strict mode activé
- **ESLint** : Configuration Expo + Prettier
- **Commits** : Conventional Commits (feat, fix, docs, etc.)
- **Branches** : GitFlow (main, develop, feature/*, hotfix/*)

---

## 🔗 Liens utiles

- **Supabase Docs** : https://supabase.com/docs
- **Expo Docs** : https://docs.expo.dev
- **Tamagui Docs** : https://tamagui.dev
- **Figma** : *À ajouter*
- **GitHub Repo** : *À ajouter*

