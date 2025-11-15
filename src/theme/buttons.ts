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

  // === BUTTON SHADOW LAYERS ===
  // Three-layer shadow system for depth (pure black with fade)
  // Usage: Apply as position: absolute behind button
  shadowLayers: {
    layer1: {
      top: 1,
      left: 0,
      right: 0,
      opacity: 0.4, // Strong black base
    },
    layer2: {
      top: 2,
      left: 0,
      right: 0,
      opacity: 0.25, // Medium fade
    },
    layer3: {
      top: 3,
      left: 0,
      right: 0,
      opacity: 0.15, // Light fade
    },
  },

  // === BUTTON STATES ===
  // Opacity values for interactive states
  opacity: {
    pressed: 0.8, // Opacity when button is pressed
    disabled: 0.5, // Opacity when button is disabled
  },
} as const;

export type ButtonToken = keyof typeof buttons;
