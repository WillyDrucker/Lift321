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
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {theme} from '@/theme';
import {WorkoutCard, type WorkoutSuggester} from './WorkoutCard';

// === TYPES ===

export type WorkoutCardsScrollerProps = {
  // No props needed - always starts at first card
};

// === CONSTANTS ===

const SUGGESTED_WORKOUTS: WorkoutSuggester[] = [
  '3-2-1 A.I. Trainer',
  'Personal Trainer (Jax Mercer)',
  'Coach (Coach Schwarz)',
  'Partner (Willy D.)',
  'Custom Workout (Willy D.)',
];

// === DYNAMIC CARD SIZING ===
// All values derived from theme tokens for cross-device consistency
// Future: Adjust CARD_WIDTH calculation to add peek amount for adjacent card visibility

const SCREEN_WIDTH = Dimensions.get('window').width;

// Margin configuration - derived from theme tokens
const VISUAL_MARGIN = theme.layout.recommendedWorkout.leftMargin; // 8dp - desired visual margin from screen edges
const SCROLL_PADDING_OFFSET = 4; // Compensation for ScrollView content padding behavior
const CARD_MARGIN = VISUAL_MARGIN + SCROLL_PADDING_OFFSET; // Calculation value to achieve visual margin
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp - gap between cards

// Card dimensions - dynamically calculated based on screen width
const CARD_WIDTH = SCREEN_WIDTH - (CARD_MARGIN * 2);

// Snap interval - ensures cards snap to proper position when scrolling
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

// === COMPONENT ===

export const WorkoutCardsScroller: React.FC<WorkoutCardsScrollerProps> =
  React.memo(() => {
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position for animations

    // Always starts at first card - no initial scroll needed

    // === RENDER ===

    return (
      <View style={styles.container}>
        {/* Horizontal Scroller */}
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.985}
          snapToInterval={SNAP_INTERVAL}
          snapToAlignment="start"
          disableIntervalMomentum={true}
          contentContainerStyle={{paddingLeft: CARD_MARGIN, paddingRight: CARD_MARGIN}}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
          directionalLockEnabled={true}
          pagingEnabled={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true}
          )}
        >
          {SUGGESTED_WORKOUTS.map((suggester, index) => (
            <WorkoutCard
              key={`${suggester}-${index}`}
              suggester={suggester}
              isFirstCard={index === 0}
              isLastCard={index === SUGGESTED_WORKOUTS.length - 1}
              index={index}
              scrollX={scrollX}
              cardIndex={index}
              cardWidth={CARD_WIDTH}
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
});
