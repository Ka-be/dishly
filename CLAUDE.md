# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dishly is a mobile-first recipe management application that allows users to create, store, and follow cooking recipes step-by-step. The app focuses on a unique "cooking mode" experience with timer management and swipeable steps.

**Key Features:**
- Create and manage personal recipe library
- Step-by-step cooking mode with integrated timers
- Ingredient quantity adjustment based on servings
- Social aspect: share public recipes
- Future: Recipe scraping from external websites

**Tech Stack:**
- **Frontend**: React Native (0.79.3), Expo SDK 52+, React 19.0.0
- **UI Library**: Tamagui v1.128.1 for cross-platform components
- **Navigation**: Expo Router (file-based routing)
- **Backend**: Supabase (PostgreSQL, Auth, Storage, PostgREST API)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm

---

## Architecture

### Stack Overview

**Frontend (Client):**
- React Native with Expo
- Expo Router for file-based navigation
- Tamagui for cross-platform UI (iOS, Android, Web)
- @supabase/supabase-js for backend communication
- TypeScript strict mode

**Backend (Supabase):**
- PostgreSQL managed database with Row Level Security (RLS)
- Supabase Auth (Google OAuth, Email/Password)
- Supabase Storage for recipe and step images
- PostgREST API (auto-generated REST API)
- Edge Functions (optional, for complex business logic)

**Development:**
- Supabase CLI for local development
- Expo CLI for frontend development
- Docker (used by Supabase CLI automatically)

### Architecture Diagram

See `/documentation/concept/diagrams/architecture.puml` for the complete architecture diagram.

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

---

## Project Structure

```
/client                  # Expo React Native app (iOS, Android, Web)
  /app                   # Expo Router pages (file-based routing)
    /(tabs)              # Tab navigation group
      ├── index.tsx      # Home screen (public recipes feed)
      ├── myRecipes.tsx  # User's personal recipes
      └── newRecipe.tsx  # Create new recipe form
    ├── _layout.tsx      # Root layout with auth context
    └── recipeDetail.tsx # Recipe detail page
  /components            # Reusable UI components
    /ui                  # Base UI components (Button, Input, Card)
    /recipe              # Recipe-specific components
    /timer               # Timer components for cooking mode
  /lib                   # Utilities, helpers, Supabase client
  /types                 # TypeScript type definitions
  /@types                # Additional type definitions
  /constants             # App constants (Colors, etc.)
  /hooks                 # Custom React hooks
  /mock                  # Mock data for development
  /assets                # Images, fonts, static files
  
/documentation           # Project documentation
  /images/               # Documentation images
  /concept/              # Conceptual documentation
    /diagrams/           # PlantUML diagrams (.puml + generated .png)
      ├── activity_cooking.puml
      ├── activity_create_recipe.puml
      ├── architecture.puml
      ├── erd.puml
      ├── sequence_cooking.puml
      ├── sequence_create_recipe.puml
      ├── sequence_login.puml
      └── usecases.puml
  └── SPECIFICATIONS.md  # Complete project specifications (v2.0)
```

---

## Development Commands

### Expo Client (`/client`)

All commands must be run from the `client/` directory:

```bash
# Install dependencies
pnpm install

# Start Expo development server
pnpm start
# or
npx expo start

# Platform-specific development
pnpm android    # Start on Android emulator
pnpm ios        # Start on iOS simulator
pnpm web        # Start on web

# Lint code
pnpm lint

# Type checking
npx tsc --noEmit
```

### Supabase (Local Development)

```bash
# Start local Supabase stack
supabase start

# Stop local Supabase stack
supabase stop

# Reset database (WARNING: deletes all data)
supabase db reset

# Generate TypeScript types from database schema
supabase gen types typescript --local > client/lib/database.types.ts

# Run migrations
supabase db push

# Access local services:
# - Supabase Studio: http://localhost:54323
# - PostgreSQL: postgresql://postgres:postgres@localhost:54322/postgres
# - PostgREST API: http://localhost:54321
```

