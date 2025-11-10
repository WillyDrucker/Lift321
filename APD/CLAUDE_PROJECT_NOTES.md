# LIFT 3-2-1 PROJECT NOTES

## Purpose

This file contains the historical record of version changes for Lift 3-2-1. Detailed changelog information can be added here as work progresses. When the file grows too large, older versions will be condensed to 2-3 line summaries to keep the file manageable. Recent versions (current phase of work) remain detailed. For current architectural patterns and session state, see CLAUDE_SESSION_HANDOFF.md.

**Documentation Flow**: Items too detailed for CLAUDE_SESSION_HANDOFF.md are summarized there with full details provided here. Items too big for PROJECT_NOTES can overflow to CLAUDE_ACTIVE.md as an extension.

---

## Version History

### v1.0.0 - Foundation Complete (2025-11-09)
**Branch**: Claude-v1.0.0

**Summary**: Initial project creation with complete foundation, architecture, and design token system.

**What Was Built**:
- React Native 0.82.1 initialized with TypeScript
- Complete folder structure (feature-based architecture)
- Design token system (global theme with semantic naming)
- TypeScript strict mode + absolute imports configured
- Supabase client setup with AsyncStorage persistence
- Navigation type definitions (type-safe routes)
- AuthContext template (Context + custom hook pattern)
- Comprehensive APD documentation (CLAUDE.md, CLAUDE_DEV_STANDARDS.md, CLAUDE_SESSION_HANDOFF.md, this file, CLAUDE_ACTIVE.md)

**Dependencies**: 891 packages, 0 vulnerabilities

**Key Technical Decisions**:
- Styling: StyleSheet + Design Tokens (NOT NativeWind)
- State: Context API + Hooks (NOT Redux)
- Backend: Supabase brand new project (NOT Will's 3-2-1)
- Architecture: Feature-based (NOT file-type based)
- Imports: Absolute with @/ aliases (NO relative paths)

**Design Token Philosophy**:
- Token **system** established (architecture/pattern)
- Token **values** are placeholders (will evolve during UI development)
- NOT recreating Will's 3-2-1 specific values

**Patterns Established**:
- Context + custom hook with memoization
- Service layer separation (business logic from UI)
- Absolute imports via tsconfig + babel
- TypeScript strict mode enforced
- File headers with section comments
- Semantic naming (purpose over appearance)

**Intentionally NOT Implemented**:
- UI components (Button, Card, Input, Selector)
- Screen implementations
- Business logic (stubs only)
- Supabase schema and generated types

**Errors Encountered and Resolved**:
1. React Native init deprecated → switched to `@react-native-community/cli`
2. TypeScript template flag error → removed (default in 0.82+)
3. Empty folder issue → fixed with correct path format

**Git**: Repository initialized, initial commit on Claude-v1.0.0

**Next Phase**: Build shared components or set up Supabase backend

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

---

## Critical Context

**What This Project IS**:
- Brand new React Native + TypeScript app
- Built from scratch with modern best practices
- Inspired by lessons from Will's 3-2-1

**What This Project IS NOT**:
- NOT a code migration
- NOT using Will's 3-2-1 Supabase
- NOT recreating Will's 3-2-1 design values

**Will's 3-2-1 Role**: Reference for patterns only (C:\Dev\Wills321 - UNTOUCHED)

---

**Current Version**: 1.0.0
**Last Updated**: 2025-11-09
