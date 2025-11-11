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

## Current Version: 1.0.4

**Branch**: Claude-v1.0.4
**Status**: Design Token System Refactored - Production Ready
**Last Updated**: 2025-11-11

---

## Session State

### Current Work
- **COMPLETED**: Comprehensive design token refactoring
- All screens (LoginScreen, LoginFormScreen, SignUpScreen) fully tokenized
- Zero hardcoded colors or magic numbers remaining
- 64dp safe zone standard established across all screens
- New CLAUDE_DEV_STANDARDS rule #10 added: Forward-Looking Comments

### Completed This Session
1. **Color Token System** - Complete refactoring:
   - Added `primaryMuted` (#00BF00) for 75% green accents
   - Added `pureBlack` (#000000) and `pureWhite` (#FFFFFF) for absolute values
   - Added `googleBlue` (#4285F4) and `facebookBlue` (#1877F2) for social login
   - All colors now have semantic names, hex values, and use case documentation

2. **Spacing Token System** - 64dp standard:
   - Added `safeZone: 64` - Standard clearance from top/bottom edges
   - Added `safeZoneHorizontal: 32` - Standard horizontal clearance
   - Added `textLineGap: 10` - Consistent text line spacing
   - Added `textGroupSpacing: 32` - Spacing between text groups
   - Added `buttonSpacing: 16` - Vertical spacing between buttons

3. **Typography Token System** - Complete font scale:
   - Added `xl: 24dp` (1.5× baseline)
   - Added `xxl: 28dp` (1.75× baseline)
   - Added `xxxl: 32dp` (2× baseline)
   - Added `display: 48dp` (3× baseline)
   - Added `mega: 64dp` (4× baseline)
   - All based on 16dp baseline with rem-like scaling

4. **Layout Token System** - Semantic naming:
   - Updated `header.topSpacing: 64` (changed from 100dp to match safe zone)
   - Added `bottom.safeZone: 64` - Standard bottom spacing
   - Added `bottom.buttonGroupPadding: 48` - Accounts for button margins
   - Added `icon` sizes: small (16), medium (24), large (32), xlarge (40)
   - Added `backgroundImage` configuration: topSpacing (32), widthPercentage (80), heightPercentage (70), opacity (0.5)

5. **Screen Refactoring** - All auth screens tokenized:
   - **LoginScreen**: All spacing uses tokens, no hardcoded values
   - **LoginFormScreen**: Social media colors tokenized, header uses layout tokens
   - **SignUpScreen**: Background image uses layout tokens, all colors tokenized

6. **Documentation Standards**:
   - Added Standard #10: Forward-Looking Comments
   - Comments must explain design intent, not historical changes
   - Updated CLAUDE_DEV_STANDARDS.md and CLAUDE.md

### Next Session Should
1. **Test the refactored screens** on Android emulator
2. **Verify all tokens render correctly** with new values
3. **Continue with app features**:
   - Implement authentication logic
   - Build workout logging functionality
   - Create training plan system
4. **Apply token system** to any new screens or components

### User Decisions Made
- Establish 64dp as standard safe zone clearance (top/bottom)
- Use 32dp as standard horizontal clearance
- All measurements in dp (density-independent pixels)
- 16dp as baseline for typography scaling (rem-like system)
- Comments must be forward-looking, not historical

---

## Previous Sessions

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
- **Branch**: Claude-v1.0.4 (refactoring complete)

### Next Steps
1. **Test refactored screens** on Android emulator
2. **Verify token rendering** with new values
3. **Auth**: AuthContext + service + validation + error states
4. **Supabase**: Auth providers + policies + user profiles table
5. **OR App Features**: Workout logging + training plans + history/analytics
6. **Shared**: Loading indicator + error component + toast notifications

---

**Version**: 1.0.4
**Last Updated**: 2025-11-11
**Status**: Design Token System Refactored - Production Ready
