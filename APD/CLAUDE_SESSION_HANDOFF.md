# CLAUDE SESSION HANDOFF

## Purpose

This file contains only critical architectural patterns and current session state needed if a session is interrupted. This is NOT a detailed history (see CLAUDE_PROJECT_NOTES.md for that). Focus on:
- Established architectural patterns that guide future work
- Current session state if work is in progress
- Known issues that affect development

**Documentation Flow**: Anything too detailed for SESSION_HANDOFF should be summarized here with full details provided in CLAUDE_PROJECT_NOTES.md. Anything too big for PROJECT_NOTES can go into CLAUDE_ACTIVE.md as an extension.

**Versioning Policy**: Documentation version numbers MUST match the current Git branch version. Only increment when creating a new branch. See CLAUDE_PROJECT_NOTES.md for full versioning policy.

---

## Current Version: 1.0.2

**Branch**: Claude-v1.0.2
**Status**: Login Screen Complete - Design Tokens Fully Implemented
**Last Updated**: 2025-11-10

---

## Session State

### Current Work
- LoginScreen fully implemented with Bebas Neue font, gym background, drop shadows
- Complete design token system implemented (typography, shadows, buttons, colors, spacing)
- All files refactored to CLAUDE_DEV_STANDARDS
- Gradle upgraded to 9.2.0 for Android Studio compatibility
- Android emulator working and tested
- Ready for next screen/feature development

### Completed This Session
- Fixed Gradle 9.x compatibility issues (upgraded to 9.2.0, Foojay plugin 1.0.0)
- Created complete LoginScreen with brand design
- Added Bebas Neue custom font for brand elements
- Implemented multi-layer shadow system for buttons and logo (works on both platforms)
- Created new theme modules: shadows.ts, buttons.ts, updated typography.ts
- Tokenized all magic numbers and hard-coded values
- Applied CLAUDE_DEV_STANDARDS formatting to all modified files
- Tested app successfully in Android emulator

### Next Session Should
1. Read README.md first (core context and project documentation)
2. Read CLAUDE_DEV_STANDARDS.md (coding standards)
3. Build signup/login form screens (next in auth flow)
4. OR build shared components (Button, Input) needed for forms
5. Consider navigation setup (React Navigation) for screen transitions

