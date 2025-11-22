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

## Current Version: 1.1.5

**Branch**: Claude-v1.1.5
**Status**: Data-Driven Exercise System Complete
**Last Updated**: 2025-01-22

---

## Session State

### Current Work
- Data-driven exercise system implemented with dynamic filtering
- Duration calculator created for workout session estimates
- Exercise service built for session type logic (Standard/Express/Maintenance)
- WorkoutOverviewScreen fully refactored to use dynamic data
- Dynamic vertical line height calculation for exercise tree
- All hardcoded colors moved to theme tokens (sessionStandard/Express/Maintenance)
- CLAUDE_DEV_STANDARDS fully applied to all files
- Ready to merge to main and create v1.1.6

### Completed This Session
**v1.1.5 - Data-Driven Exercise System & Dynamic Duration** (2025-01-22):
1. **Duration Calculator Utility** (src/utils/durationCalculator.ts):
   - Formula: (totalSets × 5) + totalSets + 3 - 5 = (totalSets × 6) - 2
   - Accounts for rest time (5 min/set), workout time (1 min/set), warmup (3 min), final rest removal (-5 min)
   - Examples: Standard 6 sets = 34 min, Express 5 sets = 28 min, Maintenance 4 sets = 22 min
   - Exported: calculateWorkoutDuration() and getWorkoutDuration() helpers

2. **Exercise Service** (src/services/exerciseService.ts):
   - Loads exercises from exercises.json with type-safe filtering
   - Session type logic: Standard (3+2+1), Express (3+2), Maintenance (2+2)
   - ProcessedExercise type tracks adjusted vs original sets
   - getExercisesForWorkout() returns exercises, totalSets, breakdown
   - Foundation for equipment filtering (TODO: implement)

3. **WorkoutOverviewScreen Refactoring**:
   - Removed all hardcoded exercise JSX (180+ lines eliminated)
   - Dynamic exercise rendering with renderExercises() helper
   - Dynamic duration calculation updates with session selection
   - Dynamic vertical line height adapts to exercise count
   - Session type conversion (lowercase → PascalCase)
   - Exercise image mapping helper (getExerciseImage)

4. **Theme Token Enhancement**:
   - Added session color tokens to colors.ts:
     - sessionStandard: #00FF00 (green)
     - sessionExpress: #77FF00 (olive)
     - sessionMaintenance: #FFFF00 (yellow)
   - Eliminated all hardcoded #77ff00 and #ffff00 references

5. **CLAUDE_DEV_STANDARDS Compliance**:
   - Updated all section headers to ============ format
   - All comments forward-looking (design intent, not history)
   - All magic numbers eliminated (START_OFFSET, SET_HEIGHT, etc.)
   - Complete file headers with purpose and dependencies

### Next Session Should
1. **Equipment Filtering**: Implement equipment selection logic in exercise service
2. **Rep Count Integration**: Load rep counts from plans.json based on week
3. **Exercise Images**: Expand image mapping to cover all exercises
4. **Session Persistence**: Save user selections (session type, equipment, plan focus)
5. **Real-Time Logging**: Build workout session tracking with actual duration tracking

### User Decisions Made
- Duration formula accounts for rest, workout time, warmup, and removes final rest period
- Session types follow Lift 3-2-1 pattern: 3-2-1 (Standard), 3-2 (Express), 2-2 (Maintenance)
- Exercise service should select first exercise from each group (equipment filtering later)
- Vertical line height calculated dynamically based on exercise count
- Session colors: green (standard), olive (express), yellow (maintenance)
- All session-specific colors belong in theme.colors as semantic tokens

---

## Previous Sessions (Recent)

