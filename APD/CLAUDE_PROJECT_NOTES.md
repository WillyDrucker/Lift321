# LIFT 3-2-1 PROJECT NOTES

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.0.2 - LoginScreen Complete & Design Tokens Fully Implemented (2025-11-10)
**Branch**: Claude-v1.0.2

**Summary**: LoginScreen fully designed and implemented with complete design token system. All magic numbers and hard-coded values tokenized. Gradle upgraded for Android Studio compatibility.

**What Was Built**:
- Complete LoginScreen with brand design
  - Gym background image (gym-background.png)
  - Bebas Neue custom font for "LIFT" heading
  - Roboto for UI text (GUARANTEED, OPTIMAL, RESULTS, buttons)
  - Pure green (#00FF00) "RESULTS" text on dark gray (#1E1E1E) background
  - Multi-layer shadow system for buttons and logo (Android compatible)
  - Text shadows on all brand elements
- New theme modules:
  - `src/theme/shadows.ts` - Text shadows, view shadows, elevation values
  - `src/theme/buttons.ts` - Button sizing, padding, border radius, margins
  - Updated `src/theme/typography.ts` - Actual fonts (Bebas Neue, Roboto)
- Refactored App.tsx and LoginScreen.tsx to CLAUDE_DEV_STANDARDS
- Tokenized all styling values (no magic numbers remaining)

**Gradle Upgrade**:
- Upgraded from Gradle 9.0.0 to 9.2.0 (latest stable)
- Updated Foojay Toolchains plugin from 0.5.0 to 1.0.0
- Patched React Native gradle plugin for Gradle 9 compatibility using patch-package
- Resolved Android Studio Gradle sync issues
- Committed to Claude-v1.0.1 branch and merged to main

**Custom Fonts**:
- Downloaded Bebas Neue from Google Fonts
- Created `react-native.config.js` with fonts configuration
- Ran `npx react-native-asset` to link fonts to Android
- Updated theme tokens with actual font families

**Multi-Layer Shadow Pattern**:
- Discovered Android elevation doesn't render reliably on all backgrounds
- Implemented 3-layer View approach for consistent cross-platform shadows
- Pattern: 3 semi-transparent Views positioned progressively (1-3px offset, 0.1-0.2 opacity)
- Applied to buttons and logo
- Text shadows use native `textShadow*` properties (work fine on both platforms)

**Design Token System**:
- Fully implemented (no longer placeholders)
- All values extracted from LoginScreen and tokenized
- Font families: brand (Bebas Neue), primary (Roboto), system (fallback)
- Font sizes: xs(12), s(14), m(16), l(20), xl(32), xxl(64)
- Text shadows: default, subtle, strong
- Button dimensions: heights, paddings, border radii, margins
- All LoginScreen styles now use tokens exclusively

**CLAUDE_DEV_STANDARDS Applied**:
- File headers with description, dependencies, usage
- Section comments (=== TYPES ===, === COMPONENT ===, etc.)
- Constants above StyleSheet.create
- Absolute imports with @/ aliases
- TypeScript strict typing
- Semantic naming throughout

**Files Modified**:
- `src/features/auth/screens/LoginScreen.tsx` - Fully refactored with tokens
- `src/theme/typography.ts` - Added real fonts (Bebas Neue, Roboto)
- `src/theme/tokens.ts` - Export new modules (shadows, buttons)
- `App.tsx` - Applied CLAUDE_DEV_STANDARDS formatting
- `android/gradle/wrapper/gradle-wrapper.properties` - Gradle 9.2.0
- `android/settings.gradle` - Foojay plugin 1.0.0
- `package.json` - Added postinstall: patch-package

**Files Created**:
- `src/theme/shadows.ts` - Shadow token definitions
- `src/theme/buttons.ts` - Button token definitions
- `react-native.config.js` - Font linking configuration
- `assets/fonts/BebasNeue-Regular.ttf` - Custom font
- `src/assets/images/gym-background.png` - Background image
- `src/assets/images/logo.png` - App logo
- `patches/@react-native+gradle-plugin+*` - Gradle 9 compatibility patch

**Testing**:
- App runs successfully in Android emulator
- All fonts render correctly
- Shadows visible on both text and buttons
- Background image loads properly
- Button interactions work (press states)

**Git Commits** (estimated):
- Gradle 9.2.0 upgrade and React Native compatibility fixes
- Add .claude/ to .gitignore
- Merge Claude-v1.0.1 to main
- LoginScreen implementation with design tokens
- Theme module additions (shadows, buttons, typography updates)
- CLAUDE_DEV_STANDARDS applied to all files

**Known Issues Discovered**:
- Android elevation doesn't work reliably on ImageBackground
- Solution: Multi-layer View shadow approach (documented in CLAUDE_SESSION_HANDOFF.md)
- Metro bundler requires cache reset after adding fonts/images

**User Decisions**:
- Bebas Neue for brand text, Roboto for UI
- Pure green (#00FF00) primary color on dark charcoal (#1E1E1E)
- 16px spacing system (theme.spacing.m)
- Gym background image aesthetic
- Multi-layer shadow approach for consistency

**Next Steps**: Set up React Navigation for screen transitions, build signup/login form screens

---

### v1.0.0 - Foundation Complete (2025-11-09)
**Branch**: Claude-v1.0.0

**Summary**: Initial project creation with complete foundation, architecture, and design token system.

**What Was Built**:
- React Native 0.82.1 initialized with TypeScript
- Complete folder structure (feature-based architecture)
- Design token system (global theme with semantic naming)
- TypeScript strict mode + absolute imports configured
- Supabase client setup with AsyncStorage persistence
- Navigation type definitions (type-safe routes)
- AuthContext template (Context + custom hook pattern)
- Comprehensive APD documentation (CLAUDE.md, CLAUDE_DEV_STANDARDS.md, CLAUDE_SESSION_HANDOFF.md, this file, CLAUDE_ACTIVE.md)

**Dependencies**: 891 packages, 0 vulnerabilities

**Key Technical Decisions**:
- Styling: StyleSheet + Design Tokens (NOT NativeWind)
- State: Context API + Hooks (NOT Redux)
- Backend: Supabase brand new project (NOT Will's 3-2-1)
- Architecture: Feature-based (NOT file-type based)
- Imports: Absolute with @/ aliases (NO relative paths)

**Design Token Philosophy**:
- Token **system** established (architecture/pattern)
- Token **values** are placeholders (will evolve during UI development)
- NOT recreating Will's 3-2-1 specific values

**Patterns Established**:
- Context + custom hook with memoization
- Service layer separation (business logic from UI)
- Absolute imports via tsconfig + babel
- TypeScript strict mode enforced
- File headers with section comments
- Semantic naming (purpose over appearance)

**Intentionally NOT Implemented**:
- UI components (Button, Card, Input, Selector)
- Screen implementations
- Business logic (stubs only)
- Supabase schema and generated types

**Errors Encountered and Resolved**:
1. React Native init deprecated → switched to `@react-native-community/cli`
2. TypeScript template flag error → removed (default in 0.82+)
3. Empty folder issue → fixed with correct path format

**Git**: Repository initialized, initial commit on Claude-v1.0.0

#### Session Update - Documentation & GitHub Setup (2025-11-09)

**What Was Completed**:
- Combined CLAUDE.md into README.md (single source of truth)
- README.md now serves dual purpose: project docs + Claude memory source
- Created GitHub repository: https://github.com/WillyDrucker/Lift321
- Pushed all code to GitHub (main and Claude-v1.0.0 branches synced)
- Configured Supabase credentials in .env file
- Verified Metro bundler runs successfully (http://localhost:8081)

**Documentation Restructure**:
- Added "Purpose" and "Read Order" sections to README.md
- Updated CLAUDE_SESSION_HANDOFF.md references from CLAUDE.md to README.md
- Deleted APD/CLAUDE.md (consolidated into README.md)
- All documentation now follows Will's 3-2-1 pattern

**User Decisions**:
- Skip database schema design for now (design when needed)
- Skip emulator setup for now (Android Studio or physical device later)
- Focus on building UI components first

**Environment Setup**:
- Supabase project created and credentials configured
- Metro bundler tested and confirmed working
- GitHub repository created and all code synced

**Git Commits**:
- 710df35: Combine CLAUDE.md into README.md
- d547472: Add CLEAR SECTION HEADERS standard and expand all rule descriptions
- 0713398: Restructure APD documentation to match Will's 3-2-1 pattern
- 673226f: v1.0.0 Lift 3-2-1 Foundation Complete

---

## Technical Notes

### Absolute Imports Configuration
- `tsconfig.json`: baseUrl + paths for @/ aliases
- `babel.config.js`: module-resolver plugin

### Supabase Client
- AsyncStorage for session persistence
- Auto refresh tokens enabled
- Type-safe with Database generic

### React Navigation
- Type-safe routes via RootStackParamList
- Global type augmentation
- Screen props helper type

### Custom Fonts (v1.0.2+)
- Linked via `react-native.config.js` + `npx react-native-asset`
- Bebas Neue for brand elements
- Roboto for UI text (Android default)
- Font files in `assets/fonts/`

### Multi-Layer Shadows (v1.0.2+)
- Android elevation unreliable on ImageBackground
- Solution: 3 stacked semi-transparent Views
- Progressive offset (1-3px) and opacity (0.1-0.2)
- See CLAUDE_SESSION_HANDOFF.md for pattern

### Design Token System (v1.0.2+)
- `theme.colors` - Semantic color names
- `theme.spacing` - 16px-based rhythm
- `theme.typography` - Fonts, sizes, weights
- `theme.textShadows` - Text shadow presets
- `theme.viewShadows` - iOS view shadows
- `theme.elevation` - Android elevation
- `theme.buttons` - Button dimensions

---

## Critical Context

**What This Project IS**:
- Brand new React Native + TypeScript app
- Built from scratch with modern best practices
- Inspired by lessons from Will's 3-2-1

**What This Project IS NOT**:
- NOT a code migration
- NOT using Will's 3-2-1 Supabase
- NOT recreating Will's 3-2-1 design values

**Will's 3-2-1 Role**: Reference for patterns only (C:\Dev\Wills321 - UNTOUCHED)

---

**Current Version**: 1.0.2
**Last Updated**: 2025-11-10
