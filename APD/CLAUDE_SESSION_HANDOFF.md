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

## Current Version: 1.1.3

**Branch**: Claude-v1.1.3
**Status**: WorkoutOverviewScreen Complete
**Last Updated**: 2025-01-18

---

## Session State

### Current Work
- WorkoutOverviewScreen fully functional with complete selector system
- Navigation integration with back button in TopNavBar
- All cards using 8dp standardized spacing
- Multi-selector equipment toggle logic implemented
- CLAUDE_DEV_STANDARDS fully applied
- Ready to merge to main and create v1.1.4

### Completed This Session
**v1.1.3 - WorkoutOverviewScreen Implementation** (2025-01-18):
1. **WorkoutOverviewScreen Creation**:
   - Generic screen adapts to all workout types (CHEST, ARMS, etc.)
   - Four card system: Title, Plan, Session, Equipment
   - Scrollable area between TopNav and BottomTabBar
   - All styling tokenized with 8dp standardization

2. **Selector System Architecture**:
   - Title Card: 50dp black selector with workout type in green
   - Plan Card: Current Plan (24dp), Plan Name (italic "LIFT" 3-2-1), Week Progress, Focus selectors (Strength/Balanced/Growth)
   - Session Card: Current Session (24dp), Type selectors (Standard/Express/Maintenance)
   - Equipment Card: Current Equipment (24dp), Multi-toggle equipment selectors with "All Weights" logic

3. **TopNavBar Enhancement**:
   - Added optional back button (16dp from hamburger)
   - Conditional rendering for screens that need navigation back
   - 1dp white border added to navigation bar
   - Back chevron moved from screen content to navigation bar

4. **Equipment Selection Logic**:
   - Default: All equipment types highlighted
   - "All Weights" selects everything
   - Individual selection: First click deselects "All" and highlights only clicked item
   - Subsequent clicks: Toggle individual equipment on/off
   - Auto-highlight "All" when all 4 types manually selected

5. **Typography & Sizing**:
   - Selector text: Consistent 12dp for compact multi-option displays
   - Primary labels: 24dp (Current Plan, Current Session, Current Equipment)
   - Titles: 32dp (CHEST, workout type names)
   - All text bold within cards
   - Multi-line text support (ALL\nWEIGHTS, FREE\nWEIGHTS)

6. **CLAUDE_DEV_STANDARDS Compliance**:
   - Created SELECTOR_TEXT_SIZE constant (no magic numbers)
   - All borderWidth uses theme.layout.border.thin
   - Forward-looking comments throughout ("Standard selector height for touch targets" vs "50dp height")
   - Proper file headers and section organization
   - Semantic naming (workoutPlanFocusSelector vs selector1)

### Next Session Should
1. **Workout Data Integration**: Connect real workout data to WorkoutOverviewScreen
2. **Navigation Flow**: Implement full navigation from HomePage → WorkoutOverview → WorkoutSession
3. **Exercise Detail Screens**: Build exercise list and tracking screens
4. **State Persistence**: Save user selections (plan focus, session type, equipment)

### User Decisions Made
- 8dp spacing standardized throughout (margins, card separation)
- 1dp spacing for closely-grouped selectors
- 12dp text for all selectable options (consistency over auto-scaling)
- "Balanced" selected by default for plan focus
- "Standard" selected by default for session type
- All equipment highlighted by default
- Back button belongs in TopNavBar, not in screen content
- CLAUDE_DEV_STANDARDS must be applied to all new code

---

## Previous Sessions (Recent)

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

### Navigation & TopNavBar (NEW)
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

### Environment Variables
- ✅ .env file configured with Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY)
- ✅ react-native-config properly configured in Android gradle
- ✅ .env file properly gitignored to protect credentials

---

## Quick Reference: Established Patterns

### WorkoutOverviewScreen Architecture (NEW)
| Component | Purpose | Styling |
|-----------|---------|---------|
| **Title Card** | Workout type display | 50dp black selector, 32dp green text |
| **Plan Card** | Plan configuration | Current Plan + Name + Week + Focus (3 selectors) |
| **Session Card** | Session type selection | Current Session + 3 type selectors |
| **Equipment Card** | Equipment selection | Current Equipment + multi-toggle selectors (2 rows) |

### Selector Patterns (NEW)
| Selector Type | Height | Text Size | Behavior |
|---------------|--------|-----------|----------|
| **Primary Label** | 50dp | 24dp | Display only (Current Plan, Current Session, etc.) |
| **Interactive Single** | 50dp | 24dp | Single selection (Plan name, Week progress) |
| **Interactive Multi** | 50dp | 12dp | Multiple options (Strength/Balanced/Growth, Standard/Express/Maintenance) |
| **Equipment Toggle** | 50dp | 12dp | Multi-select with "All" logic |

### Spacing System (NEW)
| Spacing Type | Value | Usage |
|--------------|-------|-------|
| **Card Margins** | 8dp | Between cards, screen edges |
| **Card Padding** | 8dp | Internal card padding |
| **Selector Spacing** | 1dp | Between closely-grouped selectors |
| **Section Spacing** | 8dp | Between major sections |

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
| Card Type | Title Format | Examples |
|-----------|--------------|----------|
| **Body Part** | Uppercase green 32dp, body part name only | CHEST, ARMS, SHOULDERS, BACK & TRIS, LEGS |
| **Specialized** | White text, specific names | Custom Workout, Work-As-You-Go, SuperSet Mode, Partner Mode |

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
| **Services** | Backend operations (authService, BaseService) | src/services/ |
| **Navigation** | Type-safe routing (useTypedNavigation, navigationService) | src/navigation/ |
| **Utils** | Pure functions (dateUtils, validationUtils, formatUtils) | src/utils/ |
| **Hooks** | Reusable logic (useFormInput, useAnimation, useWeekCalendar, useSwipeGesture) | src/hooks/ |
| **Theme** | Design tokens (colors, spacing, typography, layout) | src/theme/ |
| **Constants** | App config (API_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES) | src/constants/ |

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

