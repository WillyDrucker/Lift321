// ==========================================================================
// INFO ICON COMPONENT
//
// Help icon using PNG image for pixel-perfect alignment.
// Used for guide/help button in top navigation.
//
// Dependencies: React Native Image
// Used by: TopNavBar
// ==========================================================================

import React from 'react';
import {Image, StyleSheet} from 'react-native';

// === TYPES ===

type InfoIconProps = {
  size?: number;
  color?: string; // Kept for API compatibility, but PNG doesn't support tinting
};

// === COMPONENT ===

export const InfoIcon: React.FC<InfoIconProps> = ({
  size = 24,
}) => {
  return (
    <Image
      source={require('@/assets/images/icons/help-icon.png')}
      style={[styles.icon, {width: size, height: size, tintColor: '#FFFFFF'}]}
      resizeMode="contain"
    />
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  icon: {
    margin: 0,
    padding: 0,
  },
});
