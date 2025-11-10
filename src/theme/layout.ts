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
    topSpacing: 100, // Distance from top of screen (login screens)
    appTopSpacing: 16, // Distance from top for in-app headers (main screens)
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

  // === TOP BAR ===
  topBar: {
    height: 60, // Total height of top bar (using base spacing multiples)
    iconButtonSize: 44, // Touch target size for icon buttons (standard touch target)
    iconSize: 28, // Actual icon size within button
  },

  // === UI ELEMENTS ===
  bullet: {
    size: 6, // Bullet point diameter
    borderRadius: 3, // Half of size for circular shape
  },

  border: {
    thin: 1, // Thin borders (dividers, separators)
    medium: 2, // Medium borders (inputs, buttons)
  },

  // === SIDEBAR DRAWER ===
  sidebar: {
    widthPercentage: 70, // Sidebar width as percentage of screen
    animationDuration: 300, // Slide animation duration in ms
    itemPaddingVertical: 16, // Vertical padding for menu items
    itemPaddingHorizontal: 24, // Horizontal padding for menu items
  },
} as const;

export type LayoutToken = keyof typeof layout;
