// ==========================================================================
// CUSTOM WORKOUT CARDS SCROLLER COMPONENT
//
// Horizontal scrollable container for custom workout cards with partial card visibility.
// Displays custom workout mode cards with swipe navigation and peek.
//
// Dependencies: React Native ScrollView, theme tokens
// Used by: HomePage
// ==========================================================================

import React, {useMemo, useRef} from 'react';
import {
  Animated,
  Dimensions,
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

// Screen dimensions for dynamic card sizing
const SCREEN_WIDTH = Dimensions.get('window').width;

// Card sizing based on margins - card fills screen minus left/right margins
const CARD_MARGIN = 12; // Adjusted to achieve 8dp visual margin on each side
const CARD_WIDTH = SCREEN_WIDTH - (CARD_MARGIN * 2); // Full screen width minus margins
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp gap between cards

// Dynamic snap interval for uniform cards
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

// === COMPONENT ===

export const CustomWorkoutCardsScroller: React.FC<CustomWorkoutCardsScrollerProps> =
  React.memo(() => {
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position for animations

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
          {CUSTOM_WORKOUTS.map((customWorkout, index) => (
            <WorkoutCard
              key={`${customWorkout}-${index}`}
              workoutType={customWorkout}
              isFirstCard={index === 0}
              isLastCard={index === CUSTOM_WORKOUTS.length - 1}
              index={index + 5}
              scrollX={scrollX}
              cardIndex={index}
              cardWidth={CARD_WIDTH}
            />
          ))}
        </Animated.ScrollView>
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
    marginBottom: 0, // No bottom margin - scrollView paddingBottom controls spacing
  },
});
