// ==========================================================================
// WORKOUT SCHEDULE UTILITY
//
// Day-of-week logic for workout recommendations and scheduling.
// Provides simple POC logic to determine recommended workouts based on current day.
//
// Dependencies: BodyPart type from WorkoutCard
// Used by: HomePage for welcome messages and workout card positioning
// ==========================================================================

import type {BodyPart} from '@/components/WorkoutCard';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Weekly workout schedule mapping day of week to body part
 * Monday = 1, Tuesday = 2, ..., Friday = 5
 * Saturday (6) and Sunday (0) are rest days
 */
const WORKOUT_SCHEDULE: Record<number, BodyPart> = {
  1: 'Chest',          // Monday
  2: 'Arms',           // Tuesday
  3: 'Shoulders',      // Wednesday
  4: 'Back & Tris',    // Thursday
  5: 'Legs',           // Friday
};

/**
 * Ordered list of body parts for indexing
 * Used to calculate scroll positions in WorkoutCardsScroller
 */
const BODY_PARTS_ORDER: BodyPart[] = [
  'Chest',
  'Arms',
  'Shoulders',
  'Back & Tris',
  'Legs',
];

// ============================================================================
// DAY OF WEEK FUNCTIONS
// ============================================================================

/**
 * Gets current day of week
 * @returns 0-6 where 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 */
export const getCurrentDayOfWeek = (): number => {
  return new Date().getDay();
};

/**
 * Checks if current day is a rest day (Saturday or Sunday)
 * @returns true if today is Saturday (6) or Sunday (0)
 */
export const isRestDay = (): boolean => {
  const day = getCurrentDayOfWeek();
  return day === 0 || day === 6;
};

// ============================================================================
// WORKOUT RECOMMENDATION FUNCTIONS
// ============================================================================

/**
 * Gets recommended workout for current day
 * On rest days (Sat/Sun), returns Monday's workout (Chest) as the next scheduled workout
 *
 * @returns Recommended body part workout for today
 */
export const getRecommendedWorkout = (): BodyPart => {
  const day = getCurrentDayOfWeek();

  // Rest days default to Monday's workout (Chest)
  if (day === 0 || day === 6) {
    return 'Chest';
  }

  // Return scheduled workout for weekdays
  return WORKOUT_SCHEDULE[day];
};

/**
 * Gets array index for recommended workout
 * Used to calculate initial scroll position in WorkoutCardsScroller
 *
 * @returns Index (0-4) of recommended workout in BODY_PARTS_ORDER array
 */
export const getWorkoutIndexForDay = (): number => {
  const recommendedWorkout = getRecommendedWorkout();
  return BODY_PARTS_ORDER.indexOf(recommendedWorkout);
};

// ============================================================================
// WELCOME MESSAGE FUNCTIONS
// ============================================================================

/**
 * Gets appropriate welcome message based on current day
 * Rest days show encouraging recovery message
 * Workout days show standard guidance message
 *
 * @returns Welcome message string for WelcomeBox component
 */
export const getWelcomeMessage = (): string => {
  if (isRestDay()) {
    return "Today is a rest day. Recovery is part of progress. Enjoy your day off!";
  }

  return "We're glad you're here and value your time. Let's get started. Select a workout below.";
};

/**
 * Gets day name for a given day number
 * Useful for debugging and future features
 *
 * @param day - Day number (0-6)
 * @returns Day name string
 */
export const getDayName = (day: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
};
