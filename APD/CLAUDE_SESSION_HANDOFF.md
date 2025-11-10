# CLAUDE SESSION HANDOFF

## Purpose

This file contains only critical architectural patterns and current session state needed if a session is interrupted. This is NOT a detailed history (see CLAUDE_PROJECT_NOTES.md for that). Focus on:
- Established architectural patterns that guide future work
- Current session state if work is in progress
- Known issues that affect development

**Documentation Flow**: Anything too detailed for SESSION_HANDOFF should be summarized here with full details provided in CLAUDE_PROJECT_NOTES.md. Anything too big for PROJECT_NOTES can go into CLAUDE_ACTIVE.md as an extension.

**Versioning Policy**: Documentation version numbers MUST match the current Git branch version. Only increment when creating a new branch. See CLAUDE_PROJECT_NOTES.md for full versioning policy.

---

## Current Version: 1.0.3

**Branch**: Claude-v1.0.3
**Status**: Navigation Complete - LoginFormScreen & MainActivity Implemented
**Last Updated**: 2025-11-10

---

## Session State

### Current Work
- LoginScreen, LoginFormScreen, and MainActivity fully implemented
- React Navigation set up with type-safe navigation
- Complete design token system with centralized layout constants
- All screens fully tokenized (zero magic numbers)
- SVG icon system implemented (chevrons, eye icons)
- All files meet CLAUDE_DEV_STANDARDS
- Ready for authentication logic implementation

### Completed This Session
- Set up React Navigation (@react-navigation/native, @react-navigation/native-stack)
- Created LoginFormScreen with email/password inputs and social login buttons
- Created MainActivity screen for guest users
- Added third "Login as Guest" button to LoginScreen
- Created SVG icon components (LeftChevron, RightChevron, EyeOpen, EyeClosed)
- Installed and configured react-native-svg
- Created new layout.ts token file for all layout constants
- Enhanced buttons.ts with shadowLayers tokens
- Added new color tokens (textYellowMaintenance, backgroundTertiary, shadowBlack)
- Updated shadow system to drop straight down with proper black base
- Fully tokenized all screens - removed ALL local constants and magic numbers
- Applied CLAUDE_DEV_STANDARDS to all modified files

### Next Session Should
1. Read README.md first (core context and project documentation)
2. Read CLAUDE_DEV_STANDARDS.md (coding standards)
3. Implement authentication logic (login, signup, guest login)
4. Set up Supabase Auth configuration
5. OR continue with other main app features (workout logging, plans)

