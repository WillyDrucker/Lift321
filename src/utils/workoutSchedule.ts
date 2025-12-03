// ==========================================================================
// WORKOUT SCHEDULE UTILITY
//
// Day-of-week logic for workout recommendations and scheduling.
// Provides simple POC logic to determine recommended workouts based on current day.
//
// Dependencies: BodyPart type from WorkoutCard
// Used by: HomePage for welcome messages and workout card positioning
// ==========================================================================

import type {BodyPart, BodyPartOrRest} from '@/components/WorkoutCard';
import {getCurrentDate} from '@/utils/dateUtils';

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Weekly workout schedule mapping day of week to body part
 * Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Saturday = 6
 * Friday (5) and Sunday (0) are rest days
 */
const WORKOUT_SCHEDULE: Record<number, BodyPart> = {
  1: 'Chest',          // Monday
  2: 'Arms',           // Tuesday
  3: 'Shoulders',      // Wednesday
  4: 'Back & Tris',    // Thursday
  6: 'Legs',           // Saturday
};


// ============================================================================
// DAY OF WEEK FUNCTIONS
// ============================================================================

/**
 * Gets current day of week (respects dev tools day override)
 * @returns 0-6 where 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 */
export const getCurrentDayOfWeek = (): number => {
  return getCurrentDate().getDay();
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
 * Gets body part workout for a specific day of week
 * Used by suggested workout cards to display day-based content
 *
 * @param dayOfWeek - Optional day (0=Sun, 1=Mon, ..., 6=Sat). Defaults to current day.
 * @returns Body part or 'Rest' for the specified day
 */
export const getBodyPartForDay = (dayOfWeek?: number): BodyPartOrRest => {
  const day = dayOfWeek ?? getCurrentDayOfWeek();

  // Friday (5) and Sunday (0) are rest days
  if (day === 5 || day === 0) {
    return 'Rest';
  }

  // Return scheduled workout or default to Chest
  return WORKOUT_SCHEDULE[day] ?? 'Chest';
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
