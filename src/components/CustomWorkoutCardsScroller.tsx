// ==========================================================================
// CUSTOM WORKOUT CARDS SCROLLER COMPONENT
//
// Horizontal scrollable container for custom workout cards with partial card visibility.
// Displays custom workout mode cards with swipe navigation and peek.
//
// Dependencies: React Native ScrollView, theme tokens
// Used by: HomePage
// ==========================================================================

import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {theme} from '@/theme';
import {WorkoutCard, type CustomWorkout} from './WorkoutCard';

// === TYPES ===

export type CustomWorkoutCardsScrollerProps = {
  // No props needed - component uses flow layout
};

// === CONSTANTS ===

const CUSTOM_WORKOUTS: CustomWorkout[] = [
  'Custom',
  'Work-As-You-Go',
  'SuperSet',
  'Partner Mode',
];

// Snap positions for variable-width card scrolling
// Ensures cards align with left edge and maintain 10dp peek visibility
const SNAP_OFFSETS = [
  0,    // Custom (first card, 330dp width)
  330,  // Work-As-You-Go (middle card, 320dp width + 10dp peek)
  660,  // SuperSet (middle card, 320dp width + 10dp spacing)
  990,  // Partner Mode (last card, 320dp width + 10dp spacing)
];

// === COMPONENT ===

export const CustomWorkoutCardsScroller: React.FC<CustomWorkoutCardsScrollerProps> =
  React.memo(() => {
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);

    // === RENDER ===

    return (
      <View style={styles.container}>
        {/* Horizontal Scroller */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToOffsets={SNAP_OFFSETS}
          snapToAlignment="start"
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
        >
          {CUSTOM_WORKOUTS.map((customWorkout, index) => (
            <WorkoutCard
              key={`${customWorkout}-${index}`}
              workoutType={customWorkout}
              index={index}
              totalCards={CUSTOM_WORKOUTS.length}
            />
          ))}
        </ScrollView>
      </View>
    );
  });

CustomWorkoutCardsScroller.displayName = 'CustomWorkoutCardsScroller';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    height: theme.layout.recommendedWorkout.height,
    overflow: 'visible',
    marginBottom: theme.layout.recommendedWorkout.cardSpacing, // Consistent spacing after section
  },

  scrollContent: {
    paddingLeft: theme.layout.recommendedWorkout.leftMargin,
    paddingRight: theme.layout.recommendedWorkout.rightMargin,
  },
});
