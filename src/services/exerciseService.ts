/**
 * ============================================================================
 * EXERCISE SERVICE
 * ============================================================================
 *
 * Service layer for loading and filtering exercise data from exercises.json.
 * Handles session type logic, equipment filtering, and exercise selection.
 *
 * Session Type Logic (Lift 3-2-1):
 * - Standard: Major1 (3 sets) + Minor1 (2 sets) + Tertiary (1 set) = 6 total
 * - Express: Major1 (3 sets) + Minor1 (2 sets) = 5 total (no Tertiary)
 * - Maintenance: Major1 (2 sets) + Minor1 (2 sets) = 4 total (no Tertiary, reduced sets)
 *
 * Dependencies: exercises.json, exercise.types.ts
 * Used by: WorkoutOverviewScreen, workout planning screens
 */

// ============================================================================
// IMPORTS
// ============================================================================

import exercisesData from '@/data/exercises.json';
import type {Exercise, ExerciseFilters} from '@/types/exercise.types';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Session type for workout filtering
 */
export type SessionType = 'Standard' | 'Express' | 'Maintenance';

/**
 * Processed exercise group with adjusted sets
 */
export type ProcessedExercise = Exercise & {
  adjustedSets: number; // Sets adjusted for session type (e.g., Maintenance reduces Major1 from 3 to 2)
  originalSets: number; // Original sets from JSON
};

/**
 * Exercise service result with grouped exercises and metadata
 */
export type ExerciseServiceResult = {
  exercises: ProcessedExercise[];
  totalSets: number;
  sessionType: SessionType;
  bodyPart: string;
  breakdown: {
    major1Sets: number;
    minor1Sets: number;
    tertiarySets: number;
  };
};

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Muscle group classifications
 */
const MUSCLE_GROUPS = {
  MAJOR1: 'Major1',
  MINOR1: 'Minor1',
  MAJOR2: 'Major2',
  TERTIARY: 'Tertiary',
} as const;

/**
 * Session type set limits
 */
