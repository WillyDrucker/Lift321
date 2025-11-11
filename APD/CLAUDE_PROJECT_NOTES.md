# LIFT 3-2-1 PROJECT NOTES

## What This File Does

This is the comprehensive version history and changelog for the Lift 3-2-1 project. It provides a detailed record of what was built in each version, why decisions were made, what problems were solved, and what was learned. Each version entry documents features implemented, files created or modified, user decisions, technical challenges, and key learnings. This file grows with the project and maintains institutional knowledge across sessions. Older versions (3+ versions back) are condensed to 3-5 line summaries to keep the file manageable, while recent versions remain detailed for reference.

**IMPORTANT**: This file should ONLY contain summarized version history and high-level decisions. Exact code examples, detailed bug reproductions, and technical implementation details belong in CLAUDE_ACTIVE.md. Only store code references here if they document absolutely critical bugs or solutions that must be preserved long-term.

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.0.4a - MainActivity Base UI Complete (2025-11-10)
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

### v1.0.4b - Documentation Optimization & Standards Enhancement (2025-11-11)
**Branch**: Claude-v1.0.4 (merged to main)

**Summary**: Major documentation system overhaul with optimized reference formats, new GLOBAL-FIRST development standard, enhanced file purposes, and complete removal of external project references. Documentation reduced by 60%+ while preserving all critical information.

**Documentation Optimization**:
- CLAUDE_SESSION_HANDOFF.md: Reduced from 521 to 239 lines (54% smaller)
  - Converted verbose content to lean table/grid format
  - Design tokens, layout values, shadow layers in scannable tables
  - Architectural patterns condensed with REQUIRED rules
  - Environment status compressed to pipe-separated format
- CLAUDE_PROJECT_NOTES.md: Reduced from 464 to ~130 lines (72% smaller)
  - All versions v1.0.0-v1.0.3 condensed to 4-line summary
  - Historical context preserved, verbosity removed
- CLAUDE_ACTIVE.md: Reduced from 212 to 87 lines (59% smaller)
  - Pruned stale v1.0.0 session notes and outdated sections
  - Kept essential: Commands, Button template
  - Redefined as code reference scratchpad (<100 lines target)

**New Development Standard**:
- Added Standard #9: GLOBAL-FIRST PATTERN to CLAUDE_DEV_STANDARDS.md
  - Establish global files first for all reusable patterns
  - Buttons, inputs, spacing, text sizes must be defined globally
  - Local customizations only after global patterns established
  - Updated CRITICAL REMINDERS to include global-first requirement

**Enhanced Documentation**:
- All APD files now have "What This File Does" sections (3-5 lines)
- SESSION_HANDOFF: Context restoration for immediate work
- PROJECT_NOTES: Version history with institutional knowledge
- CLAUDE_ACTIVE: Code reference scratchpad for exact examples/bugs
- DEVDOC policy: No code in SESSION_HANDOFF/PROJECT_NOTES unless critical

**Reference Cleanup**:
- Removed all external project references from documentation and code
- Kept minimal historical context in SESSION_HANDOFF
- Updated to "previous project learnings" language
- Files cleaned: README.md, CLAUDE_DEV_STANDARDS.md, CLAUDE_ACTIVE.md, CLAUDE_PROJECT_NOTES.md, CLAUDE_SESSION_HANDOFF.md, colors.ts, spacing.ts, client.ts, .env.example

**README.md Streamlined**:
- Removed verbose sections (folder structure, current state, getting started)
- Kept essential: project overview, patterns, critical standards
- Updated token note to emphasize architecture over specific values

**USERPROMPT System**:
- New USERPROMPT folder for prompt tracking
- USERPROMPT-Claude-v1.0.4.md created by DEVDOC Agent
- Captures all prompts with verbatim text, translation, summary

**Documentation Flow Clarified**:
- SESSION_HANDOFF: Summarized patterns only (no code unless critical)
- PROJECT_NOTES: Summarized history only (no code unless critical)
- CLAUDE_ACTIVE: All code examples, bug reproductions, technical details

