// ==========================================================================
// USE AUTO-REPEAT HOOK
//
// Reusable auto-repeat button logic with timer management.
// Handles initial action, delay, and accelerated repeat intervals.
//
// Dependencies: React refs and timers
// Used by: DialControlCard, any component with hold-to-repeat buttons
// ==========================================================================

import {useRef, useCallback, useEffect} from 'react';

// ============================================================================
// TYPES
// ============================================================================

export type UseAutoRepeatReturn = {
  startAutoRepeat: (
    initialAction: () => void,
    repeatAction: () => void
  ) => void;
  clearAllTimers: () => void;
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const AUTO_REPEAT_CONFIG = {
  initialDelay: 200,  // Delay before repeat starts
  repeatInterval: 100, // Interval between repeats
} as const;

// ============================================================================
// HOOK
// ============================================================================

export const useAutoRepeat = (): UseAutoRepeatReturn => {
  const repeatTimer = useRef<NodeJS.Timeout | null>(null);
  const accelerateTimer = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback(() => {
    if (repeatTimer.current) {
      clearInterval(repeatTimer.current);
      repeatTimer.current = null;
    }
    if (accelerateTimer.current) {
      clearTimeout(accelerateTimer.current);
      accelerateTimer.current = null;
    }
  }, []);

  const startAutoRepeat = useCallback((
    initialAction: () => void,
    repeatAction: () => void
  ) => {
    // Clear any existing timers to prevent stacking
    clearAllTimers();

    // Execute initial action immediately
    initialAction();

    // Start repeat after initial delay
    accelerateTimer.current = setTimeout(() => {
      repeatTimer.current = setInterval(() => {
        repeatAction();
      }, AUTO_REPEAT_CONFIG.repeatInterval);
    }, AUTO_REPEAT_CONFIG.initialDelay);
  }, [clearAllTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  return {
    startAutoRepeat,
    clearAllTimers,
  };
};