const SESSION_SET_LIMITS = {
  Standard: {
    major1: 3,
    minor1: 2,
    tertiary: 1,
    includeTertiary: true,
  },
  Express: {
    major1: 3,
    minor1: 2,
    tertiary: 0,
    includeTertiary: false,
  },
  Maintenance: {
    major1: 2,
    minor1: 2,
    tertiary: 0,
    includeTertiary: false,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Map workout type to body part(s) in exercise data
 * Handles combined workouts like 'Back & Tris' that span multiple body parts
 */
const getBodyPartsForWorkout = (workoutType: string): string[] => {
  if (workoutType === 'Back & Tris') {
    return ['Back', 'Triceps'];
  }
  return [workoutType];
};

/**
 * Filter exercises by body part(s)
 * Supports combined workouts that target multiple body parts
 */
const filterByBodyPart = (exercises: Exercise[], workoutType: string): Exercise[] => {
  const bodyParts = getBodyPartsForWorkout(workoutType);
  return exercises.filter((ex) => bodyParts.includes(ex.body_part));
};

/**
 * Group exercises by muscle group
 */
const groupByMuscleGroup = (exercises: Exercise[]): Record<string, Exercise[]> => {
  return exercises.reduce((acc, exercise) => {
    const group = exercise.muscle_group;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);
};

/**
 * Select one exercise from a group based on equipment preferences
 * For now, just select the first one (equipment filtering will be added later)
 */
const selectExerciseFromGroup = (exercises: Exercise[]): Exercise | null => {
  if (exercises.length === 0) return null;

  // TODO: Add equipment filtering logic here
  // For now, select first exercise (typically most common equipment)
  return exercises[0];
};

/**
 * Process exercise with adjusted sets based on session type
 * For combined workouts, Major2 exercises are treated as Tertiary
 */
const processExercise = (
  exercise: Exercise,
  sessionType: SessionType,
  isCombinedWorkout: boolean = false,
): ProcessedExercise => {
  const originalSets = parseInt(exercise.sets, 10);
  const limits = SESSION_SET_LIMITS[sessionType];

  let adjustedSets = originalSets;

  // Apply session type limits
  if (exercise.muscle_group === MUSCLE_GROUPS.MAJOR1) {
    adjustedSets = Math.min(originalSets, limits.major1);
  } else if (exercise.muscle_group === MUSCLE_GROUPS.MINOR1) {
    adjustedSets = Math.min(originalSets, limits.minor1);
  } else if (exercise.muscle_group === MUSCLE_GROUPS.TERTIARY) {
    adjustedSets = limits.includeTertiary ? Math.min(originalSets, limits.tertiary) : 0;
  } else if (exercise.muscle_group === MUSCLE_GROUPS.MAJOR2 && isCombinedWorkout) {
    // For combined workouts, Major2 exercises act as Tertiary (1 set)
    adjustedSets = limits.includeTertiary ? Math.min(originalSets, limits.tertiary) : 0;
  }

  return {
    ...exercise,
    adjustedSets,
    originalSets,
  };
};

// ============================================================================
// MAIN SERVICE FUNCTIONS
// ============================================================================

/**
 * Get exercises for a specific body part and session type
 *
 * @param bodyPart - Target body part (e.g., "Chest", "Back", "Legs")
 * @param sessionType - Session type (Standard/Express/Maintenance)
 * @param filters - Optional additional filters (equipment, etc.)
 * @returns Processed exercises with total sets and breakdown
 */
export const getExercisesForWorkout = (
  bodyPart: string,
  sessionType: SessionType,
  filters?: ExerciseFilters,
): ExerciseServiceResult => {
  // Load all exercises
  const allExercises = exercisesData as Exercise[];

  // Filter by body part
  const bodyPartExercises = filterByBodyPart(allExercises, bodyPart);

  // Group by muscle group
  const grouped = groupByMuscleGroup(bodyPartExercises);

  // Select one exercise from each group
  const selectedExercises: Exercise[] = [];
  const isCombinedWorkout = bodyPart === 'Back & Tris';

  // Major1 exercises
  if (grouped[MUSCLE_GROUPS.MAJOR1]) {
    const major1 = selectExerciseFromGroup(grouped[MUSCLE_GROUPS.MAJOR1]);
    if (major1) selectedExercises.push(major1);
  }

  // Minor1 exercises
  if (grouped[MUSCLE_GROUPS.MINOR1]) {
    const minor1 = selectExerciseFromGroup(grouped[MUSCLE_GROUPS.MINOR1]);
    if (minor1) selectedExercises.push(minor1);
  }

  // Tertiary exercises (only if session includes them)
  const limits = SESSION_SET_LIMITS[sessionType];
  if (limits.includeTertiary) {
    // For combined workouts like "Back & Tris", use Major2 (Triceps) as Tertiary
    // Standard workouts use the Tertiary muscle group
    const tertiaryGroup = isCombinedWorkout ? MUSCLE_GROUPS.MAJOR2 : MUSCLE_GROUPS.TERTIARY;
    if (grouped[tertiaryGroup]) {
      const tertiary = selectExerciseFromGroup(grouped[tertiaryGroup]);
      if (tertiary) selectedExercises.push(tertiary);
    }
  }

  // Process exercises with adjusted sets
  const processedExercises = selectedExercises.map((ex) =>
    processExercise(ex, sessionType, isCombinedWorkout),
  );

  // Calculate totals and breakdown
  let major1Sets = 0;
  let minor1Sets = 0;
  let tertiarySets = 0;

  processedExercises.forEach((ex) => {
    if (ex.muscle_group === MUSCLE_GROUPS.MAJOR1) {
      major1Sets += ex.adjustedSets;
    } else if (ex.muscle_group === MUSCLE_GROUPS.MINOR1) {
      minor1Sets += ex.adjustedSets;
    } else if (ex.muscle_group === MUSCLE_GROUPS.TERTIARY) {
      tertiarySets += ex.adjustedSets;
    } else if (ex.muscle_group === MUSCLE_GROUPS.MAJOR2 && isCombinedWorkout) {
      // For combined workouts, Major2 counts toward Tertiary sets
      tertiarySets += ex.adjustedSets;
    }
  });

  const totalSets = major1Sets + minor1Sets + tertiarySets;

  return {
    exercises: processedExercises,
    totalSets,
    sessionType,
    bodyPart,
    breakdown: {
      major1Sets,
      minor1Sets,
      tertiarySets,
    },
  };
};

/**
 * Get all unique body parts from exercise data
 *
 * @returns Array of unique body part names
 */
export const getAllBodyParts = (): string[] => {
  const allExercises = exercisesData as Exercise[];
  const bodyParts = new Set(allExercises.map((ex) => ex.body_part));
  return Array.from(bodyParts).sort();
};

/**
 * Get exercise count for a specific body part and session type
 * Quick helper for UI display without loading full exercise data
 *
 * @param bodyPart - Target body part
 * @param sessionType - Session type
 * @returns Total sets count
 */
export const getExerciseSetCount = (
  bodyPart: string,
  sessionType: SessionType,
): number => {
  const result = getExercisesForWorkout(bodyPart, sessionType);
  return result.totalSets;
};
