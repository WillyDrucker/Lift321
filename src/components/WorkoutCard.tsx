// ==========================================================================
// WORKOUT CARD COMPONENT
//
// Reusable workout card for body part workouts.
// Displays body part name with customizable styling.
//
// Dependencies: React Native Animated API, theme tokens
// Used by: WorkoutCardsScroller, HomePage
// ==========================================================================

import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, Image, View, ImageSourcePropType, Pressable, Easing} from 'react-native';
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
  index?: number; // Card index for staggered entrance animation
  scrollX?: Animated.Value; // Scroll position for scroll-based animations
  cardIndex?: number; // Card position in scroller for interpolation calculations
  cardWidth?: number; // Dynamic card width from parent scroller
};

// === HELPERS ===

/**
 * Helper to check if workout type is a body part
 */
const isBodyPart = (workoutType: WorkoutType): workoutType is BodyPart => {
  return ['Chest', 'Arms', 'Shoulders', 'Back & Tris', 'Legs'].includes(workoutType);
};

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
 * Gets custom workout color based on workout type
 */
const getCustomWorkoutColor = (workoutType: WorkoutType): string | null => {
  if (isBodyPart(workoutType)) {
    return null;
  }

  switch (workoutType) {
    case 'Custom':
      return '#0099FF'; // Blue
    case 'Work-As-You-Go':
      return '#0099FF'; // Blue
    case 'SuperSet':
      return '#FFFF00'; // Yellow
    case 'Partner Mode':
      return '#00ffee'; // Cyan
    default:
      return null;
  }
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

// === COMPONENT ===

export const WorkoutCard: React.FC<WorkoutCardProps> = React.memo(
  ({workoutType, animatedTop, isFirstCard = false, isLastCard = false, index = 0, scrollX, cardIndex = 0, cardWidth: propCardWidth}) => {
    // === HOOKS ===
    // Navigation hook for screen transitions

    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    // === ANIMATION STATE ===
    // Entrance animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(theme.layout.workoutCard.animation.entranceDistance)).current;

    // Press animation values
    const cardScale = useRef(new Animated.Value(1)).current;
    const buttonScale = useRef(new Animated.Value(1)).current;

    // === DERIVED STATE ===
    // Determine workout title and image based on workout type

    const workoutTitle = getWorkoutTitle(workoutType);
    const workoutImage = getWorkoutImage(workoutType);
    const isBodyPartWorkout = isBodyPart(workoutType);

    // Get color for custom workout types
    const customWorkoutColor = getCustomWorkoutColor(workoutType);

    // Use prop width if provided (dynamic sizing), otherwise fall back to theme token
    const cardWidth = propCardWidth ?? theme.layout.recommendedWorkout.cardWidth;

    // === SCROLL INTERPOLATIONS ===
    // Calculate scroll-based animation values with non-linear easing curves

    const cardSpacing = theme.layout.recommendedWorkout.cardSpacing; // 8dp
    const cardStep = cardWidth + cardSpacing; // Total space per card (338dp)

    // Enhanced input range with 7 points for smooth easing curves
    // Creates ease-out effect: rapid change near center, gradual at edges
    const enhancedInputRange = [
      (cardIndex - 1.5) * cardStep,  // Far before center (-507px)
      (cardIndex - 1) * cardStep,    // Before center (-338px)
      (cardIndex - 0.3) * cardStep,  // Approaching center (-101px) - rapid acceleration zone
      cardIndex * cardStep,          // At center (0px)
      (cardIndex + 0.3) * cardStep,  // Leaving center (+101px) - rapid deceleration zone
      (cardIndex + 1) * cardStep,    // After center (+338px)
      (cardIndex + 1.5) * cardStep,  // Far after center (+507px)
    ];

    // Scale interpolation with ease-out curve: rapid growth approaching center, slow shrink at edges
    const scrollScale = scrollX
      ? scrollX.interpolate({
          inputRange: enhancedInputRange,
          outputRange: [
            theme.layout.workoutCard.animation.scrollScaleMin,      // 0.90 - far edge
            theme.layout.workoutCard.animation.scrollScaleMin,      // 0.90 - edge
            0.96,                                                    // 0.96 - approaching (rapid growth)
            theme.layout.workoutCard.animation.scrollScaleMax,      // 1.02 - center peak
            0.96,                                                    // 0.96 - leaving (rapid shrink)
            theme.layout.workoutCard.animation.scrollScaleMin,      // 0.90 - edge
            theme.layout.workoutCard.animation.scrollScaleMin,      // 0.90 - far edge
          ],
          extrapolate: 'clamp',
        })
      : new Animated.Value(1);

    // Opacity interpolation with gentle ease-in-out: smooth fade transitions
    const scrollOpacity = scrollX
      ? scrollX.interpolate({
          inputRange: enhancedInputRange,
          outputRange: [
            theme.layout.workoutCard.animation.scrollOpacityMin,    // 0.75 - far edge
            theme.layout.workoutCard.animation.scrollOpacityMin,    // 0.75 - edge
            0.88,                                                    // 0.88 - approaching
            theme.layout.workoutCard.animation.scrollOpacityMax,    // 1.0 - center
            0.88,                                                    // 0.88 - leaving
            theme.layout.workoutCard.animation.scrollOpacityMin,    // 0.75 - edge
            theme.layout.workoutCard.animation.scrollOpacityMin,    // 0.75 - far edge
          ],
          extrapolate: 'clamp',
        })
      : new Animated.Value(1);

    // Parallax interpolation with linear motion for consistent depth effect
    const imageParallax = scrollX
      ? scrollX.interpolate({
          inputRange: enhancedInputRange,
          outputRange: [
            -theme.layout.workoutCard.animation.parallaxDistance * 1.2,  // -48px - extra movement at far edge
            -theme.layout.workoutCard.animation.parallaxDistance,        // -40px - edge
            -theme.layout.workoutCard.animation.parallaxDistance * 0.3,  // -12px - approaching
            0,                                                            // 0px - center (no offset)
            theme.layout.workoutCard.animation.parallaxDistance * 0.3,   // +12px - leaving
            theme.layout.workoutCard.animation.parallaxDistance,         // +40px - edge
            theme.layout.workoutCard.animation.parallaxDistance * 1.2,   // +48px - extra movement at far edge
          ],
          extrapolate: 'clamp',
        })
      : new Animated.Value(0);

    // === EFFECTS ===
    // Initialize card without entrance animation
    useEffect(() => {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
    }, [fadeAnim, slideAnim]);

    // === EVENT HANDLERS ===
    // Card press animations
    const handleCardPressIn = () => {
      Animated.spring(cardScale, {
        toValue: theme.layout.workoutCard.animation.pressScaleMin,
        friction: theme.layout.workoutCard.animation.pressSpringFriction,
        useNativeDriver: true,
      }).start();
    };

    const handleCardPressOut = () => {
      Animated.spring(cardScale, {
        toValue: 1,
        friction: theme.layout.workoutCard.animation.pressSpringFriction,
        useNativeDriver: true,
      }).start();
    };

    // Button press animations
    const handleButtonPressIn = () => {
      Animated.spring(buttonScale, {
        toValue: theme.layout.workoutCard.animation.buttonPressScaleMin,
        friction: theme.layout.workoutCard.animation.pressSpringFriction,
        useNativeDriver: true,
      }).start();
    };

    const handleButtonPressOut = () => {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: theme.layout.workoutCard.animation.pressSpringFriction,
        useNativeDriver: true,
      }).start();
    };

    const handleWorkoutPress = () => {
      navigation.navigate('WorkoutOverview', {workoutType});
    };

    return (
      <Pressable
        onPressIn={handleCardPressIn}
        onPressOut={handleCardPressOut}
        onPress={handleWorkoutPress}
      >
        <Animated.View
          style={[
            styles.workoutCard,
            {
              width: cardWidth,
              opacity: Animated.multiply(fadeAnim, scrollOpacity), // Combine entrance fade with scroll opacity
              transform: [
                {translateY: slideAnim},
                {scale: Animated.multiply(cardScale, scrollScale)}, // Combine press scale with scroll scale
              ],
            },
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
                !isBodyPartWorkout && styles.customWorkoutTitle,
                !isBodyPartWorkout && customWorkoutColor && {color: customWorkoutColor},
              ]}
            >
              {workoutTitle}
            </Text>
          </View>

          {/* Image Area - Remaining space */}
          {workoutImage && (
            <View style={styles.imageArea}>
              <Animated.View
                style={{
                  width: '100%',
                  height: '100%',
                  transform: [{translateX: imageParallax}],
                }}
              >
                <Image
                  source={workoutImage}
                  style={styles.workoutImage}
                  resizeMode="cover"
                />
              </Animated.View>
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
            <Pressable
              onPressIn={handleButtonPressIn}
              onPressOut={handleButtonPressOut}
              onPress={handleWorkoutPress}
            >
              <Animated.View
                style={[
                  styles.beginButton,
                  !isBodyPartWorkout && customWorkoutColor && {backgroundColor: customWorkoutColor},
                  {transform: [{scale: buttonScale}]},
                ]}
              >
                <Text style={styles.beginButtonText}>BEGIN</Text>
              </Animated.View>
            </Pressable>
          </View>
      </Animated.View>
      </Pressable>
    );
  },
);

WorkoutCard.displayName = 'WorkoutCard';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  workoutCard: {
    // Width is set dynamically using theme token (310dp)
    height: theme.layout.recommendedWorkout.height,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    marginRight: 8, // 8dp gap between cards (explicit value)
    overflow: 'hidden', // Clip image to border radius
  },

  headerArea: {
    height: 48, // Fixed header area for card title (reduced from 64dp)
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
    fontSize: 36, // 36dp for primary workouts
    fontFamily: theme.typography.fontFamily.workoutCard,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false, // Eliminate Android font padding for precise alignment
    transform: [{scaleX: 1.2}, {translateY: 2}], // 20% wider + 2dp down for balanced vertical centering (32px = ~11dp)
    marginLeft: 11, // 11dp left margin to match balanced vertical spacing
    textShadowColor: theme.colors.shadowBlack, // Black shadow
    textShadowOffset: {width: 0, height: 2}, // Drop shadow 2dp down
    textShadowRadius: 4, // Shadow blur radius
  },

  customWorkoutTitle: {
    fontSize: 36, // 36dp to match primary workouts
    fontFamily: theme.typography.fontFamily.workoutCard, // Same font as primary workouts (Zuume-ExtraBold)
    textTransform: 'uppercase', // All caps
    includeFontPadding: false, // Eliminate Android font padding for precise alignment
    transform: [{scaleX: 1.2}, {translateY: 2}], // 20% wider + 2dp down for balanced vertical centering
    marginLeft: 22, // Adjusted to maintain 16dp visual alignment from card edge
    textShadowColor: theme.colors.shadowBlack, // Black shadow
    textShadowOffset: {width: 0, height: 2}, // Drop shadow 2dp down
    textShadowRadius: 4, // Shadow blur radius
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
    top: 6, // Furthest shadow layer (offset down)
    right: 0,
    opacity: 0.15,
  },

  shadowLayer2: {
    top: 4, // Middle shadow layer (offset down)
    right: 0,
    opacity: 0.25,
  },

  shadowLayer1: {
    top: 2, // Closest shadow layer (offset down)
    right: 0,
    opacity: 0.4,
  },

  beginButton: {
    position: 'absolute',
    top: 0,
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
