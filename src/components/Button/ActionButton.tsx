// ==========================================================================
// ACTION BUTTON COMPONENT
//
// Simple action button with consistent styling for CTAs.
// Used for NEXT, LET'S GO, and similar action buttons in auth flow.
//
// Dependencies: theme tokens, React Native Pressable
// Used by: Auth screens (SignUpScreen, SignUpStep2Screen, WelcomeScreen)
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type ActionButtonProps = {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  style?: ViewStyle;
};

// === COMPONENT ===

export const ActionButton: React.FC<ActionButtonProps> = ({
  onPress,
  text,
  disabled = false,
  style,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  button: {
    height: theme.buttons.height.medium,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.buttons.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.viewShadows.medium,
    elevation: theme.elevation.medium,
  },

  buttonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
    letterSpacing: theme.typography.letterSpacing.button,
  },

  pressed: {
    opacity: theme.buttons.opacity.pressed,
  },

  disabled: {
    opacity: theme.buttons.opacity.disabled,
  },
});
