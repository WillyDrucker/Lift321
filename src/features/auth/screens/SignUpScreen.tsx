// ==========================================================================
// SIGN UP SCREEN
//
// Account creation screen with background image and back navigation.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (from LoginScreen)
// ==========================================================================

import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron} from '@/components/icons';

// === TYPES ===

type SignUpScreenProps = RootStackScreenProps<'SignUpScreen'>;

// === COMPONENT ===

export const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  // === EVENT HANDLERS ===
  // Handle user interactions and navigation actions

  const handleBack = () => {
    navigation.goBack();
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
      />
      <View style={styles.container}>
        {/* Background Image wrapper - 32dp from top */}
        <View style={styles.backgroundImageWrapper}>
          <Image
            source={require('@/assets/images/signup-background.png')}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
        </View>

        <SafeAreaView style={styles.safeArea}>
          {/* Back Button - 64dp from bottom */}
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <LeftChevron size={32} color={theme.colors.textPrimary} />
            </Pressable>
          </View>

          {/* Next Button - 64dp from bottom, right side */}
          <View style={styles.nextButtonContainer}>
            <Pressable onPress={() => {}} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>NEXT</Text>
            </Pressable>
          </View>
        </SafeAreaView>

        {/* Brand messaging text - positioned from top */}
        <View style={styles.textContainer}>
          <Text style={styles.tunedToText}>TUNED TO</Text>
          <Text style={styles.perfectionText}>PERFECTION</Text>
          <Text style={styles.noOvertrainingText}>NO OVERTRAINING</Text>
          <Text style={styles.noUndertrainingText}>NO UNDERTRAINING</Text>
          <Text style={styles.workoutsText}>WORKOUTS</Text>
          <Text style={styles.optimizedText}>STREAMLINED</Text>
          <Text style={styles.toYouText}>FOR YOU</Text>
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
  backgroundImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    paddingTop: theme.layout.backgroundImage.topSpacing,
    paddingHorizontal: '10%', // 10% on each side = 80% width
    zIndex: 0,
  },
  backgroundImage: {
    width: '100%',
    height: `${theme.layout.backgroundImage.heightPercentage}%`,
    opacity: theme.layout.backgroundImage.opacity,
  },
  safeArea: {
    flex: 1,
    zIndex: 1, // Above background image
  },
  header: {
    position: 'absolute',
    bottom: theme.layout.bottom.safeZone,
    left: 24, // 24dp + 8dp button padding = 32dp visual from left edge
    zIndex: 10,
  },
  backButton: {
    padding: theme.spacing.s,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: theme.layout.bottom.safeZone,
    left: 96, // 32dp (left edge) + 32dp (chevron icon) + 32dp (gap) = 96dp
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
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textOnAction,
    letterSpacing: 0.5,
  },
  textContainer: {
    position: 'absolute',
    bottom: 146, // 32dp gap above Next button (64dp bottom + 50dp height + 32dp gap)
    left: theme.spacing.safeZoneHorizontal,
    right: theme.spacing.safeZoneHorizontal,
    alignItems: 'center',
  },
  tunedToText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  perfectionText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primaryMuted,
    letterSpacing: 2,
    marginTop: 2,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  noOvertrainingText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    marginTop: 2,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  noUndertrainingText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    marginTop: 2,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  workoutsText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    marginTop: 2,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  optimizedText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: 2,
    marginTop: 3,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
  toYouText: {
    fontSize: theme.typography.fontSize.xxl,
    lineHeight: theme.typography.fontSize.xxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primaryMuted,
    letterSpacing: 2,
    marginTop: 3,
    includeFontPadding: false,
    paddingVertical: 0,
    ...theme.textShadows.default,
  },
});
