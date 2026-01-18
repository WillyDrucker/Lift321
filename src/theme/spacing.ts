// ==========================================================================
// DESIGN TOKENS - Spacing
//
// 16dp base rhythm for consistent spacing throughout the app.
// All spacing uses multiples/divisions of 16dp for visual consistency.
//
// Philosophy: Global spacing rhythm prevents magic numbers
// Dependencies: None
// Used by: All components via theme object
// ==========================================================================

export const spacing = {
  // === BASE RHYTHM ===
  // 16dp base system for consistent spacing throughout app
  base: 16,

  // === STANDARD SPACING SCALE ===
  // T-shirt sizing system following 16dp base rhythm
  xxs: 2, // 0.125× base - Ultra-tight spacing, text line micro adjustments
  xs: 4, // 0.25× base - Micro adjustments, tight inline spacing
  s: 8, // 0.5× base - Tight spacing, compact elements
  m: 16, // 1× base - Default element spacing, standard gaps
  l: 24, // 1.5× base - Breathing room, comfortable spacing
  xl: 32, // 2× base - Large gaps, section separation
  xxl: 48, // 3× base - Major sections, significant visual breaks

  // === SAFE ZONE SPACING ===
  // Standard clearance from screen edges to avoid system UI
  safeZone: 64, // Standard safe distance from top/bottom edges (accounts for Android nav bar + margin)
  safeZoneHorizontal: 32, // Standard horizontal safe distance from left/right edges

  // === CONTEXT-SPECIFIC SPACING ===
  // Specific use-case spacing values
  textLineGap: 10, // Vertical spacing between text lines for readability
  textGroupSpacing: 32, // Spacing between text groups or paragraphs
  buttonSpacing: 16, // Vertical spacing between stacked buttons
  sectionSpacing: 48, // Spacing between major UI sections

  // === ELEMENT-SPECIFIC SPACING ===
  // Internal spacing for UI elements
  cardPadding: 16, // Internal padding for cards and containers
  buttonPaddingVertical: 12, // Vertical padding inside buttons
  buttonPaddingHorizontal: 24, // Horizontal padding inside buttons
  inputPadding: 16, // Internal padding for input fields
  inputMarginSmall: 5, // Small margin for form inputs (horizontal/vertical tight spacing)
  controlButtonGap: 8, // Gap between label and value in control buttons (REPS/WEIGHT)
} as const;

export type SpacingToken = keyof typeof spacing;
