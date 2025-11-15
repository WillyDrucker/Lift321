// ==========================================================================
// DATA BARREL EXPORT
//
// Central export point for static JSON data (exercises, plans).
// Import exercises and plans from here instead of directly from JSON files.
//
// Dependencies: exercises.json, plans.json
// Used by: Components, screens, services requiring reference data
// ==========================================================================

import exercisesData from './exercises.json';
import plansData from './plans.json';
import type {Exercise, ExerciseFilters, ExerciseGroup} from '@/types/exercise.types';
import type {Plan, PlanFilters} from '@/types/plan.types';

// === TYPED DATA EXPORTS ===

/**
 * All exercises from exercise library
 * Array of 168 exercise variations
 */
export const exercises: Exercise[] = exercisesData as Exercise[];

/**
 * All training plans
 * Array of 11 pre-built training plans
 */
export const plans: Plan[] = plansData as Plan[];

// === UTILITY FUNCTIONS ===

/**
 * Find exercise by name
 */
export const findExerciseByName = (name: string): Exercise[] => {
  return exercises.filter(ex =>
    ex.exercise_name.toLowerCase().includes(name.toLowerCase())
  );
};

/**
 * Get exercises by body part
 */
export const getExercisesByBodyPart = (bodyPart: string): Exercise[] => {
  return exercises.filter(ex => ex.body_part === bodyPart);
};

/**
 * Get exercises by day
 */
export const getExercisesByDay = (day: string): Exercise[] => {
  return exercises.filter(ex => ex.day === day);
};

/**
 * Get exercises by equipment weight type
 */
export const getExercisesByEquipmentWeight = (
  weightType: string,
): Exercise[] => {
  return exercises.filter(ex => ex.equipment_weight === weightType);
};

/**
 * Filter exercises by multiple criteria
 */
export const filterExercises = (filters: ExerciseFilters): Exercise[] => {
  return exercises.filter(ex => {
    if (filters.day && ex.day !== filters.day) return false;
    if (filters.bodyPart && ex.body_part !== filters.bodyPart) return false;
    if (filters.pushPull && ex.push_pull !== filters.pushPull) return false;
    if (filters.muscleGroup && ex.muscle_group !== filters.muscleGroup)
      return false;
    if (
      filters.exerciseName &&
      !ex.exercise_name.toLowerCase().includes(filters.exerciseName.toLowerCase())
    )
      return false;
    if (
      filters.equipmentWeight &&
      ex.equipment_weight !== filters.equipmentWeight
    )
      return false;
    return true;
  });
};

/**
 * Group exercises by body part
 */
export const groupExercisesByBodyPart = (): ExerciseGroup => {
  return exercises.reduce((acc, ex) => {
    if (!acc[ex.body_part]) {
      acc[ex.body_part] = [];
    }
    acc[ex.body_part].push(ex);
    return acc;
  }, {} as ExerciseGroup);
};

/**
 * Group exercises by day
 */
export const groupExercisesByDay = (): ExerciseGroup => {
  return exercises.reduce((acc, ex) => {
    if (!acc[ex.day]) {
      acc[ex.day] = [];
    }
    acc[ex.day].push(ex);
    return acc;
  }, {} as ExerciseGroup);
};

/**
 * Get unique body parts
 */
export const getBodyParts = (): string[] => {
  return Array.from(new Set(exercises.map(ex => ex.body_part)));
};

/**
 * Get unique exercise names
 */
export const getExerciseNames = (): string[] => {
  return Array.from(new Set(exercises.map(ex => ex.exercise_name))).sort();
};

// === PLAN UTILITIES ===

/**
 * Find plan by abbreviation
 */
export const findPlanByAbbreviation = (abbreviation: string): Plan | undefined => {
  return plans.find(
    plan => plan.abbreviation.toLowerCase() === abbreviation.toLowerCase(),
  );
};

/**
 * Find plan by name
 */
export const findPlanByName = (name: string): Plan | undefined => {
  return plans.find(
    plan => plan.plan_name.toLowerCase() === name.toLowerCase(),
  );
};

/**
 * Filter plans by duration
 */
export const filterPlansByDuration = (
  minWeeks?: number,
  maxWeeks?: number,
): Plan[] => {
  return plans.filter(plan => {
    if (!plan.total_duration) return true; // Include plans without duration
    if (minWeeks && plan.total_duration < minWeeks) return false;
    if (maxWeeks && plan.total_duration > maxWeeks) return false;
    return true;
  });
};

/**
 * Get all plan abbreviations
 */
export const getPlanAbbreviations = (): string[] => {
  return plans.map(plan => plan.abbreviation);
};

/**
 * Get all plan names
 */
export const getPlanNames = (): string[] => {
  return plans.map(plan => plan.plan_name);
};
