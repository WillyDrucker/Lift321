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
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron, EyeOpen, EyeClosed} from '@/components/icons';

// === TYPES ===

type LoginFormScreenProps = RootStackScreenProps<'LoginFormScreen'>;

// === COMPONENT ===

export const LoginFormScreen: React.FC<LoginFormScreenProps> = ({
  navigation,
}) => {
  // === STATE ===
  // Form input values and UI state management

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        {/* Header with Back and Support - Fixed at 100px from top */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <LeftChevron size={32} color={theme.colors.textPrimary} />
          </Pressable>
          <Pressable onPress={handleSupport}>
            <Text style={styles.supportText}>Support</Text>
          </Pressable>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setIsEmailFocused(false);
            setIsPasswordFocused(false);
          }}
        >
          <View style={styles.centeredContainer}>
            {/* Input Fields */}
            <View style={styles.formContainer}>
          {/* Email Input */}
          <TextInput
            style={[
              styles.input,
              isEmailFocused && styles.inputFocused,
            ]}
            placeholder="Email"
            placeholderTextColor={theme.colors.textDisabled}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsEmailFocused(true)}
            onBlur={() => setIsEmailFocused(false)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password Input */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                isPasswordFocused && styles.inputFocused,
              ]}
              placeholder="Password"
              placeholderTextColor={theme.colors.textDisabled}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Pressable
              onPress={togglePasswordVisibility}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOpen size={20} color={theme.colors.textPrimary} />
              ) : (
                <EyeClosed size={20} color={theme.colors.textPrimary} />
              )}
            </Pressable>
          </View>

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

          {/* Google Button */}
          <Pressable
            style={({pressed}) => [
              styles.socialButton,
              styles.googleButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleGoogleLogin}
          >
            <Text style={styles.googleLogo}>G</Text>
            <Text style={styles.googleButtonText}>CONTINUE WITH GOOGLE</Text>
          </Pressable>

          {/* Facebook Button */}
          <Pressable
            style={({pressed}) => [
              styles.socialButton,
              styles.facebookButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleFacebookLogin}
          >
            <Text style={styles.facebookLogo}>f</Text>
            <Text style={styles.facebookButtonText}>
              CONTINUE WITH FACEBOOK
            </Text>
          </Pressable>
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
    top: theme.layout.header.topSpacing,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    zIndex: 10,
  },

  backButton: {
    padding: theme.spacing.xs,
  },

  supportText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textPrimary,
  },

  // === FORM STYLES ===

  formContainer: {
    width: '100%',
  },

  input: {
    height: theme.layout.form.inputHeight,
    borderWidth: theme.layout.form.inputBorderWidth,
    borderColor: theme.colors.borderMuted,
    borderRadius: theme.layout.form.inputBorderRadius,
    paddingHorizontal: theme.spacing.m,
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textPrimary,
    marginBottom: theme.layout.form.inputHorizontalMargin,
    marginHorizontal: theme.layout.form.inputHorizontalMargin,
  },

  inputFocused: {
    borderColor: theme.colors.borderFocus,
  },

  passwordContainer: {
    position: 'relative',
    marginBottom: theme.spacing.m,
  },

  passwordInput: {
    marginBottom: 0,
    paddingRight: 50,
  },

  eyeButton: {
    position: 'absolute',
    right: theme.spacing.m + theme.layout.form.inputHorizontalMargin,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  forgotPassword: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.borderMuted,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
  },

  // === BUTTON STYLES ===

  continueButton: {
    height: theme.layout.form.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.layout.form.inputBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.layout.form.dividerSpacing,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
  },

  continueButtonText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textOnAction,
  },

  buttonPressed: {
    opacity: 0.8,
  },

  // === DIVIDER STYLES ===

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.layout.form.dividerSpacing,
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

  // === SOCIAL BUTTON STYLES ===

  socialButton: {
    height: theme.layout.form.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.layout.form.inputBorderRadius,
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
  },

  googleButton: {
    backgroundColor: '#FFFFFF',
  },

  googleLogo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: theme.spacing.s,
  },

  googleButtonText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#000000',
  },

  facebookButton: {
    backgroundColor: '#1877F2',
  },

  facebookLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: theme.spacing.s,
  },

  facebookButtonText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FFFFFF',
  },
});
