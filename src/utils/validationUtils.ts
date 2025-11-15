// ==========================================================================
// VALIDATION UTILITIES
//
// Form validation functions for email, password, and other inputs.
// Returns error messages or null for valid inputs.
//
// Dependencies: None (pure validation logic)
// Used by: Form components, auth screens, input fields
// ==========================================================================

// === TYPES ===

export type ValidationResult = string | null; // Error message or null if valid

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordRequirements = {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
};

// === CONSTANTS ===

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-()]{10,}$/;

// === EMAIL VALIDATION ===

/**
 * Validates email format
 * Returns error message or null if valid
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }

  return null;
};

// === PASSWORD VALIDATION ===

/**
 * Validates password meets minimum requirements
 * Returns error message or null if valid
 */
export const validatePassword = (
  password: string,
  minLength: number = 8,
): ValidationResult => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters`;
  }

  return null;
};

/**
 * Validates password strength (strong requirements)
 * Returns error message or null if valid
 */
export const validatePasswordStrength = (password: string): ValidationResult => {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  return null;
};

/**
 * Validates password confirmation matches
 * Returns error message or null if valid
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string,
): ValidationResult => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  return null;
};

/**
 * Gets password strength level
 */
export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password || password.length < 6) {
    return 'weak';
  }

  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Character variety checks
  if (/[A-Z]/.test(password)) score++; // Has uppercase
  if (/[a-z]/.test(password)) score++; // Has lowercase
  if (/[0-9]/.test(password)) score++; // Has number
  if (/[^A-Za-z0-9]/.test(password)) score++; // Has special char

  if (score <= 2) return 'weak';
  if (score <= 4) return 'medium';
  return 'strong';
};

/**
 * Gets detailed password requirements status
 */
export const getPasswordRequirements = (
  password: string,
): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };
};

// === NAME VALIDATION ===

/**
 * Validates name (first name, last name, etc.)
 * Returns error message or null if valid
 */
export const validateName = (
  name: string,
  fieldName: string = 'Name',
): ValidationResult => {
  if (!name || name.trim() === '') {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }

  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }

  return null;
};

// === PHONE VALIDATION ===

/**
 * Validates phone number format
 * Returns error message or null if valid
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  if (!PHONE_REGEX.test(phone.trim())) {
    return 'Please enter a valid phone number';
  }

  return null;
};

// === NUMERIC VALIDATION ===

/**
 * Validates number is within range
 * Returns error message or null if valid
 */
export const validateNumberRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string = 'Value',
): ValidationResult => {
  if (value < min) {
    return `${fieldName} must be at least ${min}`;
  }

  if (value > max) {
    return `${fieldName} must be at most ${max}`;
  }

  return null;
};

/**
 * Validates positive number
 * Returns error message or null if valid
 */
export const validatePositiveNumber = (
  value: number,
  fieldName: string = 'Value',
): ValidationResult => {
  if (value <= 0) {
    return `${fieldName} must be a positive number`;
  }

  return null;
};

// === TEXT VALIDATION ===

/**
 * Validates required text field
 * Returns error message or null if valid
 */
export const validateRequired = (
  value: string,
  fieldName: string = 'Field',
): ValidationResult => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }

  return null;
};

/**
 * Validates text length
 * Returns error message or null if valid
 */
export const validateLength = (
  value: string,
  minLength: number,
  maxLength: number,
  fieldName: string = 'Field',
): ValidationResult => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }

  if (value.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }

  return null;
};

// === COMBINED VALIDATORS ===

/**
 * Runs multiple validators and returns first error found
 */
export const validateMultiple = (
  ...validators: Array<() => ValidationResult>
): ValidationResult => {
  for (const validator of validators) {
    const error = validator();
    if (error) {
      return error;
    }
  }
  return null;
};
