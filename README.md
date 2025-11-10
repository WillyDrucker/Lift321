# Lift 3-2-1

A modern fitness tracking app built with React Native + TypeScript, designed from the ground up with exceptional architecture and development practices.

**Status**: Foundation Complete - Ready for Feature Development
**Version**: 1.0.0
**Branch**: Claude-v1.0.0

---

## Purpose

This file serves dual purposes:

1. **Project Documentation**: Overview, setup instructions, and development guide for all developers
2. **Claude Code Memory Source**: Essential application context, architecture overview, and workflow instructions to be committed to memory at the start of each session

---

## Read Order (For Claude Code Sessions)

When starting a session, read these files in order:

1. **README.md** - Commit to memory (this file - core application context)
2. **APD/CLAUDE_DEV_STANDARDS.md** - Commit to memory (development standards)
3. **APD/CLAUDE_SESSION_HANDOFF.md** - Manage memory as needed (current session state)
4. **APD/CLAUDE_PROJECT_NOTES.md** - Manage memory as needed (project history)
5. **APD/CLAUDE_ACTIVE.md** - Manage memory as needed (temporary working notes)

---

## Project Overview

Lift 3-2-1 is a brand new React Native + TypeScript fitness tracking app built from scratch. This is NOT a code migration from Will's 3-2-1 (vanilla JavaScript web app). Will's 3-2-1 serves ONLY as a reference for patterns, concepts, and design philosophy.

### Critical Context

