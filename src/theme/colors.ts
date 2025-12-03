// ==========================================================================
// DESIGN TOKENS - Colors
//
// Global color palette for Lift 3-2-1 fitness app.
// Purpose-driven naming (semantic, not color-based).
//
// Philosophy: Semantic naming for scalability and maintainability
// Dependencies: None
// Used by: All components via theme object
// ==========================================================================

export const colors = {
  // === BRAND COLORS ===
  // Fitness theme: Pure green (#00FF00) on charcoal gray

  primary: '#00FF00',
  // Pure Green (#00FF00) - Main brand/action color
  // Use for: Primary buttons, CTAs, active states, success indicators

  primaryMuted: '#00BF00',
  // Muted Green (#00BF00 - 75% brightness) - Softer brand accent
  // Use for: Secondary brand text, softer green accents, reduced emphasis highlights

  opposite: '#FF00FF',
  // Magenta (#FF00FF) - Complementary color to pure green
  // Use for: Accent elements, complementary design elements, color wheel opposite

  veryDarkGray: '#101010',
  // Very Dark Gray (#101010) - Easy-to-remember neutral dark tone
  // Use for: Backup navigation bar color, alternative dark surfaces

  secondary: '#2A2A2A',
  // Medium Charcoal (#2A2A2A) - Secondary brand color
  // Use for: Secondary buttons, inactive states, alternative surfaces

  // === BACKGROUND COLORS ===
  // Layered grays create depth and visual hierarchy

  backgroundPrimary: '#1E1E1E',
  // Charcoal (#1E1E1E) - Main app background
  // Use for: Screen backgrounds, main container backgrounds

  backgroundSecondary: '#2A2A2A',
  // Medium Charcoal (#2A2A2A) - Secondary surfaces (6% lighter than primary)
  // Use for: Cards, list items, section backgrounds

  backgroundCard: '#303030',
  // Elevated Gray (#303030) - Raised/elevated elements (12% lighter than primary)
  // Use for: Modal backgrounds, dropdown menus, elevated cards, overlays

  backgroundTertiary: '#424242',
  // Neutral Gray (#424242) - Tertiary surfaces (18% lighter than secondary)
  // Use for: Guest/maintenance buttons, low-priority actions, optional features

  // === TEXT COLORS ===

  textPrimary: '#FFFFFF',
  // White (#FFFFFF) - Primary text
  // Use for: Headlines, body text, main content, labels

  textSecondary: '#B0B0B0',
  // Light Gray (#B0B0B0) - Secondary text
  // Use for: Descriptions, helper text, timestamps, secondary labels

  textDisabled: '#666666',
  // Medium Gray (#666666) - Disabled/muted text
  // Use for: Disabled button text, placeholders, inactive states

  textOnAction: '#000000',
  // Black (#000000) - Text on colored action buttons
  // Use for: Text on pure green buttons, ensures readability on bright backgrounds

  textYellowMaintenance: '#FFFF00',
  // Yellow (#FFFF00) - Maintenance mode indicator
  // Use for: Maintenance mode text, guest user indicators, temporary features

  // === SESSION TYPE COLORS ===
  // Visual differentiation for workout session types

  sessionStandard: '#00FF00',
  // Pure Green (#00FF00) - Standard session indicator
  // Use for: Standard session text, full workout indicators

  sessionExpress: '#77FF00',
  // Olive Green (#77FF00) - Express session indicator
  // Use for: Express session text, quick workout indicators

  sessionMaintenance: '#FFFF00',
  // Yellow (#FFFF00) - Maintenance session indicator
  // Use for: Maintenance session text, minimal workout indicators

  // === ACTION COLORS ===
  // Semantic naming: describes purpose, not literal color

  actionSuccess: '#00FF00',
  // Pure Green (#00FF00) - Success/positive actions
  // Use for: Confirm buttons, success messages, completion indicators

  actionDanger: '#ff4444',
  // Red (#ff4444) - Danger/destructive actions
  // Use for: Delete buttons, error messages, warning alerts, cancel actions

  actionWarning: '#ffaa00',
  // Orange (#ffaa00) - Warning/caution actions
  // Use for: Skip actions, deviation warnings, moderate alerts

  actionInfo: '#00FF00',
  // Pure Green (#00FF00) - Informational/neutral actions
  // Use for: Info buttons, neutral CTAs, general actions

  // === BORDER COLORS ===

  borderDefault: '#424242',
  // Neutral Gray (#424242) - Default borders
  // Use for: Input borders, card outlines, dividers, default states

  borderMuted: '#008000',
  // Muted Green (#008000) - Unfocused input borders
  // Use for: Input field borders in default state, subtle green accents

  borderFocus: '#00FF00',
  // Pure Green (#00FF00) - Focused element borders
  // Use for: Focused inputs, active selections, highlighted elements

  borderDisabled: '#2A2A2A',
  // Medium Charcoal (#2A2A2A) - Disabled element borders
  // Use for: Disabled inputs, inactive borders, muted outlines

  borderSuccess: '#00FF00',
  // Pure Green (#00FF00) - Success state borders
  // Use for: Valid inputs, successful form fields, positive indicators

  borderDanger: '#ff4444',
  // Red (#ff4444) - Error/danger state borders
  // Use for: Invalid inputs, error states, failed validation

  // === WORKOUT-SPECIFIC COLORS ===
  // Semantic color system for workout tracking and status indicators

  planSuccess: '#00FF00',
  // Pure Green (#00FF00) - On-plan workout indicator
  // Use for: Workouts completed as planned, on-schedule sessions

  planDeviation: '#ffaa00',
  // Orange (#ffaa00) - Off-plan deviation warning
  // Use for: Workouts done off-plan, schedule changes, modifications

  setCompleted: '#00FF00',
  // Pure Green (#00FF00) - Completed exercise set indicator
  // Use for: Finished sets, completed reps, successful exercise completion

  setSkipped: '#ff4444',
  // Red (#ff4444) - Skipped exercise set indicator
  // Use for: Skipped sets, missed exercises, incomplete workouts

  // === NAVIGATION COLORS ===

  navActive: '#00FF00',
  // Pure Green (#00FF00) - Active navigation item
  // Use for: Active nav icons and labels, current screen indicator

  navInactive: '#666666',
  // Medium Gray (#666666) - Inactive navigation items
  // Use for: Inactive nav icons and labels, unselected screens

  // === TAB COLORS ===

  tabActive: '#00FF00',
  // Pure Green (#00FF00) - Active tab
  // Use for: Selected day tab, active filter, current selection

  tabInactive: '#424242',
  // Neutral Gray (#424242) - Inactive tab
  // Use for: Unselected day tabs, inactive filters, default tabs

  tabActiveText: '#000000',
  // Black (#000000) - Text on active tab
  // Use for: Text on green active tabs for maximum contrast

  tabInactiveText: '#B0B0B0',
  // Light Gray (#B0B0B0) - Text on inactive tab
  // Use for: Text on unselected tabs, muted labels

  // === UTILITY COLORS ===

  shadowBlack: '#000000',
  // Pure Black (#000000) - Shadow color for all drop shadows
  // Use for: Button shadows, logo shadows, text shadows, elevation effects

  overlayBackground: 'rgba(0, 0, 0, 0.5)',
  // Semi-transparent Black - Overlay/backdrop color
  // Use for: Modal backdrops, drawer overlays, dimmed backgrounds

  // === ABSOLUTE COLORS ===
  // Pure black and white for specific design needs

  pureBlack: '#000000',
  // Pure Black (#000000) - Absolute black
  // Use for: True black backgrounds, maximum contrast elements, text on bright colors

  pureWhite: '#FFFFFF',
  // Pure White (#FFFFFF) - Absolute white
  // Use for: Maximum contrast backgrounds, light mode surfaces, bright UI elements

  // === SOCIAL MEDIA BRAND COLORS ===
  // Official brand colors for third-party authentication

  googleBlue: '#4285F4',
  // Google Blue (#4285F4) - Official Google brand color
  // Use for: Google logo, Google-branded buttons and elements

  facebookBlue: '#1877F2',
  // Facebook Blue (#1877F2) - Official Facebook brand color
  // Use for: Facebook logo, Facebook-branded buttons and elements

  // === CONTROL STATE BACKGROUNDS ===
  // Semi-transparent background colors for interactive controls

  controlSuccessBackground: 'rgba(0, 255, 0, 0.1)',
  // Green 10% opacity - Success state background
  // Use for: Active timer background, completed control states

  controlWarningBackground: 'rgba(255, 170, 0, 0.1)',
  // Orange 10% opacity - Warning state background
  // Use for: Finished timer background, warning control states

  // === ACHIEVEMENT COLORS ===
  // Colors for achievements, badges, and special accomplishments

  achievementGold: '#FFD700',
  // Gold (#FFD700) - Achievement/badge color
  // Use for: Achievement icons, milestone badges, special accomplishments

  // === CUSTOM WORKOUT COLORS ===
  // Distinctive colors for custom workout types

  customWorkoutBlue: '#0099FF',
  // Blue (#0099FF) - Custom and Work-As-You-Go workouts
  // Use for: Custom workout cards, Work-As-You-Go mode indicators

  customWorkoutYellow: '#FFFF00',
  // Yellow (#FFFF00) - SuperSet workout mode
  // Use for: SuperSet mode cards and indicators

  customWorkoutCyan: '#00FFEE',
  // Cyan (#00FFEE) - Partner Mode workouts
  // Use for: Partner Mode cards and indicators

  coachSteelBlue: '#708090',
  // Steel Blue (#708090) - Coach/training activities (slate grey with blue undertone)
  // Use for: Coach cards, coaching mode indicators, professional training sessions
} as const;

// TypeScript helper for autocomplete
export type ColorToken = keyof typeof colors;
