// ==========================================================================
// WORKOUT CONTROLS CARD COMPONENT
//
// Unified control card for adjusting weight and reps.
// Features separate sections for weight (with large/small buttons)
// and reps (with single +/-1 buttons) in a vertically stacked layout.
//
// Dependencies: theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutControlsCardProps = {
  initialWeight?: number;
  onWeightChange: (weight: number) => void;
  initialReps?: number;
  onRepsChange: (reps: number) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WorkoutControlsCard: React.FC<WorkoutControlsCardProps> = ({
  initialWeight = 135,
  onWeightChange,
  initialReps = 10,
  onRepsChange,
}) => {
  // Use props directly as source of truth
  const weight = initialWeight.toString();
  const reps = initialReps.toString();

  // === WEIGHT HANDLERS ===
  const handleWeightIncrement = (amount: number) => {
    const current = parseFloat(weight) || 0;
    onWeightChange(current + amount);
  };

  const handleWeightDecrement = (amount: number) => {
    const current = parseFloat(weight) || 0;
    if (current - amount >= 0) {
      onWeightChange(current - amount);
    } else {
      onWeightChange(0);
    }
  };

  const handleWeightTextChange = (text: string) => {
    if (text === '') {
      onWeightChange(0);
      return;
    }
    const num = parseFloat(text);
    if (!isNaN(num)) {
      onWeightChange(num);
    }
  };

  // === REPS HANDLERS ===
  const handleRepsIncrement = () => {
    const current = parseInt(reps, 10) || 0;
    onRepsChange(current + 1);
  };

  const handleRepsDecrement = () => {
    const current = parseInt(reps, 10) || 0;
    if (current - 1 >= 0) {
      onRepsChange(current - 1);
    } else {
      onRepsChange(0);
    }
  };

  const handleRepsTextChange = (text: string) => {
    if (text === '') {
      onRepsChange(0);
      return;
    }
    const num = parseInt(text, 10);
    if (!isNaN(num)) {
      onRepsChange(num);
    }
  };

  return (
    <View style={styles.container}>
      {/* === WEIGHT SECTION === */}
      <View style={styles.header}>
        <Text style={styles.title}>CURRENT LIFT</Text>
      </View>

      <View style={styles.controlsContainer}>
        {/* Decrement Side */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.adjustButton, styles.adjustButtonLarge]}
            onPress={() => handleWeightDecrement(10)}>
            <Text style={styles.adjustButtonTextLarge}>-10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adjustButton, styles.adjustButtonSmall]}
            onPress={() => handleWeightDecrement(5)}>
            <Text style={styles.adjustButtonTextSmall}>-5</Text>
          </TouchableOpacity>
        </View>

        {/* Center Display */}
        <View style={styles.displayContainer}>
          <TextInput
            style={styles.valueInput}
            value={weight}
            onChangeText={handleWeightTextChange}
            keyboardType="numeric"
            maxLength={5}
          />
          <Text style={styles.unitLabel}>LBS</Text>
        </View>

        {/* Increment Side */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.adjustButton,
              styles.adjustButtonSmall,
              styles.incrementButton,
            ]}
            onPress={() => handleWeightIncrement(5)}>
            <Text style={[styles.adjustButtonTextSmall, styles.incrementText]}>
              +5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.adjustButton,
              styles.adjustButtonLarge,
              styles.incrementButton,
            ]}
            onPress={() => handleWeightIncrement(10)}>
            <Text style={[styles.adjustButtonTextLarge, styles.incrementText]}>
              +10
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* === DIVIDER === */}
      <View style={styles.divider} />

      {/* === REPS SECTION === */}
      <View style={styles.header}>
        <Text style={styles.title}>CURRENT REPS</Text>
      </View>

      <View style={styles.controlsContainer}>
        {/* Decrement Button */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.adjustButton, styles.adjustButtonLarge]}
            onPress={handleRepsDecrement}>
            <Text style={styles.adjustButtonTextLarge}>-1</Text>
          </TouchableOpacity>
        </View>

        {/* Center Display */}
        <View style={styles.displayContainer}>
          <TextInput
            style={styles.valueInput}
            value={reps}
            onChangeText={handleRepsTextChange}
            keyboardType="numeric"
            maxLength={3}
          />
          <Text style={styles.unitLabel}>REPS</Text>
        </View>

        {/* Increment Button */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.adjustButton,
              styles.adjustButtonLarge,
              styles.incrementButton,
            ]}
            onPress={handleRepsIncrement}>
            <Text style={[styles.adjustButtonTextLarge, styles.incrementText]}>
              +1
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  header: {
    marginBottom: theme.spacing.s,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adjustButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  adjustButtonSmall: {
    width: 36,
    height: 36,
  },
  adjustButtonLarge: {
    width: 44,
    height: 44,
  },
  incrementButton: {
    borderColor: theme.colors.actionSuccess,
    backgroundColor: theme.colors.controlSuccessBackground,
  },
  adjustButtonTextSmall: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  adjustButtonTextLarge: {
    color: theme.colors.pureWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  incrementText: {
    color: theme.colors.actionSuccess,
  },
  displayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  valueInput: {
    fontSize: 32,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 0,
    height: 40,
  },
  unitLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    marginVertical: theme.spacing.s,
  },
});
