// ==========================================================================
// PLAN CARDS SCROLLER COMPONENT
//
// Horizontal scrollable container for plan cards with partial card visibility.
// Displays multiple plan cards with swipe navigation and 8dp peeks.
//
// Dependencies: React Native ScrollView, theme tokens, PlanCard
// Used by: PlansPage
// ==========================================================================

import React, {useRef} from 'react';
import {ScrollView, StyleSheet, View, ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';
import {PlanCard} from './PlanCard';

// === TYPES ===

export type PlanCardsScrollerProps = {
  plans: string[]; // Array of plan names
  cardHeight?: number; // Optional card height (default: 128)
};

// === CONSTANTS ===

// Consistent card dimensions and spacing for smooth scrolling with snapToOffsets
const CARD_WIDTH = theme.layout.planCard.width; // 330dp
const CARD_HEIGHT = theme.layout.planCard.height; // 128dp (smaller than workout cards for denser browsing)
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing; // 8dp
const LEFT_MARGIN = theme.layout.recommendedWorkout.leftMargin; // 8dp

// === HELPERS ===

/**
 * Maps plan names to their corresponding image assets
 * Returns default image if plan not found in mapping
 */
const getPlanImage = (planName: string): ImageSourcePropType | undefined => {
  const imageMap: Record<string, ImageSourcePropType> = {
    'Lift 3-2-1': require('@/assets/images/plans/lift-3-2-1-plan.png'),
    'Lift 3-2-GLP-1': require('@/assets/images/plans/lift-3-2-glp-1-plan.png'),
    'Beginner 3-2-1': require('@/assets/images/plans/beginner-3-2-1-plan.png'),
    'Advanced 3-2-1': require('@/assets/images/plans/advanced-3-2-1-plan.png'),
    'Expert 3-2-1': require('@/assets/images/plans/expert-3-2-1-plan.png'),
    'Strength 3-2-1': require('@/assets/images/plans/strength-3-2-1-plan.png'),
    'Growth 3-2-1': require('@/assets/images/plans/growth-3-2-1-plan.png'),
    'Zero-to-SuperHero': require('@/assets/images/plans/zero-to-superhero-plan.png'),
    'Athlete': require('@/assets/images/plans/athlete-plan.png'),
    'Weight Loss': require('@/assets/images/plans/weight-loss-plan.png'),
    'Lean': require('@/assets/images/plans/lean-plan.png'),
  };

  return imageMap[planName];
};

// === COMPONENT ===

export const PlanCardsScroller: React.FC<PlanCardsScrollerProps> = React.memo(
  ({plans, cardHeight = CARD_HEIGHT}) => {
    // === REFS ===

    const scrollViewRef = useRef<ScrollView>(null);

    // === SNAP OFFSETS ===

    // Calculate snap offsets for each card to ensure 8dp peeks
    // Card 1: offset 0 (starts at 8dp from left)
    // Card 2+: offset ensures previous card shows 8dp peek on left
    // Last card: offset ensures 8dp margin on right
    const snapOffsets = plans.map((_, index) => {
      if (index === 0) return 0; // First card at left margin
      if (index === plans.length - 1) {
        // Last card: right edge at screen width - right padding
        const cardStartPosition =
          LEFT_MARGIN + index * (CARD_WIDTH + CARD_SPACING);
        return cardStartPosition - (360 - LEFT_MARGIN - CARD_WIDTH); // 360 = screen width
      }
      // Middle cards: show 8dp peek of previous card
      return CARD_WIDTH + (index - 1) * (CARD_WIDTH + CARD_SPACING);
    });

    // === RENDER ===

    return (
      <View style={[styles.container, {height: cardHeight}]}>
        {/* Horizontal Scroller */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToOffsets={snapOffsets}
          snapToAlignment="start"
          disableIntervalMomentum={true}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
          directionalLockEnabled={true}
          pagingEnabled={false}>
          {plans.map((planName, index) => (
            <View
              key={`${planName}-${index}`}
              style={[
                styles.cardWrapper,
                index > 0 && {marginLeft: CARD_SPACING},
              ]}>
              <PlanCard
                planName={planName}
                imageSource={getPlanImage(planName)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  },
);

PlanCardsScroller.displayName = 'PlanCardsScroller';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    // height is set dynamically via prop (default 128)
    overflow: 'visible',
    marginBottom: 0, // No bottom margin - section header controls spacing
  },

  scrollContent: {
    paddingLeft: LEFT_MARGIN,
    paddingRight: CARD_SPACING, // 8dp peek to show next card edge when scrolled
  },

  cardWrapper: {
    // Card spacing handled via marginLeft (except first card)
  },
});
