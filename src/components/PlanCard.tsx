// ==========================================================================
// PLAN CARD COMPONENT
//
// Plan card component for PlansPage with background image.
// Displays plan name above the image card.
//
// Design: Plan name text above 3:1 aspect ratio image card
// Dependencies: Theme tokens
// Used by: PlanCardsScroller
// ==========================================================================

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type PlanCardProps = {
  planName: string;
  imageSource?: ImageSourcePropType; // Background image for the plan card
  isSelected?: boolean; // Whether this plan is currently selected
  onPress?: () => void; // Handler for plan selection
};

// === COMPONENT ===

export const PlanCard: React.FC<PlanCardProps> = ({planName, imageSource, isSelected = false, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={theme.layout.interaction.cardActiveOpacity}
    >
      {/* Plan Name - Above Image */}
      <Text style={[styles.planName, isSelected && styles.planNameSelected]}>
        {planName.toUpperCase()}
      </Text>

      {/* Image Container */}
      <View style={[styles.imageContainer, isSelected && styles.imageContainerSelected]}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.backgroundImage}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  cardContainer: {
    width: theme.layout.planCard.width,
  },

  planName: {
    fontSize: theme.typography.fontSize.m, // 16dp
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs, // Space between text and image
  },

  planNameSelected: {
    color: theme.colors.actionSuccess, // Green text when selected
  },

  imageContainer: {
    width: theme.layout.planCard.width,
    height: theme.layout.planCard.height, // 67dp (200/3 for 3:1 ratio)
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: theme.layout.recommendedWorkout.borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent', // No border by default
  },

  imageContainerSelected: {
    borderColor: theme.colors.actionSuccess, // Green 1dp border when selected
  },

  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Scale image to fit within container
  },
});
