// ==========================================================================
// WELCOME SCREEN
//
// First screen after account creation. Introduces the onboarding questionnaire.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (from SignUpStep2Screen)
// ==========================================================================

import React from 'react';
import {
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
    console.log("Let's Go pressed - Welcome");
    // TODO: Navigate to questionnaire
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
            <LeftChevron size={32} color={theme.colors.textPrimary} />
          </Pressable>
        </View>

        {/* Let's Go Button - 64dp from bottom, right side */}
        <View style={styles.nextButtonContainer}>
          <Pressable onPress={handleLetsGo} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>LET'S GO!</Text>
          </Pressable>
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
    fontSize: theme.typography.fontSize.display, // 48dp
    lineHeight: theme.typography.fontSize.display,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primaryMuted, // 75% green
    letterSpacing: 3,
    textAlign: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
    marginVertical: 0,
  },
  descriptionText1: {
    fontSize: theme.typography.fontSize.m, // 16dp
    lineHeight: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary, // Light gray
    textAlign: 'center',
    marginTop: 16, // 16dp from Welcome text
    includeFontPadding: false,
    paddingVertical: 0,
  },
  boldText: {
    color: theme.colors.textPrimary, // Keep white
  },
  descriptionText2: {
    fontSize: theme.typography.fontSize.m, // 16dp
    lineHeight: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary, // Light gray
    textAlign: 'center',
    marginTop: 5, // 5dp separation from previous text
    includeFontPadding: false,
    paddingVertical: 0,
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
    ...theme.viewShadows.medium,
    elevation: theme.elevation.medium,
  },
  nextButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textOnAction,
    letterSpacing: 0.5,
  },
});
