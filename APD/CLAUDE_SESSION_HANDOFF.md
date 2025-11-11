# CLAUDE SESSION HANDOFF

## What This File Does

This is the primary context restoration file for Claude Code sessions. When a session is interrupted or continued, this file provides all critical information needed to resume work immediately without re-reading the entire project history. It contains the current session state, established architectural patterns that must be followed, known issues that affect development, and quick reference tables for design tokens and patterns. This file is updated at the end of each session to reflect the current state of the project. It focuses on actionable information needed NOW, not historical details (which live in CLAUDE_PROJECT_NOTES.md).

**IMPORTANT**: This file should ONLY contain summarized patterns and architectural decisions. Exact code examples, detailed bug reproductions, and technical implementation details belong in CLAUDE_ACTIVE.md. Only store code references here if they are absolutely critical (hard-to-solve bugs, critical workarounds).

## Purpose

This file contains only critical architectural patterns and current session state needed if a session is interrupted. This is NOT a detailed history (see CLAUDE_PROJECT_NOTES.md for that). Focus on:
- Established architectural patterns that guide future work
- Current session state if work is in progress
- Known issues that affect development

**Documentation Flow**: Anything too detailed for SESSION_HANDOFF should be summarized here with full details provided in CLAUDE_PROJECT_NOTES.md. Anything too big for PROJECT_NOTES can go into CLAUDE_ACTIVE.md as an extension.

**Versioning Policy**: Documentation version numbers MUST match the current Git branch version. Only increment when creating a new branch. See CLAUDE_PROJECT_NOTES.md for full versioning policy.

---

## Current Version: 1.0.4

**Branch**: Claude-v1.0.4
**Status**: Diagnostic Session - Runtime Errors Identified, Onboarding Documentation Created
**Last Updated**: 2025-11-11

---

## Session State

### Current Work
- New branch Claude-v1.0.4 created from main
- Android runtime errors identified (not yet fixed):
  - Native module registration issues
  - theme.layout undefined errors
- Metro bundler cache troubleshooting attempted
- Comprehensive Android Studio setup guide created for new developer onboarding
- No code changes made yet (diagnostic phase)

### Completed This Session
- Created branch Claude-v1.0.4 from main
- Diagnosed Android runtime errors (native module registration, theme.layout undefined)
- Investigated Metro bundler cache issues
- Created comprehensive Android Studio setup documentation including:
  - Gradle 9.2.0 configuration steps
  - Foojay Toolchains plugin v1.0.0 setup
  - JDK 17/21 requirements and configuration
  - Node 20+ requirements
  - npm install and patch-package workflow explanation
  - Common troubleshooting procedures
- Initialized DEVDOC Agent documentation system
- Created USERPROMPT folder and first prompt capture file
- Updated APD documentation for v1.0.4 session

### Next Session Should
1. Read README.md first (core context and project documentation)
2. Read CLAUDE_DEV_STANDARDS.md (coding standards)
3. **Fix runtime errors** (PRIORITY):
   - Resolve native module registration issues
   - Fix theme.layout undefined errors
   - Verify Metro bundler is properly loading all modules
4. Test app functionality on Android emulator after fixes
5. THEN implement authentication logic OR continue with main app features

### User Decisions Made
- Delay commit/merge until runtime errors are fixed
- Onboard son to project with comprehensive setup documentation
- Focus on fixing errors before adding new features
- Create USERPROMPT documentation system for tracking all user requests

---

## Previous Sessions

### v1.0.3 - Navigation Complete & Full Tokenization (2025-11-10)
Implemented React Navigation with LoginFormScreen and MainActivity. Created complete tokenization system with theme.layout module containing all layout constants. Built SVG icon system (chevrons, eye icons). Refined shadow system with pure black base dropping straight down. All screens fully tokenized with zero magic numbers. Branch merged to main successfully.

### v1.0.2 - LoginScreen Complete & Design Tokens (2025-11-10)
Built complete LoginScreen with gym background, custom Bebas Neue font, and multi-layer shadow system. Created theme modules for shadows and buttons. Upgraded Gradle to 9.2.0 with Foojay plugin v1.0.0. Resolved Android elevation rendering issues with View-based shadow approach. Branch merged to main successfully.

---

## Known Issues

### Runtime Errors (v1.0.4 - UNRESOLVED)
- Native module registration errors + theme.layout undefined
- Next: Verify Metro bundler, check exports, review native linking

### Android Shadows / Metro Cache / Native Modules
- Native shadows unreliable → Use multi-layer View pattern
- New assets/modules → Restart Metro with --reset-cache, rebuild Android

---

## Quick Reference: Established Patterns

### Design Token Modules
| Module | Purpose |
|--------|---------|
| `theme.colors` | Semantic colors (primary, backgroundPrimary, textYellowMaintenance, shadowBlack) |
| `theme.spacing` | xs/s/m/l/xl/xxl (16px rhythm) |
| `theme.typography` | Fonts (brand/primary/system), sizes, weights |
| `theme.textShadows` | default/subtle/strong |
| `theme.viewShadows` | iOS shadows (small/medium/large) |
| `theme.elevation` | Android elevation values |
| `theme.buttons` | Sizing, padding, borderRadius, margins, shadowLayers |
| `theme.layout` | header/logo/form/bottom constants |

