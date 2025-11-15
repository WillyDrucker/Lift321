// ==========================================================================
// EXERCISE TYPES
//
// Type definitions for exercise data from exercises.json.
// Provides type safety for exercise library and workout planning.
//
// Dependencies: None
// Used by: Exercise service, workout screens, plan screens
// ==========================================================================

/**
 * Exercise definition from exercise library
 * Represents a single exercise variation with equipment and setup details
 */
export type Exercise = {
  /** Day of week this exercise is typically performed */
  day: string;

  /** Primary body part targeted (e.g., "Chest", "Back", "Legs") */
  body_part: string;

  /** Movement type: "Push" or "Pull" */
  push_pull: string;

  /** Muscle group classification (e.g., "Major1", "Major2", "Minor1") */
  muscle_group: string;

  /** Recommended number of sets (stored as string) */
  sets: string;

  /** Name of the exercise (e.g., "Bench Press", "Squat") */
  exercise_name: string;

  /** Exercise position (e.g., "Flat", "Incline", "Decline", "Seated") */
  position: string;

  /** Equipment type used (e.g., "Barbell", "Dumbbells", "Machine") */
  equipment_use: string;

  /** Specific equipment setup (e.g., "Olympic Flat Bench", "Power Rack") */
  equipment_setup: string;

  /** Weight type (e.g., "Free Weight", "Pin-Loaded", "Plate-Loaded") */
  equipment_weight: string;

  /** Program ordering identifier */
  program_order: string;

  /** Program color coding */
  program_color_code: string;

  /** Alternative program ordering identifier */
  program1_order: string;

  /** Alternative program color coding */
  program1_color_code: string;
};

/**
 * Exercise filter options for searching/filtering exercises
 */
export type ExerciseFilters = {
  day?: string;
  bodyPart?: string;
  pushPull?: string;
  muscleGroup?: string;
  exerciseName?: string;
  equipmentWeight?: string;
};

/**
 * Grouped exercises by body part or day
 */
export type ExerciseGroup = {
  [key: string]: Exercise[];
};
