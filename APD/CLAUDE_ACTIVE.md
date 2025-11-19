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

## Custom Font with scaleX Transform Pattern

```typescript
// Custom font with horizontal scaling (20% wider)
// CRITICAL: Never use fontWeight with custom fonts - breaks font loading

bodyPartTitle: {
  fontSize: theme.typography.fontSize.xxxl, // 32dp
  fontFamily: theme.typography.fontFamily.workoutCard, // Zuume-ExtraBold
  color: theme.colors.actionSuccess,
  textTransform: 'uppercase',
  includeFontPadding: false, // Remove Android padding
  transform: [{scaleX: 1.2}], // 20% wider (1.2 = 120%)
  marginLeft: 6, // Compensate for scaleX left shift
  // NO fontWeight - font file contains weight
},
```

**Why this works:**
- `scaleX: 1.2` scales text horizontally to 120% width
- Transform scales from center, shifting left edge ~6dp leftward
- `marginLeft: 6` compensates to maintain original 16dp alignment
- `includeFontPadding: false` removes Android font metrics padding
- Omitting `fontWeight` prevents React Native from searching for non-existent bold variant

**Common mistake:** Adding `fontWeight: 'bold'` causes React Native to look for "Zuume-ExtraBold-Bold" font file, which doesn't exist, falling back to system font.

---

## Optical Centering with translateY

```typescript
// Use translateY for vertical positioning, NOT marginTop
// marginTop + scaleX causes sub-pixel rendering artifacts

workoutTitleText: {
  fontSize: theme.typography.fontSize.xxxl, // 32dp
  fontFamily: theme.typography.fontFamily.workoutCard, // Zuume-ExtraBold
  color: theme.colors.actionSuccess,
  textTransform: 'uppercase',
  includeFontPadding: false,
  transform: [{scaleX: 1.2}, {translateY: 1}], // Combined transforms
  marginLeft: 14, // 8dp padding + 6dp scaleX compensation
},
```

**Why translateY not marginTop:**
- Combining `marginTop` with `scaleX` causes sub-pixel rendering issues
- Individual letters can appear at different heights ("C" and "S" higher than "H", "E", "T")
- `translateY` in transform array avoids this artifact
- Both transforms in same array: `[{scaleX: 1.2}, {translateY: 1}]`

---

## Font Metrics Compensation

```typescript
// Fonts have intrinsic spacing (ascent/descent) that adds ~3dp
// Compensate by reducing margins to achieve visual target

currentPlanText: {
  fontSize: theme.typography.fontSize.xl, // 24dp
  lineHeight: theme.typography.fontSize.xl, // Match to eliminate line spacing
  fontFamily: theme.typography.fontFamily.primary, // Roboto
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.backgroundTertiary,
  textTransform: 'uppercase',
  textAlign: 'center',
  includeFontPadding: false, // Remove Android padding
  marginTop: 13, // 13dp + 3dp font metrics = 16dp visual
  marginBottom: 13, // 13dp + 3dp font metrics = 16dp visual
},
```

**Pattern:**
- Roboto font adds ~3dp intrinsic spacing (ascent/descent)
- Target: 16dp visual spacing
- Solution: 13dp margin (13 + 3 = 16)
- Always use: `lineHeight === fontSize` + `includeFontPadding: false`

---

## Dynamic Color-Coded Duration

```typescript
// Duration selector with session-based colors

<Text style={styles.durationLabel}>
  DURATION: <Text style={[
    styles.durationValue,
    selectedSession === 'standard' && {color: theme.colors.actionSuccess}, // Green
    selectedSession === 'express' && {color: '#77ff00'}, // Olive
    selectedSession === 'maintenance' && {color: '#ffff00'}, // Yellow
  ]}>
    {selectedSession === 'standard' && '31 MINUTES'}
    {selectedSession === 'express' && '25 MINUTES'}
    {selectedSession === 'maintenance' && '19 MINUTES'}
  </Text>
</Text>

// Styles
durationLabel: {
  fontSize: theme.typography.fontSize.m, // 16dp
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.textPrimary, // White
  textTransform: 'uppercase',
},

durationValue: {
  // Color applied dynamically via inline style array
  fontWeight: theme.typography.fontWeight.bold,
},
```

**Pattern:** Inline conditional styles for dynamic values that change based on state.

---

**Last Updated**: 2025-01-19
