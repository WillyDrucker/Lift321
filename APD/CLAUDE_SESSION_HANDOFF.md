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

## Current Version: 1.0.6

**Branch**: Claude-v1.0.6
**Status**: Development Complete - Ready to Merge
**Last Updated**: 2025-11-14

---

## Session State

### Current Work
- HomePage UI finalized with top navigation bar and bottom tab bar
- All files tokenized per CLAUDE_DEV_STANDARDS
- Physical device testing completed
- Ready to merge to main and create v1.0.7

### Completed This Session
1. Created HomePage with top navigation bar (search icon, hamburger menu)
2. Added bottom tab bar with Home/Plans/Performance/Profile tabs
3. Physical phone testing via USB (R5CT40X95AW device)
4. Icon size iterations based on real device feedback
5. Moved SignUpStep2Screen "3-2-1 CHALLENGE" text from 32dp to 64dp
6. Applied CLAUDE_DEV_STANDARDS - eliminated all magic numbers
7. Created theme.layout.topNav tokens for HomePage navigation
8. Updated theme.layout.bottomNav with iconTopSpacing and height: 100dp

### Next Session Should
1. **Continue with app features**:
   - Implement authentication logic
   - Build workout logging functionality
   - Create training plan system
2. **Apply token system** to any new screens or components
3. **Consider**: Implement sidebar menu functionality for hamburger icon

### User Decisions Made
- Production-ready design token system established (v1.0.5)
- 64dp safe zone standard across all screens
- Forward-looking comments required in all code

---

## Previous Sessions

### v1.0.5 - Comprehensive Design Token System Refactoring (2025-11-11)
Complete refactoring of design token system. Established 64dp safe zone standard, expanded color/typography/spacing tokens, refactored all auth screens (LoginScreen, LoginFormScreen, SignUpScreen) with zero hardcoded values. Added Standard #10: Forward-Looking Comments. Branch merged to main successfully.

### v1.0.4a - MainActivity Base UI Complete (2025-11-10)
Complete MainActivity base UI with hamburger sidebar, day selector tabs, workout card, bottom navigation. Slide-out sidebar drawer with animation. All components fully tokenized. Branch merged to main successfully.

### v1.0.3 - Navigation Complete & Full Tokenization (2025-11-10)
Implemented React Navigation with LoginFormScreen and MainActivity. Created complete tokenization system with theme.layout module. Built SVG icon system. Refined shadow system. All screens fully tokenized. Branch merged to main successfully.

### v1.0.2 - LoginScreen Complete & Design Tokens (2025-11-10)
Built complete LoginScreen with gym background, custom Bebas Neue font, multi-layer shadow system. Created theme modules for shadows and buttons. Upgraded Gradle to 9.2.0. Branch merged to main successfully.

---

## Known Issues

### Android Shadows / Metro Cache / Native Modules
- Native shadows unreliable → Use multi-layer View pattern
- New assets/modules → Restart Metro with --reset-cache, rebuild Android

---

## Quick Reference: Established Patterns

### Design Token Modules (UPDATED)
| Module | Purpose |
|--------|---------|
| `theme.colors` | Semantic colors (primary, primaryMuted, pureBlack, pureWhite, googleBlue, facebookBlue, shadowBlack) |
| `theme.spacing` | xs/s/m/l/xl/xxl + safeZone/safeZoneHorizontal/textLineGap/buttonSpacing (16dp rhythm) |
| `theme.typography` | Fonts (brand/primary), sizes (xs/s/m/l/xl/xxl/xxxl/display/mega), weights |
| `theme.textShadows` | default/subtle/strong |
| `theme.viewShadows` | iOS shadows (small/medium/large) |
| `theme.elevation` | Android elevation values |
| `theme.buttons` | Sizing, padding, borderRadius, margins, shadowLayers |
| `theme.layout` | header/logo/form/bottom/icon/backgroundImage constants |

