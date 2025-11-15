// ==========================================================================
// PLAN TYPES
//
// Type definitions for training plan data from plans.json.
// Provides type safety for training plans and program structures.
//
// Dependencies: None
// Used by: Plan service, plan screens, workout progression
// ==========================================================================

/**
 * Training plan definition from plan library
 * Represents a complete training program with weekly progression
 */
export type Plan = {
  /** Plan name (e.g., "Lift 3-2-1", "Beginner", "Advanced") */
  plan_name: string;

  /** Total duration in weeks (optional - some plans don't specify) */
  total_duration?: number;

  /** Short abbreviation for the plan (e.g., "3-2-1", "BEGIN", "ADV") */
  abbreviation: string;

  /** Reference to exercise order configuration */
  plan_exercise_order: string;

  /** Reps for each week (week1_reps through week20_reps) - dynamic keys */
  [key: `week${number}_reps`]: number;

  /** Phase descriptions (e.g., "week1-3": "Consistency Training") - dynamic keys */
  [key: `week${number}-${number}`]: string;

  /** Equipment weight for each phase (e.g., "week1-3_ew": "Free Weight") - dynamic keys */
  [key: `week${number}-${number}_ew`]: string;

  /** Detailed plan information and description */
  plan_information: string;
};

/**
 * Stricter Plan type with known week ranges (for type safety)
 */
export type StrictPlan = {
  plan_name: string;
  total_duration?: number;
  abbreviation: string;
  plan_exercise_order: string;
  plan_information: string;

  // Week rep counts (weeks 1-20 max)
  week1_reps?: number;
  week2_reps?: number;
  week3_reps?: number;
  week4_reps?: number;
  week5_reps?: number;
  week6_reps?: number;
  week7_reps?: number;
  week8_reps?: number;
  week9_reps?: number;
  week10_reps?: number;
  week11_reps?: number;
  week12_reps?: number;
  week13_reps?: number;
  week14_reps?: number;
  week15_reps?: number;
  week16_reps?: number;
  week17_reps?: number;
  week18_reps?: number;
  week19_reps?: number;
  week20_reps?: number;

  // Phase descriptions
  'week1-3'?: string;
  'week1-4'?: string;
  'week4-6'?: string;
  'week5-8'?: string;
  'week7-9'?: string;
  'week9-12'?: string;
  'week10-12'?: string;
  'week13-15'?: string;
  'week16-18'?: string;

  // Equipment weight for phases
  'week1-3_ew'?: string;
  'week1-4_ew'?: string;
  'week4-6_ew'?: string;
  'week5-8_ew'?: string;
  'week7-9_ew'?: string;
  'week9-12_ew'?: string;
  'week10-12_ew'?: string;
  'week13-15_ew'?: string;
  'week16-18_ew'?: string;
};

/**
 * Plan filter options for searching/filtering plans
 */
export type PlanFilters = {
  abbreviation?: string;
  planName?: string;
  minDuration?: number;
  maxDuration?: number;
};

/**
 * User's active plan instance (stored in Supabase)
 */
export type UserPlan = {
  id: string;
  user_id: string;
  plan_abbreviation: string;
  current_week: number;
  start_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
