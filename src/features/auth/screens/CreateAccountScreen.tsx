// ==========================================================================
// CREATE ACCOUNT SCREEN
//
// Final account creation screen with email/password form.
// Clean, simple design matching LoginFormScreen style.
//
// Dependencies: theme tokens, React Navigation, authService
// Used by: Navigation stack (after questionnaire flow)
// ==========================================================================

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {LeftChevron, FormInput, PasswordInput, SocialButton} from '@/components';
import {authService} from '@/services/authService';

// === TYPES ===

type CreateAccountScreenProps = RootStackScreenProps<'CreateAccountScreen'>;

// === COMPONENT ===

export const CreateAccountScreen: React.FC<CreateAccountScreenProps> = ({
  navigation,
}) => {
  // === STATE ===
  // Form input values and loading state

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // === EVENT HANDLERS ===
  // Handle user interactions and form submissions

  const handleBack = () => {
    navigation.goBack();
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up pressed');
    // TODO: Implement Google OAuth
  };

  const handleFacebookSignUp = () => {
    console.log('Facebook sign up pressed');
    // TODO: Implement Facebook OAuth
  };

  const handleCreateAccount = async () => {
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.signUp({email, password});

      if (result.status === 'success') {
        // Check if email confirmation is required
        if (!result.data.session) {
          Alert.alert(
            'Confirm Your Email',
            'Please check your email and click the confirmation link to activate your account.',
            [{text: 'OK', onPress: () => navigation.navigate('LoginScreen')}]
          );
        } else {
          // Session created immediately - navigate to welcome screen
          navigation.navigate('WelcomeScreen');
        }
      } else {
        // Check if user already exists - attempt sign in instead
        if (result.error.message.toLowerCase().includes('already registered') ||
            result.error.message.toLowerCase().includes('already exists')) {
          // User exists, try signing in with these credentials
          const loginResult = await authService.signIn({email, password});
          if (loginResult.status === 'success') {
            // Login successful - navigate to welcome screen
            navigation.navigate('WelcomeScreen');
          } else {
            Alert.alert('Sign In Failed', loginResult.error.message);
          }
        } else {
          // Show other signup error messages
          Alert.alert('Sign Up Failed', result.error.message);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
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
      <View style={styles.container}>
        {/* Header with Back - 32dp from top */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <LeftChevron size={theme.layout.topNav.backIconSize} color={theme.colors.textPrimary} />
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

              {/* Confirm Password Input */}
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
              />

              {/* Create Account Button */}
              <Pressable
                style={({pressed}) => [
                  styles.createButton,
                  pressed && styles.buttonPressed,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleCreateAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.textOnAction} />
                ) : (
                  <Text style={styles.createButtonText}>CREATE ACCOUNT</Text>
                )}
              </Pressable>

              {/* Divider with OR */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login Buttons */}
              <SocialButton provider="google" onPress={handleGoogleSignUp} actionText="SIGN UP" />
              <SocialButton provider="facebook" onPress={handleFacebookSignUp} actionText="SIGN UP" />

              {/* Terms Notice */}
              <Text style={styles.termsText}>
                By creating an account, you agree to our{'\n'}
                Terms of Service and Privacy Policy
              </Text>
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
    marginTop: 10, // Shift form group down to perfectly center (measured 94dp top, 114dp bottom)
  },

  // === HEADER STYLES ===

  header: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: theme.spacing.l,
    zIndex: 10,
  },

  backButton: {
    padding: theme.spacing.s, // 8dp padding for better touch target
  },

  // === FORM STYLES ===

  formContainer: {
    width: '100%',
    marginBottom: theme.spacing.m,
  },

  termsText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: -4, // 16dp target (measuring 19dp, reducing by 3 more)
    marginHorizontal: theme.spacing.inputMarginSmall,
    lineHeight: theme.typography.fontSize.s + 4,
  },

  // === BUTTON STYLES ===

  createButton: {
    height: theme.layout.form.inputHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.layout.form.inputBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 11, // 16dp target (11 + 5 from PasswordInput marginBottom = 16)
    marginHorizontal: theme.layout.form.buttonHorizontalMargin,
    ...theme.viewShadows.medium,
    elevation: theme.elevation.medium,
  },

  createButtonText: {
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
    marginTop: 11, // 16dp target (measuring 21dp, reducing by 5)
    marginBottom: 13, // 16dp target (13 + ~3 intrinsic = 16)
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
