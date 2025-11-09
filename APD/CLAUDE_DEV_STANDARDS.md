# CLAUDE DEVELOPMENT STANDARDS - Lift 3-2-1

## Purpose

This file contains development standards for Lift 3-2-1 React Native + TypeScript app. These standards guide all development work and ensure consistency. Apply these in real-time during implementation.

**Standards Application**: Development progress comes first. Apply these standards during implementation, but never let them block requested features. Standards can be refined after-the-fact.

**Adapted From**: Will's 3-2-1 vanilla JavaScript standards, evolved for React Native + TypeScript best practices.

---

## CORE PHILOSOPHY

- **SUPER STUPID SIMPLE (SSS)**: User experience must be effortless and guided
  - Remove complexity, avoid feature creep
- **REMOVE, DON'T ADD**: When faced with complexity, simplify or remove
- **Mobile-first design**: Touch-optimized, immediate UI responses, no hover states

## ACTIVE DEVELOPMENT STANDARDS

### 1. DESIGN TOKEN SYSTEM (GLOBAL FROM START)
**All styling through design tokens** - Never use magic numbers or hard-coded colors.

```typescript
// ✅ GOOD - Using design tokens
import { theme } from '@theme';
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,  // 16px
    backgroundColor: theme.colors.backgroundCard,
  },
});

// ❌ BAD - Magic numbers and hard-coded colors
const styles = StyleSheet.create({
  container: {
    padding: 16,  // What is this? Why 16?
    backgroundColor: '#333333',  // Literal color
  },
});
```

**Token Categories**:
- `theme.colors.*` - All colors (semantic names: `actionSuccess`, not `greenButton`)
- `theme.spacing.*` - All spacing (16px base rhythm)
- `theme.typography.*` - All font sizes, weights, line heights
- `theme.textStyles.*` - Pre-built text style combinations

### 2. SEMANTIC NAMING CONVENTION
Purpose-driven naming, not literal/descriptive naming.

**Components**: `PascalCase.tsx`
```typescript
// ✅ GOOD
WorkoutCard.tsx
ExerciseRow.tsx
PrimaryButton.tsx

// ❌ BAD
workout_card.tsx
exerciserow.tsx
GreenButton.tsx  // Literal color name
```

**Files/Folders**: `camelCase`
```typescript
// ✅ GOOD
authService.ts
workoutUtils.ts
useWorkout.ts  // Hooks always start with "use"

// ❌ BAD
AuthService.ts
workout-utils.ts
Workout.ts  // Non-component shouldn't be PascalCase
```

**Style Objects**: Semantic naming (purpose, not appearance)
```typescript
// ✅ GOOD
const styles = StyleSheet.create({
  actionButton: { },        // Purpose: action
  buttonDanger: { },        // Purpose: dangerous action
  textDisabled: { },        // State: disabled
});

// ❌ BAD
const styles = StyleSheet.create({
  redButton: { },           // Describes color, not purpose
  bigText: { },             // Describes appearance
});
```

### 3. TYPESCRIPT STRICT MODE
All files use strict TypeScript - no `any` types unless absolutely necessary.

**Type Everything**:
```typescript
// ✅ GOOD - Explicit types
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => { };

// ❌ BAD - Implicit any
const Button = (props) => { };  // props is 'any'
```

**Use `type` over `interface`** (React Native convention):
```typescript
// ✅ GOOD - Using 'type'
type WorkoutCardProps = {
  workout: Workout;
  onPress?: () => void;
};

// ⚠️ ACCEPTABLE - Using 'interface' (less common)
interface WorkoutCardProps {
  workout: Workout;
  onPress?: () => void;
}
```

### 4. FILE HEADER FORMAT
Use `//` comments (TypeScript convention), not `/* */`.

**Standard Header**:
```typescript
// ==========================================================================
// COMPONENT NAME
//
// Brief description of purpose and role.
// Additional context about architecture or patterns.
//
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================
```

**NO VERSION NUMBERS** in file headers (git tracks this).

### 5. COMPONENT STRUCTURE PATTERN
Organize components with clear section headers.

```typescript
// ==========================================================================
// WORKOUT CARD
//
// Displays workout summary with navigation to detail screen.
//
// Dependencies: Navigation, workout types, theme
// Used by: WorkoutListScreen
// ==========================================================================

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Workout } from '../types/workout.types';
import { theme } from '@theme';

// === TYPES ===

type WorkoutCardProps = {
  workout: Workout;
  onPress?: () => void;
};

// === COMPONENT ===

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onPress }) => {
  // === STATE ===
  const [pressed, setPressed] = React.useState(false);

  // === HOOKS ===
  const navigation = useNavigation();

  // === EVENT HANDLERS ===
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate('WorkoutDetail', { workoutId: workout.id });
    }
  };

  // === RENDER ===
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.title}>{workout.name}</Text>
    </Pressable>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.backgroundCard,
  },
  title: {
    ...theme.textStyles.bodyBold,
    color: theme.colors.textPrimary,
  },
});
```

