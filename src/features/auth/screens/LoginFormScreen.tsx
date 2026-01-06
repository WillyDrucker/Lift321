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
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  DeviceEventEmitter,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron, FormInput, PasswordInput, SocialButton} from '@/components';
import {authService} from '@/services/authService';
import {AUTH_CHANGE_EVENT} from '@/services';

// === TYPES ===

type LoginFormScreenProps = RootStackScreenProps<'LoginFormScreen'>;

// === COMPONENT ===

export const LoginFormScreen: React.FC<LoginFormScreenProps> = ({
  navigation,
}) => {
  // === STATE ===
  // Form input values and loading state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleContinue = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.signIn({email, password});

      if (result.status === 'success') {
        // Emit auth change event to trigger App.tsx to switch to MainNavigator
        DeviceEventEmitter.emit(AUTH_CHANGE_EVENT);
      } else {
        // Show error message
        Alert.alert('Login Failed', result.error.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
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
            <LeftChevron size={theme.layout.topNav.backIconSize} color={theme.colors.textPrimary} />
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
            returnKeyType="next"
            blurOnSubmit={false}
          />

          {/* Password Input */}
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            returnKeyType="go"
            onSubmitEditing={handleContinue}
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
              isLoading && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.textOnAction} />
            ) : (
              <Text style={styles.continueButtonText}>CONTINUE</Text>
            )}
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
    marginTop: 16, // Shift form group down to perfectly center (measured 122dp top, 154dp bottom)
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
    lineHeight: theme.typography.fontSize.m + 4, // Add space for descenders
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.borderMuted,
    textAlign: 'center',
    includeFontPadding: false, // Remove Android font padding
    marginTop: 9, // 16dp target (9 + 5 from PasswordInput + ~2 intrinsic = 16)
    marginBottom: 12, // Adjusted for lineHeight change
    marginHorizontal: theme.spacing.inputMarginSmall,
  },

  // === BUTTON STYLES ===

  continueButton: {
    height: theme.layout.form.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.layout.form.inputBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11, // 16dp target to OR divider (measuring 21dp, reducing by 5)
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

  buttonDisabled: {
    opacity: 0.5,
  },

  // === DIVIDER STYLES ===

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12, // 16dp target to Google button (measuring 17dp, reducing by 1)
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
