// ==========================================================================
// TOGGLEABLE DIAL CONTROL CARD COMPONENT
//
// Single full-width dial control that toggles between reps and weight modes.
// Preserves both values independently and provides mode-specific configuration.
//
// Dependencies: DialControlCard, SegmentedControl, theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';
import {DialControlCard} from './DialControlCard';
import type {DialConfig} from './DialControlCard.types';
import {SegmentedControl} from '@/components';

// ============================================================================
// TYPES
// ============================================================================

type DialMode = 'reps' | 'weight';

type ToggleableDialControlCardProps = {
  initialReps?: number;
  initialWeight?: number;
  targetReps?: number;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
};

// ============================================================================
// CONFIGURATION - Constants to prevent re-creation on every render
// ============================================================================

const REPS_CONFIG: DialConfig = {
  minValue: 0,
  maxValue: 30,
  tickSpacing: 30,
  valuePerTick: 1,
  buttonIncrement: 1,
  buttonIncrements: [1],
  flingSnapIncrement: 5,
  flingVelocityThreshold: 0.5,
};

const WEIGHT_CONFIG: DialConfig = {
  minValue: 0,
  maxValue: 1000,
  tickSpacing: 10,
  valuePerTick: 1,
  buttonIncrement: 5,
  buttonIncrements: [5],
  flingSnapIncrement: 5,
  flingVelocityThreshold: 0.5,
};

// Removed static SEGMENTED_OPTIONS - now created dynamically with values

// ============================================================================
// COMPONENT
// ============================================================================

export const ToggleableDialControlCard: React.FC<ToggleableDialControlCardProps> = ({
  initialReps = 10,
  initialWeight = 0,
  targetReps = 10,
  onRepsChange,
  onWeightChange,
}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const [mode, setMode] = useState<DialMode>('reps');
  const [localReps, setLocalReps] = useState(initialReps);
  const [localWeight, setLocalWeight] = useState(initialWeight);

  // ==========================================================================
  // EFFECTS - SYNC EXTERNAL CHANGES
  // ==========================================================================

  useEffect(() => {
    setLocalReps(initialReps);
  }, [initialReps]);

  useEffect(() => {
    setLocalWeight(initialWeight);
  }, [initialWeight]);

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleRepsChange = useCallback((reps: number) => {
    setLocalReps(reps);
    onRepsChange(reps);
  }, [onRepsChange]);

  const handleWeightChange = useCallback((weight: number) => {
    setLocalWeight(weight);
    onWeightChange(weight);
  }, [onWeightChange]);

  const handleModeSelect = useCallback((index: number) => {
    setMode(index === 0 ? 'reps' : 'weight');
  }, []);

  // ==========================================================================
  // COLOR FEEDBACK (REPS ONLY)
  // ==========================================================================

  const getRepsColor = useCallback((reps: number) => {
    const diff = Math.abs(reps - targetReps);
    if (diff <= 2) return theme.colors.actionSuccess;
    if (diff <= 4) return theme.colors.sessionExpress;
    if (diff <= 6) return theme.colors.sessionMaintenance;
    if (diff <= 10) return theme.colors.actionWarning;
    return theme.colors.pureWhite;
  }, [targetReps]);

  // ==========================================================================
  // COMPUTED VALUES - MEMOIZED TO PREVENT UNNECESSARY RE-RENDERS
  // ==========================================================================

  const activeConfig = useMemo(() =>
    mode === 'reps' ? REPS_CONFIG : WEIGHT_CONFIG,
    [mode]
  );

  const activeValue = mode === 'reps' ? localReps : localWeight;

  const handleChange = useMemo(() =>
    mode === 'reps' ? handleRepsChange : handleWeightChange,
    [mode, handleRepsChange, handleWeightChange]
  );

  const headerLabel = mode === 'reps' ? 'REPS' : 'WEIGHT';
  const getValueColor = mode === 'reps' ? getRepsColor : undefined;

  const headerSuffix = useMemo(() =>
    mode === 'reps' ? (
      <Text style={styles.suffixText}>
        {' '}(TARGET: <Text style={styles.targetValue}>{targetReps}</Text>)
      </Text>
    ) : (
      <Text style={styles.suffixText}>{' '}(LBS)</Text>
    ),
    [mode, targetReps]
  );

  // Dynamic segmented control options with current values and colors
  const segmentedOptions = useMemo(() => {
    const repsColor = getRepsColor(localReps);
    const weightColor = theme.colors.actionSuccess; // Green for weight

    return [
      <Text key="reps" style={styles.segmentOption}>
        REPS: <Text style={[styles.segmentValue, {color: repsColor}]}>{localReps}</Text>
      </Text>,
      <Text key="weight" style={styles.segmentOption}>
        WEIGHT: <Text style={[styles.segmentValue, {color: weightColor}]}>{localWeight}</Text>
      </Text>,
    ];
  }, [localReps, localWeight, getRepsColor]);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <View style={styles.container}>
      <SegmentedControl
        options={segmentedOptions}
        selectedIndex={mode === 'reps' ? 0 : 1}
        onSelect={handleModeSelect}
      />
      <DialControlCard
        value={activeValue}
        onChange={handleChange}
        config={activeConfig}
        headerLabel={headerLabel}
        headerSuffix={headerSuffix}
        getValueColor={getValueColor}
        hideButtons={false}
        compact={false}
      />
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    // No margin needed - SegmentedControl and DialControlCard have their own margins
  },
  suffixText: {
    fontSize: 16,
    color: theme.colors.backgroundTertiary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  targetValue: {
    color: theme.colors.actionSuccess,
  },
  segmentOption: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  segmentValue: {
    // Color will be set dynamically
  },
});
