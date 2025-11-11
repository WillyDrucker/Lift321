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

### Multi-Layer Shadow Pattern (Android Compatible)
```typescript
// Three-layer shadow system for Android compatibility
// Use this pattern instead of React Native shadowColor/shadowOpacity

// In your JSX:
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} />
  <View style={styles.shadowLayer2} />
  <View style={styles.shadowLayer1} />
  <Pressable style={styles.button}>
    <Text style={styles.buttonText}>Button Text</Text>
  </Pressable>
</View>

// In your StyleSheet:
const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'relative',
    marginBottom: theme.spacing.buttonSpacing,
  },
  shadowLayer1: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer1.top,
    left: theme.buttons.shadowLayers.layer1.left,
    right: theme.buttons.shadowLayers.layer1.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },
  shadowLayer2: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer2.top,
    left: theme.buttons.shadowLayers.layer2.left,
    right: theme.buttons.shadowLayers.layer2.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer2.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },
  shadowLayer3: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer3.top,
    left: theme.buttons.shadowLayers.layer3.left,
    right: theme.buttons.shadowLayers.layer3.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer3.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },
  button: {
    height: theme.buttons.height.medium,
    borderRadius: theme.buttons.borderRadius.medium,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
  },
});

// Shadow layer values (from theme.buttons.shadowLayers):
// layer1: { top: 1, left: 0, right: 0, opacity: 0.4 }  // Closest, darkest
// layer2: { top: 2, left: 0, right: 0, opacity: 0.25 } // Middle
// layer3: { top: 3, left: 0, right: 0, opacity: 0.15 } // Farthest, lightest
```

---

**Last Updated**: 2025-11-11
