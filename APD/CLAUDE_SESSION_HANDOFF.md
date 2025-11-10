# CLAUDE SESSION HANDOFF

## Purpose

This file contains only critical architectural patterns and current session state needed if a session is interrupted. This is NOT a detailed history (see CLAUDE_PROJECT_NOTES.md for that). Focus on:
- Established architectural patterns that guide future work
- Current session state if work is in progress
- Known issues that affect development

**Documentation Flow**: Anything too detailed for SESSION_HANDOFF should be summarized here with full details provided in CLAUDE_PROJECT_NOTES.md. Anything too big for PROJECT_NOTES can go into CLAUDE_ACTIVE.md as an extension.

**Versioning Policy**: Documentation version numbers MUST match the current Git branch version. Only increment when creating a new branch. See CLAUDE_PROJECT_NOTES.md for full versioning policy.

---

## Current Version: 1.0.0

**Branch**: main
**Status**: Foundation Complete - Supabase Configured - Ready for Component Development
**Last Updated**: 2025-11-09

---

## Session State

### Current Work
- Foundation phase complete
- All documentation consolidated (CLAUDE.md merged into README.md)
- GitHub repository created and synced: https://github.com/WillyDrucker/Lift321
- Supabase project created and credentials configured in .env
- Metro bundler tested and running successfully (http://localhost:8081)
- User decided to skip database schema design for now
- Ready to build first components

### Completed This Session
- Combined CLAUDE.md into README.md (single source of truth)
- Pushed all code to GitHub (main and Claude-v1.0.0 branches)
- Configured Supabase credentials in .env file
- Verified Metro bundler runs successfully
- Discussed testing options (Android Studio vs physical device)

### Next Session Should
1. Read README.md first (core context and project documentation)
2. Read CLAUDE_DEV_STANDARDS.md (coding standards)
3. Build first shared components: Button, Input, Card
4. Components can be built and tested later when emulator is set up

### User Decisions Made
- Skip database schema design for now (will design when needed)
- Skip emulator setup for now (will set up Android Studio or use physical device later)
- Focus on building UI components first

---

## Established Architectural Patterns

### 1. Design Token System (ENFORCED)
**Critical**: ALL styling through `theme.*` tokens. NO magic numbers or hard-coded colors.

```typescript
// ✅ CORRECT - Using design tokens
import { theme } from '@theme';
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.backgroundCard,
  },
});

// ❌ WRONG - Magic numbers and hard-coded colors
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#333333',
  },
});
```

**Token Values**: Current values are PLACEHOLDERS. They will evolve during UI development. We're NOT recreating Will's 3-2-1 specific values - only the system/pattern.

### 2. Context + Custom Hook Pattern (REQUIRED)
Never expose Context directly. Always through custom hook with memoization.

```typescript
// === CONTEXT ===
const MyContext = createContext<MyContextValue | undefined>(undefined);

// === PROVIDER ===
export const MyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);

  const myMethod = useCallback(async (param: string) => {
    // Implementation
  }, []);

  const value = useMemo(() => ({ state, myMethod }), [state, myMethod]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// === CUSTOM HOOK ===
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within MyProvider');
  return context;
};
```

### 3. Service Layer Pattern (REQUIRED)
Never query Supabase directly from components. Always through service layer.

**Structure**:
```
features/
  myFeature/
    services/
      myFeatureService.ts  ← Business logic here
    context/
      MyFeatureContext.tsx ← Calls service, manages state
```

**Pattern**:
```typescript
// Service layer - Business logic
export const authService = {
  async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },
};

// Context layer - State management
const signIn = useCallback(async (email: string, password: string) => {
  const user = await authService.signIn(email, password);
  setUser(user);
}, []);
```

### 4. Absolute Imports (REQUIRED)
All imports use `@/` path aliases. NO relative imports.

**Configuration**: Set up in both `tsconfig.json` and `babel.config.js`.

```typescript
// ✅ CORRECT
import { Button } from '@components/Button';
import { theme } from '@theme';
import { useAuth } from '@features/auth/context/AuthContext';

// ❌ WRONG
import { Button } from '../../../components/Button';
```

### 5. TypeScript Strict Mode (ENFORCED)
No `any` types unless absolutely necessary. All types explicit.

```typescript
// ✅ CORRECT
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => { };

// ❌ WRONG
const Button = (props) => { };  // Implicit 'any'
```

### 6. File Header Format
```typescript
// ==========================================================================
// COMPONENT NAME
//
// Brief description of purpose and role.
//
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================
```

### 7. Component Structure
Organize with section comments:
```typescript
// === TYPES ===
// === COMPONENT ===
// === STATE ===
// === HOOKS ===
// === EVENT HANDLERS ===
// === RENDER ===
// === STYLES ===
```

---

## Known Issues

None currently. Foundation phase complete with no known issues.

---

## In-Progress Work

None. Ready to begin component development.

---

## Critical Reminders

- **Will's 3-2-1**: Reference only (at C:\Dev\Wills321) - UNTOUCHED
- **Lift 3-2-1**: Brand new (at C:\Dev\Lift321) - Active development
- **Supabase**: Configured in .env (credentials added, database schema pending)
- **GitHub**: https://github.com/WillyDrucker/Lift321 (all code synced)
- **Design tokens**: Values are placeholders, will evolve with UI
- **Branch**: main (current working branch)
- **Testing**: Metro bundler works, emulator setup deferred

---

## Environment Status

### Configured
- ✅ Supabase credentials in .env
- ✅ Metro bundler running (http://localhost:8081)
- ✅ GitHub repository synced
- ✅ All dependencies installed (891 packages)

### Not Yet Set Up
- ⏳ Android emulator or physical device testing
- ⏳ Database schema and tables
- ⏳ Supabase Auth configuration
- ⏳ TypeScript types from database

---

## Quick Reference: Creating New Components

1. Use PascalCase filename: `MyComponent.tsx`
2. Add file header with description
3. Define props type with `type` (not `interface`)
4. Use `React.FC<PropsType>` pattern
5. Organize with section comments
6. Use design tokens for ALL styling
7. Place in appropriate location:
   - Shared: `src/components/`
   - Feature-specific: `src/features/[feature]/components/`

---

## Quick Reference: Creating New Features

1. Create folder: `src/features/myFeature/`
2. Add subfolders: `screens/`, `components/`, `hooks/`, `context/`, `services/`, `types/`
3. Create service first: `services/myFeatureService.ts`
4. Create types: `types/myFeature.types.ts`
5. Create context: `context/MyFeatureContext.tsx` (with custom hook)
6. Create screens: `screens/MyFeatureScreen.tsx`
7. Add routes to `navigation/types.ts`

---

## Recommended Next Steps

1. **Build Button Component** (src/components/Button.tsx)
   - Variants: primary, secondary, danger
   - States: disabled, loading
   - Use theme tokens for all styling

2. **Build Input Component** (src/components/Input.tsx)
   - Types: text, email, password, number
   - States: focused, error, disabled
   - Use theme tokens for all styling

3. **Build Card Component** (src/components/Card.tsx)
   - Container for lists (workouts, exercises)
   - Use theme tokens for all styling

4. **Test Components** (when emulator ready)
   - Create simple test screen
   - Import and render components
   - Verify styling and interactions

---

**Version**: 1.0.0
**Last Updated**: 2025-11-09
**Status**: Ready for Component Development
