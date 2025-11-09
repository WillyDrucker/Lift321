# CLAUDE PROJECT NOTES - Lift 3-2-1

## Version Changelog

### v1.0.0 - Foundation Complete (2025-11-09)

**Branch**: Claude-v5.6.9

**Summary**: Initial project creation with complete foundation, architecture, and design token system.

#### What Was Built
- ✅ React Native 0.82.1 initialized with TypeScript
- ✅ Complete folder structure (feature-based architecture)
- ✅ Design token system (global theme architecture)
- ✅ TypeScript strict mode configuration
- ✅ Babel configuration for absolute imports
- ✅ Supabase client setup
- ✅ Navigation type definitions
- ✅ AuthContext template (Context + custom hook pattern)
- ✅ Comprehensive documentation (CLAUDE_DEV_STANDARDS.md, README.md, CLAUDE_SESSION_HANDOFF.md, this file)

#### Dependencies Installed
**Total**: 891 packages, 0 vulnerabilities

**Key Dependencies**:
- `react-native`: 0.82.1
- `@supabase/supabase-js`: Latest
- `@react-navigation/native`: Latest
- `@react-navigation/native-stack`: Latest
- `@react-native-async-storage/async-storage`: Latest
- `react-native-screens`: Latest
- `react-native-safe-area-context`: Latest
- `babel-plugin-module-resolver`: Latest
- `react-native-dotenv`: Latest
- `react-native-url-polyfill`: Latest

#### Configuration Files Created
- `tsconfig.json` - TypeScript strict mode + absolute import paths
- `babel.config.js` - Module resolver for absolute imports
- `.env` - Supabase configuration placeholders

#### Technical Decisions

**React Native Version**: 0.82.1
- TypeScript is default (no template flag needed)
- Latest stable version with modern features

**Styling Approach**: StyleSheet + Design Tokens
- NOT NativeWind or Styled Components
- Global theme system with semantic naming
- Token values are placeholders to be refined during UI development

**State Management**: Context API + Hooks
- NOT Redux or MobX
- Feature-based contexts (AuthContext, WorkoutContext, etc.)
- Required pattern: Context + custom hook + memoization

**Backend**: Supabase (Brand New Project)
- NOT using Will's 3-2-1 Supabase
- User needs to create new project and update `.env`

**Folder Structure**: Feature-based
- NOT file-type based (no src/components/ at root)
- Each feature has: screens/, components/, hooks/, context/, services/, types/
- Maximum depth: 2-3 levels

**Import Strategy**: Absolute imports with `@/` aliases
- NO relative imports allowed
- Configured in both tsconfig.json and babel.config.js

#### Design Token System

**Philosophy**: System in place, values to be discovered
- Token architecture established (colors, spacing, typography)
- Current values are PLACEHOLDERS - will evolve with new UI
- NOT recreating Will's 3-2-1 specific design values
- System exists to be REFERENCED and UPDATED as design emerges

**Token Structure**:
```typescript
theme/
├── colors.ts       // Semantic color palette (actionSuccess, not greenButton)
├── spacing.ts      // Spacing scale (values are placeholders)
├── typography.ts   // Font sizes, weights, text styles (values are placeholders)
└── tokens.ts       // Main theme export
```

**Usage Pattern**:
```typescript
import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,           // Use token, not magic number
    backgroundColor: theme.colors.backgroundCard,  // Use token, not hex
  },
});
```

#### Patterns Established

**1. Context + Custom Hook**
```typescript
const MyContext = createContext<MyContextValue | undefined>(undefined);

export const MyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Memoize callbacks and values
  const value = useMemo(() => ({ /* ... */ }), [deps]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// ALWAYS expose via custom hook
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within MyProvider');
  return context;
};
```

**2. Service Layer**
```typescript
// services/myFeatureService.ts
export const myFeatureService = {
  async getData(): Promise<Data> {
    const { data, error } = await supabase.from('table').select();
    if (error) throw error;
    return data;
  },
};

// context/MyFeatureContext.tsx
const fetchData = useCallback(async () => {
  const data = await myFeatureService.getData();  // Use service
  setData(data);
}, []);
```

**3. File Headers**
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

#### Intentionally NOT Implemented
- UI components (Button, Card, Input, Selector)
- Screen implementations
- Business logic (AuthContext methods are stubs)
- Supabase database schema
- Database type generation
- Navigation flow

