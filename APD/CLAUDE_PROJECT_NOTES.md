# LIFT 3-2-1 PROJECT NOTES

## What This File Does

This is the comprehensive version history and changelog for the Lift 3-2-1 project. It provides a detailed record of what was built in each version, why decisions were made, what problems were solved, and what was learned. Each version entry documents features implemented, files created or modified, user decisions, technical challenges, and key learnings. This file grows with the project and maintains institutional knowledge across sessions. Older versions (3+ versions back) are condensed to 3-5 line summaries to keep the file manageable, while recent versions remain detailed for reference.

**IMPORTANT**: This file should ONLY contain summarized version history and high-level decisions. Exact code examples, detailed bug reproductions, and technical implementation details belong in CLAUDE_ACTIVE.md. Only store code references here if they document absolutely critical bugs or solutions that must be preserved long-term.

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.0.4 - Diagnostic Session & Onboarding Documentation (2025-11-11)
**Branch**: Claude-v1.0.4

**Summary**: Diagnostic session identifying runtime errors. No code changes made. Created comprehensive Android Studio setup guide for new developer onboarding. Initialized DEVDOC Agent documentation system with USERPROMPT folder.

**What Happened**:
- Created new branch Claude-v1.0.4 from main
- User reported Android runtime errors when attempting to run app:
  - Native module registration issues
  - theme.layout undefined errors
- Attempted Metro bundler cache troubleshooting
- User asked to commit/merge but was advised no changes had been made yet
- User requested Android Studio setup documentation for son to work on project

**Documentation Created**:
- Comprehensive Android Studio Setup Guide (provided in conversation)
  - Gradle 9.2.0 configuration instructions
  - Foojay Toolchains plugin v1.0.0 setup
  - JDK 17/21 requirements and installation paths
  - Node 20+ requirements
  - npm install workflow with patch-package explanation
  - Common troubleshooting steps (Metro cache, gradlew clean, module linking)
  - Step-by-step first-time setup process
- DEVDOC Agent system initialized:
  - Created USERPROMPT folder structure
  - Created USERPROMPT-Claude-v1.0.4.md with first prompt capture
  - Updated CLAUDE_SESSION_HANDOFF.md for v1.0.4
  - Updated CLAUDE_PROJECT_NOTES.md (this file) for v1.0.4

**Runtime Errors Identified (UNRESOLVED)**:
- Native module registration failing
- theme.layout references throwing undefined errors
- Root cause not yet determined
- Requires investigation in next session

**User Decisions**:
- Delay commit/merge until runtime errors are fixed
- Onboard son to development with comprehensive setup guide
- Focus on error resolution before adding new features
- Implement USERPROMPT documentation system for all user requests

**Files Created**:
- `USERPROMPT/USERPROMPT-Claude-v1.0.4.md` - First prompt capture file

**Files Modified**:
- `APD/CLAUDE_SESSION_HANDOFF.md` - Updated to v1.0.4 with current session state
- `APD/CLAUDE_PROJECT_NOTES.md` - Added v1.0.4 entry (this update)

**Git Status**:
- Branch created but no code commits yet
- Documentation changes not yet committed
- Waiting for error fixes before commit/merge

**Key Learnings**:
- Merging branches without testing can introduce runtime errors
- Need better pre-merge testing process
- Onboarding documentation is critical for multi-developer projects
- DEVDOC Agent system provides valuable session tracking

**Next Steps**:
1. Investigate and resolve native module registration errors
2. Fix theme.layout undefined errors
3. Verify Metro bundler is loading all modules correctly
4. Test app functionality on Android emulator
5. Commit fixes and merge to main
6. THEN resume feature development (authentication or main app features)

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
