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
    // Primary font - Roboto for UI text (Android default)
    primary: 'Roboto',
    // System fallback
    system: 'System',
  },

  // === FONT SIZES ===
  fontSize: {
    xs: 12,
    s: 14,
    m: 16, // Base size
    l: 20,
    xl: 32, // 2rem
    xxl: 64, // 4rem - Large display text
  },

  // === FONT WEIGHTS ===
  fontWeight: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semibold: '600' as TextStyle['fontWeight'],
    bold: '700' as TextStyle['fontWeight'],
  },

  // === LINE HEIGHTS ===
  // Calculated from font size + textLineGap (7px from spacing)
  lineHeight: {
    xs: 19, // 12 + 7
    s: 21, // 14 + 7
    m: 23, // 16 + 7
    l: 25, // 18 + 7
    xl: 31, // 24 + 7
    xxl: 39, // 32 + 7
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