### 6. CONTEXT ARCHITECTURE PATTERN
Separate contexts per feature, expose via custom hooks, memoize everything.

**Required Pattern**:
```typescript
// === CONTEXT ===
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// === PROVIDER ===
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Memoize callbacks
  const signIn = useCallback(async (email, password) => {
    // Implementation
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({ user, signIn }),
    [user, signIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// === CUSTOM HOOK ===
// Never use useContext directly - always through custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 7. SERVICE LAYER PATTERN
Never query Supabase (or any backend) directly from components. Always through services.

**Structure**:
```
features/
  auth/
    services/
      authService.ts  ← Business logic here
    context/
      AuthContext.tsx ← Calls authService
```

**Pattern**:
```typescript
// authService.ts - Business logic layer
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

// AuthContext.tsx - State management layer
const signIn = useCallback(async (email, password) => {
  const user = await authService.signIn(email, password);  // ← Calls service
  setUser(user);
}, []);
```

### 8. FOLDER STRUCTURE (FEATURE-BASED)
Organize by feature, not by file type.

```
src/
├── features/           # Feature-specific code
│   ├── auth/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── types/
│   ├── workouts/
│   └── plans/
├── components/         # Shared components only
├── theme/             # Design tokens (GLOBAL)
├── navigation/
├── contexts/          # Global contexts only
└── services/          # Global services (Supabase client)
```

### 9. ABSOLUTE IMPORTS (NO RELATIVE PATHS)
Use `@/` aliases for all imports.

```typescript
// ✅ GOOD - Absolute imports
import { Button } from '@components/Button';
import { theme } from '@theme';
import { useAuth } from '@features/auth/context/AuthContext';

// ❌ BAD - Relative imports
import { Button } from '../../../components/Button';
import { theme } from '../../theme';
```

### 10. JSDOC VS TYPESCRIPT TYPES
**Don't duplicate type information** - TypeScript already has it.

```typescript
// ❌ BAD - Duplicating types in JSDoc
/**
 * Calculate total volume
 * @param {Workout} workout - The workout object
 * @returns {number} Total volume
 */
function calculateVolume(workout: Workout): number { }

// ✅ GOOD - TypeScript types, JSDoc only for complex logic
/**
 * Calculate total volume for a workout.
 * Sums weight × reps for all sets across all exercises.
 * Skips incomplete or failed sets.
 */
function calculateVolume(workout: Workout): number { }
```

### 11. REACT NAVIGATION TYPE SAFETY
Always type navigation params and screen props.

**Define in `navigation/types.ts`**:
```typescript
export type RootStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string };  // Required param
  WorkoutSession: { workoutId: string; startWeek?: number };  // Optional param
};
```

**Use in screens**:
```typescript
import type { RootStackScreenProps } from '@navigation/types';

type Props = RootStackScreenProps<'WorkoutDetail'>;

export const WorkoutDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { workoutId } = route.params;  // ✅ Fully typed!
};
```

### 12. GIT BRANCH SYNCHRONIZATION
Always work on the branch shown in VS Code's bottom-left corner.

### 13. COMMIT POLICY
Do not commit unless explicitly requested by the user.

---

## KEY PATTERNS FROM WILL'S 3-2-1 (ADAPTED)

### Pattern: Semantic Color Naming
Will's 3-2-1 used `--color-primary`, `--action-danger`, etc. (purpose-driven).
Lift 3-2-1 uses `theme.colors.actionSuccess`, `theme.colors.actionDanger` (same philosophy).

### Pattern: 16px Base Rhythm
Will's 3-2-1 used `--space-m: 16px` as primary spacing.
Lift 3-2-1 uses `theme.spacing.m` (16px) - same system.

### Pattern: Service Layer
Will's 3-2-1 had services/ folder with business logic separate from UI.
Lift 3-2-1 maintains this - services/ at global level and per-feature.

### Pattern: Context + Hooks
Will's 3-2-1 had global `appState` with renderAll().
Lift 3-2-1 uses React Context + custom hooks (modern equivalent).

---

## CRITICAL REMINDERS

- **NO magic numbers** - Always use design tokens
- **NO hard-coded colors** - Always use theme.colors.*
- **NO relative imports** - Always use @/ aliases
- **NO `any` types** - Strict TypeScript
- **NO direct Supabase queries from components** - Use services
- **ALWAYS** memoize Context values (useMemo) and callbacks (useCallback)
- **ALWAYS** expose Contexts via custom hooks, never useContext directly

---

## DOCUMENTATION FLOW

- **CLAUDE_DEV_STANDARDS.md**: This file - coding standards
- **CLAUDE_SESSION_HANDOFF.md**: Session state and architectural patterns
- **CLAUDE_PROJECT_NOTES.md**: Version changelog and technical details
- **CLAUDE_ACTIVE.md**: Working notes and overflow

---

**Remember**: These standards exist to maintain consistency and quality, but NEVER let them block feature development. Standards can be applied after the fact.