### v1.1.5 - Data-Driven Exercise System & Dynamic Duration (2025-01-22)
Created complete data-driven exercise system with duration calculator utility, exercise service for session type filtering, and full WorkoutOverviewScreen refactor. Duration formula: (totalSets × 6) - 2 produces accurate estimates (34/28/22 minutes for Standard/Express/Maintenance). Exercise service implements Lift 3-2-1 logic (3+2+1, 3+2, 2+2 sets). Eliminated 180+ lines of hardcoded exercise JSX with dynamic rendering. Added session color tokens to theme. Applied CLAUDE_DEV_STANDARDS to all files.

### v1.1.4 - Font Management & Title Bar Refinements (2025-01-19)
Reorganized font assets to src/assets/fonts/ for consistency with images/videos. Applied Zuume-ExtraBold custom font to workout titles with 20% horizontal scaling (scaleX: 1.2) and margin compensation. Refined title bar to 66dp height with 100x50dp "LET'S GO!" button. Added dynamic duration selector showing color-coded session lengths (green/olive/yellow). Changed all selector text to light gray for visual hierarchy. Applied translateY instead of marginTop to avoid sub-pixel rendering artifacts. Updated all files with CLAUDE_DEV_STANDARDS.

### v1.1.3 - WorkoutOverviewScreen Implementation (2025-01-18)
Built complete WorkoutOverviewScreen with 4-card system (Title/Plan/Session/Equipment), implemented multi-selector logic with "All Weights" toggle behavior, added back button to TopNavBar, standardized 8dp spacing throughout, applied 12dp text for selectors, added 1dp white border to navigation, fully tokenized all styling with forward-looking comments. Screen adapts to all workout types with complete configuration options.

### v1.1.2 - HomePage Workout Cards & Scrolling (2025-11-16)
Implemented complete workout cards system with CustomWorkoutCardsScroller (4 specialized modes), converted HomePage to flow layout with vertical scrolling, fixed z-index layering for fixed navigation bars, added all workout images, applied visual styling (32dp uppercase green titles for body parts, 16dp section headers), eliminated all magic numbers with theme tokens, updated all comments to be forward-looking. HomePage now fully scrollable with primary and specialized workout cards.

### v1.1.0 - Environment Setup & Guest Login (2025-11-15)
Configured complete environment: react-native-config installed, .env with Supabase credentials, Android gradle dotenv configuration, URL polyfill added. Implemented guest login system with AsyncStorage persistence and AUTH_CHANGE_EVENT for real-time auth updates. Fixed navigation error where "LOGIN AS GUEST" couldn't navigate to HomePage (HomePage only exists in MainNavigator). Created 18 GitHub issues: 8 EPICs and 10 features/tasks. App now fully functional on Android device.

### v1.0.15 - Phase 7: Polish & Production Readiness (2025-11-15)
Essential framework components: ErrorBoundary for crash protection, LoadingState/ErrorState/EmptyState components for consistent UX, environment validation (requireEnv, getEnv), app constants (API_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES, etc.). All components React.memo optimized with full design token compliance. Branch merged to main.

### v1.0.14 - Phase 6: Navigation Improvements (2025-11-15)
Type-safe navigation system: useTypedNavigation/useTypedRoute hooks, navigationService for imperative navigation, auth guards (useAuthGuard, useGuestGuard), 12 custom transition presets, separated AuthNavigator and MainNavigator stacks. App.tsx now switches navigators based on auth state. Complete navigation documentation. Branch merged to main.

### v1.0.13 - Phase 5: Data Layer & Architecture (2025-11-15)
Complete service infrastructure: ApiResult<T> pattern, BaseService class for CRUD operations, authService example, Supabase client configuration, apiUtils (createSuccessResponse, handleSupabaseError, validateRequiredFields, retry), type guards (isApiSuccess, isApiError). Unified error handling across entire app. Branch merged to main.

### v1.0.12 - Phase 4: Auth Screens Refactoring (2025-11-15)
Created ActionButton component (simple CTA button), refactored SignUpScreen/SignUpStep2Screen/WelcomeScreen to use ActionButton, eliminated duplicate button code across 3 screens. Small focused phase. Branch merged to main.

