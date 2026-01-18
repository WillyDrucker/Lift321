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
import {CheckmarkRegular} from '@/components/icons';

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
  sessionType: 'Standard' | 'Express' | 'Maintenance';
  initialData?: SetData;
  onUpdate: (data: SetData) => void;
  onPress?: () => void;
  isActive?: boolean;
  exerciseNameColor?: string; // Color from ExerciseCard
  repsColor?: string; // Color for logged reps value
  lbsColor?: string; // Color for logged lbs value
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
  exerciseNameColor = theme.colors.actionSuccess,
  repsColor = theme.colors.pureWhite,
  lbsColor = theme.colors.pureWhite,
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
      case 'Standard': return theme.colors.sessionStandard;
      case 'Express': return theme.colors.sessionExpress;
      case 'Maintenance': return theme.colors.sessionMaintenance;
      default: return theme.colors.sessionStandard;
    }
  };

  const sessionColor = getSessionColor();

  return (
    <View style={styles.container}>
      <View style={styles.horizontalConnector} />

      <View
        style={[
          styles.row,
          isActive && styles.activeRow,
        ]}
      >
        {/* Left: Image with checkmark overlay when completed */}
        {exerciseImage && (
          <View style={styles.imageContainer}>
            <Image
              source={exerciseImage}
              style={[styles.image, completed && styles.imageCompleted]}
              resizeMode="cover"
            />
            {completed && (
              <View style={styles.checkmarkOverlay}>
                <CheckmarkRegular size={32} color={theme.colors.actionSuccess} />
              </View>
            )}
          </View>
        )}

        {/* Middle: Info - two layers */}
        <View style={styles.infoContainer}>
          {/* Exercise name spans full width */}
          <Text
            style={[styles.exerciseName, {color: exerciseNameColor}]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {exerciseName.toUpperCase()}
          </Text>

          {/* Set info and values in a row at bottom */}
          <View style={styles.bottomRow}>
            <View style={styles.setInfo}>
              <Text style={[styles.label, !completed && {color: theme.colors.textSecondary}]}>SET </Text>
              <Text style={[styles.highlight, {color: sessionColor}]}>{setNumber}</Text>
              <Text style={[styles.label, !completed && {color: theme.colors.textSecondary}]}> OF </Text>
              <Text style={[styles.highlight, {color: sessionColor}]}>{totalSets}</Text>
            </View>

            {/* Right: Values */}
            <View style={styles.valuesContainer}>
            {/* Reps Display */}
            <View style={styles.valueWrapper}>
                <Text style={[styles.valueLabel, !completed && {color: theme.colors.textSecondary}]}>REPS</Text>
                <View style={styles.valueBox}>
                    <Text style={[styles.valueText, {color: completed ? repsColor : theme.colors.textSecondary}]}>
                        {reps}
                    </Text>
                </View>
            </View>

            {/* Weight Display */}
            <View style={[styles.valueWrapper, {marginRight: 0}]}>
                <Text style={[styles.valueLabel, !completed && {color: theme.colors.textSecondary}]}>LBS</Text>
                <View style={styles.valueBox}>
                    <Text style={[styles.valueText, {color: completed ? lbsColor : theme.colors.textSecondary}]}>
                        {weight}
                    </Text>
                </View>
            </View>
            </View>
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
    marginLeft: 0, // Flush with content edge
    marginRight: -8, // Extend 8dp into card padding (16dp padding - 8dp = 8dp from card edge)
  },
  horizontalConnector: {
    position: 'absolute',
    left: -8, // Connect to tree line 8dp from left edge
    top: 24, // Center of 48dp row
    width: 8, // Spans from tree line to exercise entry
    height: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  row: {
    height: 48,
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 2,
    borderWidth: 2,
    borderColor: theme.colors.backgroundSecondary, // Consistent 2dp border prevents layout shift
    overflow: 'hidden', // Clip image to show border on top
  },
  activeRow: {
    borderColor: theme.colors.customWorkoutBlue, // Blue border for active set
  },
  imageContainer: {
    position: 'relative',
    width: 46,
    height: 46,
    marginRight: 6,
    marginLeft: -1, // Pull image under left border
    marginTop: -1, // Pull image under top border
    marginBottom: -1, // Pull image under bottom border
  },
  image: {
    width: 46,
    height: 46,
    borderRadius: 6,
  },
  imageCompleted: {
    opacity: 0.7,
  },
  checkmarkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  exerciseName: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    paddingRight: 8, // 8dp from right edge
    // Color is passed as prop
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  setInfo: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  label: {
    fontSize: 16,
    color: theme.colors.backgroundTertiary, // Match "CURRENT SET" label color
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  highlight: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 6,
    gap: 4,
  },
  valueLabel: {
    fontSize: theme.typography.fontSize.xxs,
    color: theme.colors.backgroundTertiary, // Match "CURRENT SET" label color
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  valueBox: {
    width: 36,
    height: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  valueText: {
    fontSize: 16,
    lineHeight: 16,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    includeFontPadding: false,
    // Color is passed as prop
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
