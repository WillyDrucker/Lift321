// ==========================================================================
// PASSWORD INPUT COMPONENT
//
// Specialized input for password fields with show/hide toggle.
// Extends FormInput with secure text entry and eye icon.
//
// Dependencies: FormInput component, icons, theme tokens
// Used by: Auth screens, password change screens
// ==========================================================================

import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {FormInput, FormInputProps} from './FormInput';
import {EyeOpen, EyeClosed} from '@/components/icons';
import {theme} from '@/theme';

// === TYPES ===

export type PasswordInputProps = Omit<
  FormInputProps,
  'secureTextEntry' | 'rightElement' | 'keyboardType' | 'autoCapitalize' | 'autoCorrect'
>;

// === COMPONENT ===

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const eyeIcon = (
    <Pressable onPress={togglePasswordVisibility}>
      {showPassword ? (
        <EyeOpen size={15} color={theme.colors.textPrimary} />
      ) : (
        <EyeClosed size={15} color={theme.colors.textPrimary} />
      )}
    </Pressable>
  );

  return (
    <FormInput
      {...props}
      secureTextEntry={!showPassword}
      autoCapitalize="none"
      autoCorrect={false}
      rightElement={eyeIcon}
    />
  );
};
