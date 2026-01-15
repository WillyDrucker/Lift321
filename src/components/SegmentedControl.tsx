// ==========================================================================
// SEGMENTED CONTROL COMPONENT
//
// iOS-style segmented control for switching between options.
// Two equal-width touchable segments with active/inactive states.
// Supports error flash animation on individual segments.
//
// Dependencies: theme tokens, react-native-reanimated
// Used by: ToggleableDialControlCard, other components needing mode selection
// ==========================================================================

import React, {memo, useEffect} from 'react';
import type {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {theme} from '@/theme';

// ============================================================================
// CONSTANTS
// ============================================================================

const ERROR_FLASH_DURATION = 200; // 200ms per flash transition

// ============================================================================
// TYPES
// ============================================================================

type SegmentedControlProps = {
  options: (string | ReactNode)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  errorStates?: boolean[]; // Error state for each segment
  onErrorAnimationComplete?: (index: number) => void; // Called when error animation ends
};

// ============================================================================
// ERROR OVERLAY COMPONENT
// ============================================================================

type ErrorOverlayProps = {
  hasError: boolean;
  onAnimationComplete: () => void;
  isFirst: boolean;
  isLast: boolean;
};

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({
  hasError,
  onAnimationComplete,
  isFirst,
  isLast,
}) => {
  const errorFlash = useSharedValue(0);

  useEffect(() => {
    if (hasError) {
      // 3 flashes: on-off-on-off-on-off (start visible, end hidden)
      errorFlash.value = withSequence(
        withTiming(1, {duration: 0}), // Start immediately visible
        withTiming(0, {duration: ERROR_FLASH_DURATION}),
        withTiming(1, {duration: ERROR_FLASH_DURATION}),
        withTiming(0, {duration: ERROR_FLASH_DURATION}),
        withTiming(1, {duration: ERROR_FLASH_DURATION}),
        withTiming(0, {duration: ERROR_FLASH_DURATION}, () => {
          runOnJS(onAnimationComplete)();
        }),
      );
    }
  }, [hasError, onAnimationComplete, errorFlash]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: errorFlash.value * 0.6,
  }));

  return (
    <Animated.View
      style={[
        styles.errorOverlay,
        isFirst && styles.errorOverlayFirst,
        isLast && styles.errorOverlayLast,
        animatedStyle,
      ]}
      pointerEvents="none"
    />
  );
};

// ============================================================================
// COMPONENT
// ============================================================================

const SegmentedControlComponent: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
  errorStates,
  onErrorAnimationComplete,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        const isString = typeof option === 'string';
        const hasError = errorStates?.[index] ?? false;
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.segment,
              isSelected && styles.segmentActive,
              isFirst && styles.segmentFirst,
              isLast && styles.segmentLast,
            ]}
            onPress={() => onSelect(index)}
            activeOpacity={1}
          >
            {/* Error Flash Overlay - always rendered to prevent unmount during animation */}
            {onErrorAnimationComplete && (
              <ErrorOverlay
                hasError={hasError}
                onAnimationComplete={() => onErrorAnimationComplete(index)}
                isFirst={isFirst}
                isLast={isLast}
              />
            )}
            {isString ? (
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextActive,
                ]}
              >
                {option}
              </Text>
            ) : (
              option
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
  },
  segment: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  segmentFirst: {
    borderTopLeftRadius: theme.spacing.s,
    borderBottomLeftRadius: theme.spacing.s,
  },
  segmentLast: {
    borderTopRightRadius: theme.spacing.s,
    borderBottomRightRadius: theme.spacing.s,
  },
  segmentActive: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: theme.colors.actionSuccess,
  },
  segmentText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  segmentTextActive: {
    color: theme.colors.textPrimary,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.actionDanger,
    zIndex: 10,
  },
  errorOverlayFirst: {
    borderTopLeftRadius: theme.spacing.s,
    borderBottomLeftRadius: theme.spacing.s,
  },
  errorOverlayLast: {
    borderTopRightRadius: theme.spacing.s,
    borderBottomRightRadius: theme.spacing.s,
  },
});

// Memoize to prevent re-renders when props haven't changed
export const SegmentedControl = memo(SegmentedControlComponent);
