// ==========================================================================
// TEST TOGGLEABLE DIAL CONTROL CARD COMPONENT
//
// Modified toggleable dial for testing layout changes.
// Uses TestDialControlCard with adjusted spacing.
//
// NOTE: This is a TEST file - will be deleted after testing.
// ==========================================================================

import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';
import {TestDialControlCard} from './TestDialControlCard';
import {SegmentedControl} from '@/components';
import type {DialConfig} from '../DialControlCard.types';

// ============================================================================
// TYPES
// ============================================================================

type DialMode = 'reps' | 'weight';

type TestToggleableDialControlCardProps = {
  initialReps?: number;
  initialWeight?: number;
  targetReps?: number;
  onRepsChange: (reps: number) => void;
  onWeightChange: (weight: number) => void;
  hasRepsError?: boolean;
  hasWeightError?: boolean;
  onRepsErrorAnimationComplete?: () => void;
  onWeightErrorAnimationComplete?: () => void;
};

// ============================================================================
// CONFIGURATION
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

export const TestToggleableDialControlCard: React.FC<TestToggleableDialControlCardProps> = ({
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
  const [mode, setMode] = useState<DialMode>('weight');
  const [localReps, setLocalReps] = useState(initialReps);
  const [localWeight, setLocalWeight] = useState(initialWeight);
  const [displayReps, setDisplayReps] = useState(initialReps);
  const [displayWeight, setDisplayWeight] = useState(initialWeight);

  const modeRef = useRef<DialMode>(mode);
  modeRef.current = mode;

  useEffect(() => {
    setLocalReps(initialReps);
    setDisplayReps(initialReps);
  }, [initialReps]);

  useEffect(() => {
    setLocalWeight(initialWeight);
    setDisplayWeight(initialWeight);
  }, [initialWeight]);

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
    if (modeRef.current === 'reps') {
      setDisplayReps(value);
    } else {
      setDisplayWeight(value);
    }
  }, []);

  const handleButtonErrorComplete = useCallback((index: number) => {
    if (index === 0 && onRepsErrorAnimationComplete) {
      onRepsErrorAnimationComplete();
    } else if (index === 1 && onWeightErrorAnimationComplete) {
      onWeightErrorAnimationComplete();
    }
  }, [onRepsErrorAnimationComplete, onWeightErrorAnimationComplete]);

  const handleDialErrorComplete = useCallback(() => {
    if (onRepsErrorAnimationComplete) {
      onRepsErrorAnimationComplete();
    }
    if (onWeightErrorAnimationComplete) {
      onWeightErrorAnimationComplete();
    }
  }, [onRepsErrorAnimationComplete, onWeightErrorAnimationComplete]);

  const getRepsColor = useCallback((reps: number) => {
    const diff = Math.abs(reps - targetReps);
    if (diff <= 2) return theme.colors.actionSuccess;
    if (diff <= 4) return theme.colors.sessionExpress;
    if (diff <= 6) return theme.colors.sessionMaintenance;
    if (diff <= 10) return theme.colors.actionWarning;
    return theme.colors.pureWhite;
  }, [targetReps]);

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

  const showDialError =
    (mode === 'reps' && hasRepsError) ||
    (mode === 'weight' && hasWeightError);

  return (
    <View style={styles.container}>
      <TestDialControlCard
        key={mode}
        value={activeValue}
        onChange={handleChange}
        onDisplayValueChange={handleDisplayValueChange}
        config={activeConfig}
        topElement={
          <SegmentedControl
            options={[
              <View key="reps" style={styles.repsOption}>
                <View style={styles.repsLabelStack}>
                  <Text style={[styles.repsText, mode === 'reps' && styles.repsTextActive]}>REPS</Text>
                  <Text style={styles.repsLabelSpacer}>(LBS)</Text>
                </View>
                <Text style={[styles.repsValue, {color: getRepsColor(displayReps)}]}>{displayReps}</Text>
              </View>,
              <View key="weight" style={styles.weightOption}>
                <View style={styles.weightLabelStack}>
                  <Text style={[styles.weightText, mode === 'weight' && styles.weightTextActive]}>WEIGHT</Text>
                  <Text style={[styles.lbsText, mode === 'weight' && styles.lbsTextActive]}>(LBS)</Text>
                </View>
                <Text style={styles.weightValue}>{displayWeight}</Text>
              </View>
            ]}
            selectedIndex={mode === 'reps' ? 0 : 1}
            onSelect={(index) => setMode(index === 0 ? 'reps' : 'weight')}
            errorStates={[
              hasRepsError && mode !== 'reps' && !showDialError,
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
    // No extra margin - controlled by parent
  },
  repsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 16,
    gap: 8,
  },
  repsLabelStack: {
    alignItems: 'center',
  },
  repsText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  repsTextActive: {
    color: theme.colors.textPrimary,
  },
  repsLabelSpacer: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    marginTop: -4,
    opacity: 0,
  },
  repsValue: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    includeFontPadding: false,
    width: 58,
    textAlign: 'left',
  },
  weightOption: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    paddingRight: 16,
    gap: 8,
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
  },
  weightTextActive: {
    color: theme.colors.textPrimary,
  },
  weightValue: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
    includeFontPadding: false,
    width: 58,
    textAlign: 'left',
  },
  lbsText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginTop: -4,
  },
  lbsTextActive: {
    color: theme.colors.textPrimary,
  },
});
