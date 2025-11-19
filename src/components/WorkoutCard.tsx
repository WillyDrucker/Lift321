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
import {Animated, StyleSheet, Text, Image, View, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '@/theme';
import type {MainStackParamList} from '@/navigation/types';

// === TYPES ===

export type BodyPart = 'Chest' | 'Arms' | 'Shoulders' | 'Back & Tris' | 'Legs';
export type CustomWorkout = 'Custom' | 'Work-As-You-Go' | 'SuperSet' | 'Partner Mode';
export type WorkoutType = BodyPart | CustomWorkout;

export type WorkoutCardProps = {
  workoutType: WorkoutType;
  animatedTop?: Animated.Value;
  isFirstCard?: boolean;
  isLastCard?: boolean;
};

// === COMPONENT ===

export const WorkoutCard: React.FC<WorkoutCardProps> = React.memo(
  ({workoutType, animatedTop, isFirstCard = false, isLastCard = false}) => {
    // === HOOKS ===
    // Navigation hook for screen transitions

    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    // === DERIVED STATE ===
    // Determine workout title and image based on workout type

    const workoutTitle = getWorkoutTitle(workoutType);
    const workoutImage = getWorkoutImage(workoutType);
    const isBodyPartWorkout = isBodyPart(workoutType);

    // Consistent card width for smooth scrolling
    const cardWidth = 330;

    return (
      <Animated.View
        style={[
          styles.workoutCard,
          {width: cardWidth},
          animatedTop ? {top: animatedTop} : undefined,
          isLastCard && {marginRight: 0}, // Remove right margin from last card
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

        {/* Begin Button - Bottom right corner with multi-layer shadow */}
        <View style={styles.beginButtonContainer}>
          {/* Shadow Layer 3 - Darkest, furthest */}
          <View style={[styles.beginButtonShadow, styles.shadowLayer3]} />
          {/* Shadow Layer 2 - Medium darkness */}
          <View style={[styles.beginButtonShadow, styles.shadowLayer2]} />
          {/* Shadow Layer 1 - Lightest, closest */}
          <View style={[styles.beginButtonShadow, styles.shadowLayer1]} />
          {/* Actual Button */}
          <TouchableOpacity
            style={styles.beginButton}
            onPress={() => navigation.navigate('WorkoutOverview', {workoutType})}
            activeOpacity={0.8}
          >
            <Text style={styles.beginButtonText}>BEGIN</Text>
          </TouchableOpacity>
        </View>
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

  beginButtonContainer: {
    position: 'absolute',
    bottom: theme.layout.recommendedWorkout.cardSpacing, // 8dp from bottom edge
    right: theme.layout.recommendedWorkout.cardSpacing, // 8dp from right edge
    width: 100, // 100dp width
    height: 32, // 32dp height
  },

  beginButtonShadow: {
    position: 'absolute',
    width: 100,
    height: 32,
    backgroundColor: theme.colors.shadowBlack,
    borderRadius: 8,
  },

  shadowLayer3: {
    bottom: -6, // Furthest shadow layer
    right: 0,
    opacity: 0.15,
  },

  shadowLayer2: {
    bottom: -4, // Middle shadow layer
    right: 0,
    opacity: 0.25,
  },

  shadowLayer1: {
    bottom: -2, // Closest shadow layer
    right: 0,
    opacity: 0.4,
  },

  beginButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 32,
    backgroundColor: theme.colors.actionSuccess, // Green background
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  beginButtonText: {
    fontSize: theme.typography.fontSize.l, // 20dp
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureBlack, // Black text
    textTransform: 'uppercase',
  },
});