---

## Database Schema

See `/documentation/concept/diagrams/erd.puml` for the complete ERD diagram and `/documentation/SPECIFICATIONS.md` for detailed table descriptions.

### Key Tables

**Authentication:**
- `auth.users` - Managed by Supabase Auth (built-in)
- `profiles` - Extended user information (firstname, lastname, avatar_url, role_id)
- `roles` - User roles (user, admin)

**Recipes:**
- `recipes` - Main recipe table (title, description, image_url, servings, prep_time, cook_time, is_public, user_id)
- `ingredients` - Ingredient reference table (name)
- `recipe_ingredients` - Recipe-ingredient junction with quantities (recipe_id, ingredient_id, quantity, unit_id)
- `units` - Measurement units (name, abbreviation) - e.g., grams (g), liters (L), tablespoons (c.à.s)
- `steps` - Recipe steps with order, description, image_url, timer (in seconds)
- `tags` - Tags for recipes (vegetarian, quick, gluten-free, etc.)
- `categories` - Recipe categories (Entrée, Plat, Dessert, Accompagnement, Boisson, Sauce)

**Relations:**
- `recipe_tags` - Many-to-many recipe-tag (composite PK: recipe_id, tag_id)
- `recipe_categories` - Many-to-many recipe-category (composite PK: recipe_id, category_id)
- `user_favorites` - User favorite recipes (user_id, recipe_id with unique constraint)

### Row Level Security (RLS)

All tables use RLS policies to ensure data security:
- Users can only view their own private recipes
- Public recipes (`is_public = true`) are visible to everyone
- Admins can view all recipes (public and private)
- Users can only modify/delete their own data
- Admins can modify/delete any data

Example policy (see `/documentation/SPECIFICATIONS.md` for complete policies):
```sql
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
```

---

## Key User Flows

### 1. Recipe Creation Flow

See `/documentation/concept/diagrams/activity_create_recipe.puml` for the complete activity diagram.

**Steps:**
1. User fills recipe form (title, description, photo, servings)
2. Adds ingredients with quantities and units
3. Creates steps with descriptions, optional images, and timers
4. Adds tags and categories (optional)
5. Sets visibility (public/private)
6. Saves recipe → All data inserted in transaction

**Validation Rules:**
- Title: minimum 3 characters
- At least 1 ingredient required
- At least 1 step required
- Servings: >= 1
- Times: >= 0 or null

### 2. Cooking Mode (Step-by-Step)

**This is the core feature of Dishly.**

See `/documentation/concept/diagrams/activity_cooking.puml` and `/documentation/concept/diagrams/sequence_cooking.puml` for complete diagrams.

**User Experience:**
1. User opens a recipe
2. Views "Ingrédients" tab (can adjust quantities based on servings)
3. Switches to "Étapes" tab
4. Activates "Cooking Mode" (Mode Pas-à-Pas)
5. Views one step at a time (fullscreen, swipeable like Instagram Stories)
6. Can start timers on steps with cooking times
7. Timers stack in top bar and run in background
8. Receives notifications + vibration when timers complete
9. Swipes through steps at own pace
10. Completes recipe with success message

**Key UX Principles:**
- One step per screen (no distractions, perfect for cooking)
- Simple swipe navigation (right = next step, left = previous step)
- Timers persist across steps (continue running in background)
- Multiple timers can run simultaneously (stacked in top bar)
- Clear visual feedback and notifications
- Mobile-optimized for kitchen use (large text, touch-friendly)

**Timer Behavior:**
- User arrives at step with timer → Button "Démarrer timer (20 min)"
- Clicks button → Timer starts and is added to top bar
- User can swipe to other steps → Timer continues in background
- Timer reaches 0 → Notification + vibration + popup message
- Timer shows step name/number for context

### 3. Google OAuth Authentication

See `/documentation/concept/diagrams/sequence_login.puml` for the complete sequence diagram.

