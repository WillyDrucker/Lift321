# LIFT 3-2-1 PROJECT NOTES

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.0.4 - MainActivity Base UI Complete (2025-11-10)
**Branch**: mainactivity-base-ui (merged to main)

**Summary**: Complete MainActivity base UI implementation with hamburger sidebar, day selector tabs, workout preview card, bottom navigation, and Start Workout button. All components fully tokenized with zero magic numbers. Slide-out sidebar drawer replaces dropdown menu.

**What Was Built**:
- Top Bar with Hamburger Menu
  - Hamburger icon on left, LIFT logo centered
  - Top bar positioned 32px from top (theme.spacing.xl)
  - Transparent background matching screen
  - 60px height with 44px touch targets
- Slide-Out Sidebar Drawer
  - Replaces SimpleMenu dropdown with professional drawer
  - Slides from left using React Native Animated API
  - 70% screen width with dark overlay backdrop
  - 300ms smooth animation (slide in/out)
  - Tap outside to close functionality
  - Menu items: Settings, Profile, Logout
  - Properly handles animation state for repeated open/close
- Day Selector Tabs
  - 7-day tabs (Mon-Sun) in horizontal row
  - Active state with green (#00FF00) background
  - Inactive state with gray (#424242) background
  - 45px height, 8px spacing between tabs
  - 16px spacing below tabs to workout card
- Workout Preview Card
  - Shows selected day's workout name and exercises
  - Day name in Bebas Neue with green color and text shadow
  - 4 placeholder exercises with bullet points
  - Card background (#303030) with 20px padding
  - 12px border radius, 16px horizontal margins
- Start Workout Button
  - Prominent green (#00FF00) button below workout card
  - Text: "START WORKOUT!" in 32px Bebas Neue
  - Tight letter spacing (0) for compact look
  - Multi-layer shadow system (3 layers, Android compatible)
  - 60px height, 8px margin from workout card
  - Perfect vertical text centering
  - Press state: 0.8 opacity
  - Console.log handler (ready for navigation)
- Bottom Navigation Bar
  - 5 buttons: Plans, History, Home, Stats, Profile
  - SVG icons with active/inactive states
  - Active: green (#00FF00), Inactive: gray (#666666)
  - 70px height, 1px top border
  - Icon size: 24px
- SVG Icon System Expansion
  - Created 6 new icons: HamburgerIcon, HomeIcon, PlansIcon, HistoryIcon, StatsIcon, ProfileIcon
  - All icons scalable with size and color props
  - Consistent stroke width and design language

**New Design Tokens Added**:
- Layout tokens (theme.layout):
  - `topBar.height: 60` - Top bar height
  - `topBar.iconButtonSize: 44` - Touch target size
  - `topBar.iconSize: 28` - Actual icon size
  - `bottomNav.height: 70` - Bottom nav bar height
  - `bottomNav.iconSize: 24` - Nav icon size
  - `bottomNav.paddingVertical: 10`
  - `bottomNav.paddingHorizontal: 16`
  - `dayTabs.height: 45` - Day tab height
  - `dayTabs.spacing: 8` - Space between tabs
  - `dayTabs.paddingHorizontal: 16`
  - `dayTabs.buttonMinWidth: 45`
  - `dayTabs.marginBottom: 16` - Space below tabs
  - `workoutCard.padding: 20`
  - `workoutCard.marginHorizontal: 16`
  - `workoutCard.marginBottom: 16`
  - `workoutCard.borderRadius: 12`
  - `workoutCard.exerciseSpacing: 12`
  - `sidebar.widthPercentage: 70`
  - `sidebar.animationDuration: 300`
  - `sidebar.itemPaddingVertical: 16`
  - `sidebar.itemPaddingHorizontal: 24`
  - `bullet.size: 6` - Bullet point diameter
  - `bullet.borderRadius: 3`
  - `border.thin: 1` - Thin borders
  - `border.medium: 2` - Medium borders
- Color tokens (theme.colors):
  - `navActive: #00FF00` - Active navigation item
  - `navInactive: #666666` - Inactive navigation items
  - `tabActive: #00FF00` - Active tab
  - `tabInactive: #424242` - Inactive tab
  - `tabActiveText: #000000` - Text on active tab
  - `tabInactiveText: #B0B0B0` - Text on inactive tab
  - `overlayBackground: rgba(0, 0, 0, 0.5)` - Sidebar backdrop
- Typography tokens (theme.typography):
  - `letterSpacing.tight: 0` - Tight letter spacing
  - `letterSpacing.normal: 1` - Normal letter spacing
  - `letterSpacing.wide: 2` - Wide letter spacing

**Complete Tokenization**:
- Removed ALL magic numbers from MainActivity
- Every dimension uses theme tokens
- HamburgerIcon size: theme.layout.topBar.iconSize
- Letter spacing: theme.typography.letterSpacing.*
- Bullet points: theme.layout.bullet.*
- Borders: theme.layout.border.*
- All spacing: theme.spacing.* or theme.layout.*
- ZERO hard-coded values remaining

**Files Created**:
- `src/components/Sidebar.tsx` - Slide-out drawer component
- `src/components/icons/HamburgerIcon.tsx` - Menu icon
- `src/components/icons/HomeIcon.tsx` - Home nav icon
- `src/components/icons/PlansIcon.tsx` - Plans nav icon
- `src/components/icons/HistoryIcon.tsx` - History nav icon
- `src/components/icons/StatsIcon.tsx` - Stats nav icon
- `src/components/icons/ProfileIcon.tsx` - Profile nav icon

**Files Modified**:
- `src/features/main/screens/MainActivity.tsx` - Complete rebuild with all UI elements
- `src/theme/layout.ts` - Added extensive layout tokens
- `src/theme/colors.ts` - Added navigation and tab colors
- `src/theme/typography.ts` - Added letter spacing tokens
- `src/components/icons/index.ts` - Added new icon exports

**Files Deleted**:
- `src/components/SimpleMenu.tsx` - Replaced by Sidebar

**Technical Achievements**:
- Animated drawer with proper state management (modal visibility separate from animation)
- Multi-layer shadow pattern applied consistently
- Type-safe navigation throughout
- Memoized callbacks with useCallback
- Perfect vertical text centering (includeFontPadding: false)
- All components follow CLAUDE_DEV_STANDARDS

**User Decisions**:
- Top bar: Hamburger left, LIFT logo centered
- Sidebar: 70% width, left side, tap-outside-to-close
- Day tabs: Row of 7 days, tappable to switch workouts
- Start button: Below card, 8px spacing, "START WORKOUT!" with tight letters
- Bottom nav: 5 buttons (Plans, History, Home, Stats, Profile)
- Workout card: Medium detail (day + exercise list)

**Testing**:
- Sidebar slides in/out smoothly on every open/close
- Day tabs switch workout preview correctly
- Bottom nav highlights active item
- Start button press state works
- All navigation flows tested

**Git Commits** (mainactivity-base-ui branch):
- Created SVG icon components
- Added design tokens for navigation, tabs, sidebar
- Created Sidebar component with slide animation
- Updated MainActivity with complete UI
- Fixed sidebar animation state management
- Added Start Workout button
- Multiple styling refinements (spacing, fonts, centering)
- Merged to main branch

**Key Learnings**:
- Modal visibility must be separate from animation state for proper slide-out
- Android text centering requires includeFontPadding: false
- Bebas Neue font creates strong fitness aesthetic
- Consistent token usage prevents drift and ensures maintainability

**Next Steps**: Implement workout tracking screen, connect authentication logic, build out other navigation screens

---

### v1.0.3 - Navigation Complete & Full Tokenization (2025-11-10)
**Branch**: Claude-v1.0.3

**Summary**: React Navigation implemented with LoginFormScreen and MainActivity. Complete tokenization of all screens - all magic numbers moved to global theme tokens. SVG icon system created. Shadow system refined with pure black base dropping straight down.

**What Was Built**:
- React Navigation setup
  - Installed @react-navigation/native and @react-navigation/native-stack
  - Configured navigation container with slide_from_right animation
  - Type-safe navigation with RootStackParamList
- LoginFormScreen (complete member login form)
  - Email and password inputs with focus states
  - Password visibility toggle with SVG eye icons
  - Forgot Password link
  - Continue button
  - OR divider (white, 1px)
  - Google and Facebook login buttons
  - Form centered vertically on screen
  - Header with back chevron and Support text at 100px from top
- MainActivity (guest user landing screen)
  - LIFT logo and text at top (100px from top, 32px left)
  - Gray background (no gym image)
  - Ready for main app content
- Third button on LoginScreen
  - "LOGIN AS GUEST" button added below "I HAVE AN ACCOUNT"
  - Lighter gray background (#424242 - backgroundTertiary)
  - Mixed text: "LOGIN AS " (white) + "GUEST" (yellow #FFFF00)
  - Navigates to MainActivity
- SVG Icon System
  - Installed react-native-svg
  - Created LeftChevron, RightChevron, EyeOpen, EyeClosed components
  - All icons accept size and color props
  - Reusable across app

**New Theme Module - layout.ts**:
- Created src/theme/layout.ts with all layout constants
- `layout.header`: topSpacing (100), indent (32)
- `layout.logo`: size (40), borderRadius (20)
- `layout.form`: inputHeight (50), inputBorderWidth (2), inputBorderRadius (8), inputHorizontalMargin (5), buttonHorizontalMargin (32), dividerSpacing (32), dividerThickness (1)
- `layout.bottom`: buttonSpacing (100)
- Added to theme exports in tokens.ts

**Theme Enhancements**:
- Enhanced buttons.ts with shadowLayers tokens
  - layer1: {top: 1, left: 0, right: 0, opacity: 0.4}
  - layer2: {top: 2, left: 0, right: 0, opacity: 0.25}
  - layer3: {top: 3, left: 0, right: 0, opacity: 0.15}
- Added new color tokens to colors.ts:
  - textYellowMaintenance: #FFFF00 (for "GUEST" text)
  - backgroundTertiary: #424242 (for guest button)
  - shadowBlack: #000000 (pure black for shadows documentation)
- Updated shadows.ts:
  - All text shadows drop straight down (width: 0 in offset)
  - Updated opacity values for better visibility
  - Added comments about pure black base

**Shadow System Refinement**:
- Changed shadows to drop straight down (removed horizontal shift)
- Updated opacity progression: 0.4 (strong base) → 0.25 (medium) → 0.15 (light fade)
- Pure black (#000000) base for all shadows
- Applied to all button shadows and logo shadows across all screens
- Provides clear distinction between elements and shadows while maintaining natural fade

**Complete Tokenization**:
- Removed ALL local constants from all screens
- LoginScreen: Now uses theme.layout.*, theme.buttons.shadowLayers.*
- MainActivity: Now uses theme.layout.*, theme.buttons.shadowLayers.*
- LoginFormScreen: Now uses theme.layout.form.*, theme.layout.header.*
- Zero magic numbers remaining in any screen
- All values sourced from global theme tokens

**CLAUDE_DEV_STANDARDS Applied**:
- All modified files reformatted with section headers
- Added descriptive comments to all section headers
- Consistent structure: TYPES → COMPONENT → STATE → EVENT HANDLERS → RENDER → STYLES
- All files meet standards requirements

**Files Modified**:
- `src/features/auth/screens/LoginScreen.tsx` - Added third button, fully tokenized
- `src/features/auth/screens/LoginFormScreen.tsx` - Applied standards, fully tokenized
- `src/features/main/screens/MainActivity.tsx` - Applied standards, fully tokenized
- `src/theme/colors.ts` - Added 3 new color tokens
- `src/theme/buttons.ts` - Added shadowLayers tokens
- `src/theme/shadows.ts` - Updated offsets and opacity values
- `src/theme/tokens.ts` - Added layout module export
- `src/navigation/types.ts` - Added MainActivity route
- `App.tsx` - Added MainActivity screen, navigation setup

**Files Created**:
- `src/theme/layout.ts` - Layout constants token module
- `src/features/main/screens/MainActivity.tsx` - Guest user screen
- `src/components/icons/LeftChevron.tsx` - SVG back button icon
- `src/components/icons/RightChevron.tsx` - SVG forward icon (for future use)
- `src/components/icons/EyeOpen.tsx` - SVG show password icon
- `src/components/icons/EyeClosed.tsx` - SVG hide password icon
- `src/components/icons/index.ts` - Icon barrel exports

**Navigation Setup**:
- Native stack navigator with slide_from_right animation
- LoginScreen → LoginFormScreen (via "I HAVE AN ACCOUNT")
- LoginScreen → MainActivity (via "LOGIN AS GUEST")
- Type-safe navigation with RootStackScreenProps
- Back navigation with LeftChevron icon

**User Decisions**:
- Navigation: slide_from_right animation for all screen transitions
- LoginFormScreen: Form centered vertically, header at 100px from top
- MainActivity: Simple gray background (no gym image for this screen)
- Guest button: Lighter gray (#424242) with yellow "GUEST" text (#FFFF00)
- Shadow system: Pure black base, straight down, 0.4 → 0.25 → 0.15 fade
- Icons: SVG-based for scalability and customization
- All layout values: Centralized in theme.layout tokens
- Input margins: 5px for inputs, 32px for buttons (dual spacing system)
- Divider: White, 1px thick
- Password toggle: Eye icon (SVG) instead of emoji

**Testing**:
- All navigation flows working (LoginScreen ↔ LoginFormScreen ↔ MainActivity)
- Icons rendering correctly (LeftChevron, EyeOpen, EyeClosed)
- Shadows visible and consistent across all screens
- Form inputs focus correctly
- Button press states working
- Required Metro bundler reset + Android rebuild after installing react-native-svg

**Key Learnings**:
- Native modules (react-native-svg) require full rebuild (Metro reset + gradlew clean + npm run android)
- Tokenization at this level (zero magic numbers) requires discipline but pays off in consistency
- Shadow opacity of 0.4 at base provides clear distinction on gray buttons
- SVG icons more professional than emoji for UI elements
- Dual spacing system (5px inputs, 32px buttons) works well for modern mobile UI

**Next Steps**: Implement authentication logic, connect forms to Supabase Auth, add form validation

---

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

**Current Version**: 1.0.3
**Last Updated**: 2025-11-10
