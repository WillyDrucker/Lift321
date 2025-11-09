# Lift 3-2-1

A modern fitness tracking app built with React Native + TypeScript, designed from the ground up with exceptional architecture and development practices.

**Status**: Foundation Complete - Ready for Feature Development

## What is Lift 3-2-1?

Lift 3-2-1 is a brand new React Native application built on lessons learned from the original Will's 3-2-1 vanilla JavaScript web app. This is NOT a migration or conversion - it's a complete rebuild using modern best practices for mobile development.

## Philosophy

- **SUPER STUPID SIMPLE (SSS)**: User experience must be effortless and guided
- **REMOVE, DON'T ADD**: When faced with complexity, simplify or remove
- **Mobile-first design**: Touch-optimized, immediate UI responses
- **Global from the start**: Design tokens, semantic naming, strict TypeScript

## Technology Stack

- **React Native 0.82.1**: Native iOS/Android apps
- **TypeScript (Strict Mode)**: Type-safe development with full strictness enabled
- **Supabase**: Backend-as-a-service (brand new project)
- **React Navigation**: Type-safe navigation
- **Context API + Hooks**: State management
- **StyleSheet + Design Tokens**: Global theme system (no magic numbers)

## Project Structure

```
Lift321/
├── src/
│   ├── features/              # Feature-based architecture
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
│   ├── components/            # Shared components (global use)
│   ├── theme/                 # Design token system (GLOBAL)
│   │   ├── colors.ts          # Semantic color palette
│   │   ├── spacing.ts         # 16px base rhythm
│   │   ├── typography.ts      # Font styles
│   │   └── tokens.ts          # Main theme export
│   │
│   ├── navigation/            # React Navigation setup
│   │   ├── types.ts           # Type-safe route definitions
│   │   └── AppNavigator.tsx   # Main navigator
│   │
│   ├── contexts/              # Global contexts
│   ├── services/              # Global services
│   │   └── supabase/          # Supabase client + types
│   ├── hooks/                 # Shared custom hooks
│   ├── types/                 # Global TypeScript types
│   ├── utils/                 # Utility functions
│   └── assets/                # Images, fonts, etc.
│
├── APD/                       # Architecture & Planning Docs
│   └── CLAUDE_DEV_STANDARDS.md  # Comprehensive coding standards
│
├── .env                       # Environment variables (Supabase config)
├── tsconfig.json              # TypeScript configuration
└── babel.config.js            # Babel configuration (absolute imports)
```

## What's Complete ✅

### Foundation & Architecture
- ✅ React Native 0.82.1 initialized with TypeScript
- ✅ All dependencies installed (891 packages, 0 vulnerabilities)
- ✅ TypeScript strict mode configured
- ✅ Absolute imports configured (`@/`, `@components/`, `@features/`, etc.)
- ✅ Complete folder structure (feature-based architecture)

### Design Token System (GLOBAL FROM START)
- ✅ `theme/colors.ts` - Semantic color palette (`actionSuccess`, not `greenButton`)
- ✅ `theme/spacing.ts` - 16px base rhythm system
- ✅ `theme/typography.ts` - Font sizes, weights, pre-built text styles
- ✅ `theme/tokens.ts` - Main theme export

### Supabase Integration
- ✅ Supabase client configured (`services/supabase/client.ts`)
- ✅ AsyncStorage persistence for sessions
- ✅ Database types placeholder (`database.types.ts`)

### Navigation
- ✅ Type-safe route definitions (`navigation/types.ts`)
- ✅ Global navigation types configured

### Context Architecture
- ✅ AuthContext template with proper pattern (Context + custom hook + memoization)

### Documentation
- ✅ **CLAUDE_DEV_STANDARDS.md** - Comprehensive coding standards
- ✅ **README.md** - This file

## What's NOT Complete (Intentionally) ⏳

This is a **foundation/scaffolding project**. The following are intentionally NOT implemented:

### UI & Components
- ⏳ Shared components (Button, Card, Input, Selector)
- ⏳ Screen implementations (Login, WorkoutList, etc.)
- ⏳ App layout and navigation flow

### Business Logic
- ⏳ AuthContext implementation (signIn, signUp, signOut)
- ⏳ Workout context and state management
- ⏳ Plans context and state management
- ⏳ Service layer implementations

### Backend
- ⏳ Supabase project setup (database schema, tables, RLS policies)
- ⏳ Generated database types
- ⏳ Authentication configuration

## Getting Started

### Prerequisites

