// ==========================================================================
// DESIGN TOKENS - Spacing
//
// 16px base rhythm matching Will's 3-2-1 spacing system.
// All spacing uses multiples/divisions of 16px for consistency.
//
// Philosophy: Global spacing rhythm prevents magic numbers
// Dependencies: None
// Used by: All components via theme object
// ==========================================================================

export const spacing = {
  // === BASE RHYTHM ===
  // 16px system from Will's 3-2-1
  base: 16,

  // === STANDARD SPACING SCALE ===
  xs: 4, // 16 / 4 - Micro adjustments
  s: 8, // 16 / 2 - Tight spacing
  m: 16, // Base - Default element spacing
  l: 24, // 16 * 1.5 - Breathing room
  xl: 32, // 16 * 2 - Large gaps
  xxl: 48, // 16 * 3 - Major sections

  // === SPECIFIC CONTEXTS ===
  // From Will's 3-2-1 standards (adapted for mobile)
  textLineGap: 7, // Text line spacing
  labelGap: 7, // Label to element spacing
  cardMargin: 10, // Card margins from viewport
  cardPadding: 16, // Internal card padding
  buttonPadding: 12, // Button internal padding
  inputPadding: 12, // Input field padding
} as const;

export type SpacingToken = keyof typeof spacing;
