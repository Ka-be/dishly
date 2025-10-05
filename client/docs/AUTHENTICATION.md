# Système d'authentification Dishly

## Vue d'ensemble

Le système d'authentification de Dishly utilise **Supabase Auth** avec **Google OAuth** comme méthode principale de connexion/inscription.

## Architecture

### Composants principaux

1. **AuthContext** (`/contexts/AuthContext.tsx`)
   - Gère l'état global de l'authentification
   - Fournit les données utilisateur, session et profil
   - Expose les méthodes `signInWithGoogle()` et `signOut()`

2. **AuthGuard** (`/components/AuthGuard.tsx`)
   - Protège les routes privées
   - Redirige automatiquement selon l'état d'authentification
   - Gère le flow onboarding

3. **Pages d'authentification** (`/app/(auth)/`)
   - `sign-in.tsx` - Page de connexion
   - `sign-up.tsx` - Page d'inscription
   - `onboarding.tsx` - Collecte des informations utilisateur (prénom/nom)
   - `callback.tsx` - Gestion du retour OAuth

## Flow d'authentification

### 1. Utilisateur non authentifié

```
1. L'utilisateur accède à l'application
2. AuthGuard détecte l'absence de session
3. Redirection automatique vers /sign-in
```

### 2. Connexion avec Google OAuth

```
1. L'utilisateur clique sur "Continuer avec Google"
2. Redirection vers Google OAuth
3. L'utilisateur autorise l'application
4. Retour sur /callback
5. Création/récupération de la session Supabase
6. Vérification de l'existence du profil :
   - Si profil existe → Redirection vers /(tabs)
   - Si pas de profil → Redirection vers /onboarding
```

### 3. Onboarding (première connexion)

```
1. L'utilisateur arrive sur /onboarding
2. Saisie du prénom et nom
3. Création du profil dans la table profiles :
   - user_id (lien avec auth.users)
   - firstname
   - lastname
   - role_id (via get_default_user_role())
   - avatar_url (depuis Google)
4. Refresh du profil dans le contexte
5. Redirection vers /(tabs)
```

### 4. Protection des routes

L'`AuthGuard` surveille les changements d'état et applique ces règles :

| État utilisateur | Position | Action |
|-----------------|----------|--------|
| Non authentifié | Hors (auth) | → Redirection vers /sign-in |
| Authentifié sans profil | Partout | → Redirection vers /onboarding |
| Authentifié avec profil | Dans (auth) | → Redirection vers /(tabs) |
| Authentifié avec profil | Dans (tabs) | ✓ Accès autorisé |

## Hooks disponibles

### `useAuth()`

```typescript
const {
  session,        // Session Supabase (ou null)
  user,           // User Supabase (ou null)
  profile,        // Profil de la table profiles (ou null)
  isLoading,      // true pendant la vérification initiale
  signInWithGoogle, // Fonction de connexion Google OAuth
  signOut,        // Fonction de déconnexion
  refreshProfile  // Rafraîchit le profil depuis la DB
} = useAuth();
```

### Exemple d'utilisation

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

  return (
    <View>
      <Text>Bonjour {profile?.firstname} !</Text>
      <Button onPress={signOut}>Se déconnecter</Button>
    </View>
  );
}
```

## Configuration Supabase

### Variables d'environnement

Fichier `.env` :

```
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
```

### Google OAuth (Dashboard Supabase)

1. Activer Google dans **Authentication > Providers**
2. Configurer les URLs de redirection autorisées :
   - Pour web : `http://localhost:8081/auth/callback`
   - Pour production : `https://votredomaine.com/auth/callback`

### Row Level Security (RLS)

Les policies RLS protègent les données :
- Les utilisateurs ne peuvent voir que leur propre profil (ou profils publics si applicable)
- Le role_id est assigné automatiquement via `get_default_user_role()`

## Sécurité

### Stockage sécurisé

- **Mobile (iOS/Android)** : Les tokens sont stockés dans **SecureStore** (keychain/keystore)
- **Web** : Les tokens sont stockés dans **localStorage**

### Auto-refresh des tokens

Supabase gère automatiquement le refresh des tokens JWT grâce à la configuration :

```typescript
auth: {
  autoRefreshToken: true,
  persistSession: true,
}
```

## Déconnexion

```typescript
const { signOut } = useAuth();

await signOut();
// L'utilisateur sera automatiquement redirigé vers /sign-in
```

## Gestion des erreurs

Toutes les erreurs d'authentification sont catchées et affichées via `Alert.alert()`.

Exemple :
```typescript
try {
  await signInWithGoogle();
} catch (error) {
  Alert.alert('Erreur', 'Impossible de se connecter.');
}
```

## Extension future

Pour ajouter d'autres méthodes d'authentification :

1. Ajouter la méthode dans `AuthContext` (ex: `signInWithEmail()`)
2. Ajouter le bouton dans `sign-in.tsx` et `sign-up.tsx`
3. Activer le provider dans Supabase Dashboard

## Debugging

Pour déboguer l'authentification, utiliser Supabase Dashboard > Authentication > Users pour voir les utilisateurs enregistrés.
