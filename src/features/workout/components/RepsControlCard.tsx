// ==========================================================================
// REPS CONTROL CARD COMPONENT
//
// Large control card for adjusting global/current exercise reps.
// Features big increment/decrement buttons and direct reps input/display.
// Mirrors WeightControlCard layout/logic.
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

type RepsControlCardProps = {
  initialReps?: number;
  onRepsChange: (reps: number) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const RepsControlCard: React.FC<RepsControlCardProps> = ({
  initialReps = 10, // Default placeholder if parent doesn't provide
  onRepsChange,
}) => {
  // Use prop directly as source of truth
  const reps = initialReps.toString();

  const handleIncrement = (amount: number) => {
    const current = parseInt(reps, 10) || 0;
    onRepsChange(current + amount);
  };

  const handleDecrement = (amount: number) => {
    const current = parseInt(reps, 10) || 0;
    if (current - amount >= 0) {
        onRepsChange(current - amount);
    } else {
        onRepsChange(0);
    }
  };

  const handleTextChange = (text: string) => {
      // Allow empty string for typing
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
      <View style={styles.header}>
         <Text style={styles.title}>CURRENT REPS</Text>
      </View>

      <View style={styles.controlsContainer}>
        {/* Decrement Side */}
        <View style={styles.buttonGroup}>
             <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonLarge]} 
                onPress={() => handleDecrement(1)}
            >
                <Text style={styles.adjustButtonTextLarge}>-1</Text>
            </TouchableOpacity>
        </View>

        {/* Center Display */}
        <View style={styles.displayContainer}>
             <TextInput
                style={styles.weightInput}
                value={reps}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={3}
             />
             <Text style={styles.unitLabel}>REPS</Text>
        </View>

        {/* Increment Side */}
         <View style={styles.buttonGroup}>
             <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonLarge, styles.incrementButton]} 
                onPress={() => handleIncrement(1)}
            >
                <Text style={[styles.adjustButtonTextLarge, styles.incrementText]}>+1</Text>
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
     backgroundColor: 'rgba(0, 255, 0, 0.1)',
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
  weightInput: {
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
});
