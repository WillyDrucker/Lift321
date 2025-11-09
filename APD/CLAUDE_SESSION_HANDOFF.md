# CLAUDE SESSION HANDOFF - Lift 3-2-1

## Current Session State

**Date**: 2025-11-09
**Branch**: Claude-v5.6.9
**Status**: Foundation Complete - Ready for Feature Development
**React Native Version**: 0.82.1
**Total Packages**: 891 (0 vulnerabilities)

## Project Context

**Lift 3-2-1** is a brand new React Native + TypeScript fitness tracking app built from scratch. This is NOT a code migration from Will's 3-2-1 (vanilla JavaScript web app). Will's 3-2-1 is used ONLY as a reference for patterns, concepts, and design philosophy.

**Important**:
- Brand new codebase at `C:\Dev\Lift321`
- Brand new Supabase project (not using Will's 3-2-1 Supabase)
- NO code migration, NO code conversion
- Will's 3-2-1 at `C:\Dev\Wills321` remains completely untouched

## What's Been Completed ✅

### 1. Foundation & Configuration
- ✅ React Native 0.82.1 initialized with TypeScript
- ✅ All dependencies installed (Supabase, Navigation, AsyncStorage, etc.)
- ✅ TypeScript strict mode configured (`tsconfig.json`)
- ✅ Babel configured for absolute imports (`babel.config.js`)
- ✅ Environment variables configured (`.env`)

### 2. Folder Structure
Complete feature-based architecture created:
```
src/
├── features/          # Feature-based architecture
│   ├── auth/          # screens/, components/, context/, services/, types/
│   ├── workouts/      # screens/, components/, hooks/, context/, services/, types/
│   ├── plans/         # screens/, components/, hooks/, context/, services/, types/
│   └── history/       # screens/, components/, types/
├── components/        # Shared components (global use)
├── theme/            # Design token system (GLOBAL)
├── navigation/       # React Navigation setup
├── contexts/         # Global contexts
├── services/         # Global services (Supabase client)
├── hooks/            # Shared custom hooks
├── types/            # Global TypeScript types
├── utils/            # Utility functions
└── assets/           # Images, fonts, etc.
```

### 3. Design Token System (CRITICAL - GLOBAL FROM START)
Complete theme system created:
- ✅ `theme/colors.ts` - Semantic color palette (`actionSuccess`, not `greenButton`)
- ✅ `theme/spacing.ts` - 16px base rhythm (preserved from Will's 3-2-1)
- ✅ `theme/typography.ts` - Font sizes, weights, pre-built text styles
- ✅ `theme/tokens.ts` - Main theme export

**Usage**:
```typescript
import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,  // 16px
    backgroundColor: theme.colors.backgroundCard,
  },
});
```

### 4. Supabase Integration
- ✅ Supabase client configured (`services/supabase/client.ts`)
- ✅ AsyncStorage persistence for sessions
- ✅ Database types placeholder (`database.types.ts`)

**Next**: User needs to create Supabase project and update `.env` file.

### 5. Navigation
- ✅ Type-safe route definitions (`navigation/types.ts`)
- ✅ Global navigation types configured

### 6. Context Architecture
- ✅ AuthContext template created showing proper pattern:
  - Context + custom hook (never expose Context directly)
  - Memoization with `useMemo` and `useCallback`
  - Error handling if used outside provider

### 7. Documentation
- ✅ CLAUDE_DEV_STANDARDS.md - Comprehensive coding standards
- ✅ README.md - Project overview and setup guide
- ✅ CLAUDE_SESSION_HANDOFF.md - This file

## What's NOT Complete (Intentionally) ⏳

This is a **foundation/scaffolding project**. The following are intentionally NOT implemented:

### UI & Components
- ⏳ Shared components (Button, Card, Input, Selector)
- ⏳ Screen implementations (Login, WorkoutList, etc.)
- ⏳ App layout and navigation flow

### Business Logic
- ⏳ AuthContext implementation (signIn, signUp, signOut methods are stubs)
- ⏳ Workout context and state management
- ⏳ Plans context and state management
- ⏳ Service layer implementations (authService, workoutService, etc.)

### Backend
- ⏳ Supabase project setup (database schema, tables, RLS policies)
- ⏳ Generated database types (placeholder exists)
- ⏳ Authentication configuration

## Architectural Patterns Established

### 1. Design Token System (GLOBAL FROM START)
**Critical**: ALL styling must go through `theme.*` tokens. NO magic numbers or hard-coded colors.

```typescript
// ✅ CORRECT
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,  // 16px from global token
    backgroundColor: theme.colors.backgroundCard,
  },
});

// ❌ WRONG - Will be rejected
const styles = StyleSheet.create({
  container: {
    padding: 16,  // Magic number
    backgroundColor: '#333333',  // Hard-coded color
  },
});
```

### 2. Semantic Naming Convention
Purpose-driven naming, not literal/descriptive.

```typescript
// ✅ CORRECT - Semantic (purpose)
colors.actionSuccess  // Confirms, completes
colors.actionDanger   // Deletes, errors
styles.buttonPrimary  // Primary action

// ❌ WRONG - Literal (appearance)
colors.greenButton    // Describes color
colors.redText        // Describes appearance
styles.bigButton      // Describes size
```

### 3. Context + Custom Hook Pattern
**Required**: Always expose Context via custom hook with memoization.

```typescript
// === CONTEXT ===
const MyContext = createContext<MyContextValue | undefined>(undefined);

// === PROVIDER ===
export const MyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  // Memoize callbacks to prevent unnecessary re-renders
  const myMethod = useCallback(async (param: string) => {
    // Implementation
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({ state, myMethod }),
    [state, myMethod]
  );

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// === CUSTOM HOOK ===
// THIS is what components import - never useContext directly
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};
```

### 4. Service Layer Pattern
**Required**: Never query Supabase (or any backend) directly from components. Always through services.

```typescript
// features/auth/services/authService.ts - Business logic layer
export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  },
};

// features/auth/context/AuthContext.tsx - State management layer
const signIn = useCallback(async (email: string, password: string) => {
  const user = await authService.signIn(email, password);  // ← Calls service
  setUser(user);
}, []);
```

### 5. Absolute Imports
**Required**: All imports use `@/` path aliases. NO relative imports.

```typescript
// ✅ CORRECT
import { Button } from '@components/Button';
import { theme } from '@theme';
import { useAuth } from '@features/auth/context/AuthContext';

// ❌ WRONG
import { Button } from '../../../components/Button';
import { theme } from '../../theme';
```

### 6. TypeScript Strict Mode
**Required**: No `any` types unless absolutely necessary.

```typescript
// ✅ CORRECT - Explicit types
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => { };

// ❌ WRONG - Implicit any
const Button = (props) => { };  // props is 'any'
```

### 7. File Header Format
All files should use this standard header:

```typescript
// ==========================================================================
// COMPONENT/FILE NAME
//
// Brief description of purpose and role.
// Additional context about architecture or patterns.
//
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================

import React from 'react';
// ... imports

// === TYPES ===

// === COMPONENT ===

// === STYLES ===
```

## Key Decisions Made

### Technology Stack
- **React Native 0.82.1**: TypeScript is default (no template flag needed)
- **StyleSheet + Design Tokens**: NOT NativeWind or Styled Components
- **Context API + Hooks**: NOT Redux or MobX
- **Supabase**: Brand new project, NOT Will's 3-2-1 Supabase

### Folder Structure
- **Feature-based**: NOT file-type based (no src/components/, src/screens/ at root)
- **2-3 levels deep maximum**: Balance between organization and complexity

### Design Tokens
- **16px base rhythm**: Preserved from Will's 3-2-1 (`theme.spacing.m = 16px`)
- **Semantic naming**: `actionSuccess`, NOT `greenButton`
- **Global from start**: All tokens defined before any component creation

### Naming Conventions
- **Components**: PascalCase.tsx (`WorkoutCard.tsx`)
- **Files/Folders**: camelCase (`authService.ts`, `workoutUtils.ts`)
- **Hooks**: Always start with "use" (`useAuth.ts`, `useWorkout.ts`)

## Critical Standards to Maintain

### 1. NO Magic Numbers
Every spacing, size, or dimension must use design tokens.

### 2. NO Hard-Coded Colors
Every color must come from `theme.colors.*`.

### 3. NO Relative Imports
Every import must use `@/` path aliases.

### 4. NO Direct Database Queries
Every backend call must go through service layer.

### 5. NO Exposed Contexts
Every context must be exposed via custom hook only.

### 6. NO `any` Types
TypeScript strict mode enforced - explicit types required.

## Next Steps for Development

### Immediate (Foundation Complete)
1. ✅ Create documentation files (CLAUDE_DEV_STANDARDS.md, README.md, this file)
2. ⏳ Create CLAUDE_PROJECT_NOTES.md (version changelog)
3. ⏳ Create CLAUDE_ACTIVE.md (working notes)
4. ⏳ Make initial Git commit

### Short-term (Shared Components)
1. Create Button component (primary, secondary, danger variants)
2. Create Card component (workout card, plan card)
3. Create Input component (email, password, number)
4. Create Selector component (exercise selector matching Will's 3-2-1 pattern)

### Medium-term (Backend Setup)
1. Create Supabase project at https://supabase.com
2. Design database schema (users, workouts, plans, sessions, exercises, sets)
3. Generate TypeScript types: `npx supabase gen types typescript --project-id "your-id"`
4. Configure Row Level Security (RLS) policies

### Long-term (Feature Implementation)
1. Implement authentication (AuthContext methods, Login/SignUp screens)
2. Build workout logging (create, edit, complete workouts)
3. Build training plans (view, select, track progress)
4. Build workout history (view past sessions, statistics)
5. Create AppNavigator with auth flow and protected routes

## Common Patterns Reference

### Creating a New Feature
1. Create folder: `src/features/myFeature/`
2. Add subfolders: `screens/`, `components/`, `hooks/`, `context/`, `services/`, `types/`
3. Create service first: `services/myFeatureService.ts`
4. Create types: `types/myFeature.types.ts`
5. Create context: `context/MyFeatureContext.tsx` (with custom hook)
6. Create screens: `screens/MyFeatureScreen.tsx`
7. Add route to `navigation/types.ts`

### Creating a New Component
1. Use PascalCase filename: `MyComponent.tsx`
2. Add file header with description
3. Define props type with `type` (not `interface`)
4. Use `React.FC<PropsType>` pattern
5. Organize with section comments (TYPES, COMPONENT, STYLES)
6. Use design tokens for ALL styling

### Creating a New Screen
1. Place in feature folder: `features/myFeature/screens/MyScreen.tsx`
2. Add route to `navigation/types.ts`
3. Use `RootStackScreenProps<'MyScreen'>` for props type
4. Access route params: `const { paramName } = route.params;`

## Philosophy Preserved from Will's 3-2-1

### SUPER STUPID SIMPLE (SSS)
- User experience must be effortless and guided
- Remove complexity, avoid feature creep
- Every interaction should be obvious

### REMOVE, DON'T ADD
- When faced with complexity, simplify or remove
- Fewer features done well > many features done poorly

### Design Token System
- Will's 3-2-1 used CSS variables (`--space-m: 16px`)
- Lift 3-2-1 uses TypeScript tokens (`theme.spacing.m`)
- Same philosophy: global, semantic, no magic numbers

### 16px Base Rhythm
- Will's 3-2-1 used 16px as primary spacing unit
- Lift 3-2-1 preserves this: `theme.spacing.m = 16px`

### Semantic Naming
- Will's 3-2-1 used `--color-primary`, `--action-danger` (purpose)
- Lift 3-2-1 uses `theme.colors.primary`, `theme.colors.actionDanger` (same philosophy)

### Service Layer
- Will's 3-2-1 had `services/` folder with business logic separate from UI
- Lift 3-2-1 maintains this: `services/` at global level and per-feature

## Handoff Checklist

When handing off to next session:

- [ ] Branch is correct (shown in VS Code bottom-left)
- [ ] Git status is clean (or documented if changes exist)
- [ ] All standards documented in CLAUDE_DEV_STANDARDS.md
- [ ] Current state documented in this file (CLAUDE_SESSION_HANDOFF.md)
- [ ] Next steps clearly defined
- [ ] No uncommitted changes unless documented

## Important Reminders

- **Will's 3-2-1 is untouched** - reference only, NOT source code
- **Lift 3-2-1 is brand new** - fresh codebase, fresh Supabase project
- **Design tokens are critical** - enforce from the start
- **Service layer is required** - no direct backend queries from components
- **Context hooks are required** - never expose Context directly
- **Absolute imports are required** - no relative paths

---

**Last Updated**: 2025-11-09
**Session**: Foundation Complete - Documentation Phase
