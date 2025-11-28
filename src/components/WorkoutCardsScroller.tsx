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

// Screen dimensions for dynamic card sizing
const SCREEN_WIDTH = Dimensions.get('window').width;

// Card sizing based on margins - card fills screen minus left/right margins
const CARD_MARGIN = 12; // Adjusted to achieve 8dp visual margin on each side
const CARD_WIDTH = SCREEN_WIDTH - (CARD_MARGIN * 2); // Full screen width minus margins
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp gap between cards

// Dynamic snap interval for uniform cards
// Snaps at regular intervals (card width + spacing)
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

// === COMPONENT ===

export const WorkoutCardsScroller: React.FC<WorkoutCardsScrollerProps> =
  React.memo(({initialScrollIndex = BODY_PARTS.length - 1}) => { // Default to last card (Legs) for testing
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);
    const scrollX = useRef(new Animated.Value(0)).current; // Track scroll position for animations

    // === COMPUTED VALUES ===

    /**
     * Calculate initial scroll offset based on initialScrollIndex
     * Uses SNAP_INTERVAL to align with same snap points used during scrolling
     */
    const scrollOffset = useMemo(() => {
      const clampedIndex = Math.max(0, Math.min(initialScrollIndex, BODY_PARTS.length - 1));
      return clampedIndex * SNAP_INTERVAL; // Dynamic calculation based on interval
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
          {BODY_PARTS.map((bodyPart, index) => (
            <WorkoutCard
              key={`${bodyPart}-${index}`}
              workoutType={bodyPart}
              isFirstCard={index === 0}
              isLastCard={index === BODY_PARTS.length - 1}
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