1. **React Native Environment Setup**
   - Follow the [React Native Environment Setup guide](https://reactnative.dev/docs/set-up-your-environment)
   - Install Xcode (macOS) or Android Studio
   - Install CocoaPods (iOS development)

2. **Supabase Project Setup**
   - Create a new project at https://supabase.com
   - Design your database schema (tables for users, workouts, plans, sessions, exercises, sets)
   - Copy your project URL and anon key

### Installation

1. **Clone the repository**
   ```bash
   cd C:\Dev
   git clone <your-repo-url> Lift321
   cd Lift321
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Update `.env` with your Supabase credentials:
   ```bash
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Generate Supabase types** (after creating database schema)
   ```bash
   npx supabase gen types typescript --project-id "your-project-id" > src/services/supabase/database.types.ts
   ```

5. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

### Running the App

#### Start Metro Bundler
```bash
npm start
```

#### Run on iOS
```bash
npm run ios
```

#### Run on Android
```bash
npm run android
```

## Key Development Patterns

### 1. Design Tokens - ALWAYS

```typescript
// ✅ GOOD - Using design tokens
import { theme } from '@theme';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,  // 16px from global token
    backgroundColor: theme.colors.backgroundCard,
  },
  title: {
    ...theme.textStyles.h1,
    color: theme.colors.textPrimary,
  },
});

// ❌ BAD - Magic numbers and hard-coded colors
const styles = StyleSheet.create({
  container: {
    padding: 16,  // What is this? Why 16?
    backgroundColor: '#333333',  // Literal color
  },
});
```

### 2. Context + Custom Hook Pattern

```typescript
// Never use useContext directly - always through custom hook
import { useAuth } from '@features/auth/context/AuthContext';

const MyComponent = () => {
  const { user, signIn } = useAuth();  // ✅ Type-safe, auto-complete
  // ...
};
```

### 3. Service Layer Separation

```typescript
// Never query Supabase directly from components
// ❌ BAD - Direct query in component
const MyComponent = () => {
  const { data } = await supabase.from('workouts').select();
};

// ✅ GOOD - Use service layer
// features/workouts/services/workoutService.ts
export const workoutService = {
  async getWorkouts(): Promise<Workout[]> {
    const { data, error } = await supabase.from('workouts').select();
    if (error) throw error;
    return data;
  },
};

// features/workouts/context/WorkoutContext.tsx
const fetchWorkouts = useCallback(async () => {
  const workouts = await workoutService.getWorkouts();
  setWorkouts(workouts);
}, []);
```

### 4. Absolute Imports

```typescript
// ✅ GOOD - Absolute imports
import { Button } from '@components/Button';
import { theme } from '@theme';
import { useAuth } from '@features/auth/context/AuthContext';

// ❌ BAD - Relative imports
import { Button } from '../../../components/Button';
import { theme } from '../../theme';
```

### 5. TypeScript Strict Mode

```typescript
// ✅ GOOD - Explicit types
type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => { };

// ❌ BAD - Implicit any
const Button = (props) => { };  // props is 'any'
```

## File Header Format

All files should use this header format:

```typescript
// ==========================================================================
// COMPONENT/FILE NAME
//
// Brief description of purpose and role.
// Additional context about architecture or patterns.
//
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================

import React from 'react';
// ... imports

// === TYPES ===
type Props = { };

// === COMPONENT ===
export const MyComponent: React.FC<Props> = () => {
  // === STATE ===

  // === HOOKS ===

  // === EVENT HANDLERS ===

  // === RENDER ===
  return ( );
};

// === STYLES ===
const styles = StyleSheet.create({ });
```

## Next Steps for Development

1. **Set up Supabase backend**
   - Create database schema
   - Generate TypeScript types
   - Configure Row Level Security (RLS) policies

2. **Build shared components**
   - Button (primary, secondary, danger variants)
   - Card (workout card, plan card)
   - Input (email, password, number)
   - Selector (exercise selector matching Will's 3-2-1 pattern)

3. **Implement authentication**
   - Complete AuthContext methods (signIn, signUp, signOut)
   - Build Login and SignUp screens
   - Add session persistence checks

4. **Build core features**
   - Workout logging (create, edit, complete workouts)
   - Training plans (view, select, track progress)
   - Workout history (view past sessions, statistics)

5. **Configure navigation**
   - Create AppNavigator with auth flow
   - Implement protected routes
   - Add tab navigation for main features

## Documentation

- **CLAUDE_DEV_STANDARDS.md** - Comprehensive coding standards and patterns
- **README.md** - This file (project overview and setup)

For detailed coding standards, component structure patterns, and architectural guidelines, see `APD/CLAUDE_DEV_STANDARDS.md`.

## Important Notes

- This is a **brand new Supabase project** (not using Will's 3-2-1 Supabase)
- This is **NOT a code migration** - it's a fresh rebuild
- Will's 3-2-1 is used only as a reference for patterns and concepts
- Commit policy: Branch shown in VS Code bottom-left corner
- Never commit unless explicitly requested

## Troubleshooting

If you encounter issues:

1. **Metro bundler issues**: `npm start -- --reset-cache`
2. **iOS build issues**: `cd ios && bundle exec pod install && cd ..`
3. **Android build issues**: `cd android && ./gradlew clean && cd ..`
4. **TypeScript errors**: Check `tsconfig.json` and ensure all dependencies are installed

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)

---

Built with lessons learned from Will's 3-2-1, architected for excellence from the start.