#### Errors Encountered and Resolved

**Error 1**: React Native init command deprecated
- **Issue**: `npx react-native@latest init` showed deprecation warning
- **Fix**: Changed to `npx @react-native-community/cli@latest init Lift321`

**Error 2**: TypeScript template flag error
- **Issue**: `--template react-native-template-typescript` caused error
- **Fix**: Removed template flag (TypeScript is default in 0.71+)

**Error 3**: Empty Lift321 folder on first attempt
- **Issue**: First initialization created folder but no files
- **Fix**: Used correct Unix-style path in bash commands

#### Next Version Planning (v1.1.0)

**Focus**: Shared Component Library

Planned:
- Button component (primary, secondary, danger variants)
- Card component (workout card, plan card)
- Input component (email, password, number)
- Selector component (exercise selector)

**Focus**: Supabase Backend Setup

Planned:
- Create new Supabase project
- Design database schema
- Generate TypeScript types
- Configure RLS policies

---

## Technical Notes

### Absolute Imports Configuration

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@features/*": ["./src/features/*"],
      "@theme/*": ["./src/theme/*"],
      // ... more aliases
    }
  }
}
```

**babel.config.js**:
```javascript
{
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        '@': './src',
        '@components': './src/components',
        '@features': './src/features',
        '@theme': './src/theme',
        // ... more aliases
      }
    }]
  ]
}
```

### TypeScript Strict Mode

**Enabled Flags**:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`
- `strictBindCallApply: true`
- `strictPropertyInitialization: true`
- `noImplicitThis: true`
- `alwaysStrict: true`

### Supabase Client Configuration

**Pattern**:
```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,        // Persist sessions
    autoRefreshToken: true,        // Auto refresh
    persistSession: true,          // Persist across app restarts
    detectSessionInUrl: false,     // React Native doesn't use URLs
  },
});
```

### React Navigation Type Safety

**Pattern**:
```typescript
// navigation/types.ts
export type RootStackParamList = {
  Login: undefined;
  WorkoutSession: { workoutId: string };  // Required param
};

// In screen component
type Props = RootStackScreenProps<'WorkoutSession'>;
export const WorkoutSessionScreen: React.FC<Props> = ({ route }) => {
  const { workoutId } = route.params;  // Fully typed!
};
```

---

## Development Environment

**Platform**: Windows
**Working Directory**: C:\Dev\Lift321
**Git Repository**: Yes
**Current Branch**: Claude-v5.6.9
**Main Branch**: main

**Node.js**: Latest stable
**Package Manager**: npm
**IDE**: VS Code (assumed)

---

## Important Project Context

### What Lift 3-2-1 IS
- Brand new React Native + TypeScript fitness tracking app
- Built from scratch with modern best practices
- Inspired by lessons learned from Will's 3-2-1

### What Lift 3-2-1 IS NOT
- NOT a migration of Will's 3-2-1 code
- NOT a conversion from JavaScript to TypeScript
- NOT using Will's 3-2-1 Supabase project
- NOT recreating Will's 3-2-1 specific design values

### Will's 3-2-1 Role
- Reference for patterns and concepts ONLY
- Example of what worked well (SSS philosophy, design token system pattern, service layer)
- Archive at C:\Dev\Wills321 - completely untouched

### Design Token System Role
- **Architecture**: Established (global theme system with semantic naming)
- **Values**: Placeholders to be refined during UI development
- **Purpose**: Reference point that evolves with new design discovery

---

## Critical Standards (From CLAUDE_DEV_STANDARDS.md)

1. **NO Magic Numbers** - Always use design tokens
2. **NO Hard-Coded Colors** - Always use theme.colors.*
3. **NO Relative Imports** - Always use @/ aliases
4. **NO `any` Types** - Strict TypeScript
5. **NO Direct Supabase Queries** - Use service layer
6. **ALWAYS Memoize** - Context values (useMemo) and callbacks (useCallback)
7. **ALWAYS Use Custom Hooks** - Never useContext directly

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
**Current Branch**: Claude-v5.6.9
**Commit Policy**: Do not commit unless explicitly requested by user

---

**Last Updated**: 2025-11-09
**Current Version**: 1.0.0 - Foundation Complete
