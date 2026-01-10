// ==========================================================================
// EXERCISE TREE CARD COMPONENT
//
// Card displaying workout exercises in a tree structure with visual connectors.
// Shows all exercises and their sets for the current session.
//
// Dependencies: theme tokens, ExercisePreviewRow
// Used by: WorkoutOverviewScreen
// ==========================================================================

import React, {useMemo} from 'react';
import {View, Text, StyleSheet, type ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';
import {ExercisePreviewRow, type SessionType} from './ExercisePreviewRow';

// ============================================================================
// TYPES
// ============================================================================

type ExerciseData = {
  exercise_name: string;
  adjustedSets: number;
};

type ExerciseTreeCardProps = {
  exercises: ExerciseData[];
  sessionType: SessionType;
  getExerciseImage: (name: string) => ImageSourcePropType;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const TREE_CONFIG = {
  startOffset: 25,
  setHeight: 50,
  setMargin: 5,
  groupSpacer: 32,
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

export const ExerciseTreeCard: React.FC<ExerciseTreeCardProps> = ({
  exercises,
  sessionType,
  getExerciseImage,
}) => {
  // Calculate dynamic vertical line height
  const verticalLineHeight = useMemo(() => {
    let totalHeight = TREE_CONFIG.startOffset;
    let exerciseCount = 0;

    exercises.forEach((exercise) => {
      if (exercise.adjustedSets === 0) return;

      // Add spacer before this group (except first group)
      if (exerciseCount > 0) {
        totalHeight += TREE_CONFIG.groupSpacer;
      }

      // Add height for all sets in this exercise
      totalHeight += exercise.adjustedSets * (TREE_CONFIG.setHeight + TREE_CONFIG.setMargin);
      exerciseCount++;
    });

    // Adjust to end at center of last set
    totalHeight -= TREE_CONFIG.setMargin;
    totalHeight -= (TREE_CONFIG.setHeight / 2);
    totalHeight += (TREE_CONFIG.setMargin / 2);

    return totalHeight;
  }, [exercises]);

  // Render exercise groups
  const renderExercises = () => {
    const exerciseGroups: JSX.Element[] = [];
    let hasRenderedFirst = false;

    exercises.forEach((exercise, index) => {
      // Skip exercises with 0 adjusted sets
      if (exercise.adjustedSets === 0) return;

      // Add spacer between exercise groups
      if (hasRenderedFirst) {
        exerciseGroups.push(
          <View key={`spacer-${index}`} style={styles.groupSpacer} />
        );
      }
      hasRenderedFirst = true;

      // Render all sets for this exercise
      const sets: JSX.Element[] = [];
      for (let setNumber = 1; setNumber <= exercise.adjustedSets; setNumber++) {
        sets.push(
          <ExercisePreviewRow
            key={`${exercise.exercise_name}-set-${setNumber}`}
            exerciseName={exercise.exercise_name}
            setNumber={setNumber}
            totalSets={exercise.adjustedSets}
            reps={10}
            sessionType={sessionType}
            imageSource={getExerciseImage(exercise.exercise_name)}
            onPress={() => console.log(`${exercise.exercise_name} Set ${setNumber} selected`)}
          />
        );
      }

      exerciseGroups.push(
        <View key={`group-${exercise.exercise_name}`} style={styles.exerciseGroup}>
          {sets}
        </View>
      );
    });

    return exerciseGroups;
  };

  return (
    <View style={styles.card}>
      {/* Header with title connector */}
      <View style={styles.header}>
        <Text style={styles.title}>TODAY'S WORKOUT</Text>
        <View style={styles.titleConnector} />
      </View>

      {/* Exercise Tree Structure */}
      <View style={styles.treeContainer}>
        {/* Vertical line */}
        <View style={[styles.verticalLine, {height: verticalLineHeight}]} />

        {/* Exercise Groups */}
        {renderExercises()}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
  },
  titleConnector: {
    width: 10,
    height: 2,
    backgroundColor: theme.colors.actionSuccess,
    marginLeft: 4,
  },
  treeContainer: {
    position: 'relative',
    paddingLeft: 28,
  },
  verticalLine: {
    position: 'absolute',
    left: 9,
    top: 0,
    width: 2,
    backgroundColor: theme.colors.actionSuccess,
  },
  exerciseGroup: {
    // Container for exercise sets
  },
  groupSpacer: {
    height: TREE_CONFIG.groupSpacer,
  },
});
