// ==========================================================================
// WORKOUT CARDS SCROLLER COMPONENT
//
// Horizontal scrollable container for workout cards with partial card visibility.
// Displays multiple body part workout cards with swipe navigation and peek.
//
// Dependencies: React Native ScrollView, theme tokens
// Used by: HomePage
// ==========================================================================

import React, {useMemo, useRef, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {theme} from '@/theme';
import {WorkoutCard, type BodyPart} from './WorkoutCard';

// === TYPES ===

export type WorkoutCardsScrollerProps = {
  initialScrollIndex?: number; // Optional index (0-4) to start scroll position at specific card
};

// === CONSTANTS ===

const BODY_PARTS: BodyPart[] = [
  'Chest',
  'Arms',
  'Shoulders',
  'Back & Tris',
  'Legs',
];

// Card sizing with increased peek visibility
// Cards are 310dp with 8dp spacing and 40dp peeks for better discoverability
const CARD_WIDTH = theme.layout.recommendedWorkout.cardWidth; // 310dp
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp
const LEFT_MARGIN = theme.layout.recommendedWorkout.leftMargin; // 8dp
const PEEK_AMOUNT = theme.layout.recommendedWorkout.peekAmount; // 40dp
const SCREEN_WIDTH = Dimensions.get('window').width; // Dynamic screen width

// Calculate snap offsets for each card to show 40dp peeks of adjacent cards
// Card 1: offset 0 (starts at left margin)
// Card 2+: offset ensures visible peek of previous card
// Last card: offset ensures right margin
const SNAP_OFFSETS = BODY_PARTS.map((_, index) => {
  if (index === 0) return 0; // First card at left margin
  if (index === BODY_PARTS.length - 1) {
    // Last card: right edge at screen width - right margin
    const cardStartPosition = LEFT_MARGIN + index * (CARD_WIDTH + CARD_SPACING);
    return cardStartPosition - (SCREEN_WIDTH - LEFT_MARGIN - CARD_WIDTH);
  }
  // Middle cards: show peek of previous card on left
  return CARD_WIDTH + (index - 1) * (CARD_WIDTH + CARD_SPACING);
});

// === COMPONENT ===

export const WorkoutCardsScroller: React.FC<WorkoutCardsScrollerProps> =
  React.memo(({initialScrollIndex = 0}) => {
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position for animations

    // === COMPUTED VALUES ===

    /**
     * Calculate initial scroll offset based on initialScrollIndex
     * Uses SNAP_OFFSETS to align with same snap points used during scrolling
     */
    const scrollOffset = useMemo(() => {
      const clampedIndex = Math.max(0, Math.min(initialScrollIndex, BODY_PARTS.length - 1));
      return SNAP_OFFSETS[clampedIndex];
    }, [initialScrollIndex]);

    // === EFFECTS ===

    /**
     * Scroll to initial position when component mounts or index changes
     * Uses scrollTo method for proper scroll positioning
     */
    useEffect(() => {
      // Small delay to ensure ScrollView is fully rendered before scrolling
      const timeoutId = setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: scrollOffset,
          y: 0,
          animated: false, // No animation on initial load for instant positioning
        });
      }, 100);

      return () => clearTimeout(timeoutId);
    }, [scrollOffset]);

    // === RENDER ===

    return (
      <View style={styles.container}>
        {/* Horizontal Scroller */}
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.985}
          snapToOffsets={SNAP_OFFSETS}
          snapToAlignment="start"
          disableIntervalMomentum={true}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
          directionalLockEnabled={true}
          pagingEnabled={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
          )}
        >
          {BODY_PARTS.map((bodyPart, index) => (
            <WorkoutCard
              key={`${bodyPart}-${index}`}
              workoutType={bodyPart}
              isFirstCard={index === 0}
              isLastCard={index === BODY_PARTS.length - 1}
              index={index}
              scrollX={scrollX}
              cardIndex={index}
            />
          ))}
        </Animated.ScrollView>
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
