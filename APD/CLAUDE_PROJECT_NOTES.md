# LIFT 3-2-1 PROJECT NOTES

## Purpose
Version history and changelog for Lift 3-2-1. Recent versions (5) are detailed, older versions are condensed to 3-5 line summaries. For current session state see CLAUDE_SESSION_HANDOFF.md. For code patterns see CLAUDE_DEV_STANDARDS.md.

---

## Version History

### v1.1.11 - Major Style Refactoring (2025-12-02)
**Branch**: Claude-v1.1.11

**Summary**: File cleanup and major style extraction refactor. Moved USERPROMPT/ to APD/USERPROMPT/. Deleted stale files (REFACTORING_FEATURES.md, .gitkeep). Extracted styles from 4 large components to separate files, establishing new file organization pattern.

**What Was Built**:
- **File Cleanup**: Reorganized USERPROMPT folder, deleted stale documentation
- **Style Extraction**: Created 5 new style/helper files
- **WorkoutOverviewScreen**: 950→528 lines (44% reduction)
- **WorkoutCard**: 467→276 lines (41% reduction), also extracted helpers
- **ActiveWorkoutScreen**: 402→306 lines (24% reduction)
- **Sidebar**: 368→279 lines (24% reduction)

**New Pattern Established**:
```
Component.tsx        # Logic (~200-300 lines)
Component.styles.ts  # StyleSheet definitions
Component.helpers.ts # Helper functions (if needed)
```

**Files Created**: WorkoutOverviewScreen.styles.ts, WorkoutCard.styles.ts, WorkoutCard.helpers.ts, ActiveWorkoutScreen.styles.ts, Sidebar.styles.ts

**Files Modified**: WorkoutOverviewScreen.tsx, WorkoutCard.tsx, ActiveWorkoutScreen.tsx, Sidebar.tsx, components/index.ts, PlanCardsScroller.tsx, CLAUDE.md

---

### v1.1.10 - CLAUDE_DEV_STANDARDS Audit (2025-12-02)
**Branch**: Claude-v1.1.10

**Summary**: Complete codebase audit for CLAUDE_DEV_STANDARDS compliance. Audited 105 files, found 98 compliant (93%), fixed 7 files. Added 6 new theme tokens. Merged son's active workout implementation from main.

**What Was Built**:
- **Theme Tokens** (colors.ts): controlSuccessBackground, controlWarningBackground, achievementGold, customWorkoutBlue, customWorkoutYellow, customWorkoutCyan
- **File Headers**: PencilIcon.tsx, TrashIcon.tsx
- **Color Replacements**: RepsControlCard:154, WeightControlCard:167, WorkoutTimer:173+177, ActivityFeedCard:44, WorkoutCard:75-82
- **Merged from Main**: ActiveWorkoutScreen, ActiveWorkoutContext, VideoCard, PencilIcon, TrashIcon, bottom nav fixes
- **Dependencies**: react-native-youtube-iframe, react-native-webview

**Files Modified**: colors.ts, PencilIcon.tsx, TrashIcon.tsx, RepsControlCard.tsx, WeightControlCard.tsx, WorkoutTimer.tsx, ActivityFeedCard.tsx, WorkoutCard.tsx

---

### v1.1.9 - Dynamic Workout Card Sizing (2025-11-27)
**Branch**: Claude-v1.1.9

**Summary**: Dynamic workout card sizing based on screen width minus margins. Cards fill screen with 8dp visual margins (CARD_MARGIN = 12). Unified approach for WorkoutCardsScroller and CustomWorkoutCardsScroller. Added cardWidth prop to WorkoutCard. Simplified to snapToInterval.

**What Was Built**:
- Card width: SCREEN_WIDTH - (CARD_MARGIN * 2)
- CARD_MARGIN = 12 for 8dp visual spacing
- Optional cardWidth prop on WorkoutCard
- snapToInterval replaces snapToOffsets

**Files Modified**: WorkoutCardsScroller.tsx, CustomWorkoutCardsScroller.tsx, WorkoutCard.tsx

---

### v1.1.8 - Plan Card Background Images (2025-11-23)
**Branch**: Claude-v1.1.8

**Summary**: Background image support for plan cards with full 128dp height. Created src/assets/images/plans/ directory with naming convention {plan-name}-plan.png. Text overlay with shadow for readability. Fixed logout bug on PlansPage. Removed gray border from plan cards.

