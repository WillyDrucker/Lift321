// ==========================================================================
// DESIGN TOKENS - Spacing
//
// 16px base rhythm for consistent spacing throughout the app.
// All spacing uses multiples/divisions of 16px for visual consistency.
//
// Philosophy: Global spacing rhythm prevents magic numbers
// Dependencies: None
// Used by: All components via theme object
// ==========================================================================

export const spacing = {
  // === BASE RHYTHM ===
  // 16px base system
  base: 16,

  // === STANDARD SPACING SCALE ===
  xs: 4, // 16 / 4 - Micro adjustments
  s: 8, // 16 / 2 - Tight spacing
  m: 16, // Base - Default element spacing
  l: 24, // 16 * 1.5 - Breathing room
  xl: 32, // 16 * 2 - Large gaps
  xxl: 48, // 16 * 3 - Major sections

  // === SPECIFIC CONTEXTS ===
  // Context-specific spacing for mobile UI patterns
  textLineGap: 7, // Text line spacing
  labelGap: 7, // Label to element spacing
  cardMargin: 10, // Card margins from viewport
  cardPadding: 16, // Internal card padding
  buttonPadding: 12, // Button internal padding
  inputPadding: 12, // Input field padding
} as const;

export type SpacingToken = keyof typeof spacing;
