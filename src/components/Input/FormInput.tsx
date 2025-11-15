// ==========================================================================
// FORM INPUT COMPONENT
//
// Reusable text input field with focus states, validation, and icon support.
// Handles email, text, and other input types with consistent styling.
//
// Dependencies: theme tokens, React Native TextInput
// Used by: Auth screens, form screens throughout app
// ==========================================================================

import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

export type FormInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  editable?: boolean;
  maxLength?: number;
  error?: string | null;
  rightElement?: React.ReactNode;
} & Omit<TextInputProps, 'style' | 'onFocus' | 'onBlur'>;

// === COMPONENT ===

export const FormInput: React.FC<FormInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  editable = true,
  maxLength,
  error,
  rightElement,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          !editable && styles.inputDisabled,
          rightElement && styles.inputWithRightElement,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textDisabled}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
        maxLength={maxLength}
        {...rest}
      />
      {rightElement && <View style={styles.rightElementContainer}>{rightElement}</View>}
    </View>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: theme.spacing.inputMarginSmall,
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
    marginHorizontal: theme.spacing.inputMarginSmall,
  },

  inputFocused: {
    borderColor: theme.colors.borderFocus,
  },

  inputError: {
    borderColor: theme.colors.error,
  },

  inputDisabled: {
    opacity: theme.buttons.opacity.disabled,
    backgroundColor: theme.colors.backgroundSecondary,
  },

  inputWithRightElement: {
    paddingRight: theme.layout.form.passwordInputPaddingRight,
  },

  rightElementContainer: {
    position: 'absolute',
    right: theme.layout.form.eyeIconButtonRight,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