### Layout Token Values (UPDATED)
| Category | Token | Value | Use Case |
|----------|-------|-------|----------|
| **Header** | theme.layout.header.topSpacing | 64dp | Auth screen headers (matches safe zone) |
| | theme.layout.header.horizontalPadding | 32dp | Left/right header padding |
| **Top Nav** | theme.layout.topNav.topSpacing | 32dp | Distance from screen top |
| | theme.layout.topNav.height | 32dp | Navigation bar height |
| | theme.layout.topNav.paddingHorizontal | 10dp | Icon spacing from edges |
| | theme.layout.topNav.searchIconSize | 20dp | Search icon size |
| | theme.layout.topNav.menuIconSize | 28dp | Hamburger menu icon size |
| | theme.layout.topNav.borderWidth | 1dp | Development visibility border |
| **Bottom Nav** | theme.layout.bottomNav.height | 100dp | Bottom tab bar height (device nav buttons) |
| | theme.layout.bottomNav.iconSize | 24dp | Tab icon size |
| | theme.layout.bottomNav.iconTopSpacing | 6dp | Icon position from bar top |
| | theme.layout.bottomNav.paddingVertical | 10dp | Top/bottom padding |
| | theme.layout.bottomNav.paddingHorizontal | 16dp | Left/right padding |
| **Logo** | theme.layout.logo.size | 40dp | Logo dimensions |
| | theme.layout.logo.borderRadius | 20dp | Circular logo shape |
| **Form** | theme.layout.form.inputHeight | 50dp | Standard input height |
| | theme.layout.form.inputBorderWidth | 2dp | Input border thickness |
| | theme.layout.form.inputBorderRadius | 8dp | Input corner radius |
| | theme.layout.form.inputHorizontalMargin | 5dp | Input side margins |
| | theme.layout.form.buttonHorizontalMargin | 32dp | Button side margins |
| | theme.layout.form.dividerSpacing | 32dp | Spacing around dividers |
| **Bottom** | theme.layout.bottom.safeZone | 64dp | Standard bottom clearance |
| | theme.layout.bottom.buttonGroupPadding | 48dp | Container padding (48+16 margin = 64 visual) |
| **Icons** | theme.layout.icon.large | 32dp | Chevrons, primary actions |
| | theme.layout.icon.medium | 24dp | Navigation icons |
| **Background** | theme.layout.backgroundImage.topSpacing | 32dp | Auth screen background position |
| | theme.layout.backgroundImage.opacity | 0.5 | Standard background transparency |

### Spacing Token Values (UPDATED)
| Token | Value | Use Case |
|-------|-------|----------|
| `theme.spacing.safeZone` | 64dp | Top/bottom safe clearance for system UI |
| `theme.spacing.safeZoneHorizontal` | 32dp | Left/right safe clearance |
| `theme.spacing.textLineGap` | 10dp | Vertical spacing between text lines |
| `theme.spacing.textGroupSpacing` | 32dp | Spacing between text groups/paragraphs |
| `theme.spacing.buttonSpacing` | 16dp | Vertical spacing between stacked buttons |
| `theme.spacing.xl` | 32dp | Large gaps, section separation |
| `theme.spacing.m` | 16dp | Default element spacing |

### Typography Token Values (UPDATED)
| Token | Value | Use Case |
|-------|-------|----------|
| `theme.typography.fontSize.display` | 48dp | Hero text, main branding (3× baseline) |
| `theme.typography.fontSize.xxxl` | 32dp | Large headlines, page titles (2× baseline) |
| `theme.typography.fontSize.xxl` | 28dp | Medium headlines, sub-headers (1.75× baseline) |
| `theme.typography.fontSize.xl` | 24dp | Small headlines, section titles (1.5× baseline) |
| `theme.typography.fontSize.l` | 20dp | Button text, emphasized labels (1.25× baseline) |
| `theme.typography.fontSize.m` | 16dp | Body text, standard UI text (1× baseline) |

