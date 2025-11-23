// ==========================================================================
// PLAN CARD COMPONENT
//
// Plan card component for PlansPage with background image.
// Displays plan name in upper left corner over full-height background image.
//
// Design: 330dp × 128dp card with background image and overlay text
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
  onPress?: () => void; // Optional for future functionality
};

// === COMPONENT ===

export const PlanCard: React.FC<PlanCardProps> = ({planName, imageSource, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={theme.layout.interaction.cardActiveOpacity}
      disabled={!onPress} // Non-functional for now
    >
      {/* Background Image - Full 128dp height, centered */}
      {imageSource && (
        <Image
          source={imageSource}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      )}

      {/* Plan Name Overlay - Upper Left Corner */}
      <View style={styles.textOverlay}>
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
    overflow: 'hidden',
    position: 'relative',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    textShadowColor: theme.colors.shadowBlack,
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
});
