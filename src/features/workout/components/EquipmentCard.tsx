// ==========================================================================
// EQUIPMENT CARD COMPONENT
//
// Card for selecting workout equipment types.
// Supports multi-selection with "All Weights" toggle.
//
// Dependencies: theme tokens
// Used by: WorkoutOverviewScreen
// ==========================================================================

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

export type EquipmentType = 'all' | 'free' | 'machines' | 'bands' | 'bodyweight';

type EquipmentCardProps = {
  selectedTypes: Set<EquipmentType>;
  onSelectionChange: (types: Set<EquipmentType>) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  selectedTypes,
  onSelectionChange,
}) => {
  const handleAllWeightsPress = () => {
    onSelectionChange(new Set(['all', 'free', 'machines', 'bands', 'bodyweight']));
  };

  const handleEquipmentPress = (type: 'free' | 'machines' | 'bands' | 'bodyweight') => {
    const newSelected = new Set<EquipmentType>();

    // If all are currently selected, first action is to select only the clicked one
    if (selectedTypes.has('all')) {
      newSelected.add(type);
    } else {
      // Normal toggle behavior - copy previous selections
      selectedTypes.forEach(item => newSelected.add(item));

      // Toggle the equipment type
      if (newSelected.has(type)) {
        newSelected.delete(type);
      } else {
        newSelected.add(type);
      }

      // Check if all equipment types are now selected
      if (newSelected.has('free') && newSelected.has('machines') &&
          newSelected.has('bands') && newSelected.has('bodyweight')) {
        newSelected.add('all');
      }
    }

    onSelectionChange(newSelected);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>CURRENT EQUIPMENT</Text>

      {/* Equipment Type Selectors */}
      <View style={styles.typesContainer}>
        {/* First Row: All Weights, Free Weights, Machines */}
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeButton, selectedTypes.has('all') && styles.typeSelected]}
            onPress={handleAllWeightsPress}
            activeOpacity={1}
          >
            <Text style={styles.typeText}>ALL{'\n'}WEIGHTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, selectedTypes.has('free') && styles.typeSelected]}
            onPress={() => handleEquipmentPress('free')}
            activeOpacity={1}
          >
            <Text style={styles.typeText}>FREE{'\n'}WEIGHTS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, selectedTypes.has('machines') && styles.typeSelected]}
            onPress={() => handleEquipmentPress('machines')}
            activeOpacity={1}
          >
            <Text style={styles.typeText}>MACHINES</Text>
          </TouchableOpacity>
        </View>

        {/* Second Row: Bands, Bodyweight */}
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeButton, selectedTypes.has('bands') && styles.typeSelected]}
            onPress={() => handleEquipmentPress('bands')}
            activeOpacity={1}
          >
            <Text style={styles.typeText}>BANDS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, selectedTypes.has('bodyweight') && styles.typeSelected]}
            onPress={() => handleEquipmentPress('bodyweight')}
            activeOpacity={1}
          >
            <Text style={styles.typeText}>BODYWEIGHT</Text>
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
  card: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.s,
  },
  typesContainer: {
    gap: theme.spacing.xs,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.xs,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  typeSelected: {
    backgroundColor: theme.colors.actionSuccess,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.primary,
    textAlign: 'center',
  },
});
