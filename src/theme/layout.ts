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
  // Standard positioning for headers across different screen types
  header: {
    topSpacing: 64, // Distance from top of screen (auth screens) - matches safe zone
    appTopSpacing: 16, // Distance from top for in-app headers (main screens)
    horizontalPadding: 32, // Left/right padding for header content (matches safe zone horizontal)
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
  // Standard positioning for elements at bottom of screen
  bottom: {
    safeZone: 64, // Distance from bottom for interactive elements - matches safe zone standard
    buttonGroupPadding: 48, // Container padding that accounts for button margins (48dp + 16dp margin = 64dp visual)
  },

  // === ICON SIZES ===
  // Standard icon dimensions for consistent visual weight
  icon: {
    small: 16, // Small icons (inline, decorative)
    medium: 24, // Medium icons (navigation, actions)
    large: 32, // Large icons (primary actions, chevrons)
    xlarge: 40, // Extra large icons (logo, hero elements)
  },

  // === BOTTOM NAVIGATION BAR ===
  bottomNav: {
    height: 100, // Bottom navigation bar height (sized for device navigation buttons)
    iconSize: 24, // Navigation icon size
    iconTopSpacing: 6, // Icon position from top of bar
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

  // === TOP NAVIGATION BAR ===
  // Minimal top navigation for HomePage and main screens
  topNav: {
    topSpacing: 32, // Distance from screen top
    height: 32, // Navigation bar height
    paddingHorizontal: 10, // Left/right padding for icon spacing
    searchIconSize: 20, // Search icon size
    menuIconSize: 28, // Hamburger menu icon size
    borderWidth: 1, // Border for visibility during development
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

  // === BACKGROUND IMAGE SETTINGS ===
  // Standardized background image positioning and sizing
  backgroundImage: {
    topSpacing: 32, // Distance from top of screen for auth screen backgrounds
    widthPercentage: 80, // Percentage of screen width (10% padding on each side)
    heightPercentage: 70, // Percentage of available height
    opacity: 0.5, // Standard opacity for background images (50% for subtle effect)
  },
} as const;

export type LayoutToken = keyof typeof layout;
