// ==========================================================================
// HOOKS BARREL EXPORT
//
// Central export point for all custom hooks.
//
// Dependencies: Hook modules
// Used by: All screens and components requiring custom hooks
// ==========================================================================

export {useWeekCalendar} from './useWeekCalendar';
export type {DayData} from './useWeekCalendar';

export {useSwipeGesture} from './useSwipeGesture';
export type {SwipeGestureConfig, SwipeGestureReturn} from './useSwipeGesture';

export {useFormInput} from './useFormInput';
export type {FormInputConfig, FormInputReturn} from './useFormInput';

export {
  useFadeAnimation,
  useSlideAnimation,
  useScaleAnimation,
} from './useAnimation';
export type {
  AnimationConfig,
  FadeAnimationReturn,
  SlideAnimationReturn,
  ScaleAnimationReturn,
} from './useAnimation';

export {useAutoRepeat} from './useAutoRepeat';
export type {UseAutoRepeatReturn} from './useAutoRepeat';

export {useDialControl} from './useDialControl';
export type {UseDialControlConfig, UseDialControlReturn} from './useDialControl';
