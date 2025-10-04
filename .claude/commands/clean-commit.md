# Clean Commit

Prépare un commit propre en suivant ces étapes :

## 1. Nettoyer le code

- Retire tous les `console.log()` de debug
- Supprime les fichiers temporaires et inutiles
- Enlève les commentaires de debug (// TODO, // FIXME temporaires)
- Vérifie qu'il n'y a pas de code commenté inutile
- Supprime les imports non utilisés

## 2. Vérifier la qualité

- Respect des conventions de nommage (anglais, camelCase)
- Principes DRY appliqués
- Pas de duplication de code
- Code bien formatté (ESLint/Prettier)
- Types TypeScript corrects (pas de `any`)

## 3. Documentation

- Si une solution complexe ou innovante a été implémentée, crée un fichier dans `/documentation/concept/` pour l'expliquer
- N'ajoute de documentation QUE si c'est vraiment nécessaire pour la compréhension future

## 4. Préparer le commit

- Format : `type: description courte`
- Types disponibles :
  - `feat:` - Nouvelle fonctionnalité
  - `fix:` - Correction de bug
  - `docs:` - Documentation uniquement
  - `style:` - Formatage, point-virgules manquants, etc.
  - `refactor:` - Refactoring de code
  - `test:` - Ajout ou modification de tests
  - `chore:` - Maintenance, dépendances, configuration
- Message en anglais
- Description claire et concise
- **IMPORTANT : Ne JAMAIS ajouter "Co-authored-by: Claude" dans le commit**

## Arguments supplémentaires

$ARGUMENTS

---

Une fois le nettoyage effectué, liste les modifications apportées et propose un message de commit approprié.