### v1.0.11 - Phase 3: Utils & Hook Infrastructure (2025-11-15)
Comprehensive utilities: dateUtils (20+ functions), validationUtils (15+ validators with password strength), formatUtils (25+ formatters), useFormInput hook with validation, useAnimation (fade/slide/scale), refactored useWeekCalendar to use dateUtils (53% reduction). Branch merged to main.

### v1.0.10 - Phase 2: HomePage Decomposition (2025-11-15)
Extracted 4 navigation components (TopNavBar, WeekCalendar, PlanProgressBar, BottomTabBar) and 2 hooks (useWeekCalendar, useSwipeGesture) from HomePage. Reduced HomePage from 515 lines to 137 lines (73% reduction). All components React.memo optimized. Branch merged to main.

### v1.0.9 - Phase 1: Component Library (2025-11-15)
Created reusable components: ShadowButton (3 variants, eliminated 180+ lines of duplicate code), FormInput (with focus states), PasswordInput (extends FormInput with eye toggle), SocialButton (Google/Facebook config-driven). Reduced LoginFormScreen from 400 to 252 lines (37%). Branch merged to main.

### v1.0.8 - Phase 0: Tokenization Sweep (2025-11-15)
Complete first-pass tokenization: eliminated 51 magic numbers across 5 auth screens, added 13 new design tokens (spacing.xxs, spacing.inputMarginSmall, typography.letterSpacing.*, layout.authNavigation.*, layout.socialLogin.*, buttons.opacity.*). 100% CLAUDE_DEV_STANDARDS compliance. Branch merged to main.

---

## Known Issues

### Data-Driven Exercise System (NEW)
- **Equipment filtering not implemented**: Exercise service selects first exercise from each muscle group - equipment preferences ignored
- **Rep counts hardcoded**: Currently using 10 reps for all sets - needs integration with plans.json week progression
- **Image mapping limited**: Only bench-press, incline-bench-press, chest-flyes mapped - needs expansion for all exercises
- **Solution**: Implement equipment filtering in selectExerciseFromGroup(), integrate rep counts from plans.json, expand image mapping

### Custom Font Integration
- **fontWeight breaks custom fonts**: When specifying `fontWeight` on a custom font like Zuume-ExtraBold, React Native tries to find a bold variant (e.g., "Zuume-ExtraBold-Bold") which doesn't exist, causing fallback to system font
- **Solution**: Omit fontWeight property entirely for custom fonts. The font file itself contains the weight.
- **Pattern**: Custom fonts should only specify fontFamily, fontSize, color, transform properties

### Transform Rendering
- **marginTop + scaleX causes sub-pixel artifacts**: Combining marginTop with scaleX transform can cause uneven letter heights due to sub-pixel rendering
- **Solution**: Use translateY transform instead of marginTop for vertical positioning
- **Pattern**: `transform: [{scaleX: 1.2}, {translateY: 1}]` instead of `scaleX: 1.2` + `marginTop: 1`

### Font Metrics Spacing
- **Intrinsic font spacing**: Fonts have ascent/descent metrics that add ~3dp of visual spacing
- **Solution**: Reduce margins by 3dp to achieve desired visual spacing (13dp margin = 16dp visual)
- **Pattern**: Use lineHeight matching fontSize + includeFontPadding: false + margin compensation

### Navigation & TopNavBar
- TopNavBar now supports optional back button via onBackPress prop
- Back button appears 16dp from hamburger menu when provided
- Pattern: Conditional rendering keeps component flexible for different screen types

### Scrolling & Layout
- ✅ Fixed: Flow layout approach ensures proper vertical scrolling
- ✅ Fixed: z-index layering prevents content from rendering above fixed bars
- Pattern: ScrollView renders first, fixed navigation bars overlay with higher z-index + opaque background

### Android Shadows / Metro Cache / Native Modules
- Native shadows unreliable → Use multi-layer View pattern
- New assets/modules → Restart Metro with --reset-cache, rebuild Android
- Font changes require full app rebuild (native asset linking)