**Flow:**
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth consent screen
3. User authorizes the app
4. Supabase receives token and user info (email, name, photo)
5. Creates/updates profile in `profiles` table
6. Returns JWT session to app
7. App stores session securely (SecureStore on mobile, localStorage on web)
8. User redirected to home screen

---

## Component Organization

### Expo Router File-Based Navigation

Current structure (from existing code):
```
/app
  /_layout.tsx              # Root layout (theme provider, auth context)
  /(tabs)/_layout.tsx       # Tab navigation layout
  /(tabs)/index.tsx         # Home (public recipes feed)
  /(tabs)/myRecipes.tsx     # User's personal recipes
  /(tabs)/newRecipe.tsx     # Create new recipe form
  /recipeDetail.tsx         # Recipe detail view
```

Future additions:
```
  /cookingMode.tsx          # Step-by-step cooking mode
  /login.tsx                # Login/signup screen
  /profile.tsx              # User profile
  /(auth)/                  # Auth-related screens group
```

### Component Structure

Current components:
```
/components
  /ui
    ├── AddButton.tsx          # Floating action button
    ├── IconSymbol.tsx         # Icon wrapper component
    └── TabBarBackground.tsx   # Tab bar styling
```

Planned components (from specs):
```
  /recipe               
    ├── RecipeCard.tsx         # Recipe preview card (already in mock UI)
    ├── RecipeForm.tsx         # Recipe creation/edit form
    ├── IngredientsList.tsx    # Ingredient list with quantity adjustment
    ├── StepsList.tsx          # Steps list (edit mode with drag & drop)
    └── StepSlider.tsx         # Swipeable step view (cooking mode)
  /timer
    ├── TimerBar.tsx           # Top bar showing active timers
    └── TimerButton.tsx        # Start/stop timer button
```

### Responsive Design

The `useResponsive` hook (`hooks/useResponsive.ts`) handles responsive layouts:
- **Mobile** (<768px): 1 column
- **Tablet** (768-1024px): 2 columns
- **Desktop** (>1024px): 4 columns
- Calculates dynamic card widths based on screen dimensions

---

## Supabase Client Setup

**File:** `/client/lib/supabase.ts` (to be created)

```typescript
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { Database } from './database.types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

// Custom storage adapter for Expo
// - SecureStore on mobile (iOS/Android)
// - localStorage on web
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      return Promise.resolve(localStorage.getItem(key))
    }
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value)
      return Promise.resolve()
    }
    return SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key)
      return Promise.resolve()
    }
    return SecureStore.deleteItemAsync(key)
  },
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
```

---

## Authentication Patterns

```typescript
// Sign in with Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'dishly://auth/callback',
  },
})

// Sign in with Email/Password
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})

// Get current session
const { data: { session } } = await supabase.auth.getSession()

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    // User signed in
  } else if (event === 'SIGNED_OUT') {
    // User signed out
  }
})
```

---

## Data Fetching Patterns

### Fetch Public Recipes with Relations

```typescript
const { data: recipes, error } = await supabase
  .from('recipes')
  .select(`
    *,
    profiles:user_id (
      firstname,
      lastname,
      avatar_url
    ),
    recipe_ingredients (
      quantity,
      ingredients (name),
      units (name, abbreviation)
    ),
    steps (
      order,
      description,
      image_url,
      timer
    ),
    recipe_tags (
      tags (name)
    ),
    recipe_categories (
      categories (name)
    )
  `)
  .eq('is_public', true)
  .order('created_at', { ascending: false })
```

### Fetch User's Own Recipes

```typescript
const { data: { user } } = await supabase.auth.getUser()

const { data: recipes, error } = await supabase
  .from('recipes')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

### Create Recipe with Relations (Transaction)

```typescript
// 1. Insert recipe
const { data: recipe, error } = await supabase
  .from('recipes')
  .insert({
    title: 'My Recipe',
    description: 'Delicious recipe',
    servings: 4,
    prep_time: 15,
    cook_time: 30,
    is_public: true,
    user_id: user.id
  })
  .select()
  .single()

if (error) throw error

