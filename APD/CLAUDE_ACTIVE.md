# CLAUDE ACTIVE

## Purpose
Code reference scratchpad for patterns, commands, and solutions. Quick reference library for copy-paste. Pruned regularly (<100 lines). For session state see SESSION_HANDOFF, for history see PROJECT_NOTES.

---

## Commands

```bash
# React Native
npm start                    # Start Metro
npm run android              # Run Android
npm start -- --reset-cache   # Reset cache (after adding assets)

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
```

---

## Code Patterns

### Multi-Layer Shadow (Android)
```typescript
// Three-layer shadow for Android compatibility
<View style={styles.buttonWrapper}>
  <View style={styles.shadowLayer3} />
  <View style={styles.shadowLayer2} />
  <View style={styles.shadowLayer1} />
  <Pressable style={styles.button}>...</Pressable>
</View>

// Shadow values: layer1 top:1 opacity:0.4, layer2 top:2 opacity:0.25, layer3 top:3 opacity:0.15
```

### Custom Font with scaleX
```typescript
bodyPartTitle: {
  fontSize: 36,
  fontFamily: theme.typography.fontFamily.workoutCard, // Zuume-ExtraBold
  color: theme.colors.actionSuccess,
  textTransform: 'uppercase',
  includeFontPadding: false,
  transform: [{scaleX: 1.2}, {translateY: 2}], // 20% wider + optical centering
  marginLeft: 11, // Compensate for scaleX left shift
  // NO fontWeight - breaks custom fonts!
}
```

### Font Metrics Compensation
```typescript
// Fonts add ~3dp intrinsic spacing. Target 16dp visual = 13dp margin.
currentPlanText: {
  fontSize: 24,
  lineHeight: 24, // Match fontSize to eliminate line spacing
  includeFontPadding: false,
  marginTop: 13, // 13dp + 3dp font metrics = 16dp visual
}
```

### v1.1.10 Theme Token Additions
```typescript
// New tokens added to colors.ts
controlSuccessBackground: 'rgba(0, 255, 0, 0.1)',  // Active control states
controlWarningBackground: 'rgba(255, 170, 0, 0.1)', // Warning states
achievementGold: '#FFD700',                         // Achievements
customWorkoutBlue: '#0099FF',                       // Custom/Work-As-You-Go
customWorkoutYellow: '#FFFF00',                     // SuperSet
customWorkoutCyan: '#00FFEE',                       // Partner Mode
```

---

## File Header Template
```typescript
// ==========================================================================
// COMPONENT NAME
// Brief description of purpose and role.
// Dependencies: List key imports
// Used by: Where this is used
// ==========================================================================
```

---

**Last Updated**: 2025-12-02
