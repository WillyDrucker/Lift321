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
    appTopSpacing: 32, // Distance from top for in-app headers (main screens)
    horizontalPadding: 32, // Left/right padding for header content (matches safe zone horizontal)
    backButtonLeft: 16, // Left position of back button in default screen layout
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
    passwordInputPaddingRight: 50, // Right padding for password input (space for eye icon)
    eyeIconButtonRight: 21, // Position of eye icon from right edge (16dp padding + 5dp margin)
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

  // === AUTH SCREEN NAVIGATION ===
  // Standard layout for auth screen navigation (back/next buttons)
  authNavigation: {
    backButtonLeft: 24, // Left position of back button (plus 8dp padding = 32dp visual)
    nextButtonLeft: 96, // Left position of next button (32dp left + 32dp icon + 32dp gap)
    textContainerBottom: 146, // Bottom position of text above button (64dp safe + 50dp button + 32dp gap)
  },

  // === SOCIAL LOGIN BUTTONS ===
  // Font sizes for social login provider logos
  socialLogin: {
    googleLogoFontSize: 20, // Google 'G' logo size
    facebookLogoFontSize: 24, // Facebook 'f' logo size
  },

  // === BOTTOM NAVIGATION BAR ===
  bottomNav: {
    height: 68, // Bottom navigation bar height (base height for gesture nav)
    iconSize: 24, // Navigation icon size
    iconTopSpacing: 6, // Icon position from top of bar
    paddingHorizontal: 16, // Left/right padding inside nav bar
    paddingBottom: 8, // Bottom padding for spacing above system nav area
    // Dynamic height calculation thresholds
    gestureNavThreshold: 30, // Bottom inset threshold to detect gesture vs button nav (pixels)
    buttonNavExtraHeight: 32, // Extra height added for button navigation mode (pixels)
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
    animation: {
      entranceDuration: 500, // Card entrance animation duration (ms)
      entranceStaggerDelay: 100, // Delay between each card animation (ms)
      entranceDistance: 30, // Slide-up distance for entrance (px)
      pressScaleMin: 0.98, // Scale when card is pressed
      buttonPressScaleMin: 0.95, // Scale when BEGIN button is pressed
      pressSpringFriction: 3, // Spring friction for press animations (lower = more bounce)
      // Scroll-based animations
      scrollScaleMin: 0.90, // Minimum scale when card is at edges during scroll (10% reduction for clear visibility)
      scrollScaleMax: 1.02, // Maximum scale when card is centered during scroll (slight emphasis on center)
      scrollOpacityMin: 0.75, // Minimum opacity when card is at edges during scroll (softer fade, more premium)
      scrollOpacityMax: 1.0, // Maximum opacity when card is centered during scroll
      parallaxDistance: 40, // Horizontal parallax translation distance for images (12% of card width for depth)
    },
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
    topSpacing: 32, // Distance from screen top (stays below status bar)
    height: 32, // Navigation bar height (minimalist for maximum scrollable space)
    paddingHorizontal: 16, // Left/right padding for icon spacing
    searchIconSize: 20, // Search icon size (minimalist)
    menuIconSize: 28, // Hamburger menu icon size (minimalist)
    backIconSize: 28, // Back button icon size (minimalist, globally consistent)
    borderWidth: 0, // No border
  },

  // === WEEK CALENDAR BAR ===
  // Week view calendar for day selection
  weekCalendar: {
    height: 32, // Calendar bar height
    topPosition: 64, // Position below top nav (32dp spacing + 32dp nav height)
  },

  // === PLAN PROGRESS BAR ===
  // Progress tracking for active workout plan
  planProgress: {
    height: 24, // Progress bar height
    topPosition: 96, // Position below calendar bar (64dp + 32dp calendar height)
  },

  // === ANIMATION SETTINGS ===
  // Gesture and animation configuration for interactive elements
  animation: {
    gestureMovementThreshold: 5, // Minimum dx/dy to register as swipe (not tap)
    swipeDismissThreshold: 100, // Distance required to trigger dismiss action
    swipeAnimationDistance: 400, // Full animation travel distance for dismissal
    duration: 200, // Standard animation duration in milliseconds
    quickFadeDuration: 150, // Quick fade transition for navigation (in milliseconds)
    tripleTapTimeout: 500, // Time window for triple-tap detection in milliseconds
  },

  // === WELCOME BOX ===
  // Swipeable welcome message box for new sessions
  welcomeBox: {
    topPosition: 128, // Position below plan progress bar (96dp + 24dp + 8dp spacing)
    leftMargin: 8, // Left margin from screen edge
    rightMargin: 0, // Right margin (flush to edge for swipe affordance)
    borderRadius: 8, // Corner radius for left side only
    paddingLeft: 16, // Left inner padding
    paddingRight: 16, // Right inner padding
    paddingTop: 14, // Top padding (swipe indicator + spacing)
    paddingBottom: 6, // Bottom padding
    swipeIndicatorWidth: 24, // Swipe indicator bar width
    swipeIndicatorHeight: 4, // Swipe indicator bar height
    swipeIndicatorBorderRadius: 2, // Swipe indicator corner radius
    swipeIndicatorOpacity: 0.5, // Swipe indicator transparency
  },

  // === RECOMMENDED WORKOUT BOX ===
  // Daily recommended workout card with animated positioning
  recommendedWorkout: {
    topPositionWithWelcome: 222, // Position when welcome box visible (128dp + 86dp welcome + 8dp spacing)
    topPositionWithoutWelcome: 128, // Position when welcome dismissed (same as welcome position + 8dp spacing)
    leftMargin: 8, // Left margin from screen edge (first card)
    rightMargin: 0, // Right margin from screen edge (last card's marginRight provides 8dp spacing)
    peekAmount: 8, // Amount of next/prev card visible (partial card visibility pattern)
    height: 240, // Fixed card height (reduced from 256dp)
    borderRadius: 8, // Corner radius
    paddingLeft: 16, // Left inner padding
    paddingTop: 16, // Top inner padding
    cardWidth: 330, // Individual card width (360dp - 8dp left - 8dp peek - 8dp spacing)
    cardSpacing: 8, // Gap between cards (marginRight on each card)
  },

  // === CUSTOM WORKOUT CARDS ===
  // Custom workout mode cards (same dimensions and spacing as recommended workout)
  customWorkout: {
    topPositionWithWelcome: 492, // Position below main workout cards (226dp + 256dp + 10dp spacing)
    topPositionWithoutWelcome: 396, // Position when welcome dismissed (130dp + 256dp + 10dp spacing)
  },

  // === DAY CALENDAR ADJUSTMENTS ===
  // Fine-tuning for day calendar text positioning
  dayCalendar: {
    dayLetterMarginTop: 3, // Vertical adjustment for day letters
    dayDateMarginTop: -2, // Negative margin to tighten spacing with day letters
  },

  // === PROGRESS BAR DIMENSIONS ===
  // Progress visualization component sizing
  progressBar: {
    height: 8, // Progress bar track height
    borderRadius: 4, // Corner radius for track and fill
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
    widthPercentage: 80, // Sidebar width as percentage of screen
    itemPaddingVertical: 16, // Vertical padding for menu items
    itemPaddingHorizontal: 24, // Horizontal padding for menu items
    headerPaddingTop: 48, // Top padding for header section
    headerPaddingBottom: 24, // Bottom padding for header section
    logoMarginBottom: 12, // Space between logo and username
    usernameMarginBottom: 24, // Space between username and first menu item
    // Gesture thresholds (for react-native-gesture-handler)
    swipeDismissThresholdPercentage: 0.3, // Percentage of width required to trigger dismiss (30%)
    swipeVelocityThreshold: 0.5, // Minimum velocity to trigger quick dismiss (px/ms)
  },

  // === INTERACTION FEEDBACK ===
  // Standard values for touch interaction visual feedback
  interaction: {
    pressedOpacity: 0.6, // Opacity reduction for pressed state
    pressedScale: 0.9, // Scale reduction for pressed state
    tripleTapCount: 3, // Number of taps required for triple-tap gesture
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
