// ==========================================================================
// USE ANIMATION HOOK
//
// Custom hook for common animation patterns (fade, slide, scale).
// Provides reusable animation logic with configurable timing.
//
// Dependencies: React Native Animated
// Used by: Components requiring animations
// ==========================================================================

import {useRef, useCallback} from 'react';
import {Animated, Easing} from 'react-native';

// === TYPES ===

export type AnimationConfig = {
  duration?: number;
  easing?: (value: number) => number;
  useNativeDriver?: boolean;
  delay?: number;
};

export type FadeAnimationReturn = {
  opacity: Animated.Value;
  fadeIn: (config?: AnimationConfig) => void;
  fadeOut: (config?: AnimationConfig) => void;
  fadeToggle: (visible: boolean, config?: AnimationConfig) => void;
};

export type SlideAnimationReturn = {
  translateX: Animated.Value;
  translateY: Animated.Value;
  slideInFromLeft: (config?: AnimationConfig) => void;
  slideInFromRight: (config?: AnimationConfig) => void;
  slideInFromTop: (config?: AnimationConfig) => void;
  slideInFromBottom: (config?: AnimationConfig) => void;
  slideOutToLeft: (config?: AnimationConfig) => void;
  slideOutToRight: (config?: AnimationConfig) => void;
  slideOutToTop: (config?: AnimationConfig) => void;
  slideOutToBottom: (config?: AnimationConfig) => void;
  reset: () => void;
};

export type ScaleAnimationReturn = {
  scale: Animated.Value;
  scaleIn: (config?: AnimationConfig) => void;
  scaleOut: (config?: AnimationConfig) => void;
  pulse: (config?: AnimationConfig) => void;
  reset: () => void;
};

// === DEFAULT CONFIG ===

const DEFAULT_DURATION = 300;
const DEFAULT_EASING = Easing.inOut(Easing.ease);

// === FADE ANIMATION HOOK ===

export const useFadeAnimation = (
  initialOpacity: number = 1,
): FadeAnimationReturn => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;

  const fadeIn = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [opacity],
  );

  const fadeOut = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [opacity],
  );

  const fadeToggle = useCallback(
    (visible: boolean, config: AnimationConfig = {}) => {
      if (visible) {
        fadeIn(config);
      } else {
        fadeOut(config);
      }
    },
    [fadeIn, fadeOut],
  );

  return {
    opacity,
    fadeIn,
    fadeOut,
    fadeToggle,
  };
};

// === SLIDE ANIMATION HOOK ===

export const useSlideAnimation = (
  slideDistance: number = 300,
): SlideAnimationReturn => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const slideInFromLeft = useCallback(
    (config: AnimationConfig = {}) => {
      translateX.setValue(-slideDistance);
      Animated.timing(translateX, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateX, slideDistance],
  );

  const slideInFromRight = useCallback(
    (config: AnimationConfig = {}) => {
      translateX.setValue(slideDistance);
      Animated.timing(translateX, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateX, slideDistance],
  );

  const slideInFromTop = useCallback(
    (config: AnimationConfig = {}) => {
      translateY.setValue(-slideDistance);
      Animated.timing(translateY, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateY, slideDistance],
  );

  const slideInFromBottom = useCallback(
    (config: AnimationConfig = {}) => {
      translateY.setValue(slideDistance);
      Animated.timing(translateY, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateY, slideDistance],
  );

  const slideOutToLeft = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(translateX, {
        toValue: -slideDistance,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateX, slideDistance],
  );

  const slideOutToRight = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(translateX, {
        toValue: slideDistance,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateX, slideDistance],
  );

  const slideOutToTop = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(translateY, {
        toValue: -slideDistance,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateY, slideDistance],
  );

  const slideOutToBottom = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(translateY, {
        toValue: slideDistance,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [translateY, slideDistance],
  );

  const reset = useCallback(() => {
    translateX.setValue(0);
    translateY.setValue(0);
  }, [translateX, translateY]);

  return {
    translateX,
    translateY,
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
    slideInFromBottom,
    slideOutToLeft,
    slideOutToRight,
    slideOutToTop,
    slideOutToBottom,
    reset,
  };
};

// === SCALE ANIMATION HOOK ===

export const useScaleAnimation = (
  initialScale: number = 1,
): ScaleAnimationReturn => {
  const scale = useRef(new Animated.Value(initialScale)).current;

  const scaleIn = useCallback(
    (config: AnimationConfig = {}) => {
      scale.setValue(0);
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [scale],
  );

  const scaleOut = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.timing(scale, {
        toValue: 0,
        duration: config.duration ?? DEFAULT_DURATION,
        easing: config.easing ?? DEFAULT_EASING,
        useNativeDriver: config.useNativeDriver ?? true,
        delay: config.delay,
      }).start();
    },
    [scale],
  );

  const pulse = useCallback(
    (config: AnimationConfig = {}) => {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: (config.duration ?? DEFAULT_DURATION) / 2,
          easing: config.easing ?? DEFAULT_EASING,
          useNativeDriver: config.useNativeDriver ?? true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: (config.duration ?? DEFAULT_DURATION) / 2,
          easing: config.easing ?? DEFAULT_EASING,
          useNativeDriver: config.useNativeDriver ?? true,
        }),
      ]).start();
    },
    [scale],
  );

  const reset = useCallback(() => {
    scale.setValue(initialScale);
  }, [scale, initialScale]);

  return {
    scale,
    scaleIn,
    scaleOut,
    pulse,
    reset,
  };
};
