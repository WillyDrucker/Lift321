// ==========================================================================
// WEIGHT CONTROL CARD COMPONENT
//
// Thin wrapper around DialControlCard for weight-specific behavior.
// Displays weight in pounds with 5 lb increments.
//
// Dependencies: DialControlCard, theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React from 'react';
import {Text} from 'react-native';
import {theme} from '@/theme';
import {DialControlCard} from './DialControlCard';
import type {DialConfig} from './DialControlCard.types';

// ============================================================================
// TYPES
// ============================================================================

type WeightControlCardProps = {
  initialWeight?: number;
  onWeightChange: (weight: number) => void;
  hasError?: boolean;
  onErrorAnimationComplete?: () => void;
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const WEIGHT_CONFIG: DialConfig = {
  minValue: 0,
  maxValue: 1000,
  tickSpacing: 10,
  valuePerTick: 1,
  buttonIncrement: 5,
  flingSnapIncrement: 10,
  flingVelocityThreshold: 0.5,
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WeightControlCard: React.FC<WeightControlCardProps> = ({
  initialWeight = 0,
  onWeightChange,
  hasError = false,
  onErrorAnimationComplete,
}) => {
  // Header suffix showing unit
  const headerSuffix = (
    <Text style={{
      fontSize: 16,
      color: theme.colors.backgroundTertiary,
      fontFamily: theme.typography.fontFamily.primary,
      fontWeight: 'bold',
    }}>
      {' '}(LBS)
    </Text>
  );

  return (
    <DialControlCard
      value={initialWeight}
      onChange={onWeightChange}
      config={WEIGHT_CONFIG}
      headerLabel="WEIGHT"
      headerSuffix={headerSuffix}
      hideButtons={true}
      compact={true}
      hasError={hasError}
      onErrorAnimationComplete={onErrorAnimationComplete}
    />
  );
};