- **Location**: C:\Dev\Lift321
- **Will's 3-2-1 Location**: C:\Dev\Wills321 (UNTOUCHED - reference only)
- **Supabase**: Brand new project (NOT using Will's 3-2-1 Supabase)
- **Current Branch**: Claude-v1.0.0
- **Current Version**: 1.0.0 - Foundation Complete

### What This Is

- Brand new React Native + TypeScript mobile app
- Built from scratch with modern best practices
- Inspired by lessons learned from Will's 3-2-1

### What This Is NOT

- NOT a migration of Will's 3-2-1 code
- NOT a conversion from JavaScript to TypeScript
- NOT using Will's 3-2-1 Supabase project
- NOT recreating Will's 3-2-1 specific design values

---

## Philosophy

- **SUPER STUPID SIMPLE (SSS)**: User experience must be effortless and guided. Remove complexity, avoid feature creep.
- **REMOVE, DON'T ADD**: When faced with complexity, simplify or remove. Fewer features done well is better than many features done poorly.
- **Mobile-first design**: Touch-optimized, immediate UI responses, no hover states.
- **Global from the start**: Design tokens, semantic naming, strict TypeScript.

---

## Technology Stack

- **React Native**: 0.82.1 (native iOS/Android apps)
- **TypeScript**: Strict mode enabled
- **Backend**: Supabase (brand new project)
- **Navigation**: React Navigation with type-safe routes
- **State Management**: Context API + Hooks
- **Styling**: StyleSheet + Design Tokens (no NativeWind)

### Dependencies

Total: 891 packages, 0 vulnerabilities
Key packages: Supabase, React Navigation, AsyncStorage, react-native-dotenv

---

## Architecture Overview

### Folder Structure (Feature-Based)

```
Lift321/
├── src/
│   ├── features/              # Feature-based architecture (NOT file-type based)
│   │   ├── auth/              # Authentication feature
│   │   │   ├── screens/       # Login, SignUp screens
│   │   │   ├── components/    # Auth-specific components
│   │   │   ├── context/       # AuthContext + useAuth hook
│   │   │   ├── services/      # authService (business logic)
│   │   │   └── types/         # Auth type definitions
│   │   ├── workouts/          # Workout logging feature
│   │   ├── plans/             # Training programs feature
│   │   └── history/           # Workout history feature
│   │
│   ├── components/            # Shared components (global use only)
│   ├── theme/                 # Design token system (GLOBAL)
│   │   ├── colors.ts          # Semantic color palette
│   │   ├── spacing.ts         # Spacing scale
│   │   ├── typography.ts      # Font styles
│   │   └── tokens.ts          # Main theme export
│   │
│   ├── navigation/            # React Navigation setup
│   │   ├── types.ts           # Type-safe route definitions
│   │   └── AppNavigator.tsx   # Main navigator
│   │
│   ├── contexts/              # Global contexts only
│   ├── services/              # Global services
│   │   └── supabase/          # Supabase client + types
│   ├── hooks/                 # Shared custom hooks
│   ├── types/                 # Global TypeScript types
│   ├── utils/                 # Utility functions
│   └── assets/                # Images, fonts
│
├── APD/                       # Architecture & Planning Docs
│   ├── CLAUDE_DEV_STANDARDS.md
│   ├── CLAUDE_SESSION_HANDOFF.md
│   ├── CLAUDE_PROJECT_NOTES.md
│   └── CLAUDE_ACTIVE.md
│
├── .env                       # Environment variables (gitignored)
├── .env.example               # Environment template
├── tsconfig.json              # TypeScript configuration
└── babel.config.js            # Babel configuration (absolute imports)
```

### Design Token System

All styling must go through theme tokens. NO magic numbers or hard-coded colors.

Token categories:
- theme.colors - Semantic color palette (actionSuccess not greenButton)
- theme.spacing - Spacing scale
- theme.typography - Font sizes, weights
- theme.textStyles - Pre-built text style combinations

Important Note: Token values are PLACEHOLDERS to be refined during UI development. We are establishing the system and pattern, not recreating Will's 3-2-1 specific values.

---

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

---

## Critical Standards

1. NO Magic Numbers - Always use design tokens
2. NO Hard-Coded Colors - Always use theme.colors.*
3. NO Relative Imports - Always use @/ aliases
4. NO any Types - Strict TypeScript
5. NO Direct Database Queries - Use service layer
6. ALWAYS Memoize - Context values (useMemo) and callbacks (useCallback)
7. ALWAYS Use Custom Hooks - Never useContext directly

---

## File Naming Conventions

- Components: PascalCase.tsx (WorkoutCard.tsx)
- Files/Folders: camelCase (authService.ts, workoutUtils.ts)
- Hooks: Always start with "use" (useAuth.ts, useWorkout.ts)
- Types: PascalCase with .types.ts suffix (workout.types.ts)
- Services: camelCase with Service suffix (authService.ts)

---

## Git Workflow

- Branch Naming: Claude-vX.X.X
- Current Branch: Claude-v1.0.0
- Main Branch: main
- Commit Policy: Do not commit unless explicitly requested by user

---

## Current State (v1.0.0)

### What's Complete

Foundation & Architecture:
- React Native 0.82.1 initialized with TypeScript
- All dependencies installed (891 packages, 0 vulnerabilities)
- TypeScript strict mode configured
- Absolute imports configured (@/, @components/, @features/, etc.)
- Complete folder structure (feature-based architecture)

Design Token System:
- theme/colors.ts - Semantic color palette
- theme/spacing.ts - Spacing scale
- theme/typography.ts - Font sizes, weights, pre-built text styles
- theme/tokens.ts - Main theme export

Supabase Integration:
- Supabase client configured (services/supabase/client.ts)
- AsyncStorage persistence for sessions
- Database types placeholder (database.types.ts)

Navigation:
- Type-safe route definitions (navigation/types.ts)
- Global navigation types configured

Context Architecture:
- AuthContext template with proper pattern (Context + custom hook + memoization)

Documentation:
- README.md - This file
- CLAUDE_DEV_STANDARDS.md - Comprehensive coding standards
- CLAUDE_SESSION_HANDOFF.md - Session state and patterns
- CLAUDE_PROJECT_NOTES.md - Version history
- CLAUDE_ACTIVE.md - Working notes

### What's NOT Complete (Intentionally)

This is a foundation/scaffolding project. The following are intentionally NOT implemented:

UI & Components:
- Shared components (Button, Card, Input, Selector)
- Screen implementations (Login, WorkoutList, etc.)
- App layout and navigation flow

Business Logic:
- AuthContext implementation (signIn, signUp, signOut methods are stubs)
- Workout context and state management
- Plans context and state management
- Service layer implementations

Backend:
- Supabase project setup (database schema, tables, RLS policies)
- Generated database types
- Authentication configuration

---

## Getting Started

### Prerequisites

1. React Native Environment Setup
   - Follow the React Native Environment Setup guide: https://reactnative.dev/docs/set-up-your-environment
   - Install Xcode (macOS) or Android Studio
   - Install CocoaPods (iOS development)

2. Supabase Project Setup
   - Create a new project at https://supabase.com
   - Design your database schema (tables for users, workouts, plans, sessions, exercises, sets)
   - Copy your project URL and anon key

### Installation

1. Clone the repository
   ```bash
   cd C:\Dev
   git clone <your-repo-url> Lift321
   cd Lift321
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables

   Copy .env.example to .env and update with your Supabase credentials:
   ```bash
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Generate Supabase types (after creating database schema)
   ```bash
   npx supabase gen types typescript --project-id "your-project-id" > src/services/supabase/database.types.ts
   ```

5. Install iOS dependencies (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

Start Metro Bundler:
```bash
npm start
```

Run on iOS:
```bash
npm run ios
```

Run on Android:
```bash
npm run android
```

---

## Next Steps for Development

1. Set up Supabase backend
   - Create database schema
   - Generate TypeScript types
   - Configure Row Level Security (RLS) policies

2. Build shared components
   - Button (primary, secondary, danger variants)
   - Card (workout card, plan card)
   - Input (email, password, number)
   - Selector (exercise selector)

3. Implement authentication
   - Complete AuthContext methods (signIn, signUp, signOut)
   - Build Login and SignUp screens
   - Add session persistence checks

4. Build core features
   - Workout logging (create, edit, complete workouts)
   - Training plans (view, select, track progress)
   - Workout history (view past sessions, statistics)

5. Configure navigation
   - Create AppNavigator with auth flow
   - Implement protected routes
   - Add tab navigation for main features

---

## Documentation

- README.md - This file (project overview, setup, core patterns)
- APD/CLAUDE_DEV_STANDARDS.md - Comprehensive coding standards and patterns
- APD/CLAUDE_SESSION_HANDOFF.md - Current session state and architectural patterns
- APD/CLAUDE_PROJECT_NOTES.md - Version changelog and technical details
- APD/CLAUDE_ACTIVE.md - Working notes and overflow

For detailed coding standards, component structure patterns, and architectural guidelines, see APD/CLAUDE_DEV_STANDARDS.md.

---

## Important Notes

- This is a brand new Supabase project (not using Will's 3-2-1 Supabase)
- This is NOT a code migration - it's a fresh rebuild
- Will's 3-2-1 is used only as a reference for patterns and concepts
- Design token values are placeholders that will evolve with UI development
- Commit policy: Branch shown in VS Code bottom-left corner
- Never commit unless explicitly requested

---

## Troubleshooting

If you encounter issues:

1. Metro bundler issues: npm start -- --reset-cache
2. iOS build issues: cd ios && bundle exec pod install && cd ..
3. Android build issues: cd android && ./gradlew clean && cd ..
4. TypeScript errors: Check tsconfig.json and ensure all dependencies are installed

---

## Learn More

- React Native Documentation: https://reactnative.dev/docs/getting-started
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Supabase Documentation: https://supabase.com/docs
- React Navigation Documentation: https://reactnavigation.org/docs/getting-started

---

Built with lessons learned from Will's 3-2-1, architected for excellence from the start.
