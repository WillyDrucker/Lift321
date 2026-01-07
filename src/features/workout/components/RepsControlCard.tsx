// ==========================================================================
// REPS CONTROL CARD COMPONENT
//
// Thin wrapper around DialControlCard for reps-specific behavior.
// Provides target-based color feedback and reps configuration.
//
// Dependencies: DialControlCard, theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useCallback} from 'react';
import {Text} from 'react-native';
import {theme} from '@/theme';
import {DialControlCard} from './DialControlCard';
import type {DialConfig} from './DialControlCard.types';

// ============================================================================
// TYPES
// ============================================================================

type RepsControlCardProps = {
  initialReps?: number;
  targetReps?: number;
  onRepsChange: (reps: number) => void;
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const REPS_CONFIG: DialConfig = {
  minValue: 0,
  maxValue: 100,
  tickSpacing: 10,
  valuePerTick: 1,
  buttonIncrement: 1,
  flingSnapIncrement: 5,
  flingVelocityThreshold: 0.5,
};

// ============================================================================
// STYLES
// ============================================================================

const targetValueStyle = {
  color: theme.colors.actionSuccess,
};

// ============================================================================
// COMPONENT
// ============================================================================

export const RepsControlCard: React.FC<RepsControlCardProps> = ({
  initialReps = 10,
  targetReps = 10,
  onRepsChange,
}) => {
  // Color based on distance from target
  const getRepsColor = useCallback((reps: number) => {
    const diff = Math.abs(reps - targetReps);
    if (diff <= 2) return theme.colors.actionSuccess;
    if (diff <= 4) return theme.colors.sessionExpress;
    if (diff <= 6) return theme.colors.sessionMaintenance;
    if (diff <= 10) return theme.colors.actionWarning;
    return theme.colors.pureWhite;
  }, [targetReps]);

  // Header suffix showing target
  const headerSuffix = (
    <Text style={{
      fontSize: 16,
      color: theme.colors.backgroundTertiary,
      fontFamily: theme.typography.fontFamily.primary,
      fontWeight: 'bold',
    }}>
      {' '}(TARGET: <Text style={targetValueStyle}>{targetReps}</Text>)
    </Text>
  );

  return (
    <DialControlCard
      value={initialReps}
      onChange={onRepsChange}
      config={REPS_CONFIG}
      headerLabel="REPS"
      headerSuffix={headerSuffix}
      getValueColor={getRepsColor}
      decrementLabel="-1"
      incrementLabel="+1"
    />
  );
};