**What Was Built**:
- PlanCard imageSource prop with absolute positioning
- getPlanImage() helper mapping 11 plans
- Text shadow for readability over images
- Fixed Sidebar prop: onOptionSelect → onSelect

**Files Modified**: PlanCard.tsx, PlanCardsScroller.tsx, PlansPage.tsx

---

### v1.1.7 - PlansPage Implementation (2025-11-22)
**Branch**: Claude-v1.1.7

**Summary**: Complete PlansPage with 11 plan cards across 2 sections. PlanCard (330×128dp) and PlanCardsScroller components. Bidirectional bottom tab navigation. Fixed Supabase mock client with all auth methods. Created GitHub issue #20.

**What Was Built**:
- PlansPage mirroring HomePage layout
- PlanCard and PlanCardsScroller components
- Bottom tab navigation between HomePage ↔ PlansPage
- Supabase mock client with signUp, signInWithPassword, etc.

**Files Modified**: PlansPage.tsx, PlanCard.tsx, PlanCardsScroller.tsx, supabaseClient.ts, HomePage.tsx

---

### v1.1.5 - Data-Driven Exercise System (2025-01-22)
**Branch**: Claude-v1.1.5

**Summary**: Created data-driven exercise system with duration calculator, exercise service for session filtering, and WorkoutOverviewScreen refactor. Duration formula: (totalSets × 6) - 2 for accurate estimates. Eliminated 180+ lines hardcoded JSX.

**What Was Built**:
- exerciseService with getExercisesForWorkout()
- durationCalculator with calculateWorkoutDuration()
- Session type logic: Standard (3+2+1), Express (3+2), Maintenance (2+2)
- Dynamic exercise rendering replacing hardcoded JSX

**Files Modified**: exerciseService.ts, durationCalculator.ts, WorkoutOverviewScreen.tsx

---

## Archived Versions (Condensed)

### v1.1.0-1.1.4 - Core Features (2025-11-15 to 2025-01-19)
- **v1.1.4**: Font management (Zuume-ExtraBold 20% scaling), title bar refinements (66dp), dynamic duration selector
- **v1.1.3**: WorkoutOverviewScreen 4-card system, multi-selector logic, "All Weights" toggle, 8dp spacing
- **v1.1.2**: HomePage workout cards, CustomWorkoutCardsScroller, flow layout, z-index fixes, all workout images
- **v1.1.0**: Environment setup (.env, react-native-config), guest login with AsyncStorage, 18 GitHub issues created

### v1.0.x - Foundation Phase (2025-11-15)
- **v1.0.15**: ErrorBoundary, LoadingState/ErrorState/EmptyState, environment validation
- **v1.0.14**: Type-safe navigation (useTypedNavigation), auth guards, 12 transition presets
- **v1.0.13**: Service infrastructure (ApiResult<T>, BaseService, authService, apiUtils)
- **v1.0.12**: ActionButton component, auth screen refactoring
- **v1.0.11**: Utils (dateUtils 20+, validationUtils 15+, formatUtils 25+), useFormInput, useAnimation
- **v1.0.10**: HomePage decomposition (515→137 lines), TopNavBar, WeekCalendar, BottomTabBar
- **v1.0.9**: Component library (ShadowButton, FormInput, PasswordInput, SocialButton)
- **v1.0.8**: Complete tokenization, eliminated 51 magic numbers, 13 new design tokens

### Pre-1.0 - Initial Setup
Project scaffolding, React Native 0.82.1, TypeScript strict mode, Supabase integration, basic navigation structure.

---

## Key Learnings

### Technical Patterns Discovered
- **Custom Fonts**: Never use fontWeight with custom fonts (breaks loading)
- **Transforms**: Use translateY not marginTop with scaleX (avoids sub-pixel artifacts)
- **Font Metrics**: Reduce margins by ~3dp to compensate for intrinsic spacing
- **Android Shadows**: Use multi-layer View pattern (native shadows unreliable)
- **Metro Cache**: Reset with --reset-cache when adding new assets

### Architecture Decisions
- **Design Token System**: All styling through theme.* tokens - no magic numbers
- **Service Layer**: Components never query backend directly
- **Absolute Imports**: @/ aliases only - no relative imports
- **Session Logic**: Lift 3-2-1 = Standard(3+2+1), Express(3+2), Maintenance(2+2)

---

**Last Updated**: 2025-12-02
