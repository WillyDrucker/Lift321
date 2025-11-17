// ==========================================================================
// WORKOUT CARD COMPONENT
//
// Reusable workout card for body part workouts.
// Displays body part name with customizable styling.
//
// Dependencies: React Native Animated API, theme tokens
// Used by: WorkoutCardsScroller, HomePage
// ==========================================================================

import React from 'react';
import {Animated, StyleSheet, Text, Image, View, ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type BodyPart = 'Chest' | 'Arms' | 'Shoulders' | 'Back & Tris' | 'Legs';
export type CustomWorkout = 'Custom' | 'Work-As-You-Go' | 'SuperSet' | 'Partner Mode';
export type WorkoutType = BodyPart | CustomWorkout;

export type WorkoutCardProps = {
  workoutType: WorkoutType;
  animatedTop?: Animated.Value;
  index?: number;
  totalCards?: number;
};

// === COMPONENT ===

export const WorkoutCard: React.FC<WorkoutCardProps> = React.memo(
  ({workoutType, animatedTop, index = 0, totalCards = 1}) => {
    // Determine workout title and image based on workout type
    const workoutTitle = getWorkoutTitle(workoutType);
    const workoutImage = getWorkoutImage(workoutType);
    const isBodyPartWorkout = isBodyPart(workoutType);

    // Calculate card width: first and last cards are 330dp, middle cards are 320dp
    const isFirstCard = index === 0;
    const isLastCard = index === totalCards - 1;
    const cardWidth = isFirstCard || isLastCard ? 330 : 320;

    return (
      <Animated.View
        style={[
          styles.workoutCard,
          {width: cardWidth},
          animatedTop ? {top: animatedTop} : undefined,
        ]}
      >
        {/* Header Area - 64dp */}
        <View style={styles.headerArea}>
          <Text
            style={[
              styles.workoutTitle,
              isBodyPartWorkout && styles.bodyPartTitle,
            ]}
          >
            {workoutTitle}
          </Text>
        </View>

        {/* Image Area - Remaining space */}
        {workoutImage && (
          <View style={styles.imageArea}>
            <Image
              source={workoutImage}
              style={styles.workoutImage}
              resizeMode="cover"
            />
          </View>
        )}
      </Animated.View>
    );
  },
);

WorkoutCard.displayName = 'WorkoutCard';

// === HELPERS ===

/**
 * Gets workout card title based on workout type
 */
const getWorkoutTitle = (workoutType: WorkoutType): string => {
  // Body part workouts show just the body part name
  if (isBodyPart(workoutType)) {
    return workoutType;
  }

  // Custom workouts show specific names
  switch (workoutType) {
    case 'Custom':
      return 'Custom Workout';
    case 'Work-As-You-Go':
      return 'Work-As-You-Go';
    case 'SuperSet':
      return 'SuperSet Mode';
    case 'Partner Mode':
      return 'Partner Mode';
  }
};

/**
 * Helper to check if workout type is a body part
 */
const isBodyPart = (workoutType: WorkoutType): workoutType is BodyPart => {
  return ['Chest', 'Arms', 'Shoulders', 'Back & Tris', 'Legs'].includes(workoutType);
};

/**
 * Gets workout image source based on workout type
 * Returns null if image doesn't exist yet
 */
const getWorkoutImage = (workoutType: WorkoutType): ImageSourcePropType | null => {
  switch (workoutType) {
    // Body part workouts
    case 'Chest':
      return require('@/assets/images/workouts/chest.png');
    case 'Arms':
      return require('@/assets/images/workouts/arms.png');
    case 'Shoulders':
      return require('@/assets/images/workouts/shoulders.png');
    case 'Back & Tris':
      return require('@/assets/images/workouts/back.png');
    case 'Legs':
      return require('@/assets/images/workouts/legs.png');

    // Custom workouts
    case 'Custom':
      return require('@/assets/images/workouts/custom.png');
    case 'Work-As-You-Go':
      return require('@/assets/images/workouts/work-as-you-go.png');
    case 'SuperSet':
      return require('@/assets/images/workouts/superset.png');
    case 'Partner Mode':
      return require('@/assets/images/workouts/partner-mode.png');
  }
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  workoutCard: {
    // Width is set dynamically: 330dp for first/last, 320dp for middle cards
    height: theme.layout.recommendedWorkout.height,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    marginRight: theme.layout.recommendedWorkout.cardSpacing,
    overflow: 'hidden', // Clip image to border radius
  },

  headerArea: {
    height: 64, // Fixed header area for card title
    paddingLeft: theme.layout.recommendedWorkout.paddingLeft,
    paddingTop: 0, // Vertical centering handled by justifyContent
    justifyContent: 'center', // Center title vertically in header
    alignItems: 'flex-start', // Left align title horizontally
  },

  workoutTitle: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.pureWhite,
  },

  bodyPartTitle: {
    fontSize: theme.typography.fontSize.xxxl,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false, // Eliminate Android font padding for precise alignment
  },

  imageArea: {
    flex: 1, // Fill remaining card height below header
    width: '100%',
  },

  workoutImage: {
    width: '100%',
    height: '100%',
  },
});