### User Decisions Made
- Navigation: slide_from_right animation for all screen transitions
- LoginFormScreen: Centered form layout with 100px header spacing
- MainActivity: Simple gray background (no gym image), LIFT logo at top
- Guest button: Lighter gray (#424242) with yellow "GUEST" text (#FFFF00)
- Shadow system: Pure black (#000000) base, dropping straight down, 0.4 → 0.25 → 0.15 opacity fade
- Icons: SVG-based (LeftChevron for back, EyeOpen/EyeClosed for password toggle)
- All layout values centralized in theme.layout tokens

---

## Established Architectural Patterns

### 1. Design Token System (ENFORCED)
**Critical**: ALL styling through `theme.*` tokens. NO magic numbers or hard-coded colors.

```typescript
// ✅ CORRECT - Using design tokens
import {theme} from '@/theme';
const styles = StyleSheet.create({
  header: {
    paddingLeft: theme.layout.header.indent,
    marginTop: theme.layout.header.topSpacing,
  },
  button: {
    height: theme.layout.form.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.layout.form.inputBorderRadius,
  },
  logo: {
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
  },
});

// ❌ WRONG - Magic numbers and hard-coded colors
const styles = StyleSheet.create({
  header: {
    paddingLeft: 32,
    marginTop: 100,
  },
  button: {
    height: 50,
    backgroundColor: '#00FF00',
  },
});
```

**Token Modules**:
- `theme.colors` - All semantic colors (primary, backgroundPrimary, textYellowMaintenance, shadowBlack, etc.)
- `theme.spacing` - Spacing scale (xs, s, m, l, xl, xxl) based on 16px rhythm
- `theme.typography` - Font families (brand, primary, system), sizes, weights
- `theme.textShadows` - Text shadow presets (default, subtle, strong)
- `theme.viewShadows` - iOS view shadows (small, medium, large)
- `theme.elevation` - Android elevation values
- `theme.buttons` - Button sizing, padding, border radius, margins, shadowLayers
- `theme.layout` - Layout constants (header, logo, form, bottom)

**New Layout Tokens (theme.layout)**:
```typescript
// Header positioning
theme.layout.header.topSpacing // 100px from top
theme.layout.header.indent // 32px left/right padding

// Logo dimensions
theme.layout.logo.size // 40px
theme.layout.logo.borderRadius // 20px (half of size)

// Form elements
theme.layout.form.inputHeight // 50px
theme.layout.form.inputBorderWidth // 2px
theme.layout.form.inputBorderRadius // 8px
theme.layout.form.inputHorizontalMargin // 5px
theme.layout.form.buttonHorizontalMargin // 32px
theme.layout.form.dividerSpacing // 32px
theme.layout.form.dividerThickness // 1px

// Bottom spacing
theme.layout.bottom.buttonSpacing // 100px from bottom
```

**Shadow Layer Tokens (theme.buttons.shadowLayers)**:
```typescript
// Three-layer shadow system with fade
theme.buttons.shadowLayers.layer1 // {top: 1, left: 0, right: 0, opacity: 0.4}
theme.buttons.shadowLayers.layer2 // {top: 2, left: 0, right: 0, opacity: 0.25}
theme.buttons.shadowLayers.layer3 // {top: 3, left: 0, right: 0, opacity: 0.15}

// Usage in styles
shadowLayer1: {
  position: 'absolute',
  top: theme.buttons.shadowLayers.layer1.top,
  left: theme.buttons.shadowLayers.layer1.left,
  right: theme.buttons.shadowLayers.layer1.right,
  backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
  borderRadius: theme.buttons.borderRadius.medium,
},
```

### 2. Multi-Layer Shadow Pattern (ANDROID FIX)
Android doesn't render view shadows reliably. Use multi-layer Views with pure black base that fades downward.

**Pattern**: Shadows drop straight down (no horizontal shift), strong black base (0.4) fading to light (0.15).

```typescript
// Button/Logo shadow pattern
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} /> {/* Farthest, lightest */}
  <View style={styles.shadowLayer2} /> {/* Middle */}
  <View style={styles.shadowLayer1} /> {/* Closest, darkest */}
  <Pressable style={styles.button}>
    <Text>Button Text</Text>
  </Pressable>
</View>

// Shadow styles using tokens
shadowLayer1: {
  position: 'absolute',
  top: theme.buttons.shadowLayers.layer1.top,
  left: theme.buttons.shadowLayers.layer1.left,
  right: theme.buttons.shadowLayers.layer1.right,
  height: theme.buttons.height.medium,
  backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
  borderRadius: theme.buttons.borderRadius.medium,
},
shadowLayer2: {
  position: 'absolute',
  top: theme.buttons.shadowLayers.layer2.top,
  left: theme.buttons.shadowLayers.layer2.left,
  right: theme.buttons.shadowLayers.layer2.right,
  height: theme.buttons.height.medium,
  backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer2.opacity})`,
  borderRadius: theme.buttons.borderRadius.medium,
},
shadowLayer3: {
  position: 'absolute',
  top: theme.buttons.shadowLayers.layer3.top,
  left: theme.buttons.shadowLayers.layer3.left,
  right: theme.buttons.shadowLayers.layer3.right,
  height: theme.buttons.height.medium,
  backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer3.opacity})`,
  borderRadius: theme.buttons.borderRadius.medium,
},
```

### 3. SVG Icon System
Use react-native-svg for scalable, customizable icons. All icons accept size and color props.

```typescript
import {LeftChevron, EyeOpen, EyeClosed} from '@/components/icons';

// Usage
<LeftChevron size={32} color={theme.colors.textPrimary} />
<EyeOpen size={20} color={theme.colors.textPrimary} />
```

**Icon Components**:
- `LeftChevron` - Back/previous navigation
- `RightChevron` - Forward/next navigation (stored for future use)
- `EyeOpen` - Show password
- `EyeClosed` - Hide password

### 4. Navigation Pattern (Type-Safe)
Use React Navigation with TypeScript for type-safe navigation.

```typescript
// Define routes in src/navigation/types.ts
export type RootStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  MainActivity: undefined;
  // ...other routes
};

// Use in components
import type {RootStackScreenProps} from '@/navigation/types';

type MyScreenProps = RootStackScreenProps<'LoginScreen'>;

export const MyScreen: React.FC<MyScreenProps> = ({navigation}) => {
  const handleNavigate = () => {
    navigation.navigate('LoginFormScreen');
  };
  // ...
};
```

### 5. Context + Custom Hook Pattern (REQUIRED)
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

### 6. Service Layer Pattern (REQUIRED)
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

