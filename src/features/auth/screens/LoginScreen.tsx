// ==========================================================================
// LOGIN SCREEN
//
// Initial landing/login screen with brand messaging and authentication CTAs.
//
// Dependencies: theme tokens
// Used by: App.tsx (initial screen)
// ==========================================================================

import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';

// === TYPES ===

type LoginScreenProps = RootStackScreenProps<'LoginScreen'>;

// === COMPONENT ===

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  // === EVENT HANDLERS ===
  // Handle user interactions and navigation actions

  const handleCreateAccount = () => {
    console.log('Create Account pressed - navigating to SignUpScreen');
    navigation.navigate('SignUpScreen');
  };

  const handleLogin = () => {
    console.log('Login pressed - navigating to LoginFormScreen');
    navigation.navigate('LoginFormScreen');
  };

  const handleGuestLogin = () => {
    console.log('Guest Login pressed - navigating to HomePage');
    navigation.navigate('HomePage');
  };

  // === RENDER ===
  // Main component JSX structure

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
        <View style={styles.container}>
          {/* Header with Logo and "Lift" text - 64dp from top */}
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

            <View style={styles.buttonWrapper}>
              <View style={styles.shadowLayer3} />
              <View style={styles.shadowLayer2} />
              <View style={styles.shadowLayer1} />
              <Pressable
                style={({pressed}) => [
                  styles.button,
                  styles.tertiaryButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleGuestLogin}
              >
                <Text style={styles.tertiaryButtonText}>
                  LOGIN AS{' '}
                  <Text style={styles.guestText}>GUEST</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

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
    paddingLeft: theme.spacing.safeZoneHorizontal,
    marginTop: theme.spacing.safeZone,
  },

  liftText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.brand,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.normal,
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

  // === CENTER CONTENT STYLES ===

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: theme.spacing.safeZoneHorizontal,
  },

  guaranteedText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.wide,
    lineHeight: theme.typography.fontSize.xxxl,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: 0,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  optimalText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.wide,
    lineHeight: theme.typography.fontSize.xxxl,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: theme.spacing.textLineGap,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  resultsText: {
    fontSize: theme.typography.fontSize.display,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    letterSpacing: theme.typography.letterSpacing.extraWide,
    lineHeight: theme.typography.fontSize.display,
    includeFontPadding: false,
    paddingVertical: 0,
    marginTop: theme.spacing.s,
    marginBottom: 0,
    ...theme.textShadows.default,
  },

  // === BUTTON STYLES ===

  buttonContainer: {
    paddingLeft: theme.spacing.safeZoneHorizontal,
    paddingRight: theme.spacing.safeZoneHorizontal,
    paddingBottom: theme.layout.bottom.buttonGroupPadding,
  },

  buttonWrapper: {
    marginBottom: theme.spacing.buttonSpacing,
    position: 'relative',
  },

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

  tertiaryButton: {
    backgroundColor: theme.colors.backgroundTertiary,
  },

  buttonPressed: {
    opacity: theme.buttons.opacity.pressed,
  },

  primaryButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
    letterSpacing: theme.typography.letterSpacing.button,
  },

  secondaryButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.button,
  },

  tertiaryButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.button,
  },

  guestText: {
    color: theme.colors.textYellowMaintenance,
  },
});
