// ==========================================================================
// LOGIN FORM SCREEN
//
// Member login form with email/password inputs and social login options.
//
// Dependencies: theme tokens, React Navigation
// Used by: Navigation stack (from LoginScreen)
// ==========================================================================

import React, {useState} from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron, FormInput, PasswordInput, SocialButton} from '@/components';

// === TYPES ===

type LoginFormScreenProps = RootStackScreenProps<'LoginFormScreen'>;

// === COMPONENT ===

export const LoginFormScreen: React.FC<LoginFormScreenProps> = ({
  navigation,
}) => {
  // === STATE ===
  // Form input values

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // === EVENT HANDLERS ===
  // Handle user interactions and form submissions

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSupport = () => {
    console.log('Support pressed');
    // TODO: Navigate to support screen
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
    // TODO: Navigate to forgot password screen
  };

  const handleContinue = () => {
    console.log('Continue pressed', {email, password});
    // TODO: Implement login logic
  };

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
    // TODO: Implement Google OAuth
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login pressed');
    // TODO: Implement Facebook OAuth
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
        {/* Header with Back and Support - 32dp from top */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <LeftChevron size={32} color={theme.colors.textPrimary} />
          </Pressable>
          <Pressable onPress={handleSupport}>
            <Text style={styles.supportText}>Support</Text>
          </Pressable>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.centeredContainer}>
            {/* Input Fields */}
            <View style={styles.formContainer}>
          {/* Email Input */}
          <FormInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password Input */}
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />

          {/* Forgot Password */}
          <Pressable onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </Pressable>

          {/* Continue Button */}
          <Pressable
            style={({pressed}) => [
              styles.continueButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </Pressable>

          {/* Divider with OR */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <SocialButton provider="google" onPress={handleGoogleLogin} />
          <SocialButton provider="facebook" onPress={handleFacebookLogin} />
        </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
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

  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // === HEADER STYLES ===

  header: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing.l,
    paddingRight: theme.spacing.safeZoneHorizontal,
    zIndex: 10,
  },

  backButton: {
    padding: theme.spacing.s, // 8dp padding for better touch target
  },

  supportText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textPrimary,
  },

  // === FORM STYLES ===

  formContainer: {
    width: '100%',
    marginBottom: theme.spacing.m,
  },

  forgotPassword: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.borderMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.spacing.inputMarginSmall,
  },

  // === BUTTON STYLES ===

  continueButton: {
    height: theme.layout.form.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.layout.form.inputBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
    ...theme.viewShadows.medium,
    elevation: theme.elevation.medium,
  },

  continueButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textOnAction,
  },

  buttonPressed: {
    opacity: theme.buttons.opacity.pressed,
  },

  // === DIVIDER STYLES ===

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
  },

  dividerLine: {
    flex: 1,
    height: theme.layout.form.dividerThickness,
    backgroundColor: theme.colors.textPrimary,
  },

  dividerText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.m,
  },

});
