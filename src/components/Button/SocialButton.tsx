// ==========================================================================
// SOCIAL LOGIN BUTTON COMPONENT
//
// OAuth provider buttons (Google, Facebook) with consistent styling.
// Displays provider logo and text with provider-specific colors.
//
// Dependencies: theme tokens, React Native Pressable
// Used by: Auth screens (LoginFormScreen)
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, Text, ViewStyle} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type SocialProvider = 'google' | 'facebook';

export type SocialButtonProps = {
  provider: SocialProvider;
  onPress: () => void;
  style?: ViewStyle;
};

// === CONFIGURATION ===

const PROVIDER_CONFIG = {
  google: {
    logo: 'G',
    text: 'CONTINUE WITH GOOGLE',
    backgroundColor: theme.colors.pureWhite,
    textColor: theme.colors.pureBlack,
    logoColor: theme.colors.googleBlue,
    logoSize: theme.layout.socialLogin.googleLogoFontSize,
  },
  facebook: {
    logo: 'f',
    text: 'CONTINUE WITH FACEBOOK',
    backgroundColor: theme.colors.facebookBlue,
    textColor: theme.colors.pureWhite,
    logoColor: theme.colors.pureWhite,
    logoSize: theme.layout.socialLogin.facebookLogoFontSize,
  },
} as const;

// === COMPONENT ===

export const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  style,
}) => {
  const config = PROVIDER_CONFIG[provider];

  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {backgroundColor: config.backgroundColor},
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}>
      <Text style={[styles.logo, {color: config.logoColor, fontSize: config.logoSize}]}>
        {config.logo}
      </Text>
      <Text style={[styles.text, {color: config.textColor}]}>
        {config.text}
      </Text>
    </Pressable>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  button: {
    height: theme.layout.form.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.layout.form.inputBorderRadius,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
    marginBottom: theme.spacing.buttonSpacing,
  },

  logo: {
    fontWeight: 'bold',
    marginRight: theme.spacing.s,
  },

  text: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },

  pressed: {
    opacity: theme.buttons.opacity.pressed,
  },
});
