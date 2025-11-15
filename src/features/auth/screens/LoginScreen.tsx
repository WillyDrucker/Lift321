// ==========================================================================
// LOGIN SCREEN
//
// Initial landing/login screen with brand messaging and authentication CTAs.
//
// Dependencies: theme tokens
// Used by: App.tsx (initial screen)
// ==========================================================================

import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {ShadowButton} from '@/components';
import {enableGuestMode} from '@/services';

// === TYPES ===

type LoginScreenProps = RootStackScreenProps<'LoginScreen'>;

// === COMPONENT ===

export const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  // === STATE ===

  const [isLoading, setIsLoading] = useState(false);

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

  const handleGuestLogin = async () => {
    console.log('Guest Login pressed - enabling guest mode');
    try {
      setIsLoading(true);
      await enableGuestMode();
      // App.tsx will detect the guest mode and switch to MainNavigator
      // which will automatically show HomePage
      console.log('Guest mode enabled successfully');
    } catch (error) {
      console.error('Failed to enable guest mode:', error);
      setIsLoading(false);
    }
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
            <ShadowButton
              variant="primary"
              onPress={handleCreateAccount}
              disabled={isLoading}
            >
              <Text style={styles.primaryButtonText}>
                CREATE NEW ACCOUNT
              </Text>
            </ShadowButton>

            <ShadowButton
              variant="secondary"
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.secondaryButtonText}>
                I HAVE AN ACCOUNT
              </Text>
            </ShadowButton>

            <ShadowButton
              variant="tertiary"
              onPress={handleGuestLogin}
              disabled={isLoading}
            >
              <Text style={styles.tertiaryButtonText}>
                {isLoading
                  ? 'LOADING...'
                  : <>
                      LOGIN AS <Text style={styles.guestText}>GUEST</Text>
                    </>
                }
              </Text>
            </ShadowButton>
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
