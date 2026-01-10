# CLAUDE SESSION HANDOFF

## Purpose
Primary context restoration file for Claude Code sessions. Contains current session state, key patterns, and quick references. Detailed patterns in CLAUDE_DEV_STANDARDS.md, detailed history in CLAUDE_PROJECT_NOTES.md.

---

## Current Version: 1.1.17

**Branch**: Claude-v1.1.17
**Status**: Ready for New Development
**Last Updated**: 2026-01-10

---

## Session State

### Current Work
- New branch created from v1.1.16 (Workout Settings Bar & UI Alignment)
- Ready for next feature development

### Next Session Should
1. Address navigation delay from WorkoutOverview to ActiveWorkout (dial tick rendering performance)
2. Test active workout flow with new settings bar
3. Add remaining plan images (10 more)
4. Implement plan selection logic
5. Implement equipment filtering in exercise service

---

## Previous Sessions (5 Recent)

### v1.1.16 - Workout Settings Bar & UI Alignment (2026-01-10)
Added 32dp workout settings bar below title bar during active workout. Shows gear icon (left-aligned with hamburger), TO GO label, separator, and right-aligned SETS/MINS remaining. Created GearIcon component. Unified 16dp horizontal padding across TopNavBar, title bar, and settings bar. Removed WorkoutStatusCard (moved to settings bar). Fixed ExerciseCard day prop for Legs workouts. Created backup folder for dial components.

### v1.1.15 - Dial Control Consolidation and UI Refinements (2025-12-XX)
Consolidated dial controls into reusable DialControlCard component with extracted hooks (useDialControl, useAutoRepeat). Separated styles and types files. Weight and Reps cards now thin wrappers.

### v1.1.14 - Enhanced Workout UI with Design Token System (2025-12-XX)
Design token system enhancements for workout UI components.

### v1.1.13 - Shared Workouts Architecture Documentation (2025-12-03)
Architecture documentation for shared workouts system.

### v1.1.12 - Unified Workout Card System (2025-12-03)
Complete unification of My Workouts cards. New overlay strip pattern for all cards (semi-transparent bar at top of image). Suggester-based architecture with centralized accent colors. Static images for Personal Trainer, Coach, Partner, Custom cards. Day-based rotation only for 3-2-1 A.I. Trainer. Transform origin fix for consistent left alignment.

---

## Archived (v1.0.x) - Foundation Phase
v1.0.8-1.0.15: Complete tokenization, component library (ShadowButton, FormInput), HomePage decomposition, utils/hooks infrastructure, service layer (ApiResult<T>, BaseService), navigation system (typed hooks, auth guards), production readiness (ErrorBoundary, LoadingState).

---

## Known Issues (Active)

| Issue | Solution |
|-------|----------|
| Navigation delay to ActiveWorkout | Dial tick rendering creates 1100+ elements - needs virtualization |
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

### File Organization Pattern (New)
Large components follow this structure:
- `Component.tsx` - Component logic (~200-300 lines)
- `Component.styles.ts` - StyleSheet definitions
- `Component.helpers.ts` - Helper functions (if needed)

### Workout Settings Bar (v1.1.16)
- **Height**: 32dp, below title bar
- **Layout**: Gear icon (left) | TO GO | separator | SETS: X  MINS: X (right)
- **Alignment**: 16dp horizontal padding matching TopNavBar
- **Visibility**: Only during active workout (totalSets > 0)

### WorkoutCard Architecture (v1.1.12)
- **Suggester mode**: Cards configured via `suggester` prop
- **Legacy mode**: Cards configured via `workoutType` prop
- **Overlay strip**: Semi-transparent bar at top of image with category text
- **Pill**: Bottom right corner with suggester name
- **Accent color**: Centralized per-card color for title and pill
- **Transform origin**: `left center` for consistent text alignment

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

**Version**: 1.1.17 | **Updated**: 2026-01-10
