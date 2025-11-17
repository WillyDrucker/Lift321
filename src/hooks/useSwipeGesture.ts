// ==========================================================================
// USE SWIPE GESTURE HOOK
//
// Custom hook for swipe-right-to-dismiss gesture handling.
// Manages PanResponder, animations, and dismiss logic.
//
// Dependencies: React Native Animated, PanResponder, theme tokens
// Used by: HomePage (for welcome box dismissal)
// ==========================================================================

import {useRef, useCallback} from 'react';
import {Animated, PanResponder} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type SwipeGestureConfig = {
  onDismiss: () => void;
};

export type SwipeGestureReturn = {
  translateX: Animated.Value;
  opacity: Animated.Value;
  panHandlers: any;
  resetPosition: () => void;
};

// === HOOK ===

export const useSwipeGesture = ({
  onDismiss,
}: SwipeGestureConfig): SwipeGestureReturn => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const resetPosition = useCallback(() => {
    translateX.setValue(0);
    opacity.setValue(1);
  }, [translateX, opacity]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return (
          Math.abs(gestureState.dx) >
          theme.layout.animation.gestureMovementThreshold
        );
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow right swipe (positive dx)
        if (gestureState.dx > 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Dismiss if swiped more than threshold to the right
        if (gestureState.dx > theme.layout.animation.swipeDismissThreshold) {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: theme.layout.animation.swipeAnimationDistance,
              duration: theme.layout.animation.duration,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: theme.layout.animation.duration,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onDismiss();
          });
        } else {
          // Snap back to original position
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return {
    translateX,
    opacity,
    panHandlers: panResponder.panHandlers,
    resetPosition,
  };
};
