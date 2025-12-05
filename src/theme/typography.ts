// ==========================================================================
// DESIGN TOKENS - Typography
//
// Font styles for consistent text rendering across the app.
// Includes font families, sizes, weights, line heights, and pre-built styles.
//
// Philosophy: Type-safe text styles prevent inconsistency
// Dependencies: React Native TextStyle type
// Used by: All text components via theme object
// ==========================================================================

import type {TextStyle} from 'react-native';

export const typography = {
  // === FONT FAMILIES ===
  fontFamily: {
    // Brand font - Bebas Neue for headlines and brand elements
    brand: 'BebasNeue-Regular',
    // Workout title font - Roboto for WorkoutOverviewScreen title card
    workoutTitle: 'Roboto',
    // Workout card font - Zuume ExtraBold for large bold workout headings
    workoutCard: 'Zuume-ExtraBold',
    // Primary font - Roboto for UI text (Android default)
    primary: 'Roboto',
    // System fallback
    system: 'System',
  },

  // === FONT SIZES ===
  // Based on 16dp baseline following rem-like scaling
  fontSize: {
    xxs: 10, // 0.625× base - Extra small labels, tiny meta text
    xs: 12, // 0.75× base - Small labels, captions, meta text
    s: 14, // 0.875× base - Secondary text, helper text
    m: 16, // 1× base - Body text, standard UI text
    l: 20, // 1.25× base - Button text, emphasized labels
    xl: 24, // 1.5× base - Small headlines, section titles
    xxl: 28, // 1.75× base - Medium headlines, sub-headers
    xxxl: 32, // 2× base - Large headlines, page titles
    display: 48, // 3× base - Hero text, main branding
    mega: 64, // 4× base - Extra large display text
  },

  // === FONT WEIGHTS ===
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },

  // === LINE HEIGHTS ===
  // Calculated from font size + textLineGap (7dp from spacing)
  lineHeight: {
    xs: 19, // 12 + 7
    s: 21, // 14 + 7
    m: 23, // 16 + 7
    l: 25, // 18 + 7
    xl: 31, // 24 + 7
    xxl: 39, // 32 + 7
  },

  // === LETTER SPACING ===
  letterSpacing: {
    tight: 0, // No extra spacing
    button: 0.5, // Subtle spacing for button text
    normal: 1, // Standard spacing for body text
    wide: 2, // Wider spacing for emphasis
    extraWide: 3, // Extra wide spacing for large display text
  },
} as const;

// === PRE-BUILT TEXT STYLES ===
// Commonly used text style combinations
export const textStyles: Record<string, TextStyle> = {
  // Headers
  h1: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.xxl,
  },
  h2: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.xl,
  },
  h3: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.l,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.l,
  },

  // Body text
  body: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.m,
  },
  bodyBold: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.m,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.m,
  },

  // Small text
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.s,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.s,
  },
  captionBold: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.s,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.s,
  },

  // Buttons
  button: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.m,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.m,
  },
};

export type TypographyToken = keyof typeof typography;
