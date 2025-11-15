// ==========================================================================
// SHADOW BUTTON COMPONENT
//
// Button with three-layer shadow system for visual depth.
// Used across auth screens for primary CTAs.
//
// Dependencies: theme tokens, React Native Pressable
// Used by: Auth screens (LoginScreen, SignUpScreen, etc.)
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type ShadowButtonVariant = 'primary' | 'secondary' | 'tertiary';

export type ShadowButtonProps = {
  onPress: () => void;
  variant: ShadowButtonVariant;
  children: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
};

// === COMPONENT ===

export const ShadowButton: React.FC<ShadowButtonProps> = ({
  onPress,
  variant,
  children,
  style,
  disabled = false,
}) => {
  return (
    <View style={[styles.buttonWrapper, style]}>
      {/* Three-layer shadow system */}
      <View style={styles.shadowLayer3} />
      <View style={styles.shadowLayer2} />
      <View style={styles.shadowLayer1} />

      {/* Actual button */}
      <Pressable
        style={({pressed}) => [
          styles.button,
          styles[variant],
          pressed && !disabled && styles.pressed,
          disabled && styles.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}>
        {children}
      </Pressable>
    </View>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  buttonWrapper: {
    marginBottom: theme.spacing.buttonSpacing,
    position: 'relative',
  },

  // === SHADOW LAYERS ===
  // Three-layer shadow system (pure black with opacity fade)

  shadowLayer1: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer1.top,
    left: theme.buttons.shadowLayers.layer1.left,
    right: theme.buttons.shadowLayers.layer1.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },

  shadowLayer2: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer2.top,
    left: theme.buttons.shadowLayers.layer2.left,
    right: theme.buttons.shadowLayers.layer2.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer2.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },

  shadowLayer3: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer3.top,
    left: theme.buttons.shadowLayers.layer3.left,
    right: theme.buttons.shadowLayers.layer3.right,
    height: theme.buttons.height.medium,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer3.opacity})`,
    borderRadius: theme.buttons.borderRadius.medium,
  },

  // === BUTTON BASE ===

  button: {
    height: theme.buttons.height.medium,
    borderRadius: theme.buttons.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  // === BUTTON VARIANTS ===

  primary: {
    backgroundColor: theme.colors.primary,
  },

  secondary: {
    backgroundColor: theme.colors.backgroundSecondary,
  },

  tertiary: {
    backgroundColor: theme.colors.backgroundTertiary,
  },

  // === BUTTON STATES ===

  pressed: {
    opacity: theme.buttons.opacity.pressed,
  },

  disabled: {
    opacity: theme.buttons.opacity.disabled,
  },
});
