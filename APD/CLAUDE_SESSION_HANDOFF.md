# CLAUDE SESSION HANDOFF

## Purpose
Primary context restoration file for Claude Code sessions. Contains current session state, key patterns, and quick references. Detailed patterns in CLAUDE_DEV_STANDARDS.md, detailed history in CLAUDE_PROJECT_NOTES.md.

---

## Current Version: 1.1.10

**Branch**: Claude-v1.1.10
**Status**: CLAUDE_DEV_STANDARDS Audit Complete
**Last Updated**: 2025-12-02

---

## Session State

### Current Work
- Complete CLAUDE_DEV_STANDARDS audit (105 files, 98 compliant, 7 fixed)
- Added 6 new theme tokens: controlSuccessBackground, controlWarningBackground, achievementGold, customWorkoutBlue/Yellow/Cyan
- Merged son's active workout implementation from main
- Installed react-native-youtube-iframe + react-native-webview

### Completed This Session
- **Theme Tokens**: 6 new color tokens for control states, achievements, custom workouts
- **File Headers**: Added to PencilIcon.tsx, TrashIcon.tsx
- **Color Fixes**: Replaced hardcoded colors in RepsControlCard, WeightControlCard, WorkoutTimer, ActivityFeedCard, WorkoutCard
- **Merged**: Son's active workout, VideoCard, icon components, bottom nav fixes

### Next Session Should
1. Test active workout flow
2. Add remaining plan images (10 more)
3. Implement plan selection logic
4. Implement equipment filtering in exercise service

---

## Previous Sessions (5 Recent)

### v1.1.9 - Dynamic Workout Card Sizing (2025-11-27)
Dynamic card sizing based on screen width minus margins. Cards fill screen with 8dp visual margins. Unified approach for both scrollers. Added cardWidth prop to WorkoutCard. Simplified to snapToInterval.

### v1.1.8 - Plan Card Background Images (2025-11-23)
Background image support for plan cards (128dp height). Image directory at src/assets/images/plans/. Text overlay with shadow. Fixed logout bug on PlansPage. Removed gray border.

### v1.1.7 - PlansPage Implementation (2025-11-22)
PlansPage with 11 plan cards in 2 sections. PlanCard (330×128dp) and PlanCardsScroller components. Bidirectional bottom tab navigation. Fixed Supabase mock client.

### v1.1.5 - Data-Driven Exercise System (2025-01-22)
Exercise service with session type filtering. Duration calculator utility. WorkoutOverviewScreen refactor. Eliminated 180+ lines hardcoded JSX.

### v1.1.0-1.1.4 - Foundation (2025-11-15 to 2025-01-19)
Environment setup, guest login, WorkoutOverviewScreen, font management, navigation complete.

---

## Archived (v1.0.x) - Foundation Phase
v1.0.8-1.0.15: Complete tokenization, component library (ShadowButton, FormInput), HomePage decomposition, utils/hooks infrastructure, service layer (ApiResult<T>, BaseService), navigation system (typed hooks, auth guards), production readiness (ErrorBoundary, LoadingState).

---

## Known Issues (Active)

| Issue | Solution |
|-------|----------|
| Equipment filtering not implemented | Implement in exerciseService.selectExerciseFromGroup() |
| Rep counts hardcoded (10 reps) | Integrate with plans.json week progression |
| fontWeight breaks custom fonts | Omit fontWeight - font file contains weight |
| marginTop + scaleX artifacts | Use translateY transform instead |
| Font metrics add ~3dp spacing | Reduce margins by 3dp (13dp = 16dp visual) |

---

## Quick Reference

### Architecture Layers
| Layer | Location | Example |
|-------|----------|---------|
| Components | src/components/ | ShadowButton, WorkoutCard, FormInput |
| Features | src/features/ | HomePage, WorkoutOverviewScreen |
| Services | src/services/ | authService, exerciseService, BaseService |
| Utils | src/utils/ | dateUtils, validationUtils, durationCalculator |
| Theme | src/theme/ | colors, spacing, typography, layout |

### Critical Patterns
- **Design Tokens**: ALL styling via `theme.*` - no magic numbers
- **Absolute Imports**: Use `@/` aliases only
- **Service Layer**: Never query backend from components
- **Custom Fonts**: Omit fontWeight, use translateY not marginTop

### Session Logic (Lift 3-2-1)
| Session | Sets | Duration | Pattern |
|---------|------|----------|---------|
| Standard | 6 | 34 min | 3 Major + 2 Minor + 1 Tertiary |
| Express | 5 | 28 min | 3 Major + 2 Minor |
| Maintenance | 4 | 22 min | 2 Major + 2 Minor |

---

## Critical Paths
- **Project**: C:\Dev\Lift321
- **Fonts**: src/assets/fonts/
- **Data**: src/data/exercises.json, plans.json
- **GitHub**: https://github.com/WillyDrucker/Lift321

---

**Version**: 1.1.10 | **Updated**: 2025-12-02
