# CLAUDE ACTIVE

## What This File Does

Code reference scratchpad for detailed examples, patterns, bug reproductions, and technical solutions. Unlike SESSION_HANDOFF and PROJECT_NOTES which summarize, this stores actual code snippets, commands, bug fixes, and implementation details. Quick reference library for copy-paste solutions. Pruned regularly to stay lean (<100 lines).

## Purpose

This file stores code-based references and technical details that are too verbose for other documentation:
- **Code snippets and patterns** (component templates, hook examples, service patterns)
- **Bug reproductions and fixes** (exact code that caused/solved issues)
- **Useful commands** (npm scripts, build commands, troubleshooting)
- **Technical solutions** (specific implementation details, workarounds)

**Documentation Flow**: SESSION_HANDOFF and PROJECT_NOTES should ONLY summarize patterns and decisions. Exact code examples, detailed bug fixes, and technical reference material belong HERE in CLAUDE_ACTIVE.md.

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
  title, onPress, variant = 'primary', disabled = false,
}) => (
  <Pressable
    style={[styles.button, styles[variant], disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: 8,
    alignItems: 'center',
  },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  danger: { backgroundColor: theme.colors.actionDanger },
  disabled: { opacity: 0.5 },
  text: { ...theme.textStyles.body, color: theme.colors.textPrimary },
});
```

---

**Last Updated**: 2025-11-11
