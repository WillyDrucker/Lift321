// ==========================================================================
// COMPONENTS BARREL EXPORT
//
// Central export point for all reusable components.
// Simplifies imports and provides clear component inventory.
//
// Dependencies: Component modules
// Used by: All screens and features requiring UI components
// ==========================================================================

// === ICONS ===
export * from './icons';

// === BUTTONS ===
export * from './Button';

// === INPUTS ===
export * from './Input';

// === NAVIGATION ===
export * from './Navigation';

// === UI COMPONENTS ===
export {WelcomeBox} from './WelcomeBox';
export {RecommendedWorkoutBox} from './RecommendedWorkoutBox';
export {WorkoutCard} from './WorkoutCard';
export {WorkoutCardsScroller} from './WorkoutCardsScroller';
export {CustomWorkoutCardsScroller} from './CustomWorkoutCardsScroller';
export {PlanCard} from './PlanCard';
export {PlanCardsScroller} from './PlanCardsScroller';
export {ActivityFeedCard} from './ActivityFeedCard';
export {Sidebar} from './Sidebar';
export {BottomSheet} from './BottomSheet';

// === LAYOUT ===
export {DefaultScreenLayout} from './Layout/DefaultScreenLayout';

// === ERROR HANDLING ===
export {ErrorBoundary} from './ErrorBoundary';

// === STATE COMPONENTS ===
export {LoadingState, ErrorState, EmptyState} from './State';
