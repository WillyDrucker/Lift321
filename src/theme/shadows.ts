// ==========================================================================
// DESIGN TOKENS - Shadows
//
// Shadow definitions for text and UI elements.
// Provides consistent depth and elevation across the app.
//
// Philosophy: Reusable shadow values prevent inconsistency
// Dependencies: None
// Used by: Components requiring depth/elevation
// ==========================================================================

import type {TextStyle, ViewStyle} from 'react-native';

// === TEXT SHADOWS ===
// Used for text elements to create depth against backgrounds
// All shadows use pure black (#000000) dropping straight down with fading intensity
export const textShadows = {
  default: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  } as TextStyle,

  subtle: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  } as TextStyle,

  strong: {
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: {width: 0, height: 3},
    textShadowRadius: 6,
  } as TextStyle,
} as const;

// === VIEW SHADOWS ===
// Used for iOS shadow properties (shadowColor, shadowOffset, etc.)
// All shadows use pure black (#000000) dropping straight down with fading intensity
export const viewShadows = {
  none: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
  } as ViewStyle,

  small: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,

  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  } as ViewStyle,

  large: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.25,
    shadowRadius: 16,
  } as ViewStyle,
} as const;

// === ELEVATION (ANDROID) ===
// Android-specific elevation values
export const elevation = {
  none: 0,
  low: 2,
  medium: 4,
  high: 8,
  highest: 16,
} as const;

export type TextShadowToken = keyof typeof textShadows;
export type ViewShadowToken = keyof typeof viewShadows;
export type ElevationToken = keyof typeof elevation;
