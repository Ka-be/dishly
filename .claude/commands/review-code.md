# Code Review

Effectue une revue de code approfondie en vérifiant les aspects suivants :

## Architecture & Design

- Respect de l'architecture définie (voir `/documentation/SPECIFICATIONS.md`)
- Séparation des responsabilités (SoC)
- Patterns utilisés correctement (hooks, contexts, components)
- Organisation des fichiers selon la structure définie
- Cohérence avec les diagrammes (`/documentation/concept/diagrams/`)

## Qualité du Code

### Lisibilité & Maintenabilité
- Code facile à comprendre
- Fonctions courtes et ciblées (max 50 lignes recommandé)
- Un fichier = une responsabilité claire
- Commentaires pertinents (pourquoi, pas comment)

### Nommage
- Variables/fonctions en anglais
- camelCase pour variables et fonctions
- PascalCase pour composants React
- Noms explicites et descriptifs
- Pas d'abréviations obscures

### Principes
- **DRY** (Don't Repeat Yourself) - pas de duplication
- **KISS** (Keep It Simple, Stupid) - simplicité avant tout
- **YAGNI** (You Aren't Gonna Need It) - pas de sur-ingénierie

## TypeScript

- Strict mode respecté
- Pas de `any` (utiliser `unknown` ou types spécifiques)
- Toutes les props de composants typées
- Interfaces/types bien définis
- Utilisation des types Supabase auto-générés

## React / Expo

- Functional components uniquement
- Hooks au début du composant (règles des hooks)
- Custom hooks pour logique complexe réutilisable
- Mémoization appropriée (useMemo, useCallback, React.memo)
- Gestion correcte des effets (useEffect)
- Pas de props drilling excessif

## Supabase

- RLS policies utilisées (sécurité côté serveur)
- Gestion des erreurs pour toutes les queries
- Utilisation des types auto-générés
- Queries optimisées (select uniquement les champs nécessaires)
- Pas de logique de sécurité côté client

## Performance

- Éviter les re-renders inutiles
- Images optimisées
- Lazy loading si approprié
- Queries Supabase efficaces
- Pas de calculs lourds dans le render

## Sécurité

- Validation des inputs utilisateur
- Pas de données sensibles en clair
- Utilisation correcte de l'authentification
- Gestion des permissions via RLS
- Variables d'environnement pour les secrets

## Tests

- Couverture des cas principaux
- Tests unitaires pour la logique métier
- Tests d'intégration pour les flows critiques
- Mocks appropriés pour Supabase

## Accessibilité

- Labels appropriés pour les éléments interactifs
- Contraste suffisant
- Navigation au clavier possible
- Support des screen readers

---

**Fichiers à examiner :** $ARGUMENTS

---

Après la revue, fournis :
1. Liste des points positifs
2. Liste des problèmes trouvés (par ordre de priorité)
3. Suggestions d'amélioration concrètes
4. Score global sur 10 avec justification