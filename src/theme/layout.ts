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

  // === BOTTOM NAVIGATION BAR ===
  bottomNav: {
    height: 70, // Bottom navigation bar height
    iconSize: 24, // Navigation icon size
    paddingVertical: 10, // Top/bottom padding inside nav bar
    paddingHorizontal: 16, // Left/right padding inside nav bar
  },

  // === DAY SELECTOR TABS ===
  dayTabs: {
    height: 45, // Individual day tab height
    spacing: 8, // Space between day tabs
    paddingHorizontal: 16, // Left/right padding for tab container
    buttonMinWidth: 45, // Minimum width for each day button
    marginBottom: 16, // Space below day tabs container
  },

  // === WORKOUT CARD ===
  workoutCard: {
    padding: 20, // Inner padding of workout card
    marginHorizontal: 16, // Left/right margin of card
    marginBottom: 16, // Space below card
    borderRadius: 12, // Corner radius for card
    exerciseSpacing: 12, // Space between exercise items
  },
} as const;

export type LayoutToken = keyof typeof layout;
