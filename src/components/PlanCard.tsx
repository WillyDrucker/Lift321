// ==========================================================================
// PLAN CARD COMPONENT
//
// Simple plan card component for PlansPage.
// Displays plan name in upper left corner on solid background.
//
// Design: 330dp × 128dp card with Roboto font
// Dependencies: Theme tokens
// Used by: PlanCardsScroller
// ==========================================================================

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type PlanCardProps = {
  planName: string;
  onPress?: () => void; // Optional for future functionality
};

// === COMPONENT ===

export const PlanCard: React.FC<PlanCardProps> = ({planName, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={theme.layout.interaction.cardActiveOpacity}
      disabled={!onPress} // Non-functional for now
    >
      <View style={styles.cardContent}>
        <Text style={styles.planName}>{planName.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  card: {
    width: theme.layout.planCard.width,
    height: theme.layout.planCard.height,
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    borderWidth: theme.layout.border.thin,
    borderColor: theme.colors.borderDefault,
    overflow: 'hidden',
  },

  cardContent: {
    flex: 1,
    padding: theme.spacing.cardPadding,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  planName: {
    fontSize: theme.typography.fontSize.l, // 20dp
    fontFamily: theme.typography.fontFamily.primary, // Roboto
    fontWeight: theme.typography.fontWeight.bold, // 700
    color: theme.colors.pureWhite,
    textTransform: 'uppercase',
  },
});
