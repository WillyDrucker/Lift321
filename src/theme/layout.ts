// ==========================================================================
// DESIGN TOKENS - Layout
//
// Common layout constants for consistent positioning across the app.
// Provides standard measurements for headers, logos, and spacing.
//
// Philosophy: Centralized layout values ensure visual consistency
// Dependencies: None
// Used by: Screen components and layout containers
// ==========================================================================

export const layout = {
  // === HEADER LAYOUT ===
  header: {
    topSpacing: 100, // Distance from top of screen
    indent: 32, // Left/right padding (same as theme.spacing.xl)
  },

  // === LOGO DIMENSIONS ===
  logo: {
    size: 40, // Width and height
    borderRadius: 20, // Half of size for circular shape
  },

  // === FORM LAYOUT ===
  form: {
    inputHeight: 50, // Standard input field height
    inputBorderWidth: 2, // Standard input border width
    inputBorderRadius: 8, // Standard input corner radius
    inputHorizontalMargin: 5, // Left/right margin for inputs
    buttonHorizontalMargin: 32, // Left/right margin for buttons
    dividerSpacing: 32, // Spacing around dividers
    dividerThickness: 1, // Divider line thickness
  },

  // === BOTTOM SPACING ===
  bottom: {
    buttonSpacing: 100, // Distance from bottom for button containers
  },
} as const;

export type LayoutToken = keyof typeof layout;
