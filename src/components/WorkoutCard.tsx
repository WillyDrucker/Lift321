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
import {Animated, Text, Image, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {theme} from '@/theme';
import type {MainStackParamList} from '@/navigation/types';
import {styles} from './WorkoutCard.styles';
import {
  type WorkoutType,
  type BodyPart,
  type CustomWorkout,
  type WorkoutSuggester,
  type BodyPartOrRest,
  isBodyPart,
  getWorkoutTitle,
  getCustomWorkoutColor,
  getWorkoutImage,
} from './WorkoutCard.helpers';
import {getBodyPartForDay} from '@/utils/workoutSchedule';

// Re-export types for external consumers
export type {BodyPart, CustomWorkout, WorkoutType, WorkoutSuggester};

// === TYPES ===

export type WorkoutCardProps = {
  suggester?: WorkoutSuggester;  // NEW: Suggester-based mode
  workoutType?: WorkoutType;     // LEGACY: Keep for backward compat
  animatedTop?: Animated.Value;
  isFirstCard?: boolean;
  isLastCard?: boolean;
  index?: number;
  scrollX?: Animated.Value;
  cardIndex?: number;
  cardWidth?: number;
};

// === COMPONENT ===

export const WorkoutCard: React.FC<WorkoutCardProps> = React.memo(
  ({suggester, workoutType, animatedTop, isFirstCard = false, isLastCard = false, index = 0, scrollX, cardIndex = 0, cardWidth: propCardWidth}) => {
    // === HOOKS ===
    // Navigation hook for screen transitions

    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    // === ANIMATION STATE ===
    // Entrance animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(theme.layout.workoutCard.animation.entranceDistance)).current;

    // Press animation values
    const cardScale = useRef(new Animated.Value(1)).current;

    // === DERIVED STATE ===
    // Determine content based on mode: suggester-based or legacy workoutType

    // === CARD CONTENT CONFIGURATION ===
    // All cards now follow uniform pattern: title + overlay strip + pill

    // Determine if this card uses day-based rotation or static content
    const usesDayRotation = suggester === '3-2-1 A.I. Trainer';

    // Get body part for day-rotating cards
    const bodyPart: BodyPartOrRest = usesDayRotation
      ? getBodyPartForDay()
      : (workoutType as BodyPart) || 'Chest'; // Default fallback

    // Card title - displayed in header area
    const workoutTitle = (() => {
      switch (suggester) {
        case '3-2-1 A.I. Trainer':
          return getWorkoutTitle(bodyPart); // Day-based rotation
        case 'Personal Trainer (Jax Mercer)':
          return 'BICEPS + TRIS';
        case 'Coach (Coach Schwarz)':
          return 'BOOTCAMP';
        case 'Partner (Willy D.)':
          return 'CHEST';
        case 'Custom Workout (Willy D.)':
          return 'CHEST';
        default:
          return getWorkoutTitle(bodyPart);
      }
    })();

    // Overlay strip text - displayed on semi-transparent bar at top of image
    const overlayStripText = (() => {
      switch (suggester) {
        case '3-2-1 A.I. Trainer':
          return 'A.I. Guided';
        case 'Personal Trainer (Jax Mercer)':
          return 'Personal Trainer';
        case 'Coach (Coach Schwarz)':
          return 'New Fairfield High School';
        case 'Partner (Willy D.)':
          return 'Partner';
        case 'Custom Workout (Willy D.)':
          return 'Custom';
        default:
          return null;
      }
    })();

    // Card image - background image for card
    const workoutImage = (() => {
      switch (suggester) {
        case '3-2-1 A.I. Trainer':
          return getWorkoutImage(bodyPart); // Day-based rotation
        case 'Personal Trainer (Jax Mercer)':
          return require('@/assets/images/workouts/personal-trainer.png');
        case 'Coach (Coach Schwarz)':
          return require('@/assets/images/workouts/coach.png');
        case 'Partner (Willy D.)':
          return require('@/assets/images/workouts/partner.png'); // Static image
        case 'Custom Workout (Willy D.)':
          return require('@/assets/images/workouts/custom.png');
        default:
          return getWorkoutImage(bodyPart);
      }
    })();

    const isBodyPartWorkout = bodyPart !== 'Rest';

    // Pill text - displayed in bottom right corner pill
    const suggesterDisplayText = (() => {
      switch (suggester) {
        case '3-2-1 A.I. Trainer':
          return '3-2-1 Training';
        case 'Personal Trainer (Jax Mercer)':
          return 'Jax Mercer';
        case 'Coach (Coach Schwarz)':
          return 'Coach Schwarz';
        case 'Partner (Willy D.)':
          return 'Willy D.';
        case 'Custom Workout (Willy D.)':
          return 'Willy D.';
        default:
          return null;
      }
    })();

    // Get color for custom workout types (legacy mode only)
    const customWorkoutColor = workoutType ? getCustomWorkoutColor(workoutType) : null;

    // Card accent color - used for title and pill text
    const cardAccentColor = (() => {
      switch (suggester) {
        case '3-2-1 A.I. Trainer':
          return theme.colors.actionSuccess; // Green
        case 'Personal Trainer (Jax Mercer)':
          return theme.colors.customWorkoutBlue;
        case 'Coach (Coach Schwarz)':
          return theme.colors.coachSteelBlue;
        case 'Partner (Willy D.)':
          return theme.colors.customWorkoutCyan;
        case 'Custom Workout (Willy D.)':
          return theme.colors.customWorkoutBlue;
        default:
          // Legacy mode: use customWorkoutColor if available, otherwise green
          return customWorkoutColor || theme.colors.actionSuccess;
      }
    })();

    // For navigation - static cards always go to Chest, day-rotating cards use bodyPart
    const navigationWorkoutType: BodyPart = (() => {
      // Only 3-2-1 A.I. Trainer uses day-based rotation
      if (suggester === '3-2-1 A.I. Trainer') {
        return bodyPart === 'Rest' ? 'Chest' : bodyPart as BodyPart;
      }
      // All other cards (static) default to Chest
      return 'Chest';
    })();

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

    const handleWorkoutPress = () => {
      navigation.navigate('WorkoutOverview', {
        workoutType: navigationWorkoutType,
        suggester: suggester,
      });
    };

    // Spacing wrapper - handles margin between cards
    const spacingStyle = {
      marginRight: isLastCard ? 0 : theme.layout.recommendedWorkout.cardSpacing,
    };

    return (
      <View style={spacingStyle}>
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
                opacity: Animated.multiply(fadeAnim, scrollOpacity),
                transform: [
                  {translateY: slideAnim},
                  {scale: Animated.multiply(cardScale, scrollScale)},
                ],
              },
              animatedTop ? {top: animatedTop} : undefined,
            ]}
          >
          {/* Header Area - title with accent color */}
          <View style={styles.headerArea}>
            <Text
              style={[
                styles.workoutTitle,
                styles.bodyPartTitle,
                {color: cardAccentColor},
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
                  style={[
                    styles.workoutImage,
                    (suggester === 'Personal Trainer (Jax Mercer)' || suggester === 'Partner (Willy D.)') && styles.topAlignedImage,
                  ]}
                  resizeMode="cover"
                />
              </Animated.View>
              {/* Image overlay bar - semi-transparent strip at top of image */}
              {overlayStripText && (
                <View style={styles.imageOverlayBar}>
                  <Text style={styles.imageOverlayText}>{overlayStripText}</Text>
                </View>
              )}
            </View>
          )}

          {/* Pill - Bottom right corner with accent color */}
          {suggesterDisplayText && (
            <View style={styles.suggesterPill}>
              <Text
                style={[
                  styles.suggesterText,
                  {color: cardAccentColor},
                ]}
              >
                {suggesterDisplayText}
              </Text>
            </View>
          )}
      </Animated.View>
      </Pressable>
      </View>
    );
  },
);

WorkoutCard.displayName = 'WorkoutCard';
