# Lift 3-2-1

A modern fitness tracking app built with React Native + TypeScript, designed from the ground up with exceptional architecture and development practices.

## Purpose

This file serves dual purposes:

1. **Project Documentation**: Overview, setup instructions, and development guide for all developers
2. **Claude Code Memory Source**: Essential application context, architecture overview, and workflow instructions to be committed to memory at the start of each session

## Read Order (For Claude Code Sessions)

When starting a session, read these files in order:

1. **README.md** - Commit to memory (this file - core application context)
2. **APD/CLAUDE_DEV_STANDARDS.md** - Commit to memory (development standards)
3. **APD/CLAUDE_SESSION_HANDOFF.md** - Manage memory as needed (current session state)
4. **APD/CLAUDE_PROJECT_NOTES.md** - Manage memory as needed (project history)
5. **APD/CLAUDE_ACTIVE.md** - Manage memory as needed (temporary working notes)

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

## Core Patterns (MUST FOLLOW)

### 1. Context + Custom Hook Pattern

Always expose Context via custom hook with memoization. Never use useContext directly.

### 2. Service Layer Pattern

Never query Supabase directly from components. Always through service layer. Business logic lives in service files, not in components or contexts.

### 3. Absolute Imports

All imports use @/ path aliases. NO relative imports. Configuration exists in both tsconfig.json and babel.config.js.

### 4. TypeScript Strict Mode

No any types. Type everything explicitly. Use type over interface for React Native convention.

### 5. Clear Section Headers

Organize all files with clear section headers. File structure: header, imports, TYPES, COMPONENT (with STATE, HOOKS, EVENT HANDLERS, RENDER subsections), STYLES.

See APD/CLAUDE_DEV_STANDARDS.md for detailed pattern documentation.

## Critical Standards

1. NO Magic Numbers - Always use design tokens
2. NO Hard-Coded Colors - Always use theme.colors.*
3. NO Relative Imports - Always use @/ aliases
4. NO any Types - Strict TypeScript
5. NO Direct Database Queries - Use service layer
6. ALWAYS Memoize - Context values (useMemo) and callbacks (useCallback)
7. ALWAYS Use Custom Hooks - Never useContext directly

## File Naming Conventions

- Components: PascalCase.tsx (WorkoutCard.tsx)
- Files/Folders: camelCase (authService.ts, workoutUtils.ts)
- Hooks: Always start with "use" (useAuth.ts, useWorkout.ts)
- Types: PascalCase with .types.ts suffix (workout.types.ts)
- Services: camelCase with Service suffix (authService.ts)

## Git Workflow

- Branch Naming: Claude-vX.X.X
- Current Branch: Claude-v1.0.0
- Main Branch: main
- Commit Policy: Do not commit unless explicitly requested by user