### Navigation System
| Hook/Service | Purpose | Usage |
|--------------|---------|-------|
| **useTypedNavigation** | Type-safe navigation | navigation.navigate('HomePage') |
| **useTypedRoute<T>** | Type-safe route params | const {workoutType} = route.params |
| **useNavigationActions** | Common shortcuts | goBack(), goToHome(), reset() |
| **navigationService** | Imperative navigation | navigationService.navigate('HomePage') |
| **useAuthGuard** | Protect authenticated screens | if (!isAllowed) return null |
| **useGuestGuard** | Redirect if authenticated | Used in LoginScreen |

### Service Layer
| Service/Utility | Purpose | Usage |
|-----------------|---------|-------|
| **authService** | Authentication operations | authService.signIn(credentials) |
| **BaseService** | Generic CRUD operations | Extend for any table |
| **apiUtils** | Response/error handling | handleSupabaseQuery(queryFn) |
| **Type Guards** | Response checking | if (isApiSuccess(result)) {...} |
| **ApiResult<T>** | Unified response format | {data, error, status} |

### Utilities
| Utility | Functions | Examples |
|---------|-----------|----------|
| **dateUtils** | 20+ date functions | formatDateShort, getWeekDates, isToday |
| **validationUtils** | 15+ validators | validateEmail, validatePasswordStrength |
| **formatUtils** | 25+ formatters | formatCurrency, formatPhoneNumber, pluralize |
| **envUtils** | Environment helpers | requireEnv(), getEnv(), isDevelopment() |

### Design Token Modules
| Module | Purpose |
|--------|---------|
| `theme.colors` | Semantic colors (primary, primaryMuted, pureBlack, pureWhite, actionSuccess, googleBlue, facebookBlue, shadowBlack) |
| `theme.spacing` | xs/s/m/l/xl/xxl + safeZone/safeZoneHorizontal/textLineGap/buttonSpacing (16dp rhythm) |
| `theme.typography` | Fonts (brand/primary), sizes (xs/s/m/l/xl/xxl/xxxl/display/mega), weights |
| `theme.textShadows` | default/subtle/strong |
| `theme.viewShadows` | iOS shadows (small/medium/large) |
| `theme.elevation` | Android elevation values |
| `theme.buttons` | Sizing, padding, borderRadius, margins, shadowLayers, opacity |
| `theme.layout` | header/logo/form/bottom/icon/topNav/bottomNav/recommendedWorkout/welcomeBox/planProgress/weekCalendar/authNavigation/socialLogin/border |

### Architecture Patterns (REQUIRED)
| Pattern | Rule |
|---------|------|
| **Design Tokens** | ALL styling via `theme.*` - NO magic numbers/hard-coded colors |
| **Absolute Imports** | Use `@/` aliases - NO relative imports |
| **TypeScript Strict** | Explicit types - NO `any` (unless absolutely necessary) |
| **Context Pattern** | Never expose Context directly - Always via custom hook with memoization |
| **Service Layer** | Never query Supabase from components - Always via service layer |
| **Navigation** | Use typed hooks (useTypedNavigation) - NOT React Navigation hooks directly |
| **Forward-Looking Comments** | Comments explain design intent, not historical changes or fixes |
| **Component Library** | Use existing components before creating new ones |
| **Barrel Exports** | Import from @/components, @/hooks, @/utils, @/services, @/navigation |
| **Flow Layout First** | Prefer natural document flow over absolute positioning when possible |
| **Constants for Repeated Values** | Create named constants instead of repeating literals |

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
✅ Supabase (.env with credentials) | ✅ react-native-config | ✅ URL polyfill | Metro (8081) | GitHub synced | All deps installed | Android device testing | Gradle 9.2.0 | Fonts (Bebas Neue, Roboto) | **Design tokens complete** | **Component library established** | **Service layer complete** | **Navigation system complete** | **Utils/hooks infrastructure complete** | **Production readiness framework complete** | **Guest login system** | **GitHub issues (18 created)** | **HomePage workout cards & scrolling complete** | **JSON workout data layer** | **WorkoutOverviewScreen complete**

### Not Yet Set Up
DB schema/tables | Supabase Auth config | TS types from DB | Actual authentication implementation (authService exists but not integrated) | Exercise detail screens | Workout tracking screens | Data persistence for user selections

### Critical Paths
- **Project Root**: C:\Dev\Lift321 (ACTIVE DEV)
- **GitHub**: https://github.com/WillyDrucker/Lift321
- **GitHub Issues**: 8 EPICs + 10 features/tasks tracking future work
- **Historical Context**: Fresh React Native build informed by previous project learnings (reference code at C:\Dev\Wills321 - untouched)
- **Branch**: Claude-v1.1.3 (WorkoutOverviewScreen complete, ready to merge)

### Next Steps
1. **Merge v1.1.3 to main**: Complete WorkoutOverviewScreen implementation
2. **Create v1.1.4**: Start next feature development
3. **Data Integration**: Connect real workout data to screens
4. **Build Exercise Screens**: Create exercise list, detail, and tracking screens
5. **State Management**: Implement persistence for user selections
6. **Leverage Framework**:
   - Import components from @/components
   - Use navigation hooks from @/navigation
   - Call services from @/services
   - Use utilities from @/utils
   - Follow established patterns

---

**Version**: 1.1.3
**Last Updated**: 2025-01-18
**Status**: WorkoutOverviewScreen Complete - Ready to Merge and Continue
