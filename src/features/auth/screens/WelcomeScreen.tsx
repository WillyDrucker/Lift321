// ==========================================================================
// WELCOME SCREEN
//
// Welcome screen before account creation. Introduces the onboarding questionnaire.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (after branding screens, before CreateAccountScreen)
// ==========================================================================

import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron, ActionButton} from '@/components';
import {AUTH_CHANGE_EVENT} from '@/services';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

// === TYPES ===

type WelcomeScreenProps = RootStackScreenProps<'WelcomeScreen'>;

// === COMPONENT ===

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  // === EVENT HANDLERS ===
  // Handle user interactions and navigation actions

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLetsGo = () => {
    // User is logged in after account creation
    // Emit auth change event to trigger App.tsx to switch to MainNavigator
    DeviceEventEmitter.emit(AUTH_CHANGE_EVENT);
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
      />
      <View style={styles.container}>
        {/* Welcome Content - 30% from top */}
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>WELCOME!</Text>
          <Text style={styles.descriptionText1}>
            <Text style={styles.boldText}>To begin</Text>, we'd like to ask you a few questions.
          </Text>
          <Text style={styles.descriptionText2}>
            Your answers will help us maximize your workout plan.
          </Text>
        </View>

        {/* Back Button - 64dp from bottom */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <LeftChevron size={theme.layout.topNav.backIconSize} color={theme.colors.textPrimary} />
          </Pressable>
        </View>

        {/* Let's Go Button - 64dp from bottom, right side */}
        <View style={styles.nextButtonContainer}>
          <ActionButton onPress={handleLetsGo} text="LET'S GO!" />
        </View>
      </View>
    </>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  contentContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3, // 30% from top
    left: theme.spacing.safeZoneHorizontal,
    right: theme.spacing.safeZoneHorizontal,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.display,
    lineHeight: theme.typography.fontSize.display,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primaryMuted,
    letterSpacing: theme.typography.letterSpacing.extraWide,
    textAlign: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
    marginVertical: 0,
  },
  descriptionText1: {
    fontSize: theme.typography.fontSize.m,
    lineHeight: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.m,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  boldText: {
    color: theme.colors.textPrimary,
  },
  descriptionText2: {
    fontSize: theme.typography.fontSize.m,
    lineHeight: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.inputMarginSmall,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  header: {
    position: 'absolute',
    bottom: theme.layout.bottom.safeZone,
    left: theme.layout.authNavigation.backButtonLeft,
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
});