### Environment Variables
- ✅ .env file configured with Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY)
- ✅ react-native-config properly configured in Android gradle
- ✅ .env file properly gitignored to protect credentials

---

## Quick Reference: Established Patterns

### Duration Calculation (NEW)
| Session Type | Total Sets | Calculation | Duration |
|--------------|------------|-------------|----------|
| **Standard** | 6 sets | (6×5) + 6 + 3 - 5 | 34 minutes |
| **Express** | 5 sets | (5×5) + 5 + 3 - 5 | 28 minutes |
| **Maintenance** | 4 sets | (4×5) + 4 + 3 - 5 | 22 minutes |

Formula breakdown: (totalSets × 5 rest) + (totalSets × 1 workout) + 3 warmup - 5 final rest

### Session Type Logic (NEW)
| Session | Major1 | Minor1 | Tertiary | Total Sets | Example (Chest) |
|---------|--------|--------|----------|------------|-----------------|
| **Standard** | 3 sets | 2 sets | 1 set | 6 sets | Bench (3) + Incline (2) + Flyes (1) |
| **Express** | 3 sets | 2 sets | 0 sets | 5 sets | Bench (3) + Incline (2) |
| **Maintenance** | 2 sets | 2 sets | 0 sets | 4 sets | Bench (2) + Incline (2) |

Pattern: Lift 3-2-1 naming comes from Standard session (3 Major, 2 Minor, 1 Tertiary)

### Custom Font Usage
| Element | Font | Transform | Margins |
|---------|------|-----------|---------|
| **HomePage Workout Title** | Zuume-ExtraBold 36dp | scaleX: 1.2, translateY: 2 | marginLeft: 11 (compensate scaleX) |
| **Title Bar "CHEST"** | Zuume-ExtraBold 36dp | scaleX: 1.2, translateY: 2 | marginLeft: 11 |
| **"LET'S GO!" Button** | Roboto 20dp Bold | none | none |

**Critical**: Never use `fontWeight` with custom fonts. Omit the property entirely.

### Title Bar Architecture
| Component | Dimensions | Spacing |
|-----------|------------|---------|
| **Title Bar** | 66dp height | 8dp horizontal padding |
| **"CHEST" Text** | 36dp font | 11dp from left edge |
| **"LET'S GO!" Button** | 100dp x 50dp | 8dp from right/top/bottom |
| **Optical Centering** | translateY: 2 | Positions text down 2dp |