// 2. Insert ingredients
const { error: ingredientsError } = await supabase
  .from('recipe_ingredients')
  .insert(
    ingredients.map(ing => ({
      recipe_id: recipe.id,
      ingredient_id: ing.id,
      quantity: ing.quantity,
      unit_id: ing.unit_id
    }))
  )

if (ingredientsError) throw ingredientsError

// 3. Insert steps
const { error: stepsError } = await supabase
  .from('steps')
  .insert(
    steps.map((step, index) => ({
      recipe_id: recipe.id,
      order: index + 1,
      description: step.description,
      image_url: step.image_url,
      timer: step.timer
    }))
  )

if (stepsError) throw stepsError

// 4. Insert tags
if (tags.length > 0) {
  const { error: tagsError } = await supabase
    .from('recipe_tags')
    .insert(
      tags.map(tag => ({
        recipe_id: recipe.id,
        tag_id: tag.id
      }))
    )
  
  if (tagsError) throw tagsError
}
```

### Add Recipe to Favorites

```typescript
const { error } = await supabase
  .from('user_favorites')
  .insert({
    user_id: user.id,
    recipe_id: recipeId
  })

// Remove from favorites
const { error } = await supabase
  .from('user_favorites')
  .delete()
  .eq('user_id', user.id)
  .eq('recipe_id', recipeId)
```

---

## Image Upload Pattern

```typescript
import * as ImagePicker from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'

// Request permissions
const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
if (status !== 'granted') {
  alert('Permission denied')
  return
}

// Pick image
const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
})

if (!result.canceled) {
  const image = result.assets[0]
  
  // Convert to base64 for upload
  const response = await fetch(image.uri)
  const blob = await response.blob()
  const arrayBuffer = await blob.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
  
  // Upload to Supabase Storage
  const fileName = `${Date.now()}.jpg`
  const { data, error } = await supabase.storage
    .from('recipes')
    .upload(`public/${fileName}`, decode(base64), {
      contentType: 'image/jpeg',
    })
  
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('recipes')
    .getPublicUrl(`public/${fileName}`)
  
  // Use publicUrl in recipe
  console.log('Image URL:', publicUrl)
}
```

---

## Styling & Theming

### Dual Theme System

Defined in `/client/constants/Colors.ts`:
- Light theme
- Dark theme
- Accessed via `useColorScheme()` hook

### Tamagui Configuration

See `/client/tamagui.config.ts` for full configuration.

Tamagui provides:
- Cross-platform components (XStack, YStack, Card, Button, etc.)
- Theme tokens (colors, spacing, sizing)
- Responsive design utilities
- Compile-time optimizations

### Styling Approach

Mix of:
- **Tamagui components** for layout (XStack, YStack, Card, Stack)
- **StyleSheet.create()** for component-specific styles
- **Theme-aware styling** via `Colors[colorScheme]`
- **Responsive spacing** calculated in hooks

Example:
```typescript
import { YStack, XStack, Card } from 'tamagui'
import { StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'

const RecipeCard = ({ recipe }) => {
  const colorScheme = useColorScheme()
  
  return (
    <Card style={styles.card}>
      <YStack gap="$2">
        <Text style={{ color: Colors[colorScheme].text }}>
          {recipe.title}
        </Text>
      </YStack>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
  },
})
```

---

## Type Definitions

### Current Types (from `/@types/recipe.ts`)

```typescript
export type Recipe = {
  id: string
  name: string
  description: string
  image: string
  cookingTime: string
  difficulty: 'Facile' | 'Moyen' | 'Difficile'
  portions: number
  cuisineType: string
  dietaryRestrictions: string[]
  likesCount: number
}
```

### Future Types (from Supabase schema)

Will be auto-generated via:
```bash
supabase gen types typescript --local > client/lib/database.types.ts
```

This creates TypeScript types for all database tables, ensuring type safety across the app.

---

## Environment Variables

Create `.env` file in `/client`:

```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For local development with Supabase CLI:
```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key
```

