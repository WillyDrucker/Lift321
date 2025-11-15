// ==========================================================================
// USE FORM INPUT HOOK
//
// Custom hook for managing form input state with validation.
// Handles value, errors, touched state, and validation logic.
//
// Dependencies: React hooks
// Used by: Form screens, input components requiring validation
// ==========================================================================

import {useState, useCallback} from 'react';
import type {ValidationResult} from '@/utils/validationUtils';

// === TYPES ===

export type FormInputConfig = {
  initialValue?: string;
  validator?: (value: string) => ValidationResult;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
};

export type FormInputReturn = {
  value: string;
  error: string | null;
  touched: boolean;
  setValue: (value: string) => void;
  setError: (error: string | null) => void;
  setTouched: (touched: boolean) => void;
  handleChange: (value: string) => void;
  handleBlur: () => void;
  validate: () => boolean;
  reset: () => void;
  clear: () => void;
};

// === HOOK ===

export const useFormInput = ({
  initialValue = '',
  validator,
  validateOnChange = false,
  validateOnBlur = true,
}: FormInputConfig = {}): FormInputReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  /**
   * Validates the current value using the provided validator
   * Returns true if valid, false if invalid
   */
  const validate = useCallback((): boolean => {
    if (!validator) return true;

    const validationError = validator(value);
    setError(validationError);
    return validationError === null;
  }, [value, validator]);

  /**
   * Handles value changes
   * Validates on change if validateOnChange is true
   */
  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);

      if (validateOnChange && validator) {
        const validationError = validator(newValue);
        setError(validationError);
      } else if (error && validator) {
        // Clear error if user is typing and field was previously invalid
        const validationError = validator(newValue);
        if (!validationError) {
          setError(null);
        }
      }
    },
    [validateOnChange, validator, error],
  );

  /**
   * Handles blur event
   * Validates on blur if validateOnBlur is true
   */
  const handleBlur = useCallback(() => {
    setTouched(true);

    if (validateOnBlur && validator) {
      const validationError = validator(value);
      setError(validationError);
    }
  }, [value, validator, validateOnBlur]);

  /**
   * Resets to initial value and clears error/touched state
   */
  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
  }, [initialValue]);

  /**
   * Clears value and error/touched state
   */
  const clear = useCallback(() => {
    setValue('');
    setError(null);
    setTouched(false);
  }, []);

  return {
    value,
    error,
    touched,
    setValue,
    setError,
    setTouched,
    handleChange,
    handleBlur,
    validate,
    reset,
    clear,
  };
};
