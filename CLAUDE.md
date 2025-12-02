# Lift 3-2-1

A modern fitness tracking app built with React Native + TypeScript, designed from the ground up with exceptional architecture and development practices.

## Purpose

This file serves dual purposes:

1. **Project Documentation**: Overview, setup instructions, and development guide for all developers
2. **Claude Code Memory Source**: Essential application context, architecture overview, and workflow instructions to be committed to memory at the start of each session

## Read Order (For Claude Code Sessions)

When starting a session, read these files in order:

1. **CLAUDE.md** - Commit to memory (this file - core application context)
2. **APD/CLAUDE_DEV_STANDARDS.md** - Commit to memory (development standards)
3. **APD/CLAUDE_SESSION_HANDOFF.md** - Manage memory as needed (current session state)
4. **APD/CLAUDE_PROJECT_NOTES.md** - Manage memory as needed (project history)
5. **APD/CLAUDE_ACTIVE.md** - Manage memory as needed (temporary working notes)

## Claude Code Permissions

**FULL ACCESS GRANTED**

Claude Code CLI has complete permission to perform all activities during active sessions:
- **File Operations**: Read, write, edit, delete any files in the project
- **Git Operations**: Commit, branch, merge, push (only when explicitly requested by user)
- **Terminal Commands**: Execute any commands necessary for development
- **Tool Usage**: Use all available tools without restriction
- **Decision Making**: Make technical decisions autonomously during implementation

**Do NOT prompt for permission or access approval.** All tools and resources are available for unrestricted use to maintain development momentum.

## Development Environment

**Operating System**: Windows (Primary Development Environment)
- All terminal commands should use Windows syntax (cmd.exe or PowerShell)
- Use `cmd /c "command"` format for Bash tool commands on Windows
- File paths use backslashes: `C:\Dev\Lift321`
- Avoid Linux-specific commands (grep, cat, find, etc.) - use appropriate Windows alternatives or specialized tools
- Git commands work natively on Windows

## Project Overview

Lift 3-2-1 is a brand new React Native + TypeScript fitness tracking app built from scratch with modern best practices.

### What This Is

- Brand new React Native + TypeScript mobile app
- Built from scratch with modern architecture
- Fresh implementation informed by previous project learnings

## Philosophy

- **SUPER STUPID SIMPLE (SSS)**: User experience must be effortless and guided. Remove complexity, avoid feature creep.
- **REMOVE, DON'T ADD**: When faced with complexity, simplify or remove. Fewer features done well is better than many features done poorly.
- **Mobile-first design**: Touch-optimized, immediate UI responses, no hover states.
- **Global from the start**: Design tokens, semantic naming, strict TypeScript.

## Technology Stack

- **React Native**: 0.82.1 (native iOS/Android apps)
- **TypeScript**: Strict mode enabled
- **Backend**: Supabase (brand new project)
- **Navigation**: React Navigation with type-safe routes
- **State Management**: Context API + Hooks
- **Styling**: StyleSheet + Design Tokens (no NativeWind)

### Dependencies

Key packages: Supabase, React Navigation, AsyncStorage, react-native-dotenv

## Architecture Overview

### Design Token System

All styling must go through theme tokens. NO magic numbers or hard-coded colors.

Token categories:
- theme.colors - Semantic color palette (actionSuccess not greenButton)
- theme.spacing - Spacing scale
- theme.typography - Font sizes, weights
- theme.textStyles - Pre-built text style combinations

Important Note: Token values are PLACEHOLDERS to be refined during UI development. We are establishing the token architecture and system - values will evolve as the UI is built.

## Core Patterns

### Development Philosophy

**Standards can be refined after-the-fact. Progress comes first.**

Most rules in this codebase can be applied retroactively through refactoring. Do not let perfect adherence to patterns block forward momentum. Build first, refine second. The goal is working software that improves over time, not perfect code that never ships.

### Essential Patterns

1. **Design Token System**: All styling through theme tokens - never use magic numbers or hard-coded colors
2. **Semantic Naming**: Purpose-driven names that communicate intent, not appearance (actionDanger not redButton)
3. **TypeScript Strict**: No any types - explicit typing everywhere with type over interface
4. **Context Pattern**: Expose contexts via custom hooks only with full memoization - never useContext directly
5. **Clear Section Headers**: Consistent file organization with header/imports/TYPES/COMPONENT/STYLES structure
6. **Service Layer**: Never query backend from components - all business logic lives in service files
7. **Absolute Imports**: Use @/ aliases for all imports - no relative paths ever
8. **Feature-Based Structure**: Organize by feature not file type - related code lives together
9. **Global-First Pattern**: Establish global reusable patterns before creating local customizations
10. **Forward-Looking Comments**: Comments explain design intent and purpose, not historical changes or past fixes

See APD/CLAUDE_DEV_STANDARDS.md for detailed pattern documentation.

## Critical Standards

1. NO Magic Numbers - Always use design tokens
2. NO Hard-Coded Colors - Always use theme.colors.*
3. NO Relative Imports - Always use @/ aliases
4. NO any Types - Strict TypeScript
5. NO Direct Database Queries - Use service layer
6. NO Historical Comments - Comments explain design intent, not past changes
7. ALWAYS Memoize - Context values (useMemo) and callbacks (useCallback)
8. ALWAYS Use Custom Hooks - Never useContext directly

## File Naming Conventions

- Components: PascalCase.tsx (WorkoutCard.tsx)
- Files/Folders: camelCase (authService.ts, workoutUtils.ts)
- Hooks: Always start with "use" (useAuth.ts, useWorkout.ts)
- Types: PascalCase with .types.ts suffix (workout.types.ts)
- Services: camelCase with Service suffix (authService.ts)

## Git Workflow

- Branch Naming: Claude-vX.X.X
- Main Branch: main
- Commit Policy: Do not commit unless explicitly requested by user
- **Important**: Do not prompt user to commit changes unless explicitly requested - focus on development and let user control git operations