// ==========================================================================
// PLAN FOCUS CALCULATOR
//
// Centralized utility for calculating target reps and rest times based on
// the selected plan focus (Strength/Balanced/Growth).
//
// Strength: Lower reps, longer rest (power/strength focused)
// Balanced: Default reps and rest (general fitness)
// Growth: Higher reps, shorter rest (hypertrophy focused)
//
// Dependencies: None
// Used by: ActiveWorkoutContext, WorkoutOverviewScreen
// ==========================================================================

// ============================================================================
// TYPES
// ============================================================================

export type PlanFocus = 'strength' | 'balanced' | 'growth';

export type PlanFocusConfig = {
  targetReps: number;
  restMinutes: number;
};

// ============================================================================
// CONSTANTS
// ============================================================================

// Rep adjustments for Strength focus (reduce reps for heavier weight)
const STRENGTH_ADJUSTMENTS: Record<number, number> = {
  2: 0,   // Can't go lower than 2
  4: -2,
  6: -2,
  8: -2,
  10: -4,
  12: -4,
  14: -4,
  16: -4,
  18: -4,
  20: -4,
};

// Rep adjustments for Growth focus (increase reps for hypertrophy)
const GROWTH_ADJUSTMENTS: Record<number, number> = {
  2: 6,
  4: 6,
  6: 6,
  8: 6,
  10: 6,
  12: 4,
  14: 4,
  16: 4,
  18: 2,  // Capped at 20
  20: 0,  // Can't go higher than 20
};

// Rest time in minutes based on rep count
const REST_TIME_MAP: Record<number, number> = {
  2: 7.0,
  4: 6.5,
  6: 6.0,
  8: 5.5,
  10: 5.0,
  12: 4.5,
  14: 4.0,
  16: 4.0,
  18: 3.5,
  20: 3.0,
};

// Min/max bounds for reps
const MIN_REPS = 2;
const MAX_REPS = 20;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Find the closest key in a record to a given value
 * Used for interpolating values when exact match not found
 */
const findClosestKey = (value: number, record: Record<number, number>): number => {
  const keys = Object.keys(record).map(Number).sort((a, b) => a - b);

  // Find closest key
  let closest = keys[0];
  let minDiff = Math.abs(value - closest);

  for (const key of keys) {
    const diff = Math.abs(value - key);
    if (diff < minDiff) {
      minDiff = diff;
      closest = key;
    }
  }

  return closest;
};

/**
 * Get adjustment value, interpolating if exact match not found
 */
const getAdjustment = (
  defaultReps: number,
  adjustments: Record<number, number>,
): number => {
  if (adjustments[defaultReps] !== undefined) {
    return adjustments[defaultReps];
  }

  // Find closest match for non-standard rep counts
  const closestKey = findClosestKey(defaultReps, adjustments);
  return adjustments[closestKey];
};

// ============================================================================
// MAIN FUNCTIONS
// ============================================================================

/**
 * Calculate target reps based on default reps and plan focus
 *
 * @param defaultReps - The default/base rep count for the exercise
 * @param planFocus - The selected plan focus (strength/balanced/growth)
 * @returns Adjusted target rep count
 */
export const calculateTargetReps = (
  defaultReps: number,
  planFocus: PlanFocus,
): number => {
  if (planFocus === 'balanced') {
    return defaultReps;
  }

  const adjustments = planFocus === 'strength'
    ? STRENGTH_ADJUSTMENTS
    : GROWTH_ADJUSTMENTS;

  const adjustment = getAdjustment(defaultReps, adjustments);
  const adjustedReps = defaultReps + adjustment;

  // Clamp to valid range
  return Math.max(MIN_REPS, Math.min(MAX_REPS, adjustedReps));
};

/**
 * Calculate rest time in minutes based on target rep count
 * Higher reps = shorter rest (hypertrophy)
 * Lower reps = longer rest (strength/power)
 *
 * @param targetReps - The target rep count
 * @returns Rest time in minutes
 */
export const calculateRestMinutes = (targetReps: number): number => {
  // Exact match
  if (REST_TIME_MAP[targetReps] !== undefined) {
    return REST_TIME_MAP[targetReps];
  }

  // Interpolate for non-standard rep counts
  const keys = Object.keys(REST_TIME_MAP).map(Number).sort((a, b) => a - b);

  // Find surrounding keys for interpolation
  let lowerKey = keys[0];
  let upperKey = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (targetReps >= keys[i] && targetReps <= keys[i + 1]) {
      lowerKey = keys[i];
      upperKey = keys[i + 1];
      break;
    }
  }

  // Handle edge cases
  if (targetReps <= lowerKey) return REST_TIME_MAP[lowerKey];
  if (targetReps >= upperKey) return REST_TIME_MAP[upperKey];

  // Linear interpolation
  const lowerRest = REST_TIME_MAP[lowerKey];
  const upperRest = REST_TIME_MAP[upperKey];
  const ratio = (targetReps - lowerKey) / (upperKey - lowerKey);

  return lowerRest + (upperRest - lowerRest) * ratio;
};

/**
 * Get complete plan focus configuration
 * Convenience function that returns both target reps and rest time
 *
 * @param defaultReps - The default/base rep count for the exercise
 * @param planFocus - The selected plan focus (strength/balanced/growth)
 * @returns Object containing targetReps and restMinutes
 */
export const getPlanFocusConfig = (
  defaultReps: number,
  planFocus: PlanFocus,
): PlanFocusConfig => {
  const targetReps = calculateTargetReps(defaultReps, planFocus);
  const restMinutes = calculateRestMinutes(targetReps);

  return {
    targetReps,
    restMinutes,
  };
};

/**
 * Get default rest time (for balanced at 10 reps)
 * Useful for components that need the standard rest time
 */
export const DEFAULT_REST_MINUTES = 5;
export const DEFAULT_TARGET_REPS = 10;
