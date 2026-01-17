// ==========================================================================
// EXERCISE SET ROW COMPONENT
//
// Display-only row for a single exercise set.
// Displays weight, reps, and completion status.
//
// Dependencies: theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

export type SetData = {
  weight: string;
  reps: string;
  completed: boolean;
};

type ExerciseSetRowProps = {
  setNumber: number;
  totalSets: number;
  targetReps: number;
  exerciseName: string;
  exerciseImage?: ImageSourcePropType;
  sessionType: 'standard' | 'express' | 'maintenance';
  initialData?: SetData;
  onUpdate: (data: SetData) => void;
  onPress?: () => void;
  isActive?: boolean;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({
  setNumber,
  totalSets,
  exerciseName,
  exerciseImage,
  sessionType,
  initialData,
  isActive = false,
}) => {
  // Use prop data or defaults (0 for unlogged sets)
  const weight = initialData?.weight || '0';
  const reps = initialData?.reps || '0';
  const completed = initialData?.completed || false;

  // ==========================================================================
  // RENDER
  // ==========================================================================

  const getSessionColor = () => {
    switch (sessionType) {
      case 'standard': return theme.colors.sessionStandard;
      case 'express': return theme.colors.sessionExpress;
      case 'maintenance': return theme.colors.sessionMaintenance;
      default: return theme.colors.actionSuccess;
    }
  };

  const sessionColor = getSessionColor();

  return (
    <View style={styles.container}>
      <View style={[styles.horizontalConnector, isActive && {backgroundColor: theme.colors.actionSuccess}]} />

      <View
        style={[
          styles.row,
          completed && {backgroundColor: theme.colors.backgroundSecondary},
        ]}
      >
        {/* Left: Image */}
        {exerciseImage && (
          <Image
            source={exerciseImage}
            style={[styles.image, completed && {opacity: 0.5}]}
            resizeMode="cover"
          />
        )}

        {/* Middle: Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.exerciseName, completed && {color: theme.colors.textSecondary}]}>
            {exerciseName.toUpperCase()}
          </Text>

          <View style={styles.setInfo}>
            <Text style={styles.label}>SET </Text>
            <Text style={[styles.highlight, {color: sessionColor}]}>{setNumber}</Text>
            <Text style={styles.label}> OF </Text>
            <Text style={[styles.highlight, {color: sessionColor}]}>{totalSets}</Text>
          </View>
        </View>

        {/* Right: Values */}
        <View style={styles.valuesContainer}>
            {/* Weight Display */}
            <View style={styles.valueWrapper}>
                <Text style={styles.valueLabel}>LBS</Text>
                <View style={[styles.valueBox, completed && styles.valueBoxCompleted]}>
                    <Text style={[styles.valueText, completed && styles.valueTextCompleted]}>
                        {weight}
                    </Text>
                </View>
            </View>

            {/* Reps Display */}
            <View style={styles.valueWrapper}>
                <Text style={styles.valueLabel}>REPS</Text>
                <View style={[styles.valueBox, completed && styles.valueBoxCompleted]}>
                    <Text style={[styles.valueText, completed && styles.valueTextCompleted]}>
                        {reps}
                    </Text>
                </View>
            </View>

            {/* Completion Indicator */}
            <View style={styles.statusIndicator}>
              {completed && (
                <>
                  <View style={[StyleSheet.absoluteFill, {backgroundColor: sessionColor, borderRadius: 10}]} />
                  <Text style={styles.checkmark}>✓</Text>
                </>
              )}
            </View>
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
    position: 'relative',
    marginBottom: 5,
    marginLeft: 16,
  },
  horizontalConnector: {
    position: 'absolute',
    left: -16,
    top: 25,
    width: 16,
    height: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  row: {
    height: 50,
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: theme.colors.backgroundSecondary,
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 6,
    marginRight: 6,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  exerciseName: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    marginBottom: 2,
  },
  setInfo: {
    flexDirection: 'row',
  },
  label: {
    fontSize: theme.typography.fontSize.xxs,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  highlight: {
    fontSize: theme.typography.fontSize.xxs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 6,
  },
  valueWrapper: {
    alignItems: 'center',
    marginRight: 6,
    width: 36,
  },
  valueLabel: {
    fontSize: theme.typography.fontSize.xxs,
    color: theme.colors.textSecondary,
    marginBottom: 2,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  valueBox: {
    width: 36,
    height: 24,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueBoxCompleted: {
      // Optional: distinct style for completed background?
  },
  valueText: {
    color: theme.colors.pureWhite,
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
  },
  valueTextCompleted: {
    color: theme.colors.textSecondary,
  },
  statusIndicator: {
    width: 20, 
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
  },
  checkmark: {
    color: theme.colors.pureBlack,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
