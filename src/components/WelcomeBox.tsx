// ==========================================================================
// WELCOME BOX COMPONENT
//
// Swipeable welcome message box for new sessions and guest users.
// Features swipe-right-to-dismiss gesture with visual affordance.
//
// Dependencies: React Native Animated API, theme tokens
// Used by: HomePage, other main screens requiring user onboarding
// ==========================================================================

import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import type {PanResponderGestureState} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type WelcomeBoxProps = {
  userName: string;
  message: string;
  visible: boolean;
  translateX: Animated.Value;
  opacity: Animated.Value;
  panHandlers: any; // PanResponder handlers from parent
};

// === COMPONENT ===

export const WelcomeBox: React.FC<WelcomeBoxProps> = ({
  userName,
  message,
  visible,
  translateX,
  opacity,
  panHandlers,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.welcomeBox,
        {
          transform: [{translateX}],
          opacity,
        },
      ]}
      {...panHandlers}>
      {/* Swipe Indicator */}
      <View style={styles.swipeIndicator} />
      <Text style={styles.welcomeText}>
        Welcome, {userName}.{' '}
        <Text style={styles.welcomeSubText}>{message}</Text>
      </Text>
    </Animated.View>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  welcomeBox: {
    marginLeft: theme.layout.welcomeBox.leftMargin,
    marginRight: theme.layout.welcomeBox.rightMargin,
    marginTop: theme.layout.recommendedWorkout.cardSpacing, // 8dp spacing from progress bar
    marginBottom: 0, // No bottom margin - section header controls spacing
    backgroundColor: theme.colors.backgroundPrimary,
    borderTopLeftRadius: theme.layout.welcomeBox.borderRadius,
    borderBottomLeftRadius: theme.layout.welcomeBox.borderRadius,
    paddingLeft: theme.layout.welcomeBox.paddingLeft,
    paddingRight: theme.layout.welcomeBox.paddingRight,
    paddingTop: theme.layout.welcomeBox.paddingTop,
    paddingBottom: theme.layout.welcomeBox.paddingBottom,
    justifyContent: 'flex-start',
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.pureWhite,
    includeFontPadding: false,
    lineHeight: theme.typography.fontSize.m + 6,
  },
  welcomeSubText: {
    color: theme.colors.navInactive,
  },
  swipeIndicator: {
    position: 'absolute',
    left: theme.spacing.s,
    top: theme.spacing.xs,
    width: theme.layout.welcomeBox.swipeIndicatorWidth,
    height: theme.layout.welcomeBox.swipeIndicatorHeight,
    backgroundColor: theme.colors.navInactive,
    borderRadius: theme.layout.welcomeBox.swipeIndicatorBorderRadius,
    opacity: theme.layout.welcomeBox.swipeIndicatorOpacity,
  },
});
