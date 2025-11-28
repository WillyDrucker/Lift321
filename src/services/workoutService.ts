// ==========================================================================
// WORKOUT SERVICE
//
// Service layer for workout persistence and history using Supabase.
// Handles saving completed workouts and sets.
//
// Dependencies: supabaseClient
// Used by: ActiveWorkoutContext
// ==========================================================================

import {supabase, getCurrentUser} from './supabaseClient';
import type {SessionType} from './exerciseService';
import type {SetData} from '@/features/workout/components/ExerciseSetRow';

// ============================================================================
// TYPES
// ============================================================================

export type WorkoutRecord = {
  id: string;
  user_id: string;
  workout_type: string;
  session_type: SessionType;
  completed_at: string;
  duration_seconds?: number;
};

export type WorkoutSetRecord = {
  id: string;
  workout_id: string;
  exercise_name: string;
  set_number: number;
  weight: number;
  reps: number;
  completed: boolean;
};

export type WorkoutSaveData = {
  workoutType: string;
  sessionType: SessionType;
  sets: Record<string, SetData>; // key: "Exercise Name-SetNum"
};

// ============================================================================
// SERVICE FUNCTIONS
// ============================================================================

/**
 * Saves a completed workout and its sets to Supabase.
 * 
 * @param data - The workout configuration and set data
 * @returns The saved workout record or error
 */
export const saveWorkout = async (data: WorkoutSaveData) => {
  const {user, error: authError} = await getCurrentUser();
  
  if (authError || !user) {
    console.warn('Cannot save workout: User not authenticated');
    return {error: authError || new Error('User not authenticated')};
  }

  try {
    // 1. Insert Workout Record
    const {data: workout, error: workoutError} = await supabase
      .from('workouts')
      .insert({
        user_id: user.id,
        workout_type: data.workoutType,
        session_type: data.sessionType,
        completed_at: new Date().toISOString(),
        // duration_seconds: ... (could add if we tracked start time)
      })
      .select()
      .single();

    if (workoutError) {
      console.error('Error saving workout record:', workoutError);
      return {error: workoutError};
    }

    if (!workout) {
        return {error: new Error('Failed to create workout record')};
    }

    // 2. Format Sets for Insertion
    const setRecords = Object.entries(data.sets).map(([key, setData]) => {
      // Key format: "Exercise Name-SetNumber"
      const lastDashIndex = key.lastIndexOf('-');
      const exerciseName = key.substring(0, lastDashIndex);
      const setNumber = parseInt(key.substring(lastDashIndex + 1), 10);

      return {
        workout_id: workout.id,
        exercise_name: exerciseName,
        set_number: isNaN(setNumber) ? 0 : setNumber,
        weight: parseFloat(setData.weight) || 0,
        reps: parseInt(setData.reps, 10) || 0,
        completed: setData.completed,
      };
    });

    // Filter out sets that might be invalid or empty if needed, 
    // but generally we want to save what was tracked.
    // Maybe only save completed sets? Or all?
    // User might want to see skipped sets.
    
    if (setRecords.length > 0) {
        const {error: setsError} = await supabase
        .from('workout_sets')
        .insert(setRecords);

        if (setsError) {
            console.error('Error saving workout sets:', setsError);
            // Consider deleting the workout record if sets fail?
            // For now, keep the record but log error.
            return {error: setsError, workout}; 
        }
    }

    return {workout};

  } catch (err) {
    console.error('Unexpected error saving workout:', err);
    return {error: err};
  }
};
