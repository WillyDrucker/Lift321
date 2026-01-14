// ==========================================================================
// DIAL CONTROL CARD TYPES
//
// Type definitions for the generic dial control component.
// Enables configuration of value ranges, increments, and display.
//
// Dependencies: React
// Used by: DialControlCard, ToggleableDialControlCard
// ==========================================================================

import type {ReactNode} from 'react';

// ============================================================================
// DIAL CONFIGURATION
// ============================================================================

export type DialConfig = {
  // Value bounds
  minValue: number;
  maxValue: number;

  // Tick settings
  tickSpacing: number;      // Pixels between ticks
  valuePerTick: number;     // Value each tick represents (scroll precision)

  // Button behavior
  buttonIncrement: number;  // Primary +/- button change amount
  buttonIncrements?: number[];  // Optional: multiple button increments [small, large]

  // Fling behavior
  flingSnapIncrement: number;      // Snap to this increment on fling
  flingVelocityThreshold: number;  // Velocity to trigger fling snap
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export type DialControlCardProps = {
  // Value control
  value: number;
  onChange: (value: number) => void;
  onDisplayValueChange?: (value: number) => void;  // Real-time value during dragging

  // Dial configuration
  config: DialConfig;

  // Top element (e.g., SegmentedControl for mode switching)
  topElement?: ReactNode;

  // Display customization
  formatValue?: (value: number) => string;
  getValueColor?: (value: number) => string;

  // Layout options
  hideButtons?: boolean;            // Hide +/- buttons and expand dial to full width
  compact?: boolean;                // 50% width mode

  // Error state
  hasError?: boolean;               // Triggers error flash animation on dial
  onErrorAnimationComplete?: () => void;  // Called when flash animation ends
};

// ============================================================================
// HOOK TYPES
// ============================================================================

export type UseDialControlConfig = {
  initialValue: number;
  minValue: number;
  maxValue: number;
  tickSpacing: number;
  valuePerTick: number;
  flingSnapIncrement: number;
  flingVelocityThreshold: number;
  onChange: (value: number) => void;
};
