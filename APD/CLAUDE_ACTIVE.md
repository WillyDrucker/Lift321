# CLAUDE ACTIVE - Lift 3-2-1

## Working Notes & Session Overflow

This file captures session-specific notes, ideas, TODOs, and overflow content that doesn't fit in other documentation files.

---

## Current Session (2025-11-09)

**Status**: Foundation Complete - Documentation Phase Complete
**Branch**: Claude-v5.6.9
**Next**: Git initialization and initial commit

### Session Achievements
- ✅ React Native 0.82.1 initialized
- ✅ All dependencies installed (891 packages)
- ✅ Complete folder structure created
- ✅ Design token system established
- ✅ All configuration files created
- ✅ Complete documentation suite created

### Key User Clarification Received
**Design Token Values**: User clarified that we're NOT recreating Will's 3-2-1 specific design values (colors, spacing, typography). The token **system** is in place as architecture, but the actual **values** are placeholders to be discovered during UI development.

This is important - don't reference "preserving from Will's 3-2-1" when discussing specific token values. The pattern/architecture is what we're preserving, not the values.

---

## Ideas & Considerations

### UI/UX Inspiration Sources
- Modern fitness apps (to be explored)
- Current design trends
- Mobile-first best practices
- Touch-optimized interactions

### Design Token Evolution Strategy
1. Start with placeholder values (current state)
2. Build first component (Button)
3. Refine spacing tokens based on what feels right
4. Build second component (Card)
5. Refine color tokens based on visual hierarchy
6. Iterate and standardize as patterns emerge

### Feature Priority (To Be Discussed)
- Authentication (login/signup) - foundational
- Workout logging - core feature
- Training plans - program structure
- History - progress tracking

---

## Open Questions

### Supabase Schema Design
- [ ] What tables are needed?
  - users (handled by Supabase Auth?)
  - workouts
  - plans
  - sessions (workout instances)
  - exercises
  - sets
- [ ] What relationships exist?
- [ ] What indexes are needed for performance?
- [ ] What RLS policies for security?

### UI Component Library
- [ ] Should we create a complete component library first, or build components as needed?
- [ ] What shared components are highest priority?
  - Button (likely first)
  - Input (needed for auth)
  - Card (needed for lists)
  - Selector (complex, can wait?)

### Navigation Flow
- [ ] Auth stack vs Main stack - how to structure?
- [ ] Tab navigation or stack navigation for main features?
- [ ] How to handle deep linking (if needed)?

---

## Technical Debt & TODOs

### Immediate
- [ ] Initialize Git repository
- [ ] Create initial commit on Claude-v5.6.9 branch
- [ ] Verify all background bash processes completed successfully

### Short-term
- [ ] Create Button component (first shared component)
- [ ] Create Card component
- [ ] Create Input component
- [ ] Set up Supabase project (user task)
- [ ] Generate database types after schema created

### Medium-term
- [ ] Implement AuthContext methods (signIn, signUp, signOut)
- [ ] Create Login screen
- [ ] Create SignUp screen
- [ ] Create AppNavigator with auth flow
- [ ] Create AppProvider combining all contexts

### Long-term
- [ ] Build workout logging feature
- [ ] Build training plans feature
- [ ] Build history feature
- [ ] Add offline support
- [ ] Add data export functionality

---

## Code Snippets & Patterns

### Creating a New Shared Component Template

```typescript
// ==========================================================================
// BUTTON COMPONENT
//
// Reusable button with primary, secondary, and danger variants.
// Supports disabled state and loading indicators.
//
// Dependencies: theme tokens
// Used by: All screens requiring action buttons
// ==========================================================================

import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '@theme';

// === TYPES ===

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

// === COMPONENT ===

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
}) => {
  // === EVENT HANDLERS ===
  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  // === RENDER ===
  return (
    <Pressable
      style={[
        styles.button,
        styles[variant],
        (disabled || loading) && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.textPrimary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.m,    // Use tokens
    paddingHorizontal: theme.spacing.l,   // Use tokens
    borderRadius: 8,                      // Placeholder - refine later
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.actionDanger,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
  },
});
```

---

## Session Notes

### 2025-11-09: Foundation Complete

**What Went Well**:
- Smooth React Native initialization after resolving deprecated command
- TypeScript and Babel configuration worked first try
- Design token system architecture is clean and extensible
- Documentation is comprehensive

**Challenges**:
- Initial confusion about template flag (resolved: TypeScript is default)
- User clarification needed on design token values vs architecture
- Multiple background bash processes still running (need to verify completion)

**Key Decisions**:
1. Feature-based folder structure (not file-type based)
2. Design token values are placeholders (will evolve with UI)
3. Strict TypeScript enforcement
4. Service layer pattern required
5. Context + custom hook pattern required

---

## Useful Commands Reference

### React Native Development
```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Reset Metro cache
npm start -- --reset-cache
```

### iOS Development
```bash
# Install CocoaPods dependencies
cd ios
bundle install
bundle exec pod install
cd ..

# Clean iOS build
cd ios
xcodebuild clean
cd ..
```

### Android Development
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
```

### Supabase Type Generation
```bash
# Generate TypeScript types from Supabase schema
npx supabase gen types typescript --project-id "your-project-id" > src/services/supabase/database.types.ts
```

### Git Commands
```bash
# Initialize repository
git init

# Create branch
git checkout -b Claude-v1.0.0

# Stage all files
git add .

# Commit
git commit -m "Initial commit: Lift 3-2-1 foundation"

# Check status
git status
```

---

## Background Processes Status

Current background bash processes running:
- 31af99: React Native init with template flag (likely failed/completed)
- d0d02f: React Native init without template flag (should be completed)
- 84bd87: npm install base packages (should be completed)
- 243b4a: npm install additional packages (should be completed)

**TODO**: Verify all processes completed successfully before Git commit.

---

## Next Session Prep

When resuming development:
1. Read CLAUDE_SESSION_HANDOFF.md for current state
2. Read CLAUDE_PROJECT_NOTES.md for technical context
3. Check CLAUDE_DEV_STANDARDS.md for coding patterns
4. Review this file (CLAUDE_ACTIVE.md) for open questions and TODOs

**Recommended Next Steps**:
1. Verify Git initialization completed successfully
2. Create first shared component (Button)
3. Set up Supabase project (user task)
4. Implement AuthContext methods

---

**Last Updated**: 2025-11-09
**Session**: Foundation & Documentation Complete
