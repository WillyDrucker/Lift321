# CLAUDE ACTIVE

## Purpose

This file contains temporary working notes, session overflow, and ideas that don't belong in other documentation files. Content here is transient and may be cleaned up, moved, or deleted as sessions progress.

**Documentation Flow**: Use this file for overflow content that's too detailed for CLAUDE_PROJECT_NOTES.md or for temporary session-specific notes that don't need to be preserved long-term.

---

## Current Session Notes (v1.0.0 - 2025-11-09)

### Session Status
- Foundation complete
- All APD documentation restructured to match Will's 3-2-1 pattern
- Git repository clean on Claude-v1.0.0

### User Clarification Received
**Design Token Values**: User clarified we're NOT recreating Will's 3-2-1 specific design values. The token **system** (architecture) is what we're establishing. Current values are placeholders to be discovered during UI development.

---

## Ideas & Considerations

### UI/UX Inspiration
- Modern fitness apps (to be explored)
- Touch-optimized interactions
- Mobile-first patterns

### Design Token Evolution Strategy
1. Start with placeholders (current state)
2. Build first component (Button)
3. Refine tokens based on what feels right
4. Iterate as patterns emerge

---

## Open Questions

### Supabase Schema
- What tables needed? (users, workouts, plans, sessions, exercises, sets)
- What relationships?
- What indexes for performance?
- What RLS policies?

### Component Library Priority
- Build complete library first OR build as needed?
- Highest priority components: Button, Input (auth), Card (lists)

### Navigation Flow
- Auth stack vs Main stack structure?
- Tab or stack navigation for main features?

---

## Technical Debt & TODOs

### Immediate
- None - foundation complete

### Short-term
- Create Button component
- Create Card component
- Create Input component
- Set up Supabase project (user task)

### Medium-term
- Implement AuthContext methods
- Create Login/SignUp screens
- Create AppNavigator
- Create AppProvider

### Long-term
- Build workout logging
- Build training plans
- Build history
- Add offline support
- Add data export

---

## Useful Commands

### React Native
```bash
npm start                    # Start Metro
npm run ios                  # Run iOS
npm run android              # Run Android
npm start -- --reset-cache   # Reset cache
```

### iOS
```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

### Supabase
```bash
npx supabase gen types typescript --project-id "your-id" > src/services/supabase/database.types.ts
```

---

## Code Snippets

### Button Component Template
```typescript
// ==========================================================================
// BUTTON COMPONENT
//
// Reusable button with variants and states.
//
// Dependencies: theme tokens
// Used by: All screens
// ==========================================================================

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '@theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) => {
  return (
    <Pressable
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: 8,
    alignItems: 'center',
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

## Background Processes (Completed)

All background bash processes completed successfully:
- ✅ React Native init (exit 0)
- ✅ npm install base (835 packages, exit 0)
- ✅ npm install additional (55 packages, exit 0)
- ✅ Total: 891 packages, 0 vulnerabilities

---

## Session Summary

### What Went Well
- Clean React Native initialization
- TypeScript and Babel config worked first try
- Design token system is extensible
- Documentation is comprehensive and follows Will's 3-2-1 pattern

### Challenges
- Initial template flag issue (resolved)
- User clarification needed on design token values vs architecture

### Key Decisions
1. Feature-based folder structure
2. Design token values are placeholders
3. Strict TypeScript enforcement
4. Service layer required
5. Context + custom hook required

---

**Last Updated**: 2025-11-09
**Session**: Foundation & Documentation Complete
