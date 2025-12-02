// ==========================================================================
// WORKOUT CARD - HELPERS
//
// Helper functions for WorkoutCard component.
// Extracted for maintainability and file size management.
//
// Dependencies: theme tokens
// Used by: WorkoutCard.tsx
// ==========================================================================

import {ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type BodyPart = 'Chest' | 'Arms' | 'Shoulders' | 'Back & Tris' | 'Legs';
export type CustomWorkout = 'Custom' | 'Work-As-You-Go' | 'SuperSet' | 'Partner Mode';
export type WorkoutType = BodyPart | CustomWorkout;

// === HELPER FUNCTIONS ===

/**
 * Helper to check if workout type is a body part
 */
export const isBodyPart = (workoutType: WorkoutType): workoutType is BodyPart => {
  return ['Chest', 'Arms', 'Shoulders', 'Back & Tris', 'Legs'].includes(workoutType);
};

/**
 * Gets workout card title based on workout type
 */
export const getWorkoutTitle = (workoutType: WorkoutType): string => {
  if (isBodyPart(workoutType)) {
    return workoutType;
  }

  switch (workoutType) {
    case 'Custom':
      return 'Custom Workout';
    case 'Work-As-You-Go':
      return 'Work-As-You-Go';
    case 'SuperSet':
      return 'SuperSet Mode';
    case 'Partner Mode':
      return 'Partner Mode';
  }
};

/**
 * Gets custom workout color based on workout type
 */
export const getCustomWorkoutColor = (workoutType: WorkoutType): string | null => {
  if (isBodyPart(workoutType)) {
    return null;
  }

  switch (workoutType) {
    case 'Custom':
      return theme.colors.customWorkoutBlue;
    case 'Work-As-You-Go':
      return theme.colors.customWorkoutBlue;
    case 'SuperSet':
      return theme.colors.customWorkoutYellow;
    case 'Partner Mode':
      return theme.colors.customWorkoutCyan;
    default:
      return null;
  }
};

/**
 * Gets workout image source based on workout type
 * Returns null if image doesn't exist yet
 */
export const getWorkoutImage = (workoutType: WorkoutType): ImageSourcePropType | null => {
  switch (workoutType) {
    // Body part workouts
    case 'Chest':
      return require('@/assets/images/workouts/chest.png');
    case 'Arms':
      return require('@/assets/images/workouts/arms.png');
    case 'Shoulders':
      return require('@/assets/images/workouts/shoulders.png');
    case 'Back & Tris':
      return require('@/assets/images/workouts/back.png');
    case 'Legs':
      return require('@/assets/images/workouts/legs.png');

    // Custom workouts
    case 'Custom':
      return require('@/assets/images/workouts/custom.png');
    case 'Work-As-You-Go':
      return require('@/assets/images/workouts/work-as-you-go.png');
    case 'SuperSet':
      return require('@/assets/images/workouts/superset.png');
    case 'Partner Mode':
      return require('@/assets/images/workouts/partner-mode.png');
  }
};
