// ==========================================================================
// DESIGN TOKENS - Buttons
//
// Button sizing, spacing, and layout tokens.
// Provides consistent button appearance across the app.
//
// Philosophy: Centralized button styles ensure UI consistency
// Dependencies: None
// Used by: Button components and Pressables
// ==========================================================================

export const buttons = {
  // === BUTTON SIZES ===
  height: {
    small: 40,
    medium: 50,
    large: 60,
  },

  // === BUTTON SPACING ===
  paddingHorizontal: {
    small: 16,
    medium: 24,
    large: 32,
  },

  paddingVertical: {
    small: 8,
    medium: 12,
    large: 16,
  },

  // === BUTTON RADII ===
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    pill: 999, // Fully rounded ends
  },

  // === BUTTON SPACING BETWEEN ===
  marginBottom: {
    tight: 8,
    default: 16,
    loose: 24,
  },
} as const;

export type ButtonToken = keyof typeof buttons;
