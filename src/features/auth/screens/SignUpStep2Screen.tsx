// ==========================================================================
// SIGN UP STEP 2 SCREEN
//
// Second step of account creation with 3-2-1 Challenge messaging.
// Features image background.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (from SignUpScreen)
// ==========================================================================

import React from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron} from '@/components/icons';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// === TYPES ===

type SignUpStep2ScreenProps = RootStackScreenProps<'SignUpStep2Screen'>;

// === COMPONENT ===

export const SignUpStep2Screen: React.FC<SignUpStep2ScreenProps> = ({
  navigation,
}) => {
  // === EVENT HANDLERS ===
  // Handle user interactions and navigation actions

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    navigation.navigate('WelcomeScreen');
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.container}>
        {/* Image Background */}
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/images/signup-step2-background.jpg')}
            style={styles.imageBackground}
            resizeMode="contain"
          />
        </View>

        {/* Content Overlay */}
        <View style={styles.overlay}>
          {/* Challenge Title - 64dp from top, centered */}
          <View style={styles.challengeTitleContainer}>
            <Text style={styles.challengeTitleText}>3-2-1 CHALLENGE</Text>
          </View>

          {/* Back Button - Bottom safe zone */}
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <LeftChevron
                size={theme.layout.icon.large}
                color={theme.colors.textPrimary}
              />
            </Pressable>
          </View>

          {/* Next Button - 64dp from bottom, right side */}
          <View style={styles.nextButtonContainer}>
            <Pressable onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </Pressable>
          </View>

          {/* Challenge Text - 32dp above Next button */}
          <View style={styles.textContainer}>
            <Text style={styles.challengeText}>
              WE'RE SO CONFIDENT THE <Text style={styles.highlightGreen}>LIFT 3-2-1 SYSTEM</Text> <Text style={styles.highlightGray}>IS THE MOST HUMANLY OPTIMAL</Text>
            </Text>
            <Text style={[styles.challengeText, styles.challengeTextSpacing]}>
              MEMBERSHIP IS <Text style={styles.highlightGreen}>100% FREE</Text> WHILE FOLLOWING ANY <Text style={styles.highlightGreen}>3-2-1 PLAN</Text>
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: theme.layout.bottom.safeZone,
    overflow: 'hidden',
  },
  imageBackground: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    flex: 1,
  },
  challengeTitleContainer: {
    position: 'absolute',
    top: theme.layout.header.topSpacing,
    left: 0,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 5,
  },
  challengeTitleText: {
    fontSize: theme.typography.fontSize.xxxl,
    lineHeight: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primaryMuted,
    letterSpacing: theme.typography.letterSpacing.extraWide,
    textAlign: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
    marginVertical: 0,
    ...theme.textShadows.default,
  },
  header: {
    position: 'absolute',
    bottom: theme.layout.bottom.safeZone,
    left: theme.spacing.l,
    zIndex: 10,
  },
  backButton: {
    padding: theme.spacing.s,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: theme.layout.bottom.safeZone,
    left: theme.layout.authNavigation.nextButtonLeft,
    right: theme.spacing.safeZoneHorizontal,
    zIndex: 10,
  },
  nextButton: {
    height: theme.buttons.height.medium,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.buttons.borderRadius.medium,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.viewShadows.medium,
    elevation: theme.elevation.medium,
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
    letterSpacing: theme.typography.letterSpacing.button,
  },
  textContainer: {
    position: 'absolute',
    bottom: theme.layout.authNavigation.textContainerBottom,
    left: theme.spacing.safeZoneHorizontal,
    right: theme.spacing.safeZoneHorizontal,
    alignItems: 'center',
  },
  challengeText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl + theme.spacing.xxs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    letterSpacing: theme.typography.letterSpacing.wide,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  challengeTextSpacing: {
    marginTop: theme.spacing.xxs,
  },
  highlightGreen: {
    color: theme.colors.primaryMuted, // 75% green (#00BF00)
  },
  highlightGray: {
    color: theme.colors.textSecondary, // Light gray (#B0B0B0)
  },
});
