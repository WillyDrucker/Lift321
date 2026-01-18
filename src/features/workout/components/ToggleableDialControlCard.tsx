// ==========================================================================
// TOGGLEABLE DIAL CONTROL CARD COMPONENT
//
// Single full-width dial control that toggles between reps and weight modes.
// Preserves both values independently and provides mode-specific configuration.
//
// Dependencies: DialControlCard, theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';
import {DialControlCard} from './DialControlCard';
import {SegmentedControl} from '@/components';
import type {DialConfig} from './DialControlCard.types';

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
  // Error handling props
  hasRepsError?: boolean;
  hasWeightError?: boolean;
  onRepsErrorAnimationComplete?: () => void;
  onWeightErrorAnimationComplete?: () => void;
};

// ============================================================================
// CONFIGURATION - Constants to prevent re-creation on every render
// ============================================================================

const REPS_CONFIG: DialConfig = {
  minValue: 0,
  maxValue: 30,
  tickSpacing: 15,
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

// ============================================================================
// COMPONENT
// ============================================================================

export const ToggleableDialControlCard: React.FC<ToggleableDialControlCardProps> = ({
  initialReps = 10,
  initialWeight = 0,
  targetReps = 10,
  onRepsChange,
  onWeightChange,
  hasRepsError = false,
  hasWeightError = false,
  onRepsErrorAnimationComplete,
  onWeightErrorAnimationComplete,
}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const [mode, setMode] = useState<DialMode>('weight');
  const [localReps, setLocalReps] = useState(initialReps);
  const [localWeight, setLocalWeight] = useState(initialWeight);
  const [displayReps, setDisplayReps] = useState(initialReps); // Real-time value during dragging
  const [displayWeight, setDisplayWeight] = useState(initialWeight); // Real-time value during dragging

  // Ref to track current mode for callbacks (avoids stale closure issues)
  const modeRef = useRef<DialMode>(mode);
  modeRef.current = mode;

  // ==========================================================================
  // EFFECTS - SYNC EXTERNAL CHANGES
  // ==========================================================================

  useEffect(() => {
    setLocalReps(initialReps);
    setDisplayReps(initialReps);
  }, [initialReps]);

  useEffect(() => {
    setLocalWeight(initialWeight);
    setDisplayWeight(initialWeight);
  }, [initialWeight]);

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleRepsChange = useCallback((reps: number) => {
    setLocalReps(reps);
    setDisplayReps(reps);
    onRepsChange(reps);
  }, [onRepsChange]);

  const handleWeightChange = useCallback((weight: number) => {
    setLocalWeight(weight);
    setDisplayWeight(weight);
    onWeightChange(weight);
  }, [onWeightChange]);

  const handleDisplayValueChange = useCallback((value: number) => {
    // Use ref to get current mode (avoids stale closure during mode transitions)
    if (modeRef.current === 'reps') {
      setDisplayReps(value);
    } else {
      setDisplayWeight(value);
    }
  }, []);

  // Handle button error animation completion - clear the error in context
  const handleButtonErrorComplete = useCallback((index: number) => {
    if (index === 0 && onRepsErrorAnimationComplete) {
      onRepsErrorAnimationComplete();
    } else if (index === 1 && onWeightErrorAnimationComplete) {
      onWeightErrorAnimationComplete();
    }
  }, [onRepsErrorAnimationComplete, onWeightErrorAnimationComplete]);

  // Handle dial error animation completion - clear ALL errors in context
  // This prevents the inactive button from flashing after the dial finishes
  const handleDialErrorComplete = useCallback(() => {
    // Clear both errors so inactive button doesn't flash after dial
    // User must press LOG SET again to trigger new errors
    if (onRepsErrorAnimationComplete) {
      onRepsErrorAnimationComplete();
    }
    if (onWeightErrorAnimationComplete) {
      onWeightErrorAnimationComplete();
    }
  }, [onRepsErrorAnimationComplete, onWeightErrorAnimationComplete]);


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

  const getValueColor = mode === 'reps' ? getRepsColor : undefined;

  // Dial error: show if error exists for current mode
  // Simple logic: if active dial has error, flash the dial
  const showDialError =
    (mode === 'reps' && hasRepsError) ||
    (mode === 'weight' && hasWeightError);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <View style={styles.container}>
      <DialControlCard
        key={mode}
        value={activeValue}
        onChange={handleChange}
        onDisplayValueChange={handleDisplayValueChange}
        config={activeConfig}
        topElement={
          <SegmentedControl
            options={[
              <View key="reps" style={styles.repsOption}>
                <Text style={[styles.repsText, mode === 'reps' && styles.repsTextActive]}>REPS</Text>
                <Text style={[styles.repsValue, {color: getRepsColor(displayReps)}]}>{displayReps}</Text>
              </View>,
              <View key="weight" style={styles.weightOption}>
                <View style={styles.weightLabelStack}>
                  <Text style={[styles.weightText, mode === 'weight' && styles.weightTextActive]}>WEIGHT</Text>
                  <Text style={[styles.lbsText, mode === 'weight' && styles.lbsTextActive]}>(LBS)</Text>
                </View>
                <Text style={[
                  styles.weightValue,
                  displayWeight >= 1000 && {fontSize: 24, lineHeight: 24}
                ]}>{displayWeight}</Text>
              </View>
            ]}
            selectedIndex={mode === 'reps' ? 0 : 1}
            onSelect={(index) => setMode(index === 0 ? 'reps' : 'weight')}
            errorStates={[
              // REPS button: flash only if dial is NOT showing error AND reps has error AND not on reps mode
              hasRepsError && mode !== 'reps' && !showDialError,
              // WEIGHT button: flash only if dial is NOT showing error AND weight has error AND not on weight mode
              hasWeightError && mode !== 'weight' && !showDialError
            ]}
            onErrorAnimationComplete={handleButtonErrorComplete}
          />
        }
        getValueColor={getValueColor}
        hideButtons={false}
        compact={false}
        hasError={showDialError}
        onErrorAnimationComplete={handleDialErrorComplete}
      />
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    // No margin needed - buttons and DialControlCard have their own margins
  },
  repsOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 16,
    gap: theme.spacing.controlButtonGap,
  },
  repsText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  repsTextActive: {
    color: theme.colors.textPrimary,
  },
  repsValue: {
    fontSize: 32,
    lineHeight: 30,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    includeFontPadding: false,
    width: 58, // Fixed width for 3 digits (100) - value grows from left
    textAlign: 'left',
    // Color is set dynamically based on getRepsColor
  },
  weightOption: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 16,
    gap: theme.spacing.controlButtonGap,
  },
  weightLabelStack: {
    alignItems: 'center',
  },
  weightText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    includeFontPadding: false,
  },
  weightTextActive: {
    color: theme.colors.textPrimary,
  },
  weightValue: {
    fontSize: 32,
    lineHeight: 30,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
    includeFontPadding: false,
    width: 58, // Fixed width for 3 digits (999) - value grows from left
    textAlign: 'left',
  },
  lbsText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    includeFontPadding: false,
    marginTop: -4,
  },
  lbsTextActive: {
    color: theme.colors.textPrimary,
  },
});
