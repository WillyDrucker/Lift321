// ==========================================================================
// SEGMENTED CONTROL COMPONENT
//
// iOS-style segmented control for switching between options.
// Two equal-width touchable segments with active/inactive states.
// Supports shake animation on individual segments for errors.
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
// SHAKEABLE SEGMENT COMPONENT
// ============================================================================

type ShakeableSegmentProps = {
  children: ReactNode;
  hasError: boolean;
  onAnimationComplete: () => void;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onPress: () => void;
};

const ShakeableSegment: React.FC<ShakeableSegmentProps> = ({
  children,
  hasError,
  onAnimationComplete,
  isSelected,
  isFirst,
  isLast,
  onPress,
}) => {
  const shakeOffset = useSharedValue(0);

  useEffect(() => {
    if (hasError) {
      // Quick shake: left-right-left-right-center
      shakeOffset.value = withSequence(
        withTiming(-8, {duration: 50}),
        withTiming(8, {duration: 50}),
        withTiming(-6, {duration: 50}),
        withTiming(6, {duration: 50}),
        withTiming(0, {duration: 50}, () => {
          runOnJS(onAnimationComplete)();
        }),
      );
    }
  }, [hasError, onAnimationComplete, shakeOffset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: shakeOffset.value}],
  }));

  return (
    <Animated.View style={[styles.segmentWrapper, animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.segment,
          isSelected && styles.segmentActive,
          isFirst && styles.segmentFirst,
          isLast && styles.segmentLast,
        ]}
        onPress={onPress}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
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
          <ShakeableSegment
            key={index}
            hasError={hasError}
            onAnimationComplete={() => onErrorAnimationComplete?.(index)}
            isSelected={isSelected}
            isFirst={isFirst}
            isLast={isLast}
            onPress={() => onSelect(index)}
          >
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
          </ShakeableSegment>
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
  segmentWrapper: {
    flex: 1,
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
});

// Memoize to prevent re-renders when props haven't changed
export const SegmentedControl = memo(SegmentedControlComponent);
