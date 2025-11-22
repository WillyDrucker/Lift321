/**
 * ============================================================================
 * WORKOUT DURATION CALCULATOR
 * ============================================================================
 *
 * Calculates estimated workout session duration based on total exercise sets.
 *
 * Formula Breakdown:
 * - Rest time: totalSets × 5 minutes (5 minutes rest per set at 10 reps)
 * - Workout time: totalSets × 1 minute (1 minute per exercise set)
 * - Warmup time: 3 minutes (fixed warmup period)
 * - Final rest removal: -5 minutes (no rest after final set)
 *
 * Simplified: (totalSets × 5) + totalSets + 3 - 5
 * Or: (totalSets × 6) - 2
 *
 * Examples:
 * - 6 sets (Standard): (6×5) + 6 + 3 - 5 = 34 minutes
 * - 5 sets (Express): (5×5) + 5 + 3 - 5 = 28 minutes
 * - 4 sets (Maintenance): (4×5) + 4 + 3 - 5 = 22 minutes
 *
 * This calculation will be used for:
 * - Workout overview duration display
 * - Real-time session logging
 * - Progress tracking and estimates
 */

// ============================================================================
// TYPES
// ============================================================================

/**
 * Duration calculation parameters
 */
export type DurationParams = {
  totalSets: number;
  restMinutesPerSet?: number; // Default: 5 minutes (for 10 reps)
  workoutMinutesPerSet?: number; // Default: 1 minute
  warmupMinutes?: number; // Default: 3 minutes
};

/**
 * Duration calculation result
 */
export type DurationResult = {
  totalMinutes: number;
  breakdown: {
    restTime: number;
    workoutTime: number;
    warmupTime: number;
    finalRestRemoval: number;
  };
};

// ============================================================================
// DURATION CALCULATOR
// ============================================================================

/**
 * Calculate workout session duration based on total exercise sets
 *
 * @param params - Duration calculation parameters
 * @returns Calculated duration in minutes with breakdown
 */
export const calculateWorkoutDuration = (params: DurationParams): DurationResult => {
  const {
    totalSets,
    restMinutesPerSet = 5,
    workoutMinutesPerSet = 1,
    warmupMinutes = 3,
  } = params;

  // Validate input
  if (totalSets <= 0) {
    throw new Error('Total sets must be greater than 0');
  }

  // Calculate each component
  const restTime = totalSets * restMinutesPerSet;
  const workoutTime = totalSets * workoutMinutesPerSet;
  const warmupTime = warmupMinutes;
  const finalRestRemoval = restMinutesPerSet; // Remove last rest period

  // Calculate total
  const totalMinutes = restTime + workoutTime + warmupTime - finalRestRemoval;

  return {
    totalMinutes,
    breakdown: {
      restTime,
      workoutTime,
      warmupTime,
      finalRestRemoval,
    },
  };
};

/**
 * Simple helper to get just the total minutes
 *
 * @param totalSets - Total number of exercise sets
 * @returns Total duration in minutes
 */
export const getWorkoutDuration = (totalSets: number): number => {
  return calculateWorkoutDuration({totalSets}).totalMinutes;
};
