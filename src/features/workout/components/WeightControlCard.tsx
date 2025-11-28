// ==========================================================================
// WEIGHT CONTROL CARD COMPONENT
//
// Large control card for adjusting global/current exercise weight.
// Features big increment/decrement buttons and direct weight input/display.
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

type WeightControlCardProps = {
  initialWeight?: number;
  onWeightChange: (weight: number) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WeightControlCard: React.FC<WeightControlCardProps> = ({
  initialWeight = 135, // Default placeholder if parent doesn't provide
  onWeightChange,
}) => {
  // Use prop directly as source of truth
  const weight = initialWeight.toString();

  const handleIncrement = (amount: number) => {
    const current = parseFloat(weight) || 0;
    onWeightChange(current + amount);
  };

  const handleDecrement = (amount: number) => {
    const current = parseFloat(weight) || 0;
    if (current - amount >= 0) {
        onWeightChange(current - amount);
    } else {
        onWeightChange(0);
    }
  };

  const handleTextChange = (text: string) => {
      // Allow empty string for typing
      if (text === '') {
          // We can't pass empty string to number callback easily without NaN
          // But for UX, let's keep it simple.
          onWeightChange(0);
          return;
      }
      const num = parseFloat(text);
      if (!isNaN(num)) {
          onWeightChange(num);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.title}>CURRENT LIFT</Text>
      </View>

      <View style={styles.controlsContainer}>
        {/* Decrement Side */}
        <View style={styles.buttonGroup}>
            <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonSmall]} 
                onPress={() => handleDecrement(5)}
            >
                <Text style={styles.adjustButtonTextSmall}>-5</Text>
            </TouchableOpacity>
             <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonLarge]} 
                onPress={() => handleDecrement(10)}
            >
                <Text style={styles.adjustButtonTextLarge}>-10</Text>
            </TouchableOpacity>
        </View>

        {/* Center Display */}
        <View style={styles.displayContainer}>
             <TextInput
                style={styles.weightInput}
                value={weight}
                onChangeText={handleTextChange}
                keyboardType="numeric"
                maxLength={5}
             />
             <Text style={styles.unitLabel}>LBS</Text>
        </View>

        {/* Increment Side */}
         <View style={styles.buttonGroup}>
            <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonLarge, styles.incrementButton]} 
                onPress={() => handleIncrement(10)}
            >
                <Text style={[styles.adjustButtonTextLarge, styles.incrementText]}>+10</Text>
            </TouchableOpacity>
             <TouchableOpacity 
                style={[styles.adjustButton, styles.adjustButtonSmall, styles.incrementButton]} 
                onPress={() => handleIncrement(5)}
            >
                <Text style={[styles.adjustButtonTextSmall, styles.incrementText]}>+5</Text>
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
