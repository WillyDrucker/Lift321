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

// Consistent card width for smooth scrolling with snapToOffsets
// All cards are 330dp with 8dp spacing and 8dp peeks
const CARD_WIDTH = 330;
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp
const LEFT_MARGIN = theme.layout.recommendedWorkout.leftMargin; // 8dp

// Calculate snap offsets for each card to ensure 8dp peeks
// Card 1: offset 0 (starts at 8dp from left)
// Card 2+: offset ensures previous card shows 8dp peek on left
// Last card: offset ensures 8dp margin on right
const SNAP_OFFSETS = BODY_PARTS.map((_, index) => {
  if (index === 0) return 0; // First card at left margin
  if (index === BODY_PARTS.length - 1) {
    // Last card: right edge at screen width - right padding
    const cardStartPosition = LEFT_MARGIN + index * (CARD_WIDTH + CARD_SPACING);
    return cardStartPosition - (360 - LEFT_MARGIN - CARD_WIDTH); // 360 = screen width
  }
  // Middle cards: show 8dp peek of previous card
  return CARD_WIDTH + (index - 1) * (CARD_WIDTH + CARD_SPACING);
});

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
          decelerationRate="normal"
          snapToOffsets={SNAP_OFFSETS}
          snapToAlignment="start"
          disableIntervalMomentum={true}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
        >
          {BODY_PARTS.map((bodyPart, index) => (
            <WorkoutCard
              key={`${bodyPart}-${index}`}
              workoutType={bodyPart}
              isFirstCard={index === 0}
              isLastCard={index === BODY_PARTS.length - 1}
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
    marginBottom: 0, // No bottom margin - section header controls spacing
  },

  scrollContent: {
    paddingLeft: theme.layout.recommendedWorkout.leftMargin,
    paddingRight: theme.layout.recommendedWorkout.cardSpacing, // 8dp peek to show next card edge when scrolled
  },
});
