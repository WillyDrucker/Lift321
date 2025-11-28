// ==========================================================================
// ACTIVE WORKOUT CONTEXT
//
// Global state management for the currently active workout.
// Persists workout progress (sets, weight, reps, timer) across navigation.
//
// Dependencies: React Context, exerciseService
// Used by: ActiveWorkoutScreen, MainNavigator
// ==========================================================================

import React, {createContext, useContext, useState, useCallback, useMemo, useEffect, ReactNode} from 'react';
import type {WorkoutType} from '@/components/WorkoutCard';
import type {SessionType} from '@/services/exerciseService';
import {getExercisesForWorkout} from '@/services/exerciseService';
import type {SetData} from '@/features/workout/components/ExerciseSetRow';

// ============================================================================
// TYPES
// ============================================================================

type ActiveWorkoutConfig = {
  workoutType: WorkoutType;
  sessionType: SessionType;
};

type ActiveWorkoutContextType = {
  // State
  isActive: boolean;
  config: ActiveWorkoutConfig | null;
  workoutState: Record<string, SetData>;
  activeSetKey: string | null;
  currentGlobalWeight: number;
  currentGlobalReps: number;
  isResting: boolean;
  isWorkoutComplete: boolean;
  
  // Actions
  startWorkout: (config: ActiveWorkoutConfig) => void;
  endWorkout: () => void;
  updateSet: (key: string, data: SetData) => void;
  logSet: () => void;
  endRest: () => void;
  setGlobalWeight: (weight: number) => void;
  setGlobalReps: (reps: number) => void;
  deleteSet: (key: string) => void;
  selectSet: (key: string) => void;
};

// ============================================================================
// CONTEXT
// ============================================================================

const ActiveWorkoutContext = createContext<ActiveWorkoutContextType | undefined>(undefined);

