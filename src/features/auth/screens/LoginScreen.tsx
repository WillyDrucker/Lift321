// ==========================================================================
// LOGIN SCREEN
//
// Initial landing/login screen with brand messaging and authentication CTAs.
//
// Dependencies: theme tokens, SafeAreaView
// Used by: App.tsx (initial screen)
// ==========================================================================

import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type LoginScreenProps = Record<string, never>;

// === COMPONENT ===

export const LoginScreen: React.FC<LoginScreenProps> = () => {
  // === EVENT HANDLERS ===

  const handleCreateAccount = () => {
    console.log('Create Account pressed');
    // TODO: Navigate to sign up screen
  };

  const handleLogin = () => {
    console.log('Login pressed');
    // TODO: Navigate to login form screen
  };

  // === RENDER ===

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
      />
      <ImageBackground
        source={require('@/assets/images/gym-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
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

          {/* Center content - Brand messaging */}
          <View style={styles.centerContent}>
            <Text style={styles.guaranteedText}>GUARANTEED</Text>
            <Text style={styles.optimalText}>OPTIMAL</Text>
            <Text style={styles.resultsText}>RESULTS</Text>
          </View>

          {/* Bottom buttons */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <View style={styles.shadowLayer3} />
              <View style={styles.shadowLayer2} />
              <View style={styles.shadowLayer1} />
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleCreateAccount}
              >
                <Text style={styles.primaryButtonText}>
                  CREATE NEW ACCOUNT
                </Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <View style={styles.shadowLayer3} />
              <View style={styles.shadowLayer2} />
              <View style={styles.shadowLayer1} />
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  styles.secondaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.secondaryButtonText}>
                  I HAVE AN ACCOUNT
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

// === STYLES ===

const LOGO_SIZE = 40;
const LOGO_BORDER_RADIUS = LOGO_SIZE / 2;
const HEADER_INDENT = theme.spacing.xl;
const HEADER_TOP_SPACING = 100;
const BUTTON_BOTTOM_SPACING = 100;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // === HEADER STYLES ===

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: HEADER_INDENT,
    marginTop: HEADER_TOP_SPACING,
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
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },

  logoShadowLayer1: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: LOGO_BORDER_RADIUS,
  },

  logoShadowLayer2: {
    position: 'absolute',
    top: 2,
    left: 1,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: LOGO_BORDER_RADIUS,
  },

  logoShadowLayer3: {
    position: 'absolute',
    top: 3,
    left: 2,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: LOGO_BORDER_RADIUS,
  },

  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    position: 'relative',
  },

  // === CENTER CONTENT STYLES ===

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: HEADER_INDENT,
  },

  guaranteedText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    lineHeight: theme.typography.fontSize.xl,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  optimalText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    lineHeight: theme.typography.fontSize.xl,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: 10,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  resultsText: {
    fontSize: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    letterSpacing: 3,
    lineHeight: theme.typography.fontSize.xxl,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: 6,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  // === BUTTON STYLES ===

  buttonContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: BUTTON_BOTTOM_SPACING,
  },

  buttonWrapper: {
    marginBottom: theme.buttons.marginBottom.default,
    position: 'relative',
  },

  shadowLayer1: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: -1,
    height: theme.buttons.height.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: theme.buttons.borderRadius.medium,
  },

  shadowLayer2: {
    position: 'absolute',
    top: 2,
    left: 1,
    right: -1,
    height: theme.buttons.height.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: theme.buttons.borderRadius.medium,
  },

  shadowLayer3: {
    position: 'absolute',
    top: 3,
    left: 2,
    right: -2,
    height: theme.buttons.height.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: theme.buttons.borderRadius.medium,
  },

  button: {
    height: theme.buttons.height.medium,
    borderRadius: theme.buttons.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  primaryButton: {
    backgroundColor: theme.colors.primary,
  },

  secondaryButton: {
    backgroundColor: theme.colors.backgroundSecondary,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  primaryButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
    letterSpacing: 0.5,
  },

  secondaryButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    letterSpacing: 0.5,
  },
});