**Note:** Never commit `.env` to git. Add it to `.gitignore`.

---

## Testing Strategy

### Unit Tests (Jest)
- Test components rendering
- Test utility functions (date formatting, quantity calculations)
- Test form validations
- Test hooks (useResponsive, custom hooks)

### Integration Tests
- Test authentication flows (Google OAuth, email/password)
- Test CRUD operations (create, read, update, delete recipes)
- Test image uploads
- Test RLS policies (permissions)

### E2E Tests (Detox - optional)
- Test complete user journeys
- Test cooking mode flow (swipe, timers)
- Test recipe creation flow end-to-end

---

## Project Phases

### Current Phase: Phase 1 - Setup & Infrastructure

**Completed:**
- Basic UI with mock data
- Recipe listing and responsive design
- Architecture definition
- Specifications updated (v2.0)
- Documentation (diagrams, specs, CLAUDE.md)

**In Progress:**
- Supabase setup (project + database)
- Database schema migration
- Expo configuration for web
- Supabase client integration
- Google OAuth setup

### Phase 2 - CRUD Recettes (MVP)
- Create recipe (title, description, image, servings)
- Add ingredients with quantities
- Add steps with descriptions, images, timers
- Display complete recipe
- Edit recipe
- Delete recipe
- List all recipes (public + user's own)

### Phase 3 - User Features
- Favorites system
- Recipe search (title, ingredients, tags)
- Filters (categories, tags, prep time)
- User profile (edit firstname, lastname, avatar)
- Public/private visibility

### Phase 4 - Advanced UX
- Step-by-step cooking mode
- Integrated timers
- Auto-adjust quantities by servings
- Offline mode (local cache)
- Share recipes (link, PDF export)

### Phase 5 - Administration
- Admin dashboard
- Recipe moderation
- User management
- Usage statistics

### Phase 6 - Future Enhancements
- Import recipes from URLs (scraping)
- Fork recipes (create variants)
- Rating and comments system
- Recipe suggestions based on available ingredients
- Export/Import recipes (JSON, PDF)
- Smartwatch integration (Apple Watch, Wear OS)
- Collaborative mode (shared recipes with friends)
- Meal planning
- Auto-generated shopping lists

---

## Git Workflow

**Branches:**
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Critical fixes

**Commit Convention (Conventional Commits):**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process, dependencies

Example:
```bash
git commit -m "feat: add Google OAuth authentication"
git commit -m "fix: resolve timer notification bug"
git commit -m "docs: update CLAUDE.md with Supabase patterns"
```

---

## Useful Links

- **Supabase Docs**: https://supabase.com/docs
- **Expo Docs**: https://docs.expo.dev
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **Tamagui Docs**: https://tamagui.dev
- **React Native Docs**: https://reactnative.dev
- **Supabase JS Client**: https://supabase.com/docs/reference/javascript

---

## Important Files

- `/documentation/SPECIFICATIONS.md` - Complete project specifications (v2.0, French)
- `/documentation/concept/diagrams/erd.puml` - Entity Relationship Diagram
- `/documentation/concept/diagrams/architecture.puml` - Architecture diagram
- `/documentation/concept/diagrams/usecases.puml` - Use cases diagram
- `/client/app.json` - Expo configuration
- `/client/tamagui.config.ts` - Tamagui theme configuration
- `/client/@types/recipe.ts` - Current Recipe type definition (will be replaced by Supabase types)

---

## Next Steps

1. **Create Supabase project** (cloud or local)
2. **Run database migrations** (create all tables with RLS policies)
3. **Configure Google OAuth** in Supabase dashboard
4. **Install Supabase client** in Expo app
5. **Create Supabase client configuration** (`/client/lib/supabase.ts`)
6. **Setup authentication flow** (Google OAuth + session management)
7. **Replace mock data** with real Supabase queries
8. **Implement recipe CRUD operations**
9. **Build cooking mode UI** (step slider, timers)
10. **Test and iterate**

---

*Last updated: January 2025*  
*Version: 2.0*