### Layout Token Values
| Category | Token | Value |
|----------|-------|-------|
| **Header** | theme.layout.header.topSpacing | 100px |
| | theme.layout.header.indent | 32px |
| **Logo** | theme.layout.logo.size | 40px |
| | theme.layout.logo.borderRadius | 20px |
| **Form** | theme.layout.form.inputHeight | 50px |
| | theme.layout.form.inputBorderWidth | 2px |
| | theme.layout.form.inputBorderRadius | 8px |
| | theme.layout.form.inputHorizontalMargin | 5px |
| | theme.layout.form.buttonHorizontalMargin | 32px |
| | theme.layout.form.dividerSpacing | 32px |
| | theme.layout.form.dividerThickness | 1px |
| **Bottom** | theme.layout.bottom.buttonSpacing | 100px |

### Shadow Layer System (Android)
| Layer | Top | Opacity | Usage |
|-------|-----|---------|-------|
| layer1 | 1px | 0.4 | Closest, darkest |
| layer2 | 2px | 0.25 | Middle |
| layer3 | 3px | 0.15 | Farthest, lightest |

**Pattern**: 3 Views stacked, pure black, drop straight down, no horizontal shift
```typescript
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} />
  <View style={styles.shadowLayer2} />
  <View style={styles.shadowLayer1} />
  <Pressable style={styles.button}><Text>Button</Text></Pressable>
</View>
```

### Icon System
| Icon | Usage | Import |
|------|-------|--------|
| LeftChevron | Back/previous nav | `from '@/components/icons'` |
| RightChevron | Forward/next nav | `from '@/components/icons'` |
| EyeOpen | Show password | `from '@/components/icons'` |
| EyeClosed | Hide password | `from '@/components/icons'` |

**All accept**: size (number), color (string)

### Architecture Patterns (REQUIRED)
| Pattern | Rule |
|---------|------|
| **Design Tokens** | ALL styling via `theme.*` - NO magic numbers/hard-coded colors |
| **Absolute Imports** | Use `@/` aliases - NO relative imports |
| **TypeScript Strict** | Explicit types - NO `any` (unless absolutely necessary) |
| **Context Pattern** | Never expose Context directly - Always via custom hook with memoization |
| **Service Layer** | Never query Supabase from components - Always via service layer |
| **Navigation** | React Navigation with TypeScript - Type-safe via RootStackParamList |

### Navigation Type Pattern
```typescript
// Define: src/navigation/types.ts
export type RootStackParamList = {
  LoginScreen: undefined;
  LoginFormScreen: undefined;
  MainActivity: undefined;
};

// Use: type MyScreenProps = RootStackScreenProps<'LoginScreen'>;
```

### Context + Hook Pattern
```typescript
// Context → Provider with useMemo → Custom Hook with error check
const MyContext = createContext<MyContextValue | undefined>(undefined);
export const MyProvider: React.FC<PropsWithChildren> = ({children}) => {
  const value = useMemo(() => ({state, myMethod}), [state, myMethod]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must be used within MyProvider');
  return context;
};
```

### Service Layer Structure
```
features/myFeature/
  services/myFeatureService.ts  ← Business logic (Supabase calls)
  context/MyFeatureContext.tsx  ← State management (calls service)
```

### Component Structure Sections
```typescript
// === TYPES ===
// === COMPONENT ===
// === STATE ===
// === HOOKS ===
// === EVENT HANDLERS ===
// === RENDER ===
// === STYLES === (use theme.* tokens exclusively)
```

### File Header Format
```typescript
// ==========================================================================
// COMPONENT NAME
// Brief description of purpose and role.
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================
```

---

## Environment & Critical Info

### Configured
Supabase (.env) | Metro (8081) | GitHub synced | All deps installed | Android emulator | Gradle 9.2.0 | Fonts (Bebas Neue) | Design tokens complete | React Navigation | SVG icons

### Not Yet Set Up
DB schema/tables | Supabase Auth config | TS types from DB | Auth logic

### Critical Paths
- **Project Root**: C:\Dev\Lift321 (ACTIVE DEV)
- **GitHub**: https://github.com/WillyDrucker/Lift321
- **Historical Context**: Fresh React Native build informed by previous project learnings (reference code at C:\Dev\Wills321 - untouched)
- **Branch**: Claude-v1.0.4 (diagnostic phase)

### Next Steps (After Runtime Fixes)
1. Auth: AuthContext + service + validation + error states
2. Supabase: Auth providers + policies + user profiles table
3. OR App Features: Workout logging + training plans + history/analytics
4. Shared: Loading indicator + error component + toast notifications

---

**Version**: 1.0.4
**Last Updated**: 2025-11-11
**Status**: Diagnostic Phase - Runtime Errors Identified, Onboarding Doc Created
