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
  primary: '#0c00a6',
  secondary: '#f03f0a',

  // === BACKGROUND COLORS ===
  backgroundPrimary: '#1a1a1a',
  backgroundSecondary: '#2a2a2a',
  backgroundCard: '#333333',

  // === TEXT COLORS ===
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  textDisabled: '#666666',
  textOnAction: '#000000', // Text on colored buttons

  // === ACTION COLORS ===
  // Semantic naming: purpose, not literal color names
  actionSuccess: '#00cc66', // Confirm, complete, success
  actionDanger: '#ff4444', // Delete, error, destructive
  actionWarning: '#ffaa00', // Caution, skip
  actionInfo: '#0099ff', // Informational, neutral actions

  // === BORDER COLORS ===
  borderDefault: '#444444',
  borderFocus: '#0c00a6',
  borderDisabled: '#2a2a2a',
  borderSuccess: '#00cc66',
  borderDanger: '#ff4444',

  // === WORKOUT-SPECIFIC COLORS ===
  // Based on Will's 3-2-1 semantic system
  planSuccess: '#00ff00', // On-plan workouts (bright green)
  planDeviation: '#ffaa00', // Off-plan warning (orange)
  setCompleted: '#00cc66', // Completed exercise sets
  setSkipped: '#ff4444', // Skipped sets
} as const;

// TypeScript helper for autocomplete
export type ColorToken = keyof typeof colors;
