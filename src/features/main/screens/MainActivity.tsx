// ==========================================================================
// MAIN ACTIVITY SCREEN
//
// Main activity screen for guest users and authenticated members.
// Entry point after login/authentication.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';

// === TYPES ===

type MainActivityProps = RootStackScreenProps<'MainActivity'>;

// === COMPONENT ===

export const MainActivity: React.FC<MainActivityProps> = ({navigation}) => {
  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
      />
      <SafeAreaView style={styles.container}>
        {/* Header with Logo and "Lift" text */}
        <View style={styles.header}>
          <Text style={styles.liftText}>LIFT</Text>
          <View style={styles.logoWrapper}>
            <View style={styles.logoShadowLayer3} />
            <View style={styles.logoShadowLayer2} />
            <View style={styles.logoShadowLayer1} />
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Main Content Area - Ready for customization */}
        <View style={styles.contentContainer}>
          {/* TODO: Add main activity content here */}
        </View>
      </SafeAreaView>
    </>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  // === HEADER STYLES ===
  // Exact match to LoginScreen header

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.layout.header.indent,
    marginTop: theme.layout.header.topSpacing,
  },

  liftText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.brand,
    color: theme.colors.textPrimary,
    letterSpacing: 1,
    ...theme.textShadows.default,
  },

  logoWrapper: {
    marginLeft: theme.spacing.s,
    position: 'relative',
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
  },

  logoShadowLayer1: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer1.top,
    left: theme.buttons.shadowLayers.layer1.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logoShadowLayer2: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer2.top,
    left: theme.buttons.shadowLayers.layer2.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer2.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logoShadowLayer3: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer3.top,
    left: theme.buttons.shadowLayers.layer3.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer3.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logo: {
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    position: 'relative',
  },

  // === CONTENT STYLES ===

  contentContainer: {
    flex: 1,
    // Ready for main activity content
  },
});
