// ==========================================================================
// DIAL CONTROL CARD TYPES
//
// Type definitions for the generic dial control component.
// Enables configuration of value ranges, increments, and display.
//
// Dependencies: React, React Native
// Used by: DialControlCard, RepsControlCard, WeightControlCard
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
  valuePerTick: number;     // Value each tick represents

  // Button behavior
  buttonIncrement: number;  // +/- button change amount

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

  // Dial configuration
  config: DialConfig;

  // Header customization
  headerLabel: string;              // "REPS" or "WEIGHT"
  headerSuffix?: ReactNode;         // "(TARGET: X)" or "(LBS)"

  // Display customization
  formatValue?: (value: number) => string;
  getValueColor?: (value: number) => string;

  // Button labels
  decrementLabel: string;           // "-1" or "-5"
  incrementLabel: string;           // "+1" or "+5"
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
