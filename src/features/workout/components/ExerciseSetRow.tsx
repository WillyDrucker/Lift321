// ==========================================================================
// EXERCISE SET ROW COMPONENT (DISPLAY ONLY / EDIT MODE)
//
// Read-only row for a single exercise set.
// Displays weight, reps, and completion status.
// In Edit Mode, allows selection and deletion.
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
  TouchableOpacity,
} from 'react-native';
import {theme} from '@/theme';
import {TrashIcon} from '@/components/icons';

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
  exerciseName: string; // For logging/key purposes
  exerciseImage?: ImageSourcePropType; // Optional image
  sessionType: 'standard' | 'express' | 'maintenance';
  initialData?: SetData;
  onUpdate: (data: SetData) => void; // Kept for interface compatibility, but unused
  isEditing?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  isActive?: boolean;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ExerciseSetRow: React.FC<ExerciseSetRowProps> = ({
  setNumber,
  totalSets,
  targetReps,
  exerciseName,
  exerciseImage,
  sessionType,
  initialData,
  isEditing = false,
  onPress,
  onDelete,
  isActive = false,
}) => {
  // Use prop data or defaults
  const weight = initialData?.weight || '';
  const reps = initialData?.reps || targetReps.toString();
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

  const ContainerComponent = isEditing ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <View style={[styles.horizontalConnector, isActive && {backgroundColor: theme.colors.actionSuccess}]} />
      
      <ContainerComponent
        style={[
          styles.row, 
          completed && !isEditing && {backgroundColor: theme.colors.backgroundSecondary}, // Dim when completed (unless editing)
          isEditing && completed && styles.rowEditing, // Only show editing outline if completed
        ]}
        onPress={isEditing ? onPress : undefined}
        activeOpacity={0.7}
      >
        {/* Left: Image */}
        {exerciseImage && (
          <Image
            source={exerciseImage}
            style={[styles.image, completed && !isEditing && {opacity: 0.5}]}
            resizeMode="cover"
          />
        )}

        {/* Middle: Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.exerciseName, completed && !isEditing && {color: theme.colors.textSecondary}]}>
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
                <View style={[styles.valueBox, completed && !isEditing && styles.valueBoxCompleted]}>
                    <Text style={[styles.valueText, completed && !isEditing && styles.valueTextCompleted]}>
                        {weight || '0'}
                    </Text>
                </View>
            </View>

            {/* Reps Display */}
            <View style={styles.valueWrapper}>
                <Text style={styles.valueLabel}>REPS</Text>
                <View style={[styles.valueBox, completed && !isEditing && styles.valueBoxCompleted]}>
                    <Text style={[styles.valueText, completed && !isEditing && styles.valueTextCompleted]}>
                        {reps}
                    </Text>
                </View>
            </View>
            
            {/* Checkbox OR Delete Button */}
            {isEditing ? (
              <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                <TrashIcon width={20} height={20} />
              </TouchableOpacity>
            ) : (
              <View style={[
                  styles.statusIndicator, 
                  completed ? {backgroundColor: sessionColor} : {borderColor: theme.colors.textSecondary, borderWidth: 1}
              ]}>
                  {completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            )}
        </View>
      </ContainerComponent>
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
  rowEditing: {
    borderColor: theme.colors.actionWarning, // Visual cue for edit mode interaction
    backgroundColor: theme.colors.backgroundPrimary,
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
    fontSize: 10, 
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    marginBottom: 2,
  },
  setInfo: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  highlight: {
    fontSize: 10,
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
    fontSize: 8,
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
    fontSize: 12,
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
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