**Files Modified (9)**:
- APD/CLAUDE_DEV_STANDARDS.md (Standard #9 added)
- APD/CLAUDE_SESSION_HANDOFF.md (optimized to tables)
- APD/CLAUDE_PROJECT_NOTES.md (historical versions condensed)
- APD/CLAUDE_ACTIVE.md (pruned to 87 lines)
- README.md (streamlined)
- src/theme/colors.ts (comments updated)
- src/theme/spacing.ts (comments updated)
- src/services/supabase/client.ts (comments updated)
- .env.example (comments updated)

**Files Created (1)**:
- USERPROMPT/USERPROMPT-Claude-v1.0.4.md (prompt tracking)

**Key Improvements**:
- Documentation 60%+ leaner across all files
- Table-based reference format for instant lookup
- Clear separation: summaries vs code examples
- Global-first pattern enforced in standards
- All file purposes clearly documented

---

### v1.0.4c - Design Token System Refactored (2025-11-11)
**Branch**: Claude-v1.0.4 (in progress)

**Summary**: Comprehensive design token refactoring establishing 64dp safe zone standard, complete px-to-dp conversion, expanded typography scale, new semantic color tokens, and new development standard for forward-looking comments. All auth screens fully tokenized with zero hardcoded values remaining.

**What Was Built**:
- **64dp Safe Zone Standard**: Established universal clearance from top/bottom screen edges
  - Accounts for Android navigation bar (48dp maximum) + comfortable margin (16dp)
  - Applied consistently across all screens (LoginScreen, LoginFormScreen, SignUpScreen)
  - New `theme.spacing.safeZone: 64` and `theme.spacing.safeZoneHorizontal: 32`
- **Complete px to dp Conversion**: Removed ALL "px" references from code and comments
  - All measurements now use "dp" (density-independent pixels) terminology
  - Confirmed numeric values in React Native are always dp by default
  - Updated comments throughout to reflect correct unit system
- **Expanded Color Token System**: Added 5 new semantic color tokens with full documentation
  - `primaryMuted: #00BF00` - 75% brightness green for softer accents
  - `pureBlack: #000000` - True black for maximum contrast backgrounds
  - `pureWhite: #FFFFFF` - Maximum contrast for bright UI elements
  - `googleBlue: #4285F4` - Official Google brand color
  - `facebookBlue: #1877F2` - Official Facebook brand color
  - All colors include hex value, description, and use case documentation
- **Expanded Typography Scale**: Grew from 6 to 9 font sizes based on 16dp baseline
  - Added `xl: 24dp` (1.5× baseline) - Small headlines, section titles
  - Added `xxl: 28dp` (1.75× baseline) - Medium headlines, sub-headers
  - Added `xxxl: 32dp` (2× baseline) - Large headlines, page titles
  - Added `display: 48dp` (3× baseline) - Hero text, main branding
  - Added `mega: 64dp` (4× baseline) - Extra large display text
  - Follows rem-like scaling pattern for consistency
- **Enhanced Spacing Tokens**: Added context-specific spacing values
  - `safeZone: 64` - Standard clearance from top/bottom edges
  - `safeZoneHorizontal: 32` - Standard horizontal clearance
  - `textLineGap: 10` - Vertical spacing between text lines
  - `textGroupSpacing: 32` - Spacing between text groups/paragraphs
  - `buttonSpacing: 16` - Vertical spacing between stacked buttons
- **Updated Layout Tokens**: Standardized to 64dp safe zone
  - `header.topSpacing: 64` (changed from 100dp to match safe zone)
  - `bottom.safeZone: 64` - Distance from bottom for interactive elements
  - `bottom.buttonGroupPadding: 48` - Container padding (48dp + 16dp margin = 64dp visual)
  - Added `icon` sizes: small (16), medium (24), large (32), xlarge (40)
  - Added `backgroundImage` configuration: topSpacing (32), widthPercentage (80), heightPercentage (70), opacity (0.5)

**Screen Refactoring** (All Fully Tokenized):
- **LoginScreen**: All spacing/typography uses tokens, zero hardcoded values
  - Header positioning: `theme.spacing.safeZone` and `theme.spacing.safeZoneHorizontal`
  - Text sizes: `theme.typography.fontSize.xxxl` and `theme.typography.fontSize.display`
  - Text spacing: `theme.spacing.textLineGap` for consistent line gaps
  - Button container: `theme.layout.bottom.buttonGroupPadding` for proper bottom clearance
- **LoginFormScreen**: Social media colors tokenized, header uses layout tokens
  - Google button: `theme.colors.pureWhite` background, `theme.colors.googleBlue` logo, `theme.colors.pureBlack` text
  - Facebook button: `theme.colors.facebookBlue` background, `theme.colors.pureWhite` text/logo
  - Header positioning: `theme.layout.header.topSpacing` and `theme.spacing.safeZoneHorizontal`
  - Button spacing: `theme.spacing.buttonSpacing` between stacked buttons
- **SignUpScreen**: Background image tokenized, all colors semantic
  - Background: `theme.colors.pureBlack` for true black backgrounds
  - Text colors: `theme.colors.primaryMuted` for softer green accents
  - Background image: Uses `theme.layout.backgroundImage` tokens for positioning and opacity
  - Bottom positioning: `theme.layout.bottom.safeZone` for button clearance

**New Development Standard**:
- **Standard #10: Forward-Looking Comments** added to CLAUDE_DEV_STANDARDS.md
  - Comments must explain design intent and purpose, not historical changes
  - Example (Bad): "Changed from 50dp to 64dp to fix alignment issue"
  - Example (Good): "64dp safe zone clearance for system UI compatibility"
  - Historical context belongs in git history, not code comments
  - Keeps code clean, focused on present intent, prevents stale historical artifacts
- Updated CRITICAL REMINDERS: "NO historical comments"
- Updated CLAUDE.md with new standard in Essential Patterns and Critical Standards

**Files Modified (11)**:
- `src/theme/colors.ts` - Added 5 new semantic color tokens with documentation
- `src/theme/spacing.ts` - Added safe zone and context-specific spacing tokens
- `src/theme/typography.ts` - Expanded from 6 to 9 font sizes
- `src/theme/layout.ts` - Updated to 64dp standard, added icon sizes and backgroundImage settings
- `src/features/auth/screens/LoginScreen.tsx` - Fully tokenized, zero hardcoded values
- `src/features/auth/screens/LoginFormScreen.tsx` - Social colors tokenized, header uses layout tokens
- `src/features/auth/screens/SignUpScreen.tsx` - Complete tokenization with semantic colors
- `APD/CLAUDE_DEV_STANDARDS.md` - Added Standard #10 (Forward-Looking Comments)
- `APD/CLAUDE.md` - Updated with new standard
- `APD/CLAUDE_SESSION_HANDOFF.md` - Comprehensive documentation of session work
- `APD/CLAUDE_PROJECT_NOTES.md` - This file, version history updated

**Technical Concepts Covered**:
- React Native dp (density-independent pixels) vs physical pixels
  - Numeric values in React Native are dp by default, not px
  - At 480dpi (xxhdpi), 1dp = 3 physical pixels
  - dp provides consistent sizing across different screen densities
- Android SafeAreaView behavior
  - Handles status bar but NOT navigation bar on Android
  - Need manual bottom padding to account for navigation bar
- Design token systems and semantic naming
  - Purpose-driven names (primaryMuted) not literal (lightGreen)
  - Token architecture matters more than specific values
  - Tokens evolve during development
- Typography scaling systems
  - 16dp baseline with rem-like scaling (1.5×, 1.75×, 2×, 3×, 4×)
  - Consistent scale makes sizing decisions predictable
- Flexbox responsive layouts
  - `flex: 1` with `justifyContent: 'center'` for automatic vertical centering
  - Percentage-based sizing for responsive backgrounds

**User Decisions**:
- Establish 64dp as standard safe zone clearance (top/bottom)
- Use 32dp as standard horizontal clearance
- All measurements in dp (density-independent pixels)
- 16dp as baseline for typography scaling (rem-like system)
- Comments must be forward-looking, not historical
- Token architecture matters more than exact values (values can evolve)

**Key Learnings**:
- React Native uses dp by default - no need to specify unit
- SafeAreaView doesn't handle Android nav bar - manual padding required
- 64dp safe zone (48dp nav bar + 16dp margin) provides comfortable clearance
- Consistent token usage prevents drift and ensures maintainability
- Forward-looking comments keep code clean and prevent confusion
- Semantic naming (primaryMuted) communicates intent better than literal (lightGreen)

**Testing Status**: Not yet tested on Android emulator - needs verification of all token rendering

**Next Steps**: Test refactored screens on Android emulator, verify tokens render correctly, continue with app features (authentication logic, workout logging, training plans)

---

### Historical Versions (v1.0.0 - v1.0.3)

**v1.0.0-v1.0.3 Summary**: Project evolved from foundation (React Native 0.82.1 with TypeScript, Supabase, feature-based architecture, design token system) through LoginScreen implementation with custom fonts (Bebas Neue/Roboto), multi-layer shadows, and complete tokenization, to full navigation setup with React Navigation, LoginFormScreen, MainActivity, SVG icon system, and theme.layout module. Gradle upgraded to 9.2.0 for Android Studio compatibility. All screens fully tokenized with zero magic numbers, shadow system refined to pure black dropping straight down (0.4→0.25→0.15 opacity fade). Navigation flows: LoginScreen ↔ LoginFormScreen ↔ MainActivity with slide_from_right animation and type-safe routing.

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
- Bebas Neue: Brand headings, screen titles, button text
- Roboto: Body text, input fields, descriptions

### Multi-Layer Shadow Pattern (v1.0.2+)
- Pure black (#000000) base
- Three positioned Views with decreasing opacity (0.4 → 0.25 → 0.15)
- Android compatible (no shadowColor prop)
- Drops straight down (left: 0, right: 0, varying top offset)

### Design Token Modules
- `theme.colors` - Semantic color palette
- `theme.spacing` - 16px base rhythm
- `theme.typography` - Font sizes, weights, letter spacing
- `theme.textStyles` - Pre-built text combinations
- `theme.textShadows` - Text shadow presets
- `theme.viewShadows` - View shadow presets
- `theme.elevation` - Android elevation values
- `theme.buttons` - Button dimensions, shadow layers
- `theme.layout` - Layout constants (header, logo, form, bottom, topBar, bottomNav, dayTabs, workoutCard, sidebar)

---

## Critical Context

**What This Project IS**:
- Brand new React Native + TypeScript app (Lift 3-2-1)
- Built from scratch with modern best practices
- Fresh implementation informed by previous project learnings

**What This Project IS NOT**:
- NOT a code migration or port
- NOT using existing backend infrastructure
- Establishing its own design system through development

---

**Current Version**: 1.0.4
**Last Updated**: 2025-11-11
