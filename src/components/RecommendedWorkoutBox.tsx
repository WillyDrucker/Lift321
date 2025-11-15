// ==========================================================================
// RECOMMENDED WORKOUT BOX COMPONENT
//
// Daily recommended workout card with animated positioning.
// Displays workout title and exercises for the current training day.
//
// Dependencies: React Native Animated API, theme tokens
// Used by: HomePage, workout scheduling screens
// ==========================================================================

import React from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type RecommendedWorkoutBoxProps = {
  workoutTitle: string;
  animatedTop: Animated.Value;
};

// === COMPONENT ===

export const RecommendedWorkoutBox: React.FC<RecommendedWorkoutBoxProps> = ({
  workoutTitle,
  animatedTop,
}) => {
  return (
    <Animated.View style={[styles.workoutBox, {top: animatedTop}]}>
      <Text style={styles.workoutTitle}>{workoutTitle}</Text>
    </Animated.View>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  workoutBox: {
    position: 'absolute',
    // top is animated - controlled by parent component
    left: theme.layout.recommendedWorkout.leftMargin,
    right: theme.layout.recommendedWorkout.rightMargin,
    height: theme.layout.recommendedWorkout.height,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    paddingLeft: theme.layout.recommendedWorkout.paddingLeft,
    paddingTop: theme.layout.recommendedWorkout.paddingTop,
  },
  workoutTitle: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.pureWhite,
  },
});
