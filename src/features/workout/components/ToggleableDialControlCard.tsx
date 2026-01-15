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

  const [mode, setMode] = useState<DialMode>('reps');
  const [localReps, setLocalReps] = useState(initialReps);
  const [localWeight, setLocalWeight] = useState(initialWeight);
  const [displayReps, setDisplayReps] = useState(initialReps); // Real-time value during dragging
  const [displayWeight, setDisplayWeight] = useState(initialWeight); // Real-time value during dragging

  // Ref to track current mode for callbacks (avoids stale closure issues)
  const modeRef = useRef<DialMode>(mode);
  modeRef.current = mode;

  // Track "acknowledged" errors - errors that existed while in a different mode
  // This prevents carryover: if error was seen in wrong mode, don't flash when switching
  const acknowledgedRepsError = useRef(false);
  const acknowledgedWeightError = useRef(false);

  // Synchronous error acknowledgment (runs during render, not in effect)
  // If error exists but mode doesn't match, acknowledge it (mark as "seen in wrong mode")
  if (hasRepsError && mode !== 'reps') {
    acknowledgedRepsError.current = true;
  }
  if (hasWeightError && mode !== 'weight') {
    acknowledgedWeightError.current = true;
  }
  // Clear acknowledgment when error is cleared (allows re-triggering)
  if (!hasRepsError) {
    acknowledgedRepsError.current = false;
  }
  if (!hasWeightError) {
    acknowledgedWeightError.current = false;
  }

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

  // Handle dial error animation completion - acknowledge the error to prevent re-flash
  const handleDialErrorComplete = useCallback(() => {
    // Mark as acknowledged so it won't flash again until cleared and re-triggered
    if (modeRef.current === 'reps') {
      acknowledgedRepsError.current = true;
    } else {
      acknowledgedWeightError.current = true;
    }
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

  const getValueColor = mode === 'reps' ? getRepsColor : undefined;

  // Dial error: show only if error exists for current mode AND wasn't acknowledged
  // Acknowledged = error existed while in wrong mode (carryover prevention)
  const showDialError =
    (mode === 'reps' && hasRepsError && !acknowledgedRepsError.current) ||
    (mode === 'weight' && hasWeightError && !acknowledgedWeightError.current);

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
                <Text style={styles.weightValue}>{displayWeight}</Text>
              </View>
            ]}
            selectedIndex={mode === 'reps' ? 0 : 1}
            onSelect={(index) => setMode(index === 0 ? 'reps' : 'weight')}
            errorStates={[hasRepsError, hasWeightError]}
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
    alignItems: 'center',
    gap: 8,
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
  repsValue: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    includeFontPadding: false,
    // Color is set dynamically based on getRepsColor
  },
  weightOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