### 7. Absolute Imports (REQUIRED)
All imports use `@/` path aliases. NO relative imports.

**Configuration**: Set up in both `tsconfig.json` and `babel.config.js`.

```typescript
// ✅ CORRECT
import {Button} from '@/components/Button';
import {theme} from '@/theme';
import {useAuth} from '@/features/auth/context/AuthContext';
import {LeftChevron} from '@/components/icons';

// ❌ WRONG
import {Button} from '../../../components/Button';
```

### 8. TypeScript Strict Mode (ENFORCED)
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

### 9. File Header Format
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

### 10. Component Structure
Organize with section comments:
```typescript
// === TYPES ===
// === COMPONENT ===
// === STATE ===
// === HOOKS ===
// === EVENT HANDLERS ===
// === RENDER ===
// === STYLES ===

// For styles section, use tokens exclusively
const styles = StyleSheet.create({
  header: {
    paddingLeft: theme.layout.header.indent,
    marginTop: theme.layout.header.topSpacing,
  },
  // ...
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
- After installing native modules (react-native-svg), need to rebuild Android app
- Command: `npm start -- --reset-cache` then `npm run android`

### Native Modules
- react-native-svg requires native code rebuild
- After installation: Stop Metro, run `cd android && gradlew.bat clean`, restart everything

---

## In-Progress Work

None. Navigation and basic screens complete. Ready for authentication implementation.

---

## Critical Reminders

- **Will's 3-2-1**: Reference only (at C:\Dev\Wills321) - UNTOUCHED
- **Lift 3-2-1**: Brand new (at C:\Dev\Lift321) - Active development
- **Supabase**: Configured in .env (credentials added, database schema pending)
- **GitHub**: https://github.com/WillyDrucker/Lift321 (all code synced)
- **Design tokens**: Fully implemented with centralized layout constants
- **Branch**: Claude-v1.0.3 (current working branch)
- **Testing**: Android emulator working, navigation tested
- **Fonts**: Bebas Neue for brand text, Roboto for UI
- **Icons**: SVG-based via react-native-svg
- **All screens**: Fully tokenized (zero magic numbers)

---

## Environment Status

### Configured
- ✅ Supabase credentials in .env
- ✅ Metro bundler running (http://localhost:8081)
- ✅ GitHub repository synced
- ✅ All dependencies installed (including react-native-svg)
- ✅ Android emulator set up and working
- ✅ Gradle 9.2.0 (latest stable)
- ✅ Custom fonts linked (Bebas Neue)
- ✅ Complete design token system with layout module
- ✅ React Navigation configured
- ✅ SVG icon system implemented

### Not Yet Set Up
- ⏳ Database schema and tables
- ⏳ Supabase Auth configuration
- ⏳ TypeScript types from database
- ⏳ Authentication logic implementation

---

## Quick Reference: Using Design Tokens

### Layout Constants
```typescript
// Header
paddingLeft: theme.layout.header.indent,
marginTop: theme.layout.header.topSpacing,

// Logo
width: theme.layout.logo.size,
borderRadius: theme.layout.logo.borderRadius,

// Form
height: theme.layout.form.inputHeight,
borderWidth: theme.layout.form.inputBorderWidth,
marginHorizontal: theme.layout.form.buttonHorizontalMargin,
```

### Shadow Layers
```typescript
// Using shadow tokens
top: theme.buttons.shadowLayers.layer1.top,
backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
```

### Colors
```typescript
backgroundColor: theme.colors.backgroundPrimary,
color: theme.colors.textYellowMaintenance, // Yellow for maintenance
backgroundColor: theme.colors.backgroundTertiary, // Lighter gray for guest button
```

### Icons
```typescript
import {LeftChevron, EyeOpen, EyeClosed} from '@/components/icons';

<LeftChevron size={32} color={theme.colors.textPrimary} />
<EyeOpen size={20} color={theme.colors.textPrimary} />
```

---

## Recommended Next Steps

1. **Implement Authentication Logic**
   - Create AuthContext with login/signup/guest methods
   - Connect LoginFormScreen to actual auth service
   - Add form validation
   - Handle loading and error states

2. **Set Up Supabase Auth Configuration**
   - Configure auth providers (email, Google, Facebook)
   - Set up auth policies
   - Create user profiles table

3. **OR Build Main App Features**
   - Workout logging screens
   - Training plan management
   - History/analytics screens

4. **Consider Shared Components**
   - Loading indicator
   - Error message component
   - Toast notifications

---

**Version**: 1.0.3
**Last Updated**: 2025-11-10
**Status**: Navigation Complete - Ready for Authentication
