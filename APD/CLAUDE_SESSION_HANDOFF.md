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

## Current Version: 1.1.0

**Branch**: Claude-v1.1.0
**Status**: Environment Setup Complete & Guest Login Implemented
**Last Updated**: 2025-11-15

---

## Session State

### Current Work
- Environment variables fully configured with Supabase credentials
- Guest login system implemented and working
- App successfully running on Android device
- GitHub issues tracking system established (18 issues created)
- Ready for feature development

### Completed This Session
**v1.1.0 - Environment Setup & Guest Login** (2025-11-15):
1. **Environment Configuration**:
   - Installed react-native-config package
   - Created .env file with Supabase credentials (URL and anon key)
   - Configured Android gradle to read .env file
   - Added react-native-url-polyfill for Supabase compatibility
   - Removed unnecessary console warnings

2. **Guest Login Implementation**:
   - Created enableGuestMode(), disableGuestMode(), isGuestMode() functions
   - Modified isAuthenticated() to check guest mode via AsyncStorage
   - Implemented AUTH_CHANGE_EVENT using DeviceEventEmitter
   - Updated App.tsx to listen for auth changes and re-check authentication
   - Updated LoginScreen to enable guest mode instead of direct navigation
   - Guest login now properly switches from AuthNavigator to MainNavigator

3. **GitHub Project Management**:
   - Created 8 EPICs (never to close): Login System, Create Account, Home Page, Plan Page, Performance Page, Profile Page, Hamburger Menu, Normal Workout/Superset
   - Created 10 feature/task issues with descriptions
   - Established issue tracking foundation for future development

### Next Session Should
1. **Build Features**: Begin implementing features tracked in GitHub issues
2. **Authentication**: Implement actual Supabase auth using authService
3. **Testing**: Continue testing on physical Android device
4. **Feature Development**: Use established patterns to build workout tracking features

### User Decisions Made
- Environment setup prioritized to get app running
- Guest mode implemented for testing without authentication
- GitHub issues created for project tracking
- .env file properly gitignored to protect credentials
- Focus on getting working app before building all features

---

## Previous Sessions (Recent)

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

### Android Shadows / Metro Cache / Native Modules
- Native shadows unreliable → Use multi-layer View pattern
- New assets/modules → Restart Metro with --reset-cache, rebuild Android

### Environment Variables
- ✅ .env file configured with Supabase credentials (SUPABASE_URL, SUPABASE_ANON_KEY)
- ✅ react-native-config properly configured in Android gradle
- ✅ .env file properly gitignored to protect credentials

---

## Quick Reference: Established Patterns

### Architecture Layers (NEW)
| Layer | Pattern | Location |
|-------|---------|----------|
| **Components** | Reusable UI (ShadowButton, FormInput, LoadingState, ErrorState, etc.) | src/components/ |
| **Services** | Backend operations (authService, BaseService) | src/services/ |
| **Navigation** | Type-safe routing (useTypedNavigation, navigationService) | src/navigation/ |
| **Utils** | Pure functions (dateUtils, validationUtils, formatUtils) | src/utils/ |
| **Hooks** | Reusable logic (useFormInput, useAnimation, useWeekCalendar) | src/hooks/ |
| **Theme** | Design tokens (colors, spacing, typography, layout) | src/theme/ |
| **Constants** | App config (API_TIMEOUT, STORAGE_KEYS, ERROR_MESSAGES) | src/constants/ |

### Component Library (NEW)
| Component | Purpose | Props |
|-----------|---------|-------|
| **ShadowButton** | Primary/secondary/tertiary buttons with shadows | variant, onPress, disabled |
| **FormInput** | Text input with focus/error states | value, onChangeText, placeholder, error, rightElement |
| **PasswordInput** | Password field with show/hide toggle | Extends FormInput props |
| **SocialButton** | OAuth buttons (Google/Facebook) | provider ('google' \| 'facebook'), onPress |
| **ActionButton** | Simple CTA button | text, onPress, disabled |
| **LoadingState** | Async loading UI | message?, size?, fullScreen? |
| **ErrorState** | Error UI with retry | message, onRetry?, fullScreen? |
| **EmptyState** | No data UI | title?, message, actionText?, onAction?, fullScreen? |
| **ErrorBoundary** | Crash protection | children, fallback? |

### Navigation System (NEW)
| Hook/Service | Purpose | Usage |
|--------------|---------|-------|
| **useTypedNavigation** | Type-safe navigation | navigation.navigate('HomePage') |
| **useTypedRoute<T>** | Type-safe route params | const {workoutId} = route.params |
| **useNavigationActions** | Common shortcuts | goBack(), goToHome(), reset() |
| **navigationService** | Imperative navigation | navigationService.navigate('HomePage') |
| **useAuthGuard** | Protect authenticated screens | if (!isAllowed) return null |
| **useGuestGuard** | Redirect if authenticated | Used in LoginScreen |

### Service Layer (NEW)
| Service/Utility | Purpose | Usage |
|-----------------|---------|-------|
| **authService** | Authentication operations | authService.signIn(credentials) |
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

### Design Token Modules (UNCHANGED)
| Module | Purpose |
|--------|---------|
| `theme.colors` | Semantic colors (primary, primaryMuted, pureBlack, pureWhite, googleBlue, facebookBlue, shadowBlack) |
| `theme.spacing` | xs/s/m/l/xl/xxl + safeZone/safeZoneHorizontal/textLineGap/buttonSpacing (16dp rhythm) |
| `theme.typography` | Fonts (brand/primary), sizes (xs/s/m/l/xl/xxl/xxxl/display/mega), weights |
| `theme.textShadows` | default/subtle/strong |
| `theme.viewShadows` | iOS shadows (small/medium/large) |
| `theme.elevation` | Android elevation values |
| `theme.buttons` | Sizing, padding, borderRadius, margins, shadowLayers, opacity |
| `theme.layout` | header/logo/form/bottom/icon/backgroundImage/topNav/bottomNav/authNavigation/socialLogin |

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
✅ Supabase (.env with credentials) | ✅ react-native-config | ✅ URL polyfill | Metro (8081) | GitHub synced | All deps installed | Android device testing | Gradle 9.2.0 | Fonts (Bebas Neue, Roboto) | **Design tokens complete** | **Component library established** | **Service layer complete** | **Navigation system complete** | **Utils/hooks infrastructure complete** | **Production readiness framework complete** | **Guest login system** | **GitHub issues (18 created)**

### Not Yet Set Up
DB schema/tables | Supabase Auth config | TS types from DB | Actual authentication implementation (authService exists but not integrated)

### Critical Paths
- **Project Root**: C:\Dev\Lift321 (ACTIVE DEV)
- **GitHub**: https://github.com/WillyDrucker/Lift321
- **GitHub Issues**: 8 EPICs + 10 features/tasks tracking future work
- **Historical Context**: Fresh React Native build informed by previous project learnings (reference code at C:\Dev\Wills321 - untouched)
- **Branch**: Claude-v1.1.0 (environment setup complete)

### Next Steps
1. **Build Features**: Begin implementing features from GitHub issues
2. **Authentication**: Integrate authService with LoginFormScreen and SignUpScreen
3. **Database**: Create Supabase tables schema for workouts, plans, users
4. **Continue Testing**: Verify all patterns on physical Android device
5. **Leverage Framework**:
   - Import components from @/components
   - Use navigation hooks from @/navigation
   - Call services from @/services
   - Use utilities from @/utils
   - Follow established patterns

---

**Version**: 1.1.0
**Last Updated**: 2025-11-15
**Status**: Environment Setup Complete & Guest Login Implemented - App Running on Device
