# CLAUDE.md

## Purpose

This file serves as the primary memory source for Claude Code when working with this repository. It contains essential application context, architecture overview, and workflow instructions that must be committed to memory at the start of each session.

## Read Order

When starting a session, read these files in order:

1. **CLAUDE.md** - Commit to memory (core application context)
2. **CLAUDE_DEV_STANDARDS.md** - Commit to memory (development standards)
3. **CLAUDE_SESSION_HANDOFF.md** - Manage memory as needed (current session state)
4. **CLAUDE_PROJECT_NOTES.md** - Manage memory as needed (project history)
5. **CLAUDE_ACTIVE.md** - Manage memory as needed (temporary working notes)

---

## Project Overview

**Lift 3-2-1** is a brand new React Native + TypeScript fitness tracking app built from scratch. This is NOT a code migration from Will's 3-2-1 (vanilla JavaScript web app). Will's 3-2-1 serves ONLY as a reference for patterns, concepts, and design philosophy.

### Critical Context
- **Location**: `C:\Dev\Lift321`
- **Will's 3-2-1 Location**: `C:\Dev\Wills321` (UNTOUCHED - reference only)
- **Supabase**: Brand new project (NOT using Will's 3-2-1 Supabase)
- **Current Branch**: Claude-v1.0.0
- **Current Version**: 1.0.0 - Foundation Complete

### What This Is
- Brand new React Native + TypeScript mobile app
- Built from scratch with modern best practices
- Inspired by lessons learned from Will's 3-2-1

### What This Is NOT
- NOT a migration of Will's 3-2-1 code
- NOT a conversion from JavaScript to TypeScript
- NOT using Will's 3-2-1 Supabase project
- NOT recreating Will's 3-2-1 specific design values

---

## Technology Stack

- **React Native**: 0.82.1 (native iOS/Android apps)
- **TypeScript**: Strict mode enabled
- **Backend**: Supabase (brand new project)
- **Navigation**: React Navigation with type-safe routes
- **State Management**: Context API + Hooks
- **Styling**: StyleSheet + Design Tokens (no NativeWind)

### Dependencies
- Total: 891 packages, 0 vulnerabilities
- Key packages: Supabase, React Navigation, AsyncStorage, react-native-dotenv

---

## Architecture Overview

### Folder Structure (Feature-Based)
```
src/
├── features/          # Feature-based architecture (NOT file-type based)
│   ├── auth/          # Authentication feature
│   │   ├── screens/
│   │   ├── components/
│   │   ├── context/   # AuthContext + useAuth hook
│   │   ├── services/  # authService (business logic)
│   │   └── types/
│   ├── workouts/      # Workout logging feature
│   ├── plans/         # Training programs feature
│   └── history/       # Workout history feature
│
├── components/        # Shared components (global use only)
├── theme/            # Design token system (GLOBAL)
├── navigation/       # React Navigation setup
├── contexts/         # Global contexts only
├── services/         # Global services (Supabase client)
├── hooks/            # Shared custom hooks
├── types/            # Global TypeScript types
├── utils/            # Utility functions
└── assets/           # Images, fonts
```

### Design Token System
**Critical**: All styling must go through `theme.*` tokens. NO magic numbers or hard-coded colors.

**Token Structure**:
- `theme.colors.*` - Semantic color palette (`actionSuccess`, not `greenButton`)
- `theme.spacing.*` - Spacing scale
- `theme.typography.*` - Font sizes, weights
- `theme.textStyles.*` - Pre-built text style combinations

**Important Note**: Token values are PLACEHOLDERS to be refined during UI development. We're NOT recreating Will's 3-2-1 specific design values. The token **system** (architecture/pattern) is what we're establishing.

```typescript
// ✅ CORRECT
import { theme } from '@theme';
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.backgroundCard,
  },
});

// ❌ WRONG
const styles = StyleSheet.create({
  container: {
    padding: 16,  // Magic number
    backgroundColor: '#333333',  // Hard-coded color
  },
});
```

---

## Core Patterns (MUST FOLLOW)

### 1. Context + Custom Hook Pattern
**Required**: Always expose Context via custom hook with memoization.

```typescript
const MyContext = createContext<MyContextValue | undefined>(undefined);

export const MyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  const myMethod = useCallback(async (param: string) => {
    // Implementation
  }, []);

  const value = useMemo(() => ({ state, myMethod }), [state, myMethod]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// ALWAYS expose via custom hook - never useContext directly
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within MyProvider');
  return context;
};
```

### 2. Service Layer Pattern
**Required**: Never query Supabase directly from components. Always through services.

```typescript
// features/auth/services/authService.ts
export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },
};

// features/auth/context/AuthContext.tsx
const signIn = useCallback(async (email: string, password: string) => {
  const user = await authService.signIn(email, password);
  setUser(user);
}, []);
```

### 3. Absolute Imports
**Required**: All imports use `@/` path aliases. NO relative imports.

```typescript
// ✅ CORRECT
import { Button } from '@components/Button';
import { theme } from '@theme';
import { useAuth } from '@features/auth/context/AuthContext';

// ❌ WRONG
import { Button } from '../../../components/Button';
```

### 4. TypeScript Strict Mode
**Required**: No `any` types unless absolutely necessary.

```typescript
// ✅ CORRECT
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => { };

// ❌ WRONG
const Button = (props) => { };  // props is 'any'
```

---

## Critical Standards

1. **NO Magic Numbers** - Always use design tokens
2. **NO Hard-Coded Colors** - Always use theme.colors.*
3. **NO Relative Imports** - Always use @/ aliases
4. **NO `any` Types** - Strict TypeScript
5. **NO Direct Database Queries** - Use service layer
6. **ALWAYS Memoize** - Context values (useMemo) and callbacks (useCallback)
7. **ALWAYS Use Custom Hooks** - Never useContext directly

---

## Philosophy (Preserved from Will's 3-2-1)

### SUPER STUPID SIMPLE (SSS)
- User experience must be effortless and guided
- Remove complexity, avoid feature creep
- Every interaction should be obvious

### REMOVE, DON'T ADD
- When faced with complexity, simplify or remove
- Fewer features done well > many features done poorly

### Design Token System Pattern
- Will's 3-2-1: CSS variables (`--space-m: 16px`)
- Lift 3-2-1: TypeScript tokens (`theme.spacing.m`)
- Same philosophy: global, semantic, no magic numbers

### Service Layer Pattern
- Will's 3-2-1: `services/` folder with business logic separate from UI
- Lift 3-2-1: Same pattern - services/ at global level and per-feature

---

## File Naming Conventions

- **Components**: PascalCase.tsx (`WorkoutCard.tsx`)
- **Files/Folders**: camelCase (`authService.ts`, `workoutUtils.ts`)
- **Hooks**: Always start with "use" (`useAuth.ts`, `useWorkout.ts`)
- **Types**: PascalCase with .types.ts suffix (`workout.types.ts`)
- **Services**: camelCase with Service suffix (`authService.ts`)

---

## Git Workflow

**Branch Naming**: Claude-vX.X.X
**Current Branch**: Claude-v1.0.0
**Main Branch**: main
**Commit Policy**: Do not commit unless explicitly requested by user

---

## Current State (v1.0.0)

### What's Complete ✅
- React Native 0.82.1 initialized with TypeScript
- All dependencies installed (891 packages)
- Complete folder structure (feature-based)
- Design token system (architecture in place, values are placeholders)
- TypeScript and Babel configuration (absolute imports)
- Supabase client setup
- Navigation type definitions
- AuthContext template
- Comprehensive documentation

### What's NOT Complete (Intentionally) ⏳
- UI components (Button, Card, Input, Selector)
- Screen implementations
- Business logic (AuthContext methods are stubs)
- Supabase database schema
- Database type generation
- Navigation flow

---

## Next Steps

1. **Set up Supabase** (user task)
   - Create new project at https://supabase.com
   - Update `.env` with credentials
   - Design database schema
   - Generate types: `npx supabase gen types typescript --project-id "your-id"`

2. **Build shared components**
   - Button (primary, secondary, danger variants)
   - Card (workout card, plan card)
   - Input (email, password, number)
   - Selector (exercise selector)

3. **Implement authentication**
   - Complete AuthContext methods (signIn, signUp, signOut)
   - Build Login and SignUp screens
   - Add session persistence checks

---

## Important Reminders

- **Will's 3-2-1 is untouched** - Reference only, NOT source code
- **Design token values are placeholders** - Will evolve with UI development
- **Service layer is required** - No direct backend queries from components
- **Context hooks are required** - Never expose Context directly
- **Absolute imports are required** - No relative paths

---

**Version**: 1.0.0
**Last Updated**: 2025-11-09
**Status**: Foundation Complete - Ready for Feature Development
