// ==========================================================================
// DESIGN TOKENS - Main Export
//
// Combines all design tokens into a single theme object.
// This is the primary import for all components.
//
// Usage: import { theme } from '@theme'
// Example: backgroundColor: theme.colors.backgroundCard
//
// Philosophy: Single source of truth for all design decisions
// Dependencies: colors, spacing, typography modules
// Used by: All components throughout the app
// ==========================================================================

import {colors} from './colors';
import {spacing} from './spacing';
import {typography, textStyles} from './typography';
import {textShadows, viewShadows, elevation} from './shadows';
import {buttons} from './buttons';

export const theme = {
  colors,
  spacing,
  typography,
  textStyles,
  textShadows,
  viewShadows,
  elevation,
  buttons,
} as const;

export type Theme = typeof theme;

// Re-export individual modules for convenience
export {colors, spacing, typography, textStyles, textShadows, viewShadows, elevation, buttons};