### Session Colors (NEW)
| Session Type | Duration Display | Set Numbers | Theme Token |
|--------------|------------------|-------------|-------------|
| **Standard** | Green (#00FF00) | Green | theme.colors.sessionStandard |
| **Express** | Olive (#77FF00) | Olive | theme.colors.sessionExpress |
| **Maintenance** | Yellow (#FFFF00) | Yellow | theme.colors.sessionMaintenance |

**Pattern**: All session-specific colors use semantic theme tokens, never hardcoded hex values

### WorkoutOverviewScreen Architecture
| Component | Purpose | Styling |
|-----------|---------|---------|
| **Title Bar** | Workout type + LET'S GO button | 66dp height, 8dp padding, Zuume-ExtraBold |
| **Plan Card** | Plan configuration | Current Plan + Name + Week + Focus (3 selectors) |
| **Session Card** | Session type selection | Current Session + Duration + 3 type selectors |
| **Equipment Card** | Equipment selection | Current Equipment + multi-toggle selectors (2 rows) |
| **Today's Workout Card** | Dynamic exercise tree | Data-driven rendering from exercise service |

### Selector Patterns
| Selector Type | Height | Text Size | Color | Behavior |
|---------------|--------|-----------|-------|----------|
| **Primary Label** | 50dp | 24dp | #424242 gray | Display only (Current Plan, Current Session, etc.) |
| **Interactive Single** | 50dp | 24dp | White | Single selection (Plan name, Week progress) |
| **Interactive Multi** | 50dp | 12dp | #B0B0B0 gray | Multiple options (Strength/Balanced/Growth, Standard/Express/Maintenance) |
| **Equipment Toggle** | 50dp | 12dp | #B0B0B0 gray | Multi-select with "All" logic |
| **Duration Display** | 50dp | 16dp | White label, colored value | Dynamic based on session |

### Spacing System
| Spacing Type | Value | Usage |
|--------------|-------|-------|
| **Card Margins** | 8dp | Between cards, screen edges |
| **Card Padding** | 8dp | Internal card padding |
| **Selector Spacing** | 1dp | Between closely-grouped selectors |
| **Section Spacing** | 8dp | Between major sections |
| **Text Spacing Compensation** | 13dp margin | Achieves visual 16dp (compensates for 3dp font metrics) |
| **Progress Bar Gap** | 16dp | Between week text and bar |

### HomePage Architecture
| Component | Purpose | Position |
|-----------|---------|----------|
| **ScrollView** | Main content container | Fills screen, renders first |
| **topBarsContainer** | Fixed navigation overlay | Absolute position, z-index 10, opaque background |
| **TopNavBar** | Search and menu buttons | Inside topBarsContainer |
| **WeekCalendar** | Day selection | Inside topBarsContainer |
| **PlanProgressBar** | Workout plan progress | Inside topBarsContainer |
| **WelcomeBox** | User greeting (dismissible) | Inside ScrollView |
| **Section Headers** | "Primary Workouts" / "Specialized Workouts" | Inside ScrollView, 16dp text |
| **WorkoutCardsScroller** | Horizontal body part cards | Inside ScrollView |
| **CustomWorkoutCardsScroller** | Horizontal specialized workout cards | Inside ScrollView |
| **BottomTabBar** | Main navigation tabs | Absolute position (existing pattern) |

### Workout Card System
| Card Type | Title Format | Font | Examples |
|-----------|--------------|------|----------|
| **Body Part** | Uppercase green 36dp, Zuume-ExtraBold scaleX: 1.2 | Zuume-ExtraBold | CHEST, ARMS, SHOULDERS, BACK & TRIS, LEGS |
| **Specialized** | White text | Roboto | Custom Workout, Work-As-You-Go, SuperSet Mode, Partner Mode |

### Card Scrolling Pattern
- **First/Last Cards**: 330dp width for proper edge spacing
- **Middle Cards**: 320dp width for consistent 10dp peek
- **Snap Offsets**: Calculated positions for smooth card-to-card scrolling
- **Peek Pattern**: 10dp of next card visible to indicate scrollability

### Architecture Layers
| Layer | Pattern | Location |
|-------|---------|----------|
| **Components** | Reusable UI (ShadowButton, FormInput, WorkoutCard, etc.) | src/components/ |
| **Features** | Screen-specific logic (WorkoutOverviewScreen, HomePage) | src/features/ |
| **Services** | Backend operations (authService, exerciseService, BaseService) | src/services/ |
| **Navigation** | Type-safe routing (useTypedNavigation, navigationService) | src/navigation/ |
| **Utils** | Pure functions (dateUtils, validationUtils, formatUtils, durationCalculator) | src/utils/ |
| **Hooks** | Reusable logic (useFormInput, useAnimation, useWeekCalendar, useSwipeGesture) | src/hooks/ |
| **Theme** | Design tokens (colors, spacing, typography, layout) | src/theme/ |
| **Constants** | App config (API_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES) | src/constants/ |
| **Assets** | Static files (fonts, images, videos) | src/assets/ |
| **Data** | JSON data files (exercises.json, plans.json) | src/data/ |

### Component Library
| Component | Purpose | Props |
|-----------|---------|-------|
| **ShadowButton** | Primary/secondary/tertiary buttons with shadows | variant, onPress, disabled |
| **FormInput** | Text input with focus/error states | value, onChangeText, placeholder, error, rightElement |
| **PasswordInput** | Password field with show/hide toggle | Extends FormInput props |
| **SocialButton** | OAuth buttons (Google/Facebook) | provider ('google' \| 'facebook'), onPress |
| **ActionButton** | Simple CTA button | text, onPress, disabled |
| **WorkoutCard** | Workout display card | workoutType, index, totalCards |
| **WorkoutCardsScroller** | Horizontal body part cards container | - |
| **CustomWorkoutCardsScroller** | Horizontal specialized cards container | - |
| **TopNavBar** | Top navigation with optional back button | onSearchPress, onMenuPress, onBackPress? |
| **WelcomeBox** | Dismissible welcome message | userName, message, visible, translateX, opacity, panHandlers |
| **LoadingState** | Async loading UI | message?, size?, fullScreen? |
| **ErrorState** | Error UI with retry | message, onRetry?, fullScreen? |
| **EmptyState** | No data UI | title?, message, actionText?, onAction?, fullScreen? |
| **ErrorBoundary** | Crash protection | children, fallback? |

### Service Layer (NEW)
| Service/Utility | Purpose | Usage |
|-----------------|---------|-------|
| **authService** | Authentication operations | authService.signIn(credentials) |
| **exerciseService** | Exercise data loading/filtering | getExercisesForWorkout(bodyPart, sessionType) |
| **BaseService** | Generic CRUD operations | Extend for any table |
| **apiUtils** | Response/error handling | handleSupabaseQuery(queryFn) |
| **Type Guards** | Response checking | if (isApiSuccess(result)) {...} |
| **ApiResult<T>** | Unified response format | {data, error, status} |

### Utilities (NEW)
| Utility | Functions | Examples |
|---------|-----------|----------|
| **dateUtils** | 20+ date functions | formatDateShort, getWeekDates, isToday |
| **validationUtils** | 15+ validators | validateEmail, validatePasswordStrength |
| **formatUtils** | 25+ formatters | formatCurrency, formatPhoneNumber, pluralize |
| **envUtils** | Environment helpers | requireEnv(), getEnv(), isDevelopment() |
| **durationCalculator** | Workout duration estimates | calculateWorkoutDuration({totalSets}), getWorkoutDuration(totalSets) |

### Design Token Modules
| Module | Purpose |
|--------|---------|
| `theme.colors` | Semantic colors (primary, sessionStandard/Express/Maintenance, actionSuccess, textSecondary, backgroundTertiary, googleBlue, facebookBlue, shadowBlack) |
| `theme.spacing` | xs/s/m/l/xl/xxl + safeZone/safeZoneHorizontal/textLineGap/buttonSpacing (16dp rhythm) |
| `theme.typography` | Fonts (brand/workoutCard/workoutTitle/primary), sizes (xs/s/m/l/xl/xxl/xxxl/display/mega), weights |
| `theme.textShadows` | default/subtle/strong |
| `theme.viewShadows` | iOS shadows (small/medium/large) |
| `theme.elevation` | Android elevation values |
| `theme.buttons` | Sizing, padding, borderRadius, margins, shadowLayers, opacity |
| `theme.layout` | header/logo/form/bottom/icon/topNav/bottomNav/recommendedWorkout/welcomeBox/planProgress/progressBar/weekCalendar/authNavigation/socialLogin/border/interaction |

### Architecture Patterns (REQUIRED)
| Pattern | Rule |
|---------|------|
| **Design Tokens** | ALL styling via `theme.*` - NO magic numbers/hard-coded colors |
| **Absolute Imports** | Use `@/` aliases - NO relative imports |
| **TypeScript Strict** | Explicit types - NO `any` (unless absolutely necessary) |
| **Context Pattern** | Never expose Context directly - Always via custom hook with memoization |
| **Service Layer** | Never query backend/JSON from components - Always via service layer |
| **Navigation** | Use typed hooks (useTypedNavigation) - NOT React Navigation hooks directly |
| **Forward-Looking Comments** | Comments explain design intent, not historical changes or fixes |
| **Component Library** | Use existing components before creating new ones |
| **Barrel Exports** | Import from @/components, @/hooks, @/utils, @/services, @/navigation |
| **Flow Layout First** | Prefer natural document flow over absolute positioning when possible |
| **Constants for Repeated Values** | Create named constants instead of repeating literals |
| **Custom Fonts** | Omit fontWeight property - font file contains weight |
| **Vertical Positioning** | Use translateY transform - NOT marginTop (avoids sub-pixel artifacts) |
| **Font Spacing** | Compensate for font metrics with reduced margins (13dp = visual 16dp) |

### Component Structure Sections
```typescript
// ============================================================================
// TYPES
// ============================================================================
// ============================================================================
// COMPONENT
// ============================================================================
// ==========================================================================
// STATE
// ==========================================================================
// ==========================================================================
// COMPUTED VALUES
// ==========================================================================
// ==========================================================================
// HELPER FUNCTIONS
// ==========================================================================
// ==========================================================================
// EVENT HANDLERS
// ==========================================================================
// ==========================================================================
// RENDER
// ==========================================================================
// ============================================================================
// STYLES
// ============================================================================
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
✅ Supabase (.env with credentials) | ✅ react-native-config | ✅ URL polyfill | Metro (8081) | GitHub synced | All deps installed | Android device testing | Gradle 9.2.0 | **Fonts (Bebas Neue, Zuume-ExtraBold, Roboto in src/assets/fonts/)** | **Design tokens complete** | **Component library established** | **Service layer complete** | **Navigation system complete** | **Utils/hooks infrastructure complete** | **Production readiness framework complete** | **Guest login system** | **GitHub issues (18 created)** | **HomePage workout cards & scrolling complete** | **JSON workout data layer** | **WorkoutOverviewScreen with dynamic exercises complete** | **Duration calculator** | **Exercise service with session logic**

### Not Yet Set Up
DB schema/tables | Supabase Auth config | TS types from DB | Actual authentication implementation (authService exists but not integrated) | Equipment filtering | Rep count progression | Exercise detail screens | Workout tracking screens | Data persistence for user selections

### Critical Paths
- **Project Root**: C:\Dev\Lift321 (ACTIVE DEV)
- **Font Assets**: C:\Dev\Lift321\src\assets\fonts/ (Bebas Neue, Zuume-ExtraBold, Roboto, others)
- **Exercise Data**: C:\Dev\Lift321\src\data/exercises.json (all exercise definitions)
- **Plan Data**: C:\Dev\Lift321\src\data/plans.json (rep progression, plan details)
- **GitHub**: https://github.com/WillyDrucker/Lift321
- **GitHub Issues**: 8 EPICs + 10 features/tasks tracking future work
- **Historical Context**: Fresh React Native build informed by previous project learnings (reference code at C:\Dev\Wills321 - untouched)
- **Branch**: Claude-v1.1.5 (Data-driven exercise system complete, ready to merge)

### Next Steps
1. **Merge v1.1.5 to main**: Complete data-driven exercise system
2. **Create v1.1.6**: Start next feature development
3. **Equipment Filtering**: Implement equipment selection logic in exercise service
4. **Rep Count Integration**: Load rep counts from plans.json based on week
5. **Exercise Images**: Expand image mapping for all exercises
6. **Workout Session Flow**: Implement active workout session with set tracking
7. **State Management**: Implement persistence for user selections
8. **Leverage Framework**:
   - Import components from @/components
   - Use navigation hooks from @/navigation
   - Call services from @/services (exerciseService, authService)
   - Use utilities from @/utils (durationCalculator, dateUtils, etc.)
   - Follow established patterns

---

**Version**: 1.1.5
**Last Updated**: 2025-01-22
**Status**: Data-Driven Exercise System Complete - Ready to Merge and Continue