export const useActiveWorkout = () => {
  const context = useContext(ActiveWorkoutContext);
  if (!context) {
    throw new Error('useActiveWorkout must be used within an ActiveWorkoutProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER
// ============================================================================

export const ActiveWorkoutProvider: React.FC<{children: ReactNode}> = ({children}) => {
  // === STATE ===
  const [config, setConfig] = useState<ActiveWorkoutConfig | null>(null);
  const [workoutState, setWorkoutState] = useState<Record<string, SetData>>({});
  const [activeSetKey, setActiveSetKey] = useState<string | null>(null);
  const [currentGlobalWeight, setCurrentGlobalWeight] = useState<number>(135);
  const [currentGlobalReps, setCurrentGlobalReps] = useState<number>(10);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState<boolean>(false);

  const isActive = !!config;

  // === HELPERS ===
  
  // Get ordered keys based on current config (memoized would be better but we need it in callbacks)
  const getOrderedKeys = useCallback((currentConfig: ActiveWorkoutConfig) => {
    const workoutData = getExercisesForWorkout(currentConfig.workoutType, currentConfig.sessionType);
    const keys: string[] = [];
    workoutData.exercises.forEach((exercise) => {
      if (exercise.adjustedSets > 0) {
        for (let i = 1; i <= exercise.adjustedSets; i++) {
          keys.push(`${exercise.exercise_name}-${i}`);
        }
      }
    });
    return keys;
  }, []);

  // === ACTIONS ===

  const startWorkout = useCallback((newConfig: ActiveWorkoutConfig) => {
    setConfig(newConfig);
    setWorkoutState({});
    setIsResting(false);
    setIsWorkoutComplete(false);
    
    // Initialize active set
    const keys = getOrderedKeys(newConfig);
    if (keys.length > 0) {
      setActiveSetKey(keys[0]);
    }
  }, [getOrderedKeys]);

  const endWorkout = useCallback(() => {
    setConfig(null);
    setWorkoutState({});
    setActiveSetKey(null);
    setIsResting(false);
    setIsWorkoutComplete(false);
  }, []);

  const updateSet = useCallback((key: string, newData: SetData) => {
    if (!config) return;
    const keys = getOrderedKeys(config);

    setWorkoutState(prev => {
        const oldData = prev[key];
        
        // Trigger automation only if this was the ACTIVE set completing
        if (newData.completed && !oldData?.completed && key === activeSetKey) {
            const currentIndex = keys.indexOf(key);
            const isLastSet = currentIndex === keys.length - 1;

            if (isLastSet) {
                // Last set completed: NO REST, FINISH MODE
                setIsResting(false);
                setActiveSetKey(null);
                setIsWorkoutComplete(true);
            } else {
                // Not last set: REST, NEXT SET
                setIsResting(true);
                const nextKey = keys[currentIndex + 1];
                setActiveSetKey(nextKey);
            }
        }
        return {
            ...prev,
            [key]: newData
        };
    });
  }, [config, activeSetKey, getOrderedKeys]);

  const logSet = useCallback(() => {
      if (activeSetKey) {
          updateSet(activeSetKey, {
              weight: currentGlobalWeight.toString(),
              reps: currentGlobalReps.toString(),
              completed: true,
          });
      }
  }, [activeSetKey, currentGlobalWeight, currentGlobalReps, updateSet]);

  const endRest = useCallback(() => {
      setIsResting(false);
  }, []);

  const deleteSet = useCallback((key: string) => {
      if (!config) return;
      const keys = getOrderedKeys(config);

      setWorkoutState(prev => {
          const nextState = {...prev};
          delete nextState[key];
          
          const firstIncomplete = keys.find(k => !nextState[k]?.completed);
          setActiveSetKey(firstIncomplete || null);
          
          if (firstIncomplete) {
              setIsWorkoutComplete(false);
          }
          
          return nextState;
      });

  }, [config, getOrderedKeys]);

  const selectSet = useCallback((key: string) => {
      setActiveSetKey(key);
  }, []);

  const setGlobalWeight = useCallback((weight: number) => {
      setCurrentGlobalWeight(weight);
      if (activeSetKey) {
          setWorkoutState(prev => ({
              ...prev,
              [activeSetKey]: {
                  ...(prev[activeSetKey] || { reps: currentGlobalReps.toString(), completed: false }), 
                  weight: weight.toString()
              }
          }));
      }
  }, [activeSetKey, currentGlobalReps]);

  const setGlobalReps = useCallback((reps: number) => {
      setCurrentGlobalReps(reps);
      if (activeSetKey) {
          setWorkoutState(prev => ({
              ...prev,
              [activeSetKey]: {
                  ...(prev[activeSetKey] || { weight: currentGlobalWeight.toString(), completed: false }), 
                  reps: reps.toString()
              }
          }));
      }
  }, [activeSetKey, currentGlobalReps]);

  // Sync global controls when active set changes
  // We need this Effect here in the provider
  useEffect(() => {
      if (activeSetKey && workoutState[activeSetKey]) {
          if (workoutState[activeSetKey].weight) {
              const weight = parseFloat(workoutState[activeSetKey].weight);
              if (!isNaN(weight)) setCurrentGlobalWeight(weight);
          }
          if (workoutState[activeSetKey].reps) {
              const reps = parseInt(workoutState[activeSetKey].reps, 10);
              if (!isNaN(reps)) setCurrentGlobalReps(reps);
          }
      }
  }, [activeSetKey, workoutState]);

  // === VALUE ===
  
  const value = useMemo(() => ({
    isActive,
    config,
    workoutState,
    activeSetKey,
    currentGlobalWeight,
    currentGlobalReps,
    isResting,
    isWorkoutComplete,
    startWorkout,
    endWorkout,
    updateSet,
    logSet,
    endRest,
    setGlobalWeight,
    setGlobalReps,
    deleteSet,
    selectSet,
  }), [
    isActive, config, workoutState, activeSetKey, currentGlobalWeight, currentGlobalReps, 
    isResting, isWorkoutComplete, startWorkout, endWorkout, updateSet, logSet, endRest, 
    setGlobalWeight, setGlobalReps, deleteSet, selectSet
  ]);

  return (
    <ActiveWorkoutContext.Provider value={value}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};