// ==========================================================================
// DESIGN TOKENS - Colors
//
// Global color palette for Lift 3-2-1 fitness app.
// Purpose-driven naming (semantic, not color-based).
//
// Philosophy: Semantic naming from Will's 3-2-1 adapted for React Native
// Dependencies: None
// Used by: All components via theme object
// ==========================================================================

export const colors = {
  // === BRAND COLORS ===
  // Fitness theme: Pure green (#00FF00) on charcoal gray

  primary: '#00FF00',
  // Pure Green - Main brand/action color
  // Use for: Primary buttons, CTAs, active states, success indicators

  secondary: '#2A2A2A',
  // Medium Charcoal - Secondary brand color
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
  // Based on Will's 3-2-1 semantic system for workout tracking

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

  // === UTILITY COLORS ===

  shadowBlack: '#000000',
  // Pure Black (#000000) - Shadow color for all drop shadows
  // Use for: Button shadows, logo shadows, text shadows, elevation effects
} as const;

// TypeScript helper for autocomplete
export type ColorToken = keyof typeof colors;
