// ==========================================================================
// WORKOUT CARDS SCROLLER COMPONENT
//
// Horizontal scrollable container for workout cards with partial card visibility.
// Displays multiple body part workout cards with swipe navigation and peek.
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
import {WorkoutCard, type BodyPart} from './WorkoutCard';

// === TYPES ===

export type WorkoutCardsScrollerProps = {
  // No props needed - component uses flow layout
};

// === CONSTANTS ===

const BODY_PARTS: BodyPart[] = [
  'Chest',
  'Arms',
  'Shoulders',
  'Back & Tris',
  'Legs',
];

// Snap positions for variable-width card scrolling
// Ensures cards align with left edge and maintain 10dp peek visibility
const SNAP_OFFSETS = [
  0, // Chest (first card, 330dp width)
  330, // Arms (middle card, 320dp width + 10dp peek)
  660, // Shoulders (middle card, 320dp width + 10dp spacing)
  990, // Back & Tris (middle card, 320dp width + 10dp spacing)
  1320, // Legs (last card, 320dp width + 10dp spacing)
];

// === COMPONENT ===

export const WorkoutCardsScroller: React.FC<WorkoutCardsScrollerProps> =
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
          {BODY_PARTS.map((bodyPart, index) => (
            <WorkoutCard
              key={`${bodyPart}-${index}`}
              workoutType={bodyPart}
              index={index}
              totalCards={BODY_PARTS.length}
            />
          ))}
        </ScrollView>
      </View>
    );
  });

WorkoutCardsScroller.displayName = 'WorkoutCardsScroller';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    height: theme.layout.recommendedWorkout.height,
    overflow: 'visible',
    marginBottom: theme.layout.recommendedWorkout.cardSpacing, // Consistent spacing before section headers
  },

  scrollContent: {
    paddingLeft: theme.layout.recommendedWorkout.leftMargin,
    paddingRight: theme.layout.recommendedWorkout.rightMargin,
  },
});