### User Decisions Made
- Use Bebas Neue for brand text ("LIFT") and Roboto for UI text
- Pure green (#00FF00) on dark gray (#1E1E1E) color scheme
- Multi-layer shadow approach for Android compatibility
- Gym background image (gym-background.png)
- 16px spacing system throughout

---

## Established Architectural Patterns

### 1. Design Token System (ENFORCED)
**Critical**: ALL styling through `theme.*` tokens. NO magic numbers or hard-coded colors.

```typescript
// ✅ CORRECT - Using design tokens
import {theme} from '@/theme';
const styles = StyleSheet.create({
  button: {
    height: theme.buttons.height.medium,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.buttons.borderRadius.medium,
    ...theme.textShadows.default,
  },
});

// ❌ WRONG - Magic numbers and hard-coded colors
const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#00FF00',
    borderRadius: 8,
  },
});
```

**Token Modules**:
- `theme.colors` - All semantic colors (primary, backgroundPrimary, textSecondary, etc.)
- `theme.spacing` - Spacing scale (xs, s, m, l, xl, xxl) based on 16px rhythm
- `theme.typography` - Font families (brand, primary, system), sizes, weights
- `theme.textShadows` - Text shadow presets (default, subtle, strong)
- `theme.viewShadows` - iOS view shadows (small, medium, large)
- `theme.elevation` - Android elevation values
- `theme.buttons` - Button sizing, padding, border radius, margins

**Custom Fonts**:
- Bebas Neue (brand font) linked via `react-native.config.js` and `npx react-native-asset`
- Use `theme.typography.fontFamily.brand` for brand elements
- Use `theme.typography.fontFamily.primary` for UI text (Roboto)

### 2. Multi-Layer Shadow Pattern (ANDROID FIX)
Android doesn't render view shadows reliably. Use multi-layer Views for consistent shadows.

```typescript
// Pattern for button shadows
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} />
  <View style={styles.shadowLayer2} />
  <View style={styles.shadowLayer1} />
  <Pressable style={styles.button}>
    <Text>Button Text</Text>
  </Pressable>
</View>

// Shadow styles (3 layers with progressive offset/opacity)
shadowLayer1: {
  position: 'absolute',
  top: 1,
  left: 1,
  right: -1,
  height: theme.buttons.height.medium,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderRadius: theme.buttons.borderRadius.medium,
},
shadowLayer2: {
  position: 'absolute',
  top: 2,
  left: 1,
  right: -1,
  height: theme.buttons.height.medium,
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
  borderRadius: theme.buttons.borderRadius.medium,
},
shadowLayer3: {
  position: 'absolute',
  top: 3,
  left: 2,
  right: -2,
  height: theme.buttons.height.medium,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: theme.buttons.borderRadius.medium,
},
```

### 3. Context + Custom Hook Pattern (REQUIRED)
Never expose Context directly. Always through custom hook with memoization.

```typescript
// === CONTEXT ===
const MyContext = createContext<MyContextValue | undefined>(undefined);

// === PROVIDER ===
export const MyProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [state, setState] = useState<StateType>(initialState);

  const myMethod = useCallback(async (param: string) => {
    // Implementation
  }, []);

  const value = useMemo(() => ({state, myMethod}), [state, myMethod]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

// === CUSTOM HOOK ===
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within MyProvider');
  return context;
};
```

### 4. Service Layer Pattern (REQUIRED)
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
    const {data, error} = await supabase.auth.signInWithPassword({email, password});
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

### 5. Absolute Imports (REQUIRED)
All imports use `@/` path aliases. NO relative imports.

**Configuration**: Set up in both `tsconfig.json` and `babel.config.js`.

```typescript
// ✅ CORRECT
import {Button} from '@/components/Button';
import {theme} from '@/theme';
import {useAuth} from '@/features/auth/context/AuthContext';

// ❌ WRONG
import {Button} from '../../../components/Button';
```

### 6. TypeScript Strict Mode (ENFORCED)
No `any` types unless absolutely necessary. All types explicit.

```typescript
// ✅ CORRECT
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = ({title, onPress, disabled}) => {};

// ❌ WRONG
const Button = (props) => {};  // Implicit 'any'
```

### 7. File Header Format
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

### 8. Component Structure
Organize with section comments:
```typescript
// === TYPES ===
// === COMPONENT ===
// === STATE ===
// === HOOKS ===
// === EVENT HANDLERS ===
// === RENDER ===
// === STYLES ===

// For styles section, define constants above StyleSheet.create
const LOGO_SIZE = 40;
const HEADER_INDENT = theme.spacing.xl;

const styles = StyleSheet.create({
  // ... styles
});
```

---

## Known Issues

### Android Shadows
- Native `elevation` and `shadowColor` properties don't render reliably on all Android backgrounds
- **Solution**: Use multi-layer View approach (see pattern above)
- Text shadows work fine with native `textShadow*` properties

### Metro Cache
- After adding new assets (images, fonts), may need to restart Metro with `--reset-cache`
- Command: `npm start -- --reset-cache`

---

## In-Progress Work

None. LoginScreen complete and ready for next feature.

---

## Critical Reminders

- **Will's 3-2-1**: Reference only (at C:\Dev\Wills321) - UNTOUCHED
- **Lift 3-2-1**: Brand new (at C:\Dev\Lift321) - Active development
- **Supabase**: Configured in .env (credentials added, database schema pending)
- **GitHub**: https://github.com/WillyDrucker/Lift321 (all code synced)
- **Design tokens**: Fully implemented with real values (no longer placeholders)
- **Branch**: Claude-v1.0.2 (current working branch)
- **Testing**: Android emulator working, app runs successfully
- **Fonts**: Bebas Neue linked for brand text, Roboto for UI

---

## Environment Status

### Configured
- ✅ Supabase credentials in .env
- ✅ Metro bundler running (http://localhost:8081)
- ✅ GitHub repository synced
- ✅ All dependencies installed (891 packages)
- ✅ Android emulator set up and working
- ✅ Gradle 9.2.0 (latest stable)
- ✅ Custom fonts linked (Bebas Neue)
- ✅ Complete design token system

### Not Yet Set Up
- ⏳ React Navigation (screen transitions)
- ⏳ Database schema and tables
- ⏳ Supabase Auth configuration
- ⏳ TypeScript types from database

---

## Quick Reference: Using Design Tokens

### Shadows
```typescript
// Text shadows
<Text style={{...theme.textShadows.default}}>Text</Text>

// Button shadows (multi-layer)
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} />
  <View style={styles.shadowLayer2} />
  <View style={styles.shadowLayer1} />
  <Pressable style={styles.button}>...</Pressable>
</View>
```

### Typography
```typescript
fontSize: theme.typography.fontSize.xl,
fontFamily: theme.typography.fontFamily.brand, // Bebas Neue
fontWeight: theme.typography.fontWeight.bold,
```

### Colors
```typescript
backgroundColor: theme.colors.backgroundPrimary,
color: theme.colors.textSecondary,
```

### Buttons
```typescript
height: theme.buttons.height.medium,
borderRadius: theme.buttons.borderRadius.medium,
marginBottom: theme.buttons.marginBottom.default,
```

---

## Quick Reference: Creating New Components

1. Use PascalCase filename: `MyComponent.tsx`
2. Add file header with description
3. Define props type with `type` (not `interface`)
4. Use `React.FC<PropsType>` pattern
5. Organize with section comments
6. Use design tokens for ALL styling (NO magic numbers)
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

1. **Set Up React Navigation**
   - Install @react-navigation/native and dependencies
   - Create navigation stack
   - Link LoginScreen to signup/login forms

2. **Build Signup/Login Form Screens**
   - SignupScreen with email/password inputs
   - LoginFormScreen with email/password inputs
   - Use design tokens for all styling
   - Implement form validation

3. **Build Shared Input Component** (if needed for forms)
   - Types: text, email, password
   - States: focused, error, disabled
   - Use theme tokens for all styling

4. **OR Continue with Shared Components**
   - Button component (variants: primary, secondary, danger)
   - Card component (for workout lists later)

---

**Version**: 1.0.2
**Last Updated**: 2025-11-10
**Status**: LoginScreen Complete - Ready for Navigation/Forms
