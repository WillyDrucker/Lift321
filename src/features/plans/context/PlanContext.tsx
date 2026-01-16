// ==========================================================================
// PLAN CONTEXT
//
// Global state management for the currently selected plan.
// Persists selected plan across navigation and provides plan data.
//
// Dependencies: React Context
// Used by: PlansPage, WorkoutOverviewScreen, WorkoutLayout, ActiveWorkoutScreen
// ==========================================================================

import React, {createContext, useContext, useState, useCallback, useMemo, ReactNode} from 'react';
import type {ImageSourcePropType} from 'react-native';

// ============================================================================
// TYPES
// ============================================================================

export type PlanData = {
  id: string;
  name: string;
  displayName: string;
  displayPrefix: string; // Italic portion (e.g., "LIFT")
  displaySuffix: string; // Non-italic portion (e.g., "3-2-1")
  shortName?: string; // Abbreviated name for compact UI contexts
  image: ImageSourcePropType;
  category: 'lift321' | 'popular' | 'user';
};

type PlanContextType = {
  // State
  selectedPlan: PlanData;
  availablePlans: PlanData[];
  lift321Plans: PlanData[];
  popularPlans: PlanData[];
  userPlans: PlanData[];

  // Actions
  selectPlan: (planId: string) => void;
};

// ============================================================================
// PLAN DATA
// ============================================================================

// Fallback image for plans without custom images
const fallbackImage = require('@/assets/images/plans/lift-3-2-1-plan.png');

const PLANS: PlanData[] = [
  // Lift 321 Plans
  {
    id: 'lift-3-2-1',
    name: 'Lift 3-2-1',
    displayName: 'LIFT 3-2-1',
    displayPrefix: 'LIFT',
    displaySuffix: '3-2-1',
    shortName: 'L321',
    image: require('@/assets/images/plans/lift-3-2-1-plan.png'),
    category: 'lift321',
  },
  {
    id: 'lift-3-2-glp-1',
    name: 'Lift 3-2-GLP-1',
    displayName: 'LIFT 3-2-GLP-1',
    displayPrefix: 'LIFT',
    displaySuffix: '3-2-GLP-1',
    shortName: 'GLP-1',
    image: require('@/assets/images/plans/lift-3-2-glp-1-plan.png'),
    category: 'lift321',
  },
  // Popular Plans
  {
    id: 'athlete',
    name: 'Athlete',
    displayName: 'ATHLETE',
    displayPrefix: '',
    displaySuffix: 'ATHLETE',
    shortName: 'ATH',
    image: fallbackImage,
    category: 'popular',
  },
  {
    id: 'weight-loss',
    name: 'Weight Loss',
    displayName: 'WEIGHT LOSS',
    displayPrefix: '',
    displaySuffix: 'WEIGHT LOSS',
    shortName: 'WL',
    image: fallbackImage,
    category: 'popular',
  },
  {
    id: 'lean',
    name: 'Lean',
    displayName: 'LEAN',
    displayPrefix: '',
    displaySuffix: 'LEAN',
    image: fallbackImage,
    category: 'popular',
  },
  // User Plans
  {
    id: 'debbie-d',
    name: 'Debbie D.',
    displayName: 'DEBBIE D.',
    displayPrefix: '',
    displaySuffix: 'DEBBIE D.',
    shortName: 'DEBBIE',
    image: require('@/assets/images/plans/debbie-d-plan.png'),
    category: 'user',
  },
  {
    id: 'jax-mercer',
    name: 'Jax Mercer',
    displayName: 'JAX MERCER',
    displayPrefix: '',
    displaySuffix: 'JAX MERCER',
    shortName: 'JAX',
    image: require('@/assets/images/workouts/personal-trainer.png'),
    category: 'user',
  },
];

const DEFAULT_PLAN = PLANS[0];

// ============================================================================
// CONTEXT
// ============================================================================

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

// ============================================================================
// PROVIDER
// ============================================================================

// Pre-filter plans by category (static, computed once)
const LIFT321_PLANS = PLANS.filter(p => p.category === 'lift321');
const POPULAR_PLANS = PLANS.filter(p => p.category === 'popular');
const USER_PLANS = PLANS.filter(p => p.category === 'user');

export const PlanProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanData>(DEFAULT_PLAN);

  const selectPlan = useCallback((planId: string) => {
    const plan = PLANS.find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  }, []);

  const value = useMemo(() => ({
    selectedPlan,
    availablePlans: PLANS,
    lift321Plans: LIFT321_PLANS,
    popularPlans: POPULAR_PLANS,
    userPlans: USER_PLANS,
    selectPlan,
  }), [selectedPlan, selectPlan]);

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};