### Color Token Values (UPDATED)
| Token | Value | Use Case |
|-------|-------|----------|
| `theme.colors.primary` | #00FF00 | Main brand green, primary buttons, CTAs |
| `theme.colors.primaryMuted` | #00BF00 | 75% green for softer accents |
| `theme.colors.pureBlack` | #000000 | True black backgrounds, maximum contrast |
| `theme.colors.pureWhite` | #FFFFFF | Maximum contrast backgrounds, light elements |
| `theme.colors.googleBlue` | #4285F4 | Official Google brand color |
| `theme.colors.facebookBlue` | #1877F2 | Official Facebook brand color |
| `theme.colors.textOnAction` | #000000 | Text on green buttons |
| `theme.colors.shadowBlack` | #000000 | All drop shadows and elevation |

### Shadow Layer System (Android)
| Layer | Top | Opacity | Usage |
|-------|-----|---------|-------|
| layer1 | 1dp | 0.4 | Closest, darkest |
| layer2 | 2dp | 0.25 | Middle |
| layer3 | 3dp | 0.15 | Farthest, lightest |

**Pattern**: 3 Views stacked, pure black, drop straight down, no horizontal shift

### Icon System
| Icon | Usage | Size |
|------|-------|------|
| LeftChevron | Back/previous nav | 32dp (large) |
| RightChevron | Forward/next nav | 32dp (large) |
| EyeOpen | Show password | 15dp (custom) |
| EyeClosed | Hide password | 15dp (custom) |
| SearchIcon | Search functionality | 20dp (topNav) |
| HamburgerIcon | Menu/sidebar toggle | 28dp (topNav) |
| HomeIcon | Home tab navigation | 24dp (bottomNav) |
| PlansIcon | Plans tab navigation | 24dp (bottomNav) |
| StatsIcon | Performance tab | 24dp (bottomNav) |
| ProfileIcon | Profile tab | 24dp (bottomNav) |

**All accept**: size (number), color (string) props

### Architecture Patterns (REQUIRED)
| Pattern | Rule |
|---------|------|
| **Design Tokens** | ALL styling via `theme.*` - NO magic numbers/hard-coded colors |
| **Absolute Imports** | Use `@/` aliases - NO relative imports |
| **TypeScript Strict** | Explicit types - NO `any` (unless absolutely necessary) |
| **Context Pattern** | Never expose Context directly - Always via custom hook with memoization |
| **Service Layer** | Never query Supabase from components - Always via service layer |
| **Navigation** | React Navigation with TypeScript - Type-safe via RootStackParamList |
| **Forward-Looking Comments** | Comments explain design intent, not historical changes or fixes |

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
Supabase (.env) | Metro (8081) | GitHub synced | All deps installed | Android emulator | Gradle 9.2.0 | Fonts (Bebas Neue) | **Design tokens complete** | React Navigation | SVG icons | **64dp safe zone standard**

### Not Yet Set Up
DB schema/tables | Supabase Auth config | TS types from DB | Auth logic

### Critical Paths
- **Project Root**: C:\Dev\Lift321 (ACTIVE DEV)
- **GitHub**: https://github.com/WillyDrucker/Lift321
- **Historical Context**: Fresh React Native build informed by previous project learnings (reference code at C:\Dev\Wills321 - untouched)
- **Branch**: Claude-v1.0.6 (ready for development)

### Next Steps
1. **Test refactored screens** on Android emulator
2. **Verify token rendering** with new values
3. **Auth**: AuthContext + service + validation + error states
4. **Supabase**: Auth providers + policies + user profiles table
5. **OR App Features**: Workout logging + training plans + history/analytics
6. **Shared**: Loading indicator + error component + toast notifications

---

**Version**: 1.0.6
**Last Updated**: 2025-11-11
**Status**: Ready for Development
